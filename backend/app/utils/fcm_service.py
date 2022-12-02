from firebase_admin import messaging
from firebase_admin.exceptions import FirebaseError
from typing import TypeVar
from conf.runtime import error_logger, logger


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
    # These registration tokens come from the client FCM SDKs.
    registration_tokens = [
        token,
    ]

    # Subscribe the devices corresponding to the registration tokens to the
    # topic.
    try:
        response: T = messaging.subscribe_to_topic(registration_tokens, topic)
        # See the TopicManagementResponse reference documentation
        # for the contents of response.
        logger.info(
            f"Successfully subscribed to topic: {response.success_count}")
    except FirebaseError as e:
        error_logger.exception(e)
        raise e
