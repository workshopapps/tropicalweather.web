from dattime import datetime
import firebase_admin
from firebase_admin import auth, credentials, messaging

from decouple import config

path_key_dir = config.get("GOOGLE_APPLICATION_CREDENTIALS")

cred = credentials.Certificate(path_key_dir)
firebase_admin.initialize_app(cred)


def send_notification_to_topic(payload, topic):

    # See documentation on defining a message payload.
    message = messaging.Message(
        data={
            "event": payload["event"],
            "message": payload["description"],
            "datetime": datetime.strptime(payload["end"], "%Y-%m-%d %H:%M"),
        },
        topic=topic,
    )

    # Send a message to the devices subscribed to the provided topic.
    response = messaging.send(message)
    return response
