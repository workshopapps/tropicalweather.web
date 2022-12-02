from fastapi import APIRouter, HTTPException, status
from schemas import FcmSubscribeMessage
from utils.fcm_service import get_topic_name, register_id_to_topic
from utils.general import reverse_geocode

router = APIRouter(
    prefix="/weather/alerts",
    tags=['weather-alerts'],
)


@router.get('/subscribe', response_model=FcmSubscribeMessage)
async def subscribe_token_to_alert_topic(fcm_id: str, lat: float, lng: float):
    """Subscribes a FCM ID to a topic for weather alerts.

    Args:
        fcm_id (str): FCM token of the user.
        lat (float): Latitude of the user.
        lng (float): Longitude of the user.

    Raises:
        HTTPException: if not able to subscribe to topic.

    Returns:
        FcmSubscribeMessage: Message
    """

    # Get the location of the user
    location = reverse_geocode(lat, lng)
    city = location['city']
    state = location['state']
    country = location['country']

    # Get the topic name
    topic = get_topic_name(city, state, country)

    # Subscribe the user to the topic
    try:
        register_id_to_topic(fcm_id, topic)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Error subscribing to topic: {e}"
        )

    return {
        "message": f"Subscribed to topic: {topic}"
    }
