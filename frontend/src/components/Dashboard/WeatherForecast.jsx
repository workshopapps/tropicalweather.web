import React from 'react';
import PropTypes from 'prop-types';

export default function WeatherForecast({ weather, icon, time }) {
  return (
    <div className="flex flex-col items-center w-20 gap-2 p-2 text-sm border border-white rounded hover:border-gray-400">
      <span>{weather}</span>
      <img src={icon} alt={weather} className="w-10 h-auto" />
      <span>{time}</span>
    </div>
  );
}

WeatherForecast.propTypes = {
  weather: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};
