import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import heart from "../../../assets/heart_icon.png";
import fullRedHeart from "../../../assets/fullRedHeart.png";
import location from "../../../assets/location_icon.png";
import bedroom from "../../../assets/bedroom_icon.png";
import car from "../../../assets/car_icon.png";
import square from "../../../assets/square.png";
import home from "../../../assets/home.png";
import acreage from "../../../assets/acreage.png";
import shower from "../../../assets/shower_icon.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { BACKEND_BASE_URL } from "../../../apiInstances/baseurl";
import { toast } from "react-toastify";
import axiosInstanceAuth from "../../../apiInstances/axiosInstanceAuth";
import Pagination from "../Pagination/Pagination";
import BetweenAds from "../../Adds/BetweenAds";

const PropertySoldCard = ({ PropertyData, setPropertyData, style, adsList }) => {
  const navigate = useNavigate();
  let PageSize = 5;
  const isAuthanticate = localStorage.getItem("Token");
  const [AuthPopUp, setAuthPopUp] = useState(false);
  const [SavedProperty, setSavedProperty] = useState(
    localStorage.getItem("Saved")?.split(",")
  );

  const [currentPage, setCurrentPage] = React.useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Assuming you have an array of data called `myData`
  const startIndex = (currentPage - 1) * PageSize;
  const endIndex = startIndex + PageSize;
  const currentData = PropertyData.slice(startIndex, endIndex);

  useEffect(() => {
    let newResponse = PropertyData.map((x) => ({
      ...x,
      favourite: SavedProperty?.includes(x.id),
    }));
    setPropertyData(newResponse);
  }, [SavedProperty]);

  const isfavorite = async (i) => {
    await axiosInstanceAuth
      .post("addToFavorites", {
        id: i?.id,
      })
      .then((res) => {
        const mydata = res?.data?.data;
        if (res?.data?.status) {
          NoRepeatConvertIntoFav(i);
          toast.success(res?.data?.message);
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        //console.log("err --->", err);
      });
  };

  const NoRepeatConvertIntoFav = (i) => {
    const index = SavedProperty?.findIndex((x) => x == i?.id);

    const newArray =
      index === -1
        ? [...SavedProperty, i?.id]
        : [...SavedProperty.slice(0, index), ...SavedProperty.slice(index + 1)];

    setSavedProperty(newArray);
  };

  return (
    <>
      <div className={`grid place-items-center grid-cols-1 gap-5 ${style} `}>
        {PropertyData?.length > 0 ? (
          currentData?.map((i, index) => (
            <React.Fragment >
              <div key={i.id}
                className="flex flex-col bg-white rounded-lg shadow-md hover:shadow-lg p-2 !w-full"
              >
                <div className="grid !w-full">
                  <Swiper
                    spaceBetween={0}
                    slidesPerView={"auto"}
                    modules={[Navigation]}
                    navigation={{}}
                    style={{ width: "inherit" }}
                  >
                    {i?.frontPageImg?.map((e, inx) => (
                      <React.Fragment key={inx} >
                        <div className="w-full">
                          <SwiperSlide>
                            <img
                              src={e}
                              alt="img"
                              loading="lazy"
                              onClick={() =>
                                navigate(`/property-house/${i?._id || i?.id}`)
                              }
                              className="rounded-t-lg cursor-pointer w-[inherit] h-[10rem] md:h-[32rem]  object-cover"
                            />
                          </SwiperSlide>
                        </div>
                      </React.Fragment>
                    ))}
                  </Swiper>

                  <div
                    className="bg-[#171717] flex justify-between items-center rounded-b-lg p-3 md:p-4 cursor-pointer"
                    onClick={() => navigate(`/property-house/${i?._id || i?.id}`)}
                  >
                    <LazyLoadImage
                      src={i?.lead_agent?.agencyLoge}
                      alt=""
                      srcSet={i?.lead_agent?.agencyLoge}
                      loading="lazy"
                      effect="blur"
                      className="h-10 md:w-auto rounded-lg mr-2"
                    />
                    <div className="flex justify-center items-center text-white text-xs md:text-base rounded-b-lg">
                      <LazyLoadImage
                        src={i?.lead_agent?.profileImg}
                        alt=""
                        srcSet={i?.lead_agent?.profileImg}
                        loading="lazy"
                        effect="blur"
                        className="h-10 md:w-auto rounded-full aspect-square mr-2"
                      />
                      {i?.lead_agent?.name}
                    </div>
                  </div>
                </div>
                <div className="mx-4">
                  <div className="flex justify-between items-center mt-5 md:mt-6">
                    <div className="font-extrabold text-[#404040] text-lg md:text-2xl ">
                      {/* $ {String(i?.price).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} */}
                      {i?.price && i?.price_display_checked === 'show_actual_price' ? "$" + String(i?.price).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : i?.price_display}
                    </div>
                    <div className="bg-[#FFEAEF] rounded-full p-2 md:p-3 cursor-pointer">
                      {i.favourite ? (
                        <img
                          src={fullRedHeart}
                          alt="heart"
                          className="w-4 md:w-5 cursor-pointer"
                          onClick={(e) => {
                            if (!isAuthanticate) {
                              setAuthPopUp(true);
                            } else {
                              isfavorite(i);
                            }
                          }}
                        />
                      ) : (
                        <img
                          src={heart}
                          alt="heart"
                          className="w-4 md:w-5 cursor-pointer"
                          onClick={(e) => {
                            if (!isAuthanticate) {
                              setAuthPopUp(true);
                            } else {
                              isfavorite(i);
                            }
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
                      {i?.street_address_number} {i?.street_address_name}
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
                        <div className="font-semibold text-[#404040] text-xs md:text-sm">
                          {i?.bedroomCount}
                        </div>
                      </div>
                    )}
                    {i?.showerCount && (
                      <div className="flex justify-center items-center bg-[#F5F5F5] rounded-md p-2">
                        <img
                          src={shower}
                          alt="bedroom"
                          className="w-4 md:w-5 mr-1"
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
                          {i?.carport_spaces}
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
                        <img
                          src={acreage}
                          alt="car"
                          className="w-4 md:w-5 mr-3"
                        />
                        <div className="font-semibold text-[#404040] text-xs md:text-sm">
                          {i?.acreageCount}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="text-start font-medium text-[#525252] text-xs md:text-sm my-3">
                    Sold on{" "}
                    {new Date(i?.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                </div>
              </div>
              {index % 2 !== 0 && adsList && adsList[Math.floor(index / 2)] && (
                <BetweenAds detail={adsList[Math.floor(index / 2)]} />
              )}
            </React.Fragment>
          ))
        ) : (<>
          <h1 className="flex justify-center text-5xl font-semibold  text-[#737373] my-24">No data Found</h1>
        </>)}
      </div>
      {/* <<----- Paginationp ----->> */}
      <div className="flex justify-center">
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={PropertyData?.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
      {/* <<----- Auth Pop Up ----->> */}
      {AuthPopUp ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[999999]  outline-none focus:outline-none border ">
            <div className="relative min-w-[250px] max-w-[90%] mx-auto  my-10 shadow-black shadow-2xl">
              {/* ------ Content ------ */}
              <div className="border-0 rounded-lg shadow-2xl relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/* ------ Header ------ */}
                <div className="grid place-items-center place-content-end">
                  <button
                    className="bg-transparent border-0 text-black opacity-9 text-2xl font-normal outline-none focus:outline-none mx-3 my-2"
                    onClick={(e) => setAuthPopUp(false)}
                  >
                    ×
                  </button>
                </div>
                {/* ------ Body ------ */}
                <div className="relative grid place-items-center px-6 md:px-10 py-3 flex-auto">
                  <h3 className="text-black font-semibold text-base md:text-lg  leading-relaxed text-center">
                    Sign in to save
                  </h3>
                  <p className="text-black font-medium text-xs md:text-sm  leading-normal text-center mt-5">
                    Save properties to your account and sync across devices.
                  </p>
                </div>

                {/* ------ Fotter ------ */}
                <div className="flex justify-center items-center m-5 mt-2">
                  <button
                    className="border-2 border-[#525252] hover:border-black bg-white text-[#525252] font-semibold text-sm px-7 py-3 rounded-lg outline-none focus:outline-none ease-linear transition-all duration-150 mx-2"
                    onClick={(e) => navigate("/sign-up")}
                  >
                    Join
                  </button>
                  <button
                    className="border-2 border-[#E5002A] bg-[#E5002A] hover:bg-[#db183c] text-white font-semibold text-sm px-7 py-3 rounded-lg outline-none focus:outline-none ease-linear transition-all duration-150 mx-2"
                    onClick={(e) => navigate("/log-in")}
                  >
                    Sign in
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-20 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default PropertySoldCard;
