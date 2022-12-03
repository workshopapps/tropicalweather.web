from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from conf.settings import settings, BASE_DIR
from sqlalchemy.ext.declarative import declarative_base


MYSQL_DRIVER = settings.MYSQL_DRIVER
DB_TYPE = settings.DB_TYPE
DB_USER = settings.DB_USER
DB_PASSWORD = settings.DB_PASSWORD
DB_HOST = settings.DB_HOST
DB_PORT = settings.DB_PORT
DB_NAME = settings.DB_NAME


def get_db_engine(test_mode: bool = False):
    if DB_TYPE == "sqlite" or test_mode:
        BASE_PATH = f"sqlite:///{BASE_DIR}"
        DATABASE_URL = BASE_PATH + "/database.db"

        if test_mode:
            DATABASE_URL = BASE_PATH + "/test.db"

        return create_engine(
            DATABASE_URL, connect_args={"check_same_thread": False})

    if DB_TYPE == "mysql":
        DATABASE_URL = f"mysql+{MYSQL_DRIVER}://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"  # noqa: E501

    elif DB_TYPE == "postgresql":
        DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"  # noqa: E501

    return create_engine(DATABASE_URL)


engine = get_db_engine()

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
