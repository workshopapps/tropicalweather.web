export default function BusinessWeatherHowItWorks() {
  return (
    <div className="pb-16">
      <div className="container space-y-6 mt-6 mb-8 pl-2 md:pl-10">
        <p className="font-semibold text-2xl text-[#EF6820]">Reliable</p>
        <p className="font-bold text-4xl">How it Works </p>
      </div>
      <div className="flex flex-col md:flex-row justify-center container mx-auto">
        <div className="BusinessWorksCard1 pt-96">
          <br />
          <br />
          <br />
          <p className="text-white text-center text-4xl font-extrabold">Partner</p>
          <p className="text-white text-center">
            Trust us to provide you with the confidence to make critical
            decisions when weather threatens by leveraging our proprietary
            SkyGuard services with Superior Accuracy.
          </p>
        </div>
        <div className="BusinessWorksCard2 pt-96 mt-4 md:mt-0 mb-4 md:mb-0">
          <br />
          <br />
          <br />
          <p className="text-white text-center text-4xl font-extrabold">PREPARE</p>
          <p className="text-white text-center">
            Our experts work with you to help strengthen your business locations
            against weather threats 24/7 with safety plans and procedures
            tailored to your specific business needs.
          </p>
        </div>
        <div className="BusinessWorksCard3 pt-96">
          <br />
          <br />
          <br />
          <p className="text-white text-center text-4xl font-extrabold">PROTECT</p>
          <p className="text-white text-center">
            We provide the actionable insights you need to activate your
            emergency plans, ensuring your employees and assets are safe at all
            times.
          </p>
        </div>
      </div>
    </div>
  );
}
