# Other.py
import models
from database import get_db


def create_location():
    """
    Create a location.
    """
    db = next(get_db())
    city = "New York"
    state = "NY"
    country = "US"
    location = models.Location(city=city, state=state, country=country)
    db.add(location)
    db.commit()
    db.refresh(location)
    return location


# Endpoint
import pydantic
from fastapi import Depends
from sqlalchemy.orm import Session

class LocationSchema(pydantic.BaseModel):
    city: str
    state: str
    country: str

    class Config:
        orm_mode = True


@app.get('/create', response_model=LocationSchema)
async def create_location(
    city: str, state: str, country: str,
    db: Session = Depends(get_db)
):
    location = models.Location(city=city, state=state, country=country)
    db.add(location)
    db.commit()
    db.refresh(location)
    return location




# test_something.py
from fastapi.testclient import TestClient
from ..utils.other import create_location


def test_create_location(client: TestClient):
    """
    Test that a location can be created.
    """
    response = client.get(
        "/create", params={"city": "New York", "state": "NY", "country": "US"})
    assert response.status_code == 200
    assert response.json() == {
        "city": "New York",
        "state": "NY",
        "country": "US",
    }


def test_other(mocker, test_get_db):
    mocker.patch(
        "app.utils.other.get_db",
        return_value=test_get_db(),
    )
    assert create_location().city == "New York"
