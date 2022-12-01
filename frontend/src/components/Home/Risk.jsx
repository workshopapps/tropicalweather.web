import React from 'react';
import PropTypes from 'prop-types';

export default function Risk({ time, day, risk, chances }) {
  return (
    <article
      className="flex justify-between items-center
     border-b-2 border-[rgba(220,219,224,0.4)] py-2"
    >
      <div className="flex items-center gap-4">
        <img src={`/Home/${risk.replace(' ', '-').toLowerCase()}.png`} alt="" />
        <div className="flex flex-col">
          <p className="text-[18px]">{risk}</p>
          <p className="text-[#565560]">{day}</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="text-[18px] font-medium">{chances}</p>
        <p className="text-[12px] text-[#565560]">{time}</p>
      </div>
    </article>
  );
}

Risk.propTypes = {
  chances: PropTypes.string.isRequired,
  day: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  risk: PropTypes.string.isRequired,
};
