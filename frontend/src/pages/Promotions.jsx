import { BiSearch } from 'react-icons/bi';
import '../styles/Promotions.css';
import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PopularLocation from '../components/PopularLocation';
import '../styles/Home.css';

function Promotions() {
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
    <>
      <div className="first_section">
        <div className="first_section_left">
          <header className="header">
            <h1>Get accurate weather reports in a simplified manner!</h1>
          </header>
          <div className="header_text">
            Tired of having to relate to too many technicalities to understand
            weather forecasts? Use weathery!
          </div>
          <div className="search">
            <BiSearch className="search_logo" />
            <input type="text" placeholder="Choose a Location" />
            <button type="submit">Search</button>
          </div>
        </div>
        <div className="img">
          <img src="promotions.png" alt="promotion" />
        </div>
      </div>
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
          <p>Weather reports of some popular locations in South America</p>
          <div ref={slider} className="landing_locations_container">
            <PopularLocation
              forecast="Expect rain and scattered thunderstorms by noon."
              state="Rainy"
              location="Brazil, South America"
            />
            <PopularLocation
              forecast="Expect sunshine all through the day."
              state="SUNNY"
              location="Argentina, South America "
            />
            <PopularLocation
              forecast="Expect rain without thunderstorms by 8:00 am."
              state="RAINY"
              location="Columbia, South America"
            />
          </div>
          <div className="landing_scroll_indicator">
            <div
              style={{
                backgroundColor: curr === 0 ? 'var(--primary-color)' : ' ',
              }}
            >
              {' '}
            </div>
            <div
              style={{
                backgroundColor: curr === 1 ? 'var(--primary-color)' : '',
              }}
            >
              {' '}
            </div>
            <div
              style={{
                backgroundColor: curr === 2 ? 'var(--primary-color)' : '',
              }}
            >
              {' '}
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
                  Weathery helps to analyze your Weather forecast in South America and
                  untie you from the realm of weather imagination.
                  Weathery analyzes the weather for you in order to provide you
                  with a self-explanatory forecast, so you never have to worry
                  about the weather and can have a more smooth experience.
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
                  Have you ever wondered about not being worried about the weather in your
                  current locations in South America? Seems good! But what matters
                  is also staying informed about the weather in other places or locations!
                  With weathery, you can add and delete multiple locations to plan your daily
                  movement effectively. It is free
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
                <h3>Get your forecast for your city!</h3>
                <p>
                  At Weathery, we ensure you have a safe weather forecast every
                  day without compromise Guess what? Would you like to know how
                  the weather would be in South America and its environs, be it in the
                  next second, minutes, the next few hours, or perhaps, throughout the day?
                  Weathery provides you with seamless and accurate weather forecasts that
                  communicate the daily weather status of its user free of cost. Viola!

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
              Explore the flexibility and ease that comes with using our
              Weatherly app on the go!
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
    </>
  );
}

export default Promotions;
