import arrow from '../../assets/weatherBusinessImgs/ArrowUp.png';

export default function BusinessWeatherIndustries() {
  return (
    <div className="bg-[#2B2A30] pb-16">
      <div className="container mx-auto space-y-6 pt-16 ml-4 md:ml-12">
        <p className="text-[#EF6820] text-xl">Industries</p>
        <p className="text-white text-3xl pb-10">
          Our Services Are Tailored For Your Business
        </p>
      </div>
      <div className="flex flex-col md:flex-row justify-center md:justify-around mb-4 ml-5 md:ml-0">
        <div className="WeatherIndustryCard space-y-6 px-2 py-8">
          <p className="text-white font-bold text-4xl mt-7 ml-2">Manufacturing</p>
          <p className="text-white text-xl ml-2">
            Our experts work with you to help strengthen your business locations
            against weather threats 24/7 with safety plans and procedures
            tailored to your specific business needs.
          </p>
          <a href="/business" className="flex justify-end">
            <img className="pt-4 mr-4 mb-4" src={arrow} alt="" />
          </a>
        </div>
        <div className="WeatherIndustryCard space-y-10 mt-4 md:mt-0 mb-4 md:mb-0 ml-0 md:ml-4 lg:ml-0 mr-0 md:mr-4 lg:mr-0 py-6">
          <p className="text-white font-bold text-4xl mt-7 ml-2 px-10">Retail</p>
          <p className="text-white text-xl ml-2 px-10">Position your inventory with the forecast.</p>
          <a href="/business" className="flex justify-end ">
            <img src={arrow} alt="" className="pt-20 mr-4 mb-4" />
          </a>
        </div>
        <div className="WeatherIndustryCard space-y-10 py-6 ">
          <p className="text-white font-bold text-4xl mt-7 ml-2 px-10">Financial Services</p>
          <p className="text-white text-xl ml-2 px-10">Keep transactions and trades on schedule at branches, data and call centers.</p>
          <a className="flex justify-end" href="/business">
            <img src={arrow} alt="" className="pt-6 mr-4 mb-4" />
          </a>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center md:justify-around mb-4 ml-5 md:ml-0">
        <div className="WeatherIndustryCard space-y-6 py-8">
          <p className="text-white font-bold text-4xl mt-7 ml-2 px-10">Energy</p>
          <p className="text-white text-xl ml-2 px-10">
            Optimize asset deployment and allocations ahead of the storm.
          </p>
          <a href="/business" className="flex justify-end">
            <img className="pt-14 mr-4 mb-4" src={arrow} alt="" />
          </a>
        </div>
        <div className="WeatherIndustryCard space-y-10 mt-4 md:mt-0 mb-4 md:mb-0 py-6">
          <p className="text-white font-bold text-4xl mt-7 ml-2 px-10">Insurance</p>
          <p className="text-white text-xl ml-2 px-10">Proactive weather-related insightsfor your workforce.</p>
          <a href="/business" className="flex justify-end ">
            <img src={arrow} alt="" className="pt-10 mr-4 mb-4" />
          </a>
        </div>
        <div className="WeatherIndustryCard space-y-10 pt-10">
          <p className="text-white font-bold text-4xl mt-7 ml-2 px-10">Health Care</p>
          <p className="text-white text-xl ml-2 px-10">Protect your patients, staff and equipment.</p>
          <a className="flex justify-end" href="/business">
            <img src={arrow} alt="" className="pt-8 mr-4 mb-4" />
          </a>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center md:justify-around ml-5 md:ml-0">
        <div className="WeatherIndustryCard space-y-6 pt-10">
          <p className="text-white font-bold text-4xl mt-7 ml-2 px-10">Import & Export</p>
          <p className="text-white text-xl ml-2 px-10">
            Predict and plan for weather -related routing and supply chain disruptions.
          </p>
          <a href="/business" className="flex justify-end">
            <img src={arrow} alt="" className="pt-12 mr-4 mb-4 " />
          </a>
        </div>
        <div className="WeatherIndustryCard space-y-10 mt-4 md:mt-0 mb-4 md:mb-0 pt-6">
          <p className="text-white font-bold text-4xl mt-7 ml-2 px-10">Forensic Meteorology</p>
          <p className="text-white text-xl ml-2 px-10">Get expert witness testimony and past weather event verification.</p>
          <a href="/business" className="flex justify-end ">
            <img src={arrow} alt="" className=" mr-4 mb-4" />
          </a>
        </div>
        <div className="WeatherIndustryCard space-y-10 pt-10">
          <p className="text-white font-bold text-4xl mt-7 ml-2 px-10">Mining</p>
          <p className="text-white text-xl ml-2 px-10">Designed to take the guesswork out of weather.</p>
          <a className="flex justify-end" href="/business">
            <img src={arrow} alt="" className=" pt-14 mr-4 mb-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
