from ..utils.fcm_service import get_topic_name, register_id_to_topic
from firebase_admin.exceptions import FirebaseError
import pytest


@pytest.mark.parametrize(
    "city, state, country, expected_topic",
    [
        ("city", "state", "country", "/topics/city_state_country"),
        ("city", "state", None, "/topics/city_state_null"),
        ("city", None, "country", "/topics/city_null_country"),
        (None, "state", "country", "/topics/null_state_country"),
        ("city", None, None, "/topics/city_null_null"),
        (None, "state", None, "/topics/null_state_null"),
        (None, None, "country", "/topics/null_null_country"),
        (None, None, None, "/topics/null_null_null"),
    ],
)
def test_get_topic_name(city, state, country, expected_topic):
    """Test get_topic_name."""
    topic = get_topic_name(city, state, country)
    assert topic == expected_topic


class TopicManagementResponseMock:
    """Mock for TopicManagementResponse."""

    @property
    def success_count(self):
        """Mock for success_count."""
        return 1


def test_register_id_to_topic(mocker):
    """Test register_id_to_topic."""
    message_mock = mocker.patch(
        "app.utils.fcm_service.messaging.subscribe_to_topic",
        return_value=TopicManagementResponseMock(),
    )
    token = "token"
    topic = "topic"

    register_id_to_topic(token, topic)

    # Check if subscribe_to_topic was called with the correct arguments
    message_mock.assert_called_once_with([token], topic)


def test_register_id_to_topic_exception(mocker):
    """Test register_id_to_topic."""
    message_mock = mocker.patch(
        "app.utils.fcm_service.messaging.subscribe_to_topic",
        side_effect=FirebaseError("test", "test"),
    )
    token = "token"
    topic = "topic"

    with pytest.raises(FirebaseError):
        register_id_to_topic(token, topic)

    # Check if subscribe_to_topic was called with the correct arguments
    message_mock.assert_called_once_with([token], topic)
