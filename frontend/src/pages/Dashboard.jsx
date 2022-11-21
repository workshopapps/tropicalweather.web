import React from 'react';
import moment from 'moment/moment';
import { TfiAngleLeft } from 'react-icons/tfi';
import { BsShare, BsMap, BsHeart } from 'react-icons/bs';
import { FiAlertCircle } from 'react-icons/fi';
import { AiOutlinePlus } from 'react-icons/ai';
import { SlOptionsVertical } from 'react-icons/sl';
import WeatherForecast from '../components/Dashboard/WeatherForecast';
import WeatherPreview from '../components/Dashboard/WeatherPreview';

export default function Dashboard() {
  const time = new Date().toLocaleTimeString();
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

  const weather = [...threeDayForcast, ...threeDayForcast];

  return (
    <div className="px-4 md:px-16 text-grey-900">
      <div className="pt-6">
        <span className="items-center hidden mb-6 md:flex">
          <TfiAngleLeft className="mr-2 text-lg" />
          <span className="text-lg">Back</span>
        </span>
        <div className="flex flex-col justify-between w-full gap-10 md:flex-row">
          <div className="w-full">
            <div className="flex items-center md:justify-between">
              <h1 className="mb-5 text-2xl font-bold md:text-5xl">Lagos, Nigeria</h1>
              <div className="items-center hidden gap-6 lg:flex">
                <button type="button" className="flex items-center gap-4 text-primary-btn">
                  <BsHeart />
                  <span>Save city</span>
                </button>
                <SlOptionsVertical />
              </div>
            </div>

            <section id="weather-forecast" className="py-6 md:py-10 w-[300px] md:w-full">
              <ul className="flex gap-4 overflow-scroll">
                {weather.map((weather) => (
                  <li key={weather.date}>
                    <WeatherForecast
                      weather={weather.weather}
                      icon={weather.weather === 'Rain' ? '/dashboard/rain.png' : '/dashboard/sunny.png'}
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
                  <button type="button" aria-label="share"><BsShare /></button>
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
            <button type="button" className="flex items-center gap-4 p-3 border rounded-lg text-primary-btn border-primary-btn">
              <span>Add City </span>
              <AiOutlinePlus />
            </button>
          </div>

          {threeDayForcast.length < 1 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-12 mx-auto w-max md:py-20">
              <BsMap className="text-3xl text-primary-btn" />
              <h2 className="text-2xl font-bold">No Location saved yet</h2>
              <p>You can save a location to view the details later</p>
            </div>
          ) : (
            <div className="flex flex-wrap justify-start gap-4 py-12 md:justify-between">
              {threeDayForcast.map((day) => (
                <WeatherPreview
                  location={day.location}
                  weather={day.weather}
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
