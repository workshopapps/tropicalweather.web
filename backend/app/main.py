# application initilization starts here

from fastapi import FastAPI
from routers import auth, user, weather

# internal import

# Application initilization
app = FastAPI()


# Registering routes
app.include_router(auth.router)
app.include_router(user.router)
app.include_router(weather.router)
