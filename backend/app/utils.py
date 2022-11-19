
from decouple import config
from fastapi import HTTPException, status
from datetime import datetime, timedelta

import requests

# Utility function to generate and verify password hash
from passlib.context import CryptContext
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
# Utility functions

import geocoder


def geocode_address(city_name: str, lga: str = "", state: str = ""):
    """Get geocode of city, lga and state

    :param city_name: city name
    :type city_name: str
    :param lga: local government area
    :type lga: str or None
    :param state: state
    :type state: str or None
    :return: geocode in format [lat, long]
    :rtype: list or None
    """

    address = f"{city_name}"

    if lga:
        address += f", {lga}"
    if state:
        address += f", {state}"

    g = geocoder.osm(address)
    return g.latlng




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

        # Error messages for unknown city or street names or invalid API key
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
            detail=f"Weather conditon not found.Please retry again"
        )


def immediate_weather_api_call_tommorrow(lon, lat, *args, **kwargs):

    API_key = config("API_KEY")

    # converts given parameters into required types
    lng = float(log)
    lat = float(lat)

    # Call API and converts response into dictionary
    open_weather_url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lng}&appid={API_key}"


    try:
        response = requests.get(open_weather_url).json()

        # Error messages for unknown city or street names or invalid API key
        if response.status_code != 200:
            return f"Can't retrive weather data for this location"

        weather_conditions = response['list'] #returns a lists

        tommorows_date = datetime.now() + timedelta(days=1)
        filter_date = tommorows_date.replace(hour=0, minute=0, second=0, microsecond=0)
        tommorrows_timestamp = int(filter_date.timestamp())
        
        tommorrow_weather_data = None
        
        for data in weather_conditions: 
            if tommorrows_timestamp >= data['dt']:
                tommorrow_weather_data = data
                break 
   
        main = tommorrow_weather_data['weather']['0']['main']
        description = tommorrow_weather_data['weather'][0]['description']
        date = tommorrow_weather_data['dt'] 
        time = tommorrow_weather_data['dt_text']
        time_display = tommorrows_date.replace(year=0, month=0, day=0)
        
        
        return {
            "main": main,
            "description": description,
            "date": date,
            "time": time_display
        }
    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail= f"Weather conditon not found.Please retry again"
        )