import weatheryBusinessimg from '../../assets/weatherBusinessImgs/weatheryBusiness.svg';

export default function BusinessHeroSection() {
  return (
    <div className="">
      <div className="header">
        <div className="flex justify-between pt-96 space-x-4 ">
          <section className="ml-2 md:ml-16 mt-10">
            <div className="inline-flex ">
              <img src={weatheryBusinessimg} alt="" />
            </div>
            <h3 className="text-2xl text-white ml-0 md:ml-4">
              Weathery for
              <span><p className="font-bold text-2xl md:text-4xl">Business</p></span>
            </h3>
          </section>
          <section className="mt-10">
            <h3 className="mr-0 md:mr-10 text-white">
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
