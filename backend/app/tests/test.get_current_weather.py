from routers import weather
from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)



def test_current_weather(mocker):
    
    mock_output= mocker.patch("routers.weather.get_current_weather", return_value = {
    "state": "New York",
    "city": "NYC",
    "main": "Clouds",
    "description": "broken clouds",
    "date": "12 Nov, 2022",
    "time": "12:00pm"
})
     
     
    
    result = weather.weather_api_call()
    

    assert result == {
    "state": "New York",
    "city": "NYC",
    "main": "Clouds",
    "description": "broken clouds",
    "date": "12 Nov, 2022",
    "time": "12:00pm"
}
