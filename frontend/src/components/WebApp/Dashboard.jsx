import React, { useEffect, useState } from 'react';
import moment from 'moment/moment';
import { useLocation } from 'react-router-dom';
import { BsThreeDotsVertical, BsDot } from 'react-icons/bs';
import { GrClose } from 'react-icons/gr';
import { IoMdAlert } from 'react-icons/io';
import { TfiAngleDown } from 'react-icons/tfi';
import { AiFillCheckCircle } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import Share from '../Dashboard/Share';
import WeatherTimeline from '../Dashboard/WeatherTimeline';
import OptionsPopup from '../Dashboard/OptionsPopup';
import TimelineOptions from '../Dashboard/TimelineOptions';
import {
  getWeatherForecastFromAddressOrLatLong,
  getTomorrowWeatherForecastFromAddressOrLatLong,
  getWeeklyWeatherForecastFromAddressOrLatLong,
} from '../../libs/dashboardForecast';
import { saveLocation } from '../../libs/savedLocations';

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

  const showToast = () => {
    setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 5000);
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

  const selectIcon = (main) => {
    if (main?.toLowerCase().includes('sun')) {
      return '/dashboard/sunny.png';
    } if (main?.toLowerCase().includes('rain')) {
      return '/dashboard/rain.png';
    }
    return '/dashboard/cloudy.png';
  };

  return (
    <div className="relative">
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
        <div className="flex flex-col w-full gap-10">
          <div className="relative w-full">
            <div className="flex gap-4 p-5 bg-[var(--d-bg)]">
              <h1 className="text-lg font-bold md:text-2xl">
                {currentLocation || `${t('fetchingdata')}`}
              </h1>
              <div className="flex items-center">
                <div className="relative">
                  {!showPopup && (
                    <button
                      title="open"
                      type="button"
                      className="pt-2 btn btn-ghost btn-circle"
                      onClick={() => setShowPopup(true)}
                    >
                      <TfiAngleDown />
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
            <section className="flex flex-col md:flex-row gap-4 px-5 bg-[var(--d-bg)] md:gap-7 lg:mt-14">
              <span className="flex items-center h-auto lg:w-28">
                <img src={selectIcon(currentWeather.main)} alt={currentWeather.main} className="object-cover" />
              </span>
              <div className="flex flex-col gap-4">
                <p className="uppercase">{t('today')}</p>
                <p className="text-2xl font-bold md:text-7xl">{t(currentWeather?.main?.replace(' ', '').toLowerCase()) || 'Light rain'}</p>
                <p className="text-sm font-bold md:text-4xl opacity-80">
                  {`${formatTime(currentWeather.datetime)} ${t('to')} ${formatTime(currentWeather.end_datetime)}`}
                </p>
                <span className="px-8 py-2 font-semibold text-base rounded-[40px] border border-gray-400 bg-[var(--d-bg)] w-max flex items-center gap-2 opacity-90 mt-2">
                  {currentWeather.risk !== 'None' && (
                    <IoMdAlert className="text-red-500" />
                  )}
                  <p>{t(currentWeather?.risk?.replace(' ', '').toLowerCase())}</p>
                </span>
              </div>
            </section>
          </div>
          <section
            id="timeline-forecast"
            className="px-2 py-5 my-5 rounded-lg shadow-lg md:px-10 md:my-0 md:min-h-[650px] md:overflow-y-auto relative hidden lg:block max-w-2xl lg:min-w-[450px] md:max-h-[calc(100vh-250px)]"
          >
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm font-bold md:text-xl">{t(currentTimeline.replace(' ', '').toLowerCase())}</p>
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
      <Share
        popup={showShare}
        setPopup={setShowShare}
        currentLocation={currentLocation}
        currentWeather={currentWeather}
        time={time}
        formatTime={formatTime}
      />
    </div>
  );
}
