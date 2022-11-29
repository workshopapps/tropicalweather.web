import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

import '../styles/Home.css';

export default function PopularLocation({ location, state, forecast }) {
  return (
    <article className="landing_location_brief">
      <div className="landing_location_brief_header">
        <img src="/Home/Icon (1).svg" alt="" />
        <h3>{location}</h3>
      </div>
      <div className="landing_location_body">
        <h5>{state}</h5>
        <p>
          {forecast}
        </p>
        <a href="/" className="landing_link_button">
          View more info →
        </a>
      </div>
    </article>
  );
}

PopularLocation.propTypes = {
  location: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  forecast: PropTypes.string.isRequired,
};
