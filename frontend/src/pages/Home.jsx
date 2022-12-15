/* eslint-disable no-console */
import React, { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment/moment';
import { useNavigate } from 'react-router-dom';
import PopularLocation from '../components/Home/PopularLocation';
import '../styles/Home.css';
import NearCity from '../components/Home/NearCity';
import MobileAdvert from '../components/MobileAdvert';
import getWeatherDescriptionCategory, {
  patchForecast,
  to12HourFormat,
} from '../libs/Home';

export default function Home() {
  const APIURL = 'https://api.tropicalweather.hng.tech';
  const [userLocation, setUserLocation] = useState(null);
  const [immediateWeather, setImmediateWeather] = useState(null);
  const [weatherForecast, setWeatherForecast] = useState([]);
  const slider = useRef(null);
  const [curr, setCurr] = useState(0);
  const onload = useRef(false);
  const [coord, setCoord] = useState({ longitude: 0, latitude: 0 });
  const [locationAllowed, setLocationAllow] = useState(true);
  const { t } = useTranslation(['home']);
  const savedForecast = useRef([]);
  const [lineWidth, setLneWidth] = useState('100%');
  const forecastContainer = useRef();
  const [currentTime, setCurrentTime] = useState(1);
  const [riskTimeFrame, setRiskTimeFrame] = useState({ transform: 0, width: 0 });
  const [weatherNotice, setWeatherNotice] = useState('');

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoord({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
        setLocationAllow(true);
      }, () => { setLocationAllow(false); });
    } else {
      alert('Geolocation not supported on this browser');
    }
  }

  useEffect(() => {
    getLocation();
    const sv = localStorage.getItem('forecast');
    if (sv !== null) {
      savedForecast.current = JSON.parse(sv);
    } else {
      savedForecast.current = patchForecast;
    }
  }, []);
  const day = moment().format('dddd');
  const time = moment().format('h:mm a');

  const getCurrentLocationFromCoords = async () => {
    try {
      const response = await fetch(
        `${APIURL}/weather/forcast/extended?lat=${coord.latitude}&lon=${coord.longitude}`
      );
      const data = await response.json();
      setUserLocation(`${data.city}, ${data.state}`);
      setImmediateWeather(data.current);
      const currentTime = new Date().getHours();
      savedForecast.current = savedForecast.current.slice(0, currentTime + 1);
      savedForecast.current = savedForecast.current.concat(data.todays_timeline);
      setWeatherForecast(savedForecast.current);
      localStorage.setItem('forecast', JSON.stringify(savedForecast.current));
      onload.current = true;
    } catch (error) {
      // console.log(error);
    }
  };

  const navigate = useNavigate();
  const gotoDashboard = (city) => {
    navigate(`/app/dashboard?city=${city}`);
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
    if (immediateWeather !== null) {
      const { scrollWidth, offsetWidth } = forecastContainer.current;
      setLneWidth(scrollWidth);
      const t = new Date().getHours() + 1;
      setCurrentTime(t);
      const scroll = 120 * t - 60 - offsetWidth / 2;

      const startTime = new Date(immediateWeather.datetime).getHours();
      const endTime = new Date(immediateWeather.end_datetime).getHours();
      setRiskTimeFrame({
        transform: (scrollWidth / 24) * startTime + 60,
        width: (endTime - startTime) * 120,
      });

      if (forecastContainer.current) {
        let rangeScroll = (120 * startTime);
        const diff = offsetWidth - ((endTime - startTime) * 120);
        if (diff > 1) {
          rangeScroll -= diff / 2;
        }
        forecastContainer.current.scrollTo({
          left: getWeatherDescriptionCategory(immediateWeather.main) === 'clear.png' ?
            scroll :
            rangeScroll,
          behavior: 'smooth',
        });
      }

      switch (getWeatherDescriptionCategory(immediateWeather.main)) {
        case 'rain.svg':
          setWeatherNotice('#95B6F6D4');
          break;
        case 'sun.svg':
          setWeatherNotice('#FF8746D4');
          break;
        case 'clouds.png':
          setWeatherNotice('#B2D4F7D4');
          break;
        default:
          setWeatherNotice('');
      }
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
              {`${day} `}
              ·
              {` ${time}`}
            </p>
          )}
          {userLocation === null && (
            <p className="ml-0 homepage-location md:ml-6">
              {t('locationloading')}
            </p>
          )}
          {immediateWeather !== null && (
            <div className="translate-y-[70px] mt-4 self-start flex flex-col gap-[20px] md:gap-[48px] md:mb-[50px]">
              <p className="text-xl font-bold sm:text-2xl md:text-4xl">{userLocation}</p>
              <div className="gap-2 homepg-immed mb-[-36px] md:mb-0">
                <img
                  src={`./assets/NotificationFeedList/${getWeatherDescriptionCategory(
                    immediateWeather.main
                  )}`}
                  alt="clouds icons"
                  className="w-16 h-16 md:h-24 md:w-24"
                />
                <div className="flex flex-col gap-2">
                  <p className="font-light">
                    CURRENT FORECAST
                  </p>
                  <p className="text-4xl font-extrabold capitalize sm:text-5xl md:text-6xl">{t(immediateWeather.main.replace(' ', '').toLowerCase())}</p>
                  <h2
                    className="mt-2 text-2xl font-bold"
                    style={{ color: 'rgba(255, 255, 255, 0.75)' }}
                  >
                    {`${to12HourFormat(
                      immediateWeather.datetime
                    )} ${t('to')} ${to12HourFormat(immediateWeather.end_datetime)}`}
                  </h2>

                  <div
                    className="flex items-center justify-center w-[140px] gap-[10px] mt-4 bg-[white] rounded-full px-2 py-1"
                  >
                    <svg width="18" height="18" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M11.5 7V11M11.5 15H11.51M21.5 11C21.5 16.5228 17.0228 21 11.5 21C5.97715 21 1.5 16.5228 1.5 11C1.5 5.47715 5.97715 1 11.5 1C17.0228 1 21.5 5.47715 21.5 11Z"
                        stroke={immediateWeather.risk ? '#EF4444' : 'grey'}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p
                      className="text-sm uppercase"
                      style={{
                        color: immediateWeather.risk ? 'black' : 'grey'
                      }}
                    >
                      RISK:
                      {immediateWeather.risk ? ` ${immediateWeather.risk}` : ' NONE'}
                    </p>
                  </div>

                </div>
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
                    CURRENT FORECAST
                  </span>
                </p>
                <p className="homepg-immedp">{t('forecastloading')}</p>
              </div>
            </div>
          )}
          <div className="homepg-weatherfc">
            <ul className="relative pt-20 mt-[10px] webkit-w" ref={forecastContainer}>
              <div
                className="absolute w-[1000px] bg-white/50 mt-8 top-[20px]"
                style={{
                  width: `${lineWidth - 60}px`,
                  overflowY: 'visible'
                }}
              >
                <div
                  className="relative h-0.5"
                  style={{
                    width: `${(120) * currentTime - 60}px`,
                    transition: 'all 1s ease-out',
                    transitionDelay: '.5s',
                  }}
                >
                  <img
                    src="/Home/polygon.png"
                    className="absolute top-[0] right-[-10px]"
                    style={{ border: 'transparent', color: 'red' }}
                    alt="pointer"
                  />
                </div>
                {
                  weatherNotice !== '' && (
                    <div
                      className="mt-[-2px] relative flex justify-center"
                      style={{
                        borderBottom: `5px solid ${weatherNotice}`,
                        overflowY: 'visible',
                        width: `${riskTimeFrame.width}px`,
                        transform: `translateX(${riskTimeFrame.transform}px)`
                      }}
                    >
                      <p
                        className="absolute text-[18px] uppercase font-bold"
                        style={{ transform: 'translateY(calc(-100%))' }}
                      >
                        {immediateWeather.main}
                      </p>
                    </div>
                  )
                }
              </div>
              {weatherForecast.map((forecast, index) => {
                const category = getWeatherDescriptionCategory(forecast.main);
                return (
                  <li
                    key={forecast.datetime}
                    className="text-center homepg-heroforecast"
                    style={{
                      width: '120px',
                      flexShrink: 0,
                      paddingInline: '15px',
                    }}
                    id={`fcst-${index + 1}`}
                  >
                    <p>{to12HourFormat(forecast.datetime)}</p>
                    <img
                      style={{ width: '60px' }}
                      src={`./assets/NotificationFeedList/${category}`}
                      alt=""
                    />
                    <p className="text-sm font-light uppercase">
                      RISK:
                      {forecast.risk ? ` ${forecast.risk}` : ' NONE'}
                    </p>
                    <p className="font-bold capitalize">{t(forecast.main.replace(' ', '').toLowerCase())}</p>
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
        {
          !locationAllowed && (
            <div className="flex flex-col gap-4 bottom-0  w-full sm:w-[500px] right-0 items-center text-center fixed sm:bottom-[30px] px-[20px] text-[var(--foreground)] sm:px-[63px] py-[40px] rounded-t-2xl sm:right-4 bg-[var(--background)] ">
              <h5 className="text-2xl">{t('allowlocation')}</h5>
              <p className="text-[var(--accents-7)]">{t('allowtropicalweather')}</p>
              <button
                type="button"
                className="text-lg text-[white] p-[13px] bg-[#EF6820] rounded-lg w-full"
                onClick={getLocation}
              >
                {t('allowaccess')}
              </button>
            </div>
          )
        }
      </header>
      <div className="homepg-worldforecast">
        <h2 className="mb-20">{t('worldforecast')}</h2>
        <ul className="homepg-worldul">
          <div className="space-y-10 homepg-worldone">
            <li className="homepg-poplis">
              <div className="homepg-popflex">
                <img src="/Home/Rectanglefour.svg" alt="australia flag" />
                <p>
                  <span className="font-bold">AUS &nbsp;</span>
                  AUSTRALIA
                </p>
              </div>
              {' '}
              <button
                type="button"
                aria-label="go to dashboard"
                onClick={() => gotoDashboard('Canberra, Australia')}
                className="homepg-dash"
              />
            </li>
            <li className="homepg-poplis">
              <div className="homepg-popflex">
                <img src="/Home/Rectangle 3.svg" alt="sweden flag" />
                <p>
                  <span className="font-bold">SWE &nbsp;</span>
                  SWEDEN
                </p>
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
                <p>
                  <span className="font-bold">NLD &nbsp;</span>
                  NETHERLANDS
                </p>
              </div>

              <button
                type="button"
                aria-label="go to dashboard"
                onClick={() => gotoDashboard('Amsterdam, Netherlands')}
                className="homepg-dash"
              />
            </li>
            <li className="homepg-poplis">
              <div className="homepg-popflex">
                <img src="/Home/Rectangle 6.svg" alt="united kingdom flag" />
                <p>
                  <span className="font-bold">GBR &nbsp;</span>
                  UNITED KINGDOM
                </p>
              </div>
              <button
                type="button"
                aria-label="go to dashboard"
                onClick={() => gotoDashboard('London, United Kingdom')}
                className="homepg-dash"
              />
            </li>
          </div>
          <div className="space-y-10 homepg-worldtwo">
            <li className="homepg-poplis">
              <div className="homepg-popflex">
                <img src="/Home/GermanyFlag.svg" alt="Germany flag" />
                <p>
                  <span className="font-bold">DE &nbsp;</span>
                  GERMANY
                </p>
              </div>
              <button
                type="button"
                aria-label="go to dashboard"
                onClick={() => gotoDashboard('Berlin, GERMANY')}
                className="homepg-dash"
              />
            </li>
            <li className="homepg-poplis">
              <div className="homepg-popflex">
                <img src="/Home/SouthAfricaFlag.svg" alt="South Africa flag" />
                <p>
                  <span className="font-bold">RSA &nbsp;</span>
                  SOUTH AFRICA
                </p>
              </div>

              <button
                type="button"
                aria-label="go to dashboard"
                onClick={() => gotoDashboard('Pretoria, SOUTH AFRICA')}
                className="homepg-dash"
              />
            </li>
            <li className="homepg-poplis">
              <div className="homepg-popflex">
                <img src="/Home/ScotlandFlag.svg" alt="Jamaica flag" />
                <p>
                  <span className="font-bold">JM &nbsp;</span>
                  JAMAICA
                </p>
              </div>
              <button
                type="button"
                aria-label="go to dashboard"
                onClick={() => gotoDashboard('Kingston, JAMAICA')}
                className="homepg-dash"
              />
            </li>
            <li className="homepg-poplis">
              <div className="homepg-popflex">
                <img src="/Home/JamaicaFlag.svg" alt="Scotland flag" />
                <p>
                  <span className="font-bold">SCT &nbsp;</span>
                  SCOTLAND
                </p>
              </div>
              <button
                type="button"
                aria-label="go to dashboard"
                onClick={() => gotoDashboard('Edinburgh, SCOTLAND')}
                className="homepg-dash"
              />
            </li>
          </div>
          <div className="space-y-10 homepg-worldthree">
            <li className="homepg-poplis">
              <div className="homepg-popflex">
                <img src="/Home/Rectangle 5 (1).svg" alt="indonesia flag" />
                <p>
                  <span className="font-bold">IDN &nbsp;</span>
                  INDONESIA
                </p>
              </div>
              <button
                type="button"
                aria-label="go to dashboard"
                onClick={() => gotoDashboard('Jakarta, Indonesia')}
                className="homepg-dash"
              />
            </li>
            <li className="homepg-poplis">
              <div className="homepg-popflex">
                <img src="/Home/Rectangle 6 (1).svg" alt="japan flag" />
                <p>
                  <span className="font-bold">JPN &nbsp;</span>
                  JAPAN
                </p>
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
                <p>
                  <span className="font-bold">CAN &nbsp;</span>
                  CANADA
                </p>
              </div>
              <button
                type="button"
                aria-label="go to dashboard"
                onClick={() => gotoDashboard('Ottawa, Canada')}
                className="homepg-dash"
              />
            </li>
            <li className="homepg-poplis">
              <div className="homepg-popflex">
                <img src="/Home/Rectangle 8.svg" alt="united states flag" />
                <p>
                  <span className="font-bold">USA &nbsp;</span>
                  UNITED STATES
                </p>
              </div>
              <button
                type="button"
                aria-label="go to dashboard"
                onClick={() => gotoDashboard('WashingtonDc, United States')}
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
              {/* <h6>{t('updatedamin')}</h6> */}
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
      <div className="px-5 md:px-14">
        <MobileAdvert />
      </div>
    </div>
  );
}
