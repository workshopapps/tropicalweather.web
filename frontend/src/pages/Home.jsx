import React, { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
import PopularLocation from '../components/Home/PopularLocation';
// import Faqs from '../components/Home/Faqs';
import Faq from '../components/Home/Faq';
import HourlyUpdate from '../components/Home/HoulyUpdate';
import Risk from '../components/Home/Risk';
import '../styles/Home.css';
import NearCity from '../components/Home/NearCity';
import MobileAdvert from '../components/MobileAdvert';
// import Share from '../components/share/Share_popup';

export default function Home() {
  const APIURL = 'https://api.tropicalweather.hng.tech';
  const [userLocation, setUserLocation] = useState(null);
  const [immediateWeather, setImmediateWeather] = useState(null);
  const [weatherForecast, setWeatherForecast] = useState([]);
  const slider = useRef(null);
  const [curr, setCurr] = useState(0);
  const { t } = useTranslation(['home']);

  const coord = useRef({ longitude: 0, latitude: 0 });
  const getCurrentLocationFromCoords = async () => {
    const { latitude, longitude } = coord.current;
    const response = await fetch(
      `${APIURL}/location?lat=${latitude}&lon=${longitude}`
    );
    const data = await response.json();
    const location = `${data.city}, ${data.state}`;
    setUserLocation(location);
  };
  const getImmediateWeather = async () => {
    const { latitude, longitude } = coord.current;
    const response = await fetch(
      `${APIURL}/weather/forecasts/immediate?lat=${latitude}&lng=${longitude}`
    );
    const data = await response.json();
    setImmediateWeather(data);
  };
  const getWeatherForecast = async () => {
    const { latitude, longitude } = coord.current;
    const response = await fetch(
      `${APIURL}/weather/forecasts?lat=${latitude}&lon=${longitude}`
    );
    const data = await response.json();
    setWeatherForecast(data);
  };
  const navigate = useNavigate();
   const gotoDashboard = (city) => {
     navigate(`/dashboard?city=${city}`);
   };
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
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
          };
        });
      }
    }
    getLocation();
    getCurrentLocationFromCoords();
    getImmediateWeather();
    getWeatherForecast();
  }, [userLocation]);

  return (
    <div id="home">
      <header className="landing_header">
        <div className="landing_sections_wrapper">
          {userLocation !== 'undefined, undefined' && (
            <p className="homepage-location">{userLocation}</p>
          )}
          {immediateWeather !== null && immediateWeather.main === 'Clouds' && (
            <>
              <img src="./assets/NotificationFeedList/CLOUDY.svg" alt="" />
              <p>
                Today
                {immediateWeather.time}
              </p>
              <p>{immediateWeather.description}</p>
            </>
          )}
          <div className="homepg-weatherfc">
            <ul>
              {weatherForecast !== null &&
                Array.from(new Set(weatherForecast.map((a) => a.time)))
                  .map((time) => weatherForecast.find((a) => a.time === time))
                  .map((forecast) => (
                    <li key={forecast.time}>
                      {forecast.main === 'Clouds' && (
                        <>
                          <p>{forecast.time}</p>
                          <img
                            src="./assets/NotificationFeedList/CLOUDY.svg"
                            alt=""
                          />
                          <p>{forecast.main}</p>
                        </>
                      )}
                      {forecast.main === 'Rain' && (
                        <>
                          <p>{forecast.time}</p>
                          <img
                            src="./assets/NotificationFeedList/icon.svg"
                            alt=""
                          />
                          <p>{forecast.main}</p>
                        </>
                      )}
                    </li>
                  ))}
            </ul>
          </div>
        </div>
      </header>
      <div className="homepg-worldforecast">
        <h2>World Forecast</h2>
        <ul className="homepg-worldul">
          <div className="homepg-worldone">
            <li className="homepg-poplis">
              <div className="homepg-popflex">
                <img src="/Home/Rectanglefour.svg" alt="" />
                <span> AUS AUSTRALIA</span>
              </div>
              {' '}
              <button
                type="button"
                aria-label="go to dashboard"
                onClick={() => gotoDashboard('Canberra, Ghana')}
                className="homepg-dash"
              />
            </li>
            <li className="homepg-poplis">
              <div className="homepg-popflex">
                <img src="/Home/Rectangle 3.svg" alt="" />
                <span>SWE SWEDEN </span>
                {' '}
              </div>

              <button
                type="button"
                aria-label="go to dashboard"
                onClick={() => gotoDashboard('Stockholm, Sweden')}
                className="homepg-dash"
              />
            </li>
            <li className="homepg-poplis">
              <div className="homepg-popflex">
                <img src="/Home/Rectangle 5.svg" alt="" />
                <span> NLD NETEHERLANDS</span>
              </div>

              <button
                type="button"
                aria-label="go to dashboard"
                onClick={() => gotoDashboard('Amsterdam, NETEHERLANDS')}
                className="homepg-dash"
              />
            </li>
            <li className="homepg-poplis">
              <div className="homepg-popflex">
                <img src="/Home/Rectangle 6.svg" alt="" />
                <span>GBR UNITED KINGDOM</span>
              </div>
              <button
                type="button"
                aria-label="go to dashboard"
                onClick={() => gotoDashboard('London, UNITED KINGDOM')}
                className="homepg-dash"
              />
            </li>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
            <div className="rounded-lg shadow-md px-[10px] min-[350px]:px-[40px] py-4">
              <h5 className="mb-[32px] text-[20px] font-bold">
                {t('hourlyupdates')}
              </h5>
              <div className="flex flex-col gap-[32px]">
                <HourlyUpdate
                  time="09:00 am"
                  day={t('todaythursday')}
                  forecast="Rainy"
                />
                <HourlyUpdate
                  time="10:00 am"
                  day={t('todaythursday')}
                  forecast="Rainy"
                />
                <HourlyUpdate
                  time="11:00 am"
                  day={t('todaythursday')}
                  forecast="Cloudy"
                />
                <HourlyUpdate
                  time="12:00 pm"
                  day={t('todaythursday')}
                  forecast="Clear"
                />
                <HourlyUpdate
                  time="01:00 pm"
                  day={t('todaythursday')}
                  forecast="Sunny"
                />
              </div>
            </div>
            <div className="rounded-lg shadow-md px-[10px] min-[350px]:px-[40px] py-4">
              <h5 className="mb-[32px] text-[20px] font-bold">{t('risk')}</h5>
              <div className="flex flex-col gap-[32px]">
                <Risk
                  time={`${t('from')} 3:00pm ${t('to')} 6:00pm`}
                  chances={t('high')}
                  risk="Flood"
                  day={`${t('rainy')}, 11/24/2022`}
                />
                <Risk
                  time={`${t('from')} 3:00pm ${t('to')} 6:00pm`}
                  chances={t('low')}
                  risk="Dust levels"
                  day={`${t('rainy')}, 11/24/2022`}
                />
                <Risk
                  time={`${t('from')} 3:00pm ${t('to')} 6:00pm`}
                  chances={t('mid')}
                  risk="Fog"
                  day={`${t('rainy')}, 11/24/2022`}
                />
                <Risk
                  time={`${t('from')} 3:00pm ${t('to')} 6:00pm`}
                  chances={t('low')}
                  risk="Sun burn"
                  day={`${t('rainy')}, 11/24/2022`}
                />
              </div>

              <div className="homepg-worldtwo">
                <li className="homepg-poplis">
                  <div className="homepg-popflex">
                    <img src="/Home/Rectangle 5 (1).svg" alt="" />
                    <span>IDN INDONESIA</span>
                  </div>
                  <button
                    type="button"
                    aria-label="go to dashboard"
                    onClick={() => gotoDashboard('Jakarta, INDONESIA')}
                    className="homepg-dash"
                  />
                </li>
                <li className="homepg-poplis">
                  <div className="homepg-popflex">
                    <img src="/Home/Rectangle 6 (1).svg" alt="" />
                    <span>JPN JAPAN</span>
                  </div>
                  <button
                    type="button"
                    aria-label="go to dashboard"
                    onClick={() => gotoDashboard('Tokoyo, Japan')}
                    className="homepg-dash"
                  />
                </li>
                <li className="homepg-poplis">
                  <div className="homepg-popflex">
                    <img src="/Home/Rectangle 7.svg" alt="" />
                    <span>CAN CANADA</span>
                  </div>
                  <button
                    type="button"
                    aria-label="go to dashboard"
                    onClick={() => gotoDashboard('Ottawa, CANADA')}
                    className="homepg-dash"
                  />
                </li>
                <li className="homepg-poplis">
                  <div className="homepg-popflex">
                    <img src="/Home/Rectangle 8.svg" alt="" />
                    <span>USA UNITED STATES</span>
                  </div>
                  <button
                    type="button"
                    aria-label="go to dashboard"
                    onClick={() => gotoDashboard('WashingtonDc, UNITED STATES')}
                    className="homepg-dash"
                  />
                </li>
              </div>
            </div>
          </div>
        </ul>
        <button type="button" className="homepg-explore" onClick={() => gotoDashboard('')}>
          Expore all location
        </button>
      </div>
      <section
        id="landing_locations"
        className="w-full flex flex-col gap-[40px] bg-[#FFF3E7] py-[96px]"
      >
        <div className="landing_sections_wrapper flex flex-col gap-[56px]">
          <div className="w-full flex flex-col gap-[56px]">
            <div className="landing_locations_header">
              <h3 className="landing_header_md">{t('popularlocations')}</h3>
              <h6>{t('updatedamin')}</h6>
            </div>
            <div
              ref={slider}
              className="landing_locations_container max-[768px]:p-2"
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
            <h4 className="text-[20px] font-bold">{t('citiesnearyou')}</h4>
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
                  {t('neverworryaboutfiguresheading')}
                </h3>
                <p>
                  {t('neverworryaboutfiguresbody')}
                </p>
              </div>
              <div
                className="landing_ill_container"
                style={{
                  '--ill-bg': '#D1FADF',
                }}
              >
                <p>{t('features')}</p>
                <h3>{t('addmultiplelocationsheading')}</h3>
                <p>
                  {t('addmultiplelocationsbody')}
                </p>
                <Link to="/signup" className="landing_link_button">
                  {t('getstarted')}
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
                <p>{t('features')}</p>
                <h3>{t('findoutyourcityforecastheading')}</h3>
                <p>
                  {t('findoutyourcityforecastbody')}
                </p>
                <Link to="/signup" className="landing_link_button">
                  {t('getstarted')}
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
            <p>{t('gomobile')}</p>
            <h3 className="landing_header_md">
              {t('usetheappheading')}
            </h3>
            <p>
              {t('usetheappbody')}
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
  const { t } = useTranslation(['home']);
  return (
    <section className="flex flex-col gap-8 w-full pb-[96px]">
      <div className="flex items-center justify-between">
        <h3 className="landing_header_md">{t('explorefaqs')}</h3>
        <button
          type="button"
          className="flex items-center gap-2 text-[#565560]"
          onClick={() => toggleOpenAll((prv) => !prv)}
        >
          {t('viewfull')}
          {openAll ? <FaAngleUp /> : <FaAngleDown />}
        </button>
      </div>
      <div className="sm:p-3 flex flex-col gap-8">
        <Faq
          position={1}
          question={`${t('FAQQ1')}`}
          answer={`${t('FAQA1')}`}
          open={openAll}
        />
        <Faq
          question={`${t('FAQQ2')}`}
          answer={`${t('FAQA2')}`}
          open={openAll}
        />
        <Faq
          question={`${t('FAQQ3')}`}
          answer={`${t('FAQA3')}`}
          open={openAll}
        />
        <Faq
          question={`${t('FAQQ4')}`}
          answer={`${t('FAQA4')}`}
          open={openAll}
        />
      </div>
      {/* <Faqs /> */}
      <MobileAdvert />
    </section>
  );
}
