# implement main application logic like weather api response here

# FastApi imports
from typing import List

from app.models import SingleWeatherResponse
from fastapi import APIRouter
from fastapi import HTTPException, status
# Internal import
from app.schemas import *  # noqa: F401, F403
from app.utils import get_weather_forecast, convert_epoch_to_datetime, geocode_address, weather_api_call
import requests

router = APIRouter(
    prefix="/weather",
    tags=['weather']
)


@router.post("/weather/current")
def get_current_weather():
    
    city_name = requests.json['city_name']
    state = requests.json['state']
    
    long_lat = geocode_address(city_name, state)
    
    if long_lat is None:
        
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail= f"Can't retrive weather data for this location"
        
        )
    
    lat = long_lat['lat']
    lng= long_lat['lng']
   # city = long_lat['city']
   # state = long_lat['state']
    
    result = weather_api_call(lat, lng)
     
    if result is None:
        
       raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Weather conditon not found.Please retry again"
        )

    
    weather_condition = result['main']
    description =result['description']
    date = result['dt']
    state = result['state']
    city = result['city']
    time = result['time']
    
    return {
        
    "state": state,
    "city": city,
    "main": weather_condition,
    "description": description,
    "date": date,
    "time": time    
    }



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
