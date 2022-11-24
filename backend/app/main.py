# application initilization starts here
from fastapi import FastAPI
import sys
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent

sys.path.append(str(BASE))

from app.routers import weather  # noqa: E402
from app.routers import location

from app.database import create_database

# internal import

create_database()

# Application initilization
app = FastAPI()


# Registering routes
app.include_router(weather.router)

app.include_router(location.router)
