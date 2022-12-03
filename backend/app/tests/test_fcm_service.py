import models
import pytest
from firebase_admin.exceptions import FirebaseError
from sqlalchemy.orm import Session

from ..utils.fcm_service import (get_topic_name, register_id_to_topic,
                                 unsubscribe_id_all_topics,
                                 unsubscribe_id_from_topic)


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


class TestRegisterIdToTopic:
    def test_register(self, mocker):
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

    def test_exception(self, mocker):
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


class TestUnsubscribeFromTopic:
    def test_success(self, mocker):
        """Test unsubscribe_id_from_topic."""
        message_mock = mocker.patch(
            "app.utils.fcm_service.messaging.unsubscribe_from_topic",
            return_value=TopicManagementResponseMock(),
        )
        token = "token"
        topic = "topic"

        unsubscribe_id_from_topic(token, topic)

        # Check if unsubscribe_from_topic was called with the correct arguments
        message_mock.assert_called_once_with([token], topic)

    def test_exception(self, mocker):
        """Test unsubscribe_id_from_topic."""
        message_mock = mocker.patch(
            "app.utils.fcm_service.messaging.unsubscribe_from_topic",
            side_effect=FirebaseError("test", "test"),
        )
        token = "token"
        topic = "topic"

        with pytest.raises(FirebaseError):
            unsubscribe_id_from_topic(token, topic)

        # Check if unsubscribe_from_topic was called with the correct arguments
        message_mock.assert_called_once_with([token], topic)


class TestUnsubscribeAll:
    def test_success(self, session: Session, mocker, override_db):
        mocker.patch(
            "app.utils.fcm_service.get_db",
            return_value=override_db(),
        )

        message_mock = mocker.patch(
            "app.utils.fcm_service.messaging.unsubscribe_from_topic",
            return_value=TopicManagementResponseMock(),
        )
        token = "token"

        # create dummy locations
        location1 = models.Location(
            city="city1", state="state1", country="country1",
            subscription_count=1,
        )
        location2 = models.Location(
            city="city2", state="state2", country="country2",
            subscription_count=2,
        )
        session.add(location1)
        session.add(location2)
        session.commit()

        unsubscribe_id_all_topics(token)

        # Check if unsubscribe_from_topic was called with the correct arguments
        location_2_topic = "/topics/city2_state2_country2"
        message_mock.assert_called_with([token], location_2_topic)

        # Check if subscription_count was updated
        assert location1.subscription_count == 0
        assert location2.subscription_count == 1

    def test_exception(self, session: Session, mocker, override_db):
        mocker.patch(
            "app.utils.fcm_service.get_db",
            return_value=override_db(),
        )
        message_mock = mocker.patch(
            "app.utils.fcm_service.messaging.unsubscribe_from_topic",
            side_effect=FirebaseError("test", "test"),
        )
        token = "token"

        # create dummy locations
        location1 = models.Location(
            city="city1", state="state1", country="country1",
            subscription_count=1,
        )
        location2 = models.Location(
            city="city2", state="state2", country="country2",
            subscription_count=2,
        )
        session.add(location1)
        session.add(location2)
        session.commit()

        unsubscribe_id_all_topics(token)

        # Check if unsubscribe_from_topic was called with the correct arguments
        location_2_topic = "/topics/city2_state2_country2"
        message_mock.assert_called_with([token], location_2_topic)

        # Check if subscription_count was not updated
        assert location1.subscription_count == 1
        assert location2.subscription_count == 2
