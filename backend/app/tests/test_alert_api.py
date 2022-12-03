from fastapi.testclient import TestClient


def test_subscribe_token_to_alert_topic(client: TestClient, mocker):
    # Mock the function that is called in the endpoint
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
        "message": "Subscribed to topic: /topics/new_york_ny_united_states"}


def test_subscribe_token_to_alert_topic_exception(client: TestClient, mocker):
    # Mock the function that is called in the endpoint
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
