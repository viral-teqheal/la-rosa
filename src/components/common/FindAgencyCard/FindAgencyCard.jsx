import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import { BACKEND_BASE_URL } from "../../../apiInstances/baseurl";
import location from "../../../assets/location_icon.png";
import Pagination from "../Pagination/Pagination";

const FindAgencyCard = (props) => {
  const navigate = useNavigate();
  let PageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);
  // Assuming you have an array of data called `myData`
  const startIndex = (currentPage - 1) * PageSize;
  const endIndex = startIndex + PageSize;
  const currentData = props.AgenciesData.slice(startIndex, endIndex);
  return (
    <>
      <div
        className={`grid place-items-center grid-cols-1 xl:grid-cols-2  gap-8 ${props.style} `}
      >
        {currentData?.length > 0 &&
          currentData?.map((i, index) => (
            <div
              key={index}
              className="h-full w-full flex flex-col bg-white rounded-xl shadow-md hover:shadow-lg"
            >
              <div
                className={`border-[12px] md:border-[16px] rounded-t-xl ${i?.TopHeadColor
                  ? `border-[${i?.primary_color}]`
                  : "border-[#FFFFFF]"
                  } `}
              />
              <div className="p-4 md:p-6">
                <div className="grid place-content-center">
                  <LazyLoadImage
                    src={i?.agencyLargeLogo}
                    alt="icon"
                    srcSet={i?.agencyLargeLogo}
                    loading="lazy"
                    effect="blur"
                    className="rounded-lg  lg:h-48 md:h-40 h-28"
                  />
                </div>
                <div className="text-[#404040] font-semibold text-md md:text-lg lg:text-xl mt-4">
                  {i?.name}
                </div>
                <div className="flex justify-start items-start mt-2 md:mt-3">
                  <img
                    src={location}
                    alt="location"
                    className="w-4 md:w-5 mr-3"
                  />
                  <div className="font-medium text-[#3B8FD4] text-sm md:text-base lg:text-lg">
                    {i?.street} {i?.suburb_area} {i?.postcode}
                  </div>
                </div>

                <div className="flex justify-center items-center gap-2 my-4 md:my-6">
                  <div className="flex flex-col justify-center items-center bg-[#F5F5F5] rounded-lg p-3">
                    <div className="text-[#171717] font-semibold  text-sm md:text-base lg:text-lg">
                      {i?.Property_Sold}
                    </div>
                    <div className="text-[#525252] text-center text-xs md:text-sm lg:text-base mt-2">
                      Properties sold in Gold Coast
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-center bg-[#F5F5F5] rounded-lg p-3">
                    <div className="text-[#171717] font-semibold  text-sm md:text-base lg:text-lg">
                      {i?.Property_Rent}
                    </div>
                    <div className="text-[#525252] text-center text-xs md:text-sm lg:text-base mt-2">
                      Properties for rent in Gold Coast
                    </div>
                  </div>
                </div>

                <button
                  className="w-full text-xs md:text-sm lg:text-base font-medium border bg-[#E5002A] text-white hover:bg-white  hover:text-[#E5002A] hover:border-[#E5002A] py-3 px-5 rounded-3xl"
                  onClick={() => navigate(`/agency-profile/${i?.id}`)}
                >
                  Get in touch
                </button>

                <button
                  className="w-full text-xs md:text-sm lg:text-base font-medium border text-[#737373] border-[#737373] py-3 px-5 rounded-3xl mt-3"
                  onClick={() => navigate(`/agency-profile/${i?.id}`)}
                >
                  View profile
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* <<----- Paginationp ----->> */}
      <div className="flex justify-center">
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={props?.AgenciesData?.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </>
  );
};

export default FindAgencyCard;
