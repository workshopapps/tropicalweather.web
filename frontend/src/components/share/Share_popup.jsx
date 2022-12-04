import React, { useState, useEffect } from 'react';
import '../../styles/Share.css';
import { useLocation } from 'react-router-dom';
import { useGeolocated } from 'react-geolocated';
import { GrClose } from 'react-icons/gr';
import axios from 'axios';
import PropTypes from 'prop-types';
import Sharemenu from './sharemenu';

export default function Share({ popup, setPopup }) {
  const APIURL = 'https://api.tropicalweather.hng.tech';
  const time = new Date().toLocaleTimeString();
  const [geoLocation, setGeoLocation] = useState({});
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [currentWeather, setCurrentWeather] = useState({});
  const { search } = useLocation();
  const finalApiEndpoint = `https://api.tropicalweather.hng.tech/location?lat=${latitude}&lon=${longitude}`;
  const [currentLocation, setCurrentLocation] = useState();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  useEffect(() => {
    const city = new URLSearchParams(search).get('city');
    setCurrentLocation(city);
  }, [search]);

  if (longitude !== '' && latitude !== '' && !currentLocation) {
    axios.get(finalApiEndpoint).then((response) => {
      setCurrentLocation(`${response.data.city}, ${response.data.state}`);
    });
  }

  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  });

  const getCurrentForecastFromLocation = async (location) => {
    const response = await fetch(
      `${APIURL}/weather/current?address=${location}`
    );
    const data = await response.json();
    setCurrentWeather(data);
  };

  useEffect(() => {
    if (coords) {
      const { latitude, longitude } = coords;
      setGeoLocation({ latitude, longitude });
      // getCurrentLocationFromCoords();
      getCurrentForecastFromLocation(currentLocation);
    }
  }, [coords]);

  return (
    <div className={` ${!popup ? 'share-close' : 'share-background'}`}>
      <div className="share-popup">
        <div className="relative  items-center w-full">
          <h1 className="share-share self-center">Share</h1>
          <GrClose onClick={() => setPopup(!popup)} className="absolute right-[0px] top-[0]" />
        </div>

        <div className="row1">
          <img src="/share/share-backIMG.png" alt="pop-up" className="share-img" />
          <div className="share-location">
            <h1 className="today-fore">TODAYS FORECAST</h1>
            <div className="share-state">
              <img src="/share/marker-pin-01.png" alt="pop-up" className="share-mark" />
              <p className="lagos-share">{currentLocation || 'Not Available'}</p>
              <img src="/share/div line.png" alt="pop-up" className="share-horline" />
              <img src="/share/ion_rainy-sharp.png" alt="pop-up" className="share-rain" />
            </div>
            <div className="share-time">
              <h2 className="share-heavy">{currentWeather.main || 'Not Available'}</h2>
              <p className="share-ptime">{time}</p>
            </div>
            <div className="share-risk">
              <img src="/share/Icon (3).png" alt="pop-up" className="share-alert" />
              <p className="share-arisk">{currentWeather.description || 'Data is not available'}</p>
            </div>
          </div>
        </div>
        <Sharemenu />
      </div>
    </div>
  );
}

Share.propTypes = {
  popup: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setPopup: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

};
