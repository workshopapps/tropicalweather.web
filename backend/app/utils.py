# Utility functions

from typing import List, Union, Dict

import geocoder
import requests
from decouple import config
from fastapi import HTTPException, status


OPEN_WEATHER_API_KEY = config("OPEN_WEATHER_API_KEY")


def convert_epoch_to_datetime(epoch_time) -> Dict[str, str]:
    pass


def get_weather_forecast(lat: float, lon: float) -> List[Dict[str, str]]:
    """Get weather forecast for next 10 steps

    :param lat: latitude
    :type lat: float
    :param lon: longitude
    :type lon: float
    :return: weather forecast for next 10 steps
    :rtype: list
    """

    url = f"http://api.openweathermap.org/data/2.5/forecast?\
lat={lat}&lon={lon}&appid={OPEN_WEATHER_API_KEY}"

    response = requests.get(url)
    error = Exception("Invalid request")

    if response.status_code != 200:
        raise error

    data: dict = response.json()

    if not data:
        raise error

    cod = str(data.get('cod'))
    if cod != "200":
        raise error

    weather_forecasts = data.get('list')
    if not weather_forecasts:
        raise error

    return weather_forecasts[:10]


def geocode_address(
    city_name: str, lga: str = "", state: str = ""
) -> Union[List[str], None]:
    """Get geocode of city, lga and state

    :param city_name: city name
    :type city_name: str
    :param lga: local government area
    :type lga: str or None
    :param state: state
    :type state: str or None
    :return: geocode in format [lat, long]
    :rtype: list or None
    """

    address = f"{city_name}"

    if lga:
        address += f", {lga}"
    if state:
        address += f", {state}"

    g = geocoder.osm(address)
    return g.latlng


# function to call the open weather api and fetch the required data
# Required data = "lon" and "lat"
def weather_api_call(lon, lat, *args, **kwargs):

    API_key = config("API_KEY")

    # converts given parameters into required types
    lon = float(lon)
    lat = float(lat)

    # Call API and converts response into dictionary
    open_weather_url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_key}"

    try:
        response = requests.get(open_weather_url).json()

        # Error messages for unknown city or street names or invalid API key
        if response.status_code != 200:
            return f"Can't retrive weather data for this location"

        weather_conditions = response['weather'] #returns a lists

        for detail in weather_conditions:
            current_weather = detail['main']
            weather_description = detail['description']

        return {
            "current_weather": current_weather,
            "weather_description": weather_description
        }
    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Weather conditon not found.Please retry again"
        )
