import redis
from pydantic import BaseModel
from logging.config import dictConfig
import logging

from conf.settings import settings, BASE_DIR

rd = redis.Redis.from_url(settings.WEBSOCKET_REDIS_URL)


class LogConfig(BaseModel):
    """Logging configuration to be set for the server"""

    LOGGER_NAME: str = "weather.basic"
    ERROR_NAME: str = "weather.error"
    LOG_FORMAT: str = "%(levelname)s | %(asctime)s | %(message)s"
    LOG_LEVEL: str = "DEBUG"

    # Logging config
    version = 1
    disable_existing_loggers = False
    formatters = {
        "default": {
            "format": LOG_FORMAT,
            "datefmt": "%Y-%m-%d %H:%M:%S",
            "style": "%",
        },
    }
    handlers = {
        "default": {
            "formatter": "default",
            "class": "logging.FileHandler",
            "filename": BASE_DIR / "../logs" / "app.log",
        },
        "error": {
            "formatter": "default",
            "class": "logging.FileHandler",
            "filename": BASE_DIR / "../logs" / "error.log",
        },
    }
    loggers = {
        LOGGER_NAME: {"handlers": ["default"], "level": LOG_LEVEL},
        ERROR_NAME: {"handlers": ["error"], "level": LOG_LEVEL},
    }


dictConfig(LogConfig().dict())
logger = logging.getLogger(LogConfig().LOGGER_NAME)
error_logger = logging.getLogger(LogConfig().ERROR_NAME)
