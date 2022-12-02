import datetime
import hashlib
from typing import List, Union

import models
from database import get_db
from fastapi import Depends
from sqlalchemy.orm import Session
from utils.fcm_service import get_topic_name
from utils.general import get_risks_by_address
from utils.timer import now_utc


def get_db_locations(db: Session) -> List[models.Location]:
    """Get the alert locations from db
    """
    return db.query(models.Location).all()


def get_location_risks(location: models.Location):
    """Get the alerts of this location
    from the api
    """
    address = f"{location.city} {location.state}"
    return get_risks_by_address(address)


def create_alerts(
    db: Session, location: models.Location,
    alerts: List[dict[str, Union[str, datetime.datetime]]]
):
    """Create new alerts for the
    location
    """
    for alert in alerts:
        event = alert["event"]
        description = alert["description"]
        start = alert["start"].timestamp()
        end = alert["end"].timestamp()
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


def send_messages(location: models.Location, events: List[dict[str, str]]):
    """Send messages of new alerts to topics
    """
    topic_name = get_topic_name(
        location.city, location.state, location.country)


def hash_alert(event: dict[str, Union[str, datetime.datetime]]) -> str:
    """
    Compute a hash for an event. This is used to compare events
    """
    start = event["start"]
    end = event["end"]
    description = event["description"]
    event_title = event["event"]
    payload = f"{start}{end}{description}{event_title}"
    return hashlib.sha256(payload.encode()).hexdigest()


def update_alert_events(db: Session = Depends(get_db)):
    """Update the alert events
    """
    now = now_utc()
    locations: List[models.Location] = get_db_locations(db)
    for location in locations:
        risks = get_location_risks(location)
        db_alerts = location.alerts

        risks_hash = {hash_alert(risk): risk for risk in risks}

        for db_alert in db_alerts:
            if db_alert.end_datetime() < now:
                delete_alert(db, db_alert)
            else:
                risks_hash.pop(db_alert.hash, None)

        new_alerts = list(risks_hash.values())
        create_alerts(db, location, new_alerts)
        send_messages(location, new_alerts)
