import { useState, useEffect } from 'react';
import axios from 'axios';

function MyCurrentLocation() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [responseData, setResponseData] = useState([]);
  const { city, state } = responseData;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });

    const finalApiEndpoint = `https://api.tropicalweather.hng.tech/location?lat=${latitude}&lon=${longitude}`;

    axios.get(finalApiEndpoint).then((response) => {
      setResponseData(response.data);
    });
  }, [latitude, longitude]);

  return (
    <div>
      <h1>
        {city}
        ,
        {state}
      </h1>
    </div>
  );
}
export default MyCurrentLocation;
