from functools import lru_cache
from app.conf.settings import settings as app_settings
from kombu import Queue


def route_task(name, args, kwargs, options, task=None, **kw):
    if ":" in name:
        queue, _ = name.split(":")
        return {"queue": queue}
    return {"queue": "celery"}


class BaseConfig:
    CELERY_BROKER_URL: str = app_settings.WEBSOCKET_REDIS_URL
    # CELERY_RESULT_BACKEND: str = config("CELERY_RESULT_BACKEND")

    CELERY_TASK_QUEUES: list = (
        # default queue
        Queue("celery"),

        # custom queue
        Queue("alerts"),
    )

    CELERY_TASK_ROUTES = (route_task,)


class DevelopmentConfig(BaseConfig):
    pass


@lru_cache()
def get_settings():
    config_cls_dict = {
        "development": DevelopmentConfig,
    }
    config_name = settings.CELERY_CONFIG
    config_cls = config_cls_dict[config_name]
    return config_cls()


settings = get_settings()
