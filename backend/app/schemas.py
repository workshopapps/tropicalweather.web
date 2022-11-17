
# Pydantic schemas that determines returns types for CRUD operations goes here

from pydantic import BaseModel, EmailStr



"""
    pydantic schema for Event CRUD

    """
class UserBase(BaseModel):
    email: EmailStr

    

class UserCreate(UserBase):
    password: str
    firstName: str
    lastName: str

class UserRead(BaseModel):

    firstName: str
    lastName: str
    email: EmailStr

    class Config:
        orm_mode = True