import firebase_admin
from firebase_admin import messaging
from firebase_admin.exceptions import FirebaseError
from typing import TypeVar

default_app = firebase_admin.initialize_app()

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
    name = f"{city.lower()}_{state.lower()}_{country.lower()}"
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
        print('Successfully subscribed to topic:', response.success_count)
    except FirebaseError as e:
        print('Error subscribing to topic:', e)


def unsubscribe_id_from_topic(token: str, topic: str):
    # These registration tokens come from the client FCM SDKs.
    registration_tokens = [
        token,
    ]

    # Unsubscribe the devices corresponding to the registration tokens from
    # the topic.
    try:
        response: T = messaging.unsubscribe_from_topic(
            registration_tokens, topic)
        # See the TopicManagementResponse reference documentation
        # for the contents of response.
        print('Successfully unsubscribed from topic:', response.success_count)
    except FirebaseError as e:
        print('Error unsubscribing from topic:', e)
