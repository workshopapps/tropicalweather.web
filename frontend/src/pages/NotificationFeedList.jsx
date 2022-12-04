import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import NotificationFeeds from '../components/NotificationFeedlist/NotificationFeeds';
import '../styles/NotificationFeedList.css';
import DeleteNotification from '../components/NotificationFeedlist/DeleteNotification';

export default function NotificationFeedList() {
  const { t } = useTranslation(['notification']);
  const [location, setLocation] = useState([
    {
      id: 'a',
      events: 'rainy',
      feed: `${t('heavyrainnortheast')}`,
      time: `${t('now')}`,
    },
    {
      id: 'b',
      events: 'rainy',
      feed: `${t('heavyrainnortheast')}`,
      time: `5 ${t('mins')}`,
    },

    {
      id: 'c',
      events: 'sunny',
      feed: `${t('heavyrainnortheast')}`,
      time: `12 ${t('mins')}`,
    },
    {
      id: 'd',
      events: 'rainy',
      feed: `${t('showersorlargespell')}`,
      time: `3 ${t('hours')}`,
    },
    {
      id: 'e',
      events: 'cloudy',
      feed: `${t('darkclouds')}`,
      time: `8 ${t('hours')}`,
    },
    {
      id: 'f',
      events: 'sunny',
      feed: `${t('sunwillscorch')}`,
      time: `12 ${t('hours')}`,
    },
  ]);

  const [show, setShow] = useState(false);
  const closeModal = () => {
    setShow(false);
  };
   const emptyNotification = () => {
    setLocation([]);
        setShow(false);
   };
    return (
      <div className="notificaton_feed-container">
        <div className="notificaton_feedhd">
          <div className="notificaton_feedhd-flex">
            <Link
              to="/"
              className="notificaton_feedbg notificaton_feedhome"
              aria-label="home"
            >
              <span>{t('back')}</span>
            </Link>
            <h1>{t('notification')}</h1>
          </div>

          <button
            type="button"
            className="notificaton_feedbg notificaton_feedtrash"
            aria-label="trash icon"
            onClick={() => (!show && location.length > 0 ? setShow(true) : setShow(false))}
          />
        </div>
        <NotificationFeeds feeds={location} />
        <DeleteNotification
          show={show}
          location={location}
          closeModal={closeModal}
          emptyNotification={emptyNotification}
        />
      </div>
    );
}
