import React, { useState } from 'react';
import { KEY, WEATHER_API_URL } from '../components/FullWeatherComponents/api';
import CurrentWeather from '../components/FullWeatherComponents/CurrentWeather';
import Forecast from '../components/FullWeatherComponents/Forecast';
import FullWeatherSearchBar from '../components/FullWeatherComponents/FullWeatherSearch';
import '../styles/FullWeatherDetails.css';

export default function FullWeatherDetails() {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [currentForecast, setCurrentForecast] = useState(null);

    const handleOnSearchChange = (searchData) => {
        const [lat, lon] = searchData.value.split(' ');

        const currenWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${KEY}&units=metric`);
        const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${KEY}&units=metric`);

        Promise.all([currenWeatherFetch, forecastFetch])
        .then(async (response) => {
            const weatherResponse = await response[0].json();
            const forecastResponse = await response[1].json();

            setCurrentWeather({ city: searchData.label, ...weatherResponse });
            setCurrentForecast({ city: searchData.label, ...forecastResponse });
        })
        .catch((err) => console.log(err));
    };

  return (
    <div className=" w-[90%] mx-auto container">
      <h1 className="heading">Full Weather Details</h1>
      <FullWeatherSearchBar onSearchChange={handleOnSearchChange} />
      <div className="weather_details">
        {currentWeather && <CurrentWeather data={currentWeather} />}
        {currentForecast && <Forecast data={currentForecast} />}
      </div>
    </div>
  );
}
