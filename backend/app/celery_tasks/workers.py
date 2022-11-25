import sys
from pathlib import Path

from celery.schedules import crontab

BASE = Path(__file__).resolve().parent.parent

sys.path.append(str(BASE))

from config.celery_utils import create_celery  # noqa: E402
from app.celery_tasks.tasks import update_alert_events  # noqa: E402


app = create_celery()


@app.on_after_configure.connect
def schedule_periodic_tasks(sender, **kwargs):
    # Check for new events every 3 hours
    sender.add_periodic_task(
        crontab(minute=0, hour="*/3"),
        update_alert_events.s(),
    )


@app.task(bind=True)
def auto_update_alert_events(self):
    """This would work to auto update the events
    """
    update_alert_events()
