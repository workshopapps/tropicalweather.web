from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


class TestWeatherForecastsAPI:
    def test_weather_forcasts_valid(self, mocker):
        """Test weather forecast endpoint"""
        mocker.patch(
            'app.routers.weather.get_weather_forecast',
            return_value=[
                {
                    "dt": 1668848400,
                    "weather": [
                        {
                            "main": "Rain",
                            "description": "light rain",
                        }
                    ],
                },
                {
                    "dt": 1668848400,
                    "weather": [
                        {
                            "main": "Rain",
                            "description": "light rain",
                        }
                    ],
                },
            ]
        )

        mocker.patch(
            'app.routers.weather.convert_epoch_to_datetime',
            return_value={
                "date": "2022-07-07",
                "time": "12:00:00",
            }
        )

        response = client.get("/weather/forecasts?lat=6.5244&lon=3.3792")
        assert response.status_code == 200
        data: list[dict] = response.json()

        assert len(data) == 2
        assert data[0]["date"]
        assert data[0]["time"]
        assert data[0]["main"] == "Rain"
        assert data[0]["description"] == "light rain"

    def test_weather_forcasts_invalid(self, mocker):
        """Test weather forecast endpoint"""
        mocker.patch(
            'app.routers.weather.get_weather_forecast',
            side_effect=Exception("Invalid request")
        )
        response = client.get("/weather/forecasts?lat=6.5244&lon=3.3792")
        assert response.status_code == 400

        data: dict = response.json()
        assert data["detail"]



class TestLocationAPI:
    def test_get_locations_valid(self, mocker):

        mocker.patch('app.routers.location.reverse_geocoding',
        return_value = [
            {'name': 'Etche', 
            'lat': 5.0765321, 
            'lon': 7.092638789196567,
            'country': 'NG', 
            'state': 'Rivers State'}
            ])

        response = client.get("/location/?lat=5.12&lon=7.03")

        assert response.status_code == 200

        data: dict = response.json()

        assert data == {
            "city": "Etche",
            "state": "Rivers State"
            }
        assert len(data) == 2


    def test_get_locations_invalid(self, mocker):
        mocker.patch(
            'app.routers.location.get_location',
            side_effect=Exception("Invalid request")
        )
        response = client.get("/location/?lat=5.12&lon=700000.03")
        assert response.status_code == 400

        data: dict = response.json()
        assert data["detail"]

