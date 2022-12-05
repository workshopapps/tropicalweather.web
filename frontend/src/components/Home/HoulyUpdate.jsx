import React from 'react';
import PropTypes from 'prop-types';

export default function HourlyUpdate({ time, day, forecast }) {
  return (
    <article className="flex justify-between items-center border-b-2 border-[rgba(220,219,224,0.4)] py-2">
      <div>
        <p>{time}</p>
        <p className="text-[#565560]">{day}</p>
      </div>
      <div className="flex flex-col items-center">
        <img src={`/Home/${forecast.toLowerCase()}.png`} alt="" />
        <p className="text-[#565560]">{forecast}</p>
      </div>
    </article>
  );
}

HourlyUpdate.propTypes = {
  time: PropTypes.string.isRequired,
  day: PropTypes.string.isRequired,
  forecast: PropTypes.string.isRequired,
};
