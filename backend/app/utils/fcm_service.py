from firebase_admin import messaging
from firebase_admin.exceptions import FirebaseError
from typing import TypeVar
from utils.logger import basic_logger, error_logger
from database import get_db
import models


# Type for TopicManagementResponse
T = TypeVar('T', bound=messaging.TopicManagementResponse)


def get_topic_name(city: str, state: str, country: str):
    """Formats the topic name to be used in FCM.

    Args:
        city (str): City name.
        state (str): State name.
        country (str): Country name.

    Returns:
        str: Formatted topic name.
    """

    args = [city, state, country]
    args = [(arg or "null").lower().replace(" ", "_") for arg in args]
    name = "_".join(args)
    return f"/topics/{name}"


def register_id_to_topic(token: str, topic: str):
    """Registers a FCM Token to a topic.

    Args:
        token (str): FCM Token.
        topic (str): Topic name.

    Raises:
        FirebaseError: If unable to register to topic.
    """
    registration_tokens = [
        token,
    ]

    try:
        response: T = messaging.subscribe_to_topic(registration_tokens, topic)
        basic_logger.info(
            f"Successfully subscribed to topic: {response.success_count}")
    except FirebaseError as e:
        error_logger.exception(e)
        raise e


def unsubscribe_id_from_topic(token: str, topic: str):
    """Unregisters a FCM Token from a topic.

    Args:
        token (str): FCM Token.
        topic (str): Topic name.

    Raises:
        FirebaseError: If unable to unregister from topic.
    """
    registration_tokens = [
        token,
    ]

    try:
        response: T = messaging.unsubscribe_from_topic(
            registration_tokens, topic)
        basic_logger.info(
            f"Successfully unsubscribed from topic: {response.success_count}")

    except FirebaseError as e:
        error_logger.exception(e)
        raise e


def unsubscribe_id_all_topics(token: str):
    """Unregisters a FCM Token from all topics.

    Args:
        token (str): FCM Token.
    """
    registration_tokens = [
        token,
    ]

    db = next(get_db())
    locations: list[models.Location] = db.query(models.Location).all()

    success = 0
    for location in locations:
        topic = get_topic_name(location.city, location.state, location.country)
        try:
            response: T = messaging.unsubscribe_from_topic(
                registration_tokens, topic)
            location.subscription_count -= response.success_count
            success += response.success_count
        except FirebaseError:
            pass

    db.commit()
    basic_logger.info(f"Successfully unsubscribed from {success} topics")
