import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import info from "../../../assets/infoOutline.png";
import verify from "../../../assets/verify.png";
import MoreBlue from "../../../assets/MoreBlue.png";
import a2 from "../../../assets/a2.png";
import { BACKEND_BASE_URL } from "../../../apiInstances/baseurl";
import Review from "../Review/Review";

const AgentReviewsCard = ({ AgentData, averageRatings }) => {
  //console.log("🚀 ~ AgentReviewsCard ~ AgentData:===================================================================================================>", AgentData)
  const navigate = useNavigate();

  const [showReviews, setShowReviews] = useState(false);

  const ReviewTags = [
    "Professional (0)",
    "Great communicator (0)",
    "Genuine (0)",
    "Trustworthy (0)",
    "Reliable (0)",
    "Got a great price (0)",
    "Suburb specialist (0)",
    "Great negotiator (0)",
    "Punctual (0)",
    "Great marketer (0)",
  ];

  const firstThreeReviews = AgentData?.reviews?.slice(0, 3);
  //console.log("🚀 ~ AgentReviewsCard ~ firstThreeReviews:", firstThreeReviews)
  const remainingReviews = AgentData?.reviews?.slice(3);
  //console.log("🚀 ~ AgentReviewsCard ~ remainingReviews:", remainingReviews)

  return (
    <div className="flex flex-col justify-center items-start bg-[#FFFFFF] rounded-xl shadow-md hover:shadow-lg p-4 md:p-6">
      <div className="w-full flex justify-between sm:justify-start items-center gap-3">
        <div className="text-[#171717] font-bold text-base md:text-lg lg:text-xl">
          {AgentData?.first_name}'s reviews
        </div>
        <img src={info} alt="icon" className="w-4 cursor-pointer" />
      </div>
      <div className="text-[#404040] font-medium text-sm md:text-sm lg:text-base mt-2">
        Read the latest client reviews of {AgentData?.first_name}{" "}
        {AgentData?.last_name}, real estate agent at Ray White Coomera -
        COOMERA.
      </div>

      {/* ------ Ratings ------ */}
      <div className="flex justify-start items-center gap-4 mt-5 md:mt-9">
        <img
          src={AgentData?.profileImg}
          alt=""
          className="w-10 md:w-14 aspect-square rounded-full"
        />
        {/* <div>
          <div className="flex justify-start items-center">
            <svg
              aria-hidden="true"
              className="w-5 h-5 hover:text-gray-300 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>First star</title>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg
              aria-hidden="true"
              className="w-5 h-5 hover:text-gray-300 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Second star</title>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg
              aria-hidden="true"
              className="w-5 h-5 hover:text-gray-300 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Third star</title>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg
              aria-hidden="true"
              className="w-5 h-5 hover:text-gray-300 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Fourth star</title>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg
              aria-hidden="true"
              className="w-5 h-5 hover:text-gray-300 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Fifth star</title>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <div className="text-[#171717] font-semibold text-xs px-1">
              5.0 (134 review)
            </div>
          </div>
          <div className="text-[#A3A3A3] font-medium text-xs md:text-sm">
            Partnered with {AgentData?.first_name} before?
            <span
              className="px-2 text-[#3B8FD4] font-medium cursor-pointer"
              onClick={() => {
                navigate(`/agent-review/${AgentData?._id}`);
              }}
            >
              Leave a review
            </span>
          </div>
        </div> */}
        <Review rating={averageRatings} />
        <div className="text-[#A3A3A3] font-medium text-xs md:text-sm mt-1 px-1">
          {averageRatings == 0 ? averageRatings : averageRatings.toFixed(1)} (
          {AgentData?.reviews?.length} {"review"})
          <span
            className="px-2 text-[#3B8FD4] font-medium cursor-pointer"
            onClick={() => {
              navigate(`/agent-review/${AgentData?._id}`);
            }}
          >
            Leave a review
          </span>
        </div>
      </div>

      {/* ------ Tags ------ */}

      <div className="text-[#404040] font-semibold text-sm md:text-sm lg:text-base mt-4 md:mt-8">
        Clients say {AgentData?.first_name} is...
      </div>

      <div className="flex flex-wrap justify-start items-center gap-2 my-5">
        {ReviewTags?.length > 0 &&
          ReviewTags?.map((i, index) => (
            <div
              key={index}
              className="flex justify-center items-center bg-[#F5F5F5] rounded-md font-medium text-[#404040] text-xs md:text-sm p-2"
            >
              {i}
            </div>
          ))}
      </div>

      <div className="w-full grid grid-cols-1 gap-4">
        {firstThreeReviews?.length > 0 &&
          firstThreeReviews?.map((i, index) => (
            <div
              key={index}
              className="w-full flex flex-col justify-start gap-3 bg-[#F5F5F5] rounded-xl p-4 md:p-6"
            >
              <div className="flex flex-col md:flex-row justify-start md:justify-between items-start gap-2">
                <div className="flex flex-col justify-start items-start">
                  <div className="flex justify-center items-center">
                    {Array.from({ length: i?.star }).map((_, index) => (
                      <svg
                        key={index}
                        aria-hidden="true"
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                    <div className="text-[#A3A3A3] font-medium text-xs px-1">
                      {i?.star}
                    </div>
                  </div>
                  <div className="text-[#737373] font-semibold text-xs md:text-sm mt-2">
                    Seller of house in
                    <span className="px-2 font-medium">
                      {i?.client_address}
                    </span>
                  </div>
                  <div className="text-[#737373] font-medium text-xs mt-2">
                    {i?.time}
                  </div>
                </div>

                <div className="flex justify-center items-start gap-2">
                  <img src={verify} alt="icon" className="w-4" />
                  <div className="text-[#737373] font-semibold text-xs md:text-sm">
                    Verified review
                  </div>
                </div>
              </div>
              <div className="text-[#737373] font-medium text-xs md:text-sm lg:text-base">
                {i?.review}
              </div>
              {/* <div className="flex justify-start items-center gap-2">
                <div className="text-[#3B8FD4] font-semibold text-xs md:text-sm lg:text-base cursor-pointer">
                  Read More
                </div>
                <img src={MoreBlue} alt="icon" className="w-3 cursor-pointer" />
              </div> */}
            </div>
          ))}

        {showReviews &&
          remainingReviews?.length > 0 &&
          remainingReviews?.map((i, index) => (
            <div
              key={index}
              className="w-full flex flex-col justify-start gap-3 bg-[#F5F5F5] rounded-xl p-4 md:p-6"
            >
              <div className="flex flex-col md:flex-row justify-start md:justify-between items-start gap-2">
                <div className="flex flex-col justify-start items-start">
                  <div className="flex justify-center items-center">
                    {Array.from({ length: i?.star }).map((_, index) => (
                      <svg
                        key={index}
                        aria-hidden="true"
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                    <div className="text-[#A3A3A3] font-medium text-xs px-1">
                      {i?.rating}
                    </div>
                  </div>
                  <div className="text-[#737373] font-semibold text-xs md:text-sm mt-2">
                    Seller of house
                    <span className="px-2 font-medium">
                      {i?.client_address}
                    </span>
                  </div>
                  <div className="text-[#737373] font-medium text-xs mt-2">
                    {i?.time}
                  </div>
                </div>

                <div className="flex justify-center items-start gap-2">
                  <img src={verify} alt="icon" className="w-4" />
                  <div className="text-[#737373] font-semibold text-xs md:text-sm">
                    Verified review
                  </div>
                </div>
              </div>
              <div className="text-[#737373] font-medium text-xs md:text-sm lg:text-base">
                {i?.review}
              </div>
            </div>
          ))}

        {remainingReviews?.length > 0 && (
          <button
            className="w-full flex justify-center items-center text-xs md:text-sm lg:text-base font-medium border text-[#FFFFFF] bg-[#E5002A] border-[#E5002A] hover:text-[#E5002A] hover:bg-[#FFFFFF] hover:font-semibold py-3 px-5 rounded-3xl"
            onClick={() => setShowReviews((prevVal) => !prevVal)}
          >
            {showReviews
              ? "Show less reviews"
              : `Show ${remainingReviews?.length} more reviews`}
          </button>
        )}
      </div>
    </div>
  );
};

export default AgentReviewsCard;
