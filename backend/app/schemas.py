from datetime import datetime
from enum import Enum
from typing import Any, Optional

from pydantic import BaseModel


class TopicEvent(BaseModel):
    event: str
    description: str
    end: datetime


class TopicEventResponse(TopicEvent):
    success_count: int


class FcmSubscribeMessage(BaseModel):
    message: str


class ShareLink(BaseModel):
    link: str


class AlertsResponse(BaseModel):
    event: str
    message: str
    datetime: str


class SingleWeatherResponse(BaseModel):
    main: str
    description: str
    date: str
    time: str


class WeatherResponse(BaseModel):
    main: str
    datetime: str
    risk: Optional[str]


class RiskLevel(str, Enum):
    LOW = 'low'
    MODERATE = 'moderate'
    HIGH = 'high'
    EXTREME = 'extreme'


class RiskEvent(str, Enum):
    FLOOD = 'Flood'
    SUNBURN = 'Sunburn'
    DUST = 'Dust'
    FOG = 'Fog'


class RiskResponse(BaseModel):
    risk: RiskEvent
    level: RiskLevel


class locationResponse(BaseModel):
    city: str
    state: str


class ImmediateForecastResponse(BaseModel):
    main: str
    description: str
    date: str
    time: str


class CurrentWeatherResponse(SingleWeatherResponse, locationResponse):
    main: str
    description: str
    date: str
    time: str
    city: Optional[str]
    state: str


class UserCurrentWeather(BaseModel):
    main: str
    datetime: str
    end_datetime: str
    risk: Optional[str]
    city: str
    state: str
    country: str


class PacketModel(BaseModel):
    content: Any
    content_type: str


class ExtendedCurrentResponse(BaseModel):
    main: str
    datetime: str
    end_datetime: str
    risk: Optional[str]


class ExtendedForecast(BaseModel):
    city: str
    state: str
    country: str
    current: ExtendedCurrentResponse
    todays_timeline: list[WeatherResponse]


class TimelineForcast(BaseModel):
    main: str
    datetime: str
    risk: Optional[str]
    city: str
    state: str
    country: str
