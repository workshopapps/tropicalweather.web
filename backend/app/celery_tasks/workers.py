import models
from app.celery_tasks.tasks import update_alerts
from app.config.celery_utils import create_celery
from celery.schedules import crontab
from database import get_db_engine
from sqlalchemy.orm import sessionmaker

app = create_celery()


def connect():
    engine = get_db_engine(test_mode=True)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    models.Base.metadata.create_all(bind=engine)

    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


@app.on_after_configure.connect
def schedule_periodic_tasks(sender, **kwargs):
    # Check for new events every 3 seconds
    sender.add_periodic_task(
        3.0, auto_update_alert_events.s(),
        name="Check for new events every 3 seconds"
    )


@app.task(bind=True)
def auto_update_alert_events(*args, **kwargs):
    """This would work to auto update the events
    """
    with connect() as db:
        update_alerts(db)

    return {"status": "success"}
