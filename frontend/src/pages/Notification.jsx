import React, { useState } from 'react';
import '../styles/Notification.css';

export default function Notification() {
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
      title: 'News and updates',
      text: 'News about product and feature updates.',
    },
    {
      title: 'Forecast',
      text: 'News about weather forecast.',
    },
    {
      title: 'Tips',
      text: 'Tips about weather forecast.',
    },
  ];
  const dataForSectionTwo = [
    {
      title: 'Do not notify me',
    },
    {
      title: 'Important reminders only',
      text: 'Only notify me if the reminder is tagged as important.',
    },
    {
      title: 'All reminders',
      text: 'Notify me for all reminders.',
    },
  ];
  const dataForSectionThree = [
    {
      title: 'Do not notify me',
    },
    {
      title: 'All reminders',
      text: 'Thsese are  notifications for posts on your profile, details and list of notifications',
    },
  ];

  return (
    <div className="notification mt-10">
      <div className="notification__wrapper">
        <h3>Notification</h3>
        <p className="notification__subtext">
          Choose when and how we contact you
        </p>
        <ul>
          <li className="active">Email</li>
          <li>In-app</li>
          <li>Push</li>
        </ul>
        <section className="notification-content">
          <h5>Notifcations from us</h5>
          <p>Receive the latest weather news, forecast, updates from us.</p>
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
          <h5>Reminders</h5>
          <p>
            These are notification to remind you of updates you might have
            missed.
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
          <h5>More activity about you</h5>
          <p>
            Thsese are notifications for posts on your profile,details and list
            of notifications
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
