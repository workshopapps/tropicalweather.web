import React from 'react';
import PropTypes from 'prop-types';

AirIndex.propTypes = {
  handleShow: PropTypes.bool,
  changeVal: PropTypes.func,
};

function AirIndex({ handleShow, changeVal }) {
  const handleKeyDown = () => {

  };
    const classs = handleShow ? 'grid grid-cols-2 w-[40rem] bg-[#FEF2F2] p-[2rem] mb-[2rem]' : 'hidden';
  return (
    <div className={classs}>
      <div className="grid">
        <h1 className="font-bold">Levels</h1>
        <div className="flex items-center gap-[20px]">
          <div className="bg-[green] w-[10px] h-[10px] rounded-full" />
          <p>Good</p>
        </div>
        <div className="flex items-center gap-[20px]">
          <div className="bg-[#FCD34D] w-[10px] h-[10px] rounded-full" />
          <p>Moderate</p>
        </div>
        <div className="flex items-center gap-[20px]">
          <div className="bg-[#F87171] w-[10px] h-[10px] rounded-full" />
          <p>Unhealthy for sensitive groups</p>
        </div>
        <div className="flex items-center gap-[20px]">
          <div className="bg-[#DC2626] w-[10px] h-[10px] rounded-full" />
          <p>Unhealthy</p>
        </div>
        <div className="flex items-center gap-[20px]">
          <div className="bg-[#B91C1C] w-[10px] h-[10px] rounded-full" />
          <p>Very unhealthy</p>
        </div>
        <div className="flex items-center gap-[20px]">
          <div className="bg-[#7F1D1D] w-[10px] h-[10px] rounded-full" />
          <p>Hazardious</p>
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center">
          <h1 className="font-bold">Sources</h1>
          <button type="button" onClick={changeVal} onKeyDown={handleKeyDown}>
            <img src="AirQuality/close.png" alt="" className="cursor-pointer" />
          </button>
        </div>
        <p>
          Contains Copernicus Atmosphere Monitoring Service information
          2022 and/or modified Copernicus Atmosphere Monitoring Service information 2022
          Neither the European Commission nor ECMWF is responsible for any use of this information
        </p>

      </div>

    </div>
  );
}

export default AirIndex;
