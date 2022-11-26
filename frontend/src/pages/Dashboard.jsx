import React, { useEffect, useState } from 'react';
import moment from 'moment/moment';
import { TfiAngleLeft } from 'react-icons/tfi';
import { BsShare, BsMap, BsHeart } from 'react-icons/bs';
import { FiAlertCircle } from 'react-icons/fi';
import { SlOptionsVertical } from 'react-icons/sl';
import WeatherForecast from '../components/Dashboard/WeatherForecast';
import WeatherPreview from '../components/Dashboard/WeatherPreview';
import useCity from '../hooks/useCity';

const threeDayForcast = [
  {
    location: 'Abuja, Nigeria',
    date: moment().add(1, 'days').calendar().split(' ')[0],
    weather: 'Sunny',
    description: 'Sunny with a high of 75F',
    time: '1:00PM',
  },
  {
    location: 'Kaduna, Nigeria',
    date: moment().add(2, 'days').format('ll'),
    weather: 'Rain',
    description: 'Sunny with a high of 40C',
    time: '3:00 PM',
  },
  {
    location: 'Lagos, Nigeria',
    date: moment().add(3, 'days').format('ll'),
    weather: 'Sunny',
    description: 'Sunny with a high of 75F',
    time: '6:00 PM',
  },
];

export default function Dashboard() {
  const time = new Date().toLocaleTimeString();
  const [savedLocations, setSavedLocations] = useState([]);
  const [toast, setToast] = useState('');
  const currentLocation = useCity();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('saved-locations'));
    if (!data || data.length === 0) {
      setSavedLocations(threeDayForcast);
      localStorage.setItem('saved-locations', JSON.stringify(threeDayForcast));
    } else {
      setSavedLocations(data);
    }
  }, []);

  const weather = [...threeDayForcast, ...threeDayForcast];

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
  const addLocation = (location) => {
    if (savedLocations.some((loc) => loc.location === location)) return;
    // Update location in local storage and state
    const locs = savedLocations;
    locs.push({
      location,
      date: moment().add(3, 'days').format('ll'),
      weather: 'Sunny',
      description: 'Sunny with a high of 75F',
      time: '6:00 PM',
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
          className="absolute p-1 rounded-lg bg-gray-200"
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
        <span className="items-center hidden mb-6 md:flex">
          <TfiAngleLeft className="mr-2 text-lg" />
          <span className="text-lg">Back</span>
        </span>
        <div className="flex flex-col justify-between w-full gap-10 md:flex-row">
          <div className="relative w-full">
            <div className="flex items-center md:justify-between">
              <h1 className="mb-5 text-2xl font-bold md:text-5xl">
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
                <SlOptionsVertical />
              </div>
            </div>

            <section
              id="weather-forecast"
              className="py-6 md:py-10 w-[300px] md:w-full"
            >
              <ul className="flex gap-4 overflow-scroll">
                {weather.map((weather) => (
                  <li key={weather.date}>
                    <WeatherForecast
                      weather={weather.weather}
                      icon={
                        weather.weather === 'Rain'
                          ? '/dashboard/rain.png'
                          : '/dashboard/sunny.png'
                      }
                      time={weather.time}
                    />
                  </li>
                ))}
              </ul>
            </section>
            <div>
              <div
                className="pt-6 text-white rounded-lg w-full max-w-5xl hero h-[549px] flex flex-col justify-between"
                style={{
                  background: `url('${process.env.PUBLIC_URL}/dashboard/weather.png')`,
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
                  <img src="/dashboard/rain-icon.png" alt="rain" />
                  <p>RAINY</p>

                  <div className="w-full max-w-[500px]">
                    <span className="text-4xl font-bold">
                      Expect rain and scattered thunderstorms by
                      <br />
                      12:00pm.
                    </span>
                  </div>
                </div>
                <div className="px-6 py-4 bg-black/50">
                  <span className="flex items-center">
                    Flooding risk
                    <FiAlertCircle className="ml-2 text-sm text-red-500" />
                  </span>
                  <p>Very High</p>
                </div>
              </div>
            </div>
          </div>
          <section id="three-day-forcast" className="">
            <p className="mb-4 text-xl font-bold">3 day forecast</p>
            {threeDayForcast.map((day) => (
              <WeatherPreview
                date={day.date}
                description={day.description}
                weather={day.weather}
                key={day.date}
              />
            ))}
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
