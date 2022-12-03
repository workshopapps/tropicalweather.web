import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/Notification.css';

export default function Notification() {
  const { t } = useTranslation(['notification']);

  const [reminderNotification, setReminderNotification] = useState('');
  const [activity, setActivity] = useState('');

  const handleReminderNotification = (e) => {
    setReminderNotification(e.currentTarget.value);
  };

  const handleActivity = (e) => {
    setActivity(e.currentTarget.value);
  };

  const dataForSectionOne = [
    {
      title: `${t('newsandupdates')}`,
      text: `${t('newsaboutproduct')}`,
    },
    {
      title: `${t('forecast')}`,
      text: `${t('forecastnews')}`,
    },
    {
      title: `${t('tips')}`,
      text: `${t('forecasttips')}`,
    },
  ];
  const dataForSectionTwo = [
    {
      title: `${t('dontnotify')}`,
    },
    {
      title: `${t('importantreminders')}`,
      text: `${t('notifyimportantreminders')}`,
    },
    {
      title: `${t('allreminders')}`,
      text: `${t('notifyallreminders')}`,
    },
  ];
  const dataForSectionThree = [
    {
      title: `${t('dontnotify')}`,
    },
    {
      title: `${t('allreminders')}`,
      text: `${t('aboutyounotification')}`,
    },
  ];

  return (
    <div className="notification mt-10 px:4 md:px-16">
      <div className="notification__wrapper">
        <h3>{t('notification')}</h3>
        <p className="notification__subtext">
          {t('choosewhenandhow')}
        </p>
        <ul>
          <li className="active">{t('email')}</li>
          <li>{t('inapp')}</li>
          <li>{t('push')}</li>
        </ul>
        <section className="notification-content">
          <h5>{t('notificationfromus')}</h5>
          <p>{t('receivenews')}</p>
          <div className="notification-content__wrapper">
            {dataForSectionOne.map(({ title, text }) => (
              <div className="notification__ind" key={text}>
                <input type="checkbox" id="cb1" />
                <div className="notification__ind-right">
                  <h6>{title}</h6>
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="notification-content">
          <h5>{t('reminders')}</h5>
          <p>
            {t('remindernotification')}
          </p>
          <div className="notification-content__wrapper">
            {dataForSectionTwo.map(({ title, text }) => (
              <div className="notification__ind" key={text}>
                <input
                  type="radio"
                  value={title}
                  name={reminderNotification}
                  onChange={handleReminderNotification}
                />
                <div className="notification__ind-right">
                  <h6>{title}</h6>
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="notification-content">
          <h5>{t('moreactivityaboutyou')}</h5>
          <p>
            {t('aboutyounotification')}
          </p>
          <div className="notification-content__wrapper">
            {dataForSectionThree.map(({ title, text }) => (
              <div className="notification__ind" key={text}>
                <input
                  type="radio"
                  value={title}
                  name={activity}
                  onChange={handleActivity}
                />
                <div className="notification__ind-right">
                  <h6>{title}</h6>
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
