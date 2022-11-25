import sys
from pathlib import Path

from celery.schedules import crontab

BASE = Path(__file__).resolve().parent.parent

sys.path.append(str(BASE))

from config.celery_utils import create_celery  # noqa: E402


app = create_celery()


@app.on_after_configure.connect
def schedule_periodic_tasks(sender, **kwargs):
    # Checking weather information every 10 seconds
    sender.add_periodic_task(10.0, current_weather.s('Los Angeles'))

    # Executes every Monday morning at 7:30 am
    sender.add_periodic_task(
        crontab(hour=7, minute=30, day_of_week=1),
        weather_forecast.s('90717'),
    )


@app.task(bind=True)
def current_weather(self, city):
    print("Getting current weather information for {}".format(city))
    return True


@app.task(bind=True)
def weather_forecast(self, zip_code):
    print("Getting weather forecast for {}".format(zip_code))
    return True
