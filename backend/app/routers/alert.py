import models
from database import get_db
from fastapi import APIRouter, Depends, HTTPException, status
from firebase_admin.exceptions import FirebaseError
from schemas import FcmSubscribeMessage, TopicEvent, TopicEventResponse
from sqlalchemy.orm import Session
from utils.fcm_service import (get_topic_name, register_id_to_topic,
                               unsubscribe_id_all_topics,
                               unsubscribe_id_from_topic)
from utils.general import get_location_obj, reverse_geocode
from utils.push_notification import send_notification_to_topic

router = APIRouter(
    prefix="/weather/alerts",
    tags=['weather-alerts'],
)


@router.get('/subscribe', response_model=FcmSubscribeMessage)
async def subscribe_token_to_alert_topic(
    fcm_id: str, lat: float, lng: float, db: Session = Depends(get_db)
):
    """Subscribes a FCM ID to a topic for weather alerts.
    Creates a new location if it doesn't exist.

    Args:
        fcm_id (str): FCM token of the device.
        lat (float): Latitude of the device.
        lng (float): Longitude of the device.

    Raises:
        HTTPException: if not able to subscribe to topic.

    Returns:
        FcmSubscribeMessage: Message
    """

    loc_val = reverse_geocode(lat, lng)
    city = loc_val['city']
    state = loc_val['state']
    country = loc_val['country']

    topic = get_topic_name(city, state, country)

    try:
        register_id_to_topic(fcm_id, topic)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Error subscribing to topic: {e}"
        )

    location = get_location_obj(db, city, state, country)
    if location is None:
        location = models.Location(city=city, state=state, country=country)
        db.add(location)
        db.commit()

    return {
        "message": f"Subscribed to topic: {topic}"
    }


@router.get('/unsubscribe', response_model=FcmSubscribeMessage)
async def unsubscribe_token_from_topic(
    fcm_id: str, lat: float, lng: float, db: Session = Depends(get_db)
):
    loc_val = reverse_geocode(lat, lng)
    city = loc_val['city']
    state = loc_val['state']
    country = loc_val['country']

    topic = get_topic_name(city, state, country)

    try:
        unsubscribe_id_from_topic(fcm_id, topic)

        location = get_location_obj(db, city, state, country)
        location.subscription_count -= 1
        db.commit()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Error unsubscribing token from topic: {e}"
        )

    return {
        "message": f"Unsubscribed from topic: {topic}"
    }


@router.get('/unsubscribe/all', response_model=FcmSubscribeMessage)
async def unsubscribe_token_from_all_topics(fcm_id: str):
    """Unsubscribes a FCM ID from all topics.

    Args:
        fcm_id (str): FCM token of the device.

    Returns:
        FcmSubscribeMessage: Message
    """

    unsubscribe_id_all_topics(fcm_id)

    return {
        "message": "Unsubscribed from all topics"
    }


@router.get("/get-topics", response_model=list[str])
async def get_topics(db: Session = Depends(get_db)):
    """Gets all topics in the database.

    Returns:
        list[str]: List of topics
    """

    locations: list[models.Location] = db.query(models.Location).all()
    topics = [get_topic_name(loc.city, loc.state, loc.country)
              for loc in locations]
    return topics


@router.post("/send-event-to-topic", response_model=TopicEventResponse)
async def send_event_to_topic(
    topic: str, event: TopicEvent
):
    """Sends an event to a topic.

    Args:
        topic (str): Topic to send event to.
        event (TopicEvent): Event to send.

    Raises:
        HTTPException: If unable to send event.

    Returns:
        TopicEventResponse: Message
    """

    try:
        message_id = send_notification_to_topic(event.dict(), topic)
    except FirebaseError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Error sending event to topic: {e}"
        )
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Bad input: {e}"
        )

    return {
        **event.dict(),
        "message_id": message_id,
    }
