export default function BusinessWeatherForm() {
  return (
    <div className="WeatherForm mt-14 md:mt-24 mb-24 px-4 md:px-14">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="container mx-auto text-center md:text-left pt-0 md:pt-24 pr-0 md:pr-8 md:mr-0   ">
          <p className="text-xl text-[#EF6820]">Partner</p>
          <p className="text-3xl">Get Started</p>
          <p className="text-base text-center md:text-left text-[#565560]">
            Contact us to find the right plan and price for your business
          </p>
        </div>
        <form action="" className="md:ml-0 ml-0 lg:ml-0">
          <div className=" flex flex-col md:flex-row mt-10 md:mt-0 ml-4 md:ml-0">
            <div>
              <label htmlFor="name">Full Name</label>
              <br />
              <input type="text" placeholder="Doe Mavis" />
            </div>
            <div className="ml-0 md:ml-8 mt-4 md:mt-0">
              <label htmlFor="name">I Work in...</label>
              <br />
              <input type="text" placeholder="Industry Type" />
            </div>
          </div>
          <div className=" flex flex-col md:flex-row mt-4 md:mt-12 ml-4 md:ml-0">
            <div>
              <label htmlFor="name">Company Name</label>
              <input type="text" placeholder="e.g : facebook" />
            </div>
            <div className="mt-4 md:mt-0">
              <label htmlFor="name">Company Size</label>
              <br />
              <input type="text" placeholder="e.g : 10 - 500" />
            </div>
          </div>
          <div className=" flex flex-col md:flex-row  mt-4 md:mt-12 ml-4 md:ml-0">
            <div>
              <label htmlFor="name">Company Email</label>
              <br />
              <input type="text" placeholder="yourname@company.com" />
            </div>
            <div className="mt-4 md:mt-0 ml-0 md:ml-8">
              <label htmlFor="name">Location</label>
              <br />
              <input type="text" placeholder="e.g : London" />
            </div>
          </div>
          <p className="text-base text-[#565560] text-left mt-4 ml-4 mb-10 md:mb-16">
            Weathery is committed to protecting and respecting your privacy, and
            we’ll only use your personal information to administer your account
            and to provide the products and services you requested from us.
          </p>
          <button className="" type="button">Submit</button>
        </form>
      </div>
    </div>
  );
}
