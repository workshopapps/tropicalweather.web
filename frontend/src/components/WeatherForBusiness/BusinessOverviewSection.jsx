import farm from '../../assets/weatherBusinessImgs/farm.png';

export default function BusinessOverviewSection() {
  return (
    <div className="">
      <div className="bg-[#FDEAD7] pb-16 px-16 md:px-0">
        <section className="container text-left space-y-8 ml-2 md:ml-20 lg:ml-20  ">
          <p className="pt-8 text-[#EF6820] text-2xl">Overview</p>
          <h1 className="text-xl md:text-3xl font-bold pb-12 ">
            PROTECT YOUR FARM &nbsp;
            <br className="block md:hidden lg:hidden" />
            WITH &nbsp;
            <br className="hidden md:hidden lg:block" />
            WEATHERY PROTECTOR
          </h1>
        </section>
        <div className="container mx-auto">
          <img className="" src={farm} alt="" />
        </div>
      </div>
    </div>
  );
}
