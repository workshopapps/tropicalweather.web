from fastapi import APIRouter, HTTPException, status
from schemas import locationResponse
from utils.client import reverse_geocoding

router = APIRouter(
    tags=['location']
)


@router.get('/location', response_model=locationResponse)
async def get_location(lat: float, lon: float):

    try:

        location = reverse_geocoding(lat, lon)

        city = location.get('name')
        state = location.get('state')

        response = {
            'city': city,
            'state': state,
            'lat': lat,
            'lon': lon
        }

        return response

    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot Retrieve weather data for this location")
