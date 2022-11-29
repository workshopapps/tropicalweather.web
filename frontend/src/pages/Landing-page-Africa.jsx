import React, { useRef, useState, useEffect } from "react";
// import { Link } from 'react-router-dom';
import Locations from "./Locations";
import "../styles/LandingpageAfrica.css";
import AppleIcon from "../FaqAssets/app-store.png";
import PlaystoreIcon from "../FaqAssets/google-play.png";
import Appinterface from "../FaqAssets/Appinterface1.jpg";

import Globalization from "../FaqAssets/Globalization.png";

export default function Home() {
  const slider = useRef(null);
  const [curr, setCurr] = useState(0);

  useEffect(() => {
    slider.current.addEventListener("scroll", () => {
      let { width } = window.getComputedStyle(slider.current);
      width = width.substring(0, width.length - 2);
      const scrollPos = slider.current.scrollLeft;
      const widthNum = Math.floor(Number(width));
      setCurr(Math.floor(scrollPos / widthNum));
    });
  }, []);

  return (
    <div id="home">
      <header className="landing__header">
        <div className="landing__header-content--container">
          <p className="landing_header_message">
            Accurate Weather Forecast for Tropical Regions
          </p>
          <div className="landing__header--warning">
            <p>Easy check for weather conditions in Africa</p>
          </div>
          <button type="button">Get App</button>
        </div>
      </header>
      <div className="content">
        <div className="landing_sections_wrapper">
          <section
            id="landing_locations"
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "40px",
            }}
          >
            <div className="landing_locations_header">
              <h3 className="landing_header_md">Popular Locations</h3>
              <h6>Updated a minute ago</h6>
            </div>
            <div ref={slider} className="landing_locations_container">
              <Locations
                forecast="Expect cloudy skies all through the day."
                state="Cloudy"
                location="Nairobi, Kenya"
              />
              <Locations
                forecast="Expect rain and scattered thunderstorms by 4:00pm."
                state="Rainy"
                location="Addis Ababa, Ethiopia"
              />

              <Locations
                forecast="Expect warm sun and light throughout the day."
                state="Sunny"
                location="Lagos, Nigeria"
              />
            </div>
            <div className="landing_scroll_indicator">
              <div
                style={{
                  backgroundColor: curr === 0 ? "#ef6820" : "",
                }}
              >
                {" "}
              </div>
              <div
                style={{
                  backgroundColor: curr === 1 ? "#ef6820" : "",
                }}
              >
                {" "}
              </div>
              <div
                style={{
                  backgroundColor: curr === 2 ? "#ef6820" : "",
                }}
              >
                {" "}
              </div>
            </div>
          </section>

          <section className="landing_features_and_globe">
            <div className="landing_features_and_globe">
              <div className="landing_globe">
                <div className="landing_showcase">
                  <h3>Rain, Sun, Dust, Humidity</h3>
                  <p>
                    Weathery provides weather forecasts for up to a week in
                    advance so you can plan your activities in advance. Our app
                    functions to predict the rain, sun, dust, and humidity in
                    your area. With these, you know what to wear before going
                    out and also plan your week
                  </p>
                </div>
                <div className="landing__features--container">
                  <h3 className="landing__features--title">
                    Changing Climates
                  </h3>
                  <p className="landing__features--description">
                    Have you ever been out for 5 minutes to grab a cup of
                    coffee, and then it starts to rain hard? You may have
                    noticed how unpredictable tropical weather is. With
                    Weathery, you can easily predict such weather changes. You
                    do not even have to pay to access its features.
                  </p>
                  <a href="/" className="landing__feature--link">
                    Get started
                  </a>
                  <div className="landing__feature--img">
                    {/* style={{ width: '100%', paddingTop: '24px' }} */}
                    <img
                      src={Globalization}
                      alt=""
                      className="landing__feature--img--img"
                      // style={{
                      //   marginInline: 'auto',
                      //   width: '80%',
                      // }}
                    />
                  </div>
                </div>
              </div>

              <div className="landing_globe landing_globe2">
                <img
                  src={Appinterface}
                  alt="App interface"
                  className="landing_globe--app"
                />

                {/* <div className="landing__features--container2">
                <p id="features">Features</p>
                <h3 className="landing__features--title">
                  Find out your city&apos;s forecast!
                </h3>
                <p className="landing__features--description">
                  Are you curious to discover the weather predictions for the
                  upcoming few or even the entire day? You don&apos;t have to
                  pay for the straightforward, uncomplicated capabilities that
                  Weathery offers to convey your everyday weather condition!
                </p>
                <a href="/signup" className="landing__feature--link">
                  Get started
                </a>
                <div className="landing__feature--img"
                // style={{ width: '100%', paddingTop: '24px' }}
                >
                  <img 
                    src={Fall}
                    alt=""
                    // style={{
                    //   marginInline: 'auto',
                    //   width: '80%',
                    // }}
                  />
                </div>
              </div> */}
              </div>
            </div>
          </section>
          <section className="landing__mobile--app">
            <div className="landing__mobile--app--text-container">
              <p className="landing__mobile--app--heading">Go Mobile</p>
              <p className="landing__mobile--app--sub-heading-text">
                Get our free and convenient weather assistant on your phone
              </p>
              <p className="landing__mobile--app--heading--description">
                Experience the flexibility and ease of using our weather app on
                the go!
              </p>
              <div className="options-container">
                <img src={AppleIcon} className="apple-icon" alt="Apple icon" />
                <img
                  src={PlaystoreIcon}
                  className="playstore-icon"
                  alt="Playstore icon"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
