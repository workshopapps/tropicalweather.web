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


@pytest.fixture
def override_get_db_celery(session, mocker):
    mocker.patch(
        'app.celery_tasks.tasks.get_db',
        return_value=session
    )


@pytest.fixture
def override_get_db_main(session, mocker):
    def func():
        yield session
    mocker.patch(
        'app.main.get_db',
        return_value=func()
    )
