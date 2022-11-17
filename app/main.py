# application initilization starts here

from typing import List
from fastapi import FastAPI, status, Response, HTTPException, Depends



# internal import

from routers import auth, user, weather


# Application initilization
app = FastAPI()


# Registering routes
app.include_router(auth.router)
app.include_router(user.router)
app.include_router(weather.router)

