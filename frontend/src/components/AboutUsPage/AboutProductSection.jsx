import React from 'react';
import { Link } from 'react-router-dom';
import Phone from './aboutphone.png'
import './AboutUs.css';

function AboutProductSection() {
  return (
    <div className=" font-Outfit">
      <div className="container mx-auto ">
        <h3 className="font-bold text-[#2B2A30] text-left  text-2xl sm:text-center md:text-3xl">Our Product Offering</h3>
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
            <Link to="/dashboard" className="font-normal py-3 px-5 bg-[#EF6820] text-white text-lg rounded-lg" type="button"> Get started → </Link>
          </div>

          <section id="about--mobile__app">
        <div className="about--mobile__container">
          <p className='about-mobile-go'>Go Mobile</p>
          <h3 className="about-mobile-text2">
            Use the free Tropical weather app
          </h3>
          <p className='about-mobile-text3'>
            Explore the flexibility and ease that comes with using our
            Tropical weather app on the go!
          </p>
          <div className='about__download_btn'>
            <img src="/app-store.png" alt="" className="app--store" />
            <img src="/google-play.png" alt="" className="app--store" />
          </div>
        </div>
            <div className='about-phone-container'>
              <img src={Phone} alt= "Phone" />
        </div>
          </section>
          {/* <section id="landing_download_app">
        <div className="landing_download_container">
          <p>Go Mobile</p>
          <h3 className="landing_header_md"></h3> */}
        </div>
      </div>
    </div>
  );
}

export default AboutProductSection;
