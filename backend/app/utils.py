# Utility functions

import datetime
from datetime import timedelta
from typing import Dict, List, Optional, Union

import geocoder
import requests
from app.client import get_location_alerts, weather
from app.models import Location
from app.schemas import ImmediateForecastResponse
from decouple import config
from fastapi import HTTPException, Request, status
from sqlalchemy.orm import Session

OPEN_WEATHER_API_KEY = config("OPEN_WEATHER_API_KEY")


def get_room_name(city: str, state: str):
    """Get the room name for a given city and state,
    to be used for socketio

    :param city: The city
    :type city: str
    :param state: The state
    :type state: str
    """

    return f"{city}-{state}"


def convert_epoch_to_datetime(epoch_time: int) -> Dict[str, str]:
    """Convert epoch time to datetime, return dict of
    date, time

    Sample response

    ```
    {
        "date": "01 Jan, 2021",
        "time": "12:00am"
    }
    ```

    :param epoch_time: epoch time
    :type epoch_time: int
    :return: dict of date, time
    :rtype: Dict[str, str]
    """

    time_format = datetime.datetime.fromtimestamp(epoch_time)
    date = time_format.strftime('%d %b, %Y')
    am_or_pm = time_format.strftime('%p')
    hour_minute = time_format.strftime('%I:%M')
    time_output = f"{hour_minute}{am_or_pm.lower()}"
    return {
        "date": date,
        "time": time_output
    }


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
    address: str,
) -> Dict[str, Union[str, float]]:
    """Geocode address, return dict of
    latitude, longitude, city, state

    :param address: address
    :type address: str
    :raises HTTPException: if address is not found
    :return: dict of latitude, longitude, city, state
    :rtype: Dict[str, Union[str, float]]
    """

    g = geocoder.osm(address)

    if not g.ok:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Address not found. Please retry again",
        )

    return {
        "lat": g.lat,
        "lon": g.lng,
        "city": g.city,
        "state": g.state,
    }


def reverse_geocode(lat: float, lon: float):
    """Reverse geocode the latitude and longitude to get the address

    :param lat: latitude
    :type lat: float
    :param lon: longitude
    :type lon: float
    :raises HTTPException: if address is not found
    :return: city, state
    :rtype: str
    """

    g = geocoder.osm([lat, lon], method='reverse')

    if not g.ok:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Address not found. Please retry again",
        )

    return {
        'city': g.city,
        'state': g.state
    }


def get_location_alerts_by_address(address: str):
    """Get the location alerts for a given address

    :param address: The address
    :type address: str
    :raises Exception: If the request fails
    :raises Exception: If the response is invalid
    :return: The location alerts
    :rtype: list[Dict[str, str]]
    """
    geo_addr = geocode_address(address)
    lat = geo_addr['lat']
    lon = geo_addr['lon']
    return get_location_alerts(lat, lon)


def weather_api_call(lon: float, lat: float) -> Dict[str, str]:
    """Get the current weather data from the OpenWeatherMap API.

    :param lon: longitude
    :type lon: float
    :param lat: latitude
    :type lat: float
    :raises HTTPException: if address is not found
    :return: weather data with keys: main, description and dt
    :rtype: Dict[str, str]
    """

    API_key = config("OPEN_WEATHER_API_KEY")

    # converts given parameters into required types
    lon = float(lon)
    lat = float(lat)

    # Call API and converts response into dictionary
    open_weather_url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_key}"  # noqa

    try:
        response = requests.get(open_weather_url)

        # Error messages for unknown city or street names or invalid API key
        if response.status_code != 200:
            raise Exception

        data: dict = response.json()
        weather_conditions = data['weather'][0]

        return {
            'main': weather_conditions['main'],
            'description': weather_conditions['description'],
            'dt': data['dt']
        }
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Weather conditon not found. Please retry again"
        )


def get_immediate_weather_api_call(lat: float, lng: float) -> Dict[str, str]:

    # Call API and converts response into dictionary
    open_weather_url = f"https://api.openweathermap.org/data/2.5/\
weather?lat={lat}&lon={lng}&appid={OPEN_WEATHER_API_KEY}"
    response = requests.get(open_weather_url)
    error = Exception("Invalid Request")

    if response.status_code != 200:
        raise error

    data: dict = response.json()

    time_epoch = data['dt']
    main = data['weather'][0]['main']
    description = data['weather'][0]['description']

    time_format = datetime.datetime.fromtimestamp(time_epoch)
    date = time_format.strftime('%d %b, %Y')
    am_or_pm = time_format.strftime('%p')
    hour_minute = time_format.strftime('%I:%M')
    time_output = f"{hour_minute}{am_or_pm.lower()}"

    return ImmediateForecastResponse(
        main=main,
        description=description,
        date=date,
        time=time_output
    )


def convert():
    today = datetime.datetime.now()
    tomorrow = today + timedelta(days=1)
    datetime_object = tomorrow.replace(
        hour=0, minute=0, second=0, microsecond=0)
    epoch = int(datetime_object.timestamp())
    return epoch


def immediate_weather_api_call_tommorrow(lon: float, lat: float):
    """Get immediate_weather_api_call_tommorrow,
    return dict of next day forcast

        :param lon: lon
        :type lon: float
        :param: lat: lat
        :type lat: float
        :raises HTTPException: if location info is not found
        :return: dict of main, description
        :rtype: Dict -> result
    """

    try:

        # makes the api call and returns a formatted list
        weather_conditions = weather(lat, lon)

        tommorows_date = datetime.datetime.now() + timedelta(days=1)
        filter_date = tommorows_date.replace(
            hour=0, minute=0, second=0, microsecond=0)
        tommorrows_timestamp = int(filter_date.timestamp())

        tommorrow_weather_data = 0

        for data in weather_conditions:  # getting tommorrows weather data

            if data['dt'] >= tommorrows_timestamp:
                tommorrow_weather_data = data
                break

        main = tommorrow_weather_data['weather'][0]['main']

        description = tommorrow_weather_data['weather'][0]['description']
        date = tommorrow_weather_data['dt']

        pre_result = {
            "main": str(main),
            "description": str(description)
        }
        result = dict(pre_result)
        res = convert_epoch_to_datetime(date)
        result.update(res)

        return result

    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Weather conditon not found.Please retry again"
        )


def get_location_obj(
    session: Session, city: str, state: str
) -> Optional[Location]:
    location_weather_info = session.query(
        Location).filter_by(city=city, state=state).first()
    return location_weather_info


def get_status(request: Request):
    try:
        forecast_response = requests.get(
            'https://api.weathery.hng.tech/weather/forecasts?lat=3&lon=4')
        if forecast_response.status_code == 200:
            forecasts = 'up'
        else:
            forecasts = 'down'
    except Exception:
        forecasts = 'down'
    try:
        current_response = requests.get(
            'https://api.weathery.hng.tech/weather/current?lat=3&lng=4')
        if current_response.status_code == 200:
            current = 'up'
        else:
            current = 'down'
    except Exception:
        current = 'down'

    try:
        tomorrow_response = requests.get(
            'https://api.weathery.hng.tech/weather/forecasts/tomorrow?lat=3&lon=4')  # noqa
        if tomorrow_response.status_code == 200:
            tomorrow = 'up'
        else:
            tomorrow = 'down'
    except Exception:
        tomorrow = 'down'

    try:
        immediate_response = requests.get(
            'https://api.weathery.hng.tech/weather/forecasts/immediate?lat=3&lng=4')  # noqa
        if immediate_response.status_code == 200:
            immediate = 'up'
        else:
            immediate = 'down'
    except Exception:
        immediate = 'down'

    try:
        tomorrow_im_response = requests.get(
            'https://api.weathery.hng.tech/weather/forecasts/tomorrow/immediate?lat=3&lon=4')  # noqa
        if tomorrow_im_response.status_code == 200:
            tomorrow_im = 'up'
        else:
            tomorrow_im = 'down'
    except Exception:
        tomorrow_im = 'down'

    try:
        location_response = requests.get(
            'https://api.weathery.hng.tech/location?lat=3&lon=4')
        if location_response.status_code == 200:
            location = 'up'
        else:
            location = 'down'
    except Exception:
        location = 'down'

    try:
        risk_response = requests.get(
            'https://api.weathery.hng.tech/weather/risk?lat=3&lon=4')
        if risk_response.status_code == 200:
            risk = 'up'
        else:
            risk = 'down'
    except Exception:
        risk = 'down'

    try:
        alert_city_response = requests.get(
            'https://api.weathery.hng.tech/weather/alerts/gberigbe')
        if alert_city_response.status_code == 200:
            alert_city = 'up'
        else:
            alert_city = 'down'
    except Exception:
        alert_city = 'down'

    try:
        alert_list_response = requests.get(
            'https://api.weathery.hng.tech/weather/alerts/lists')
        if alert_list_response.status_code == 200:
            alert_list = 'up'
        else:
            alert_list = 'down'
    except Exception:
        alert_list = 'down'

    return {
        "request": request,
        "forecasts": forecasts,
        "current": current,
        "immediate": immediate,
        "tomorrow": tomorrow,
        "tomorrow_im": tomorrow_im,
        "location": location,
        "risk": risk,
        "alert_city": alert_city,
        "alert_list": alert_list
    }
