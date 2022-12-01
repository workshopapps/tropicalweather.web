import { useState } from 'react';
import { Link } from 'react-router-dom';
import NotificationFeeds from '../components/NotificationFeedlist/NotificationFeeds';
import NoNotificationFeed from '../components/NotificationFeedlist/NoNotificationFeed';
import '../styles/NotificationFeedList.css';
import DeleteNotification from '../components/NotificationFeedlist/DeleteNotification';

export default function NotificationFeedList() {
  const [show, setShow] = useState(false);
  const sampleWeatherFeed = [
    {
      id: 'a',
      events: 'rainy ',
      feed: 'There will be heavy rain for some in northeast with a few brighter exceptions',
      time: 'Now',
    },
    {
      id: 'b',
      events: 'rainy ',
      feed: 'There will be heavy rain for some in northeast with a few brighter exceptions',
      time: 'Now',
    },

    {
      id: 'c',
      events: ' sunny',
      feed: 'There wil be heavy rain for some in northeast with a few brighter exceptions',
      time: '12 mins',
    },
    {
      id: 'd',
      events: 'rainy ',
      feed: ' Showers or longer spells of rain from Saturday night onwards, with some strong winds.',
      time: '3 hours',
    },
    {
      id: 'e',
      events: 'cloudy ',
      feed: 'There will be dark clouds and skies today. The weather remains cool all through the day.',
      time: '8 hours',
    },
    {
      id: 'f',
      events: 'sunny',
      feed: 'The sun today will be scorching. You stand the risk of being exposed to high dust levels.',
      time: '12 hours',
    },
  ];
  return (
    <div className="notificaton_feed-container">
      <div className="notificaton_feedhd">
        <div className="notificaton_feedhd-flex">
          <Link
            to="/"
            className="notificaton_feedbg notificaton_feedhome"
            aria-label="home"
          >
            <span>Back</span>
          </Link>
          <h1>Notification</h1>
        </div>

        <button
          type="button"
          className="notificaton_feedbg notificaton_feedtrash"
          aria-label="trash icon"
          onClick={() => (!show ? setShow(true) : setShow(false))}
        />
      </div>
      {sampleWeatherFeed.length > 1 && (
        <NotificationFeeds feeds={sampleWeatherFeed} />
      )}
      {sampleWeatherFeed.length < 1 && <NoNotificationFeed />}
      <DeleteNotification show={show} />
    </div>
  );
}
