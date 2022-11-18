# application initilization starts here
from fastapi import FastAPI
from routers import weather

# internal import

# Application initilization
app = FastAPI()


# Registering routes
app.include_router(weather.router)
