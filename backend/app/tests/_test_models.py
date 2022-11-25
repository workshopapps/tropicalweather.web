import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from app.database import Base
from fastapi.testclient import TestClient
from fastapi import FastAPI
from decouple import config

from app.models import Location, Alert


SQLALCHEMY_URL = config("SQLALCHEMY_URL")


@pytest.fixture(scope="function")
def engine():
    return create_engine(SQLALCHEMY_URL)


@pytest.fixture(scope="function")
def tables(engine):
    Base.metadata.create_all(engine)
    try:
        yield
    finally:
        Base.metadata.drop_all(engine)


@pytest.fixture
def session(engine, tables):
    """Returns a session after test tear down"""
    connection = engine.connect()
    transaction = connection.begin()
    session = Session(bind=connection)
    yield session

    session.close()
    transaction.rollback()
    connection.close()


def get_db(session):
    db = session()
    try:
        yield db
    finally:
        db.close()


# -------TEST CASES--------


location_paramas = {"id": 1, "city": "Port Harcourt", "state": "Rivers state"}


alert_paramas = {
    "id": 2,
    "start": "25-11-2022",
    "end": "26-11-2022",
    "event": "test alert",
    "message": "volcanic eruption alert",
    "hash": "730897492039tyhfid",
    "created_at": "25-11-2022",
}


def test_location_create(session):
    """Create entry on location table"""

    new_location = Location(**location_paramas)
    session.add(new_location)
    session.commit()
    session.refresh(new_location)

    db_location = session.query(Location).filter(Location.id == new_location.id).first()

    assert db_location.city == new_location.city
    assert db_location.state == new_location.state


def test_location_create_and_update(session):

    """test create and update"""
    update_location_params = {
        "city": "jabi",
        "state": "Abuja",
    }

    new_location = Location(**location_paramas)
    session.add(new_location)
    session.commit()
    session.refresh(new_location)

    db_updated_location = (
        session.query(Location).filter(Location.id == new_location.id).first()
    )
    db_updated_location.city = update_location_params["city"]
    db_updated_location.state = update_location_params["state"]

    session.commit()
    session.refresh(db_updated_location)

    assert db_updated_location.city == update_location_params["city"]
    assert db_updated_location.state == update_location_params["state"]


def test_alert_create(session):
    """Create entries with foreign key constraints"""

    "Step-one: create location info"

    new_location = Location(**location_paramas)
    session.add(new_location)
    session.commit()
    session.refresh(new_location)

    "Step-two: create update foreign key constraints"
    new_alert = Alert(location_id=new_location.id, **alert_paramas)
    session.add(new_alert)
    session.commit()
    session.refresh(new_alert)

    db_alert = session.query(Alert).filter(Alert.id == new_alert.id).first()
    assert db_alert.start == new_alert.start
    assert db_alert.location_id == new_location.id
    assert db_alert.end == new_alert.end
    assert db_alert.event == new_alert.event
    assert db_alert.message == new_alert.message
    assert db_alert.hash == new_alert.hash