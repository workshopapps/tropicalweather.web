
from typing import Any, Dict, List, Union

import requests
from conf.settings import settings

BASE_URL = settings.OPEN_WEATHER_BASE_URL
API_KEY = settings.OPEN_WEATHER_API_KEY


class OpenMeteoAPI:
    """OpenMeteo API Client
    Docs: https://open-meteo.com/en/docs
    """

    def __init__(self) -> None:
        self.base_url = settings.METEO_API
        self.forecast = "forecast"

    def build_url(self, endpoint: str) -> str:
        """Builds the URL for the API request

        Args:
            endpoint (str): The endpoint to be called

        Returns:
            str: The full URL
        """
        return f"{self.base_url}{endpoint}"

    def get(self, url, params: dict = None) -> Dict[str, Any]:
        """Makes a GET request to the API

        Args:
            url (_type_): The endpoint to be called
            params (dict, optional): The GET parameters
            for the requests. Defaults to None.

        Raises:
            Exception: If the request fails

        Returns:
            _type_: The response json from the API
        """
        url = self.build_url(url)
        response = requests.get(url, params=params)

        # Check for valid status
        if response.status_code == 200:
            return response.json()

        raise Exception("Invalid request")

    def get_daily_forecast(
        self, lat: float, lon: float, daily_params: list = None,
        params: dict = None
    ):
        """Get daily forecast

        Args:
            lat (float): Latitude
            lon (float): Longitude
            daily_params (list, optional): daily
            values to get from the api. Defaults to None.
            params (dict, optional): API GET parameters. Defaults to None.

        Returns:
            _type_: The response json from the API
        """
        if params is None:
            params = {}

        if daily_params is None:
            daily_params = []

        daily_params += [
            'apparent_temperature_max',
            'precipitation_sum',
            "weathercode"
        ]

        default_params = {
            "latitude": lat,
            "longitude": lon,
            "timezone": "GMT",
            "daily": ','.join(daily_params)
        }
        params.update(default_params)
        return self.get(self.forecast, params=params)

    def get_hourly_forecast(
        self, lat: float, lon: float, hourly_params: list = None,
        params: dict = None
    ):
        """Get hourly forecast

        Args:
            lat (float): Latitude
            lon (float): Longitude
            hourly_params (list, optional): hourly
            values to get from the api. Defaults to None.
            params (dict, optional): API GET parameters. Defaults to None.

        Returns:
            _type_: The response json from the API
        """
        if params is None:
            params = {}

        if hourly_params is None:
            hourly_params = []

        hourly_params += [
            'apparent_temperature',
            'precipitation',
            "weathercode"
        ]

        default_params = {
            "latitude": lat,
            "longitude": lon,
            "hourly": ','.join(hourly_params)
        }
        params.update(default_params)
        return self.get(self.forecast, params=params)

    def get_current_weather(
        self, lat: float, lon: float, params: dict = None
    ):
        """Get current weather

        Args:
            lat (float): Latitude
            lon (float): Longitude
            params (dict, optional): API GET parameters. Defaults to None.

        Returns:
            _type_: The response json from the API
        """
        if params is None:
            params = {}

        default_params = {
            "latitude": lat,
            "longitude": lon,
            "current_weather": "true"
        }
        params.update(default_params)
        return self.get(self.forecast, params=params)


def get(url: str, params: dict) -> Union[dict, list, None]:
    """Make a GET request to the OpenWeatherMap API

    :param url: The URL to make the request to
    :type url: str
    :param params: The parameters to send with the request
    :type params: dict
    :raises Exception: If the request fails
    :return: The response from the API
    :rtype: Union[dict, list, None]
    """

    # build url
    url = BASE_URL + url
    params["appid"] = API_KEY

    # make request
    response = requests.get(
        url=url,
        params=params
    )

    # Check for valid status
    if response.status_code == 200:
        return response.json()

    raise Exception("Invalid request")


def weather(lat: float, long: float) -> list[dict]:
    """Get the weather for a given latitude and longitude

    :param lat: The latitude
    :type lat: float
    :param long: The longitude
    :type long: float
    :raises Exception: If the request fails
    :raises Exception: If the response is invalid
    :return: The weather forecasts for the next 5 days
    :rtype: str
    """
    res = get("/data/2.5/forecast", {"lat": lat, "lon": long})

    cod = res.get("cod")
    if cod != "200":
        raise Exception("Invalid request")

    weather_forecasts = res.get('list')
    if not weather_forecasts:
        raise Exception("Invalid request")
    return weather_forecasts


def reverse_geocoding(lat: float, long: float) -> list:
    """Get the city name for a given latitude and longitude

    :param lat: The latitude
    :type lat: float
    :param long: The longitude
    :type long: float
    :raises Exception: If the request fails
    :raises Exception: If the response is invalid
    :return: [
            {'name': 'Etche',
            'lat': 5.0765321,
            'lon': 7.092638789196567,
            'country': 'NG',
            'state': 'Rivers State'}
            ]
    :rtype: list
    """
    res = get("/geo/1.0/reverse", {"lat": lat, "lon": long})
    if not res:
        raise Exception("Invalid request")

    return res


def get_location_alerts(lat: float, long: float) -> List[Dict[str, str]]:
    """Get the location alerts for a given latitude and longitude

    Sample response:

    ```json
    [
        {
            "sender_name": "NWS Tulsa",
            "event": "Severe Thunderstorm Warning",
            "description": "test",
            "start": 1646344800,
            "end": 1646380800,
        }
    ]
    ```

    :param lat: The latitude
    :type lat: float
    :param long: The longitude
    :type long: float
    :raises Exception: If the request fails
    :raises Exception: If the response is invalid
    :return: The location alerts
    :rtype: List[Dict[str, str]]
    """
    res = get("data/3.0/onecall", {"lat": lat,
              "lon": long, "exclude": "hourly,daily"})
    if not res:
        raise Exception("Invalid request")

    alerts: List[dict] = res.get("alerts")
    if not alerts:
        raise Exception("Invalid request")

    # remove tags key from the response
    for alert in alerts:
        alert.pop("tags", None)

    return alerts
