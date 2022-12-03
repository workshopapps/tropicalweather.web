from fastapi.testclient import TestClient


class TestSubscribe:
    def test_subscribe(self, client: TestClient, mocker):
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

    def test_exception(self, client: TestClient, mocker):
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


class TestUnsubscribe:
    def test_success(self, client: TestClient, mocker):
        mocker.patch(
            "routers.alert.unregister_id_from_topic",
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
            "/weather/alerts/unsubscribe?lat=40.7128&lng=74.0060&fcm_id=token")
        assert response.status_code == 200
        assert response.json() == {
            "message": "Unsubscribed from topic: /topics/new_york_ny_united_states"
        }
