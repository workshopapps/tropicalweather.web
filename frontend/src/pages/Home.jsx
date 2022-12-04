/* eslint-disable no-console */
import React, { useRef, useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import PopularLocation from '../components/Home/PopularLocation';
import Faqs from '../components/Home/Faqs';
// import HourlyUpdate from '../components/Home/HoulyUpdate';
// import Risk from '../components/Home/Risk';
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
  const onload = useRef(false);
  const [coord, setCoord] = useState({ longitude: 0, latitude: 0 });
  const getCurrentLocationFromCoords = async () => {
    const response = await fetch(
      `${APIURL}/location?lat=${coord.latitude}&lon=${coord.longitude}`
    );
    const data = await response.json();
    const location = `${data.city}, ${data.state}`;
    setUserLocation(location);
    onload.current = true;
  };
  const getImmediateWeather = async () => {
    const response = await fetch(
      `${APIURL}/weather/current/by-address?address=${userLocation.replace(', ', '%2C%20')}`
    );
    const data = await response.json();
    setImmediateWeather(data);
  };
  const getWeatherForecast = async () => {
    const response = await fetch(
      `${APIURL}/weather/forecasts?lat=${coord.latitude}&lon=${coord.longitude}`
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
  return (
    <div id="home">
      <header className="landing_header">
        <div className="landing_sections_wrapper">
          {userLocation !== 'undefined, undefined' && (
            <p className="homepage-location">{userLocation}</p>
          )}
          {immediateWeather !== null && (
            <div className="homepg-immed">
              <img src="./assets/NotificationFeedList/CLOUDY.svg" alt="clouds icons" />
              <div>
                <p>
                  Today
                  {'  '}
                  <span>
                    {Number(immediateWeather.datetime.slice(0, 2)) + 1 < 10
                      ? 0
                      : ''}
                    {Number(immediateWeather.datetime.slice(0, 2)) + 1}
                    {' '}
                    {immediateWeather.datetime.slice(2)}
                  </span>
                </p>
                <p className="homepg-immedp">{immediateWeather.main}</p>
              </div>
            </div>
          )}
          <div className="homepg-weatherfc">
            <ul>
              {weatherForecast !== null &&
                weatherForecast.map((forecast) => (
                  <li key={forecast.datetime}>
                    {forecast.main === 'Clouds' && (
                      <>
                        <p>{forecast.datetime}</p>
                        <img
                          src="./assets/NotificationFeedList/CLOUDY.svg"
                          alt="cloudy icon"
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
                    {forecast.main === 'Few clouds' && (
                      <>
                        <p>{forecast.datetime.slice(11)}</p>
                        <img
                          src="./assets/NotificationFeedList/CLOUDY.svg"
                          alt="couldy icon"
                        />
                        <p>{forecast.main}</p>
                      </>
                    )}
                    {forecast.main === 'Scattered clouds' && (
                      <>
                        <p>{forecast.datetime.slice(11)}</p>
                        <img
                          src="./assets/NotificationFeedList/CLOUDY.svg"
                          alt="cloudy icon"
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
              <h3 className="landing_header_md">Popular locations</h3>
              <h6>upated a minute ago</h6>
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
          <div className="w-full flex flex-col gap-[10px]">
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
      <Faqs />
      <MobileAdvert />
    </div>
  );
}
