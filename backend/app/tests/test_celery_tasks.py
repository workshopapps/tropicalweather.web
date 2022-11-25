import pytest  # noqa: F401
from app.celery_tasks.tasks import (depends, get_db_locations,
                                    get_location_alerts_api)
from app.models import Location
from sqlalchemy.orm import Session


def test_depends(mocker):
    """Test the depends decorator
    """
    actual = mocker.Mock()

    def get_db():
        db = actual
        try:
            yield db
        finally:
            db.close = True

    mocker.patch(
        'app.celery_tasks.tasks.get_db',
        return_value=get_db()
    )

    @depends
    def test_func(db, *args, **kwargs):
        return "test"

    assert test_func() == "test"
    assert actual.close


def override_get_db(session):
    yield session


def test_get_db_locations(mocker, session: Session):
    """Test the get_db_locations function
    """
    mocker.patch(
        'app.celery_tasks.tasks.get_db',
        return_value=override_get_db(session)
    )

    # Create a location
    location = Location(
        city="test",
        state="test_state",
    )
    session.add(location)
    session.commit()

    locations = get_db_locations()
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
