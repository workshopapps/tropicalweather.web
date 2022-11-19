import React from 'react';
import AirIndex from '../components/AirIndex';
import AllPolutants from '../components/AllPolutants';
import TodayAirQuality from '../components/TodayAirQuality';
import WeatherCard from '../components/WeatherCard';

function AirQuality() {
    const [show, setShow] = React.useState(false);
    const handleShow = () => {
        setShow(!show);
    };
    const handleKeyDown = () => {

    };
  return (
    <div>
      <h1 className="font-bold text-2xl">Lagos, Nigeria</h1>
      <div className="flex gap-[10px] mb-[30px] overflow-hidden">
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
            <h1 className="font-bold mb-[2rem] text-2xl">Air Pollutants</h1>
            <div className="grid">
              <div className="grid grid-rows-2 md:grid-cols-2 md:grid-rows-none">
                <AllPolutants src="95small.png" name="PM2.5 (Particulate matter less than 2.5 microns)" quantity="Moderate" amount="21.16ug/m3" />
                <AllPolutants src="2.png" name="CO (Carbon Monoxide)" quantity="Good" amount="628.34 ug/m3" />
              </div>
              <div className="w-[100%] h-[1px] bg-[gray] my-[2rem]" />
              <div className="grid grid-rows-2 md:grid-cols-2 md:grid-rows-none">
                <AllPolutants src="49.png" name="NO2(Nitrogen Dioxide)" quantity="Good" amount="21.16ug/m3" />
                <AllPolutants src="20.png" name="O3(Ozone)" quantity="Good" amount="21.16ug/m3" />
              </div>
              <div className="w-[100%] h-[1px] bg-[gray] my-[2rem]" />
              <div className="grid grid-rows-2 md:grid-cols-2 md:grid-rows-none">
                <AllPolutants src="20.png" name="PM10 (Particulate matter less than 10 microns)" quantity="Good" amount="32.97ug/m3" />
                <AllPolutants src="2.png" name="SO2 (Sulphur Dioxide)" quantity="Good" amount="2.33ug/m3" />
              </div>
            </div>
            <div className="flex items-center mt-[3rem]">
              <button type="button" onClick={handleShow} onKeyDown={handleKeyDown}>
                <img src="info.png" alt="" />
              </button>
              <p className="">Air Quality Index</p>
            </div>
          </div>
        </div>

        <div className="bg-[#FEF2F2] rounded-lg  py-[2rem] h-fit">
          <h1 className="font-bold  px-[1rem]">Stay Safe</h1>
          <div className="flex gap-[.7rem]">
            <img src="Notebook.png" alt="" />
            <div>
              <h1 className="p-[.5rem] bg-[#FDEAD7] text-[orange] font-bold w-fit rounded-lg mb-[.7rem] ">FEATURES</h1>
              <p>Featured stories, photo essays and more by Weathery</p>
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
