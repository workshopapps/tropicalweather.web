import React from 'react';
import PropTypes from 'prop-types';
// import { BsArrowRight } from 'react-icons/bs';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { AiOutlineDelete } from 'react-icons/ai';

export default function WeatherPreview({
  date,
  weather,
  description,
  location,
  remove,
}) {
  return (
    <div className="flex flex-col gap-2 py-4 min-w-[300px]">
      {date && (
        <span className="mb-2 text-sm font-bold capitalize md:text-xl">
          {date}
        </span>
      )}
      {location && (
        <div className="flex items-center justify-between justify-content">
          <div className="flex items-center gap-2 mb-2">
            <HiOutlineLocationMarker className="text-lg text-primary-btn" />
            <span className="text-sm font-bold capitalize md:text-xl">
              {location}
            </span>
          </div>
          <button
            type="button"
            onClick={() => remove(location)}
            className="bdr-50% p-2 rounded-full"
          >
            <AiOutlineDelete />
          </button>
        </div>
      )}
      <span className="pt-2 text-sm uppercase border-t border-gray-200">
        {weather}
      </span>
      <span className="text-xl md:text-2xl">{description}</span>
      {/* <button
        type="button"
        className="flex items-center gap-3 text-xs text-primary-btn w-max md:text-sm"
      >
        <span>View more info </span>
        <BsArrowRight />
      </button> */}
    </div>
  );
}

WeatherPreview.propTypes = {
  date: PropTypes.string,
  weather: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  location: PropTypes.string,
  remove: PropTypes.func,
};
