import React from 'react';
import PropTypes from 'prop-types';

AllPolutants.propTypes = {
  src: PropTypes.string,
  nam: PropTypes.string,
  quantity: PropTypes.string,
  amount: PropTypes.string,
};

function AllPolutants({
 src, nam, amount, quantity,
}) {
  return (
    <div className="flex gap-[3rem] items-start">
      <img src={`AirQuality/${src}`} alt="" />
      <div className="grid gap-[1.5rem]">
        <p>{nam}</p>
        <p className="font-bold">{quantity}</p>
        <p>{amount}</p>
      </div>
    </div>
  );
}

export default AllPolutants;
