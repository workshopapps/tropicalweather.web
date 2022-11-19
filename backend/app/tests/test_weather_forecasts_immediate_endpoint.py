from fastapi.testclient import TestClient

from main import app

client = TestClient(app)


def test_weather_forecasts_immediate_endpoint():
    response = client.get("/weather/forecasts/immediate?lat=44.34&lng=10.99")
    data = response.json()
    assert response.status_code == 200
    assert data['main'] != None
    assert data['description'] != None
    assert data['date'] != None
    assert data['time'] != None
