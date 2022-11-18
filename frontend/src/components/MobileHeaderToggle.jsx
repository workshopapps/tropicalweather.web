import React from 'react';
import PropTypes from 'prop-types';

export default function MobileHeaderToggle({ handleToggle }) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-full border-grey-200 lg:hidden">
      <button
        type="button"
        className="flex flex-col items-end justify-between w-5 h-4"
        onClick={handleToggle}
      >
        <span
          className="w-full h-0.5 rounded-xl bg-black"
        />
        <span
          className="w-full h-0.5  rounded-xl bg-black"
        />
        <span
          className="w-full h-0.5 rounded-xl bg-black"
        />
      </button>
    </div>
  );
}

MobileHeaderToggle.propTypes = {
  handleToggle: PropTypes.func.isRequired,
};
