import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import { AiOutlineDelete } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';

import BASEURL from '../../constants';
import '../../styles/Home.css';

export default function PopularLocation({ location, bin, remove }) {
  const { data, isError, isFetching } = useQuery(
    ['popularlocation', { location }],
    () => axios.get(`${BASEURL}/weather/current/by-address?address=${location}`),
    { retry: 3 }
  );

  let response = { main: '', description: '' };
  if (data) {
    response = data.data;
  }

  const { t } = useTranslation(['home']);
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
        {isFetching ? <p className="landing_location_placeholder" style={{ color: 'gray', fontSize: '13px' }}>{t('updating')}</p> : null}
        {isError && !isFetching ? (
          <p className="landing_location_placeholder" style={{ color: 'red', fontSize: '15px' }}>{t('somethingwentwrong')}</p>
        ) : (
          <>
            <h5>{t(response.main.replace(' ', '').toLowerCase())}</h5>
            {/* <p>{t(response.description.replace(' ', '').toLowerCase())}</p> */}
            <Link
              to={`/dashboard?city=${location}`}
              className="landing_link_button"
            >
              {t('viewmoreinfo')}
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
