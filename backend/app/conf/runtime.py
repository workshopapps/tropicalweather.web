import redis

from conf.settings import settings

rd = redis.Redis.from_url(settings.WEBSOCKET_REDIS_URL)
