export default function BusinessWeatherHowItWorks() {
  return (
    <div className="pb-16 md:pb-20 ">
      <div className="container space-y-6 mt-6 mb-8 pl-2 md:pl-10">
        <p className="font-semibold text-2xl text-[#EF6820]">Reliable</p>
        <p className="font-bold text-4xl">How it Works </p>
      </div>
      <div className="flex flex-col md:flex-row justify-center px-2">
        <div className="BusinessWorksCard1 pt-96">
          <br />
          <br />
          <br />
          <p className="text-white text-center text-4xl font-extrabold">
            Partner
          </p>
          <p className="text-white text-center">
            You can always trust weathery to provide you with the confidence you
            need to make vital decisions when weather threatens by utilizing our
            patented ‘weathery protector’ services with greater accuracy.
          </p>
        </div>
        <div className="BusinessWorksCard2 pt-96 mt-4 md:mt-0 mb-4 md:mb-0">
          <br />
          <br />
          <br />
          <p className="text-white text-center text-4xl font-extrabold">
            PREPARE
          </p>
          <p className="text-white text-center px-4">
            At Weathery, we will prepare you with safety plans and procedures
            created specifically for your company&apos;s needs. Our experts will work
            with you to help strengthen your business locations against weather
            dangers around-the-clock.
          </p>
        </div>
        <div className="BusinessWorksCard3 pt-96 px-0 md:px-8 lg:px-8">
          <br />
          <br />
          <br />
          <p className="text-white text-center text-4xl font-extrabold">
            PROTECT
          </p>
          <p className="text-white text-center">
            We keep you updated about the weather conditions. We provide the
            actionable insights you require to initiate your emergency plans,
            ensuring the safety of your personnel and assets at all times.
          </p>
        </div>
      </div>
    </div>
  );
}
