from typing import List

from database import Base
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship


class Location(Base):
    __tablename__ = "location"

    id = Column(Integer, primary_key=True, autoincrement=True)
    city = Column(String(255), nullable=False)
    state = Column(String(255), nullable=False)
    country = Column(String(255), nullable=False)
    alerts: List["Alert"] = relationship("Alert", back_populates="location")


class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, autoincrement=True)
    location_id = Column(Integer, ForeignKey(Location.id, ondelete="CASCADE"))
    start = Column(Integer)
    end = Column(Integer)
    event = Column(String(255), nullable=False)
    message = Column(String(512), nullable=False)
    hash = Column(String(255), nullable=False)
    location = relationship("Location", back_populates="alerts")
