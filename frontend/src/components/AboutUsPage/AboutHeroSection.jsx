import React from 'react';

function AboutHeroSection() {
  return (
    <main>
      {/* --heroSection- */}
      <div className="">
        <div className="font-Outfit space-y-6">
          <p className="font-bold text-2xl md:text-6xl text-center text-[#2B2A30] md:px-32 md:pt-20 py-10">
            We combine cutting-edge weather technology with human insight to accurately
            forecast weather and improve lives
          </p>
        </div>
        <div className="">
          <img
            src="AboutAsset/Frame 33849.png"
            alt=""
            className="px-10 md:px-32"
          />
        </div>
      </div>
    </main>
  );
}

export default AboutHeroSection;
