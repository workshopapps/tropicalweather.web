import React from 'react';
import PropTypes from 'prop-types';
import { AiOutlineHome } from 'react-icons/ai';
import { BsBell, BsShare } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function OptionsPopup({ display, setPopup }) {
  return (
    <ul
      className={`${
        display ? 'grid grid-cols-1' : 'hidden'
      } p-3 shadow dropdown-content menu bg-base-100 rounded-box w-52 absolute top-10 right-0 divide-y bg-white`}
    >
      <li className="flex items-center gap-2 py-2 cursor-pointer hover:text-primary-btn">
        <AiOutlineHome className="text-xl" />
        <p>Home</p>
      </li>
      <li className="cursor-pointer hover:text-primary-btn">
        <button
          type="button"
          title="share"
          className="flex items-center gap-2 py-2 text-xl"
          onClick={() => {
            setPopup(true);
          }}
        >
          <BsShare className="text-xl" />
          <p className="text-base">Share</p>
        </button>
      </li>
      <li>
        <Link
          to="/notification-feeds"
          className="flex items-center gap-2 py-2 cursor-pointer hover:text-primary-btn"
        >
          <BsBell className="text-xl" />
          <p>Notifications</p>
        </Link>
      </li>
      <li className="flex items-center gap-2 py-2 cursor-pointer hover:text-primary-btn">
        <FiSettings className="text-xl" />
        <p>Settings</p>
      </li>
    </ul>
  );
}

OptionsPopup.propTypes = {
  display: PropTypes.bool.isRequired,
  setPopup: PropTypes.func.isRequired,
};
