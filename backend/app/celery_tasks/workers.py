
from app.celery_tasks.tasks import update_alert_events  # noqa: E402
from app.config.celery_utils import create_celery  # noqa: E402
from celery.schedules import crontab

app = create_celery()


@app.on_after_configure.connect
def schedule_periodic_tasks(sender, **kwargs):
    # Check for new events every 3 hours
    sender.add_periodic_task(
        crontab(hour="*/3"),
        auto_update_alert_events.s(), name="update_alert_events"
    )


@app.task(bind=True)
def auto_update_alert_events(self):
    """This would work to auto update the events
    """
    update_alert_events()
    return "Auto update alert events"
