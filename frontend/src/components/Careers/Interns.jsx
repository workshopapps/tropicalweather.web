import React from 'react';
import PropTypes from 'prop-types';

export default function Interns({ position, location }) {
  return (
    <>
      <li className="career_flex">
        <p className="small">{position}</p>
        <p className="small">{location}</p>
        <div className="career_arrow">
          <p>Apply</p>
          <img
            src="/assets/careers/arrow.svg"
            alt="arrow pointing right"
            className="arrow"
          />
        </div>
      </li>
    </>
  );
}
Interns.propTypes = {
  position: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
};
