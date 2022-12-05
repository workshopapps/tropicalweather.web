import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineHome, AiOutlineShareAlt } from 'react-icons/ai';
import { BsBell } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Share from '../share/Share_popup';

export default function OptionsPopup({ display }) {
  const [popup, setPopup] = useState(0);
  return (
    <ul
      className={`${display ? 'grid grid-cols-1' : 'hidden'
        } p-3 shadow dropdown-content menu bg-base-100 rounded-box w-52 absolute top-10 right-0 divide-y`}
    >
      <li className="flex items-center gap-2 py-2 cursor-pointer hover:text-primary-btn">
        <AiOutlineHome className="text-xl" />
        <p>Home</p>
      </li>
      <li className="flex items-center gap-2 py-2 cursor-pointer hover:text-primary-btn">
        <button
          type="button"
          aria-label="share"
          className="text-xl flex flex-direction:row items-center gap-2 py-2"
          onClick={() => {
            setPopup(!popup);
          }}
          to=""
        >
          <AiOutlineShareAlt className="text-xl" />
          <p>Share</p>
        </button>
        <Share popup={popup} setPopup={setPopup} />
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
      <li>
        <Link to="/settings" className="flex items-center gap-2 py-2 cursor-pointer hover:text-primary-btn">
          <FiSettings className="text-xl" />
          <p>Settings</p>
        </Link>
      </li>
    </ul>
  );
}

OptionsPopup.propTypes = {
  display: PropTypes.bool.isRequired,
};
