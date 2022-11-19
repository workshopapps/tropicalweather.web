from routers import weather
import pytest
from fastapi import HTTPException

def test_current_weather(mocker):
    
    mock_output= mocker.patch("app.routers.weather.get_current_weather", return_value=mocker.Mock(
     city="city", state="state",weather_condition = "main", 
     description = "description", date = "date", 
     time = "time",  ok=True))
     
    result = weather.get_current_weather()
    mock_output.assert_called_with()

    assert result == {
         "main": "weather_condition",
         "description": "description",
         "date": "date",
         "time": "time",  
         "city": "city",
         "state": "state",
    }

    with pytest.raises(HTTPException):
        weather.get_current_weather()
    mock_output.assert_called_with()
