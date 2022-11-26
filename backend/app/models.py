from app.database import Base
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from typing import List


class Location(Base):
    __tablename__ = "locations"

    id = Column(Integer, primary_key=True, index=True, nullable=False)
    city = Column(String(255), nullable=False)
    state = Column(String(255), nullable=False)
    alerts: List["Alert"] = relationship("Alert", back_populates="location")


class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True, nullable=False)
    location_id = Column(Integer, ForeignKey(
        "locations.id", ondelete="CASCADE"))
    start = Column(Integer, nullable=False)
    end = Column(Integer, nullable=False)
    event = Column(String, nullable=False)
    message = Column(String, nullable=False)
    hash = Column(String, nullable=False)
    location = relationship("Location", back_populates="alerts")
