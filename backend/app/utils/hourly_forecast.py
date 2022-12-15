from datetime import datetime

from fastapi import HTTPException, status
from utils.general import get_main_description, get_risk
from utils.open_meteo import client


def hourly_forecasts(lat: float, lon: float, data=None):
    """Get the hourly forecasts for a given location"""
    try:
        if data is None:
            weather_forecasts_data = client.get_hourly_forecast(lat, lon)
        else:
            weather_forecasts_data = data

    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Can't retrive weather data for this location"
        )

    results = []
    hourly_time: list[str] = weather_forecasts_data["hourly"]["time"]
    hourly_temp: list[str] = weather_forecasts_data[
        "hourly"]["apparent_temperature"]
    hourly_precipitation: list[str] = weather_forecasts_data[
        "hourly"]["precipitation"]
    hourly_weathercode: list[str] = weather_forecasts_data[
        "hourly"]["weathercode"]

    now_time = datetime.now()
    for forecast in range(24):
        index_time = hourly_time[forecast]
        index_time = datetime.strptime(index_time, "%Y-%m-%dT%H:%M")

        if index_time > now_time:
            index_temp = hourly_temp[forecast]
            index_precipitation = hourly_precipitation[forecast]
            index_weathercode = hourly_weathercode[forecast]

            weather_desc = get_main_description(index_weathercode, index_temp)
            risk = get_risk(index_temp, index_precipitation)

            data = {
                "main": weather_desc,
                "datetime": hourly_time[forecast].replace("T", " "),
                "risk": risk
            }

            results.append(data)

    return results
