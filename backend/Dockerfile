
FROM python:3.8-alpine
ENV PYTHONUNBUFFERED 1
ENV OPEN_WEATHER_API_KEY bd7fbd53339fa23cdc6fc863e601bd9e
RUN mkdir /backend
WORKDIR /backend
ADD . /backend/
RUN pip install -r requirements.txt
WORKDIR /backend/app/
RUN pip install gunicorn

