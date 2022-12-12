from datetime import datetime
from firebase_admin import messaging

from conf.runtime import initialize_firebase


initialize_firebase()


def send_notification_to_topic(
    payload: list, topic
) -> messaging.BatchResponse:
    # See documentation on defining a message payload.
    messages = []
    for event in payload:
        message = messaging.Message(
            data={
                "event": event["event"],
                "message": event["description"],
                "datetime": datetime.strftime(event["end"], "%Y-%m-%d %H:%M"),
            },
            topic=topic,
        )
        messages.append(message)

    # Send a message to the devices subscribed to the provided topic.
    response = messaging.send_all(messages)
    return response
