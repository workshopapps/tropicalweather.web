import ast
import sentry_sdk
from conf.settings import settings
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from routers import alert, location, weather, share
from utils.general import get_status
from database import engine
import models
from conf.runtime import initialize_firebase
from utils.cache import get_cache, set_cache

sentry_sdk.init(
    dsn="https://f96d09e259ce4d5788506224710f9f84@o4504281393201152.ingest.sentry.io/4504281395953664",

    # Set traces_sample_rate to 1.0 to capture 100%
    # of transactions for performance monitoring.
    # We recommend adjusting this value in production,
    traces_sample_rate=1.0,
)
models.Base.metadata.create_all(bind=engine)

# Application initilization
app = FastAPI()

# Setup firebase [Must happen once]
initialize_firebase()

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


@app.get('/status', response_class=HTMLResponse)
async def status_page(request: Request):
    the_request = {'request': request}
    cache = get_cache('status')

    if cache:
        data = ast.literal_eval(cache)
        return templates.TemplateResponse(
            "status.html", {**the_request, **data})
    else:
        data = get_status()
        set_cache("status", str(data), 120)

    return templates.TemplateResponse("status.html", {**the_request, **data})
