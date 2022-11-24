import React from 'react';
import PropTypes from 'prop-types';

export default function NearCity({ city, state }) {
  return (
    <article className="flex w-fit-content items-center p-2 gap-4">
      <img src="/Home/city.png" alt="" />
      <div>
        <p>{city}</p>
        <p className="text-[#565560]">{state}</p>
      </div>
    </article>
  );
}

NearCity.propTypes = {
  city: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
};
