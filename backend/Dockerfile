
FROM python:3.8-alpine
ENV PYTHONUNBUFFERED 1
RUN mkdir /backend
WORKDIR /backend
ADD . /backend/
RUN pip install -r requirements.txt
WORKDIR /backend/app/
RUN pip install gunicorn

