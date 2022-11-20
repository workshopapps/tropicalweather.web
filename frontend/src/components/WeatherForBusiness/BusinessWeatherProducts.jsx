export default function BusinessWeatherProducts() {
  return (
    <div className="bg-[#2B2A30] p-5 weatheryBusinessProducts pb-20">
      <div>
        <h2 className="text-center text-3xl md:text-4xl font-bold text-white mb-10 mt-5">
          WeatheryBusiness
          <span className="text-[#F05513] text-3xl md:text-4xl"> Products</span>
        </h2>
      </div>
      <div className="flex flex-col md:flex-row justify-center md:justify-around align-center items-center">
        <div className="justify-center flex flex-col mr-0 md:mr-3 ">
          <p className="text-2xl md:text-xl lg:text-2xl font-semibold text-white text-center">Weather time Series</p>
          <p className="text-[#D0D0D5] text-center font-normal mt-2 mb-2">Hour-by-hour forecasts out to 15 days lead time.</p>
          <center><button type="button" className="text-white">Learn More</button></center>
        </div>
        <div className="justify-center flex flex-col mr-0 md:mr-3 mt-8 md:mt-0">
          <p className="text-2xl md:text-xl lg:text-2xl font-semibold text-white text-center">Weather TM 14 Day</p>
          <p className="text-[#D0D0D5] text-center font-normal mt-2 mb-2">For daily and fortnightly decision making.</p>
          <center><button type="button" className="text-white">Learn More</button></center>
        </div>
        <div className="justify-center flex flex-col mr-0 md:mr-3 mt-8 md:mt-0">
          <p className="text-2xl md:text-xl lg:text-2xl font-semibold text-white text-center">Weather 12 Months</p>
          <p className="text-[#D0D0D5] font-normal text-center mt-2 mb-2">Imperative for hedging financial risk</p>
          <center><button type="button" className="text-white">Learn More</button></center>
        </div>
        <div className="justify-center flex flex-col mr-0 md:mr-2 mt-8 md:mt-0">
          <p className="text-2xl font-semibold text-white text-center">Weather Alerts</p>
          <p className="text-[#D0D0D5] text-center font-normal mt-2 mb-2">Plan your operations around whats&apos;s coming. </p>
          <center><button type="button" className="text-white">Learn More</button></center>
        </div>
      </div>
    </div>
  );
}
