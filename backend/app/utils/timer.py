import datetime
import pytz


def now_utc():
    now = datetime.datetime.now()
    now = now.replace(
        minute=0,
        second=0,
        microsecond=0,
    )
    return pytz.utc.localize(now)
