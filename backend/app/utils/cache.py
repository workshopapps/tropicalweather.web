from conf.runtime import rd
from conf.settings import settings


def get_cache_key(key: str):
    """Get cache key."""
    return f"{settings.CACHE_KEY_PREFIX}:{key}"


def set_cache(key, value, ttl=120):
    """Set cache value."""
    key = get_cache_key(key)
    rd.set(key, value)
    rd.expire(key, ttl)


def get_cache(key):
    """Get cache value."""
    key = get_cache_key(key)
    return rd.get(key)
