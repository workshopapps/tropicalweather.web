# Utility functions

from typing import List, Union, Dict
from datetime import date, time, timedelta
import geocoder
import requests
import datetime
from decouple import config
from fastapi import HTTPException, status
from app.schemas import ImmediateForecastResponse


OPEN_WEATHER_API_KEY = config("OPEN_WEATHER_API_KEY")


def convert_epoch_to_datetime(epoch_time) -> Dict[str, str]:
    return {
        "date": "",
        "time": "",
    }


def get_weather_forecast(lat: float, lon: float) -> List[Dict[str, str]]:
    """Get weather forecast for next 10 steps

    :param lat: latitude
    :type lat: float
    :param lon: longitude
    :type lon: float
    :return: weather forecast for next 10 steps
    :rtype: list
    """

    url = f"http://api.openweathermap.org/data/2.5/forecast?\
lat={lat}&lon={lon}&appid={OPEN_WEATHER_API_KEY}"

    response = requests.get(url)
    error = Exception("Invalid request")

    if response.status_code != 200:
        raise error

    data: dict = response.json()

    if not data:
        raise error

    cod = str(data.get('cod'))
    if cod != "200":
        raise error

    weather_forecasts = data.get('list')
    if not weather_forecasts:
        raise error

    return weather_forecasts[:10]


def geocode_address(
    address: str,
) -> Dict[str, Union[str, float]]:
    """Geocode address, return dict of
    latitude, longitude, city, state

    :param address: address
    :type address: str
    :raises HTTPException: if address is not found
    :return: dict of latitude, longitude, city, state
    :rtype: Dict[str, Union[str, float]]
    """

    g = geocoder.osm(address)

    if not g.ok:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Address not found. Please retry again",
        )

    return {
        "lat": g.lat,
        "lon": g.lng,
        "city": g.city,
        "state": g.state,
    }


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

def get_immediate_weather_api_call(lat: float, lng: float) -> Dict[str, str]:

    # Call API and converts response into dictionary
    response = requests.get(
        url="https://api.openweathermap.org/data/2.5/weather",
        params={'lat': 22, 'lng': 43, 'appid': OPEN_WEATHER_API_KEY})

    error = Exception("Invalid Request")

    if response.status_code != 200:
        raise error

    data: dict = response.json()

    weather_conditions = data['list'] #returns a lists

    time_epoch = weather_conditions[0]['dt']
    main = weather_conditions[0]['weather'][0]['main']
    description = weather_conditions[0]['weather'][0]['description']

    time_format = datetime.datetime.fromtimestamp(time_epoch)
    date = time_format.strftime('%d %b, %Y')
    am_or_pm = time_format.strftime('%p')
    hour_minute = time_format.strftime('%I:%M')
    time_output = f"{hour_minute}{am_or_pm.lower()}"

    return ImmediateForecastResponse(
        main=main,
        description=description,
        date=date,
        time=time_output
    )

def convert():
    today = datetime.datetime.now()
    tomorrow = today + timedelta(days=1)
    datetime_object = tomorrow.replace(hour=0, minute=0, second=0, microsecond=0)
    epoch = int(datetime_object.timestamp())
    return epoch

def immediate_weather_api_call_tommorrow(lon :float, lat: float, *args, **kwargs):
    
    try:

        weather_conditions = weather(lat, lon) #makes the api call and returns a formatted list 
        
        tommorows_date = datetime.now() + timedelta(days=1)
        filter_date = tommorows_date.replace(hour=0, minute=0, second=0, microsecond=0)
        tommorrows_timestamp = int(filter_date.timestamp())
        
        tommorrow_weather_data = 0
      
        for data in weather_conditions: #getting tommorrows weather data 
         
            if data['dt'] >= tommorrows_timestamp: 
                tommorrow_weather_data = data
                break 
     
        main = tommorrow_weather_data['weather'][0]['main']
  
        description = tommorrow_weather_data['weather'][0]['description']
        date = tommorrow_weather_data['dt'] 
        
        r = {
            "a": "ab",
            "c": "ac"
        }
        pre_result = {
            "main": str(main),
            "description": str(description)
            }
        result = dict(pre_result)
        res = convert_epoch_to_datetime(date)
        result.update(res)
        
        return result

    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail= f"Weather conditon not found.Please retry again"
        )


