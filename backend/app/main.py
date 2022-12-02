# application initilization starts here
import ast
from logging import info

import redis
import socketio
from decouple import config
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import ValidationError
from socketio.asyncio_namespace import AsyncNamespace

import models
from database import get_db
from routers import location
from routers import weather
from schemas import PacketModel
from utils.general import get_room_name, get_status
from conf.settings import settings

# Application initilization
app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Registering routes
app.include_router(weather.router)
app.include_router(location.router)


# Mount /static directory for Jinja2Templates
app.mount('/static', StaticFiles(
    directory=settings.STATIC_DIR),
    name="cssfile"
)

# Status page
templates = Jinja2Templates(
    directory=settings.TEMPLATES_DIR
)

rd = redis.Redis.from_url(settings.WEBSOCKET_REDIS_URL)


# We need a prefix for redis keys, because we there are multiple
# apps using the same redis instance
prefix = config("APP_NAME", default="fastapi")


@app.get('/status', response_class=HTMLResponse)
async def status_page(request: Request):
    the_request = {'request': request}
    cache_key = f"{prefix}:status"
    cache = rd.get(cache_key)

    if cache:
        data = ast.literal_eval(cache)
        return templates.TemplateResponse(
            "status.html", {**the_request, **data})
    else:
        data = get_status()
        rd.set(cache_key, str(data))
        rd.expire(cache_key, 120)
    return templates.TemplateResponse("status.html", {**the_request, **data})


class AlertNameSpace(AsyncNamespace):
    # functions that have on_ prefix recognized as event
    async def on_connect(self, sid, *args, **kwargs):  # on connect event
        info(f"{sid}: Welcome!:)")

        query_string: str = args[0].get("QUERY_STRING", None)

        if not query_string:
            raise ConnectionRefusedError("Select a city and state")

        # Get the parameters from the query string
        query_string = query_string.split("&")
        query_string = {i.split("=")[0]: i.split("=")[1]
                        for i in query_string}

        state = query_string.get("state", None)
        city = query_string.get("city", None)

        self.room_name = get_room_name(city, state)

        self.enter_room(sid, self.room_name)

        # Add the location to the database
        db = next(get_db())
        try:
            db.add(models.Location(city=city, state=state))
            db.commit()
            print('commited')
        finally:
            db.close()

        info(f"Connected to {self.room_name}")

    async def on_packet(self, *args, **kwargs):  # on packet event

        # Packet Validation
        try:
            packet = PacketModel(**args[0])
        except ValidationError as ex:
            # Call-Back
            return PacketModel(
                content=str(ex.args), content_type="application/txt"
            ).dict()

        if not packet.content_type.startswith("application/json"):
            return PacketModel(
                content="Invalid content type",
                content_type="application/txt"
            ).dict()

        # Emit to name-space and room
        await self.emit(
            "message", packet.dict(),
            namespace=self.namespace,
            room=self.room_name
        )

        # Call-Back
        return PacketModel(
            content="Delivered", content_type="application/txt"
        ).dict()


# Message Queue is for working with distributed applications
mgr = socketio.AsyncRedisManager(
    config("WEBSOCKET_REDIS_URL")
)

sio = socketio.AsyncServer(
    async_mode="asgi", cors_allowed_origins="*"
)

# register the namespace
sio.register_namespace(
    AlertNameSpace("/Alert"))
asgi = socketio.ASGIApp(sio)


# mount Socket.Io to FastApi with / path
app.mount("/", asgi)
