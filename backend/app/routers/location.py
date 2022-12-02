from fastapi import APIRouter, HTTPException, status
from schemas import locationResponse
from utils.client import reverse_geocoding

router = APIRouter(
    tags=['location']
)


@router.get('/location', response_model=locationResponse)
async def get_location(lat: float, lon: float):
    try:
        reverse_geocode = reverse_geocoding(lat, lon)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Location does not exist"
        )

    for location in reverse_geocode:
        city = location.get('name')
        state = location.get('state')

    response = {
        'city': city,
        'state': state
    }

    return response
'''
@router.get('/location', response_model=locationResponse)
async def get_location(lat: float, lon: float):
    pass
'''