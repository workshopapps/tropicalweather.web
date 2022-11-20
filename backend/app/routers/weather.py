# implement main application logic like weather api response here

# FastApi imports
from typing import List, Dict

from app.models import SingleWeatherResponse
from fastapi import APIRouter
from fastapi import HTTPException, status
# Internal import
from app.schemas import *  # noqa: F401, F403

from app.utils import get_weather_forecast, convert_epoch_to_datetime
from app.utils import get_immediate_weather_api_call
from app.schemas import ImmediateForecastResponse

router = APIRouter(
    prefix="/weather",
    tags=['weather']
)


@router.get("/forecasts/immediate")
async def immediate_weather_forecast(lat: float, lng: float):

    # try:
    #     result = get_immediate_weather_api_call(lat, lng)
    
    # if lat is None and lng is None:
    #     raise HTTPException(
    #         status_code=status.HTTP_404_NOT_FOUND,
    #         detail= f"invalid longitute and latitude"
    #     )
    result = get_immediate_weather_api_call(lat, lng)
    
    return result

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
