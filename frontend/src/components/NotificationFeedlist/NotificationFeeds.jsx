import PropTypes from 'prop-types';

export default function NotificationFeeds({ feeds }) {
  if (feeds.length < 1) {
    return (
      <div className="notificaton_feed-nolist">
        <div>
          <img
            src="./assets/NotificationFeedList/trash-empty.svg"
            alt="a trash icon"
            className="notificaton_feed-bigtrash"
          />
          <p className="notificaton_feed-emptyy">Empty</p>
          <p className="notificaton_feed-ntn">
            Nothing to see here When you receive weather updates, they will
            appear here.
          </p>
        </div>
      </div>
    );
  }
  return (
    <>
      {feeds.length > 0 && (
        <ul>
          {feeds.map((news) => (
            <li key={news.id} className="notificaton_feed-list">
              {news.events === 'rainy' && (
                <>
                  <div className="notificaton_feed-listcontent">
                    <img src="./assets/NotificationFeedList/icon.svg" alt="rainy icon" />
                    <p className="notificaton_feed-feed">{news.feed}</p>
                  </div>
                  <p className="notificaton_feed-time">{news.time}</p>
                </>
              )}

              {news.events === 'sunny' && (
                <>
                  <div className="notificaton_feed-listcontent">
                    <img
                      src="./assets/NotificationFeedList/Ellipse 14.svg"
                      alt="sun icon"
                    />
                    <p className="notificaton_feed-feed">{news.feed}</p>
                  </div>
                  <p className="notificaton_feed-time">{news.time}</p>
                </>
              )}
              {news.events === 'cloudy' && (
                <>
                  <div className="notificaton_feed-listcontent">
                    <img
                      src="./assets/NotificationFeedList/cloudy.svg"
                      alt="cloudy icon"
                    />
                    <p className="notificaton_feed-feed">{news.feed}</p>
                  </div>
                  <p className="notificaton_feed-time">{news.time}</p>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
NotificationFeeds.propTypes = {
  feeds: PropTypes.arrayOf(
    PropTypes.shape({
      events: PropTypes.string.isRequired,
      feed: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
    })
  ),

};
