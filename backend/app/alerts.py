import sys
from pathlib import Path

import socketio

BASE = Path(__file__).resolve().parent.parent.parent
sys.path.append(str(BASE))

from utils import get_room_name  # noqa: E402
from app.models import PacketModel  # noqa: E402

sio = socketio.Client()
NAMESPACE = "/Alert"


def create_connection(city: str, state: str):
    """Check if the connection is available else create a new one"""
    if not sio.connected:
        sio.connect(
            f"ws://localhost:8000?city={city}&state={state}",
            namespaces=NAMESPACE, socketio_path="/socket.io",
            wait_timeout=5
        )


def send_message_to_room(city: str, state: str, event: str, message: str):
    """Send message to the room

    :param city: City of the location
    :type city: str
    :param state: State of the location
    :type state: str
    :param event: Alert event title
    :type event: str
    :param message: Event message to send
    :type message: str
    """

    create_connection(city, state)

    room = get_room_name(city, state)
    data = {
        "event": event,
        "message": message,
    }
    sio.emit(
        "packet",
        PacketModel(
            content=data,
            content_type="application/json"
        ).dict(),
        namespace=NAMESPACE,
        room=room,
    )


def close_connection():
    """Close the connection"""
    sio.disconnect()
