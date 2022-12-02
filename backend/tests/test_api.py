from typing import List

from fastapi import HTTPException, status


class TestGenerateShareLink:
    def test_get(self, client):
        response = client.get(
            "/generate/share-link?city=a&state=b&country=c"
        )
        assert response.json().get("link") == \
            "https://tropicalweather.hng.tech/share/a-b-c"


class TestWeatherForecastsAPI:
    def test_weather_forcasts_valid(self, mocker, client):
        """Test weather forecast endpoint"""
        mocker.patch(
            'routers.weather.weather_forecasts',
            return_value=[
                {
                    "main": "Broken clouds",
                    "datetime": "2022-12-02 16:00",
                    "risk": "Heatwave"
                },
                {
                    "main": "Scattered clouds",
                    "datetime": "2022-12-02 17:00",
                    "risk": "Heatwave"
                },
                {
                    "main": "Broken clouds",
                    "datetime": "2022-12-02 18:00",
                    "risk": "Heatwave"
                },
                {
                    "main": "Broken clouds",
                    "datetime": "2022-12-02 19:00",
                    "risk": "Heatwave"
                },
                {
                    "main": "Broken clouds",
                    "datetime": "2022-12-02 20:00",
                    "risk": "Heatwave"
                },
                {
                    "main": "Broken clouds",
                    "datetime": "2022-12-02 21:00",
                    "risk": "Heatwave"
                },
                {
                    "main": "Broken clouds",
                    "datetime": "2022-12-02 22:00",
                    "risk": "Heatwave"
                },
                {
                    "main": "Broken clouds",
                    "datetime": "2022-12-02 23:00",
                    "risk": "Heatwave"
                }
            ]
        )

        response = client.get("/weather/forecasts?lat=4&lon=3.1")
        assert response.status_code == 200
        data: List[dict] = response.json()

        assert len(data) == 8
        assert data[0]["main"]
        assert data[1]["datetime"]
        assert data[2]["risk"] 
        

    def test_weather_forcasts_invalid(self, mocker, client):
        """Test weather forecast endpoint"""
        mocker.patch(
            'routers.weather.weather_forecasts',
            side_effect=Exception("Invalid request")
        )
        response = client.get("/weather/forecasts?lat=9&lon=1000")
        assert response.status_code == 400

        data: dict = response.json()
        assert data["detail"]


class TestWeatherCurrentAPI:
    def test_weather_forcasts_valid(self, mocker, client):
        """Test weather current endpoint valid"""
        mocker.patch(
            'routers.weather.geocode_address',
            return_value={
                "lat": 1.0,
                "lon": 1.0,
                "city": "Ikorodu",
                "state": "Lagos",
            }
        )

        mocker.patch(
            'routers.weather.weather_api_call',
            return_value={
                "main": "Rain",
                "description": "light rain",
                "dt": 1668848400,
            }
        )

        response = client.get("/weather/current?address=test")
        assert response.status_code == 200

        data: dict = response.json()

        expected_keys = ["date", "time", "city",
                         "state", "main", "description"]
        assert all(key in data for key in expected_keys)
        assert data["date"]
        assert data["time"]
        assert data["city"] == "Ikorodu"
        assert data["state"] == "Lagos"

    def test_weather_forcasts_invalid(self, mocker, client):
        mocker.patch(
            'routers.weather.geocode_address',
            side_effect=HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Address not found. Please retry again",
            )
        )
        response = client.get("/weather/current?address=test")
        assert response.status_code == 400

        data: dict = response.json()
        assert data["detail"]


class TestLocationAPI:
    def test_get_locations_valid(self, mocker, client):

        mocker.patch('routers.location.reverse_geocoding',
                     return_value=[
                         {'name': 'Etche',
                          'lat': 5.0765321,
                          'lon': 7.092638789196567,
                          'country': 'NG',
                          'state': 'Rivers State'}
                     ])

        response = client.get("/location?lat=5.12&lon=7.03")

        assert response.status_code == 200

        data: dict = response.json()

        assert data == {
            "city": "Etche",
            "state": "Rivers State"
        }
        assert len(data) == 2

    def test_get_locations_invalid(self, mocker, client):
        mocker.patch(
            'routers.location.get_location',
            side_effect=Exception("Invalid request")
        )
        response = client.get("/location?lat=5.12&lon=700000.03")
        assert response.status_code == 400

        data: dict = response.json()
        assert data["detail"]


class TestWeatherDataAPI:
    def test_weather_data_valid(self, mocker, client):
        """Test weather data endpoint"""
        mocker.patch(
            'routers.weather.weather',
            return_value=[
                {
                    "dt": 1661871600,
                    "weather": [
                        {
                            "main": "Clouds",
                            "description": "overcast clouds",
                        }
                    ],
                },
            ]
        )

        mocker.patch(
            'routers.weather.convert_epoch_to_datetime',
            return_value={
                "date": "2022-09-08",
                "time": "12:00:00",
            }
        )
        mocker.patch(
            'routers.weather.convert',
            return_value=1661871600
        )

        response = client.get(
            "/weather/forecasts/tomorrow?lat=7.5629&lon=4.5200")
        assert response.status_code == 200
        data: List[dict] = response.json()

        assert len(data) == 1
        assert data[0]["date"]
        assert data[0]["time"]
        assert data[0]["main"] == "Clouds"
        assert data[0]["description"] == "overcast clouds"

    def test_weather_data_invalid(self, mocker, client):
        """Test weather data endpoint"""
        mocker.patch(
            'routers.weather.weather',
            side_effect=Exception("Invalid request")
        )
        response = client.get(
            "/weather/forecasts/tomorrow?lat=7.5629&lon=4.5200")
        assert response.status_code == 400

        data: dict = response.json()
        assert data["detail"]


class Test_get_tommorrows_weather:
    def test_get_tommorrows_weather(self, mocker, client):
        mocker.patch(
            'routers.weather.immediate_weather_api_call_tommorrow',
            return_value={

                "main": "Rain",
                "description": "light rain",
                "date": "",
                "time": ""
            })
        response = client.get(
            "/weather/forecasts/tomorrow/immediate?lat=6.46542&lon=3.406448")
        assert response.status_code == 200

        data: dict = response.json()
        assert data['main'] == "Rain"
        assert data['description'] == "light rain"


class _TestGetAlerts:
    def test_get_alerts_none(self, mocker, client):
        mocker.patch(
            'routers.weather.reverse_geocode',
            return_value={
                "city": "Ikorodu",
                "state": "Lagos"
            }
        )

        response = client.get(
            "/weather/alerts/list?lat=6.46542&lon=3.406448")

        assert response.status_code == 200

        data: List[dict] = response.json()
        assert data == []

    def test_get_alerts_error(self, mocker, client):
        mocker.patch(
            'routers.weather.reverse_geocode',
            side_effect=HTTPException(
                status_code=400,
                detail="Invalid request"
            )
        )

        response = client.get(
            "/weather/alerts/list?lat=6.46542&lon=3.406448")

        assert response.status_code == 400
