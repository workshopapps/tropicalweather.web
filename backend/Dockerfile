
FROM python:3.9-alpine
ENV PYTHONUNBUFFERED 1
ENV OPEN_WEATHER_API_KEY bd7fbd53339fa23cdc6fc863e601bd9e
ENV DB_TYPE = "postgresql"
ENV DB_NAME = "fastapi"
ENV DB_USER = "teamgear"
ENV DB_PASSWORD = "12345"
ENV DB_HOST = 172.31.17.98
ENV DB_PORT = 5432
ENV MYSQL_DRIVER = "mysql driver"
ENV SQLALCHEMY_URL = postgresql://teamgear:12345@172.31.17.98/fastapi
RUN mkdir /backend
WORKDIR /backend
COPY requirements.txt /backend/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /backend/requirements.txt
COPY app/ /backend/app


