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

import hashlib
from typing import List

from app.alerts import (close_connection, create_connection,
                        send_message_to_room)
from app.database import get_db
import models
from app.utils.general import get_location_alerts_by_address
from sqlalchemy.orm import Session


def get_db_locations(db: Session) -> List[models.Location]:
    """Get the alert locations from db
    """
    return db.query(models.Location).all()


def get_location_alerts_api(location: models.Location):
    """Get the alerts of this location
    from the api
    """
    address = f"{location.city} {location.state}"
    return get_location_alerts_by_address(address)


def create_events(
    db: Session, location: models.Location, alerts: List[dict[str, str]]
):
    """Create new alerts for the
    location
    """
    for alert in alerts:
        event = alert["event"]
        description = alert["description"]
        start = alert["start"]
        end = alert["end"]
        event_hash = hash_alert(alert)
        alert = models.Alert(
            event=event,
            message=description,
            start=start,
            end=end,
            hash=event_hash,
            location=location,
        )
        location.alerts.append(alert)

    db.add(location)
    db.commit()


def delete_alert(db: Session, alert: models.Alert):
    """Delete event from the db
    """
    db.delete(alert)
    db.commit()


def send_websocket_message(location: models.Location, events: List[dict[str, str]]):
    """Send websocket message to the clients
    subscribed to the alert location.
    """
    create_connection(location.city, location.state)
    try:
        for event in events:
            event_title = event["event"]
            message = event["description"]
            send_message_to_room(
                location.city, location.state, event_title, message
            )
    finally:
        close_connection()


def hash_alert(event) -> str:
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
    from logging import info

    info("Updating alert events")

    db = get_db()
    locations: List[models.Location] = get_db_locations(db)
    for location in locations:
        api_alerts = get_location_alerts_api(location)
        db_alerts = location.alerts

        api_alerts_hash = {hash_alert(event): event for event in api_alerts}

        for db_event in db_alerts:
            event_hash = db_event.hash
            if event_hash in api_alerts_hash:
                del api_alerts_hash[event_hash]
            else:
                delete_alert(db, db_event)

        new_alerts = list(api_alerts_hash.values())
        create_events(db, location, new_alerts)
        send_websocket_message(location, new_alerts)
