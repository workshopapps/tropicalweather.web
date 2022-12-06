from utils.logger import get_logger, basic_logger, error_logger
from conf.settings import LogConfig

conf = LogConfig()


def test_get_logger():
    """Test get_logger."""
    assert get_logger("BASIC").name == conf.LOGGER_NAME
    assert get_logger("ERROR").name == conf.ERROR_NAME


def test_basic_logger():
    """Test basic_logger."""
    assert basic_logger.name == conf.LOGGER_NAME


def test_error_logger():
    """Test error_logger."""
    assert error_logger.name == conf.ERROR_NAME
