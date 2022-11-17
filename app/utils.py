

# Utility function to generate and verify password hash
from passlib.context import CryptContext
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def generate_hash(password:str):
    hashed_password = pwd_context.hash(password)
    return hashed_password


def verify_password_hash(password, hash_password):
    return pwd_context.verify(password, hash_password)
