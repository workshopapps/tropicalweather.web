from datetime import datetime

now = datetime.now()
now_string = now.strftime("%Y-%m-%dT%H:%M")
strptime = datetime.strptime(now_string, "%Y-%m-%dT%H:%M")
today_string = strptime.strftime("%Y-%m-%dT%H:%M")
today_string = today_string[:10]

class TestUserCurrentWeather:
    def test_weather_current_endpoint(self, mocker, client):
        """Test weather current endpoint"""
        data = {'latitude': 6.5, 'longitude': 3.25, 'generationtime_ms': 0.4489421844482422,
                'utc_offset_seconds': 0, 'timezone': 'GMT', 'timezone_abbreviation': 'GMT', 'elevation': 27.0,
                'hourly_units': {'time': 'iso8601', 'weathercode': 'wmo code', 'apparent_temperature': '°C',
                'precipitation': 'mm'}, 'hourly': {'time': [f'{today_string}T00:00', f'{today_string}T01:00',
                f'{today_string}T02:00', f'{today_string}T03:00', f'{today_string}T04:00', f'{today_string}T05:00',
                f'{today_string}T06:00', f'{today_string}T07:00', f'{today_string}T08:00', f'{today_string}T09:00',
                f'{today_string}T10:00', f'{today_string}T11:00', f'{today_string}T12:00', f'{today_string}T13:00',
                f'{today_string}T14:00', f'{today_string}T15:00', f'{today_string}T16:00', f'{today_string}T17:00',
                f'{today_string}T18:00', f'{today_string}T19:00', f'{today_string}T20:00', f'{today_string}T21:00',
                f'{today_string}T22:00', f'{today_string}T23:00'], 'weathercode': [3, 3, 3, 3, 3, 3, 3, 3, 3, 80, 3,
                2, 3, 80, 80, 3, 2, 1, 1, 2, 2, 2, 2, 3], 'apparent_temperature': [32.5, 32.3, 32.3, 32.2, 32.3,
                32.3, 31.9, 32.7, 33.8, 34.7, 35.8, 37.4, 37.8, 35.9, 33.9, 34.2, 33.9, 33.1, 33.5, 33.3, 33.1, 33.2,
                32.9, 32.8], 'precipitation': [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.5, 0.0, 0.1, 0.1, 0.3,
                1.3, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]}}
        mocker.patch(
            'utils.open_meteo.client.get_hourly_forecast',
            return_value=data
        )
        mocker.patch(
            'geocoder.osm',
            return_value=mocker.Mock(
            lat=1.0, lng=2.0, city="Ikotun",
            state="Lagos", country="Nigeria", ok=True)
            )
        response = client.get("/weather/current?lat=6.54&lon=3.26")
        assert response.status_code == 200
