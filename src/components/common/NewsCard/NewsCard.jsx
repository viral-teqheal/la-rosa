import React from "react";
import FounderImageFirst from "../../../assets/news.png";
import FounderImageSecond from "../../../assets/newsfirst.png";
import FounderImageThird from "../../../assets/newssecond.png";
import righta from "../../../assets/lefta.png";
import lefta from "../../../assets/righta.png";
import sideArrowRed from "../../../assets/sideArrowRed.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

const NewsCard = () => {
  const ClientSliderData = [
    {
      id: 1,
      clientImage: FounderImageFirst,
      name: "Spain",
      home: "Stockwell Valley",
      content: "A property description is the written portion of a real estate listing that describes the details of a home for sale or lease. Descriptions account for roughly one-third of a listing and are accompanied by property information (i.e. the number of bedrooms) and photographs. The goal of a creative property description is to attract home buyers. Listing descriptions need colorful words to paint a clear mental picture of a home’s features and benefits, over and above the accompanying photographs."
    },
    {
      id: 2,
      clientImage: FounderImageSecond,
      name: "Europe",
      home: "Aqua Valley",
      content: "A property description is the written portion of a real estate listing that describes the details of a home for sale or lease. Descriptions account for roughly one-third of a listing and are accompanied by property information (i.e. the number of bedrooms) and photographs. The goal of a creative property description is to attract home buyers. Listing descriptions need colorful words to paint a clear mental picture of a home’s features and benefits, over and above the accompanying photographs."

    },
    {
      id: 3,
      clientImage: FounderImageThird,
      name: "Spain",
      home: "Poland Places",
      content: "A property description is the written portion of a real estate listing that describes the details of a home for sale or lease. Descriptions account for roughly one-third of a listing and are accompanied by property information (i.e. the number of bedrooms) and photographs. The goal of a creative property description is to attract home buyers. Listing descriptions need colorful words to paint a clear mental picture of a home’s features and benefits, over and above the accompanying photographs."
    },
    {
      id: 4,
      clientImage: FounderImageThird,
      name: "Poland",
      home: "Aqua Valley",
      content: "A property description is the written portion of a real estate listing that describes the details of a home for sale or lease. Descriptions account for roughly one-third of a listing and are accompanied by property information (i.e. the number of bedrooms) and photographs. The goal of a creative property description is to attract home buyers. Listing descriptions need colorful words to paint a clear mental picture of a home’s features and benefits, over and above the accompanying photographs."
    },
    {
      id: 5,
      clientImage: FounderImageFirst,
      name: "Europe",
      home: "Stockwell Valley",
      content: "A property description is the written portion of a real estate listing that describes the details of a home for sale or lease. Descriptions account for roughly one-third of a listing and are accompanied by property information (i.e. the number of bedrooms) and photographs. The goal of a creative property description is to attract home buyers. Listing descriptions need colorful words to paint a clear mental picture of a home’s features and benefits, over and above the accompanying photographs."
    },
  ];
  return (
    <>
      <div className="my-8 pt-12">
        <div className="flex justify-between">
          <h2 className="font-semibold xl:text-3xl lg:text-2xl md:text-xl text-lg  mb-2 text-[#262626]">
            Latest News
          </h2>
          <div className="flex my-auto mb-auto gap-2">
            <div>
              <img className="prevs cursor-pointer w-10  " src={righta} alt="" />
            </div>
            <img className="nexts cursor-pointer w-10" src={lefta} alt="" />
          </div>
        </div>
        <p className="lg:text-base text-sm text-[#737373]">
          A property description is the written portion of a real estate listing
          that describes the details of a home for sale or lease.
        </p>
      </div>
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          769: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
        modules={[Navigation]}
        navigation={{
          prevEl: ".prevs",
          nextEl: ".nexts",
        }}
      >
        <div className="">
          {ClientSliderData.map((e,ine) => (
            <SwiperSlide key={ine} >
              <div className="bg-white w-auto  rounded-md shadow-[6px_6px_10px_-5px_rgba(0,0,0,0.3)]" >
                <img className="p-2" src={e.clientImage} alt="img"></img>
                <div className="px-4">
                  <div className="text-[#E5002A] font-semibold py-2">{e.name}</div>
                  <div className="text-xl font-semibold py-2">{e.home}</div>
                  <div className="lg:text-base text-sm text-[#737373]">{e?.content?.substring(0, 183)}  . . .</div>
                  <div className="flex gap-1 text-[#E5002A] font-semibold py-3 cursor-pointer"><span>Read more</span><img className="p-1" src={sideArrowRed} alt="img" /></div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </>
  );
};

export default NewsCard;
