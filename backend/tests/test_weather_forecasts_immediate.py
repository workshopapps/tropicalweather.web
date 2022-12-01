class TestGetImmediateWeatherForecast:
    def test_immediate_weather_forcasts(self, mocker, client):
        """Test immediate weather forecast endpoint"""
        # mocker request.get json response
        mocker.patch(
            'requests.get',
            return_value=mocker.Mock(
                status_code=200,
                json=mocker.Mock(
                    return_value={
                        'base': 'stations',
                        'clouds': {'all': 33},
                        'cod': 200,
                        'coord': {'lat': 6.5227, 'lon': 3.6218},
                        'dt': 1668966061,
                        'id': 2332453,
                        'main': {'feels_like': 308.4,
                                 'grnd_level': 1009,
                                 'humidity': 80,
                                 'pressure': 1009,
                                 'sea_level': 1009,
                                 'temp': 302.33,
                                 'temp_max': 302.33,
                                 'temp_min': 302.33},
                        'name': 'Lagos',
                        'sys': {'country': 'NG',
                                'id': 1185,
                                'sunrise': 1668922625,
                                'sunset': 1668965126,
                                'type': 1},
                        'timezone': 3600,
                        'visibility': 10000,
                        'weather': [{'description': 'scattered clouds',
                                    'icon': '03n',
                                     'id': 802,
                                     'main': 'Clouds'}],
                        'wind': {'deg': 209, 'gust': 7.96, 'speed': 5.59}}
                )
            )
        )

        response = client.get("/weather/forecasts/immediate?lat=3.4&lng=45.9")
        data: dict = response.json()
        assert len(data) == 4
        assert data["date"] == "20 Nov, 2022"
        assert data["time"] == "06:41pm"
        assert data["main"] == "Clouds"
        assert data["description"] == "scattered clouds"
