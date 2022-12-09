# Utility functions

import datetime
from datetime import timedelta
from typing import Dict, List, Optional, Union

import geocoder
import pytz
import requests
from conf.settings import settings
from fastapi import HTTPException, status
from models import Location
from schemas import ImmediateForecastResponse
from sqlalchemy.orm import Session

from .client import weather
from .open_meteo import client
from .timer import now_utc
from .weather_code import WmoCodes


FLOODING = "Flooding"
HEATWAVE = "Heatwave"
SUNNY = "Sunny"


def get_event_message(event: str):
    """Format the risk message

    Args:
        risk (str): The risk

    Returns:
        str: The formatted risk message
    """
    if event == FLOODING:
        return "Flooding is expected in your area"
    elif event == HEATWAVE:
        return "A heatwave is expected in your area"
    elif event == SUNNY:
        return "It will be sunny in your area"
    else:
        return f"There will be {event} in your area"


def get_risks_by_location(
    lat: float, long: float
) -> List[Dict[str, Union[datetime.datetime, str]]]:
    results = []

    response = client.get_hourly_forecast(lat, long, timezone="UTC")

    hourly_time: list[str] = response["hourly"]["time"]
    hourly_temp: list[str] = response["hourly"]["apparent_temperature"]
    hourly_precipitation: list[str] = response["hourly"]["precipitation"]
    weather_code: list[str] = response['hourly']['weathercode']

    now = now_utc()

    max_time = now + datetime.timedelta(hours=settings.MAX_STEP_HOURS + 1)

    pointer = ""

    i = -1
    limit = len(hourly_time)
    while i < limit:

        i += 1

        index_time = datetime.datetime.strptime(
            hourly_time[i], "%Y-%m-%dT%H:%M")
        index_time = pytz.utc.localize(index_time)

        if index_time > max_time:
            break

        if pointer != "":
            index_temp = hourly_temp[i]
            index_precipitation = hourly_precipitation[i]
            index_weather_code = weather_code[i]
            current_risk = get_event(
                index_weather_code, index_temp, index_precipitation)

            if current_risk != pointer:  # changed
                results[-1]["end"] = index_time
                pointer = ''
                i -= 1

            continue

        if index_time >= now:
            index_temp = hourly_temp[i]
            index_precipitation = hourly_precipitation[i]
            index_weather_code = weather_code[i]
            risk = get_event(index_weather_code, index_temp,
                             index_precipitation)

            if risk is None:
                continue

            result = {
                "start": index_time,
                "end": max_time,
                "event": risk,
                "description": get_event_message(risk)
            }

            pointer = risk

            results.append(result)

    if results:
        if results[-1]["start"] == max_time:
            results.pop()

    return results


def compose_location(city: str, state: str, country: str) -> str:
    """compose the location city, state and country
    return a merged string

    Args:
        city (str): The city
        state (str): The state
        country (str): The country

    Returns:
        str: The merged string
    """
    args = [city, state, country]
    args = [(arg or "null") for arg in args]
    name = "-".join(args)
    return name


def decompose_merged_location(merged_location: str) -> Dict[str, str]:
    """Decompose the merged location to city, state and country

    Args:
        merged_location (str): The merged location

    Returns:
        Dict[str, str]: The decomposed location
    """
    location = merged_location.split('-')
    return {
        'city': location[0],
        'state': location[1],
        'country': location[2]
    }


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

    data = weather(lat, lon)
    return data[:10]


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

    city = g.city
    if city is None:
        city = g.county

    return {
        "lat": g.lat,
        "lon": g.lng,
        "city": city,
        "state": g.state,
        "country": g.country
    }


def convert():
    today = datetime.datetime.now()
    tomorrow = today + timedelta(days=1)
    datetime_object = tomorrow.replace(
        hour=0, minute=0, second=0, microsecond=0)
    epoch = int(datetime_object.timestamp())
    return epoch


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

    city = g.city
    if city is None:
        city = g.county

    return {
        'city': city,
        'state': g.state,
        'country': g.country
    }


def get_risks_by_address(address: str):
    """Get the location alerts for a given address

    :param address: The address
    :type address: str
    :raises Exception: If the request fails
    :raises Exception: If the response is invalid
    :return: The location alerts
    :rtype: List[Dict[str, str]]
    """
    geo_addr = geocode_address(address)
    lat = geo_addr['lat']
    lon = geo_addr['lon']
    return get_risks_by_location(lat, lon)


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

    API_key = settings.OPEN_WEATHER_API_KEY

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
    data = weather(lat, lng)

    time_epoch = data['dt']
    main = data['weather'][0]['main']
    description = data['weather'][0]['description']

    date_time = convert_epoch_to_datetime(time_epoch)

    return ImmediateForecastResponse(
        main=main,
        description=description,
        date=date_time['date'],
        time=date_time['time']
    )


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
    session: Session, city: str, state: str, country: str
) -> Optional[Location]:
    """Get the location object from the database

    Args:
        session (Session): The database session
        city (str): The city
        state (str): The state
        country (str): The country

    Returns:
        Optional[Location]: The location object
    """
    location_weather_info = session.query(
        Location).filter_by(
            city=city, state=state, country=country).first()
    return location_weather_info


def get_status():
    urls = [
        ("forecasts", "https://api.tropicalweather.hng.tech/weather/forecasts?lat=6.5631&lon=3.2506"),
        ("current", "https://api.tropicalweather.hng.tech/weather/current?lat=6.5631&lon=3.2506"),
        ("current-by-address", "https://api.tropicalweather.hng.tech/weather/current/by-address?address=Ikotun%2C%20Lagos%20State%2C%20Nigeria"),
        ("forecasts-immediate", "https://api.tropicalweather.hng.tech/weather/forecasts/immediate?lat=6.5631&lng=3.2506"),
        ("tomorrow-immediate", "https://api.tropicalweather.hng.tech/weather/forecasts/tomorrow/immediate?lat=6.5631&lon=3.2506"),
        ("alerts-list", "https://api.tropicalweather.hng.tech/weather/alerts/list?lon=6.5631&lat=3.2506"),
        ("risk", "https://api.tropicalweather.hng.tech/weather/risk?lat=6.5631&lon=3.2506"),
        ("forecast-extended", "https://api.tropicalweather.hng.tech/weather/forcast/extended?lat=6.5631&lon=3.2506"),
        ("forecast-extended-by-addres", "https://api.tropicalweather.hng.tech/weather/forcast/extended/by_address?address=Ikotun%2C%20Lagos%20State%2C%20Nigeria"),
        ("forecasts-tomorrow", "https://api.tropicalweather.hng.tech/weather/forecasts/tomorrow?lat=6.5631&lon=3.2506"),
        ("forecasts-tomorrow-address", "https://api.tropicalweather.hng.tech/weather/forecasts/tomorrow/by-address?address=Ikotun%2C%20Lagos%20State%2C%20Nigeria"),
        ("location", "https://api.tropicalweather.hng.tech/location?lat=6.5631&lon=3.2506"),
        ("share", "https://api.tropicalweather.hng.tech/generate/share-link?city=Ikotun&state=Lagos%20State&country=Nigeria")
    ]

    response = {}

    for key, url in urls:
        try:
            forecast_response = requests.get(url)  # noqa
            if forecast_response.status_code == 200:
                response[key] = 'up'
            else:
                response[key] = 'down'
        except Exception:
            response[key] = 'down'

    return response


def get_risk(temp: float, precipitation: float) -> Optional[str]:
    """Get risk of the weather, depending on the temperature and precipitation

    Args:
        temp (float): temperature
        precipitation (float): precipitation

    Returns:
        Optional[str]: risk of the weather or None
    """
    if precipitation > 0.5:
        return FLOODING
    elif temp > 38:
        return HEATWAVE
    else:
        return "None"


def get_event(weather_code: str, temp: float, precipitation: float):
    risk = get_risk(temp, precipitation)
    if risk == "None":
        if 0 < int(weather_code) <= 4:
            return SUNNY
        main = WmoCodes.get_wmo_code(weather_code)
        return main
    return risk


def weather_forcast_extended_call(lat: float, lon: float):
    req = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&hourly=weathercode&hourly=precipitation&hourly=temperature_2m&timezone=auto&current_weather=true"
    res = dict(requests.get(req).json())
    return res