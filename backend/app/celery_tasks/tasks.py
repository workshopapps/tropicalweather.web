"""This would work to auto update the events

1. Get the alert locations from db
2. Loop through the locations
3. Get the events of the location from the api
4. Compare the events with the db events
5. If there is a new event, add it to the db
6. If there is a deleted event, delete it from the db
7. Actions that update or create new event for a location
automatically sends websocket message to the clients subscribed to the location

"""

from app.utils import get_location_alerts_by_address
import hashlib
from app.alerts import send_message_to_room, close_connection


def get_alert_locations():
    """Get the alert locations from db
    """
    pass


def get_alert_events(alert):
    """Get the events of the alert location.
    """
    pass


def get_alert_events_api(alert):
    """Get the events of the alert location
    from the api
    """
    address = f"{alert.city} {alert.state}"
    return get_location_alerts_by_address(address)


def create_events(alert, events):
    """Create new events in the db
    """
    pass


def delete_event(db_event):
    """Delete event from the db
    """
    pass


def send_websocket_message(alert, events: list[dict[str, str]]):
    """Send websocket message to the clients
    subscribed to the alert location.
    """
    for event in events:
        event_title = event["event"]
        message = event["description"]
        send_message_to_room(alert.city, alert.state, event_title, message)
    close_connection()


def hash_event(event) -> str:
    """
    Compute a hash for an event. This is used to compare events
    """
    start = event["start"]
    end = event["end"]
    description = event["description"]
    event_title = event["event"]
    payload = f"{start}{end}{description}{event_title}"
    return hashlib.sha256(payload.encode()).hexdigest()


def update_alert_events():
    """Update the alert events
    """
    alert_locations = get_alert_locations()
    for alert in alert_locations:
        api_events = get_alert_events_api(alert)
        db_events = get_alert_events(alert)

        api_events_hash = {hash_event(event): event for event in api_events}

        for db_event in db_events:
            event_hash = db_event.hash
            if event_hash in api_events_hash:
                del api_events_hash[event_hash]
            else:
                delete_event(db_event)

        new_events = list(api_events_hash.values())
        create_events(alert, new_events)
        send_websocket_message(alert, new_events)
