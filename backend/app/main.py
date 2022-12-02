import ast

import firebase_admin
import redis
from conf.settings import settings
from decouple import config
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from routers import alert, location, weather, share
from utils.general import get_status

# Application initilization
app = FastAPI()

# Setup firebase [Must happen once]
firebase_admin.initialize_app()

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
app.include_router(alert.router)
app.include_router(share.router)


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
