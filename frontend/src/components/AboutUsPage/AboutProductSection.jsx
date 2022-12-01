import React from 'react';

function AboutProductSection() {
  return (
    <div className=" py-[20px] font-Outfit">
      <div className="about-product-container mx-auto ">
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
          <div className="flex justify-center pt-5 py-[20px] md:py-10 ">
            <button className="font-normal py-3 px-5 bg-[#EF6820] text-white text-lg rounded-lg" type="button">Get Started → </button>
          </div>
          <section id="landing_download_app">
            <div className="landing_download_container">
              <p>Go Mobile</p>
              <h3 className="landing_header_md">
                Use the free Tropical weather app
              </h3>
              <p>
                Explore the flexibility and ease that comes with using our
                Weatherly app on the go!
              </p>
              <div>
                <img src="/app-store.png" alt="" />
                <img src="/google-play.png" alt="" />
              </div>
            </div>
            <div className="landing_phones_wrapper">
              <div className="landing_phones_container">
                <img src="/Home/phones.png" alt="" />
                <img src="/Home/phones.png" alt="" />
                <img src="/Home/phones.png" alt="" />
                <img src="/Home/phones.png" alt="" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default AboutProductSection;
