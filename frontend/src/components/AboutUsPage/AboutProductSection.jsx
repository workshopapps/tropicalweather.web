import React from 'react';

function AboutProductSection() {
  return (
    <div className="py-10 font-Outfit">
      <div className="container mx-auto ">
        <h3 className="font-bold text-[#2B2A30] text-center text-2xl md:text-3xl">Our Product Offering</h3>
        <div className="pt-4 md:w-1/2">
          <div className="flex gap-4 py-5">
            <div className="text-[#EF6820] font-bold text-xl md:text-2xl">01.</div>
            <div className="text-[#2B2A30] font-bold text-xl md:text-2xl">User Prediction</div>
          </div>
          <p className="text-[#82808F] text-sm md:text-lg">
            Our generous community of weather enthusiasts share real-time data
            from their respective locations,providing us with extensive data
            about the weather at these locations. The accuracy of User Prediction
            is verified first by an up-vote and down-vote feature, and then
            by our experts.
          </p>
        </div>

        <div className="flex justify-end">
          <div className="pt-4 md:w-1/2">
            <div className="flex gap-4 py-5">
              <div className="text-[#EF6820] font-bold text-xl md:text-2xl">02.</div>
              <div className="text-[#2B2A30] font-bold text-xl md:text-2xl">Accurate Data</div>
            </div>
            <p className="text-[#82808F] text-sm md:text-lg">
              The significant amount of weather data we collect becomes meaningful
              only when combined with the scientific expertise provided by our team
              of experts.  Our meteorologists and  climatologists offer valuable
              insight into the science behind the data, as well as the
              relationship between climate and weather change.
            </p>
          </div>
        </div>

        <div className="pt-4 md:w-1/2">
          <div className="flex gap-4 py-5">
            <div className="text-[#EF6820] font-bold text-xl md:text-2xl">03.</div>
            <div className="text-[#2B2A30] font-bold text-xl md:text-2xl">User Experience</div>
          </div>
          <p className="text-[#82808F] text-sm md:text-lg">
            We have invested a lot of time and energy into the design of our products across all
            digital platforms, especially in a world where so much data is consumed on the small
            screen of a mobile phone. We designed a user experience to help you find as much
            weather data as you need as quickly as possible.
          </p>
        </div>
        <div>
          <div className="flex justify-center pt-5 md:py-10 ">
            <button className="font-normal py-3 px-5 bg-[#EF6820] text-white text-lg rounded-lg" type="button">Get Started → </button>
          </div>

          <div className="rounded-xl  bg-[#FDEAD7]">
            <div className="container flex flex-col-reverse items-center px-4 mx-auto md:pl-12 lg:flex-row md:gap-12 mt-14 lg:mt-28 font-Outfit md:pr-0">
              {/* --content- */}
              <div className="flex flex-col flex-1 py-5 lg:items-start">
                <p className="font-normal  text-[#EF6820] leading-5 text-xs md:text-base tracking-wide text-start mb-6">GO MOBILE</p>
                <p className="text-[#161518] font-bold text-2xl md:text-4xl mb-4 text-start">Use the free  Weathery app</p>
                <p className="text-[#565560] text-lg font-normal mb-4 text-start">Explore the flexibility and ease that comes with using our Weatherly app on the go!</p>
                {/* --button- */}
                <div className="flex justify-around md:justify-evenly gap-4">
                  <div>
                    <img
                      src="/app-store.png"
                      alt="ap store"
                      className="cursor-pointer"
                    />
                  </div>
                  <div>
                    <img
                      src="/google-play.png"
                      alt="play store"
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </div>
              {/* --image- */}
              <div className="flex justify-center flex-1 overflow-hidden">
                <img
                  src="AboutAsset/Group 275.png"
                  alt=""
                  className="hidden w-5/6 md:block h-5/6 sm:h-3/4 md:w-full md:h-full lg:h-full lg:w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutProductSection;
