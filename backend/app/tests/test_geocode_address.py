from app.utils import geocode_address
import pytest


@pytest.mark.parametrize(
    "city_name, lga, state, expected",
    [
        ("Ibadan", "Ibadan North", "Oyo", "Ibadan, Ibadan North, Oyo"),
        ("Ibadan", "Ibadan North", "", "Ibadan, Ibadan North"),
        ("Ibadan", "", "", "Ibadan"),
        ("Ibadan", "", "Ibadan North", "Ibadan, Ibadan North"),
    ],
)
def test_geocode_address(city_name, lga, state, expected, mocker):
    """Test geocode_address function"""
    mock = mocker.patch("geocoder.osm")
    geocode_address(city_name, lga, state)
    mock.assert_called_with(expected)
