from pydantic import BaseModel
from typing import Any


class SingleWeatherResponse(BaseModel):
    main: str
    description: str
    date: str
    time: str


class locationResponse(BaseModel):
    city: str
    state: str


class CurrentWeatherResponse(SingleWeatherResponse, locationResponse):
    pass


class PacketModel(BaseModel):
    content: Any
    content_type: str
