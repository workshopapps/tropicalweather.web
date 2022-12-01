from sqlalchemy.orm import Session

location_paramas = {"id": 1, "city": "Port Harcourt", "state": "Rivers state"}


alert_paramas = {
    "id": 2,
    "start": "25-11-2022",
    "end": "26-11-2022",
    "event": "test alert",
    "message": "volcanic eruption alert",
    "hash": "730897492039tyhfid",
}


def test_location_create(session: Session):
    """Create entry on location table"""

    from app.models import Alert, Location
    new_location = Location(**location_paramas)
    session.add(new_location)
    session.commit()
    session.refresh(new_location)

    db_location = session.query(Location).filter(
        Location.id == new_location.id).first()

    assert db_location.city == new_location.city
    assert db_location.state == new_location.state


def test_location_create_and_update(session: Session):
    """test create and update"""
    from app.models import Alert, Location
    update_location_params = {
        "city": "jabi",
        "state": "Abuja",
    }

    new_location = Location(**location_paramas)
    session.add(new_location)
    session.commit()
    session.refresh(new_location)

    db_updated_location = (
        session.query(Location).filter(Location.id == new_location.id).first()
    )
    db_updated_location.city = update_location_params["city"]
    db_updated_location.state = update_location_params["state"]

    session.commit()
    session.refresh(db_updated_location)

    assert db_updated_location.city == update_location_params["city"]
    assert db_updated_location.state == update_location_params["state"]


def test_alert_create(session: Session):
    """Create entries with foreign key constraints"""

    "Step-one: create location info"

    from app.models import Alert, Location
    new_location = Location(**location_paramas)
    session.add(new_location)
    session.commit()
    session.refresh(new_location)

    "Step-two: create update foreign key constraints"
    new_alert = Alert(location_id=new_location.id, **alert_paramas)
    session.add(new_alert)
    session.commit()
    session.refresh(new_alert)

    db_alert = session.query(Alert).filter(Alert.id == new_alert.id).first()
    assert db_alert.start == new_alert.start
    assert db_alert.location_id == new_location.id
    assert db_alert.end == new_alert.end
    assert db_alert.event == new_alert.event
    assert db_alert.message == new_alert.message
    assert db_alert.hash == new_alert.hash
