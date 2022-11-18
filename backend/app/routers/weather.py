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
