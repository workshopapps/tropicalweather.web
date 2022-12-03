<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.imgur.com/6wj0hh6.jpg" alt="Project logo"></a>
</p>

<h3 align="center">WEATHERY</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

<p align="center"> A weather app, its cool
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Installing](#installing)

## 🧐 About <a name = "about"></a>

API used: https://openweathermap.org/api and https://open-meteo.com/en/docs

API implementation for frontend team

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them.

Python

### Installing <a name = "installing"></a>

A step by step series of examples that tell you how to get a development env running.

Git clone

  ```bash
  git clone repo
  ```

Setup virtual environment

  ```bash
  cd backend
  python -m venv venv
  source venv/bin/activate   # for linux
  venv\Scripts\activate      # for windows
  ```

Install dependencies

  ```bash
  pip install -r requirements.txt
  ```

Also you need to create a logs folder in the backend directory

  ```bash
  mkdir logs
  ```

Create .env file

  ```bash
  cd app
  touch .env
  ```

Copy the example in env.example and paste it in .env

  ```bash
  cp env.example .env
  ```

  You can use sqlite by default, but if you want to use postgresql, you need to install it and create a database and set it as the `DB_TYPE` in the .env file. Same goes for mysql.

Before running the server, you need to run the migrations

  ```bash
  alembic upgrade head
  ```

Run fastapi server

  ```bash
  uvicorn main:app --reload
  ```

## 🚀 Running Tests <a name = "testing"></a>

You can use the installed dependencies to run tests.

Make sure you are in the root directory of the project.

  ```bash
  cd backend/app
  ```

  ```bash
  pytest
  ```
