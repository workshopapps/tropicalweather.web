import React from 'react';
import Icon1 from './img/Icon1.png';
import Icon2 from './img/Icon2.png';
import Icon4 from './img/Icon4.png';

function BoxMage() {
  return (
    <body>
      <div className="box-mage_feature">
        <div className="box_feature">
          <img src={Icon1} alt="" />
          <h4> Multilingual</h4>
          <p>
            {' '}
            Available in different languages
            for all type of users.
          </p>
        </div>
        <div className="box_feature">
          <img src={Icon2} alt="" />
          <h4>Responsive </h4>
          <p>
            {' '}
            The Weathery app is designed to be responsive
            <br />
            {' '}
            on
            every device to provide you
            <br />
            {' '}
            with a good user experience.
            <br />
            {' '}
            can fit nicely in the main content area or a sidebar,
            <br />
            {' '}
            and automatically respond to fit in all devices
          </p>
        </div>
        <div className="box_feature">
          <img src={Icon4} alt="" />
          <h4>Customizable </h4>
          <p>
            {' '}
            We want you to take ownership of the app, and
            <br />
            {' '}
            as
            such, we made a lot of things customizable,
            <br />
            {' '}
            including
            the colors, forecast days, and labels.
          </p>
        </div>
      </div>
    </body>
  );
}

export default BoxMage;
