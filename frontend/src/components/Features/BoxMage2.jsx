import React from 'react';
import Icon1 from './img/Icon1.png';
import Icon2 from './img/Icon2.png';
import Icon4 from './img/Icon4.png';

function BoxMage2() {
  return (
    <body>
      <div className="boxes_feature">
        <div className="h1_feature">
          <h1> Explore more features </h1>
        </div>
        <div className="box-mage_feature">
          <div className="box1_feature">
            <img src={Icon1} alt="" />
            <h4> Update on weather threats</h4>
            <p>
              {' '}
              Weathery ensures your safety
              <br />
              {' '}
              by
              keeping up to date on potential
              <br />
              {' '}
              hazardous
              weather threat.
            </p>
          </div>
          <div className="box_feature">
            <img src={Icon2} alt="" />
            <h4>Accurate weather prediction </h4>
            <p>
              {' '}
              Weathery allows for the real-time
              <br />
              {' '}
              weather
              comment from app users
              <br />
              {' '}
              in different location.
              Ensure you are closer to family and friends.
            </p>
          </div>
          <div className="box1_feature">
            <img src={Icon4} alt="" />
            <h4>
              Share weather news with
              <br />
              {' '}
              family and friends
              {' '}
            </h4>
            <p>
              {' '}
              With just a few clicks,
              <br />
              {' '}
              you can easily share the
              <br />
              weather information about your location.
            </p>
          </div>
        </div>

      </div>
    </body>

  );
}

export default BoxMage2;
