import React, { useState } from "react";

import "../styles/NotificationSettings.css";
import BackIcon from "../NotificationSettingsAssets/BackIcon.svg";

export default function Notificationsettings() {
  const [toggle, setToggle] = useState(false);
  const toggleSwitch = () => {
    setToggle(!toggle);
  };
  return (
    <div className="notificationsettings__container">
      <div className="return__btn--container">
        <img src={BackIcon} alt="Back Icon" />
        <p>Back</p>
      </div>
      <div className="notification__header">
        <h2>Notifications</h2>
        <p>Choose when and how we can contact you</p>
      </div>
      <div className="notification__push">
        <div className="notification__push--text">
          <h3>Enable push notification</h3>
          <p>Receive the latest weather news, forecast, updates from us</p>
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
            <h3>Reminders</h3>
            <p>
              These are notification to remind you of updates you might have
              missed
            </p>
          </div>
          <div className="notificationsetting__option">
            <input type="radio" className="radio" />
            <h5 className="notificationsetting__option--heading-text">
              Do not notify me
            </h5>
          </div>
          <div className="notificationsetting__option1">
            <input type="radio" className="radio" />
            <div>
              <h5 className="notificationsetting__option--heading-text">
                Important reminders only
              </h5>
              <p className="notificationsetting__option--description">
                Only notify me if the reminder is tagged as important
              </p>
            </div>
          </div>
          <div className="notificationsetting__option2">
            <input type="radio" className="radio" />
            <div>
              <h5 className="notificationsetting__option--heading-text">
                All reminders
              </h5>
              <p className="notificationsetting__option--description">
                Notify me for all reminders
              </p>
            </div>
          </div>
        </div>

        <section className="notificationsetting">
          <div className="notificationsetting__header">
            <h3>More activity about you</h3>
            <p>
              These are notifications for posts on your profile, details and
              list of notifications
            </p>
          </div>
          <div className="notificationsetting__option">
            <input type="radio" className="radio" />
            <h5 className="notificationsetting__option--heading-text">
              Do not notify me
            </h5>
          </div>
          <div className="notificationsetting__option2">
            <input type="radio" className="radio" />
            <div>
              <h5 className="notificationsetting__option--heading-text">
                All reminders
              </h5>
              <p className="notificationsetting__option--description">
                Notify me for all reminders
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
