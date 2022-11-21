import React from 'react';
import sun from './img/sun.png';
import rainy from './img/rainy.png';
import dot from './img/dot.png';
import spark from './img/spark.png';
import cloud from './img/cloud.png';

function Picture() {
  return (
    <body>
      <div className="Weather">
        <div className="cloud_place">
          <h1> Lagos, Nigeria</h1>
          <div className="cloud-feauture">
            <div className="box_div">
              <h4> Sunny</h4>
              <img src={sun} alt="" />
              <h4> Now</h4>
            </div>
            <div>
              <h4> Rain </h4>
              <img src={rainy} alt="" />
              <h4> 2:00PM</h4>
            </div>
            <div>
              <h4> Rain</h4>
              <img src={rainy} alt="" />
              <h4> 3:00PM</h4>
            </div>
            <div>
              <h4> Rain</h4>
              <img src={rainy} alt="" />
              <h4> 4:00PM</h4>
            </div>
            <div>
              <h4> Cloudy</h4>
              <img src={cloud} alt="" />
              <h4> 5:00PM</h4>
            </div>
            <div>
              <h4> Cloudy</h4>
              <img src={cloud} alt="" />
              <h4> 6:00PM</h4>
            </div>
            <div>
              <h4> Cloudy</h4>
              <img src={cloud} alt="" />
              <h4> 7:00PM</h4>
            </div>
            <div>
              <h4> Rain</h4>
              <img src={rainy} alt="" />
              <h4> 8:00PM</h4>
            </div>
            <div>
              <h4> Rain</h4>
              <img src={rainy} alt="" />
              <h4> 9:00PM</h4>
            </div>
            <div>
              <h4> Rain</h4>
              <img src={rainy} alt="" />
              <h4> 10:00PM</h4>
            </div>
          </div>
          <div>
            <div className="wrapper_feature">
              <div className="background_feature">
                <div className="small_box_feature">
                  <ul>
                    <li> Today • 9:41am</li>
                    <img src={dot} alt="" />
                  </ul>
                  <img src={spark} alt="" />
                  <h1>
                    {' '}
                    Expect rain and scattered
                    <br />
                    {' '}
                    thunderstorms by
                    <br />
                    {' '}
                    12:00pm.
                    {' '}
                  </h1>
                </div>
              </div>
              <div className="cast_feature">
                <h3> 3-day forecast</h3>
                <h4> Tomorrow</h4>
                <hr />
                <h5> SUNNY</h5>
                <p>
                  {' '}
                  Expect rain and scattered
                  <br />
                  {' '}
                  thunderstorms by 12:00pm.
                  {' '}
                </p>
                <span> View more info →</span>
                <h3> 16th Nov, 2022</h3>
                <hr />
                <h5>SUNNY</h5>
                <p>
                  {' '}
                  Expect rain and scattered
                  <br />
                  {' '}
                  thunderstorms by 12:00pm.
                  {' '}
                </p>
                <span> View more info →</span>
                <h3> 17th Nov, 2022</h3>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}

export default Picture;
