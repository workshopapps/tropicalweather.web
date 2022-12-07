from pydantic import BaseSettings, BaseModel
from decouple import config
from pathlib import Path

# Use this to build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


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


class Settings(BaseSettings):
    """Class to hold application config values."""

    API_V1_STR: str = "/api/v1"
    APP_NAME: str = "TropicalWeather"

    # Database
    DB_HOST: str = config("DB_HOST")
    DB_PORT: int = config("DB_PORT", cast=int)
    DB_USER: str = config("DB_USER")
    DB_PASSWORD: str = config("DB_PASSWORD")
    DB_NAME: str = config("DB_NAME")
    TEST_DB_NAME: str = config("TEST_DB_NAME", default="weather_test_db")
    DB_TYPE: str = config("DB_TYPE")
    MYSQL_DRIVER: str = config("MYSQL_DRIVER")

    # Redis
    WEBSOCKET_REDIS_URL: str = config("WEBSOCKET_REDIS_URL")
    CACHE_KEY_PREFIX: str = config("APP_NAME", default="fastapi")

    CELERY_CONFIG: str = config("CELERY_CONFIG", default='development')

    OPEN_WEATHER_BASE_URL = 'https://api.openweathermap.org'
    OPEN_WEATHER_API_KEY: str = config("OPEN_WEATHER_API_KEY")
    METEO_API: str = 'https://api.open-meteo.com/v1/'

    STATIC_URL: str = "/static"
    STATIC_DIR: Path = BASE_DIR / "static"
    TEMPLATES_DIR: Path = BASE_DIR / "templates"

    MAX_STEP_HOURS: int = 24

    GOOGLE_APPLICATION_CREDENTIALS: str = config(
        "GOOGLE_APPLICATION_CREDENTIALS")


settings = Settings()
