from pydantic import BaseModel


class SingleWeatherResponse(BaseModel):
    main: str
    description: str
    date: str
    time: str


class locationResponse(BaseModel):
    city: str
    state: str


class CurrentWeatherResponse(SingleWeatherResponse, locationResponse):
    pass
