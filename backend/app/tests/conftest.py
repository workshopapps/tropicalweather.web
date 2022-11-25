import pytest
from app.database import Base, get_db_engine
from sqlalchemy.orm import Session
from app.routers.weather import get_db, router
from app.main import app
from fastapi import Depends


@pytest.fixture
def engine():
    return get_db_engine(True)


@pytest.fixture
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
    try:
        yield session
    finally:
        session.close()
        transaction.rollback()
        connection.close()


@pytest.fixture
def override_db_session(session):
    """Overrides the session with a new session"""
    def override_get_db():
        try:
            yield session
        finally:
            session.close()
            pass

    router.dependencies[get_db] = Depends(override_get_db)

    # yield session
