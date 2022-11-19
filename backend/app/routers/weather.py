# implement main application logic like weather api response here

# FastApi imports
from fastapi import APIRouter, HTTPException, status
from utils import immediate_weather_api_call

# Internal import
from schemas import *

# Sqlalchemy import

router = APIRouter(
    tags=['weather']
)

@router.get("/weather/forecasts/immediate")
def get_immediate_weather_forecast(lat: int=None, lng: int=None):
    
    if lat is None and lng is None:
        
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail= f"invalid longitute and latitude"
        
        )
    
    return immediate_weather_api_call(lng, lat)
