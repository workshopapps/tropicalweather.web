/* eslint-disable no-console */
import React, { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import PopularLocation from '../components/Home/PopularLocation';
import Faq from '../components/Home/Faq';
import '../styles/Home.css';
import NearCity from '../components/Home/NearCity';
import MobileAdvert from '../components/MobileAdvert';

export default function Home() {
  const APIURL = 'https://api.tropicalweather.hng.tech';
  const [userLocation, setUserLocation] = useState(null);
  const [immediateWeather, setImmediateWeather] = useState(null);
  const [weatherForecast, setWeatherForecast] = useState([]);
  const slider = useRef(null);
  const [curr, setCurr] = useState(0);
  const onload = useRef(false);
  const [coord, setCoord] = useState({ longitude: 0, latitude: 0 });
  const { t } = useTranslation(['home']);
  const getCurrentLocationFromCoords = async () => {
    try {
       const response = await fetch(
         `${APIURL}/location?lat=${coord.latitude}&lon=${coord.longitude}`
       );
       const data = await response.json();
       const location = `${data.city}, ${data.state}`;
       setUserLocation(location);
       onload.current = true;
    } catch (error) {
      // console.log(error);
    }
  };
  const getImmediateWeather = async () => {
    try {
      const response = await fetch(
        `${APIURL}/weather/current/by-address?address=${userLocation.replace(
          ', ',
          '%2C%20'
        )}`
      );
      const data = await response.json();
      setImmediateWeather(data);
    } catch (error) {
      // console.log(error);
    }
    };
  const getWeatherForecast = async () => {
    try {
       const response = await fetch(
         `${APIURL}/weather/forecasts?lat=${coord.latitude}&lon=${coord.longitude}`
       );
       const data = await response.json();
       setWeatherForecast(data);
    } catch (error) {
      // console.log(error);
    }
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
          setCoord({
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
          });
        });
      }
    }
    getLocation();
  }, []);
  useEffect(() => {
    getImmediateWeather();
  }, [userLocation]);
  if (coord.latitude !== 0 && coord.longitude !== 0 && !onload.current) {
    getCurrentLocationFromCoords();
    getWeatherForecast();
  }
  console.log(weatherForecast, userLocation);
  return (
    <div id="home">
      <header className="landing_header">
        <div className="landing_sections_wrapper">
          {userLocation !== null && (
            <p className="homepage-location">{userLocation}</p>
          )}
          {userLocation === null && (
            <p className="homepage-location">{t('locationloading')}</p>
          )}
          {immediateWeather !== null && (
            <div className="homepg-immed">
              <img
                src="./assets/NotificationFeedList/CLOUDY.svg"
                alt="clouds icons"
              />
              <div>
                <p>
                  {t('today')}
                  {'  '}
                  <span>
                    {Number(immediateWeather.datetime.slice(11)) + 1 < 10
                      ? 0
                      : ''}
                    {Number(immediateWeather.datetime.slice(11, 13)) + 1 < 24
                      ? Number(immediateWeather.datetime.slice(11, 13)) + 1
                      : Number(immediateWeather.datetime.slice(11, 13)) + 1}
                    :00
                  </span>
                </p>
                <p className="homepg-immedp">{immediateWeather.main}</p>
              </div>
            </div>
          )}
          {immediateWeather === null && (
            <div className="homepg-immed">
              <img
                src="./assets/NotificationFeedList/CLOUDY.svg"
                alt="clouds icons"
              />
              <div>
                <p>
                  {t('today')}
                  {' '}
                  <span>
                    {new Date().getHours()}
                    :00
                    {new Date().getHours() < 12 ? ' am' : ' pm'}
                  </span>
                </p>
                <p className="homepg-immedp">{t('forecastloading')}</p>
              </div>
            </div>
          )}
          <div className="homepg-weatherfc">
            <ul>
              {weatherForecast !== null &&
                weatherForecast.map((forecast) => (
                  <li key={forecast.datetime} className="homepg-heroforecast">
                    {forecast.main === 'Clouds' && (
                      <>
                        <p>{forecast.datetime}</p>
                        <img
                          src="./assets/NotificationFeedList/CLOUDY.svg"
                          alt="cloudy icon"
                        />
                        <p>{t('clouds')}</p>
                      </>
                    )}
                    {forecast.main === 'Rain' && (
                      <>
                        <p>{forecast.time}</p>
                        <img
                          src="./assets/NotificationFeedList/icon.svg"
                          alt=""
                        />
                        <p>{t('rain')}</p>
                      </>
                    )}
                    {forecast.main === 'Few clouds' && (
                      <>
                        <p>{forecast.datetime.slice(11)}</p>
                        <img
                          src="./assets/NotificationFeedList/CLOUDY.svg"
                          alt="couldy icon"
                        />
                        <p>{t('fewclouds')}</p>
                      </>
                    )}
                    {forecast.main === 'Scattered clouds' && (
                      <>
                        <p>{forecast.datetime.slice(11)}</p>
                        <img
                          src="./assets/NotificationFeedList/CLOUDY.svg"
                          alt="cloudy icon"
                        />
                        <p>{t('scatteredclouds')}</p>
                      </>
                    )}
                  </li>
                ))}
              {!weatherForecast.length && (
                <p className="homepg-heroforecast">
                  {t('weatherforecastfortheday')}
                </p>
              )}
            </ul>
          </div>
        </div>
      </header>
      <div className="homepg-worldforecast">
        <h2>{t('worldforecast')}</h2>
        <ul className="homepg-worldul">
          <div className="homepg-worldone">
            <li className="homepg-poplis">
              <div className="homepg-popflex">
                <img src="/Home/Rectanglefour.svg" alt="australia flag" />
                <span> AUS AUSTRALIA</span>
              </div>
              {' '}
              <button
                type="button"
                aria-label="go to dashboard"
                onClick={() => gotoDashboard('Canberra, AUSTRALIA')}
                className="homepg-dash"
              />
            </li>
            <li className="homepg-poplis">
              <div className="homepg-popflex">
                <img src="/Home/Rectangle 3.svg" alt="sweden flag" />
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
                <img src="/Home/Rectangle 5.svg" alt="netherlands flag" />
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
                <img src="/Home/Rectangle 6.svg" alt="united kingdom flag" />
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
          <div className="homepg-worldtwo">
            <li className="homepg-poplis">
              <div className="homepg-popflex">
                <img src="/Home/Rectangle 5 (1).svg" alt="indonesia flag" />
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
                <img src="/Home/Rectangle 6 (1).svg" alt="japan flag" />
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
                <img src="/Home/Rectangle 7.svg" alt="canada flag" />
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
                <img src="/Home/Rectangle 8.svg" alt="united states flag" />
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
        </ul>
        <button
          type="button"
          className="homepg-explore"
          onClick={() => gotoDashboard('')}
        >
          {t('explorealllocations')}
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
                <p>{t('neverworryaboutfiguresbody')}</p>
              </div>
              <div
                className="landing_ill_container"
                style={{
                  '--ill-bg': '#D1FADF',
                }}
              >
                <p>{t('features')}</p>
                <h3>{t('addmultiplelocationsheading')}</h3>
                <p>{t('addmultiplelocationsbody')}</p>
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
                <p>{t('findoutyourcityforecastbody')}</p>
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
        <div id="faq">
          <FaqSection />
        </div>
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
