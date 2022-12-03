from datetime import datetime
from typing import List

from database import get_db
from fastapi import APIRouter, Depends, HTTPException, status
from schemas import (AlertsResponse, CurrentWeatherResponse,
                     ImmediateForecastResponse, RiskEvent, RiskLevel,
                     RiskResponse, WeatherResponse)
from sqlalchemy.orm import Session
from utils.client import reverse_geocoding, weather
from utils.general import (convert, convert_epoch_to_datetime, geocode_address,
                           get_immediate_weather_api_call, get_location_obj,
                           get_risk, immediate_weather_api_call_tommorrow,
                           weather_api_call, weather_forcast_extended_call)
from utils.hourly_forecast import hourly_forecasts
from utils.open_meteo import client
from utils.weather_code import WmoCodes

router = APIRouter(
    prefix="/weather",
    tags=['weather']
)


@router.get('/forecasts', response_model=List[WeatherResponse])
async def weather_forecasts(lat: float, lon: float):

    return hourly_forecasts(lat, lon)


@router.get('/current', response_model=CurrentWeatherResponse)
async def get_current_weather(address: str):
    """Get current weather for a given address

    :param address: Address to get weather for
    :type address: str
    :raises HTTPException: If address is not valid or not found
    :return: Current weather for the address
    :rtype: CurrentWeatherResponse
    """

    geo_address = geocode_address(address)
    lat, lon = geo_address['lat'], geo_address['lon']

    weather_data = weather_api_call(lon, lat)

    return {
        "city": geo_address['city'],
        "state": geo_address['state'],
        'main': weather_data['main'],
        'description': weather_data['description'],
        **convert_epoch_to_datetime(weather_data['dt'])
    }


@router.get("/forecasts/immediate", response_model=ImmediateForecastResponse)
async def immediate_weather_forecast(lat: float = None, lng: float = None):

    if lat is None and lng is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="invalid longitute and latitude"
        )
    result = get_immediate_weather_api_call(lat, lng)

    return result


@router.get("/forecasts/tomorrow")
async def weather_data(lat: float, lon: float):
    try:
        result = weather(lat, lon)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Can't retrive weather data for this location"
        )

    epoch = convert()

    starting_point = None

    for index, _data in enumerate(result):
        if _data['dt'] >= epoch:
            starting_point = index
            break

    if starting_point is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Weather condition not found, Please try again"
        )
    result = result[starting_point:10]
    bus = []
    for forecast in result:
        data = convert_epoch_to_datetime(forecast.get('dt'))
        data['main'] = forecast['weather'][0]['main']
        data['description'] = forecast['weather'][0]['description']
        bus.append(data)
    return bus


@router.get('/forecasts/tomorrow/immediate')
async def get_tommorrows_weather(lat: float, lon: float):

    if lat is None and lon is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="invalid longitute and latitude"
        )

    try:
        tommorows_weather = immediate_weather_api_call_tommorrow(
            lon, lat)  # returns a dictionary
        return tommorows_weather

    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Can't retrive weather data for this location"
        )


@router.get('/alerts/list', response_model=List[AlertsResponse])
def get_alert_list(lon: float, lat: float, db: Session = Depends(get_db)):

    latlng = reverse_geocoding(lat, lon)
    city = latlng.get('city')
    state = latlng.get('state')

    loc_obj = get_location_obj(db, city, state)

    data = []

    if loc_obj is not None:
        for mydata in loc_obj.alerts:

            date_time = convert_epoch_to_datetime(mydata.end)

            alert_instance = {
                'event': mydata.event,
                'message': mydata.message,
                'date': date_time['date'],
                'time': date_time['time']
            }

            data.append(alert_instance)

    return data


@router.get('/risk', response_model=List[RiskResponse])
async def get_location_weather_risk(lat: float, lon: float):

    return [
        {
            "risk": RiskEvent.FLOOD,
            "level": RiskLevel.HIGH,
        },
        {
            "risk": RiskEvent.SUNBURN,
            "level": RiskLevel.LOW,
        },
        {
            "risk": RiskEvent.DUST,
            "level": RiskLevel.MODERATE,
        },
        {
            "risk": RiskEvent.FOG,
            "level": RiskLevel.EXTREME,
        }
    ]


@router.get('/forcast/extended')
async def get_extended_forecast(lat: float, lon: float):

    # API call
    '''
    req = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&hourly=weathercode&hourly=precipitation&hourly=temperature_2m&timezone=GMT&current_weather=true"

    res = requests.get(req).json()
    '''
    res = weather_forcast_extended_call(lat, lon)

    address = reverse_geocoding(lat, lon)

    city: str = address[0]['city']
    state: str = address[0]['state']
    country: str = address[0]['country']

    main = res['current_weather']['weathercode']
    datetime = res['current_weather']['time']
    hourly_timestamps: list(str) = res['hourly']['time']

    # get the current time index to be used in other parameters
    time_index: int = hourly_timestamps.index(datetime)

    weather_code = res['hourly']['weathercode']
    weather_code[time_index]
    temperature = res['hourly']['temperature_2m'][time_index]

    precipitation = res['hourly']['precipitation'][time_index]

    match = weather_code[time_index]
    end_datetime: str = ""
    for i in range(time_index, len(weather_code)):

        if match != weather_code[i]:
            end_datetime = hourly_timestamps[i]
            break

        break

    risk = get_risk(temperature, precipitation)

    current = {
        "main": WmoCodes.get_wmo_code(main),
        "datetime": datetime.replace("T", " "),
        "end_datetime": end_datetime.replace("T", " "),
        "risk": risk
    }

    todays_timeline = []
    time_line = {
        "main": WmoCodes.get_wmo_code(main),
        "datetime": datetime,
        "risk": risk
    }

    todays_timeline.append(time_line)

    result = {

        "city": city,
        "state": state,
        "country": country,
        "current": current,
        "todays_timeline": todays_timeline

    }
    return result


@router.get('/forcast/extended/by_address')
async def get_extended_forcast_by_address(address):
    city_and_state = geocode_address(address)

    lat = city_and_state['lat']
    lon = city_and_state['lon']
    city = city_and_state['city']
    state = city_and_state['state']
    country = city_and_state['country']

    res = weather_forcast_extended_call(lat, lon)
    main = res['current_weather']['weathercode']
    datetime = res['current_weather']['time']
    hourly_timestamps: list(str) = res['hourly']['time']

    # get the current time index to be used in other parameters
    time_index: int = hourly_timestamps.index(datetime)

    weather_code = res['hourly']['weathercode']
    weather_code[time_index]
    temperature = res['hourly']['temperature_2m'][time_index]

    precipitation = res['hourly']['precipitation'][time_index]

    match = weather_code[time_index]
    end_datetime: str = ""
    for i in range(time_index, len(weather_code)):

        if match != weather_code[i]:
            end_datetime = hourly_timestamps[i]
            break

        break

    risk = get_risk(temperature, precipitation)

    current = {
        "main": WmoCodes.get_wmo_code(main),
        "datetime": datetime.replace("T", " "),
        "end_datetime": end_datetime.replace("T", " "),
        "risk": risk
    }

    todays_timeline = []
    time_line = {
        "main": WmoCodes.get_wmo_code(main),
        "datetime": datetime.replace("T", " "),
        "risk": risk
    }

    todays_timeline.append(time_line)

    result = {

        "city": city,
        "state": state,
        "country": country,
        "current": current,
        "todays_timeline": todays_timeline

    }
    return result


@router.get("/forecasts/tomorrow/by-address")
async def weather_tomorrow(address: str):
    try:
        geo = geocode_address(address)
        lat = geo['lat']
        lon = geo['lon']

    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Can't retrieve weather data for this location"
        )

    response = client.get_hourly_forecast(
        lat, lon, hourly_params=['weathercode'])

    hourly_time: list[str] = response["hourly"]["time"]
    hourly_temp: list[str] = response["hourly"]["apparent_temperature"]
    hourly_precipitation: list[str] = response["hourly"]["precipitation"]
    hourly_weathercode: list[str] = response["hourly"]["weathercode"]

    result = []

    for i in range(24, 48):
        index_time = hourly_time[i]
        index_time = datetime.strptime(index_time, "%Y-%m-%dT%H:%M")

        index_temp = hourly_temp[i]
        index_precipitation = hourly_precipitation[i]
        index_weathercode = hourly_weathercode[i]

        weather_desc = WmoCodes.get_wmo_code(index_weathercode)

        risk = get_risk(index_temp, index_precipitation)

        res = {
            "main": weather_desc,
            "datetime": hourly_time[i].replace("T", " "),
            "risk": risk,
            "state": geo['state'],
            "city": geo['city'],
            "country": geo['country']
        }

        result.append(res)
    return result


@router.get('/forecasts/by-address', response_model=List[WeatherResponse])
async def forecast_by_address(address: str):
    """
    Get today forecasts for a given address
    param address: Address to get forecast for
    type address: str
    raise HTTPException: If address is not valid or not found
    return: today forecasts for the address
    rtype: SingleWeatherResponse
    """

    geo_address = geocode_address(address)

    lat, lon = geo_address['lat'], geo_address['lon']

    data = hourly_forecasts(lat, lon)

    return data
