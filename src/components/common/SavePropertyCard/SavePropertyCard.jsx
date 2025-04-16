import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import heart from "../../../assets/heart_icon.png";
import fullRedHeart from "../../../assets/fullRedHeart.png";
import location from "../../../assets/location_icon.png";
import bedroom from "../../../assets/bedroom_icon.png";
import car from "../../../assets/car_icon.png";
import shower from "../../../assets/shower_icon.png";
import square from "../../../assets/square.png";
import home from "../../../assets/home.png";
import acreage from "../../../assets/acreage.png";
import add_note from "../../../assets/add_note.png";
import { toast } from "react-toastify";
import axiosInstanceAuth from "../../../apiInstances/axiosInstanceAuth";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom";

const SavePropertyCard = ({ SavePropertyData, GetSavedProperty, isActive }) => {
  const navigate = useNavigate();

  const isfavorite = async (i) => {
    await axiosInstanceAuth
      .post("addToFavorites", {
        id: i?._id,
      })
      .then((res) => {
        const mydata = res?.data?.data;

        if (res?.data?.status) {
          if (isActive === "All") {
            GetSavedProperty("");
          } else if (isActive === "Buy") {
            GetSavedProperty("Active");
          } else {
            GetSavedProperty(isActive);
          }
          toast.success(res?.data?.message);
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        //console.log("err --->", err);
      });
  };

  return (
    <div className="grid place-items-center grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 my-12">
      {SavePropertyData?.length > 0 &&
        SavePropertyData?.map((i, index) => (
          <div
            key={index}
            className="h-full max-w-lg flex flex-col bg-white rounded-lg shadow-md hover:shadow-lg p-2"
          >
            <div className="grid">
              <Swiper
                spaceBetween={0}
                slidesPerView={"auto"}
                modules={[Navigation]}
                navigation={{}}
              >
                {i?.frontPageImg?.map((e, ine) => (
                  <div key={ine}>
                    <SwiperSlide>
                      <img
                        src={e}
                        alt=""
                        className="rounded-t-lg"
                      />
                    </SwiperSlide>
                  </div>
                ))}
              </Swiper>

              {/* <div
                className="bg-[#171717] flex justify-between items-center rounded-b-lg p-3 md:p-4 cursor-pointer"
                onClick={() => navigate(`/property-house/${i?._id}`)}
              >
                <LazyLoadImage
                  src={i?.lead_agent?.agencySmallLogo}
                  alt=""
                  srcSet={i?.lead_agent?.agencySmallLogo}
                  loading="lazy"
                  effect="blur"
                  className="h-8 md:w-auto rounded-lg mr-2"
                />
                <div className="flex justify-center items-center text-white text-xs md:text-base rounded-b-lg">
                  <LazyLoadImage
                    src={i?.lead_agent?.profileImg}
                    alt=""
                    srcSet={i?.lead_agent?.profileImg}
                    loading="lazy"
                    effect="blur"
                    className="h-8 md:w-auto rounded-full aspect-square mr-2"
                  />
                  {i?.lead_agent?.name}
                </div>
              </div> */}
            </div>
            <div className="mx-4">
              <div className="flex justify-between items-center mt-5 md:mt-6">
                <div className="font-extrabold text-[#404040] text-lg md:text-2xl ">
                  $ {i?.price}
                </div>
                <div className="bg-[#FFEAEF] rounded-full p-2 md:p-3 cursor-pointer">
                  {i.favourite ? (
                    <img
                      src={fullRedHeart}
                      alt="heart"
                      className="w-4 md:w-5 cursor-pointer"
                      onClick={(e) => {
                        isfavorite(i);
                      }}
                    />
                  ) : (
                    <img
                      src={heart}
                      alt="heart"
                      className="w-4 md:w-5 cursor-pointer"
                      onClick={(e) => {
                        isfavorite(i);
                      }}
                    />
                  )}
                </div>
              </div>

              <div className="flex justify-start items-center mt-2 md:mt-3">
                <img
                  src={location}
                  alt="location"
                  className="w-4 md:w-5 mr-2"
                />
                <div className="font-semibold text-[#737373] text-xs md:text-base">
                  {i?.street_address_number} {i?.street_address_name},{` `}
                  {i?.suburb}
                </div>
              </div>

              <div className="flex flex-wrap justify-start items-center gap-2 my-5">
                {i?.bedroomCount && (
                  <div className="flex justify-center items-center bg-[#F5F5F5] rounded-md p-2">
                    <img
                      src={bedroom}
                      alt="location"
                      className="w-4 md:w-5 mr-3"
                    />
                    <div className="font-semibold text-[#737373] text-xs md:text-base">
                      {i?.bedroomCount}
                    </div>
                  </div>
                )}
                {i?.showerCount && (
                  <div className="flex justify-center items-center bg-[#F5F5F5] rounded-md p-2">
                    <img
                      src={shower}
                      alt="bedroom"
                      className="w-4 md:w-5 mr-3"
                    />
                    <div className="font-semibold text-[#404040] text-xs md:text-sm">
                      {i?.showerCount}
                    </div>
                  </div>
                )}
                {i?.carCount && (
                  <div className="flex justify-center items-center bg-[#F5F5F5] rounded-md p-2">
                    <img src={car} alt="shower" className="w-4 md:w-5 mr-3" />
                    <div className="font-semibold text-[#404040] text-xs md:text-sm">
                      {i?.carCount}
                    </div>
                  </div>
                )}
                {i?.squareCount && (
                  <div className="flex justify-center items-center bg-[#F5F5F5] rounded-md p-2">
                    <img src={square} alt="car" className="w-4 md:w-5 mr-3" />
                    <div className="font-semibold text-[#404040] text-xs md:text-sm">
                      {i?.squareCount}
                    </div>
                  </div>
                )}
                {i?.appartmentCount && (
                  <div className="flex justify-center items-center bg-[#F5F5F5] rounded-md p-2">
                    <img src={home} alt="car" className="w-4 md:w-5 mr-3" />
                    <div className="font-semibold text-[#404040] text-xs md:text-sm">
                      {i?.appartmentCount}
                    </div>
                  </div>
                )}
                {i?.acreageCount && (
                  <div className="flex justify-center items-center bg-[#F5F5F5] rounded-md p-2">
                    <img src={acreage} alt="car" className="w-4 md:w-5 mr-3" />
                    <div className="font-semibold text-[#404040] text-xs md:text-sm">
                      {i?.acreageCount}
                    </div>
                  </div>
                )}
              </div>

              <div className="text-start font-medium text-[#525252] text-xs md:text-sm my-3">
                {i?.saleDate}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SavePropertyCard;
