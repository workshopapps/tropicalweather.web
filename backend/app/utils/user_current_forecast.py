from datetime import datetime

from fastapi import HTTPException, status
from utils.general import CLEAR, get_main_description, get_risk
from utils.open_meteo import client


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
    found = ""
    end_time = None
    main_start_time = None

    for i in range(24):
        if found != "":
            index_weathercode = hourly_weathercode[i]
            index_temp = hourly_temp[i]
            weather_desc = get_main_description(index_weathercode, index_temp)
            if weather_desc != found:
                end_time = hourly_time[i].replace("T", " ")
                break

            continue
        index_time = hourly_time[i]
        index_time = datetime.strptime(index_time, "%Y-%m-%dT%H:%M")
        if index_time >= now:

            if main_start_time is None:
                main_start_time = hourly_time[i].replace("T", " ")

            index_temp = hourly_temp[i]
            index_precipitation = hourly_precipitation[i]
            index_weathercode = hourly_weathercode[i]
            weather_desc = get_main_description(index_weathercode, index_temp)
            if weather_desc != CLEAR:
                risk = get_risk(index_temp, index_precipitation)
                result = {
                    "main": weather_desc,
                    "datetime": hourly_time[i].replace("T", " "),
                    "risk": risk,
                }
                found = weather_desc

    if result.get('main') is None:
        result['main'] = CLEAR
        result['risk'] = None
        result['datetime'] = main_start_time or now.strftime("%Y-%m-%d %H:%M")

    if end_time is None:
        end_time = hourly_time[23].replace("T", " ")
    result['end_datetime'] = end_time
    return result
