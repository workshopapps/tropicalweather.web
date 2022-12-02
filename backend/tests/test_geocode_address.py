from app.utils.general import geocode_address, reverse_geocode
import pytest
from fastapi import HTTPException


def test_geocode_address_valid(mocker):
    """Test geocode_address function"""
    mock = mocker.patch("geocoder.osm", return_value=mocker.Mock(
        lat=1.0, lng=2.0, city="city",
        state="state", country="country", ok=True))

    data = geocode_address('test')
    mock.assert_called_with("test")

    assert data == {
        "lat": 1.0,
        "lon": 2.0,
        "city": "city",
        "state": "state",
        "country": "country"
    }


def test_geocode_address_invalid(mocker):
    """Test geocode_address function"""
    mock = mocker.patch("geocoder.osm", return_value=mocker.Mock(ok=False))
    with pytest.raises(HTTPException):
        geocode_address('test')
    mock.assert_called_with("test")


def test_reverse_geocode(mocker):
    """Test reverse_geocode function"""
    mock = mocker.patch("geocoder.osm", return_value=mocker.Mock(
        lat=1.0, lng=2.0, city="city",
        state="state", country="country", ok=True))
    data = reverse_geocode(1.0, 2.0)
    mock.assert_called_with([1.0, 2.0], method='reverse')

    assert data == {
        "city": "city",
        "state": "state",
        "country": "country"
    }


def test_reverse_geocode_invalid(mocker):
    """Test reverse_geocode function"""
    mock = mocker.patch("geocoder.osm", return_value=mocker.Mock(ok=False))
    with pytest.raises(HTTPException):
        reverse_geocode(1.0, 2.0)
    mock.assert_called_with([1.0, 2.0], method='reverse')
