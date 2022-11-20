import arrow from '../../assets/weatherBusinessImgs/ArrowUp.png';

export default function BusinessWeatherIndustries() {
  return (
    <div className="bg-[#2B2A30] pb-16 w-full pr-4">
      <div className="container mx-auto space-y-6 pt-16   ">
        <p className="text-[#EF6820] text-2xl">Industries</p>
        <p className="text-white font-bold text-3xl md:text-4xl  pb-10">
          Our Services Are Tailored For Your Business
        </p>
      </div>
      <div className="flex flex-col md:flex-row justify-center md:justify-around mb-4 ml-4 md:ml-4 lg:ml-4">
        <div className="WeatherIndustryCard space-y-6 max-w-full py-8 lg:px-6 md:px-0 px-0">
          <p className="text-white font-bold text-4xl mt-7 ml-3 md:ml-0 lg:ml-0">
            Manufacturing
          </p>
          <p className="text-white text-xl text-left ml-2">
            Our experts will work with you to help strengthen your business
            locations against weather threats 24/7 with safety plans and
            procedures tailored to your specific business needs.
          </p>
          <a href="/business" className="flex justify-end">
            <img className="pt-4 md:pt-16 lg:pt-4 mr-4 mb-4" src={arrow} alt="" />
          </a>
        </div>
        <div className="WeatherIndustryCard space-y-10 mt-4 md:mt-0 mb-4 md:mb-0 ml-0 md:ml-4 lg:ml-4 mr-0 md:mr-4 lg:mr-4 py-6 max-w-full px-0 md:px-0">
          <p className="text-white font-bold text-4xl mt-7 ml-2 px-10 md:px-0 lg:px-10 ">
            Retail
          </p>
          <p className="text-white text-xl ml-2 px-10 md:px-0 lg:px-10">
            Weathery for business helps position your inventory with the
            forecast.
          </p>
          <a href="/business" className="flex justify-end ">
            <img src={arrow} alt="" className="pt-24 md:pt-28 lg:pt-24 mt-0 md:mt-4 mr-4 mb-4" />
          </a>
        </div>
        <div className="WeatherIndustryCard space-y-10 py-6 max-w-full ">
          <p className="text-white font-bold text-4xl mt-7 ml-2 px-6 md:px-2">
            Financial Services
          </p>
          <p className="text-white text-xl ml-2 md:px-2 px-6 md:px-0">
            We help keep transactions and trades on track at branches, data
            centers, and call centers.
          </p>
          <a className="flex justify-end" href="/business">
            <img src={arrow} alt="" className="pt-20 md:pt-20 lg:pt-20 mr-4 mb-4" />
          </a>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center md:justify-around mb-4 ml-5 md:ml-4">
        <div className="WeatherIndustryCard space-y-6 py-8 max-w-full">
          <p className="text-white font-bold text-4xl mt-7 ml-2 px-6">
            Energy
          </p>
          <p className="text-white text-xl ml-2 px-6">
            At Weathery for Business, we help in optimizing asset deployment and
            allocations ahead of the storm.
          </p>
          <a href="/business" className="flex justify-end">
            <img className="pt-14 md:pt-20 lg:pt-14 mr-4 mb-4" src={arrow} alt="" />
          </a>
        </div>
        <div className="WeatherIndustryCard space-y-10 mt-4 md:mt-0 mb-4 md:mb-0 py-6 ml-0 md:ml-4 lg:ml-4 mr-0 md:mr-4 lg:mr-4 max-w-full">
          <p className="text-white font-bold text-4xl mt-7 ml-2 px-10">
            Insurance
          </p>
          <p className="text-white text-xl ml-2 px-10">
            Weathery for business provides proactive weather-related insights
            for your workforce.
          </p>
          <a href="/business" className="flex justify-end ">
            <img src={arrow} alt="" className="pt-16 mr-4 mb-4" />
          </a>
        </div>
        <div className="WeatherIndustryCard space-y-10 pt-10 max-w-full">
          <p className="text-white font-bold text-4xl mt-4 ml-2 px-8">
            Health Care
          </p>
          <p className="text-white text-xl ml-2 px-10">
            Weathery for business has a role to play in protecting your
            patients, staff and equipment.
          </p>
          <a className="flex justify-end" href="/business">
            <img src={arrow} alt="" className="pt-1 md:pt-6 lg:pt-16 mr-4 mb-4" />
          </a>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center md:justify-around ml-5 md:ml-4">
        <div className="WeatherIndustryCard space-y-6 pt-10 max-w-full">
          <p className="text-white font-bold text-4xl mt-7 ml-2 px-10">
            Import & Export
          </p>
          <p className="text-white text-xl ml-2 px-10 pt-10">
            Predict weather-related routing and supply chain interruptions and
            make plans for them.
          </p>
          <a href="/business" className="flex justify-end">
            <img src={arrow} alt="" className="pt-0 md:pt-4 lg:pt-24 mr-4 mb-4 " />
          </a>
        </div>
        <div className="WeatherIndustryCard space-y-10 mt-4 md:mt-0 mb-4 md:mb-0 pt-6 ml-0 md:ml-4 lg:ml-4 mr-0 md:mr-4 lg:mr-4 max-w-full">
          <p className="text-white font-bold text-4xl mt-7 ml-0 md:ml-0 lg:ml-4 px-10 lg:px-6 md:px-6 px-6 ">
            Forensic Meteorology
          </p>
          <p className="text-white text-xl ml-2 px-10">
            As part of our commitment to upholding your privacy, Weathery will
            only use the personal data we collect about you to carry out the
            orders you place with us and to administer your account.
          </p>
          <a href="/business" className="flex justify-end ">
            <img src={arrow} alt="" className="mb-8 mr-4" />
          </a>
        </div>
        <div className="WeatherIndustryCard space-y-10 pt-10 max-w-full">
          <p className="text-white font-bold text-4xl mt-7 ml-2 px-10">
            Mining
          </p>
          <p className="text-white text-xl ml-2 px-10">
            Designed to remove uncertainty from weather.
          </p>
          <a className="flex justify-end" href="/business">
            <img src={arrow} alt="" className=" pt-40 md:pt-60 lg:pt-40 mr-4 mb-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
