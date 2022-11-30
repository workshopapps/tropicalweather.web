import { Link } from 'react-router-dom';
import NoNotificationFeed from '../components/NotificationFeedlist/NoNotificationFeed';
import '../styles/NotificationFeedList.css';

export default function NotificationFeedList() {
    return (
      <div className="notificaton_feed-container">
        <div className="notificaton_feedhd">
          <Link
            to="/"
            className="notificaton_feedbg notificaton_feedhome"
            aria-label="home"
          />
          <h1>Notification</h1>
          <button
            type="button"
            className="notificaton_feedbg notificaton_feedtrash"
            aria-label="trash icon"
          />
        </div>
        <NoNotificationFeed />
      </div>
    );
}
