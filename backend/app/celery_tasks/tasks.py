import datetime
import hashlib
import pathlib
import sys
from typing import Dict, List, Union

from sqlalchemy.orm import Session

sys.path.append(str(pathlib.Path(__file__).parent.parent.absolute()))

import models  # noqa: E402
from utils.fcm_service import get_topic_name  # noqa: E402
from utils.general import get_risks_by_address  # noqa: E402
from utils.logger import basic_logger as logger  # noqa: E402
from utils.push_notification import send_notification_to_topic  # noqa: E402
from utils.timer import now_utc  # noqa: E402


def get_db_locations(db: Session) -> List[models.Location]:
    """Get the alert locations from db
    """
    return db.query(models.Location).all()


def get_location_risks(location: models.Location):
    """Get the alerts of this location
    from the api
    """
    address = f"{location.city}, {location.state}, {location.country}"
    logger.info(f"Getting risks for {address}")
    return get_risks_by_address(address)


def create_alerts(
    db: Session, location: models.Location,
    alerts: List[dict[str, Union[str, datetime.datetime]]]
):
    """Create new alerts for the
    location
    """
    for _alert in alerts:
        event = _alert["event"]
        description = _alert["description"]
        start = _alert["start"].timestamp()
        end = _alert["end"].timestamp()
        event_hash = hash_alert(_alert)
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


def send_messages(
    location: models.Location,
    events: List[Dict[str, Union[datetime.datetime, str]]]
):
    """Send messages of new alerts to topics
    """
    topic_name = get_topic_name(
        location.city, location.state, location.country)

    for event in events:
        message = event["description"]
        send_notification_to_topic(event, topic_name)
        logger.info(f"Sending message to {topic_name}: {message}")

    return topic_name


def hash_alert(event: dict[str, Union[str, datetime.datetime]]) -> str:
    """
    Compute a hash for an event. This is used to compare events
    """
    start = event["start"].timestamp()
    end = event["end"].timestamp()
    description = event["description"]
    event_title = event["event"]
    payload = f"{start}{end}{description}{event_title}"
    return hashlib.sha256(payload.encode()).hexdigest()


def update_alerts(db: Session):
    """Update the alert events
    """
    logger.info("Updating alerts")
    now = now_utc()
    locations: List[models.Location] = get_db_locations(db)
    logger.info(f"Found {len(locations)} location(s)")

    for location in locations:
        risks = get_location_risks(location)
        db_alerts = location.alerts

        risks_hash = {hash_alert(risk): risk for risk in risks}

        for db_alert in db_alerts:
            if db_alert.end_datetime() <= now:
                db.delete(db_alert)
                db.commit()
            else:
                risks_hash.pop(db_alert.hash, None)

        new_alerts = list(risks_hash.values())
        create_alerts(db, location, new_alerts)
        send_messages(location, new_alerts)


if __name__ == "__main__":
    from database import get_db
    db = next(get_db())
    update_alerts(db)
