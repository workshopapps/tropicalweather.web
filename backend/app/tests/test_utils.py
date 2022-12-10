import json
from datetime import datetime

import pytest
import pytz
from fastapi import HTTPException

from ..conf.settings import BASE_DIR, Settings
from ..utils.general import (compose_location, convert_epoch_to_datetime,
                             decompose_merged_location, get_event_message,
                             get_risks_by_location, get_weather_forecast,
                             weather_api_call, get_risks_by_address)


def test_get_risks_by_address(mocker):
    geo_mock = mocker.patch(
        'app.utils.general.geocode_address',
        return_value={
            "lat": 40.7128,
            "lon": -74.0060,
        })
    risks_mock = mocker.patch(
        'app.utils.general.get_risks_by_location',
        return_value=None)

    get_risks_by_address("New York")
    geo_mock.assert_called_once_with("New York")
    risks_mock.assert_called_once_with(40.7128, -74.0060)


def test_get_risk_message():
    text = get_event_message("test")
    assert len(text) > len("test")
    assert text.find("test") != -1


class TestGetRisksByLocation:
    test_file_path = BASE_DIR / "tests" / "test_data" / "test_hourly.json"
    with open(test_file_path, "r") as f:
        test_data = json.load(f)

    def test_get_risks_by_location_1(self, mocker, settings: Settings):
        hourly_mock = mocker.patch(
            'app.utils.general.client.get_hourly_forecast',
            return_value=self.test_data
        )

        settings.MAX_STEP_HOURS = 3
        mocker.patch(
            "app.utils.general.settings", settings
        )

        mocker.patch(
            "app.utils.general.now_utc",
            return_value=datetime(2022, 12, 3, 0, 0, tzinfo=pytz.UTC)
        )

        expected = [
            {
                "start": datetime(2022, 12, 3, 0, 0, tzinfo=pytz.UTC),
                "end": datetime(2022, 12, 3, 4, 0, tzinfo=pytz.UTC),
                "event": "Heatwave",
                "description": get_event_message("Heatwave")
            },
        ]

        results = get_risks_by_location(1, 1)
        hourly_mock.assert_called_once_with(1, 1, timezone="UTC")
        assert results == expected

    def test_get_risks_by_location_2(self, mocker, settings: Settings):
        hourly_mock = mocker.patch(
            'app.utils.general.client.get_hourly_forecast',
            return_value=self.test_data
        )

        settings.MAX_STEP_HOURS = 8
        mocker.patch(
            "app.utils.general.settings", settings
        )

        mocker.patch(
            "app.utils.general.now_utc",
            return_value=datetime(2022, 12, 3, 0, 0, tzinfo=pytz.UTC)
        )

        expected = [
            {
                "start": datetime(2022, 12, 3, 0, 0, tzinfo=pytz.UTC),
                "end": datetime(2022, 12, 3, 4, 0, tzinfo=pytz.UTC),
                "event": "Heatwave",
                "description": get_event_message("Heatwave")
            },
            {
                "start": datetime(2022, 12, 3, 4, 0, tzinfo=pytz.UTC),
                "end": datetime(2022, 12, 3, 7, 0, tzinfo=pytz.UTC),
                "event": "Flooding",
                "description": get_event_message("Flooding")
            },
            {
                "start": datetime(2022, 12, 3, 7, 0, tzinfo=pytz.UTC),
                "end": datetime(2022, 12, 3, 9, 0, tzinfo=pytz.UTC),
                "event": "Heatwave",
                "description": get_event_message("Heatwave")
            },
        ]

        results = get_risks_by_location(1, 1)
        hourly_mock.assert_called_once_with(1, 1, timezone="UTC")
        assert results == expected


@pytest.mark.parametrize(
    "city, state, country, expected",
    [
        ("a", "b", "c", "a-b-c"),
        ("a", "b", "c d", "a-b-c d"),
    ]
)
def test_compose_location(city, state, country, expected):
    assert compose_location(
        city, state, country
    ) == expected


@pytest.mark.parametrize(
    "merged, expected",
    [
        ("a-b-c", {
            "city": "a",
            "state": "b",
            "country": "c"
        }),
        ("a-b-c d", {
            "city": "a",
            "state": "b",
            "country": "c d"
        }),
        ("a d-b-c d", {
            "city": "a d",
            "state": "b",
            "country": "c d"
        }),
    ]
)
def test_decompose_merged_location(merged, expected):
    assert decompose_merged_location(merged) == expected


def test_convert_epoch_to_datetime():
    epoch_time = 1612904800
    expected = {
        "date": "09 Feb, 2021",
        "time": "10:06pm"
    }
    assert convert_epoch_to_datetime(epoch_time) == expected


def test_weather_api_call(mocker):
    mocker.patch('app.utils.general.requests.get', return_value=mocker.Mock(
        status_code=200,
        json=lambda: {
            "weather": [
                {
                    "id": 501,
                    "main": "Rain",
                    "description": "moderate rain",
                    "icon": "10d"
                }
            ],
            "dt": 1661870592,
            "timezone": 7200,
        }
    ))

    expected = {
        "dt": 1661870592,
        "main": "Rain",
        "description": "moderate rain",
    }
    assert weather_api_call(1, 1) == expected


def test_weather_api_call_error(mocker):
    mocker.patch('app.utils.general.requests.get', return_value=mocker.Mock(
        status_code=400,
    ))
    with pytest.raises(HTTPException):
        weather_api_call(1, 1)


class TestGetWeatherForecast:
    def test_weather_forcasts_valid(self, mocker):
        """Test weather forecast endpoint"""
        # mocker request.get json response
        mocker.patch(
            'requests.get',
            return_value=mocker.Mock(
                status_code=200,
                json=mocker.Mock(
                    return_value={
                        "cod": "200",
                        "message": 0,
                        "cnt": 40,
                        "list": [
                            {
                                "test": "demo"
                            },
                        ]
                    }
                )
            )
        )

        results = get_weather_forecast(6.5244, 3.3792)
        assert results == [{"test": "demo"}]

    @ pytest.mark.parametrize(
        "cod",
        [
            "400",
            "401",
        ]
    )
    def test_weather_forcasts_invalid(self, cod, mocker):
        """Test weather forecast endpoint"""
        # mocker request.get json response
        mocker.patch(
            'requests.get',
            return_value=mocker.Mock(
                status_code=200,
                json=mocker.Mock(
                    return_value={
                        "cod": cod,
                        "message": 0,
                        "cnt": 40,
                        "list": [
                            {
                                "test": "demo"
                            },
                        ]
                    }
                )
            )
        )

        with pytest.raises(Exception):
            get_weather_forecast(6.5244, 3.3792)

    def test_weather_forcasts_error(self, mocker):
        """Test weather forecast endpoint"""
        mocker.patch(
            'requests.get',
            return_value=mocker.Mock(
                status_code=400
            )
        )

        with pytest.raises(Exception):
            get_weather_forecast(6.5244, 3.3792)