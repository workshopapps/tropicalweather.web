/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/button-has-type */
export default function DeleteNotification({ show }) {
    return (
      <div
        className={
          show ? 'notificaton_feed-delecon' : 'notificaton_feed-none'
        }
      >
        <div className="notificaton_feed-dele">
          <h1>Are you sure?</h1>
          <p>
            Are you sure you want to empty your notifications. You'll lose
            access to them
          </p>
          <button className="notificaton_feed-cancel">Cancel</button>
          <button className="notificaton_feed-empty">Empty now</button>
        </div>
      </div>
    );
}
// DeleteNotification.prototype = {
//     show: prototype.boolean.isRequired
// };
