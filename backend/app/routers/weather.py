# implement main application logic like weather api response here

# FastApi imports
from typing import List
from fastapi import Response, status, HTTPException, Depends, APIRouter

# Internal import
from models import User
from schemas import *
from database import db_engine, get_db
from utils import generate_hash

# Sqlalchemy import

router = APIRouter(
    tags=['weather']
)

@router.post('/weather/')
def get_tommorrows_weather(lat: int=None, lng: int=None):
    if lat is None and lng is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail= f"invalid longitute and latitude"

        )

    return    utils.immediate_weather_api_call_tommorrow()