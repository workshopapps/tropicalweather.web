
from typing import Any, Dict
from urllib.parse import urlencode

import requests
from conf.settings import settings
from fastapi import HTTPException, status


class OpenMeteoAPI:
    """OpenMeteo API Client
    Docs: https://open-meteo.com/en/docs
    """

    def __init__(self) -> None:
        self.base_url = settings.METEO_API
        self.forecast = "forecast"

    def build_url(self, endpoint: str) -> str:
        """Builds the URL for the API request

        Args:
            endpoint (str): The endpoint to be called

        Returns:
            str: The full URL
        """
        return f"{self.base_url}{endpoint}"

    def get(self, url, params: dict = None) -> Dict[str, Any]:
        """Makes a GET request to the API

        Args:
            url (_type_): The endpoint to be called
            params (dict, optional): The GET parameters
            for the requests. Defaults to None.

        Raises:
            Exception: If the request fails

        Returns:
            _type_: The response json from the API
        """
        url = self.build_url(url)
        if params:
            url += f"?{urlencode(params)}"
            url = url.replace('%2C', ',')

        try:
            response = requests.get(url, timeout=5)
        except requests.exceptions.Timeout:
            raise HTTPException(
                status_code=status.HTTP_408_REQUEST_TIMEOUT,
                detail="Request timeout. Please retry again",
            )

        # Check for valid status
        if response.status_code == 200:
            return response.json()

        raise Exception("Invalid request")

    def get_daily_forecast(
        self, lat: float, lon: float,
        timezone: str = "GMT",
        daily_params: list = None,
        params: dict = None
    ):
        """Get daily forecast

        Args:
            lat (float): Latitude
            lon (float): Longitude
            timezone (str, optional): Timezone. Defaults to "GMT".
            daily_params (list, optional): daily
            values to get from the api. Defaults to None.
            params (dict, optional): API GET parameters. Defaults to None.

        Returns:
            _type_: The response json from the API
        """
        if params is None:
            params = {}

        if daily_params is None:
            daily_params = []

        daily_params += [
            'apparent_temperature_max',
            'precipitation_sum',
        ]

        default_params = {
            "latitude": lat,
            "longitude": lon,
            "timezone": timezone,
            "daily": ','.join(daily_params)
        }
        params.update(default_params)

        return self.get(self.forecast, params=params)

    def get_hourly_forecast(
        self, lat: float, lon: float,
        timezone: str = "GMT",
        hourly_params: list = None,
        params: dict = None
    ):
        """Get hourly forecast

        Args:
            lat (float): Latitude
            lon (float): Longitude
            timezone (str, optional): Timezone. Defaults to "GMT".
            hourly_params (list, optional): hourly
            values to get from the api. Defaults to None.
            params (dict, optional): API GET parameters. Defaults to None.

        Returns:
            _type_: The response json from the API
        """
        if params is None:
            params = {}

        if hourly_params is None:
            hourly_params = []

        hourly_params += [
            'apparent_temperature',
            'precipitation',
            'weathercode'
        ]

        default_params = {
            "latitude": lat,
            "longitude": lon,
            "hourly": ','.join(hourly_params),
            "timezone": timezone
        }
        params.update(default_params)
        return self.get(self.forecast, params=params)

    def get_current_weather(
        self, lat: float, lon: float,
        timezone: str = "GMT",
        params: dict = None
    ):
        """Get current weather

        Args:
            lat (float): Latitude
            lon (float): Longitude
            timezone (str, optional): Timezone. Defaults to "GMT".
            params (dict, optional): API GET parameters. Defaults to None.

        Returns:
            _type_: The response json from the API
        """
        if params is None:
            params = {}

        default_params = {
            "latitude": lat,
            "longitude": lon,
            "timezone": timezone,
            "current_weather": "true"
        }
        params.update(default_params)
        return self.get(self.forecast, params=params)


client = OpenMeteoAPI()
