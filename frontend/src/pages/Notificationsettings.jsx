import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import '../styles/NotificationSettings.css';
import BackIcon from '../NotificationSettingsAssets/BackIcon.svg';

export default function Notificationsettings() {
  const APIURL = 'https://api.tropicalweather.hng.tech';
  const [toggle, setToggle] = useState(false);
  const toggleSwitch = () => {
    setToggle(!toggle);
    console.log(toggle)
    axios.get(`${APIURL}/weather/alerts/subscribe?fcm_id=jdhaju04upalkdnlkajd&lat=9.0&lng=8.6`)
      .then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
  };

  const { t } = useTranslation(['notification']);
  return (
    <div className="notificationsettings__container">
      <div className="return__btn--container">
        <img src={BackIcon} alt="Back Icon" />
        <p>{t('back')}</p>
      </div>
      <div className="notification__header">
        <h2>{t('notification')}</h2>
        <p>{t('choosewhenwecancontact')}</p>
      </div>
      <div className="notification__push">
        <div className="notification__push--text">
          <h3>{t('enablepushnotification')}</h3>
          <p>{t('receivelatestnews')}</p>
        </div>
        <button type="button" className="toggle-btn" onClick={toggleSwitch}>
          {toggle ? (
            <div className="toggle-btn__left" />
          ) : (
            <div className="toggle-btn__right" />
          )}
        </button>
      </div>
      <div className="notificationsettings">
        <div className="notificationsetting">
          <div className="notificationsetting__header">
            <h3>{t('reminders')}</h3>
            <p>{t('remindernotification')}</p>
          </div>
          <div className="notificationsetting__option">
            <input
              type="radio"
              name="radio"
              className="notificationsetting__option2--input"
            />
            <h5 className="notificationsetting__option--heading-text">
              {t('dontnotify')}
            </h5>
          </div>
          <div className="notificationsetting__option1">
            <input
              type="radio"
              name="radio"
              className="notificationsetting__option2--input"
            />
            <div>
              <h5 className="notificationsetting__option--heading-text">
                {t('dontnotify')}
              </h5>
              <p className="notificationsetting__option--description">
                {t('notifyimportantreminders')}
              </p>
            </div>
          </div>
          <div className="notificationsetting__option2">
            <input
              type="radio"
              name="radio"
              className="notificationsetting__option2--input"
            />
            <div>
              <h5 className="notificationsetting__option--heading-text">
                {t('allreminders')}
              </h5>
              <p className="notificationsetting__option--description">
                {t('notifyallreminders')}
              </p>
            </div>
          </div>
        </div>

        <section className="notificationsetting">
          <div className="notificationsetting__header">
            <h3>{t('moreactivityaboutyou')}</h3>
            <p>{t('aboutyounotification')}</p>
          </div>
          <div className="notificationsetting__option">
            <input
              type="radio"
              name="radio2"
              className="notificationsetting__option2--input"
            />
            <h5 className="notificationsetting__option--heading-text">
              {t('dontnotify')}
            </h5>
          </div>
          <div className="notificationsetting__option2">
            <input
              type="radio"
              name="radio2"
              className="notificationsetting__option2--input"
            />
            <div>
              <h5 className="notificationsetting__option--heading-text">
                {t('allreminders')}
              </h5>
              <p className="notificationsetting__option--description">
                {t('notifyallreminders')}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
