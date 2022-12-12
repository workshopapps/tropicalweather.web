import datetime
import hashlib
import pathlib
import sys
from typing import Dict, List, Union
from time import sleep

from sqlalchemy.orm import Session

sys.path.append(str(pathlib.Path(__file__).parent.parent.absolute()))

import models  # noqa: E402
from utils.fcm_service import get_topic_name  # noqa: E402
from utils.general import get_risks_by_address  # noqa: E402
from utils.logger import basic_logger as logger  # noqa: E402
from utils.logger import error_logger  # noqa: E402
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

    count = len(events)
    logger.info(f"Sending {count} message(s) to {topic_name}")

    try:
        response = send_notification_to_topic(events, topic_name)
        sleep(2)
    except Exception as e:
        error_logger.error(f"Error sending messages: {e}")
        error_logger.exception(e)
        return

    logger.info(f"Sent {response.success_count} message(s) to {topic_name}")

    return response.success_count > 0


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

        if send_messages(location, new_alerts):
            create_alerts(db, location, new_alerts)


def clean_up(db: Session):
    # Delete all locations
    print("Deleting all locations")
    locations: List[models.Location] = get_db_locations(db)
    for location in locations:
        print(f"Deleting {location.city}")

        # Delete all alerts
        location.alerts = []
        db.commit()

        db.delete(location)
        db.commit()


def create_up(db: Session):
    to_create = [
        {
            "city": "Ikorodu",
            "state": "Lagos",
            "country": "Nigeria",
        },
        {
            "city": "Akure",
            "state": "Ondo",
            "country": "Nigeria",
        },
        {
            "city": "Ibadan City",
            "state": "Oyo",
            "country": "Nigeria",
        },
    ]

    for location in to_create:
        print(f"Creating {location['city']}")
        db_location = models.Location(**location)
        db.add(db_location)
        db.commit()


if __name__ == "__main__":
    from database import get_db
    db = next(get_db())
    update_alerts(db)
