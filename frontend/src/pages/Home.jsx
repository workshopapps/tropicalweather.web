import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import PopularLocation from '../components/Home/PopularLocation';
import Faq from '../components/Home/Faq';
import HourlyUpdate from '../components/Home/HoulyUpdate';
import Risk from '../components/Home/Risk';
import '../styles/Home.css';
import NearCity from '../components/Home/NearCity';

export default function Home() {
  const slider = useRef(null);
  const [curr, setCurr] = useState(0);
  const coord = useRef({ lon: 0, lat: 0 });

  useEffect(() => {
    slider.current.addEventListener('scroll', () => {
      let { width } = window.getComputedStyle(slider.current);
      width = width.substring(0, width.length - 2);
      const scrollPos = slider.current.scrollLeft;
      const widthNum = Math.floor(Number(width));
      setCurr(Math.floor(scrollPos / widthNum));
    });
  }, []);

  useEffect(() => {
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          coord.current = {
            lon: position.coords.longitude,
            lat: position.coords.latitude,
          };
        });
      }
    }
    getLocation();
  }, []);

  return (
    <div id="home">
      <header className="landing_header">
        <div className="landing_sections_wrapper">
          <div className="flex items-center gap-4">
            <div className="flex flex-col lg:mt-[-80px] items-center text-center md:items-start md:text-left gap-[14px]">
              <h1 className="text-[60px] leading-[88px]">
                Weather forecasts in tropical regions
              </h1>
              <p className="text-[30px] font-[400]">
                Plan your outdoor event or get your umberella
              </p>
              <div className="flex flex-col mt-[20px] gap-4 min-[350px]:flex-row ">
                <Link
                  to="/dashboard"
                  className="landing_hero_link rounded-sm border-solid border border-[#ffff]"
                >
                  View more
                </Link>
                <a
                  href="https://appetize.io/app/lca2f4kgwzqiveyfwvjqlmplsq?device=pixel4&osVersion=11.0&scale=75"
                  target="_BLANK"
                  rel="noreferrer"
                  className="landing_hero_link bg-[var(--l-primary-color)] border-none rounded-sm flex items-center justify-center gap-2"
                >
                  Download
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 3.97C7.59 3.97 3.97 7.59 3.97 12C3.97 16.41 7.59 20.03 12 20.03C16.41 20.03 20.03 16.41 20.03 12C20.03 7.59 16.41 3.97 12 3.97ZM12 2C17.54 2 22 6.46 22 12C22 17.54 17.54 22 12 22C6.46 22 2 17.54 2 12C2 6.46 6.46 2 12 2ZM13.88 11.53L16 13.64V8H10.36L12.47 10.12L7.5 15.1L8.9 16.5"
                      fill="white"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div className="hidden w-4/6 md:block">
              <img src="/Home/hero-phone.png" alt="" />
            </div>
          </div>
        </div>
      </header>

      <div className="landing_sections_wrapper">
        <section className="w-full flex flex-col gap-20 py-[96px]">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="landing_header_md">Weather Updates</h3>
              <p className="text-[#565560]">Update a minute ago</p>
            </div>
            <button type="button" className="text-[#565560]">
              {' '}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
            <div className="rounded-lg shadow-md px-[10px] min-[350px]:px-[40px] py-4">
              <h5 className="mb-[32px] text-[20px] font-bold">
                Hourly Updates
              </h5>
              <div className="flex flex-col gap-[32px]">
                <HourlyUpdate
                  time="09:00 am"
                  day="Today, Thursday"
                  forecast="Rainy"
                />
                <HourlyUpdate
                  time="10:00 am"
                  day="Today, Thursday"
                  forecast="Rainy"
                />
                <HourlyUpdate
                  time="11:00 am"
                  day="Today, Thursday"
                  forecast="Cloudy"
                />
                <HourlyUpdate
                  time="12:00 pm"
                  day="Today, Thursday"
                  forecast="Clear"
                />
                <HourlyUpdate
                  time="01:00 pm"
                  day="Today, Thursday"
                  forecast="Sunny"
                />
              </div>
            </div>
            <div className="rounded-lg shadow-md px-[10px] min-[350px]:px-[40px] py-4">
              <h5 className="mb-[32px] text-[20px] font-bold">Risk</h5>
              <div className="flex flex-col gap-[32px]">
                <Risk
                  time="from 3:00pm to 6:00pm"
                  chances="HIGH"
                  risk="Flood"
                  day="Today, 11/24/2022"
                />
                <Risk
                  time="from 3:00pm to 6:00pm"
                  chances="LOW"
                  risk="Dust levels"
                  day="Today, 11/24/2022"
                />
                <Risk
                  time="from 3:00pm to 6:00pm"
                  chances="MID"
                  risk="Fog"
                  day="Today, 11/24/2022"
                />
                <Risk
                  time="from 3:00pm to 6:00pm"
                  chances="LOW"
                  risk="Sun burn"
                  day="Today, 11/24/2022"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      <section
        id="landing_locations"
        className="w-full flex flex-col gap-[40px] bg-[#FFF3E7] py-[96px]"
      >
        <div className="landing_sections_wrapper flex flex-col gap-[56px]">
          <div className="w-full flex flex-col gap-[56px]">
            <div className="landing_locations_header">
              <h3 className="landing_header_md">Popular locations</h3>
              <h6>upated a minute ago</h6>
            </div>
            <div
              ref={slider}
              className="landing_locations_container max-[768px]:bg-[white] max-[768px]:p-2"
            >
              <PopularLocation location="Port Harcourt, Nigeria" />
              <PopularLocation location="Lagos, Nigeria" />
              <PopularLocation location="Abuja, Nigeria" />
            </div>
            <div className="landing_scroll_indicator">
              <div
                style={{
                  backgroundColor: curr === 0 ? 'var(--l-primary-color)' : '',
                }}
              >
                {' '}
              </div>
              <div
                style={{
                  backgroundColor: curr === 1 ? 'var(--l-primary-color)' : '',
                }}
              >
                {' '}
              </div>
              <div
                style={{
                  backgroundColor: curr === 2 ? 'var(--l-primary-color)' : '',
                }}
              >
                {' '}
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-[56px]">
            <h4 className="text-[20px] font-bold">Cities near you</h4>
            <div className="w-full grid grid-cols-2 md:grid-cols-3">
              <NearCity city="Aba" state="Nigeria" />
              <NearCity city="Ile-Ife" state="Osun state" />
              <NearCity city="Onitsha" state="Lokoja" />
              <NearCity city="Oyo" state="Nigeria" />
              <NearCity city="Ibadan" state="Oyo State" />
              <NearCity city="Onitsha" state="Lokoja" />
            </div>
          </div>
        </div>
      </section>
      <div className="landing_sections_wrapper">
        <section
          id="landing_features_and_globe"
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
          }}
          className="py-[96px]"
        >
          <div className="landing_features_and_globe">
            <div className="landing_globe">
              <div className="landing_showcase">
                <h3 className="landing_header_md">
                  Never Worry about Figures and Statistics
                </h3>
                <p>
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
                  What could possibly be better than not having to worry about
                  the weather where you are right now? What matters is staying
                  informed about the weather in other places! In order to
                  successfully arrange your daily movement, add and delete
                  several destinations. Use weathery app now!
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
                  Are you curious to discover the weather predictions for the
                  upcoming few or even the entire day? You don&apos;t have to
                  pay for the straightforward, uncomplicated capabilities that
                  Weathery offers to convey your everyday weather condition!
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
        <FaqSection />
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
    </div>
  );
}

function FaqSection() {
  const [openAll, toggleOpenAll] = useState(false);
  return (
    <section className="flex flex-col gap-8 w-full pb-[96px]">
      <div className="flex items-center justify-between">
        <h3 className="landing_header_md">Explore FAQs</h3>
        <button
          type="button"
          className="flex items-center gap-2 text-[#565560]"
          onClick={() => toggleOpenAll((prv) => !prv)}
        >
          View full
          {openAll ? <FaAngleUp /> : <FaAngleDown />}
        </button>
      </div>
      <div className="sm:p-3 flex flex-col gap-8">
        <Faq
          position={1}
          question="1. HOW DO I ADD, SAVE OR DELETE A LOCATION?"
          answer=" Weathery keeps track of your last five locations' searches. Click
          the drop-down arrow to the top right side of the page, and you should
          see your most recently viewed 5 locations. When you search for
          additional locations, they will be replaced by new ones. However,
          clearing your local storage will remove all saved locations."
          open={openAll}
        />
        <Faq
          question="2. WHAT ARE YOU DOING WITH MY LOCATION DATA?"
          answer="Weathery only uses your location data to give you up to date weather reports and nothing else!"
          open={openAll}
        />
        <Faq
          question="3. HOW DO I VIEW THE RADAR MAP?"
          answer="Weathery keeps track of your last five locations' searches. Click
          the drop-down arrow to the top right side of the page, and you should
          see your most recently viewed 5 locations. When you search for
          additional locations, they will be replaced by new ones. However,
          clearing your cookies will remove all saved locations."
          open={openAll}
        />
        <Faq
          question="4. HOW DO I MANAGE THE NOTIFICATION?"
          answer="Weathery keeps track of your last five locations' searches. Click
          the drop-down arrow to the top right side of the page, and you should
          see your most recently viewed 5 locations. When you search for
          additional locations, they will be replaced by new ones. However,
          clearing your cookies will remove all saved locations."
          open={openAll}
        />
      </div>
    </section>
  );
}
