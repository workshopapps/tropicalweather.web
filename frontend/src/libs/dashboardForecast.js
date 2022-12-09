import BASEURL from '../constants';

const getWeatherForcastFromLatLong = async (latitude, longitude) => {
    const response = await fetch(`${BASEURL}/weather/forcast/extended?lat=${latitude}&lon=${longitude}`);
    const data = await response.json();
    return data;
};

const getTomorrowWeatherForcastFromLatLong = async (latitude, longitude) => {
    const response = await fetch(`${BASEURL}/weather/forecasts/tomorrow?lat=${latitude}&lon=${longitude}`);
    const data = await response.json();
    return data;
};

const getWeeklyWeatherForcastFromLatLong = async (latitude, longitude) => {
    const response = await fetch(`${BASEURL}/weather/weekly?lat=${latitude}&lon=${longitude}`);
    const data = await response.json();
    return data;
};

const getWeatherForcastFromAddress = async (address) => {
    const formatAdress = address.replace(',', '%2C');
    const response = await fetch(`${BASEURL}/weather/forcast/extended/by_address?address=${formatAdress}`);
    const data = await response.json();
    return data;
};

const getTomorrowWeatherForcastFromAddress = async (address) => {
    const formatAdress = address.replace(',', '%2C');
    const response = await fetch(`${BASEURL}/weather/forecasts/tomorrow/by-address?address=${formatAdress}`);
    const data = await response.json();
    return data;
};

const getWeeklyWeatherForcastFromAddress = async (address) => {
    const formatAdress = address.replace(',', '%2C');
    const response = await fetch(`${BASEURL}/weather/weekly/by-address?address=${formatAdress}`);
    const data = await response.json();
    return data;
};

const getWeatherForecastFromAddressOrLatLong = (
  address = null, latitude = null, longitude = null
) => {
  if (address) {
    return getWeatherForcastFromAddress(address);
  } if (latitude && longitude) {
    return getWeatherForcastFromLatLong(latitude, longitude);
  }
};

const getTomorrowWeatherForecastFromAddressOrLatLong = (
  address = null, latitude = null, longitude = null) => {
  if (address) {
    return getTomorrowWeatherForcastFromAddress(address);
  } if (latitude && longitude) {
    return getTomorrowWeatherForcastFromLatLong(latitude, longitude);
  }
};

const getWeeklyWeatherForecastFromAddressOrLatLong = (
  address = null, latitude = null, longitude = null) => {
  if (address) {
    return getWeeklyWeatherForcastFromAddress(address);
  } if (latitude && longitude) {
    return getWeeklyWeatherForcastFromLatLong(latitude, longitude);
  }
};

export {
  getWeatherForecastFromAddressOrLatLong,
  getTomorrowWeatherForecastFromAddressOrLatLong,
  getWeeklyWeatherForecastFromAddressOrLatLong,
};
