import datetime
from sqlalchemy import String, Boolean, Integer, Column, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import Session
from sqlalchemy.types import String, DateTime
from sqlalchemy.sql.sqltypes import TIMESTAMP, TIME

from uuid import uuid4

from pydantic import BaseModel

from fastapi import Depends



# Internal imports

from app.database import Base, get_db







class SingleWeatherResponse(BaseModel):
    main: str
    description: str
    date: str
    time: str

class locationResponse(BaseModel):
    city: str
    state: str



db : Session = Depends(get_db)

class Location(Base):
    __tablename__ = 'locations'

    id = Column(String(255), primary_key=True, index=True, default=uuid4().hex)
    city = Column(String(255), index=True, nullable=False)
    state = Column(String(255), index=True, nullable=False)

    time_created = Column(DateTime(timezone=True), server_default=func.now())
    time_updated = Column(DateTime(timezone=True), onupdate=func.now())
    # created_at = Column(
    #     TIMESTAMP(timezone=True), nullable=False, server_default=text("now()")
    # )


    def save(self):
        db.add(self)
        db.commit()

    def update(self):
        db.commit()

    def delete(self):
        db.delete(self)
        db.commit()

    def __str__(self):
        return f'{self.city}, {self.state}'


class Alert(Base):
    __tablename__ = 'alerts'

    id = Column(String(255), primary_key=True, index=True, default=uuid4().hex)
    location_id = Column(String(255), ForeignKey("locations.id", ondelete="CASCADE"), nullable=False)
    start = Column(DateTime, default=datetime.datetime.utcnow)
    end = Column(String(50), nullable=True)
    event = Column(String, index=True, nullable=False)
    message =  Column(String, index=True, nullable=False)

    time_created = Column(DateTime(timezone=True), server_default=func.now())
    time_updated = Column(DateTime(timezone=True), onupdate=func.now())


    def save(self):
        db.add(self)
        db.commit()

    def update(self):
        db.commit()

    def delete(self):
        db.delete(self)
        db.commit()
    
