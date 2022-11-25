import sys
from pathlib import Path

from celery.schedules import crontab

BASE = Path(__file__).resolve().parent.parent.parent

sys.path.append(str(BASE))

from app.config.celery_utils import create_celery  # noqa: E402
from app.celery_tasks.tasks import update_alert_events  # noqa: E402


app = create_celery()


@app.on_after_configure.connect
def schedule_periodic_tasks(sender, **kwargs):
    # Check for new events every time
    sender.add_periodic_task(
        10.0, auto_update_alert_events.s(), name="update_alert_events"
    )


@app.task(bind=True)
def auto_update_alert_events(self):
    """This would work to auto update the events
    """
    update_alert_events()
    return "Auto update alert events"
