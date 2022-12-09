from datetime import datetime
from firebase_admin import messaging

from conf.runtime import initialize_firebase


initialize_firebase()


def send_notification_to_topic(payload, topic):

    # See documentation on defining a message payload.
    message = messaging.Message(
        data={
            "event": payload["event"],
            "message": payload["description"],
            "datetime": datetime.strftime(payload["end"], "%Y-%m-%d %H:%M"),
        },
        topic=topic,
    )

    # Send a message to the devices subscribed to the provided topic.
    response = messaging.send(message)
    return response