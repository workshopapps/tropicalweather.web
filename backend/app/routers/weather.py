from datetime import datetime
from typing import List

from conf.settings import settings
from database import get_db
from fastapi import APIRouter, Depends, HTTPException, status
from schemas import (AlertsResponse, ExtendedForecast,
                     ImmediateForecastResponse, TimelineForcast,
                     UserCurrentWeather, WeatherResponse)
from sqlalchemy.orm import Session
from utils.client import reverse_geocoding
from utils.extended import (get_extended_forecast, get_tommorow_forecast,
                            get_weekly)
from utils.general import (geocode_address, get_immediate_weather_api_call,
                           get_location_obj,
                           immediate_weather_api_call_tommorrow)
from utils.hourly_forecast import hourly_forecasts
from utils.user_current_forecast import user_current_forecasts

router = APIRouter(
    prefix="/weather",
    tags=['weather']
)


@router.get('/forecasts', response_model=List[WeatherResponse])
async def weather_forecasts(lat: float, lon: float):
    return hourly_forecasts(lat, lon)


@router.get('/current', response_model=UserCurrentWeather)
async def get_user_current_weather(lat: float, lon: float):
    """Get current weather for a given address

    :param lat: Latitude to get weather for
    :param lon: Longitude to get weather for
    :type lat: float
    :type lon: float
    :raises HTTPException: If lat or lon is not valid or not found
    :return: Current weather for a user
    :rtype: UserCurrentWeather
    """

    location = reverse_geocoding(lat=lat, long=lon)
    result = user_current_forecasts(lat=lat, lon=lon)
    result['city'] = ""
    result['state'] = location['state']
    result['country'] = location['country']
    return result


@router.get('/current/by-address', response_model=UserCurrentWeather)
async def get_current_weather(address: str):
    """Get current weather for a given address

    :param address: Address to get weather for
    :type address: str
    :raises HTTPException: If address is not valid or not found
    :return: Current weather for the address
    :rtype: UserCurrentWeather
    """

    geo_address = geocode_address(address)
    lat, lon = geo_address['lat'], geo_address['lon']
    result = user_current_forecasts(lat=lat, lon=lon)
    result['city'] = geo_address['city']
    result['state'] = geo_address['state']
    result['country'] = geo_address['country']
    return result


@router.get("/forecasts/immediate", response_model=ImmediateForecastResponse)
async def immediate_weather_forecast(lat: float = None, lng: float = None):

    if lat is None and lng is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="invalid longitute and latitude"
        )
    result = get_immediate_weather_api_call(lat, lng)

    return result


@router.get(
    '/forecasts/tomorrow/immediate', response_model=ImmediateForecastResponse)
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
def get_alert_list(lat: float, lon: float, db: Session = Depends(get_db)):

    latlng = reverse_geocoding(lat, lon)

    city = latlng.get('name')
    state = latlng.get('state')
    country = latlng.get('country')

    loc_obj = get_location_obj(db, city, state, country)

    data = []

    if loc_obj is not None:
        for mydata in loc_obj.alerts:
            # date_time -> type:INT from model
            date_time = mydata.end

            if date_time is not None:
                # date -> type:TimeStamp from date_time
                date_obj = mydata.end_datetime()

                alert_instance = {
                    'event': mydata.event,
                    'message': mydata.message,
                    'datetime': datetime.strftime(
                        date_obj, settings.DATETIME_FORMAT)
                }

                data.append(alert_instance)

    return data


@router.get('/forcast/extended', response_model=ExtendedForecast)
async def extended_forecast_by_location(lat: float, lon: float):
    address = reverse_geocoding(lat, lon)
    lat = address['lat']
    lon = address['lon']

    extended = get_extended_forecast(lat, lon)

    result = {
        "city": address['name'],
        "state": address['state'],
        "country": address['country'],
        "current": extended.get('current'),
        "todays_timeline": extended.get('todays_timeline')
    }
    return result


@router.get('/forcast/extended/by_address', response_model=ExtendedForecast)
async def get_extended_forcast_by_address(address):
    geocoded = geocode_address(address)
    lat = geocoded['lat']
    lon = geocoded['lon']

    extended = get_extended_forecast(lat, lon)
    print(extended.get('current'))

    result = {
        "city": geocoded['city'],
        "state": geocoded['state'],
        "country": geocoded['country'],
        "current": extended.get('current'),
        "todays_timeline": extended.get('todays_timeline')
    }
    return result


@router.get("/forecasts/tomorrow", response_model=list[TimelineForcast])
async def weather_tomorrow_by_location(lat: float, lon: float):
    address = reverse_geocoding(lat, lon)
    lat = address.get('lat')
    lon = address.get('lon')
    city = address.get('name')
    state = address.get('state')
    country = address.get('country')
    results = get_tommorow_forecast(lat, lon, city, state, country)
    return results


@router.get(
    "/forecasts/tomorrow/by-address", response_model=list[TimelineForcast])
async def weather_tomorrow(address: str):
    geo = geocode_address(address)
    lat = geo['lat']
    lon = geo['lon']
    city = geo['city']
    state = geo['state']
    country = geo['country']
    results = get_tommorow_forecast(lat, lon, city, state, country)
    return results


@router.get('/forecasts/by-address', response_model=List[WeatherResponse])
async def forecast_by_address(address: str):
    """
    Get today forecasts for a given address
    param address: Address to get forecast for
    type address: str
    raise HTTPException: If address is not valid or not found
    return: today forecasts for the address
    rtype: SingleWeatherResponse
    """
    geo_address = geocode_address(address)
    lat, lon = geo_address['lat'], geo_address['lon']
    data = hourly_forecasts(lat, lon)
    return data


@router.get('/weekly', response_model=list[TimelineForcast])
async def weather_this_week_by_location(lat: float, lon: float):
    address = reverse_geocoding(lat, lon)
    city = address.get('name')
    state = address.get('state')
    country = address.get('country')
    return get_weekly(lat, lon, city, state, country)


@router.get("/weekly/by-address", response_model=list[TimelineForcast])
async def weather_this_week(address: str):
    try:
        geocoded = geocode_address(address)

    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Can't retrieve weather data for this location"
        )

    return get_weekly(
        geocoded['lat'], geocoded['lon'],
        geocoded['city'], geocoded['state'],
        geocoded['country']
    )
