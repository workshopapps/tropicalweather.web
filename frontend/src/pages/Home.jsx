import React, { useRef, useState, useEffect } from 'react';
import PopularLocation from '../components/PopularLocation';
import '../styles/Home.css';

export default function Home() {
  const slider = useRef(null);
  const [curr, setCurr] = useState(0);

  useEffect(() => {
    slider.current.addEventListener('scroll', () => {
      let { width } = window.getComputedStyle(slider.current);
      width = width.substring(0, width.length - 2);
      const scrollPos = slider.current.scrollLeft;
      const widthNum = Math.floor(Number(width));
      setCurr(Math.floor(scrollPos / widthNum));
    });
  }, []);

  return (

    <div id="home">
      <header className="landing_header">
        <div className="landing_sections_wrapper">
          <div className="landing_header_content_container">
            <div className="landing_weather_brief">
              <img src="/Home/outline.svg" alt="" />
              <p>clear</p>
            </div>
            <h1 className="landing_header_message">Expect rain and scattered thunderstorms by 12:00pm.</h1>
            <div className="landing_warning">
              <img src="/Home/Icon.svg" alt="" />
              <p>There is a high risk of flooding in your area</p>
            </div>
            <button type="button">
              View more
            </button>
          </div>
        </div>
      </header>

      <div className="landing_sections_wrapper">
        <section
          id="landing_locations"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
          }}
        >
          <div className="landing_locations_header">
            <h3 className="landing_header_md">Popular locations</h3>
            <h6>upated a minute ago</h6>
          </div>
          <div>
            <div ref={slider} className="landing_locations_container">
              <PopularLocation
                forecast="Expect rain and scattered thunderstorms by 12:00pm."
                state="SUNNY"
                location="Port Harcourt, Nigeria"
              />
              <PopularLocation
                forecast="Expect rain and scattered thunderstorms by 12:00pm."
                state="SUNNY"
                location="Port Harcourt, Nigeria"
              />
              <PopularLocation
                forecast="Expect rain and scattered thunderstorms by 12:00pm."
                state="SUNNY"
                location="Port Harcourt, Nigeria"
              />
            </div>
            <div className="landing_scroll_indicator">
              <div style={{ backgroundColor: curr === 0 ? 'var(--primary-color)' : '' }}>{' '}</div>
              <div style={{ backgroundColor: curr === 1 ? 'var(--primary-color)' : '' }}>{' '}</div>
              <div style={{ backgroundColor: curr === 2 ? 'var(--primary-color)' : '' }}>{' '}</div>
            </div>
          </div>
        </section>

        <section
          id="landing_features_and_globe"
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
          }}
        >
          <div className="landing_features_and_globe">
            <div className="landing_globe">
              <div className="landing_showcase">
                <h3 className="landing_header_md">
                  Never Worry about Figures and Statistics
                </h3>
                <p>
                  Weathery analyses them for you to give you
                  a self explanatory forecast so you never
                  have to worry about the weather and you can
                  have a more seamless experience
                </p>
              </div>
              <div
                className="landing_ill_container"
                style={{
                  '--ill-bg': '#D1FADF',
                }}
              >
                <p>Features</p>
                <h3>Add  Multiple Locations</h3>
                <p>
                  What’s even better than not having to worry about the
                  weather in your current location?
                  Being up to date about the weather condition in
                  other Locations is what! Add and delete multiple
                  locations to plan your daily movement effectively
                </p>
                <button type="button" className="landing_link_button">
                  Get started
                </button>
                <div style={{ width: '100%', paddingTop: '24px' }}>
                  <img
                    src="/Home/globe.png"
                    alt=""
                    style={{
                      marginInline: 'auto',
                      width: '80%',
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="landing_features">
              <div
                className="landing_ill_container"
                style={{
                  '--ill-bg': '#FEF2F2',
                }}
              >
                <p>Features</p>
                <h3>Get the Forecast for your city!</h3>
                <p>
                  Would you like to know how the weather would be in thee next few
                  hours or even through out the day! Weathery offers seamless and
                  understandable features that communicates the daily weather status
                  of its Users free of Costs!
                </p>
                <button type="button" className="landing_link_button">
                  Get started
                </button>
                <div style={{ width: '100%', paddingTop: '24px' }}>
                  <img
                    src="/Home/fall.png"
                    alt=""
                    style={{
                      marginInline: 'auto',
                      width: '80%',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="landing_download_app">
          <div className="landing_download_container">
            <p>Go Mobile</p>
            <h3 className="landing_header_md">Use the free Weathery app</h3>
            <p>
              Explore the flexibility and ease that comes with using
              our Weatherly app on the go!
            </p>
            <div>
              <img src="/app-store.png" alt="" />
              <img src="/google-play.png" alt="" />
            </div>
          </div>
          <div className="landing_phones_wrapper">
            <div className="landing_phones_container">
              <img src="/Home/phones.png" alt="" />
              <img src="/Home/phones.png" alt="" />
              <img src="/Home/phones.png" alt="" />
              <img src="/Home/phones.png" alt="" />
            </div>
          </div>

        </section>
      </div>
    </div>
  );
}
