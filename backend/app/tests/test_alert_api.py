import models
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session


class TestSubscribe:
    def test_subscribe(self, client: TestClient, mocker, session: Session):
        mocker.patch(
            "routers.alert.register_id_to_topic",
            return_value=None,
        )
        mocker.patch(
            "routers.alert.reverse_geocode",
            return_value={
                "city": "New York",
                "state": "NY",
                "country": "United States",
            },
        )

        response = client.get(
            "/weather/alerts/subscribe?lat=40.7128&lng=74.0060&fcm_id=token")
        assert response.status_code == 200
        assert response.json() == {
            "message": "Subscribed to topic: /topics/new_york_ny_united_states"
        }

        # Check that the location was created
        location = session.query(models.Location).filter_by(
            city="New York", state="NY", country="United States").first()
        assert location is not None

    def test_exception(self, client: TestClient, mocker, session: Session):
        mocker.patch(
            "routers.alert.register_id_to_topic",
            side_effect=Exception("test"),
        )
        mocker.patch(
            "routers.alert.reverse_geocode",
            return_value={
                "city": "New York",
                "state": "NY",
                "country": "United States",
            },
        )

        response = client.get(
            "/weather/alerts/subscribe?lat=40.7128&lng=74.0060&fcm_id=token")
        assert response.status_code == 400

        # Check that the location was not created
        location = session.query(models.Location).filter_by(
            city="New York", state="NY", country="United States").first()
        assert location is None


class TestUnsubscribe:
    def test_success(self, client: TestClient, mocker, session: Session):
        mocker.patch(
            "routers.alert.unsubscribe_id_from_topic",
            return_value=None,
        )
        return_value = {
            "city": "New York",
            "state": "NY",
            "country": "United States",
        }
        mocker.patch(
            "routers.alert.reverse_geocode",
            return_value=return_value,
        )

        # Create a location
        location = models.Location(
            city=return_value['city'],
            state=return_value['state'],
            country=return_value['country'],
            subscription_count=1,
        )
        session.add(location)
        session.commit()

        response = client.get(
            "/weather/alerts/unsubscribe",
            params={
                "lat": 40.7128,
                "lng": 74.0060,
                "fcm_id": "token",
            },
        )
        assert response.status_code == 200
        assert response.json() == {
            "message": "Unsubscribed from topic: /topics/\
new_york_ny_united_states"
        }

        # Check that the location subscription was reduced
        location = session.query(models.Location).filter_by(
            city="New York", state="NY", country="United States").first()
        assert location.subscription_count == 0

    def test_exception(self, client: TestClient, mocker, session: Session):
        mocker.patch(
            "routers.alert.unsubscribe_id_from_topic",
            side_effect=Exception("test"),
        )
        return_value = {
            "city": "New York",
            "state": "NY",
            "country": "United States",
        }
        mocker.patch(
            "routers.alert.reverse_geocode",
            return_value=return_value,
        )

        # Create a location
        location = models.Location(
            city=return_value['city'],
            state=return_value['state'],
            country=return_value['country'],
            subscription_count=1,
        )
        session.add(location)
        session.commit()

        response = client.get(
            "/weather/alerts/unsubscribe",
            params={
                "lat": 40.7128,
                "lng": 74.0060,
                "fcm_id": "token",
            },
        )
        assert response.status_code == 400

        # Check that the location subscription was not reduced
        location = session.query(models.Location).filter_by(
            city="New York", state="NY", country="United States").first()
        assert location.subscription_count == 1


class TopicManagementResponseMock:
    """Mock for TopicManagementResponse."""

    @property
    def success_count(self):
        """Mock for success_count."""
        return 1


class TestUnsubscribeAll:
    def test_success(
        self, client: TestClient, mocker, session: Session, override_db
    ):
        mocker.patch(
            "utils.fcm_service.get_db",
            return_value=override_db(),
        )
        mocker.patch(
            "utils.fcm_service.messaging.unsubscribe_from_topic",
            return_value=TopicManagementResponseMock(),
        )

        # create dummy locations
        location1 = models.Location(
            city="city1", state="state1", country="country1",
            subscription_count=1,
        )
        location2 = models.Location(
            city="city2", state="state2", country="country2",
            subscription_count=2,
        )
        session.add(location1)
        session.add(location2)
        session.commit()

        response = client.get(
            "/weather/alerts/unsubscribe/all",
            params={
                "fcm_id": "token",
            },
        )
        assert response.status_code == 200
        assert response.json() == {
            "message": "Unsubscribed from all topics"
        }

        # Check that the locations was reduced
        location1 = session.query(models.Location).filter_by(
            city="city1", state="state1", country="country1").first()
        assert location1.subscription_count == 0
        location2 = session.query(models.Location).filter_by(
            city="city2", state="state2", country="country2").first()
        assert location2.subscription_count == 1

    def test_exception(
        self, client: TestClient, mocker, session: Session, override_db
    ):
        mocker.patch(
            "app.utils.fcm_service.get_db",
            return_value=override_db(),
        )
        mocker.patch(
            "app.utils.fcm_service.messaging.unsubscribe_from_topic",
            side_effect=Exception("test"),
        )

        # create dummy locations
        location1 = models.Location(
            city="city1", state="state1", country="country1",
            subscription_count=1,
        )
        location2 = models.Location(
            city="city2", state="state2", country="country2",
            subscription_count=2,
        )
        session.add(location1)
        session.add(location2)
        session.commit()

        response = client.get(
            "/weather/alerts/unsubscribe/all",
            params={
                "fcm_id": "token",
            },
        )
        assert response.status_code == 200

        # Check that the locations was not reduced
        location1 = session.query(models.Location).filter_by(
            city="city1", state="state1", country="country1").first()
        assert location1.subscription_count == 1
        location2 = session.query(models.Location).filter_by(
            city="city2", state="state2", country="country2").first()
        assert location2.subscription_count == 2
