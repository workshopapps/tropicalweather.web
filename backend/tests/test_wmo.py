from app.utils.weather_code import WmoCodes
import pytest


@pytest.mark.parametrize(
    "code, expected",
    [
        (0, "Clear sky"),
        (45, "Fog and depositing rime fog"),
        (81, "Rain showers"),
    ]
)
def test_get_wmo_code(code, expected):
    """Test get wmo code"""
    assert WmoCodes.get_wmo_code(code) == expected
