import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';

import BASEURL from '../../constants';
import '../../styles/Home.css';

export default function PopularLocation({ location }) {
  const { data, isError, isFetching } = useQuery(
    [],
    () => axios.get(`${BASEURL}/weather/current?address=${location}`),
    { staleTime: 1000 * 60, retry: 3 }
  );

  let response = { main: '', description: '' };
  if (data) {
    response = data.data;
  }
  return (
    <article className="landing_location_brief">
      <div className="landing_location_brief_header">
        <img src="/Home/Icon (1).svg" alt="" />
        <h3>{location}</h3>
      </div>
      <div className="landing_location_body">
        {isFetching ? <p style={{ color: 'gray' }}>Updating...</p> : null}
        {isError && !isFetching ? (
          <p style={{ color: 'red' }}>Something went wrong</p>
        ) : (
          <>
            <h5>{response.main}</h5>
            <p>{response.description}</p>
            <Link
              to={`/dashboard?city=${location}`}
              className="landing_link_button"
            >
              View more info →
            </Link>
          </>
        )}
      </div>
    </article>
  );
}

PopularLocation.propTypes = {
  location: PropTypes.string.isRequired,
};
