from typing import List

from app.main import app
from app.models import Alert, Location
from app.utils import convert_epoch_to_datetime
from fastapi import HTTPException, status
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

client = TestClient(app)


class TestGetAlerts:
    def test_get_alerts(self, session: Session, mocker):

        # Add some location and alerts to db
        location = Location(
            city="Ikorodu",
            state="Lagos",
        )

        location.alerts = [
            Alert(
                event="Heavy downpour",
                message="Heavy flood at Ikorodu",
                start=1628500000,
                end=1628494000,
                hash="1234567890",
            ),
            Alert(
                event="High Dust levels",
                message="High humidity at Ikorodu",
                start=1628500000,
                end=1628434000,
                hash="1234567890",
            ),
        ]

        session.add(location)
        session.commit()

        mocker.patch(
            'app.routers.weather.reverse_geocode',
            return_value={
                "city": "Ikorodu",
                "state": "Lagos"
            }
        )

        mocker.patch(
            'app.routers.weather.get_location_obj',
            return_value=location
        )

        response = client.get(
            "/weather/alert/notification?lat=6.46542&lon=3.406448")

        assert response.status_code == 200

        data: List[dict] = response.json()
        assert data[0]['event'] == "Heavy downpour"
        assert data[0]['message'] == "Heavy flood at Ikorodu"
        assert data[0]['date'] == convert_epoch_to_datetime(1628500000)['date']
        assert data[0]['location'] == f"{location.city}-{location.state}"


        assert data[1]['event'] == "High Dust levels"
        assert data[1]['message'] == "High humidity at Ikorodu"
        assert data[1]['date'] == convert_epoch_to_datetime(1628500000)['date']
        assert data[0]['location'] == f"{location.city}-{location.state}"


    def test_get_alerts_none(self, mocker):
        mocker.patch(
            'app.routers.weather.reverse_geocode',
            return_value={
                "city": "Ikorodu",
                "state": "Lagos"
            }
        )

        response = client.get(
            "/weather/alert/notification?lat=6.46542&lon=3.406448")

        assert response.status_code == 200

        data: List[dict] = response.json()
        assert data == []

    def test_get_alerts_error(self, mocker):
        mocker.patch(
            'app.routers.weather.reverse_geocode',
            side_effect=HTTPException(
                status_code=400,
                detail="Invalid request"
            )
        )

        response = client.get(
            "/weather/alert/notification?lat=6.46542&lon=3.406448")

        assert response.status_code == 400