# application initilization starts here
import asyncio
import sys
from functools import wraps
from pathlib import Path

from app.utils import get_status
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

BASE = Path(__file__).resolve().parent.parent

sys.path.append(str(BASE))

from app.routers import location  # noqa: E402
from app.routers import weather  # noqa: E402

# internal import

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


# Status page
def cache_response(func):
    """
    Decorator that caches the response of a FastAPI async function.
    """
    response = None

    @wraps(func)
    async def wrapper(*args, **kwargs):
        nonlocal response
        if not response:
            response = await func(*args, **kwargs)
    return wrapper


BASE_DIR = Path(__file__).resolve().parent

templates = Jinja2Templates(directory=str(Path(BASE_DIR, "templates")))


@app.get('/status', response_class=HTMLResponse)
@cache_response
async def status_page(request: Request):
    await asyncio.sleep(2)
    return templates.TemplateResponse("status.html", get_status(request=request))
