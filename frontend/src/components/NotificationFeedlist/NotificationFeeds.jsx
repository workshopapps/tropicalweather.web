/* eslint-disable react/prop-types */

// eslint-disable-next-line react/prop-types
export default function NotificationFeeds({ feeds }) {
  return (
    <>
      <ul>

        {feeds.map((news) => (
          <li key={news.id}>
            <p>{news.events}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
