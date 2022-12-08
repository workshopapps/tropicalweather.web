from datetime import datetime
from typing import List
import pytz

from database import get_db
from fastapi import APIRouter, Depends, HTTPException, status
from schemas import (AlertsResponse, CurrentWeatherResponse,
                     ImmediateForecastResponse, RiskEvent, RiskLevel,
                     RiskResponse, WeatherResponse, SingleWeatherResponse,
                     WeatherResponse, UserCurrentWeather)
from sqlalchemy.orm import Session
from utils.client import reverse_geocoding, weather
from utils.general import (convert, convert_epoch_to_datetime, geocode_address,
                           get_immediate_weather_api_call, get_location_obj,
                           get_risk, immediate_weather_api_call_tommorrow,
                           weather_api_call, weather_forcast_extended_call, reverse_geocode)
from utils.hourly_forecast import hourly_forecasts
from utils.open_meteo import client
from utils.weather_code import WmoCodes
from utils.user_current_forecast import user_current_forecasts

router = APIRouter(
    prefix="/weather",
    tags=['weather']
)


@router.get('/forecasts', response_model=List[WeatherResponse])
async def weather_forecasts(lat: float, lon: float):

    return hourly_forecasts(lat, lon)


@router.get('/current', response_model=UserCurrentWeather)
async def get_user_current_weather(lat: float, lon: float):
    """Get current weather for a given address

    :param lat: Latitude to get weather for
    :param lon: Longitude to get weather for
    :type lat: float
    :type lon: float
    :raises HTTPException: If lat or lon is not valid or not found
    :return: Current weather for a user
    :rtype: UserCurrentWeather
    """
    location = reverse_geocoding(lat=lat, long=lon)
    result = user_current_forecasts(lat=lat, lon=lon)
    result['city'] = location['city']
    result['state'] = location['state']
    result['country'] = location['country']
    return result


@router.get('/current/by-address', response_model=UserCurrentWeather)
async def get_current_weather(address: str):
    """Get current weather for a given address

    :param address: Address to get weather for
    :type address: str
    :raises HTTPException: If address is not valid or not found
    :return: Current weather for the address
    :rtype: UserCurrentWeather
    """

    geo_address = geocode_address(address)
    lat, lon = geo_address['lat'], geo_address['lon']
    result = user_current_forecasts(lat=lat, lon=lon)
    result['city'] = geo_address['city']
    result['state'] = geo_address['state']
    result['country'] = geo_address['country']
    return result


@router.get("/forecasts/immediate", response_model=ImmediateForecastResponse)
async def immediate_weather_forecast(lat: float = None, lng: float = None):

    if lat is None and lng is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="invalid longitute and latitude"
        )
    result = get_immediate_weather_api_call(lat, lng)

    return result


# @router.get("/forecasts/tomorrow")
# async def weather_data(lat: float, lon: float):
#     try:
#         result = weather(lat, lon)
#     except Exception:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="Can't retrive weather data for this location"
#         )

#     epoch = convert()

#     starting_point = None

#     for index, _data in enumerate(result):
#         if _data['dt'] >= epoch:
#             starting_point = index
#             break

#     if starting_point is None:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="Weather condition not found, Please try again"
#         )
#     result = result[starting_point:10]
#     bus = []
#     for forecast in result:
#         data = convert_epoch_to_datetime(forecast.get('dt'))
#         data['main'] = forecast['weather'][0]['main']
#         data['description'] = forecast['weather'][0]['description']
#         bus.append(data)
#     return bus


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

    latlng = reverse_geocode(lat, lon)

    # if coordinate is incorrect, raise this exception
    if latlng is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"location not found for this coordinates or incorrect coordinates")

    city = latlng.get('city')
    state = latlng.get('state')

    loc_obj = get_location_obj(db, city, state)

    data = []

    if loc_obj is not None:
        for mydata in loc_obj.alerts:

            # date_time -> type:INT from model
            date_time = mydata.end

            if date_time is not None:
                # date -> type:TimeStamp from date_time
                date_obj = datetime.fromtimestamp(date_time, tz=pytz.utc)
                alert_instance = {
                    'event': mydata.event,
                    'message': mydata.message,
                    'datetime': datetime.strptime(date_obj, '%Y/%m/%d %H:%M')
                }

                data.append(alert_instance)
            else:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="No active weather alert for this location")
    else:         
        alert_instance = {
            'event': "None",
            'message': "No alert event for this location",
            'datetime': str(datetime.now(tz=pytz.utc))
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
    try:

        # API call
        res = weather_forcast_extended_call(lat, lon)
        
        address = reverse_geocoding(lat, lon)

        city: str = address[0]['name']
        
        state: str = address[0]['state']
        country: str = address[0]['country']
        
        datetime = res['current_weather']['time']
        hourly_timestamps: list(str) = res['hourly']['time']
        time_index: int = hourly_timestamps.index(datetime)
        temperatures = res['hourly']['temperature_2m']
        weather_code = res['hourly']['weathercode']
        
        
        temperature = res['hourly']['temperature_2m'][time_index]
        
        precipitation = res['hourly']['precipitation'][time_index]
        temp = res['hourly']['temperature_2m']
        prec = res['hourly']['precipitation']
        
        
        rain_code_list = [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82]
        fog_code_list = [45, 46, 47, 48]
        normal_cloud_code_list = [0,1,2,3,4]

        

        for i in range(time_index, 24): 
            
            if weather_code[i] in normal_cloud_code_list: 
                
                
                if temperatures[i] >= 33:
                    main = "Sunny"
                    start_time = hourly_timestamps[i]
                    break
                    
                
            if weather_code[i] in fog_code_list:
                main = WmoCodes.get_wmo_code(weather_code[i])
                start_time = hourly_timestamps[i]
                break 
            
            if weather_code[i] in rain_code_list:
                main = WmoCodes.get_wmo_code(weather_code[i])
                start_time = hourly_timestamps[i]
                break
            else:
                main = "Clear skies"
                start_time=datetime   
                    
        start_time_index = hourly_timestamps.index(start_time)
    
        match = weather_code[start_time_index]
        end_datetime=""
        
        if main == "Sunny":
            
            for i in range(start_time_index, 24):
                
                if temperatures[i] < 33:
                    end_datetime= hourly_timestamps[i]
                    break

        else:
            for i in range(start_time_index, 24):
                if match != weather_code[i]:
                    end_datetime= hourly_timestamps[i]
                    break    
         
        if main == "Clear skies":
            #start_time = datetime
            end_datetime = hourly_timestamps[24] 
    
        risk = get_risk(temperature, precipitation)
        todays_timeline = []
        for forecast in range(time_index, 24):

            main_weather = WmoCodes.get_wmo_code(weather_code[forecast])
            datetime_by_index = hourly_timestamps[forecast]
            temperature_by_index = temp[forecast]
            precipitation_by_index = prec[forecast]
            risk_by_index = get_risk(
                temperature_by_index, precipitation_by_index)

            time_line = {

                "main": main_weather,
                "datetime": datetime_by_index.replace("T", " "),
                "risk": risk_by_index

            }

            todays_timeline.append(time_line)

        current = {
            "main": main,
            "datetime": start_time.replace("T", " "),
            "end_datetime": end_datetime.replace("T", " "),
            "risk": risk
        }

        result = {

            "city": city,
            "state": state,
            "country": country,
            "current": current,
            "todays_timeline": todays_timeline

        }
        return result

    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Can't retrive weather data for this location"
        )


@router.get('/forcast/extended/by_address')
async def get_extended_forcast_by_address(address):

    city_and_state = geocode_address(address)
    
    lat = city_and_state['lat']
    lon = city_and_state['lon']
    #city = city_and_state['city']
    state = city_and_state['state']
    country = city_and_state['country']
    get_city = reverse_geocoding(lat, lon)
    city = get_city[0]['name']
    
    
    res = weather_forcast_extended_call(lat, lon)
    
    datetime = res['current_weather']['time']
    hourly_timestamps: list(str) = res['hourly']['time']
    time_index: int = hourly_timestamps.index(datetime)
    temperatures = res['hourly']['temperature_2m']
    weather_code = res['hourly']['weathercode']
    
    
    temperature = res['hourly']['temperature_2m'][time_index]
    
    precipitation = res['hourly']['precipitation'][time_index]
    temp = res['hourly']['temperature_2m']
    prec = res['hourly']['precipitation']
    
    
    rain_code_list = [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82]
    fog_code_list = [45, 46, 47, 48]
    normal_cloud_code_list = [0,1,2,3,4]

    

    for i in range(time_index, 24): 
        
        if weather_code[i] in normal_cloud_code_list: 
            
            if temperatures[i] > 33:
                main = "Sunny"
                start_time = hourly_timestamps[i]
                break
                
            
        if weather_code[i] in fog_code_list:
            main = WmoCodes.get_wmo_code(weather_code[i])
            start_time = hourly_timestamps[i]
            break 
        
        if weather_code[i] in rain_code_list:
            main = WmoCodes.get_wmo_code(weather_code[i])
            start_time = hourly_timestamps[i]
            break
        else:
            main = "Clear skies"
            start_time=datetime    
    
    start_time_index = hourly_timestamps.index(start_time)

    match = weather_code[start_time_index]
    end_datetime=""
    
    if main == "Sunny":
            
            for i in range(start_time_index, 24):
                
                if temperatures[i] < 33:
                    end_datetime= hourly_timestamps[i]
                    break

    else:
        for i in range(start_time_index, 24):
            if match != weather_code[i]:
                end_datetime= hourly_timestamps[i]
                break    
    
    if main == "Clear skies":
        
        end_datetime = hourly_timestamps[24] 

    risk = get_risk(temperature, precipitation)
    todays_timeline = []
    for forecast in range(time_index, 24):

        main_weather = WmoCodes.get_wmo_code(weather_code[forecast])
        datetime_by_index = hourly_timestamps[forecast]
        temperature_by_index = temp[forecast]
        precipitation_by_index = prec[forecast]
        risk_by_index = get_risk(
            temperature_by_index, precipitation_by_index)

        time_line = {

            "main": main_weather,
            "datetime": datetime_by_index.replace("T", " "),
            "risk": risk_by_index

        }

        todays_timeline.append(time_line)

    current = {
        "main": main,
        "datetime": start_time.replace("T", " "),
        "end_datetime": end_datetime.replace("T", " "),
        "risk": risk
    }

    result = {

        "city": city,
        "state": state,
        "country": country,
        "current": current,
        "todays_timeline": todays_timeline

    }
    return result

   
'''
    get_city = reverse_geocoding(lat, lon)
    city = get_city[0]['name']
    main = res['current_weather']['weathercode']
    datetime = res['current_weather']['time']
    hourly_timestamps: list(str) = res['hourly']['time']
    
    # get the current time index to be used in other parameters
    time_index: int = hourly_timestamps.index(datetime)

    weather_code = res['hourly']['weathercode']
    weather_code[time_index]
    temperature = res['hourly']['temperature_2m'][time_index]

    precipitation = res['hourly']['precipitation'][time_index]
    temp = res['hourly']['temperature_2m']
    prec = res['hourly']['precipitation']
    match = weather_code[time_index]
    end_datetime: str = ""
    for i in range(time_index, len(weather_code)):
        
        if match != weather_code[i]:
            end_datetime = hourly_timestamps[i]        
            break 
        

    risk = get_risk(temperature, precipitation)
    todays_timeline = []
    for forecast in range(time_index, 24):

        main_weather = WmoCodes.get_wmo_code(weather_code[forecast])
        datetime_by_index = hourly_timestamps[forecast]
        temperature_by_index = temp[forecast]
        precipitation_by_index = prec[forecast]
        risk_by_index = get_risk(temperature_by_index, precipitation_by_index)

        time_line = {

            "main": main_weather,
            "datetime": datetime_by_index.replace("T", " "),
            "risk": risk_by_index

        }

        todays_timeline.append(time_line)

    current = {
        "main": WmoCodes.get_wmo_code(main),
        "datetime": datetime.replace("T", " "),
        "end_datetime": end_datetime.replace("T", " "),
        "risk": risk
    }

    result = {

        "city": city,
        "state": state,
        "country": country,
        "current": current,
        "todays_timeline": todays_timeline

    }
    return result
'''

@router.get("/forecasts/tomorrow")
async def weather_tomorrow_by_location(lat: float, lon: float):
    try:
        address = reverse_geocode(lat, lon)
        city = address.get('city')
        state = address.get('state')
        country = address.get('country')

    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Can't retrieve weather data for this location"
        )

    result = []

    hourly_forecasts = client.get_hourly_forecast(
        lat, lon, hourly_params=['weathercode'])

    hourly_time: list[str] = hourly_forecasts['hourly']['time']
    hourly_weathercode: list[str] = hourly_forecasts['hourly']['weathercode']
    hourly_apparent_temperature: list[str] = hourly_forecasts['hourly']['apparent_temperature']
    hourly_precipitation: list[str] = hourly_forecasts['hourly']['precipitation']

    
    for i in range(24, 48):
        main = WmoCodes.get_wmo_code(hourly_weathercode[i])
        date_time = datetime.strptime(hourly_time[i], "%Y-%m-%dT%H:%M")
        risk = get_risk(
            hourly_apparent_temperature[i], hourly_precipitation[i])

        res = {
            "main": main,
            "datetime": date_time,
            "risk": risk,
            "state": state,
            "city": city,
            "country": country,
        }

        result.append(res)

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

@router.get('/weekly')
async def weather_this_week_by_location(lat: float, lon: float):
    try:
        address = reverse_geocode(lat, lon)
        city = address.get('city')
        state = address.get('state')
        country = address.get('country')

    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Can't retrieve weather data for this location"
        )

    result = []

    daily_forecasts = client.get_daily_forecast(
        lat, lon, daily_params=['weathercode'], timezone="Africa/Lagos")

    daily_time: list[str] = daily_forecasts['daily']['time']
    daily_weathercode: list[str] = daily_forecasts['daily']['weathercode']
    daily_apparent_temperature: list[str] = daily_forecasts['daily']['apparent_temperature_max']
    daily_precipitation: list[str] = daily_forecasts['daily']['precipitation_sum']

    
    for i in range(7):
        main = WmoCodes.get_wmo_code(daily_weathercode[i])
        date_time = datetime.strptime(daily_time[i], "%Y-%m-%d")
        risk = get_risk(
            daily_apparent_temperature[i], daily_precipitation[i])

        res = {
            "main": main,
            "datetime": date_time,
            "risk": risk,
            "state": state,
            "city": city,
            "country": country,
        }

        result.append(res)

    return result

@router.get("/weekly/by-address")
async def weather_this_week(address: str):
    try:
        god = geocode_address(address)
        lat = god['lat']
        lon = god['lon']

    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Can't retrieve weather data for this location"
        )

    response = client.get_daily_forecast(
        lat, lon, daily_params=['weathercode'], timezone="Africa/Lagos")

    daily_time: list[str] = response["daily"]["time"]
    daily_temp: list[str] = response["daily"]["apparent_temperature_max"]
    daily_precipitation: list[str] = response["daily"]["precipitation_sum"]
    daily_weathercode: list[str] = response["daily"]["weathercode"]

    data_results = []

    for i in range(7):
        time_index = daily_time[i]
        time_index = datetime.strptime(time_index, "%Y-%m-%d")

        temp_index = daily_temp[i]
        prept_index = daily_precipitation[i]
        index_weathercode = daily_weathercode[i]

        weather_desc = WmoCodes.get_wmo_code(index_weathercode)

        risk = get_risk(temp_index, prept_index)

        data = {
            "main": weather_desc,
            "datetime": daily_time[i],
            "risk": risk,
            "state": god['state'],
            "city": god['city'],
            "country": god['country']
        }

        data_results.append(data)
    return data_results
