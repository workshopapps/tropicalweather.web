from functools import lru_cache

from decouple import config
from kombu import Queue


def route_task(name, args, kwargs, options, task=None, **kw):
    if ":" in name:
        queue, _ = name.split(":")
        return {"queue": queue}
    return {"queue": "celery"}


class BaseConfig:
    CELERY_BROKER_URL: str = config("CELERY_BROKER_URL")
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
    config_name = config("CELERY_CONFIG", default='development')
    config_cls = config_cls_dict[config_name]
    return config_cls()


settings = get_settings()
