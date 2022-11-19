from pydantic import BaseModel, Field

class Response(BaseModel):
    main: str
    description: str
    date: str
    time: str
