from ..utils.open_meteo import client
from ..conf.settings import settings


def test_init():
    """Test init"""
    assert client.base_url == settings.METEO_API
    assert client.forecast == "forecast"


def test_build_url():
    """Test build_url"""
    url = client.build_url("test")
    assert url == f"{settings.METEO_API}test"


def test_get(mocker):
    """Test get"""
    get_mock = mocker.patch(
        "requests.get",
        return_value=mocker.Mock(
            json=mocker.Mock(
                return_value="test"
            ),
            status_code=200
        )
    )

    res = client.get("test", params={
        "test": "test",
        "value": "a,b,c"
    })
    get_mock.assert_called_once_with(
        f"{settings.METEO_API}test?test=test&value=a,b,c",
    )
    assert res == "test"


def test_get_exception(mocker):
    """Test get exception"""
    mocker.patch(
        "requests.get",
        return_value=mocker.Mock(
            json=mocker.Mock(
                return_value="test"
            ),
            status_code=400
        )
    )

    try:
        client.get("test")
    except Exception as e:
        assert str(e) == "Invalid request"


def test_get_daily_forecast(mocker):
    """Test get_daily_forecast"""
    get_mock = mocker.patch(
        "app.utils.open_meteo.client.get",
        return_value="test"
    )

    client.get_daily_forecast(1, 1)
    get_mock.assert_called_once_with(
        "forecast",
        params={
            "latitude": 1,
            "longitude": 1,
            "timezone": "GMT",
            "daily": "apparent_temperature_max,precipitation_sum",
        }
    )


def test_get_daily_forecast_params1(mocker):
    """Test get_daily_forecast params"""
    get_mock = mocker.patch(
        "app.utils.open_meteo.client.get",
        return_value="test"
    )

    client.get_daily_forecast(1, 1, daily_params=["test"])
    get_mock.assert_called_once_with(
        "forecast",
        params={
            "latitude": 1,
            "longitude": 1,
            "timezone": "GMT",
            "daily": "test,apparent_temperature_max,\
precipitation_sum",
        }
    )


def test_get_daily_forecast_params2(mocker):
    """Test get_daily_forecast params"""
    get_mock = mocker.patch(
        "app.utils.open_meteo.client.get",
        return_value="test"
    )

    client.get_daily_forecast(
        1, 1, daily_params=["test"], params={"test": "test"})
    get_mock.assert_called_once_with(
        "forecast",
        params={
            "latitude": 1,
            "longitude": 1,
            "timezone": "GMT",
            "daily": "test,apparent_temperature_max,\
precipitation_sum",
            "test": "test"
        }
    )


def test_get_daily_forecast_params3(mocker):
    """Test get_daily_forecast params"""
    get_mock = mocker.patch(
        "app.utils.open_meteo.client.get",
        return_value="test"
    )

    client.get_daily_forecast(1, 1, params={"test": "test"})
    get_mock.assert_called_once_with(
        "forecast",
        params={
            "latitude": 1,
            "longitude": 1,
            "timezone": "GMT",
            "daily": "apparent_temperature_max,\
precipitation_sum",
            "test": "test"
        }
    )


def test_get_daily_forecast_params4(mocker):
    """Test get_daily_forecast params"""
    get_mock = mocker.patch(
        "app.utils.open_meteo.client.get",
        return_value="test"
    )

    client.get_daily_forecast(1, 1, params={"test": "test"}, timezone="test")
    get_mock.assert_called_once_with(
        "forecast",
        params={
            "latitude": 1,
            "longitude": 1,
            "timezone": "test",
            "daily": "apparent_temperature_max,\
precipitation_sum",
            "test": "test"
        }
    )


def test_get_hourly_forecast(mocker):
    """Test get_hourly_forecast"""
    get_mock = mocker.patch(
        "app.utils.open_meteo.client.get",
        return_value="test"
    )

    client.get_hourly_forecast(1, 1)
    get_mock.assert_called_once_with(
        "forecast",
        params={
            "latitude": 1,
            "longitude": 1,
            "hourly": "apparent_temperature,precipitation,weathercode",
            "timezone": "GMT"
        }
    )


def test_get_hourly_forecast_params1(mocker):
    """Test get_hourly_forecast params"""
    get_mock = mocker.patch(
        "app.utils.open_meteo.client.get",
        return_value="test"
    )

    client.get_hourly_forecast(1, 1, hourly_params=["test"])
    get_mock.assert_called_once_with(
        "forecast",
        params={
            "latitude": 1,
            "longitude": 1,
            "hourly": "test,apparent_temperature,\
precipitation,weathercode",
            "timezone": "GMT"
        }
    )


def test_get_hourly_forecast_params2(mocker):
    """Test get_hourly_forecast params"""
    get_mock = mocker.patch(
        "app.utils.open_meteo.client.get",
        return_value="test"
    )

    client.get_hourly_forecast(
        1, 1, hourly_params=["test"], params={"test": "test"})
    get_mock.assert_called_once_with(
        "forecast",
        params={
            "latitude": 1,
            "longitude": 1,
            "hourly": "test,apparent_temperature,\
precipitation,weathercode",
            "test": "test",
            "timezone": "GMT"
        }
    )


def test_get_hourly_forecast_params3(mocker):
    """Test get_hourly_forecast params"""
    get_mock = mocker.patch(
        "app.utils.open_meteo.client.get",
        return_value="test"
    )

    client.get_hourly_forecast(1, 1, params={"test": "test"})
    get_mock.assert_called_once_with(
        "forecast",
        params={
            "latitude": 1,
            "longitude": 1,
            "hourly": "apparent_temperature,\
precipitation,weathercode",
            "test": "test",
            "timezone": "GMT"
        }
    )


def test_get_hourly_forecast_params4(mocker):
    """Test get_hourly_forecast params"""
    get_mock = mocker.patch(
        "app.utils.open_meteo.client.get",
        return_value="test"
    )

    client.get_hourly_forecast(1, 1, params={"test": "test"}, timezone="test")
    get_mock.assert_called_once_with(
        "forecast",
        params={
            "latitude": 1,
            "longitude": 1,
            "hourly": "apparent_temperature,\
precipitation,weathercode",
            "test": "test",
            "timezone": "test"
        }
    )


def test_get_current_weather(mocker):
    """Test get_current_weather"""
    get_mock = mocker.patch(
        "app.utils.open_meteo.client.get",
        return_value="test"
    )

    client.get_current_weather(1, 1)
    get_mock.assert_called_once_with(
        "forecast",
        params={
            "latitude": 1,
            "longitude": 1,
            "current_weather": "true",
            "timezone": "GMT"
        }
    )


def test_get_current_weather_params1(mocker):
    """Test get_current_weather params"""
    get_mock = mocker.patch(
        "app.utils.open_meteo.client.get",
        return_value="test"
    )

    client.get_current_weather(1, 1, params={"test": "test"})
    get_mock.assert_called_once_with(
        "forecast",
        params={
            "test": "test",
            "latitude": 1,
            "longitude": 1,
            "current_weather": "true",
            "timezone": "GMT"
        }
    )
