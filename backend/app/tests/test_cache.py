
from utils.cache import get_cache_key, set_cache, get_cache
from conf.settings import settings


def test_get_cache_key():
    """Test get_cache_key."""
    assert get_cache_key("test") == f"{settings.CACHE_KEY_PREFIX}:test"


def test_set_cache(mocker):
    """Test set_cache."""
    set_mock = mocker.patch("utils.cache.rd.set")
    expire_mock = mocker.patch("utils.cache.rd.expire")
    set_cache("test", "test")
    set_mock.assert_called_once_with(
        f"{settings.CACHE_KEY_PREFIX}:test", "test")
    expire_mock.assert_called_once_with(
        f"{settings.CACHE_KEY_PREFIX}:test", 120)


def test_get_cache(mocker):
    """Test get_cache."""
    get_mock = mocker.patch("utils.cache.rd.get")
    get_cache("test")
    get_mock.assert_called_once_with(f"{settings.CACHE_KEY_PREFIX}:test")
