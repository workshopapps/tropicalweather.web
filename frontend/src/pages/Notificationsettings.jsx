import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/NotificationSettings.css';
import BackIcon from '../NotificationSettingsAssets/BackIcon.svg';

function getFormValues1() {
  const storedValues1 = localStorage.getItem('radio1');
  if (!storedValues1) return 'eng';
  return JSON.parse(storedValues1);
}

function getFormValues2() {
  const storedValues2 = localStorage.getItem('radio2');
  if (!storedValues2) return 'eng';
  return JSON.parse(storedValues2);
}

function getToggleVal() {
  const toggleVal = localStorage.getItem('toggle');
  return JSON.parse(toggleVal);
}

export default function Notificationsettings() {
  const APIURL = 'https://api.tropicalweather.hng.tech';
  const [subscribeMessage, setSubscribeMessage] = useState('');
  const [unsubscribeMessage, setUnsubscribeMessage] = useState('');

  function subscribeApi() {
    axios.get(`${APIURL}/weather/alerts/subscribe?fcm_id=jdhaju04upalkdnlkajd&lat=9.0&lng=8.6`)
      .then((res) => {
        // console.log(res.data.message);
        setSubscribeMessage(res.data.message);
      }).catch((err) => {
        console.log(err);
      });
  }
  function unsubscribeApi() {
    axios.get(`${APIURL}/weather/alerts/unsubscribe?fcm_id=jdhaju04upalkdnlkajd&lat=9.0&lng=8.6`)
      .then((res) => {
        // console.log(res.data.message);
        setUnsubscribeMessage(res.data.message);
        // toast(`${subscribeMessage}`);
      }).catch((err) => {
        console.log(err);
      });
  }
  const [toggle, setToggle] = useState(true);
  const [radioVal1, setRadioVal1] = useState(getFormValues1);
  const [radioVal2, setRadioVal2] = useState(getFormValues2);

  useEffect(() => {
    setToggle(getToggleVal());
  }, []);

  useEffect(() => {
    localStorage.setItem('radio1', JSON.stringify(radioVal1));
  }, [radioVal1]);

  useEffect(() => {
    localStorage.setItem('radio2', JSON.stringify(radioVal2));
  }, [radioVal2]);

  useEffect(() => {
    localStorage.setItem('toggle', JSON.stringify(toggle));
  }, [toggle]);

  const handleChange1 = (e) => {
    setRadioVal1(e.target.value);
  };

  const handleChange2 = (e) => {
    setRadioVal2(e.target.value);
  };

  const toggleSwitch = () => {
    // toast("yeah it works");
    setToggle(!toggle);
    console.log(toggle);
    if (toggle === true) {
      // subscribeApi();
      console.log(subscribeMessage);
      toast.success(`${subscribeMessage}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } else if (toggle === false) {
      // unsubscribeApi();
      console.log(unsubscribeMessage);
      toast.success(`${unsubscribeMessage}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };
  if (toggle === true) {
    subscribeApi();
    // console.log(subscribeMessage);
    // toast(`${subscribeMessage}`);
  } else if (toggle === false) {
    unsubscribeApi();
    // console.log(unsubscribeMessage);

    // toast(`${unsubscribeMessage}`);
  }
  const { t } = useTranslation(['notification']);
  return (
    <div className="notificationsettings__container">
      <div>
        <Link to="/settings" className="return__btn--container">
          <img src={BackIcon} alt="Back Icon" />
          <p>{t('back')}</p>
        </Link>
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
              onChange={handleChange1}
              value="radu"
              checked={radioVal1 === 'radu'}
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
              onChange={handleChange1}
              value="radv"
              checked={radioVal1 === 'radv'}
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
              onChange={handleChange1}
              value="radw"
              checked={radioVal1 === 'radw'}
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
              value="radx"
              onChange={handleChange2}
              checked={radioVal2 === 'radx'}
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
              value="rady"
              onChange={handleChange2}
              checked={radioVal2 === 'rady'}
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
