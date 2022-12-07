import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import phone from '../aboutphone.png';
import MobileAdvert from '../MobileAdvert';

function AboutProductSection() {
  const { t } = useTranslation(['about']);
  return (
    <div className=" font-Outfit">
      <div className="container mx-auto ">
        <h3 className="font-bold text-[#2B2A30] text-center text-2xl md:text-3xl">{t('ourproductoffering')}</h3>
        <div className="pt-4 md:w-1/2">
          <div className="flex gap-4 py-5">
            <div className="text-[#EF6820] font-bold text-xl md:text-2xl">01.</div>
            <div className="text-[#2B2A30] font-bold text-xl md:text-2xl">{t('userprediction')}</div>
          </div>
          <p className="text-[#82808F] text-sm md:text-lg">{t('userpredictionbody')}</p>
        </div>

        <div className="flex justify-end">
          <div className="pt-4 md:w-1/2">
            <div className="flex gap-4 py-5">
              <div className="text-[#EF6820] font-bold text-xl md:text-2xl">02.</div>
              <div className="text-[#2B2A30] font-bold text-xl md:text-2xl">{t('accuratedata')}</div>
            </div>
            <p className="text-[#82808F] text-sm md:text-lg">{t('accuratedatabody')}</p>
          </div>
        </div>

        <div className="pt-4 md:w-1/2">
          <div className="flex gap-4 py-5">
            <div className="text-[#EF6820] font-bold text-xl md:text-2xl">03.</div>
            <div className="text-[#2B2A30] font-bold text-xl md:text-2xl">{t('userexperience')}</div>
          </div>
          <p className="text-[#82808F] text-sm md:text-lg">{t('userexperiencebody')}</p>
        </div>
        <div>
          <div className="flex justify-center pt-5 md:py-10 ">
            <Link to="/dashboard" className="font-normal py-3 px-5 bg-[#EF6820] text-white text-lg rounded-lg" type="button">{t('getstarted')}</Link>
          </div>

          <div className="rounded-xl  bg-[#FDEAD7]">
            <div className="container flex flex-col items-center px-4 mx-auto md:pl-12 lg:flex-row md:gap-12 mt-14 lg:mt-28 font-Outfit md:pr-0">
              {/* --content- */}
              <div className="flex flex-col flex-1 py-5 lg:items-start">
                <p className="font-normal  text-[#EF6820] leading-5 text-xs md:text-base tracking-wide text-start mb-6">{t('gomobile')}</p>
                <p className="text-[#161518] font-bold text-2xl md:text-4xl mb-4 text-start">{t('usetheapp')}</p>
                <p className="text-[#565560] text-lg font-normal mb-4 text-start">{t('exploretheapp')}</p>
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
                  src={phone}
                  alt=""
                  className=""
                />
              </div>
            </div>
          </div>
          {/* <MobileAdvert /> */}
        </div>
      </div>
    </div>
  );
}

export default AboutProductSection;
