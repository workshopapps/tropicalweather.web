

from app.utils import  weather_api_call
import pytest

@pytest.mark.one
def test_check_return_type(lat:float = 9.0765, lon:float=7.3986):
    result = weather_api_call(9.0765, 7.3986)
    assert result == {}

@pytest.mark.two
def test_check_return_params(lat:float = 9.0765, lon:float=7.3986):
    result = weather_api_call(lon, lat)

    state = result['name']
    assert state.lower() == "abuja"