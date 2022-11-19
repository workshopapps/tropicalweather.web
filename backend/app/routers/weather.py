# implement main application logic like weather api response here

# FastApi imports
from typing import List

from app.models import SingleWeatherResponse
from fastapi import APIRouter
from fastapi import HTTPException, status
# Internal import
from app.schemas import *  # noqa: F401, F403

from app.utils import get_weather_forecast, convert_epoch_to_datetime
from fastapi import APIRouter
from datetime import time, datetime, timedelta
import requests
from fastapi import FastAPI
# from .. import utils
from fastapi import HTTPException, status
from app.client import weather

router = APIRouter(
    prefix="/weather",
    tags=['weather']
)


@router.get('/forecasts', response_model=List[SingleWeatherResponse])
async def weather_forcasts(lat: float, lon: float):
    """Get weather forecast for next 10 steps"""
    try:
        weather_forecasts_data = get_weather_forecast(lat, lon)
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Can't retrive weather data for this location"
        )

    results = []

    for forcast in weather_forecasts_data:
        data = convert_epoch_to_datetime(forcast.get('dt'))
        data['main'] = forcast['weather'][0]['main']
        data['description'] = forcast['weather'][0]['description']
        results.append(data)

    return results


@router.get("/forecasts/tomorrow")
async def weather_data(lat: float, long: float):
    result = weather(lat, long)

    today = datetime.now()
    tomorrow = today + timedelta(days=1)
    datetime_object = tomorrow.replace(hour=0, minute=0, second=0, microsecond=0)

    epoch = int(datetime_object.timestamp())

    starting_point = None

    for index, _data in enumerate(result):
        if _data['dt'] >= epoch:
            starting_point = index
            break

    if starting_point is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail = f"Weather condition not found, Please try again"
        )
    result = result[starting_point:10]
    bus = []
    for forecast in result:
        data = convert_epoch_to_datetime(forecast.get('dt'))
        data['main'] = forecast['weather'][0]['main']
        data['description'] = forecast['weather'][0]['description']
        bus.append(data)
    return bus
