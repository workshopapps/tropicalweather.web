import datetime
import hashlib
import pytz

import models
from sqlalchemy.orm import Session

from ..celery_tasks.tasks import (create_alerts, get_db_locations,
                                  get_location_risks, hash_alert,
                                  update_alerts)


def test_update_alerts(session: Session, mocker):
    location = models.Location(city="New York", state="NY", country="US")
    session.add(location)
    session.commit()

    base = datetime.datetime(2022, 12, 3, 0, 0, tzinfo=pytz.UTC)

    mocker.patch(
        "app.celery_tasks.tasks.now_utc",
        return_value=base
    )

    def inc(x):
        return base + datetime.timedelta(hours=x)

    alerts = [
        {
            "event": "Heatwave",
            "description": "Heatwave warning",
            "start": inc(-2),
            "end": inc(-1),
        },
        {
            "event": "Heatwave",
            "description": "Heatwave warning",
            "start": inc(-1),
            "end": base,
        },
        {
            "event": "Flood",
            "description": "Flood warning",
            "start": base,
            "end": inc(1),
        },
        {
            "event": "Heatwave",
            "description": "Heatwave warning",
            "start": inc(1),
            "end": inc(2),
        },
    ]

    mocked = mocker.patch(
        "app.celery_tasks.tasks.get_location_risks",
        return_value=alerts,
    )

    update_alerts(session)
    mocked.assert_called_once_with(location)
    assert len(location.alerts) == 4

    new_alerts = [
        {
            "event": "Flood",
            "description": "Flood warning",
            "start": base,
            "end": inc(1),
        },
        {
            "event": "Heatwave",
            "description": "Heatwave warning",
            "start": inc(1),
            "end": inc(2),
        },
        {
            "event": "Tornado",
            "description": "Tornado warning",
            "start": inc(2),
            "end": inc(3),
        },
    ]

    mocked = mocker.patch(
        "app.celery_tasks.tasks.get_location_risks",
        return_value=new_alerts,
    )

    update_alerts(session)
    session.refresh(location)
    mocked.assert_called_once_with(location)
    assert len(location.alerts) == 3

    assert location.alerts[-1].event == "Tornado"


def test_get_location_risks(mocker):
    location = models.Location(city="New York", state="NY", country="US")

    mocked = mocker.patch(
        "app.celery_tasks.tasks.get_risks_by_address",
        return_value=None,
    )

    get_location_risks(location)
    mocked.assert_called_once_with("New York, NY, US")


def test_get_db_locations(session: Session):
    locations = get_db_locations(session)
    assert len(locations) == 0

    location = models.Location(city="New York", state="NY", country="US")
    session.add(location)
    session.commit()

    locations = get_db_locations(session)
    assert len(locations) == 1
    assert locations[0].city == "New York"
    assert locations[0].state == "NY"


def test_create_alerts(session: Session):
    location = models.Location(city="New York", state="NY", country="US")
    session.add(location)
    session.commit()

    t1 = datetime.datetime(2021, 1, 1)
    t2 = datetime.datetime(2021, 1, 2)

    alerts = [
        {
            "event": "Flood",
            "description": "Flood warning",
            "start": t1,
            "end": t2,
        },
        {
            "event": "Heatwave",
            "description": "Heatwave warning",
            "start": t1,
            "end": t2,
        },
    ]

    create_alerts(session, location, alerts)
    assert len(location.alerts) == 2
    assert location.alerts[0].event == "Flood"
    assert location.alerts[0].message == "Flood warning"
    assert location.alerts[0].start == t1.timestamp()
    assert location.alerts[0].end == t2.timestamp()
    assert location.alerts[0].hash == hash_alert(alerts[0])


def test_hash_alert(mocker):
    t1 = datetime.datetime(2021, 1, 1)
    t2 = datetime.datetime(2021, 1, 2)

    alert = {
        "event": "Flood",
        "description": "Flood warning",
        "start": t1,
        "end": t2,
    }

    start = t1.timestamp()
    end = t2.timestamp()
    expected = f"{start}{end}{alert['description']}{alert['event']}"
    expected = hashlib.sha256(expected.encode()).hexdigest()

    assert hash_alert(alert) == expected
