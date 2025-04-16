import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import info from "../../../assets/infoOutline.png";
import location from "../../../assets/location_icon.png";
import bedroom from "../../../assets/bedroom_icon.png";
import car from "../../../assets/car_icon.png";
import shower from "../../../assets/shower_icon.png";
import Googlemap2 from "../GoogleMap/Googlemap2";
import isEmpty from "../utils/isEmpty";

const PropertiesCard = ({ AgencyData, property }) => {
  const resPonce = isEmpty(property);
  const navigate = useNavigate();
  const [visibleProperties, setVisibleProperties] = useState(3);
  const [showMore, setShowMore] = useState(true);
  const toggleShowMore = () => {
    setShowMore(!showMore);
    setVisibleProperties(showMore ? property.length : 3);
  };
  return (
    <>
      {AgencyData.length > 0 &&
        AgencyData?.map((data, i) => (
          <div key={i} className="flex flex-col justify-center items-start bg-[#FFFFFF] rounded-xl shadow-md hover:shadow-lg p-4 md:p-6">
            <div className="w-full flex justify-between sm:justify-start items-center gap-3">
              <div className="text-[#171717] font-bold text-base md:text-lg lg:text-xl">
                Our properties
              </div>
              <img src={info} alt="icon" className="w-4 cursor-pointer" />
            </div>
            <div className="text-[#404040] font-medium text-sm md:text-sm lg:text-base mt-2">
              {data?.principal_name} have sold 313 properties of all time on
              argimb.com.ar and have 14 properties for sale.
            </div>
            {/* --------- Sort By --------- */}
            <div className="w-full flex flex-col md:flex-row justify-center gap-4 my-4">
              <div className="w-full">
                <div className="font-medium text-[#171717] text-xs md:text-sm lg:text-base">
                  Sort by
                  <span className="px-1 text-red-500">*</span>
                </div>
                <select
                  name="select"
                  className="round w-full !text-[#737373] text-xs md:text-sm lg:text-base outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 cursor-pointer mt-2"
                >
                  <option value="">Buy</option>
                  <option value="">Rent</option>
                  <option value="">Sold</option>
                </select>
              </div>
              <div className="w-full">
                <div className="font-medium text-[#171717] text-xs md:text-sm lg:text-base">
                  Sort by <span className="px-1 text-red-500">*</span>
                </div>
                <select
                  name="select"
                  className="round w-full !text-[#737373] text-xs md:text-sm lg:text-base outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 cursor-pointer mt-2"
                >
                  <option value="">12 months</option>
                  <option value="">3 months</option>
                  <option value="">6 months</option>
                  <option value="">12 months</option>
                </select>
              </div>
            </div>

            {/* -------- Map -------- */}
            <div className="!relative h-[50vh] md:h-[40vh] w-full ">
              {resPonce ? "" : <Googlemap2 location={property} />}
            </div>
            {/* -------- property Cards -------- */}
            <div className="text-[#404040] font-medium text-sm md:text-sm lg:text-base mt-4">
              Showing 3 of 139 properties sold on argimb.com.ar in the last 12
              months
            </div>

            <div className="grid place-items-start mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 md:mt-6">
              {data?.properties?.length > 0 &&
                data?.properties.slice(0, visibleProperties).map((i, index) => (
                  <div
                    key={index}
                    className="flex flex-col bg-white rounded-lg shadow-md hover:shadow-lg cursor-pointer p-2 w-full"
                    onClick={() =>
                      navigate(`/property-house/${i?._id || i?.id}`)
                    }
                  >
                    <div className="grid">
                      <LazyLoadImage
                        src={i?.frontPageImg[0]}
                        alt="icon"
                        srcSet={i?.iconTop}
                        loading="lazy"
                        effect="blur"
                        className="rounded-t-lg h-44 w-[-webkit-fill-available]"
                      />
                      <div
                        className={` bg-[${AgencyData[0].primary_color}] flex justify-between items-center gap-2 rounded-b-lg px-3 py-2 `}
                      >
                        <LazyLoadImage
                          src={data?.agencyLargeLogo}
                          alt="icon"
                          srcSet={data?.agencyLargeLogo}
                          loading="lazy"
                          effect="blur"
                          className="w-10 md:w-14 rounded-md"
                        />
                        {data?.agents?.map((subagent) =>
                          i?.lead_agent === subagent?._id ? (
                            <div className="flex justify-center items-center text-[#404040] font-medium text-xs md:text-sm rounded-b-lg">
                              <LazyLoadImage
                                src={subagent?.profileImg}
                                alt="icon"
                                srcSet={subagent?.profileImg}
                                loading="lazy"
                                effect="blur"
                                className="w-9 md:w-9 h-9 mr-2 rounded-3xl"
                              />
                              {subagent?.name}
                            </div>
                          ) : null
                        )}
                      </div>
                    </div>

                    <div className="mx-4">
                      <div className="flex justify-start items-center mt-5 md:mt-6">
                        <div className="font-extrabold text-[#404040] text-base md:text-lg lg:text-xl ">
                          ${i?.price}
                        </div>
                      </div>

                      <div className="flex justify-start items-start gap-2 mt-2 md:mt-3">
                        <img
                          src={location}
                          alt="location"
                          className="w-4 md:w-5"
                        />
                        <div className="font-semibold text-[#737373] text-xs md:text-sm">
                          {i?.street_address_number} {i?.street_address_name}
                        </div>
                      </div>

                      <div className="flex flex-wrap justify-start items-center gap-2 my-5">
                        <div className="flex justify-center items-center gap-2 bg-[#F5F5F5] rounded-md p-2">
                          <img
                            src={bedroom}
                            alt="location"
                            className="w-4 md:w-5"
                          />
                          <div className="font-semibold text-[#737373] text-xs md:text-sm">
                            {i?.Bedrooms}
                          </div>
                        </div>
                        <div className="flex justify-center items-center gap-2 bg-[#F5F5F5] rounded-md p-2">
                          <img
                            src={shower}
                            alt="bedroom"
                            className="w-4 md:w-5"
                          />
                          <div className="font-semibold text-[#404040] text-xs md:text-sm">
                            {i?.Bathrooms}
                          </div>
                        </div>
                        <div className="flex justify-center items-center gap-2 bg-[#F5F5F5] rounded-md p-2">
                          <img src={car} alt="shower" className="w-4 md:w-5" />
                          <div className="font-semibold text-[#404040] text-xs md:text-sm">
                            {i?.carport_spaces}
                          </div>
                        </div>
                        <div className="flex justify-center items-center bg-[#F5F5F5] rounded-md p-2">
                          <div
                            className="font-semibold text-[#404040] text-xs md:text-sm"
                            title={i?.property_type}
                          >
                            {i?.property_type.substring(0, 9)}
                          </div>
                        </div>
                      </div>

                      <div className="text-start font-medium text-[#525252] text-xs md:text-sm my-3">
                        {i?.createdAt}
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* -------- button -------- */}
            {property.length > 3 && (
              <button
                onClick={toggleShowMore}
                className="w-full text-xs md:text-sm lg:text-base hover:font-semibold font-medium border bg-[#E5002A] text-white hover:bg-white  hover:text-[#E5002A] hover:border-[#E5002A] py-3 px-5 rounded-3xl mt-4 md:mt-6"
              >
                {showMore ? "Show more properties" : "Show fewer properties"}
              </button>
            )}
          </div>
        ))}
    </>
  );
};

export default PropertiesCard;
