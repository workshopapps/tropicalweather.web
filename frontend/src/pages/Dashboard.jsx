/* eslint-disable no-console */
import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment/moment';
import { Link } from 'react-router-dom';
import { TfiAngleLeft } from 'react-icons/tfi';
import { BsShare, BsMap, BsHeart } from 'react-icons/bs';
import { AiFillCheckCircle } from 'react-icons/ai';
import axios from 'axios';
import Share from '../components/share/Share_popup';

import WeatherPreview from '../components/Dashboard/WeatherPreview';
import PopularLocation from '../components/Home/PopularLocation';
import { BsMap, BsHeart, BsThreeDotsVertical } from 'react-icons/bs';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { AiOutlineDelete } from 'react-icons/ai';
import useCity from '../hooks/useCity';
import WeatherTimeline from '../components/Dashboard/WeatherTimeline';
import OptionsPopup from '../components/Dashboard/OptionsPopup';

export default function Dashboard() {
  const APIURL = 'https://api.tropicalweather.hng.tech';
  const time = moment().format('h:mm a');
  const [savedLocations, setSavedLocations] = useState([]);
  const [toast, setToast] = useState(false);
  const [currentLocation, setCurrentLocation] = useState();
  const finalApiEndpoint = `https://api.tropicalweather.hng.tech/location?lat=${latitude}&lon=${longitude}`;
  const { search } = useLocation();
  const [popup, setPopup] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentLocation]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  useEffect(() => {
    const city = new URLSearchParams(search).get('city');
    setCurrentLocation(city);
  }, [search]);

  if (longitude !== '' && latitude !== '' && !currentLocation) {
    axios.get(finalApiEndpoint).then((response) => {
      setCurrentLocation(`${response.data.city}, ${response.data.state}`);
    });
  }

  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
  const [toast, setToast] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [coord, setCoord] = useState({ longitude: 0, latitude: 0 });
  const [timeline, setTimeline] = useState([
    {
      location: 'Abuja, Nigeria',
      main: 'Sunny',
      risk: 'Sunny with a high of 75F',
      datetime: '1:00PM',
    },
    {
      location: 'Kaduna, Nigeria',
      main: 'Scattered Rain',
      risk: 'Sunny with a high of 40C',
      datetime: '3:00 PM',
    },
    {
      location: 'Lagos, Nigeria',
      main: 'Sunny',
      risk: 'Sunny with a high of 75F',
      datetime: '6:00 PM',
    },
  ]);
  const [currentWeather, setCurrentWeather] = useState({});
  const currentLocation = useCity() || userLocation;

  const formatTime = (time) => moment(time).format('h:mm a');
  const getCurrentLocationFromCoords = async () => {
    // const { latitude, longitude } = coord;
    const response = await fetch(`${APIURL}/location?lat=${coord.latitude}&lon=${coord.longitude}`);
    console.log(response);
    const data = await response.json();
    const location = `${data.state}, ${data.city}`;
    setUserLocation(location);
  };
   console.log(coord);
  const getCurrentLocationWeather = async () => {
    // const { latitude, longitude } = coord;
    const response = await
      fetch(`${APIURL}/weather/forcast/extended?lat=${coord.latitude}&lon=${coord.longitude}`);
    const data = await response.json();
    setCurrentWeather(data.current);
    setTimeline(data.today_timeline);
    console.log(data);
  };

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  function success(pos) {
    // console.log(pos);
    const crd = pos.coords;
    console.log(crd.latitude);
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
    getCurrentLocationFromCoords();
    // getCurrentLocationWeather();
    console.log(coord);
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
    setSavedLocations(loc);
  };
  const showToast = (type) => {
    setToast(type);
    setTimeout(() => {
      setToast('');
    }, 3000);
  };
  const addLocation = async (location) => {
    if (savedLocations.some((loc) => loc.location === location)) return;
    // Update location in local storage and state
    const locs = savedLocations;
    locs.push(location);
    setSavedLocations(locs);
    localStorage.setItem('saved-locations', JSON.stringify(locs));
    showToast('SUCCESS');
  };

  const isSaved = savedLocations.some(
    (item) => item.location === currentLocation
  );
  return (
    <div className="relative px-4 md:px-16 text-grey-900">
      {toast !== '' ? (
        <div
          className="absolute p-1 bg-gray-200 rounded-lg"
          style={{
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'fit-content',
          }}
        >
          <p
            className="rounded-lg"
            style={{
              color: 'green',
              padding: '3px 20px',
              border: '1px solid green',
            }}
          >
            Location added to saved cities
          </p>
        </div>
      ) : null}
      <div className="pt-6">
        <Link to="/" className="items-center hidden mb-6 md:flex">
          <TfiAngleLeft className="mr-2 text-lg" />
          <span className="text-lg">Back</span>
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
                    onClick={() => addLocation(userLocation)}
                    className="flex items-center gap-2 text-primary-btn"
                  >
                    <BsHeart />
                    <span>Save city</span>
                  </button>
                )}
              </div>
            </div>
            <div>
              <div
                className="pt-6 text-white rounded-lg w-full max-w-5xl hero h-[400px] flex flex-col justify-around bg-primary-btn"
                style={{
                  background: `url('${process.env.PUBLIC_URL}/generic-space-background.jpg')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                <div className="flex justify-between px-6">
                  <span>{`Today . ${time} `}</span>
                  <button
                    type="button"
                    aria-label="share"
                    onClick={() => {
                    setPopup(!popup);
                  }}
                    to=""
                  >
                    <BsShare />
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
                <Share popup={popup} setPopup={setPopup} />
                <div className="px-6">
                  <p>{currentWeather.main || 'Data is not available yet'}</p>

              </div>
            </div>
            <div
              className="flex flex-col gap-4 px-5 py-8 rounded-lg shadow-lg hero"
            >
              <p>
                Today .
                <span className="uppercase">{` ${time}`}</span>
              </p>
              {/* <p className="text-4xl font-bold">{currentWeather.}</p> */}
              <p className="text-xl font-bold text-gray-600">
                {`${formatTime(currentWeather.datetime)} to ${formatTime(currentWeather.end_datetime)}`}
              </p>
              <p className="px-8 py-2 font-semibold text-sm text-gray-500 rounded-[40px] border border-gray-400 bg-[#D5F7FE]/10 w-max">
                {currentWeather.risk}
              </p>
            </div>
            <section id="saved-locations" className="mt-20">
              <div className="flex items-center justify-between w-full">
                <h2 className="text-2xl font-bold">Saved Locations</h2>
              </div>

              {savedLocations.length < 1 ? (
                <div className="flex flex-col items-center justify-center gap-3 py-12 mx-auto w-max md:py-20">
                  <BsMap className="text-3xl text-primary-btn" />
                  <h2 className="text-2xl font-bold">No Location saved yet</h2>
                  <p>You can save a location to view the details later</p>
                </div>
              ) : (
                <div className="flex flex-col justify-start gap-10 my-10">
                  {savedLocations.map((location) => (
                    <div className="flex items-center justify-between gap-2 p-4 rounded-lg shadow-md" key={location}>
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
            <p className="mb-4 text-xl font-bold">Today</p>
            {timeline.length > 0 ? (
              timeline.map((day, index) => (
                <WeatherTimeline
                  risk={day.risk}
                  datetime={day.datetime}
                  main={day.main}
                  key={day.datetime}
                  last={index === timeline.length - 1}
                />
              ))) :
              <p className="text-xl font-semibold">No weather data available yet</p>}
          </section>
        </div>
      </div>
    </div>
  );
}
