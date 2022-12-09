/* eslint-disable no-console */
import React, { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import PopularLocation from '../components/Home/PopularLocation';
import '../styles/Home.css';
import NearCity from '../components/Home/NearCity';
import MobileAdvert from '../components/MobileAdvert';
import getWeatherDescriptionCategory, { to12HourFormat } from '../libs/Home';

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
  const savedForecast = useRef([]);
  const [lineWidth, setLneWidth] = useState('100%');
  const forecastContainer = useRef();
  const [currentTime, setCurrentTime] = useState(1);

  useEffect(() => {
    const sv = localStorage.getItem('forecast');
    if (sv !== null) {
      savedForecast.current = JSON.parse(sv);
    } else {
      savedForecast.current = new Array(24).fill({ main: 'No data', datetime: '2022-12-09 00:00', risk: 'No data' });
    }
  }, []);

  const getCurrentLocationFromCoords = async () => {
    try {
      const response = await fetch(
        `${APIURL}/weather/forcast/extended?lat=${coord.latitude}&lon=${coord.longitude}`
      );
      const data = await response.json();
      setUserLocation(`${data.city}, ${data.state}`);
      setImmediateWeather(data.current);
      const pas = new Date().getUTCHours();
      savedForecast.current = savedForecast.current.slice(0, pas).concat(data.todays_timeline);
      setWeatherForecast(savedForecast.current);
      localStorage.setItem('forecast', JSON.stringify(savedForecast.current));
      onload.current = true;
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
    const { scrollWidth, offsetWidth } = forecastContainer.current;
    setLneWidth(scrollWidth);
    const t = new Date().getUTCHours() + 1;
    setCurrentTime(t);
    const scroll = (scrollWidth / 24) * t - 50;
    if (forecastContainer.current) {
      forecastContainer.current.scrollTo({
        left: (scroll) - offsetWidth / 2,
        behavior: 'smooth',
      });
    }
  }, [immediateWeather]);

  useEffect(() => {
    if (coord.latitude !== 0 && coord.longitude !== 0 && !onload.current) {
      getCurrentLocationFromCoords();
    }
  }, [coord.latitude]);

  return (
    <div id="home">
      <header className="landing_header">
        <div className="landing_sections_wrapper">
          {userLocation !== null && (
            <p className="homepage-location ml-[-16px] md:ml-6">
              {userLocation}
            </p>
          )}
          {userLocation === null && (
            <p className="homepage-location ml-0 md:ml-6">
              {t('locationloading')}
            </p>
          )}
          {immediateWeather !== null && (
            <div className="homepg-immed gap-2">
              <img
                src={`./assets/NotificationFeedList/${getWeatherDescriptionCategory(
                  immediateWeather.main
                )}`}
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
                <h2 className="text-2xl mt-2">
                  {`${to12HourFormat(immediateWeather.datetime)} to ${to12HourFormat(immediateWeather.end_datetime)}`}
                </h2>
              </div>
            </div>
          )}
          {immediateWeather === null && (
            <div className="homepg-immed">
              <img
                src="./assets/NotificationFeedList/clouds.svg"
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
            <ul className="relative pt-10 mt-[10px]" ref={forecastContainer}>
              <div
                className="absolute w-[1000px] bg-white/50 mt-8 top-[-20px]"
                style={{
                  width: `${lineWidth - 50}px`
                }}
              >
                <div
                  className="relative bg-[#F7B27A] h-0.5"
                  style={{
                    width: `${((lineWidth / 24) * currentTime - 50)}px`,
                    transition: 'all 1s ease-out',
                    transitionDelay: '1s'
                  }}
                >
                  <span className="absolute top-[-10px] rounded-full right-[-10px] h-5 w-5 bg-[#F7B27A]">
                    {' '}
                  </span>
                </div>
              </div>
              {weatherForecast.map((forecast, index) => {
                const category = getWeatherDescriptionCategory(forecast.main);
                return (
                  <li
                    key={forecast.datetime}
                    className="homepg-heroforecast text-center"
                    style={{
                      width: '100px',
                      flexShrink: 0,
                      paddingInline: '15px',
                    }}
                    id={`fcst-${index + 1}`}
                  >
                    <p>{forecast.datetime.slice(11)}</p>
                    <img
                      src={`./assets/NotificationFeedList/${category}`}
                      alt=""
                    />
                    <p>{t(forecast.main.replace(' ', '').toLowerCase())}</p>
                  </li>
                );
              })}
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
            <h4 className="text-[20px] font-bold text-[#1E1E1E]">
              {t('citiesnearyou')}
            </h4>
            <div className="w-full grid grid-cols-2 md:grid-cols-3 text-[#1E1E1E]">
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
      <MobileAdvert />
    </div>
  );
}
