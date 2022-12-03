
from typing import Union

import requests
from conf.settings import settings

BASE_URL = settings.OPEN_WEATHER_BASE_URL
API_KEY = settings.OPEN_WEATHER_API_KEY


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
