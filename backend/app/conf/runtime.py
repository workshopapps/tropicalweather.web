
import firebase_admin
import redis
from conf.settings import settings
from firebase_admin import credentials


rd = redis.Redis.from_url(settings.WEBSOCKET_REDIS_URL)


def initialize_redis():
    """
    Initialize redis client. This should make sure redis
    is only connected once.
    """
    pass


def initialize_firebase():
    """
    Initialize firebase admin sdk.
    If an instance already exists by the same app
    name a ValueError is raised so it need to catch it and pass.
    """
    cred = credentials.Certificate(settings.GOOGLE_APPLICATION_CREDENTIALS)
    try:
        firebase_admin.initialize_app(cred)
    except ValueError:
        pass
