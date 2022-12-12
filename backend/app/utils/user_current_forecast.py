from utils.open_meteo import client
from datetime import datetime
from utils.weather_code import WmoCodes
from fastapi import HTTPException, status
from utils.general import (get_risk)


def user_current_forecasts(lat: float, lon: float, data: list = None):
    """Get user current forecasts

        Args:
            lat (float): Latitude
            lon (float): Longitude

        Returns:
            _type_: The response json from the API
            data: {
                    "main": "Shower rain",
                    "datetime": "2020-01-01 12:00:00",
                    "end_datetime": "2020-01-01 12:00:00",
                    "risk": "Extreame Heat"
                }
        """
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
    result = {}
    hourly_time: list[str] = weather_forecasts_data["hourly"]["time"]
    hourly_temp: list[str] = weather_forecasts_data[
        "hourly"]["apparent_temperature"]
    hourly_precipitation: list[str] = weather_forecasts_data[
        "hourly"]["precipitation"]
    hourly_weathercode: list[str] = weather_forecasts_data[
        "hourly"]["weathercode"]
    now = datetime.now()
    now_str = now.strftime("%Y-%m-%dT%H:%M")
    strp_now = datetime.strptime(now_str, "%Y-%m-%dT%H:%M")
    found = ""
    end_time = None

    for i in range(24):
        if found != "":
            index_weathercode = hourly_weathercode[i]
            weather_desc = WmoCodes.get_wmo_code(index_weathercode)
            if weather_desc != found:
                end_time = hourly_time[i].replace("T", " ")
                break

            continue
        index_time = hourly_time[i]
        index_time = datetime.strptime(index_time, "%Y-%m-%dT%H:%M")
        if strp_now.hour == index_time.hour and strp_now.day == index_time.day:
            index_temp = hourly_temp[i]
            index_precipitation = hourly_precipitation[i]
            index_weathercode = hourly_weathercode[i]
            weather_desc = WmoCodes.get_wmo_code(index_weathercode)
            risk = get_risk(index_temp, index_precipitation)
            result = {
                "main": weather_desc,
                "datetime": hourly_time[i].replace("T", " "),
                "risk": risk,
            }
            found = weather_desc
    if end_time is None:
        end_time = hourly_time[23].replace("T", " ")
    result['end_datetime'] = end_time
    return result
