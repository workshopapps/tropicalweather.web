
import pytest
import requests
from app.client import get, reverse_geocoding, weather


def test_get(mocker):
    mocker.patch('requests.get', return_value=mocker.Mock(
        status_code=200,
        json=lambda: {'cod': '200', 'list': []}
    ))
    mocker.patch('app.client.API_KEY', '123')
    data = get('/data/2.5/forecast', {'lat': 1, 'lon': 2})
    requests.get.assert_called_once_with(
        url='https://api.openweathermap.org/data/2.5/forecast',
        params={'lat': 1, 'lon': 2, 'appid': '123'}
    )
    assert data == {'cod': '200', 'list': []}


def test_get_error(mocker):
    mocker.patch('requests.get', return_value=mocker.Mock(
        status_code=400,
        json=lambda: {'cod': '400'}
    ))
    mocker.patch('app.client.API_KEY', '123')
    with pytest.raises(Exception):
        get('/data/2.5/forecast', {'lat': 1, 'lon': 2})


def test_reverse_geocoding(mocker):
    mocker.patch('requests.get', return_value=mocker.Mock(
        status_code=200,
        json=lambda: [{'name': 'test'}]
    ))
    mocker.patch('app.client.API_KEY\
', '123')
    data = reverse_geocoding(1, 2)
    requests.get.assert_called_once_with(
        url='https://api.openweathermap.org/geo/1.0/reverse',
        params={'lat': 1, 'lon': 2, 'appid': '123'}
    )
    assert data == 'test'


def test_reverse_geocoding_error(mocker):
    mocker.patch('requests.get', return_value=mocker.Mock(
        status_code=200,
        json=lambda: []
    ))
    mocker.patch('app.client.API_KEY', '123')
    with pytest.raises(Exception, match='Invalid request'):
        reverse_geocoding(1, 2)


def test_weather(mocker):
    mocker.patch('requests.get', return_value=mocker.Mock(
        status_code=200,
        json=lambda: {'cod': '200', 'list': [{
            'dt': 1,
        }]}
    ))
    mocker.patch('app.client.API_KEY', '123')
    data = weather(1, 2)
    requests.get.assert_called_once_with(
        url='https://api.openweathermap.org/data/2.5/forecast',
        params={'lat': 1, 'lon': 2, 'appid': '123'}
    )
    assert data == [{'dt': 1}]


def test_weather_error1(mocker):
    mocker.patch('requests.get', return_value=mocker.Mock(
        status_code=200,
        json=lambda: {'cod': '200', 'list': []}
    ))
    mocker.patch('app.client.API_KEY', '123')
    with pytest.raises(Exception, match='Invalid request'):
        weather(1, 2)


def test_weather_error(mocker):
    mocker.patch('requests.get', return_value=mocker.Mock(
        status_code=200,
        json=lambda: {'cod': '400'}
    ))
    mocker.patch('app.client.API_KEY', '123')
    with pytest.raises(Exception, match='Invalid request'):
        weather(1, 2)
        