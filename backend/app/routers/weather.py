# implement main application logic like weather api response here

# FastApi imports
from fastapi import APIRouter

# Internal import
from schemas import *

# Sqlalchemy import

router = APIRouter(
    tags=['weather']
)
