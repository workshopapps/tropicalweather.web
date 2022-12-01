/* eslint-disable react/no-unescaped-entities */
export default function NoNotificationFeed() {
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
         Nothing to see here When you receive weather updates, they'll appear
         here.
       </p>
     </div>
   </div>
 );
}
