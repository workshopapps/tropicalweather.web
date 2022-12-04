import React from 'react';
import { useTranslation } from 'react-i18next';
import AirIndex from '../components/AirQualityComponents/AirIndex';
import AllPolutants from '../components/AirQualityComponents/AllPolutants';
import TodayAirQuality from '../components/AirQualityComponents/TodayAirQuality';
import WeatherCard from '../components/AirQualityComponents/WeatherCard';

function AirQuality() {
    const [show, setShow] = React.useState(false);
    const handleShow = () => {
        setShow(!show);
    };
    const handleKeyDown = () => {

    };

  const { t } = useTranslation(['aq']);
  return (
    <div className=" w-[90%] mx-auto">
      <h1 className="font-bold text-2xl mb-[2rem]">Lagos, Nigeria</h1>
      <div className="flex gap-[10px] mb-[30px] overflow-scroll">
        <WeatherCard weather="Sunny" src="Sunny.png" time="Now" />
        <WeatherCard weather="Rain" src="Heavy-rain.png" time="2:00PM" />
        <WeatherCard weather="Rain" src="Heavy-rain.png" time="3:00PM" />
        <WeatherCard weather="Rain" src="Heavy-rain.png" time="4:00PM" />
        <WeatherCard weather="Cloudy" src="Cloudy.png" time="5:00PM" />
        <WeatherCard weather="Cloudy" src="Cloudy.png" time="5:00PM" />
        <WeatherCard weather="Cloudy" src="Cloudy.png" time="5:00PM" />

      </div>
      <div className="grid grid-rows-10 md:grid-cols-3 md:grid-rows-none gap-[2rem] mb-[3rem]">
        <div className=" row-span-8 md:col-span-2 md:row-span-1">
          <TodayAirQuality />
          <div className=" bg-[#FEF2F2] mt-[3rem] p-[2rem] rounded-lg">
            <h1 className="font-bold mb-[2rem] text-2xl">{t('airpollutants')}</h1>
            <div className="grid">
              <div className="grid grid-rows-2 md:grid-cols-2 md:grid-rows-none">
                <AllPolutants src="95small.png" nam={`${t('pm2.5')}`} quantity={`${t('moderate')}`} amount="21.16ug/m3" />
                <AllPolutants src="2.png" nam={`${t('co')}`} quantity={`${t('good')}`} amount="628.34 ug/m3" />
              </div>
              <div className="w-[100%] h-[1px] bg-[gray] my-[2rem]" />
              <div className="grid grid-rows-2 md:grid-cols-2 md:grid-rows-none">
                <AllPolutants src="49.png" nam={`${t('no')}`} quantity={`${t('good')}`} amount="21.16ug/m3" />
                <AllPolutants src="20.png" nam={`${t('oz')}`} quantity={`${t('good')}`} amount="21.16ug/m3" />
              </div>
              <div className="w-[100%] h-[1px] bg-[gray] my-[2rem]" />
              <div className="grid grid-rows-2 md:grid-cols-2 md:grid-rows-none">
                <AllPolutants src="20.png" nam={`${t('pm10')}`} quantity={`${t('good')}`} amount="32.97ug/m3" />
                <AllPolutants src="2.png" nam={`${t('so')}`} quantity={`${t('good')}`} amount="2.33ug/m3" />
              </div>
              <div className="w-[100%] h-[1px] bg-[gray] my-[2rem]" />
            </div>
            <div className="flex items-center mt-[3rem]">
              <button type="button" onClick={handleShow} onKeyDown={handleKeyDown}>
                <img src="AirQuality/Info.png" alt="" />
              </button>
              <p className="">{`${t('aqi')}`}</p>
            </div>
          </div>
        </div>

        <div className="bg-[#FEF2F2] rounded-lg  py-[2rem] h-fit">
          <h1 className="font-bold  px-[1rem]">{`${t('features')}`}</h1>
          <div className="flex gap-[.7rem]">
            <img src="AirQuality/Notebook.png" alt="" />
            <div>
              <h1 className="p-[.5rem] bg-[#FDEAD7] text-[orange] font-bold w-fit rounded-lg mb-[.7rem] ">{`${t('features')}`}</h1>
              <p>{`${t('featuresbody')}`}</p>
            </div>
          </div>
        </div>

      </div>
      <AirIndex
        handleShow={show}
        changeVal={() => {
          setShow((prev) => !prev);
}}
      />
    </div>
  );
}

export default AirQuality;
