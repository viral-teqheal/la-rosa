import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import FounderImageFirst from "../../../assets/drem.png";
import FounderImageSecond from "../../../assets/drem1.png";
import FounderImageThired from "../../../assets/drem2.png";
import FounderImageFourt from "../../../assets/drem3.png";
import righta from "../../../assets/lefta.png";
import lefta from "../../../assets/righta.png";
import like from "../../../assets/like.svg";
import fullRedHeart from "../../../assets/fullRedHeart.png";
import heart from "../../../assets/heart_icon.png";
import location from "../../../assets/location.svg";
import icon from "../../../assets/icon.svg";
import icon1 from "../../../assets/icon1.svg";
import icon2 from "../../../assets/icon2.svg";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import axiosInstance from "../../../apiInstances/axiosInstance";
import { BACKEND_BASE_URL } from "../../../apiInstances/baseurl";
import { useNavigate } from "react-router-dom";
import axiosInstanceAuth from "../../../apiInstances/axiosInstanceAuth";
import HousePropertySlider from "./HousePropertySlider";

const Housecart = () => {
  const navigate = useNavigate();
  const [likeFlag, setLikeFlag] = useState(false);
  const [savePost, setSavedPost] = useState([]);
  const [clientSliderData, setClientSliderData] = useState([]);

  const savedProperty = () => {
    axiosInstanceAuth
      .post("/savedProperty", {
        status: "",
      })
      .then((res) => {
        setSavedPost(res?.data?.data);
      })
      .catch((err) => {
        //console.log(err);
      });
  };
  const newProperty = () => {
    axiosInstance
      .get(`/propaties`)

      .then((res) => {
        const myData = res?.data?.data;
        const arrData = myData?.map((e, i) => {
          return {
            id: e?._id,
            clientImage: e?.image,
            head: e?.heading,
            like: true,
            locations: location,
            place: e?.address,
            discription: e?.discription,
            iconWithCount: [
              {
                icon: icon,
                count: e?.Bedrooms,
              },
              {
                icon: icon1,
                count: e?.toilets,
              },
              {
                icon: icon2,
                count: e?.Bathrooms,
              },
            ],
          };
        });

        setClientSliderData(arrData);
        //console.log("🚀 ~ .then ~ arrData:", arrData);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    savedProperty();
    newProperty();
  }, []);

  const savedLocalPost = localStorage.getItem("Saved")?.split(",");
  return (
    <>
      <div className="my-8 ">
        <div className="flex justify-between lg:mx-40">
          <h2 className="font-semibold xl:text-3xl lg:text-2xl  md:text-xl text-lg text-[#262626]">
            New Properties for Sale
          </h2>
          <div className="flex my-auto mb-auto gap-2">
            <div>
              <img className="prev cursor-pointer w-10" src={righta} alt="" />
            </div>
            <div>
              <img className="next cursor-pointer w-10" src={lefta} alt="" />
            </div>
          </div>
        </div>
        {/* <p className="lg:text-base text-sm text-[#737373]">
          A property description is the written portion of a real estate listing
          that describes the details of a home for sale or lease.
        </p> */}
      </div>
      <div className="flex justify-center lg:mx-40">
        <Swiper
          loop={false}
          spaceBetween={20}
          slidesPerView={1}
          modules={[Navigation]}
          navigation={{
            prevEl: ".prev",
            nextEl: ".next",
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            // 1080: {
            //   slidesPerView: 4,
            //   spaceBetween: 30,
            // },
            1440: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1460: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
          }}
          className="w-[100%]"
        // onSwiper={(swiper) => //console.log(swiper)}
        // onSlideChange={() => //console.log("slide change")}
        >
          <div className="grid place-content-center ">
            {clientSliderData.map((e, index) => (
              <SwiperSlide key={index}>
                <HousePropertySlider e={e} savedLocalPost={savedLocalPost} />
                {/* <div className="my-3 bg-white rounded-xl w-auto p-2 shadow-[6px_6px_10px_-5px_rgba(0,0,0,0.3)]">
                  <div>
                    <div
                      className="cursor-pointer"
                      onClick={() => navigate(`/property-house/${e?.id}`)}
                    >
                      <Carousel infinite={true} autoPlay={true}>
                        {e?.clientImage?.map((innerimg, index) => (
                          <div key={index}>
                            <img
                              src={`${BACKEND_BASE_URL}${innerimg}`}
                              alt="img"
                              className="h-56"
                            />
                          </div>
                        ))}
                      </Carousel>
                    </div>
                    <div className="flex justify-between mt-2 items-center px-2">
                      <h2 className="font-semibold lg:text-xl md:text-md text-lg text-[#262626]">
                        {e?.head?.substring(0, 15)}...
                      </h2>
                      <div className="bg-[#FFEAEF] rounded-full p-2 md:p-3 cursor-pointer">
                        {savedLocalPost?.includes(e.id) || like ? (
                          <img
                            src={fullRedHeart}
                            alt="heart"
                            className="w-4 h-4 md:w-5 md:h-5 cursor-pointer"
                            onClick={() => isfavorite(e.id)}
                          />
                        ) : (
                          <img
                            src={heart}
                            alt="heart"
                            className="w-4 h-4 md:w-5 md:h-5 cursor-pointer"
                            onClick={() => isfavorite(e.id)}
                          />
                        )}
                      </div>
                    </div>
                    <div className="flex justify-start items-start py-3 px-2 gap-1 ">
                      <img src={location} alt="img" />
                      <p className="lg:text-sm text-xs h-10 text-[#737373]">
                        {e?.place}
                      </p>
                    </div>
                    <div className="flex gap-4 px-2 mt-3">
                      {e?.iconWithCount?.length > 0 &&
                        e?.iconWithCount?.map((elm, ind) => (
                          <div
                            key={ind}
                            className="flex gap-2 bg-[#F5F5F5] rounded-lg p-2"
                          >
                            <img src={elm?.icon} alt="" />
                            <span>{elm?.count}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                  <p className="h-[4.5rem] overflow-hidden  mt-3 px-3 lg:text-base text-sm text-[#737373]">
                    {e?.discription?.substring(0, 95)}...
                  </p>
                </div> */}
              </SwiperSlide>
            ))}
            {clientSliderData.length > 10 ?
              <SwiperSlide key="show-more">
                <div className="flex justify-start items-center h-[100%] px-3">
                  <div className="bg-[#ffd9e2] p-3 rounded-full cursor-pointer flex justify-center items-center" onClick={() => navigate('/buy')}>
                    <p className=" text-sm pe-2">See More</p>
                    <img src={lefta} alt="more" className="w-[30px]" />
                  </div>
                </div>
              </SwiperSlide>
              : null
            }
          </div>
        </Swiper>
      </div >
      <div></div>
    </>
  );
};

export default Housecart;
// const ClientSliderData = [
//   {
//     id: 1,
//     clientImage: [
//       FounderImageFirst,
//       FounderImageSecond,
//       FounderImageThired,
//       FounderImageFourt,
//     ],
//     head: "Aqualand Australia",
//     like: like,
//     locations: location,
//     place: "North Sydeny, NSW",
//     iconWithCount: [
//       {
//         icon: icon,
//         count: "1",
//       },
//       {
//         icon: icon1,
//         count: "2",
//       },
//       {
//         icon: icon2,
//         count: "3",
//       },
//     ],
//   },
// ];

// const ClientSliderData = [
//   {
//     id: 1,
//     clientImage: [
//       FounderImageFirst,
//       FounderImageSecond,
//       FounderImageThired,
//       FounderImageFourt,
//     ],
//     head: "Aqualand Australia",
//     like: like,
//     locations: location,
//     place: "North Sydeny, NSW",
//     iconWithCount: [
//       {
//         icon: icon,
//         count: "1",
//       },
//       {
//         icon: icon1,
//         count: "2",
//       },
//       {
//         icon: icon2,
//         count: "3",
//       },
//     ],
//     cont: "A property description is the written portion of a real estate listing that describes the details of a home for sale or lease. Descriptions account for roughly one-third of a listing and are accompanied by property information (i.e. the number of bedrooms) and photographs. The goal of a creative property description is to attract home buyers. Listing descriptions need colorful words to paint a clear mental picture of a home’s features and benefits, over and above the accompanying photographs.",
//   },
//   {
//     id: 2,
//     clientImage: [
//       FounderImageSecond,
//       FounderImageFirst,
//       FounderImageThired,
//       FounderImageFourt,
//     ],
//     head: "Ray White Lover North Shore Groupa",
//     like: like,
//     locations: location,
//     place: "North Bridg, NSW",
//     iconWithCount: [
//       {
//         icon: icon,
//         count: "1",
//       },
//       {
//         icon: icon1,
//         count: "2",
//       },
//       {
//         icon: icon2,
//         count: "3",
//       },
//     ],
//     cont: "A property description is the written portion of a real estate listing that describes the details of a home for sale or lease. Descriptions account for roughly one-third of a listing and are accompanied by property information (i.e. the number of bedrooms) and photographs. The goal of a creative property description is to attract home buyers. Listing descriptions need colorful words to paint a clear mental picture of a home’s features and benefits, over and above the accompanying photographs.",
//   },
//   {
//     id: 3,
//     clientImage: [
//       FounderImageThired,
//       FounderImageSecond,
//       FounderImageFirst,
//       FounderImageFourt,
//     ],
//     head: "MC Grath Projects",
//     like: like,
//     locations: location,
//     place: "Castle Hill, NSW",
//     iconWithCount: [
//       {
//         icon: icon,
//         count: "1",
//       },
//       {
//         icon: icon1,
//         count: "2",
//       },
//       {
//         icon: icon2,
//         count: "3",
//       },
//     ],
//     cont: "A property description is the written portion of a real estate listing that describes the details of a home for sale or lease. Descriptions account for roughly one-third of a listing and are accompanied by property information (i.e. the number of bedrooms) and photographs. The goal of a creative property description is to attract home buyers. Listing descriptions need colorful words to paint a clear mental picture of a home’s features and benefits, over and above the accompanying photographs.",
//   },
//   {
//     id: 4,
//     clientImage: [
//       FounderImageFourt,
//       FounderImageThired,
//       FounderImageSecond,
//       FounderImageFirst,
//     ],
//     head: "Stockwell Development Group Pty ",
//     like: like,
//     locations: location,
//     place: "South Brisbane, QLD",
//     iconWithCount: [
//       {
//         icon: icon,
//         count: "1",
//       },
//       {
//         icon: icon1,
//         count: "2",
//       },
//       {
//         icon: icon2,
//         count: "3",
//       },
//     ],
//     cont: "A property description is the written portion of a real estate listing that describes the details of a home for sale or lease. Descriptions account for roughly one-third of a listing and are accompanied by property information (i.e. the number of bedrooms) and photographs. The goal of a creative property description is to attract home buyers. Listing descriptions need colorful words to paint a clear mental picture of a home’s features and benefits, over and above the accompanying photographs.",
//   },

// ];
