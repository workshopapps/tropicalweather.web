from typing import Any, Optional
from enum import Enum

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


class PacketModel(BaseModel):
    content: Any
    content_type: str




class AlertNotification(BaseModel):
    event: str
    message: str
    location: str
    date: str
    time: str
