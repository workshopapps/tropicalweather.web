import pytest


@pytest.fixture
def client(mocker):
    from app.database import Base, get_db, get_db_engine
    from app.main import app
    from fastapi.testclient import TestClient
    from sqlalchemy.orm import sessionmaker

    engine = get_db_engine(test_mode=True)
    TestingSessionLocal = sessionmaker(
        autocommit=False, autoflush=False, bind=engine)
    Base.metadata.create_all(bind=engine)

    def override_get_db():
        try:
            db = TestingSessionLocal()
            yield db
        finally:
            db.close()

    mocker.patch('app.main.get_db', override_get_db)

    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as test_client:
        yield test_client

    Base.metadata.drop_all(bind=engine)
