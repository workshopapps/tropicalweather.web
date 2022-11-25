import pytest
from app.database import Base, get_db_engine
from sqlalchemy.orm import Session


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
