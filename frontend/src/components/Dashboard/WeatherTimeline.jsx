import React from 'react';
import moment from 'moment/moment';
import PropTypes from 'prop-types';
import { VscCircleOutline } from 'react-icons/vsc';

export default function WeatherTimeline({ timelineData }) {
  function selectIcon(main) {
    if (main.toLowerCase().includes('sun')) {
      return '/dashboard/sunny.png';
    } if (main.toLowerCase().includes('rain')) {
      return '/dashboard/rain.png';
    }
      return '/dashboard/cloudy.png';
  }

  const formatTime = (time) => moment(time).format('h:mm a');

  const lastIndex = timelineData.length - 1;

  return (
    <>
      {
        timelineData.length > 0 ? (
          timelineData.map((day, index) => (
            <div className="flex items-start justify-between mb-3" key={day.datetime}>
              <div className="flex gap-2">
                <span className="w-20">{formatTime(day.datetime)}</span>
                <div className="flex flex-col items-center gap-4">
                  <VscCircleOutline className="text-2xl text-gray-600" />
                  <div className={`w-0.5 h-20 bg-gray-600 line ${index === lastIndex ? 'hidden h-0' : ''}`} />
                </div>
                <div className="flex flex-col">
                  <span>{day.main}</span>
                  <span>{day.risk}</span>
                </div>
              </div>
              <img src={selectIcon(day.main)} alt={day.main} className="object-contain h-auto" />
            </div>
          ))
        ) : (
          <p className="text-xl font-semibold">
            Data is not available for this location yet..
          </p>
        )
      }
    </>
  );
}

WeatherTimeline.propTypes = {
  timelineData: PropTypes.arrayOf(PropTypes.shape({
    datetime: PropTypes.string.isRequired,
    main: PropTypes.string.isRequired,
    risk: PropTypes.string.isRequired,
  })).isRequired,
};
