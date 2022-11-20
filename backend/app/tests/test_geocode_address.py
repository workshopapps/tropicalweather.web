from app.utils import geocode_address
import pytest
from fastapi import HTTPException


def test_geocode_address_valid(mocker):
    """Test geocode_address function"""
    mock = mocker.patch("geocoder.osm", return_value=mocker.Mock(
        lat=1.0, lng=2.0, city="city", state="state", ok=True))
    data = geocode_address('test')
    mock.assert_called_with("test")

    assert data == {
        "lat": 1.0,
        "lon": 2.0,
        "city": "city",
        "state": "state",
    }


def test_geocode_address_invalid(mocker):
    """Test geocode_address function"""
    mock = mocker.patch("geocoder.osm", return_value=mocker.Mock(ok=False))
    with pytest.raises(HTTPException):
        geocode_address('test')
    mock.assert_called_with("test")
