import React from 'react';
import '../../styles/Share.css';
import { GrClose } from 'react-icons/gr';
import PropTypes from 'prop-types';
import Sharemenu from './ShareMenu';

export default function Share({ popup, setPopup, currentLocation, currentWeather, formatTime }) {
  return (
    <div className={` ${!popup ? 'share-close' : 'share-background'}`}>
      <div className="share-popup">
        <div className="relative items-center w-full">
          <h1 className="self-center share-share">Share</h1>
          <GrClose onClick={() => setPopup(!popup)} className="absolute right-[0px] top-[0px] cursor-pointer" />
        </div>

        <div className="row1">
          <img src="/share/share-backIMG.png" alt="pop-up" className="share-img" />
          <div className="share-location">
            <h1 className="today-fore">TODAY&apos;S FORECAST</h1>
            <div className="share-state">
              <img src="/share/marker-pin-01.png" alt="pop-up" className="share-mark" />
              <p className="lagos-share">{currentLocation || 'Fetching Location data...'}</p>
              <img src="/share/div line.png" alt="pop-up" className="share-horline" />
              {
                currentWeather.main?.toLowerCase().includes('sun')
                && <img src="/share/sunny.png" alt="pop-up" className="share-rain" />
              }
              {
                currentWeather.main?.toLowerCase().includes('cloudy')
                 && <img src="/share/cloudy (1).png" alt="pop-up" className="share-rain" />
              }
              {
                currentWeather.main?.toLowerCase().includes('rain')
                && <img src="/share/cloudy (1).png" alt="pop-up" className="share-rain" />
              }
              {
                currentWeather.main?.toLowerCase().includes('clear')
                && <img src="/share/clear.png" alt="pop-up" className="share-rain" />
              }
            </div>
            <div className="share-time">
              <h2 className="share-heavy">{currentWeather.main || 'Loading...'}</h2>
              <p className="share-ptime">{`${formatTime(currentWeather.datetime)} to ${formatTime(currentWeather.end_datetime)}`}</p>
            </div>
            <div className="share-risk">
              <img src="/share/Icon (3).png" alt="pop-up" className="share-alert" />
              <p className="share-arisk">{currentWeather.risk || 'please wait...'}</p>
            </div>
          </div>
        </div>
        <Sharemenu />
      </div>
    </div>
  );
}

Share.propTypes = {
  popup: PropTypes.bool.isRequired,
  setPopup: PropTypes.func.isRequired,
  currentLocation: PropTypes.string.isRequired,
  currentWeather: PropTypes.objectOf(PropTypes.string).isRequired,
  formatTime: PropTypes.func
};
