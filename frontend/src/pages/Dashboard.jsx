import React, { useEffect, useState } from 'react';
import moment from 'moment/moment';
import { useLocation } from 'react-router-dom';
import { BsHeart, BsThreeDotsVertical } from 'react-icons/bs';
import { GrClose } from 'react-icons/gr';
import { IoMdAlert } from 'react-icons/io';
import { AiFillCheckCircle } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import Share from '../components/Dashboard/Share';
import WeatherTimeline from '../components/Dashboard/WeatherTimeline';
import OptionsPopup from '../components/Dashboard/OptionsPopup';
import TimelineOptions from '../components/Dashboard/TimelineOptions';
import {
  getWeatherForecastFromAddressOrLatLong,
  getTomorrowWeatherForecastFromAddressOrLatLong,
  getWeeklyWeatherForecastFromAddressOrLatLong,
} from '../libs/dashboardForecast';
import { getSavedLocations, saveLocation, deleteLocations } from '../libs/savedLocations';
import SavedLocations from '../components/Dashboard/SavedLocations';
import Footer from '../components/Dashboard/Footer';

export default function Dashboard() {
  const APIURL = 'https://api.tropicalweather.hng.tech';
  const time = moment().format('h:mm a');
  const [savedLocations, setSavedLocations] = useState([]);
  const [toast, setToast] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showTimelineOptions, setShowTimelineOptions] = useState(false);
  const [coord, setCoord] = useState({ longitude: 0, latitude: 0 });
  const { t } = useTranslation(['dashboard']);
  // timeline data
  const [todayTimeline, setTodayTimeline] = useState([]);
  const [tomorrowTimeline, setTomorrowTimeline] = useState([]);
  const [weeklyTimeline, setWeeklyTimeline] = useState([]);
  const [timeline, setTimeline] = useState(todayTimeline);
  const [currentTimeline, setCurrentTimeline] = useState('Today');
  const [currentWeather, setCurrentWeather] = useState({});
  const [currentLocation, setCurrentLocation] = useState(null);
  const [searchCity, setSearchCity] = useState(null);
  const { search } = useLocation();

  useEffect(() => {
    const city = new URLSearchParams(search).get('city');
    if (city?.length > 5) {
      setSearchCity(city);
      setCurrentLocation(city);
    }
  }, [search]);

  const formatTime = (time) => moment(time).format('h:mm a');

  const getCurrentLocationFromCoords = async () => {
    const response = await fetch(
      `${APIURL}/location?lat=${coord.latitude}&lon=${coord.longitude}`
    );
    const data = await response.json();
    const location = `${data.city}, ${data.state}`;
    if (currentLocation === null) {
      setCurrentLocation(location);
    }
  };

  const getCurrentLocationWeather = async () => {
    if (searchCity) {
      const data = await getWeatherForecastFromAddressOrLatLong(searchCity);
      setCurrentWeather(data.current);
      setTodayTimeline(data.todays_timeline);
      setTimeline(data.todays_timeline);
    } else {
      const data = await getWeatherForecastFromAddressOrLatLong(
        null, coord.latitude, coord.longitude
      );
      setCurrentWeather(data.current);
      setTodayTimeline(data.todays_timeline);
      setTimeline(data.todays_timeline);
    }
  };

  const getTomorrowWeather = async () => {
    if (searchCity) {
      const data = await getTomorrowWeatherForecastFromAddressOrLatLong(searchCity);
      setTomorrowTimeline(data);
    } else {
      const data = await getTomorrowWeatherForecastFromAddressOrLatLong(
        null, coord.latitude, coord.longitude
      );
      setTomorrowTimeline(data);
    }
  };

  const getWeeklyWeather = async () => {
    if (searchCity) {
      const data = await getWeeklyWeatherForecastFromAddressOrLatLong(searchCity);
      setWeeklyTimeline(data);
    } else {
      const data = await getWeeklyWeatherForecastFromAddressOrLatLong(
        null, coord.latitude, coord.longitude
      );
      setWeeklyTimeline(data);
    }
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
    if (coord.latitude === 0) {
      const locationTimeout = setTimeout(() => {
        navigator.geolocation.getCurrentPosition(success, error, options);
      }, 2000);
      return () => clearTimeout(locationTimeout);
    }
  }, [coord]);

  useEffect(() => {
    if (coord.latitude !== 0) {
      if (!currentLocation) {
        getCurrentLocationFromCoords();
      }
      getCurrentLocationWeather();
      getTomorrowWeather();
      getWeeklyWeather();
    }
  }, [coord, searchCity, currentLocation]);

  useEffect(() => {
    const savedLocations = getSavedLocations();
    setSavedLocations(savedLocations);
  }, []);

  const showToast = () => {
    setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 5000);
  };
  const [editLocations, setEditLocations] = useState(false);
  const [locationIdsToDelete, setlocationIdsToDelete] = useState([]);

  const clearLocations = () => {
    const newLocations = deleteLocations(locationIdsToDelete);
    setSavedLocations(newLocations);
    setEditLocations(false);
  };

  const addLocation = (location) => {
    if (savedLocations.some((loc) => loc.location === location)) return;
    setSavedLocations(saveLocation(location));
    showToast();
  };

  const isSaved = savedLocations.some(
    (location) => location.location === currentLocation
  );

  // Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const timelineToDisplay = (timeline) => {
    switch (timeline) {
      case 'today':
        setTimeline(todayTimeline);
        setCurrentTimeline('Today');
        setShowTimelineOptions(false);
        return;
      case 'tomorrow':
        setTimeline(tomorrowTimeline);
        setCurrentTimeline('Tomorrow');
        setShowTimelineOptions(false);
        return;
      case 'weekly':
        setTimeline(weeklyTimeline);
        setCurrentTimeline('This week');
        setShowTimelineOptions(false);
        return;
      default:
        return todayTimeline;
    }
  };

  return (
    <div className="relative px-4 mb-36 md:mb-20 md:px-16 text-grey-900">
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
            zIndex: 1,
          }}
        >
          <AiFillCheckCircle color="#054F31" style={{ flexShrink: 0 }} />
          <p style={{ fontSize: '16px' }}>
            {`${currentLocation} ${t('hasbeenadded')}`}
          </p>
        </div>
      ) : null}
      <div className="pt-6">
        <div className="flex flex-col w-full gap-10 md:flex-row">
          <div className="relative w-full">
            <div className="flex flex-col gap-2 p-5 md:flex-row md:justify-between bg-[var(--d-bg)] rounded-t-lg">
              <h1 className="text-2xl font-bold">
                {currentLocation || `${t('fetchingdata')}`}
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
                  {!showPopup && (
                    <button
                      title="open"
                      type="button"
                      className="pt-2 btn btn-ghost btn-circle"
                      onClick={() => setShowPopup(true)}
                    >
                      <BsThreeDotsVertical />
                    </button>
                  )}
                  {showPopup && (
                    <button
                      title="close"
                      type="button"
                      className="pt-2 btn btn-ghost btn-circle"
                      onClick={() => setShowPopup(false)}
                    >
                      <GrClose />
                    </button>
                  )}
                  <OptionsPopup display={showPopup} setPopup={setShowShare} />
                </div>
              </div>
            </div>
            <section className="flex flex-1 flex-col gap-4 px-5 py-8 shadow-lg hero bg-[var(--d-bg)] rounded-b-lg">
              <p>
                {t('today')}
                <span className="uppercase">{` ${time}`}</span>
              </p>
              <p className="text-4xl font-bold">{t(currentWeather?.main?.replace(' ', '').toLowerCase())}</p>
              <p className="text-xl font-bold opacity-80">
                {`${formatTime(currentWeather.datetime)} ${t('to')} ${formatTime(
                  currentWeather.end_datetime
                )}`}
              </p>
              <span className="px-8 py-2 font-semibold text-base rounded-[40px] border border-gray-400 bg-[var(--d-bg)] w-max flex items-center gap-2 opacity-90">
                {currentWeather.risk !== `${t('none')}` && (
                  <IoMdAlert className="text-red-500" />
                )}
                <p>{currentWeather.risk}</p>
              </span>
            </section>
            <section
              id="mobile-timeline-forecast"
              className="flex-1 px-2 py-5 my-8 rounded-lg shadow-lg md:px-10 max-h-[500px] overflow-y-auto relative block lg:hidden h-max"
            >
              <div className="flex items-center justify-between mb-4">
                <p className="mb-4 text-xl font-bold">{t(currentTimeline.replace(' ', '').toLowerCase())}</p>
                {!showTimelineOptions && (
                  <button
                    title="open"
                    type="button"
                    className="btn btn-ghost btn-circle"
                    onClick={() => setShowTimelineOptions(true)}
                  >
                    <BsThreeDotsVertical />
                  </button>
                )}
                {showTimelineOptions && (
                  <button
                    title="close"
                    type="button"
                    className="btn btn-ghost btn-circle"
                    onClick={() => setShowTimelineOptions(false)}
                  >
                    <GrClose />
                  </button>
                )}
              </div>
              <WeatherTimeline timelineData={timeline} />
              <TimelineOptions
                display={showTimelineOptions}
                setTimeline={timelineToDisplay}
              />
            </section>
            <SavedLocations
              locations={savedLocations}
              clearLocations={clearLocations}
              addToDeleteList={setlocationIdsToDelete}
              editLocations={editLocations}
              setEditLocations={setEditLocations}
              deleteList={locationIdsToDelete}
            />
          </div>
          <section
            id="timeline-forecast"
            className="px-2 py-5 my-5 rounded-lg shadow-lg md:px-10 md:my-0 md:min-h-[650px] md:overflow-y-auto relative hidden lg:block max-w-2xl lg:min-w-[450px] md:max-h-[calc(100vh-250px)]"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="mb-4 text-xl font-bold">{currentTimeline}</p>
              {!showTimelineOptions && (
                <button
                  title="open"
                  type="button"
                  className="btn btn-ghost btn-circle"
                  onClick={() => setShowTimelineOptions(true)}
                >
                  <BsThreeDotsVertical />
                </button>
              )}
              {showTimelineOptions && (
                <button
                  title="close"
                  type="button"
                  className="btn btn-ghost btn-circle"
                  onClick={() => setShowTimelineOptions(false)}
                >
                  <GrClose />
                </button>
              )}
            </div>
            <WeatherTimeline timelineData={timeline} />
            <TimelineOptions
              display={showTimelineOptions}
              setTimeline={timelineToDisplay}
            />
          </section>
        </div>
      </div>
      <Footer />
      <Share
        popup={showShare}
        setPopup={setShowShare}
        currentLocation={currentLocation}
        currentWeather={currentWeather}
      />
    </div>
  );
}
