from fastapi import APIRouter, HTTPException, status
from schemas import locationResponse
from utils.client import reverse_geocoding

router = APIRouter(
    tags=['location']
)


@router.get('/location', response_model=locationResponse)
async def get_location(lat: float, lon: float):
    
       
        address : list(dict(str,str)) = reverse_geocoding(lat, lon)
        if address is None: 
            
            raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail= "Invalid-Parameters")
        
        for location in address:
            city = location.get('name')
            state = location.get('state')

        response = {
        'city': city,
        'state': state
        }

        return response
