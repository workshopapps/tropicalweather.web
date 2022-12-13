import React from 'react';
import PropTypes from 'prop-types';
import { RxBookmark } from 'react-icons/rx';
import { BsShare } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';

export default function OptionsPopup({ display, setPopup }) {
  const { t } = useTranslation(['dashboard']);
  return (
    <ul
      className={`${display ? 'grid grid-cols-1' : 'hidden'
        } p-3 shadow dropdown-content menu bg-base-100 rounded-2xl w-max absolute top-10 right-0 divide-y bg-[var(--d-bg)]`}
    >
      <li className="cursor-pointer hover:text-primary-btn">
        <button
          type="button"
          title="share"
          className="flex items-center gap-3 py-2 text-xl"
        >
          <RxBookmark className="text-xl" />
          <p className="text-base">
            {t('savecity')}
          </p>
        </button>
      </li>
      <li className="cursor-pointer hover:text-primary-btn">
        <button
          type="button"
          title="share"
          className="flex items-center gap-3 py-2 text-sm"
          onClick={() => {
            setPopup(true);
          }}
        >
          <BsShare className="text-xl" />
          <p className="text-base">
            {t('share')}
          </p>
        </button>
      </li>
    </ul>
  );
}

OptionsPopup.propTypes = {
  display: PropTypes.bool.isRequired,
  setPopup: PropTypes.func.isRequired,
};
