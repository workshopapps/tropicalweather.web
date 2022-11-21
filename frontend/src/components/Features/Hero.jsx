import React from 'react';
import heroToolbar from './img/heroToolbar.png';
import heroimg from './img/heroimg.png';

function Hero() {
  return (
    <body>
      <div className="hero_feature">
        <div className="hero_writeup_feature">
          <h3 className="feature_line"> FEATURES</h3>
          <h1>
            {' '}
            Explore features
            <br />
            {' '}
            of Weatherly
            {' '}
          </h1>
          <p>
            Stay informed about weather events and
            <br />
            {' '}
            protected with Weathery forecasts in real-time.
          </p>
          <div className="button_">
            <button className="button_feature" type="button"> Get started</button>
            <button type="button"> View all feature</button>
          </div>
        </div>
        <div className="feature_img">
          <img src={heroToolbar} alt="" />
          <img src={heroimg} alt="" />
        </div>
      </div>
    </body>
  );
}

export default Hero;
