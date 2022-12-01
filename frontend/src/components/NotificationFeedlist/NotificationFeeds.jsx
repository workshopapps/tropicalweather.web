/* eslint-disable react/prop-types */

// eslint-disable-next-line react/prop-types
export default function NotificationFeeds({ feeds }) {
  return (
    <>
      <ul>
        {feeds.map((news) => (
          <li key={news.id} className="notificaton_feed-list">
            {news.events === 'rainy' && (
              <>
                <div className="notificaton_feed-listcontent">
                  <img src="./assets/NotificationFeedList/icon.svg" alt="" />
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
                    alt=""
                  />
                  <p className="notificaton_feed-feed">{news.feed}</p>
                </div>
                <p className="notificaton_feed-time">{news.time}</p>
              </>
            )}
            {news.events === 'cloudy' && (
              <>
                <div className="notificaton_feed-listcontent">
                  <img src="./assets/NotificationFeedList/cloudy.svg" alt="" />
                  <p className="notificaton_feed-feed">{news.feed}</p>
                </div>
                <p className="notificaton_feed-time">{news.time}</p>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
