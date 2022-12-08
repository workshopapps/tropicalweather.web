/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import moment from 'moment/moment';
import { Link, useLocation } from 'react-router-dom';
import { TfiAngleLeft } from 'react-icons/tfi';
import { BsMap, BsHeart, BsThreeDotsVertical } from 'react-icons/bs';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { AiFillCheckCircle, AiOutlineDelete } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';

import WeatherTimeline from '../components/Dashboard/WeatherTimeline';
import OptionsPopup from '../components/Dashboard/OptionsPopup';

export default function Dashboard() {
  const APIURL = 'https://api.tropicalweather.hng.tech';
  const time = moment().format('h:mm a');
  const [savedLocations, setSavedLocations] = useState([]);
  const [toast, setToast] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [coord, setCoord] = useState({ longitude: 0, latitude: 0 });
  const { t } = useTranslation(['dashboard']);

  const [timeline, setTimeline] = useState([
    {
      location: 'Abuja, Nigeria',
      main: `${t('sunny')}`,
      risk: `${t('sunny')} ${t('risk')} 75F`,
      datetime: '1:00PM',
    },
    {
      location: 'Kaduna, Nigeria',
      main: `${t('scatteredrain')}`,
      risk: `${t('sunny')} ${t('risk')} 40C`,
      datetime: '3:00 PM',
    },
    {
      location: 'Lagos, Nigeria',
      main: `${t('sunny')}`,
      risk: `${t('sunny')} ${t('risk')} 75F`,
      datetime: '6:00 PM',
    },
  ]);
  const [currentWeather, setCurrentWeather] = useState({});
  const [currentLocation, setCurrentLocation] = useState(null);
  const { search } = useLocation();

  useEffect(() => {
    const city = new URLSearchParams(search).get('city');
    setCurrentLocation(city);
  }, [search]);

  const formatTime = (time) => moment(time).format('h:mm a');
  const getCurrentLocationFromCoords = async () => {
    const response = await fetch(
      `${APIURL}/location?lat=${coord.latitude}&lon=${coord.longitude}`
    );
    const data = await response.json();
    const location = `${data.city}, ${data.state}`;
    setCurrentLocation(location);
    setUserLocation(location);
  };
  const getCurrentLocationWeather = async () => {
    const response = await fetch(
      `${APIURL}/weather/forcast/extended?lat=${coord.latitude}&lon=${coord.longitude}`
    );
    const data = await response.json();
    setCurrentWeather(data.current);
    setTimeline(data.todays_timeline);
  };

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos) {
    const crd = pos.coords;
    setCoord({ latitude: crd.latitude, longitude: crd.longitude });
  }

  function error(err) {
    return `ERROR(${err.code}): ${err.message}`;
  }

  useEffect(() => {
    const locationInterval = setInterval(() => {
      navigator.geolocation.getCurrentPosition(success, error, options);
    }, 2000);
    return () => clearInterval(locationInterval);
  }, [userLocation]);

  useEffect(() => {
    if (coord.latitude !== 0) {
      if (!currentLocation) {
        getCurrentLocationFromCoords();
      }
      getCurrentLocationWeather();
    }
  }, [coord]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('saved-locations'));
    if (!data || data.length === 0) {
      setSavedLocations([]);
      localStorage.setItem('saved-locations', JSON.stringify(savedLocations));
    } else {
      setSavedLocations(data);
    }
  }, []);

  const removeLocation = (location) => {
    const loc = savedLocations.filter((item) => item !== location);
    localStorage.setItem('saved-locations', JSON.stringify(loc));
    setSavedLocations([]);
    setSavedLocations(loc);
  };
  const showToast = () => {
    setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 5000);
  };

  const addLocation = async (location) => {
    if (savedLocations.some((loc) => loc === location)) return;
    const locs = savedLocations;
    locs.push(location);
    setSavedLocations(locs);
    localStorage.setItem('saved-locations', JSON.stringify(locs));
    showToast();
  };

  const isSaved = savedLocations.some(
    (location) => location === currentLocation
  );

  // Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative px-4 md:px-16 text-grey-900">
      {toast ? (
        <div
          className="absolute flex items-center gap-3 p-1 rounded-lg"
          style={{
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '10px 20px',
            width: 'min(95%, 400px)',
            background: 'var(--accents-2)',
            border: '2px solid #054F31',
            zIndex: 1
          }}
        >
          <AiFillCheckCircle color="#054F31" style={{ flexShrink: 0 }} />
          <p style={{ fontSize: '16px' }}>
            {`${currentLocation} has been added to saved locations`}
          </p>
        </div>
      ) : null}
      <div className="pt-6">
        <Link to="/" className="items-center hidden mb-6 md:flex">
          <TfiAngleLeft className="mr-2 text-lg" />
          <span className="text-lg">{t('back')}</span>
        </Link>
        <div className="flex flex-col w-full gap-10 md:flex-row">
          <div className="relative w-full max-w-2xl">
            <div className="flex flex-col gap-2 px-5 mb-5 md:flex-row md:justify-between">
              <h1 className="text-2xl font-bold">
                {currentLocation || 'Input Location from search bar'}
              </h1>
              <div className="flex items-center self-end gap-4">
                {isSaved ? null : (
                  <button
                    type="button"
                    onClick={() => addLocation(currentLocation)}
                    className="flex items-center gap-2 text-primary-btn"
                  >
                    <BsHeart />
                    <span>{t('savecity')}</span>
                  </button>
                )}
                <div className="relative">
                  <button
                    type="button"
                    className="btn btn-ghost btn-circle"
                    onClick={() => setShowPopup(!showPopup)}
                  >
                    <BsThreeDotsVertical />
                  </button>
                  <OptionsPopup display={showPopup} />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 px-5 py-8 rounded-lg shadow-lg hero">
              <p>
                {t('today')}
                <span className="uppercase">{` ${time}`}</span>
              </p>
              {/* <p className="text-4xl font-bold">{currentWeather.}</p> */}
              <p className="text-xl font-bold text-gray-600">
                {`${formatTime(currentWeather.datetime)} to ${formatTime(
                  currentWeather.end_datetime
                )}`}
              </p>
              <p className="px-8 py-2 font-semibold text-sm text-gray-500 rounded-[40px] border border-gray-400 bg-[#D5F7FE]/10 w-max">
                {currentWeather.risk}
              </p>
            </div>
            <section id="saved-locations" className="mt-20">
              <div className="flex items-center justify-between w-full">
                <h2 className="text-2xl font-bold">{t('savedlocations')}</h2>
              </div>

              {savedLocations.length < 1 ? (
                <div className="flex flex-col items-center justify-center gap-3 py-12 mx-auto w-max md:py-20">
                  <BsMap className="text-3xl text-primary-btn" />
                  <h2 className="text-2xl font-bold">{t('nolocation')}</h2>
                  <p>{t('youcansave')}</p>
                </div>
              ) : (
                <div className="flex flex-col justify-start gap-10 my-10">
                  {savedLocations.map((location) => (
                    <div
                      className="flex items-center justify-between gap-2 p-4 rounded-lg shadow-md bg-[var(--accents-primary)]"
                      key={location}
                    >
                      <div className="flex items-center gap-4">
                        <HiOutlineLocationMarker className="text-lg" />
                        <span className="text-sm capitalize md:text-xl">
                          {location}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeLocation(location)}
                        className="bdr-50% p-2 rounded-full"
                      >
                        <AiOutlineDelete />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
          <section id="timeline-forecast" className="flex-1 my-10 md:my-0">
            <p className="mb-4 text-xl font-bold">{t('today')}</p>
            {timeline.length > 0 ? (
              timeline.map((day, index) => (
                <WeatherTimeline
                  risk={day.risk}
                  datetime={formatTime(day.datetime)}
                  main={day.main}
                  key={day.datetime}
                  last={index === timeline.length - 1}
                />
              ))
            ) : (
              <p className="text-xl font-semibold">
                {t('dataisnotavailable')}
              </p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
