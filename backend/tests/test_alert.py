import asyncio
import sys
from unittest import mock
import re

import pytest
from app.main import AlertNameSpace
from app.utils.general import get_room_name


def test_get_room_name():
    """Test get_room_name function"""
    city = "New York"
    state = "NY"
    room_name = "New York-NY"
    assert get_room_name(city, state) == room_name


def AsyncMock(*args, **kwargs):
    """Return a mock asynchronous function."""
    m = mock.MagicMock(*args, **kwargs)

    async def mock_coro(*args, **kwargs):
        return m(*args, **kwargs)

    mock_coro.mock = m
    return mock_coro


def _run(coro):
    """Run the given coroutine."""
    return asyncio.get_event_loop().run_until_complete(coro)


@pytest.mark.skipif(
    sys.version_info < (3, 5),
    reason="requires python3.5 or higher"
)
class TestAsyncNamespace:
    def test_connect_event_error(self):
        ns = AlertNameSpace('/foo')
        ns._set_server(mock.MagicMock())
        with pytest.raises(ConnectionRefusedError):
            args = (
                {},
            )
            _run(ns.trigger_event('connect', 'sid', *args))

    def test_async_event_success(self, client):
        ns = AlertNameSpace('/foo')

        mock_server = mock.MagicMock()
        mock_server.emit = AsyncMock()
        ns._set_server(mock_server)

        # Connect first
        args = (
            {
                "QUERY_STRING": "city=test_city&state=test_state",
            },
        )
        _run(ns.trigger_event('connect', 'sid', *args))

        # Trigger on_packet event, send a PacketModel data
        args = (
            {
                "content": {
                    "event": "Hello World",
                    "message": "Hello World",
                },
                "content_type": "application/json",
            },
        )
        res = _run(ns.trigger_event('packet', *args))

        # check if the content contains the success message
        assert res.get('content') == 'Delivered'

        # Check if the emit function is called
        assert mock_server.emit.mock.called

        # Check if the emit function is called with the correct arguments
        assert mock_server.emit.mock.call_args[0][0] == 'message'
        assert mock_server.emit.mock.call_args[1]['data'] == args[0]
        assert mock_server.emit.mock.call_args[1]['namespace'] == '/foo'
        assert mock_server.emit.mock.call_args[1]['room'] \
            == 'test_city-test_state'

    def test_async_event_error(self):
        ns = AlertNameSpace('/foo')

        mock_server = mock.MagicMock()
        mock_server.emit = AsyncMock()
        ns._set_server(mock_server)

        # Trigger on_packet event, send a PacketModel data
        args = (
            {
                "content": {
                    "event": "Hello World",
                    "message": "Hello World",
                },
            },
        )
        res = _run(ns.trigger_event('packet', *args))

        content = res.get('content')

        # check if the content contains the error message
        assert re.search(r'MissingError()', content)

        # Trigger on_packet event, send a PacketModel data
        args = (
            {
                "content": {
                    "event": "Hello World",
                    "message": "Hello World",
                },
                "content_type": "application/txt",
            },
        )
        res = _run(ns.trigger_event('packet', *args))

        content = res.get('content')

        # check if the content contains the error message
        assert re.search(r'Invalid content type', content)
