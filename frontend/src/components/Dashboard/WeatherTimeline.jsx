import React from 'react';
import PropTypes from 'prop-types';
import { VscCircleOutline } from 'react-icons/vsc';

export default function WeatherTimeline({ main, datetime, risk, last }) {
  function selectIcon(main) {
    if (main.toLowerCase().includes('sun')) {
      return '/dashboard/sunny.png';
    } if (main.toLowerCase().includes('rain')) {
      return '/dashboard/rainy.png';
    }
      return '/dashboard/cloudy.png';
  }

  return (
    <div className="flex items-start justify-between mb-3">
      <div className="flex gap-2">
        <span className="w-10 text-right break-words">{datetime}</span>
        <div className="flex flex-col items-center gap-4">
          <VscCircleOutline className="text-2xl text-gray-600" />
          <div className={`w-0.5 h-20 bg-gray-600 line ${last ? 'hidden h-0' : ''}`} />
        </div>
        <div className="flex flex-col">
          <span>{main}</span>
          <span>{risk}</span>
        </div>
      </div>
      <img src={selectIcon(main)} alt={main} className="object-contain h-auto" />
    </div>
  );
}

WeatherTimeline.propTypes = {
  main: PropTypes.string.isRequired,
  datetime: PropTypes.string.isRequired,
  risk: PropTypes.string.isRequired,
  last: PropTypes.bool.isRequired,
};
