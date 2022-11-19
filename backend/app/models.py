from pydantic import BaseModel


class SingleWeatherResponse(BaseModel):
    main: str
    description: str
    date: str
    time: str
