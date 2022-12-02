from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from decouple import config


def get_db_engine(test_mode: bool = False):

    if test_mode:
        DATABASE_URL = "sqlite:///./test.db"
        return create_engine(
            DATABASE_URL, connect_args={"check_same_thread": False})

    MYSQL_DRIVER = config("MYSQL_DRIVER")
    DB_TYPE = config("DB_TYPE", default="sqlite")
    DB_USER = config("DB_USER")
    DB_PASSWORD = config("DB_PASSWORD")
    DB_HOST = config("DB_HOST")
    DB_PORT = config("DB_PORT", cast=int)
    DB_NAME = config("DB_NAME")

    DATABASE_URL = ""

    if DB_TYPE == "mysql":
        DATABASE_URL = f"mysql+{MYSQL_DRIVER}://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"  # noqa: E501
        # DATABASE_URL = f"mysql+{MYSQL_DRIVER}://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"  # noqa: E501

    elif DB_TYPE == "postgresql":
        # DATABASE_URL = "postgresql://teamgear:12345@localhost/fastapi"
        DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"  # noqa: E501
    else:
        DATABASE_URL = "sqlite:///./database.db"

    if DB_TYPE == "sqlite":
        engine = create_engine(
            DATABASE_URL, connect_args={"check_same_thread": False})
    else:
        engine = create_engine(DATABASE_URL)

    return engine


engine = get_db_engine()

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
