# implement main application logic like weather api response here

# FastApi imports
from fastapi import status, HTTPException, APIRouter
import requests
# Internal import
from .. import utils 


router = APIRouter(
    tags=['weather']
)


@router.post("/weather")
def get_current_weather():
    
    city_name = requests.json['city_name']
    lga = requests.json['lga']
    state = requests.json['state']
    
    long_lat = utils.geocode_address(city_name, lga, state)
    
    if long_lat is None:
        
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail= f"invalid longitute and latitude"
        
        )

    
    lat, lon = long_lat
    return utils.weather_api_call(lon, lat)
    


    





