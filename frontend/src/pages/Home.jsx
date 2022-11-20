import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
            <Link to="/dashboard">
              View more
            </Link>
          </div>
        </div>
      </header>

      <div className="landing_sections_wrapper">
        <section
          id="landing_locations"
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
          }}
        >
          <div className="landing_locations_header">
            <h3 className="landing_header_md">Popular locations</h3>
            <h6>upated a minute ago</h6>
          </div>
          <p>Weather reports of some popular locations in Nigeria</p>
          <div ref={slider} className="landing_locations_container">
            <PopularLocation
              forecast="Expect rain and scattered thunderstorms by 12:00pm."
              state="CLOUDY"
              location="Port Harcourt, Nigeria"
            />
            <PopularLocation
              forecast="Expect Cloudy skies all through the Day."
              state="CLOUDY"
              location="Lagos, Nigeria"
            />
            <PopularLocation
              forecast="Expect warm Sun and light drizzle through the night."
              state="RAINY"
              location="Kaduna, Nigeria"
            />
          </div>
          <div className="landing_scroll_indicator">
            <div style={{ backgroundColor: curr === 0 ? 'var(--primary-color)' : '' }}>{' '}</div>
            <div style={{ backgroundColor: curr === 1 ? 'var(--primary-color)' : '' }}>{' '}</div>
            <div style={{ backgroundColor: curr === 2 ? 'var(--primary-color)' : '' }}>{' '}</div>
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
                  Weathery analyzes the weather for you in order to provide you with a
                  self-explanatory forecast,
                  so you never have to worry about the weather and can have a more
                  smooth experience.
                </p>
              </div>
              <div
                className="landing_ill_container"
                style={{
                  '--ill-bg': '#D1FADF',
                }}
              >
                <p>Features</p>
                <h3>Add multiple locations</h3>
                <p>
                  What could possibly be better than not having to worry about the weather
                  where you are right now? What matters is staying informed about
                  the weather in other places!
                  In order to successfully arrange your daily movement,
                  add and delete several destinations. Use weathery app now!
                </p>
                <Link to="/signup" className="landing_link_button">
                  Get started
                </Link>
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
                <h3>Find out your city&apos;s forecast!</h3>
                <p>
                  Are you curious to discover the weather predictions for the upcoming few or
                  even the entire day? You don&apos;t have to pay for the straightforward,
                  uncomplicated capabilities that Weathery offers to convey
                  your everyday weather condition!
                </p>
                <Link to="/signup" className="landing_link_button">
                  Get started
                </Link>
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
