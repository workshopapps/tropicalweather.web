

# application engine configuration goes here
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base


USER = os.getenv('USERNAME')
PASSWORD = os.environ.get('PASSWORD')
# created a temporary database engine with postgres to test my endpoint
SQLALCHEMY_DATABASE_URL = "postgresql://{USER}:{PASSWORD}@localhost/fastapi"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL
    # , connect_args={"check_same_thread": False} - used only for SQLite
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        # pass
        db.close()
