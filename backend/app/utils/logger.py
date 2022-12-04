import logging
from typing import Literal
from conf.settings import LogConfig


def get_logger(name: Literal["BASIC", "ERROR"] = "BASIC") -> logging.Logger:
    """
    Get logger instance.
    """
    if name == "BASIC":
        return logging.getLogger(LogConfig().LOGGER_NAME)
    elif name == "ERROR":
        return logging.getLogger(LogConfig().ERROR_NAME)


basic_logger = get_logger("BASIC")
error_logger = get_logger("ERROR")
