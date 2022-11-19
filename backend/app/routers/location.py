# FastApi imports
from typing import List

from app.models import locationResponse
from fastapi import APIRouter
from fastapi import HTTPException, status

# Internal import
from app.schemas import *
from app.client import reverse_geocoding


router = APIRouter(
    prefix="/location",
    tags=['location']
)

@router.get('/')
async def get_location(lat: float, lon: float):
    try:
        reverse_geocode = reverse_geocoding(lat, lon)

    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Location does not exist"
        )

    for location in reverse_geocode:
        city = location['name']
        state = location['state']

    response = {
        'city': city,
        'state': state
    }

    return response

