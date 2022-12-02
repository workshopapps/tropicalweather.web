import firebase_admin
from firebase_admin import messaging
from firebase_admin.exceptions import FirebaseError

default_app = firebase_admin.initialize_app()


def register_id_to_topic(token: str, topic: str):
    # These registration tokens come from the client FCM SDKs.
    registration_tokens = [
        token,
    ]

    # Subscribe the devices corresponding to the registration tokens to the
    # topic.
    try:
        response = messaging.subscribe_to_topic(registration_tokens, topic)
        # See the TopicManagementResponse reference documentation
        # for the contents of response.
        print('Successfully subscribed to topic:', response.success_count)
    except FirebaseError as e:
        print('Error subscribing to topic:', e)


def unsubscribe_id_from_topic():
    pass


def send_message_to_topic():
    pass
