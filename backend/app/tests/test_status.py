from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)



class TestStatus:
    def test_status(self, mocker):
        """Test status endpoint"""
        # mocker request.get json response
        mocker.patch(
            'requests.get',
            return_value=mocker.Mock(
                status_code=200,
                json=mocker.Mock(
                    return_value={
                        'request': 'stations',
                        'forecasts': 'up',
                        'current': 'up',
                        'immediate': 'up',
                        'tomorrow': 'up',
                        'tomorrow_im': 'up',
                        'location': 'up',
                        'risk': 'up',
                        'alert_city': 'up',
                        'alert_list': 'up',
                        }
                )
            )
        )

        response = client.get("/status")
        assert response.status_code == 200