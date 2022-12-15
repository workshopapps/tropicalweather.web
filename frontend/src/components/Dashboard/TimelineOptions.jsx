import React from 'react';
import PropTypes from 'prop-types';
import { BsCalendar4Week, BsCalendar4Event } from 'react-icons/bs';
import { MdOutlineViewWeek } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

export default function TimelineOptions({ display, setTimeline }) {
  const { t } = useTranslation(['dashboard']);
  return (
    <div
      className={`${
        display ? 'grid grid-cols-1' : 'hidden'
      } p-3 shadow menu text-sm md:text-base rounded-lg w-max absolute z-[1000] top-10 left-0 divide-y bg-[var(--d-bg)]`}
    >
      <button
        type="button"
        title="today"
        className="flex items-center gap-2 py-2 cursor-pointer hover:text-primary-btn"
        onClick={() => {
          setTimeline('today');
        }}
      >
        <MdOutlineViewWeek className="text-xl" />
        <p>{t('today')}</p>
      </button>
      <button
        type="button"
        title="tomorrow"
        className="flex items-center gap-2 py-2 cursor-pointer hover:text-primary-btn"
        onClick={() => {
          setTimeline('tomorrow');
        }}
      >
        <BsCalendar4Event className="text-xl" />
        <p>{t('tomorrow')}</p>
      </button>
      <button
        type="button"
        title="weekly"
        className="flex items-center gap-2 py-2 cursor-pointer hover:text-primary-btn"
        onClick={() => {
          setTimeline('weekly');
        }}
      >
        <BsCalendar4Week className="text-xl" />
        <p>{t('thisweek')}</p>
      </button>
    </div>
  );
}

TimelineOptions.propTypes = {
  display: PropTypes.bool.isRequired,
  setTimeline: PropTypes.func.isRequired,
};
