from typing import Dict, List

from utils.general import get_main_description, get_risk
from utils.hourly_forecast import hourly_forecasts
from utils.open_meteo import client
from utils.user_current_forecast import user_current_forecasts


def get_extended_forecast(lat: float, lon: float):
    # Make weather forecast call once
    weather_forecasts_data = client.get_hourly_forecast(lat, lon)
    todays_timeline = hourly_forecasts(lat, lon, data=weather_forecasts_data)
    current = user_current_forecasts(lat, lon, data=weather_forecasts_data)

    result = {
        "current": current,
        "todays_timeline": todays_timeline
    }
    return result


def get_tommorow_forecast(
    lat: float, lon: float, city: str, state: str, country: str
) -> List[Dict[str, str]]:
    result = []

    hourly_forecasts = client.get_hourly_forecast(lat, lon)

    hourly_time: list[str] = hourly_forecasts['hourly']['time']
    hourly_weathercode: list[str] = hourly_forecasts['hourly']['weathercode']
    hourly_apparent_temperature: list[str] = hourly_forecasts[
        'hourly']['apparent_temperature']
    hourly_precipitation: list[str] = hourly_forecasts[
        'hourly']['precipitation']

    for i in range(24, 48):
        main = get_main_description(
            hourly_weathercode[i], hourly_apparent_temperature[i])
        date_time = hourly_time[i].replace('T', ' ')
        risk = get_risk(
            hourly_apparent_temperature[i], hourly_precipitation[i])

        res = {
            "main": main,
            "datetime": date_time,
            "risk": risk,
            "city": city,
            "state": state,
            "country": country
        }

        result.append(res)

    return result


def get_weekly(lat: float, lon: float, city: str, state: str, country: str):
    result = []

    daily_forecasts = client.get_daily_forecast(
        lat, lon, daily_params=['weathercode'])

    daily_time: list[str] = daily_forecasts['daily']['time']
    daily_weathercode: list[str] = daily_forecasts['daily']['weathercode']
    daily_apparent_temperature: list[str] = daily_forecasts[
        'daily']['apparent_temperature_max']
    daily_precipitation: list[str] = daily_forecasts[
        'daily']['precipitation_sum']

    for i in range(7):
        main = get_main_description(
            daily_weathercode[i], daily_apparent_temperature[i])
        date_time = daily_time[i].replace('T', ' ')
        risk = get_risk(
            daily_apparent_temperature[i], daily_precipitation[i])

        res = {
            "main": main,
            "datetime": date_time,
            "risk": risk,
            "city": city,
            "state": state,
            "country": country,
        }

        result.append(res)

    return result
