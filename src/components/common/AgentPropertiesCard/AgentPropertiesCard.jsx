import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import info from "../../../assets/infoOutline.png";
import location from "../../../assets/location_icon.png";
import bedroom from "../../../assets/bedroom_icon.png";
import car from "../../../assets/car_icon.png";
import shower from "../../../assets/shower_icon.png";
import GoogleMap2 from "../GoogleMap/Googlemap2";
import { BACKEND_BASE_URL } from "../../../apiInstances/baseurl";
import isEmpty from "../utils/isEmpty";

const AgentPropertiesCard = ({ AgentData, property }) => {
  const navigate = useNavigate();
  const [showListing, setShowListing] = useState(false);

  const [sort, setsort] = useState();
  const [propertyData, setpropertyData] = useState();
  const resPonce = isEmpty(property);
  useEffect(() => {
    setpropertyData(property);
  }, [property]);
  const changeSort = (e) => {
    setsort(e);
    const data = property.filter((item) => item.status == e);
    setpropertyData(data);
  };
  const showMoreLessListings = () => {
    setShowListing((prevVal) => !prevVal);
    if (showListing) {
      //console.log("---------------------")
      // Assuming you have an element with the class name "data"
      const element = document.querySelector(".data");

      if (element) {
        // Scroll to the element
        element.scrollIntoView({
          behavior: "smooth", // Use smooth scrolling behavior
          block: "start", // Scroll to the top of the element
        });
      }
    }
  };
  return (
    <div className="flex flex-col justify-center bg-[#FFFFFF] rounded-xl shadow-md hover:shadow-lg p-4 md:p-6">
      <div className="w-full flex justify-between sm:justify-start items-center gap-3">
        <div className="text-[#171717] font-bold text-base md:text-lg lg:text-xl">
          {AgentData?.first_name}'s properties
        </div>
        <img src={info} alt="icon" className="w-4 cursor-pointer" />
      </div>
      <div className="text-[#404040] font-medium text-sm md:text-sm lg:text-base mt-2">
        Properties recently sold by {AgentData?.first_name} in the last 12
        months.
      </div>
      {/* --------- Sort By --------- */}
      <div className="w-full flex flex-col md:flex-row justify-start gap-4 my-4">
        <div className="w-full md:w-[50%]">
          <div className="font-medium text-[#171717] text-xs md:text-sm lg:text-base">
            Sort by
            <span className="px-1 text-red-500">*</span>
          </div>
          <select
            name="select"
            className="round w-full !text-[#737373] text-xs md:text-sm lg:text-base outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 cursor-pointer mt-2"
            // onChange={(e) => setsort(e.target.value)}
            onChange={(e) => changeSort(e.target.value)}
          >
            <option value="Active">Buy</option>
            <option value="Rent">Rent</option>
            <option value="Sold">Sold</option>
          </select>
        </div>
      </div>

      {/* -------- Map -------- */}
      <div className="!relative h-[50vh] md:h-[40vh] rounded-md data">
        {resPonce ? "" : <GoogleMap2 location={property} />}
      </div>

      {/* -------- property Cards -------- */}
      <div className="text-[#404040] font-semibold text-sm md:text-sm lg:text-base mt-4">
        Showing {propertyData && propertyData?.length > 1 ? propertyData?.length > 3 ? 3 : propertyData?.length : 0} of {propertyData?.length} sold properties
      </div>

      <div className="grid place-items-center md:place-items-start grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-4 md:mt-6 data" >
        {propertyData?.length > 0 &&
          !showListing &&
          propertyData?.slice(0, 3).map((i, index) => (
            <div
              key={index}
              className="flex flex-col bg-white rounded-lg shadow-md hover:shadow-lg cursor-pointer p-2"
              onClick={() => navigate(`/property-house/${i?._id || i?.id}`)}
            >
              <div className="grid">
                <LazyLoadImage
                  src={i?.florePlansImg[0]}
                  alt="icon"
                  srcSet={i?.florePlansImg[0]}
                  loading="lazy"
                  effect="blur"
                  className="rounded-lg h-52 w-full"
                />
              </div>
              <div className="mx-4">
                <div className="flex justify-start items-center mt-5 md:mt-6">
                  <div className="font-extrabold text-[#404040] text-sm md:text-base lg:text-lg">
                    {i?.Hide_the_price_and_display_contact_agent
                      ? i?.price
                      : "Contact agent"}
                  </div>
                </div>

                <div className="flex justify-start items-start gap-2 mt-2 md:mt-3">
                  <img src={location} alt="location" className="w-4 md:w-5" />
                  <div className="font-medium text-[#737373] text-xs md:text-sm">
                    {i?.street_address_number} {i?.street_address_name}
                  </div>
                </div>

                <div className="flex flex-wrap justify-start items-center gap-2 my-5">
                  <div className="flex justify-center items-center gap-2 bg-[#F5F5F5] rounded-md p-2">
                    <img src={bedroom} alt="location" className="w-4 md:w-5" />
                    <div className="font-semibold text-[#737373] text-xs">
                      {i?.Bedrooms}
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-2 bg-[#F5F5F5] rounded-md p-2">
                    <img src={shower} alt="bedroom" className="w-4 md:w-5" />
                    <div className="font-semibold text-[#404040] text-xs ">
                      {i?.Bathrooms}
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-2 bg-[#F5F5F5] rounded-md p-2">
                    <img src={car} alt="shower" className="w-4 md:w-5" />
                    <div className="font-semibold text-[#404040] text-xs ">
                      {i?.carport_spaces}
                    </div>
                  </div>
                  <div className="flex justify-center items-center bg-[#F5F5F5] rounded-md p-2">
                    <div
                      className="font-semibold text-[#404040] text-xs"
                      title={i?.property_type}
                    >
                      {i?.property_type.substring(0, 10)}
                    </div>
                  </div>
                </div>

                <div className="text-start font-medium text-[#525252] text-xs my-3">
                  {new Date(i?.createdAt.toString()).toLocaleDateString(
                    "en-US",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    }
                  )}
                </div>
              </div>
            </div>
          ))}
        {propertyData?.length > 0 &&
          showListing &&
          propertyData?.map((i, index) => (
            <div
              key={index}
              className="flex flex-col bg-white rounded-lg shadow-md hover:shadow-lg cursor-pointer p-2"
              onClick={() => navigate(`/property-house/${i?._id || i?.id}`)}
            >
              <div className="grid">
                <LazyLoadImage
                  src={i?.florePlansImg[0]}
                  alt="icon"
                  srcSet={i?.florePlansImg[0]}
                  loading="lazy"
                  effect="blur"
                  className="rounded-lg h-52 w-full"
                />
              </div>
              <div className="mx-4">
                <div className="flex justify-start items-center mt-5 md:mt-6">
                  <div className="font-extrabold text-[#404040] text-sm md:text-base lg:text-lg">
                    {i?.Hide_the_price_and_display_contact_agent
                      ? i?.price
                      : "Contact agent"}
                  </div>
                </div>

                <div className="flex justify-start items-start gap-2 mt-2 md:mt-3">
                  <img src={location} alt="location" className="w-4 md:w-5" />
                  <div className="font-medium text-[#737373] text-xs md:text-sm">
                    {i?.street_address_number} {i?.street_address_name}
                  </div>
                </div>

                <div className="flex flex-wrap justify-start items-center gap-2 my-5">
                  <div className="flex justify-center items-center gap-2 bg-[#F5F5F5] rounded-md p-2">
                    <img src={bedroom} alt="location" className="w-4 md:w-5" />
                    <div className="font-semibold text-[#737373] text-xs">
                      {i?.Bedrooms}
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-2 bg-[#F5F5F5] rounded-md p-2">
                    <img src={shower} alt="bedroom" className="w-4 md:w-5" />
                    <div className="font-semibold text-[#404040] text-xs ">
                      {i?.Bathrooms}
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-2 bg-[#F5F5F5] rounded-md p-2">
                    <img src={car} alt="shower" className="w-4 md:w-5" />
                    <div className="font-semibold text-[#404040] text-xs ">
                      {i?.carport_spaces}
                    </div>
                  </div>
                  <div className="flex justify-center items-center bg-[#F5F5F5] rounded-md p-2">
                    <div
                      className="font-semibold text-[#404040] text-xs"
                      title={i?.property_type}
                    >
                      {i?.property_type.substring(0, 10)}
                    </div>
                  </div>
                </div>

                <div className="text-start font-medium text-[#525252] text-xs my-3">
                  {new Date(i?.createdAt.toString()).toLocaleDateString(
                    "en-US",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    }
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* -------- button -------- */}

      <button
        className="w-full text-xs md:text-sm lg:text-base hover:font-semibold font-medium border bg-[#E5002A] text-white hover:bg-white  hover:text-[#E5002A] hover:border-[#E5002A] py-3 px-5 rounded-3xl mt-4 md:mt-6"
        // onClick={() => setShowListing((prevVal) => !prevVal)}
        onClick={() => showMoreLessListings()}
      >
        {showListing ? "Show less reviews" : `Show more listings`}
      </button>
    </div>
  );
};

export default AgentPropertiesCard;
