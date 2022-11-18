
from decouple import config

# Utility function to generate and verify password hash
from passlib.context import CryptContext
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def generate_hash(password: str):
    """Generate hash for password

    :param password: password to hash
    :type password: str
    :return: hashed password
    :rtype: str
    """
    hashed_password = pwd_context.hash(password)
    return hashed_password


def verify_password_hash(password: str, hash_password: str):
    """verify password hash

    :param password: password to verify
    :type password: str
    :param hash_password: hashed password
    :type hash_password: str
    :return: True if password is correct else False
    :rtype: bool
    """
    return pwd_context.verify(password, hash_password)



# feature to call the open weather api and fetch the required data



def waether_api_call(lon, lat, *args, **kwargs):

    API_key = config("API_KEY")
    part = "alert"
    open_weather_url = f"https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API_key}"
