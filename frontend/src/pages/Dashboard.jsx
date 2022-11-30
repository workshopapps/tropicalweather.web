import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGeolocated } from 'react-geolocated';
import { TfiAngleLeft } from 'react-icons/tfi';
import { BsShare, BsMap, BsHeart } from 'react-icons/bs';
import { AiFillCheckCircle } from 'react-icons/ai';

import WeatherPreview from '../components/Dashboard/WeatherPreview';
import useCity from '../hooks/useCity';
import PopularLocation from '../components/Home/PopularLocation';

export default function Dashboard() {
  const APIURL = 'https://api.weathery.hng.tech';
  const time = new Date().toLocaleTimeString();
  const [geoLocation, setGeoLocation] = useState({});
  const [userLocation, setUserLocation] = useState(null);
  const [threeDayForcast, setThreeDayForcast] = useState([]);
  const [currentWeather, setCurrentWeather] = useState({});
  const [savedLocations, setSavedLocations] = useState([]);
  const [toast, setToast] = useState(false);
  const currentLocation = useCity() || userLocation;
  const scrollRef = useRef(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    scrollRef.current = true;
  }, [currentLocation]);

  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  });

  const getCurrentLocationFromCoords = async () => {
    const { latitude, longitude } = geoLocation;
    const response = await fetch(
      `${APIURL}/location?lat=${latitude}&lon=${longitude}`
    );
    const data = await response.json();
    const location = `${data.state}, ${data.city}`;
    setUserLocation(location);
  };

  const getThreeDayForcast = async () => {
    const { latitude, longitude } = geoLocation;
    const response = await fetch(
      `${APIURL}/weather/forecasts?lat=${latitude}&lon=${longitude}`
    );
    const data = await response.json();
    setThreeDayForcast(data.slice(0, 3));
  };

  const getCurrentForecastFromLocation = async (location) => {
    const response = await fetch(
      `${APIURL}/weather/current?address=${location}`
    );
    const data = await response.json();
    setCurrentWeather(data);
  };

  useEffect(() => {
    if (coords) {
      const { latitude, longitude } = coords;
      setGeoLocation({ latitude, longitude });
      getCurrentLocationFromCoords();
      getThreeDayForcast();
      getCurrentForecastFromLocation(currentLocation);
    }
  }, [coords]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('saved-locations'));
    if (!data) {
      setSavedLocations([]);
    } else {
      setSavedLocations(data);
    }
  }, []);

  // Check if location is saved
  const isSaved = savedLocations.some(
    (item) => item.location === currentLocation
  );

  const addLocation = async (location) => {
    if (isSaved) return;
    const locs = savedLocations;
    locs.push({
      location,
    });
    setSavedLocations(locs);
    localStorage.setItem('saved-locations', JSON.stringify(locs));
    showToast();
  };

  const showToast = () => {
    setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 3000);
  };

  const removeLocation = (location) => {
    const loc = savedLocations.filter((item) => item.location !== location);
    localStorage.setItem('saved-locations', JSON.stringify(loc));
    setSavedLocations(loc);
  };

  return (
    <div className="relative px-4 md:px-16 text-grey-900">
      {toast ? (
        <div
          className="flex items-center gap-3 absolute p-1 bg-gray-200 rounded-lg"
          style={{
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '10px 20px',
            width: 'fit-content',
            background: 'rgba(209, 250, 223, 0.1)',
            border: '1px solid #054F31',
          }}
        >
          <AiFillCheckCircle color="#054F31" />
          <p style={{ fontSize: '16px' }}>
            {`${currentLocation} has been added to saved locations`}
          </p>
        </div>
      ) : null}
      <div className="pt-6">
        <Link to="/" className="items-center hidden mb-6 md:flex">
          <TfiAngleLeft className="mr-2 text-lg" />
          <span className="text-lg">Back</span>
        </Link>
        <div className="flex flex-col justify-between w-full gap-10 md:flex-row">
          <div className="relative w-full">
            <div className="flex items-center mb-5 md:justify-between">
              <h1 className="text-2xl font-bold md:text-5xl">
                {currentLocation}
              </h1>
              <div className="items-center hidden gap-6 lg:flex">
                {isSaved ? null : (
                  <button
                    type="button"
                    onClick={() => addLocation(currentLocation)}
                    className="flex items-center gap-4 text-primary-btn"
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
                  <button type="button" aria-label="share">
                    <BsShare />
                  </button>
                </div>
                <div className="px-6">
                  <p>{currentWeather.main || 'Data is not available yet'}</p>

                  <div className="w-full max-w-[500px]">
                    <span className="text-4xl font-bold">
                      {currentWeather.description ||
                        'Data is not available yet'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <section id="three-day-forcast" className="">
            <p className="mb-4 text-xl font-bold">3 hour interval forecast</p>
            {threeDayForcast.length > 0 ? (
              threeDayForcast.map((day) => (
                <WeatherPreview
                  date={day.date}
                  description={day.description}
                  weather={day.main}
                  key={day.date}
                />
              ))
            ) : (
              <p className="text-xl font-semibold">Loading...</p>
            )}
          </section>
        </div>
        <section id="saved-locations" className="mt-20 md:mt-40">
          <div className="flex items-center justify-between w-full">
            <h2 className="text-2xl font-bold">Saved Locations</h2>
          </div>

          {savedLocations.length === 0 ? (
            <div className="flex flex-col items-center mx-auto gap-[10px] py-12 w-max md:py-20">
              <BsMap className="text-3xl text-primary-btn" />
              <h2 className="text-2xl font-bold">No Location saved yet</h2>
              <p>You can save a location to view the details later</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-[20px] py-12 w-max md:py-20 md:flex-row">
              {savedLocations.map((location) => (
                <PopularLocation
                  location={location.location}
                  key={location.location}
                  remove={removeLocation}
                  bin
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
