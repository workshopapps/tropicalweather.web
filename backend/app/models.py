# Database ORMs are implemented here

from datetime import datetime

# sqlalchemy imports
from sqlalchemy import  String, Boolean, Integer, Column, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql.expression import text
from sqlalchemy.sql.sqltypes import TIMESTAMP, TIME

# Internal imports
from database import Base


# Model class for user
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, nullable=False)
    firstName = Column(String,nullable=False)
    lastName = Column(String, nullable=False)
    email = Column(String,nullable=False, unique=True)
    password = Column(String, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))
    
