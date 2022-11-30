import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import { AiOutlineDelete } from 'react-icons/ai';

import BASEURL from '../../constants';
import '../../styles/Home.css';

export default function PopularLocation({ location, bin, remove }) {
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
      <div className="landing_location_brief_header flex items-center justify-between justify-content gap-10">
        <div className="flex items-center gap-2 mb-2">
          <img src="/Home/Icon (1).svg" alt="" />
          <span className="text-sm font-bold capitalize md:text-xl">
            {location}
          </span>
        </div>
        {bin && (
          <button
            type="button"
            onClick={() => remove(location)}
            className="bdr-50% p-2 rounded-full"
          >
            <div className="mt-[-5px]">
              <AiOutlineDelete />
            </div>
          </button>
        )}
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
  bin: PropTypes.bool,
  remove: PropTypes.func,
};
