# implement main application logic like weather api response here

# FastApi imports
from fastapi import status, HTTPException, APIRouter
import requests
# Internal import
from app import utils 
from utils import *



router = APIRouter(
    prefix="/weather",
    tags=['weather']
)


@router.post("/weather/current")
def get_current_weather():
    
    city_name = requests.json['city_name']
    lga = requests.json['lga']
    state = requests.json['state']
    
    long_lat = utils.geocode_address(city_name, lga, state)
    
    if long_lat is None:
        
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail= f"Can't retrive weather data for this location"
        
        )
    
    lat, lon = long_lat
    
    result = utils.weather_api_call(lon, lat)
    
    weather_condition = result['main']
    description =result['description']
    date = result['dt']
    state = result['state']
    city = result['city']
    time = result['dt'][0]
    
    return {
        
    "state": state,
    "city": city,
    "main": weather_condition,
    "description": description,
    "date": date,
    "time": time    
    }
    
    


    





