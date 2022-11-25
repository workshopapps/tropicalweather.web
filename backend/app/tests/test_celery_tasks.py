import pytest  # noqa: F401
from app.celery_tasks.tasks import (create_events, delete_alert,
                                    get_db_locations, get_location_alerts_api,
                                    hash_alert, send_websocket_message,
                                    update_alert_events)
from app.models import Alert, Location
from sqlalchemy.orm import Session


def test_get_db_locations(session: Session):
    """Test the get_db_locations function
    """

    # Create a location
    location = Location(
        city="test",
        state="test_state",
    )
    session.add(location)
    session.commit()

    locations = get_db_locations(session)
    assert len(locations) == 1
    assert locations[0].city == "test"
    assert locations[0].state == "test_state"


def test_get_location_alerts_api(mocker):
    mock = mocker.patch(
        'app.celery_tasks.tasks.get_location_alerts_by_address',
        return_value=[{"test": "test"}]
    )

    location = Location(
        city="test",
        state="test_state",
    )

    alerts = get_location_alerts_api(location)
    assert len(alerts) == 1
    mock.assert_called_once_with("test test_state")


def test_create_events(session: Session):
    """Test the create_events function
    """
    location = Location(
        city="test",
        state="test_state",
    )
    session.add(location)
    session.commit()

    alerts = [
        {
            "event": "test_event",
            "description": "test_description",
            "start": 123,
            "end": 321,
        }
    ]

    create_events(session, location, alerts)

    assert len(location.alerts) == 1
    assert location.alerts[0].event == "test_event"
    assert location.alerts[0].message == "test_description"
    assert location.alerts[0].start == 123
    assert location.alerts[0].end == 321


def test_delete_alert(session: Session):
    """Test the delete_alert function
    """
    location = Location(
        city="test",
        state="test_state",
    )
    session.add(location)
    session.commit()

    alerts = [
        Alert(
            event="test_event",
            message="test_description",
            start=123,
            end=321,
            hash="test_hash",
        )
    ]

    location.alerts = alerts
    session.add(location)
    session.commit()

    delete_alert(session, location.alerts[0])

    assert len(location.alerts) == 0


def test_send_websocket_message(mocker):
    mock = mocker.patch(
        'app.celery_tasks.tasks.send_message_to_room',
    )
    create_connection = mocker.patch(
        'app.celery_tasks.tasks.create_connection',
    )
    close_connection = mocker.patch(
        'app.celery_tasks.tasks.close_connection',
    )

    location = Location(
        city="test",
        state="test_state",
    )

    events = [
        {
            "event": "test_event",
            "description": "test_description",
            "start": 123,
            "end": 321,
        }
    ]

    send_websocket_message(location, events)

    create_connection.assert_called_once_with(
        "test", "test_state"
    )

    mock.assert_called_once_with(
        location.city, location.state, "test_event",
        "test_description"
    )

    close_connection.assert_called_once()


def test_hash_alert():
    alert = {
        "event": "test_event",
        "description": "test_description",
        "start": 123,
        "end": 321,
    }

    assert hash_alert(alert)


@pytest.mark.usefixtures("override_get_db_celery")
def test_update_alert_events(session: Session, mocker):
    """Test the update_alert_events function
    """
    location = Location(
        city="test",
        state="test_state",
    )
    session.add(location)
    session.commit()

    alerts = [
        Alert(
            event="test_event",
            message="test_description",
            start=123,
            end=321,
            hash=hash_alert({
                "event": "test_event",
                "description": "test_description",
                "start": 123,
                "end": 321,
            }),
        ),
        Alert(
            event="test_event_0",
            message="test_description_0",
            start=12,
            end=21,
            hash=hash_alert({
                "event": "test_event_0",
                "description": "test_description_0",
                "start": 12,
                "end": 21,
            }),
        )
    ]

    location.alerts = alerts
    session.add(location)
    session.commit()

    events = [
        {
            "event": "test_event",
            "description": "test_description",
            "start": 123,
            "end": 321,
        },
        {
            "event": "test_event_2",
            "description": "test_description_2",
            "start": 1234,
            "end": 4321,
        }
    ]

    mocker.patch(
        'app.celery_tasks.tasks.get_location_alerts_api',
        return_value=events
    )

    socket_mock = mocker.patch(
        'app.celery_tasks.tasks.send_websocket_message',
    )

    update_alert_events()

    # refresh the location
    location: Location = session.query(Location).get(location.id)

    assert len(location.alerts) == 2
    assert location.alerts[0].event == "test_event"
    assert location.alerts[1].event == "test_event_2"

    socket_mock.assert_called_once_with(location, [
        {
            "event": "test_event_2",
            "description": "test_description_2",
            "start": 1234,
            "end": 4321,
        }
    ])
