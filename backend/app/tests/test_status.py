from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


class TestStatus:
    def test_status_with_cache(self, mocker):
        """Test status endpoint"""
        data= """{
            'forecasts': 'up',
            'current': 'up',
            'immediate': 'up',
            'tomorrow': 'up',
            'tomorrow_im': 'up',
            'location': 'up',
            'risk': 'up',
            'alert_city': 'up',
            'alert_list': 'up',
        }"""
        
        mocker.patch(
            'redis.Redis.get',
            return_value=data
        )

        response = client.get("/status")
        assert response.status_code == 200
