import weatheryBusinessimg from '../../assets/weatherBusinessImgs/weatheryBusiness.svg';

export default function BusinessHeroSection() {
  return (
    <div className="">
      <div className="header">
        <div className="flex justify-between pt-40 md:pt-96 pb-12 md:pb-20 space-x-20 w-full h-full">
          <section className="ml-2 md:ml-16 mt-10">
            <div className="inline-flex ">
              <img src={weatheryBusinessimg} alt="" />
            </div>
            <h3 className="text-2xl text-white ml-0 md:ml-4">
              Weathery for
              <span><p className="font-extrabold text-white text-2xl md:text-4xl">Business</p></span>
            </h3>
          </section>
          <section className="mt-10">
            <h3 className="mr-0 md:mr-10 text-sm md:text-xl text-white">
              There&apos;s no luck in business. There&apos;s only drive,
              <br className="hidden md:block" />
              determination, and more drive.
            </h3>
            <p className="text-white mt-2">-Sophie turner</p>
          </section>
        </div>
      </div>

    </div>
  );
}
