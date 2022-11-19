from fastapi.testclient import TestClient

from main import app

client = TestClient(app)


class TestWeatherForecastsAPI:
    def test_weather_forcasts_valid(self, mocker):
        """Test weather forecast endpoint"""
        mocker.patch(
            'app.routers.weather.get_immediate_weather_forecast',
            return_value={"main": "Clouds",
            "description": "broken clouds",
            "date": "12 Nov, 2022",
            "time": "12:00pm"}
        )


        response = client.get("/weather/forecasts/immediate?lat=44.34&lng=10.99")
        assert response.status_code == 200
        data: dict = response.json()

        assert len(data) == 4
        assert data["date"] == "12 Nov, 2022"
        assert data["time"] == "12:00pm"
        assert data["main"] == "Clouds"
        assert data["description"] == "broken clouds"
