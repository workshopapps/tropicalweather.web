from typing import List

from fastapi import APIRouter, HTTPException, status
from schemas import SingleWeatherResponse
from utils.
from utils.fcm_service import get_topic_name, register_id_to_topic, unsubscribe_id_from_topic

router = APIRouter(
    prefix="/weather/alerts",
    tags=['weather-alerts'],
)


@router.get('/subscribe', response_model=List[SingleWeatherResponse])
async def subscribe_token_to_alert_topic(fcm_id: str, lat: float, lng: float):
    """Subscribes a FCM ID to a topic for weather alerts.

    Args:
        fcm_id (str): FCM token of the user.
        lat (float): Latitude of the user.
        lng (float): Longitude of the user.

    Raises:
        HTTPException: _description_

    Returns:
        _type_: _description_
    """
    

