import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGeolocated } from 'react-geolocated';
import { TfiAngleLeft } from 'react-icons/tfi';
import { BsShare, BsMap, BsHeart } from 'react-icons/bs';
import WeatherPreview from '../components/Dashboard/WeatherPreview';
import useCity from '../hooks/useCity';
import MyCurrentLocation from '../components/FullWeatherComponents/MyCurrentLocation';

export default function Dashboard() {
  const APIURL = 'https://api.tropicalweather.hng.tech';
  const time = new Date().toLocaleTimeString();
  const [savedLocations, setSavedLocations] = useState([]);
  const [toast, setToast] = useState('');
  const [geoLocation, setGeoLocation] = useState({});
  const [userLocation, setUserLocation] = useState(null);
  const [threeDayForcast, setThreeDayForcast] = useState([]);
  const [currentWeather, setCurrentWeather] = useState({});
  const currentLocation = useCity() || userLocation;

  const { coords } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
      },
      userDecisionTimeout: 5000,
    });

  const getCurrentLocationFromCoords = async () => {
    const { latitude, longitude } = geoLocation;
    const response = await fetch(`${APIURL}/location?lat=${latitude}&lon=${longitude}`);
    const data = await response.json();
    const location = `${data.state}, ${data.city}`;
    setUserLocation(location);
  };

  const getThreeDayForcast = async () => {
    const { latitude, longitude } = geoLocation;
    const response = await fetch(`${APIURL}/weather/forecasts?lat=${latitude}&lon=${longitude}`);
    const data = await response.json();
    setThreeDayForcast(data.splice(0, 3));
  };

  const getCurrentForecastFromLocation = async (location) => {
    const response = await fetch(`${APIURL}/weather/current?address=${location}`);
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
    if (!data || data.length === 0) {
      setSavedLocations(threeDayForcast);
      localStorage.setItem('saved-locations', JSON.stringify(threeDayForcast));
    } else {
      setSavedLocations(data);
    }
  }, []);

  const removeLocation = (location) => {
    const loc = savedLocations.filter((item) => item.location !== location);
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
    const response = await getCurrentForecastFromLocation(location);
    const locs = savedLocations;
    locs.push({
      location,
      weather: response.main,
      description: response.description,
    });
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
        <div className="flex flex-col justify-between w-full gap-10 md:flex-row">
          <div className="relative w-full">
            <div className="flex items-center mb-5 md:justify-between">
              <h1 className="text-2xl font-bold md:text-5xl">
                <MyCurrentLocation />
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
                      {currentWeather.description || 'Data is not available yet'}
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
              ))) :
              <p className="text-xl font-semibold">Loading...</p>}
          </section>
        </div>
        <section id="saved-locations" className="mt-20 md:mt-40">
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
            <div className="flex flex-wrap justify-start gap-10 py-12">
              {savedLocations.map((day) => (
                <WeatherPreview
                  location={day.location}
                  weather={day.weather}
                  remove={removeLocation}
                  key={day.location}
                  description={day.description}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
