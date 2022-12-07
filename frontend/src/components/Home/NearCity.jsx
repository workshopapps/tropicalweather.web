import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function NearCity({ city, state }) {
  return (
    <Link to={`/dashboard?city=${city},%20Nigeria`}>
      <article className="flex w-fit-content items-center p-2 gap-6">
        <img src="/Home/city.png" alt="" className="max-[350px]:w-[40px]" />
        <div>
          <p>{city}</p>
          <p className="text-[#565560]">{state}</p>
        </div>
      </article>
    </Link>
  );
}

NearCity.propTypes = {
  city: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
};
