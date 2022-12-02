import pytest
from app.database import Base, get_db, get_db_engine
from app.main import app
from fastapi.testclient import TestClient
from sqlalchemy.orm import sessionmaker

engine = get_db_engine(test_mode=True)
TestingSessionLocal = sessionmaker(
    autocommit=False, autoflush=False, bind=engine)


def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()


@pytest.fixture(scope="module")
def client():
    Base.metadata.create_all(bind=engine)
    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as test_client:
        yield test_client
    Base.metadata.drop_all(bind=engine)
