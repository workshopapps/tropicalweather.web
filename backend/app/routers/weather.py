# implement main application logic like weather api response here

# FastApi imports
from typing import List

from app.models import SingleWeatherResponse
from fastapi import APIRouter
from fastapi import HTTPException, status
# Internal import
from app.schemas import *  # noqa: F401, F403

from app.utils import get_weather_forecast, convert_epoch_to_datetime, immediate_weather_api_call_tommorrow
from app.client import weather


router = APIRouter(
    prefix="/weather",
    tags=['weather']
)

<<<<<<< HEAD

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


@router.get('/forecasts/tomorrow/immediate') #response_model=List[SingleWeatherResponse]
async def get_tommorrows_weather(lat: float, lon: float):
    
    if lat is None and lon is None: 
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail= f"invalid longitute and latitude"
        )

    try:
        tommorows_weather = immediate_weather_api_call_tommorrow(lon, lat) #returns a dictionary   
        return tommorows_weather
        
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Can't retrive weather data for this location"
        )
    
=======
@router.post('/weather/forecast/immediate/tommorrow')
def get_tommorrows_weather(lat: int=None, lng: int=None):
    if lat is None and lng is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail= f"invalid longitute and latitude"

        )

    return    utils.immediate_weather_api_call_tommorrow()
>>>>>>> feat/BAC-33-Setup-an-endpoint-that-return-the-next-available-forecast-starting-from-tomorrow
