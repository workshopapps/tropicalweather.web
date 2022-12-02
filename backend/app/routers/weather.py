from datetime import datetime
from typing import List

from dependencies import get_db
from fastapi import APIRouter, Depends, HTTPException, status
from schemas import (AlertsResponse, CurrentWeatherResponse,
                     ImmediateForecastResponse, SingleWeatherResponse,
                     WeatherResponse)
from sqlalchemy.orm import Session
from utils.client import weather
from utils.general import (convert, convert_epoch_to_datetime, geocode_address,
                           get_immediate_weather_api_call, get_location_obj,
                           get_risk, immediate_weather_api_call_tommorrow,
                           reverse_geocode, weather_api_call)
from utils.hourly_forecast import hourly_forecasts
from utils.open_meteo import client
from utils.weather_code import WmoCodes
from utils.open_meteo import client
from utils.weather_code import WmoCodes
from datetime import datetime
from utils.general import get_risk

router = APIRouter(
    prefix="/weather",
    tags=['weather']
)


@router.get('/forecasts', response_model=List[WeatherResponse])
async def weather_forecasts(lat: float, lon: float):

    return hourly_forecasts(lat, lon)


@router.get('/current', response_model=CurrentWeatherResponse)
async def get_current_weather(address: str):
    """Get current weather for a given address

    :param address: Address to get weather for
    :type address: str
    :raises HTTPException: If address is not valid or not found
    :return: Current weather for the address
    :rtype: CurrentWeatherResponse
    """

    geo_address = geocode_address(address)
    lat, lon = geo_address['lat'], geo_address['lon']

    weather_data = weather_api_call(lon, lat)

    return {
        "city": geo_address['city'],
        "state": geo_address['state'],
        'main': weather_data['main'],
        'description': weather_data['description'],
        **convert_epoch_to_datetime(weather_data['dt'])
    }


@router.get("/forecasts/immediate", response_model=ImmediateForecastResponse)
async def immediate_weather_forecast(lat: float = None, lng: float = None):

    if lat is None and lng is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="invalid longitute and latitude"
        )
    result = get_immediate_weather_api_call(lat, lng)

    return result


@router.get("/forecasts/tomorrow")
async def weather_data(lat: float, lon: float):
    try:
        result = weather(lat, lon)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Can't retrive weather data for this location"
        )

    epoch = convert()

    starting_point = None

    for index, _data in enumerate(result):
        if _data['dt'] >= epoch:
            starting_point = index
            break

    if starting_point is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Weather condition not found, Please try again"
        )
    result = result[starting_point:10]
    bus = []
    for forecast in result:
        data = convert_epoch_to_datetime(forecast.get('dt'))
        data['main'] = forecast['weather'][0]['main']
        data['description'] = forecast['weather'][0]['description']
        bus.append(data)
    return bus


@router.get('/forecasts/tomorrow/immediate')
async def get_tommorrows_weather(lat: float, lon: float):

    if lat is None and lon is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="invalid longitute and latitude"
        )

    try:
        tommorows_weather = immediate_weather_api_call_tommorrow(
            lon, lat)  # returns a dictionary
        return tommorows_weather

    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Can't retrive weather data for this location"
        )


@router.get('/alerts/list', response_model=List[AlertsResponse])
def get_alert_list(lon: float, lat: float, db: Session = Depends(get_db)):

    latlng = reverse_geocode(lat, lon)
    city = latlng.get('city')
    state = latlng.get('state')

    loc_obj = get_location_obj(db, city, state)

    data = []

    if loc_obj is not None:
        for mydata in loc_obj.alerts:

            date_time = convert_epoch_to_datetime(mydata.end)

            alert_instance = {
                'event': mydata.event,
                'message': mydata.message,
                'date': date_time['date'],
                'time': date_time['time']
            }

            data.append(alert_instance)

    return data


@router.get("/forecasts/tomorrow/by-address")
async def weather_tomorrow(address: str):
    try:
        geo = geocode_address(address)
        lat = geo['lat']
        lon = geo['lon']

    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Can't retrieve weather data for this location"
        )
    

    response = client.get_hourly_forecast(lat, lon, hourly_params=['weathercode'])

    hourly_time: list[str] = response["hourly"]["time"]
    hourly_temp: list[str] = response["hourly"]["apparent_temperature"]
    hourly_precipitation: list[str] = response["hourly"]["precipitation"]
    hourly_weathercode: list[str] = response["hourly"]["weathercode"]

    result = []

    for i in range(24, 48):
        index_time = hourly_time[i]
        index_time = datetime.strptime(index_time, "%Y-%m-%dT%H:%M")

        index_temp = hourly_temp[i]
        index_precipitation = hourly_precipitation[i]
        index_weathercode = hourly_weathercode[i]

        weather_desc = WmoCodes.get_wmo_code(index_weathercode)

        risk = get_risk(index_temp, index_precipitation)


        res = {
        	"main": weather_desc,
            "datetime": hourly_time[i].replace("T", " "),
            "risk": risk,
            "state": geo['state'],
            "city": geo['city'],
            "country": geo['country']
        }

        result.append(res)
    return result
