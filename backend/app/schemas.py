from pydantic import BaseModel

class ImmediateForecastResponse(BaseModel):
    main: str
    description: str
    date: str
    time: str
