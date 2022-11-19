import farm from '../../assets/weatherBusinessImgs/farm.png';

export default function BusinessOverviewSection() {
  return (
    <div className="">
      <div className="bg-[#FDEAD7]">
        <section className="container text-left space-y-8 ml-2 md:ml-12  ">
          <p className="pt-8 text-[#EF6820] text-2xl">Overview</p>
          <h1 className="text-xl md:text-3xl pb-12 ">
            PROTECT YOUR FARM WITH WEATHERY PROTECTOR
          </h1>
        </section>
        <div className="container mx-auto">
          <img className="" src={farm} alt="" />
        </div>
      </div>
    </div>
  );
}
