# Implement users routes/endpoints here


# FastApi imports
from typing import List
from fastapi import Response, status, HTTPException, Depends, APIRouter


# Internal import
from models import User
from schemas import *
from database import engine, get_db
from utils import generate_hash

# Sqlalchemy import
from sqlalchemy.orm import Session

router = APIRouter(
    prefix="/users",
    tags=['Users']
)


@router.post("/", status_code=status.HTTP_201_CREATED)
def create_user(user: UserCreate, db: Session = Depends(get_db)):

    email = db.query(User).filter(User.email == user.email).first()
    if email:
        return {"detail": f"user with this email: {email}, already exist"}
    try:
        hash_password = generate_hash(user.password)
        user.password = hash_password

        new_user = User(**user.dict())
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return {"user": new_user}
    except:
        return HTTPException(
             status_code=status.HTTP_408_REQUEST_TIMEOUT,
            detail= "user cannot be created, please try again"
        )