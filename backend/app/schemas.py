from typing import Any

from pydantic import BaseModel


class AlertsResponse(BaseModel):
    event: str
    message: str
    date: str
    time: str


class SingleWeatherResponse(BaseModel):
    main: str
    description: str
    date: str
    time: str


class locationResponse(BaseModel):
    city: str
    state: str


class ImmediateForecastResponse(BaseModel):
    main: str
    description: str
    date: str
    time: str


class CurrentWeatherResponse(SingleWeatherResponse, locationResponse):
    pass


class PacketModel(BaseModel):
    content: Any
    content_type: str
