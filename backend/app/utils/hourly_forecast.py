from utils.open_meteo import client
from datetime import datetime
from utils.weather_code import WmoCodes
from fastapi import HTTPException, status

from utils.general import (get_risk)


def hourly_forecasts(lat: float, lon: float):
    """Get the hourly forecasts for a given location"""
    try:
        weather_forecasts_data = client.get_hourly_forecast(
            lat, lon, hourly_params=['weathercode'])

    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Can't retrive weather data for this location"
        )

    results = []
    hourly_time: list[str] = weather_forecasts_data["hourly"]["time"]
    hourly_temp: list[str] = weather_forecasts_data["hourly"]["apparent_temperature"]
    hourly_precipitation: list[str] = weather_forecasts_data["hourly"]["precipitation"]
    hourly_weathercode: list[str] = weather_forecasts_data["hourly"]["weathercode"]

    now_time = datetime.now()
    for forecast in range(24):
        index_time = hourly_time[forecast]
        index_time = datetime.strptime(index_time, "%Y-%m-%dT%H:%M")
        if index_time > now_time:
            index_temp = hourly_temp[forecast]
            index_precipitation = hourly_precipitation[forecast]
            index_weathercode = hourly_weathercode[forecast]

            weather_desc = WmoCodes.get_wmo_code(index_weathercode)
            risk = get_risk(index_temp, index_precipitation)

            data = {
                "main": weather_desc,
                "datetime": hourly_time[forecast].replace("T", " "),
                "risk": risk
            }

            results.append(data)

    return results
