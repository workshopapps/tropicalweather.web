import React from 'react';
import Icon5 from './img/Icon5.png';

function Frequently() {
  return (
    <body>
      <div className="frequent_feature">
        <div className="break_down_feature">
          <h1> Frequently Asked Questions</h1>

          <h2>How do i add, save or delete a location?</h2>
          <p>
            Weathery keeps tracks of your last five locations searches.
            <br />
            {' '}
            click the drop-down arrow to the top
            <br />
            right side of the page,
            <br />
            {' '}
            and you should see your most recently viewed
            <br />
            {' '}
            5 locations.
            When  you search for additional location,
            <br />
            {' '}
            they will be replaced by new ones.
            However, clearing your
            <br />
            cookies will removes all saved location.
          </p>

          <h2>What are you doing with my location data?</h2>
          <p>
            Weathery products are designed to use precise location data
            <br />
            {' '}
            to provide users with the functionality they need.
            <br />
            {' '}
            Such functionalities may include severe weather alerts
            <br />
            {' '}
            or location-specific forecasts.
            To protect the privacy of users,
            <br />
            {' '}
            we have reduced location data precision.
            We have taken steps
            <br />
            {' '}
            to ensure that the location data is
            <br />
            {' '}
            only saved or utilized to support the precise functions
            <br />
            {' '}
            that you use in your application.
            {' '}
          </p>

          <h2>How do I manage my notifiction?</h2>
          <p>
            {' '}
            To set up the location you wish to
            <br />
            receive  a notification for swipe, to access
            <br />
            {' '}
            the location menu.
            {' '}
          </p>
          <ol>
            <li>
              {' '}
              To set up the locaton you wish to
              <br />
              {' '}
              receive a  notification for, swipe to
              <br />
              access the location menu
            </li>
            <li>
              {' '}
              Select manage notification at the bottom of the screen
              <li>
                {' '}
                Then tap the circle beside the location
                <br />
                {' '}
                or locations that you wish to
                <br />
                {' '}
                receive notification for
              </li>
            </li>
            <li> A check mark will then appear in the circle to confirm your request </li>
          </ol>
          <h2> where is the weather news section?</h2>
          <p>
            You can find the weather news section at the top bar
            <br />
            {' '}
            of the page, along with the features, careers, about, and faq.
          </p>

          <h2>i deleted your app, what information do you still have about me?</h2>
          <p>
            Although we may retain
            <br />
            {' '}
            certain information as needed to comply
            <br />
            {' '}
            with applicable laws,
            no data is stored outside
            <br />
            {' '}
            of the limited amount needed for the app to function.
            <br />
            In addition to this, certain data may be
            {' '}
            <br />
            {' '}
            saved on backup files for financial, legal,
            or technical reasons.
            {' '}
            <br />
            See our
            {' '}
            <i>privacy policy</i>
            {' '}
            for more imformation
          </p>
        </div>
        <div className="Icon_feature">
          <img src={Icon5} alt="" />
          <img src={Icon5} alt="" />
          <img src={Icon5} alt="" />
          <img src={Icon5} alt="" />
          <img src={Icon5} alt="" />
          <img src={Icon5} alt="" />
        </div>
      </div>
    </body>
  );
}

export default Frequently;
