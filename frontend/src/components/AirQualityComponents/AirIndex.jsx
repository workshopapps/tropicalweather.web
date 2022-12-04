import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

AirIndex.propTypes = {
  handleShow: PropTypes.bool,
  changeVal: PropTypes.func,
};

function AirIndex({ handleShow, changeVal }) {
  const handleKeyDown = () => {

  };

  const { t } = useTranslation(['aq']);
  const classs = handleShow ? 'grid grid-cols-2 w-[40rem] bg-[#FEF2F2] p-[2rem] mb-[2rem]' : 'hidden';
  return (
    <div className={classs}>
      <div className="grid">
        <h1 className="font-bold">{`${t('levels')}`}</h1>
        <div className="flex items-center gap-[20px]">
          <div className="bg-[green] w-[10px] h-[10px] rounded-full" />
          <p>{`${t('good')}`}</p>
        </div>
        <div className="flex items-center gap-[20px]">
          <div className="bg-[#FCD34D] w-[10px] h-[10px] rounded-full" />
          <p>{`${t('moderate')}`}</p>
        </div>
        <div className="flex items-center gap-[20px]">
          <div className="bg-[#F87171] w-[10px] h-[10px] rounded-full" />
          <p>{`${t('unhealthyforsg')}`}</p>
        </div>
        <div className="flex items-center gap-[20px]">
          <div className="bg-[#DC2626] w-[10px] h-[10px] rounded-full" />
          <p>{`${t('unhealthy')}`}</p>
        </div>
        <div className="flex items-center gap-[20px]">
          <div className="bg-[#B91C1C] w-[10px] h-[10px] rounded-full" />
          <p>{`${t('veryunhealthy')}`}</p>
        </div>
        <div className="flex items-center gap-[20px]">
          <div className="bg-[#7F1D1D] w-[10px] h-[10px] rounded-full" />
          <p>{`${t('hazardious')}`}</p>
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center">
          <h1 className="font-bold">{`${t('sources')}`}</h1>
          <button type="button" onClick={changeVal} onKeyDown={handleKeyDown}>
            <img src="AirQuality/close.png" alt="" className="cursor-pointer" />
          </button>
        </div>
        <p>{`${t('sourcesbody')}`}</p>

      </div>

    </div>
  );
}

export default AirIndex;
