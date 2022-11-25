import datetime
from sqlalchemy import String, Boolean, Integer, Column, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import Session, relationship
from sqlalchemy.types import String, DateTime
from sqlalchemy.sql.expression import text
from sqlalchemy.sql.sqltypes import TIMESTAMP, TIME

# from uuid import uuid4

from pydantic import BaseModel


# Internal imports

from app.database import Base


class SingleWeatherResponse(BaseModel):
    main: str
    description: str
    date: str
    time: str


class locationResponse(BaseModel):
    city: str
    state: str


class Location(Base):
    __tablename__ = "locations"

    id = Column(Integer, primary_key=True, index=True, nullable=False)
    city = Column(String(255), index=True, nullable=False)
    state = Column(String(255), index=True, nullable=False)

    created_at = Column(
        TIMESTAMP(timezone=True), nullable=False, server_default=text("now()")
    )
    alert = relationship("Alert", back_populates="location")


class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True, nullable=False)
    location_id = Column(Integer, ForeignKey("locations.id", ondelete="CASCADE"))
    start = Column(DateTime, default=datetime.datetime.utcnow)
    end = Column(String(50), nullable=True)
    event = Column(String, index=True, nullable=False)
    message = Column(String, index=True, nullable=False)
    hash = Column(String, nullable=True)

    created_at = Column(
        TIMESTAMP(timezone=True), nullable=False, server_default=text("now()")
    )
    location = relationship("Location", back_populates="alert")
