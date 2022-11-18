
from decouple import config
from fastapi import HTTPException, status

import requests

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



# function to call the open weather api and fetch the required data
# Required data = "lon" and "lat"
def weather_api_call(lon, lat, *args, **kwargs):

    API_key = config("API_KEY")

    # converts given parameters into required types
    lon = float(lon)
    lat = float(lat)

    # Call API and converts response into dictionary
    open_weather_url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_key}"

    try:
        response = requests.get(open_weather_url).json()

        # Error messages for unknown city or staet names or invalid API key
        if response.status_code != 200:
            return f"Can't retrive weather data for this location"
        
        weather_conditions = response['weather'] #returns a lists

        for detail in weather_conditions:
            current_weather = detail['main']
            weather_description = detail['description']
        
        return {
            "current_weather": current_weather,
            "weather_description": weather_description
        }
    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail= f"Weather conditon not found.Please retry again"
        
        )








