import React from 'react';
import PropTypes from 'prop-types';

WeatherCard.propTypes = {
  weather: PropTypes.string,
  src: PropTypes.string,
  time: PropTypes.string,
};

function WeatherCard({ weather, src, time }) {
  return (
    <div className="flex flex-col items-center justify-between h-[8rem] p-[.7rem] border rounded-md">
      <p>{weather}</p>
      <img src={src} alt="" />
      <p>{time}</p>
    </div>
  );
}

export default WeatherCard;
