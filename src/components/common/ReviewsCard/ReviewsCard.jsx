import React, { useState } from "react";
import info from "../../../assets/infoOutline.png";
import verify from "../../../assets/verify.png";
import MoreBlue from "../../../assets/MoreBlue.png";
import a2 from "../../../assets/a2.png";
import agencyAgentImg7 from "../../../assets/agencyAgentImg (7).png";
import Review from "../Review/Review";

const ReviewsCard = ({ totalaverage, reviewlength }) => {
  const [isActive, setisActive] = useState("Sellers");

  const ActiveTab =
    "bg-[#FFEAEF] border-b-[#E5002A] rounded-t-lg text-[#404040] font-semibold";

  const NormalTab =
    "w-[50%] grid place-items-center  text-[#737373] font-medium text-sm md:text-sm  lg:text-base border border-b-2 border-transparent hover:border-b-[#E5002A] py-3 px-10 ease-in-out duration-700 cursor-pointer";

  const ReviewTags = [
    "Professional (328)",
    "Great communicator (271)",
    "Genuine (268)",
    "Trustworthy (223)",
    "Reliable (209)",
    "Got a great price (180)",
    "Suburb specialist (171)",
    "Great negotiator (135)",
    "Punctual (123)",
    "Great marketer (118)",
  ];

  const SellersReviews = [
    {
      profile: agencyAgentImg7,
      name: "Savannah Davis",
      post: "Seller of House in Upper Coomera, Qld",
      time: "2 days ago",
      rating: "5.0",
      review:
        "From our first meeting with Brad we knew we were in great company. His professionalism and knowledge of the market left us feeling confident and initial appraisal met our expectations. To further credit Brad he has the support of a well orchestrated team of positive and encouraging people with exceptional communication and correspondence throughout the whole experience. We are both thankful for the successful sale of our property and are excited for the new...",
    },
    {
      profile: a2,
      name: "Brad Wilson",
      post: "Seller of House in Upper Coomera, Qld",
      time: "3 days ago",
      rating: "5.0",
      review:
        "From our first meeting with Brad we knew we were in great company. His professionalism and knowledge of the market left us feeling confident and initial appraisal met our expectations. To further credit Brad he has the support of a well orchestrated team of positive and encouraging people with exceptional communication and correspondence throughout the whole experience. We are both thankful for the successful sale of our property and are excited for the new...",
    },
    {
      profile: agencyAgentImg7,
      name: "Savannah Davis",
      post: "Seller of House in Upper Coomera, Qld",
      time: "5 days ago",
      rating: "5.0",
      review:
        "From our first meeting with Brad we knew we were in great company. His professionalism and knowledge of the market left us feeling confident and initial appraisal met our expectations. To further credit Brad he has the support of a well orchestrated team of positive and encouraging people with exceptional communication and correspondence throughout the whole experience. We are both thankful for the successful sale of our property and are excited for the new...",
    },
  ];

  const BuyersReviews = [
    {
      profile: a2,
      name: "Brad Wilson",
      post: "Buyer of House in Upper Coomera, Qld",
      time: "1 days ago",
      rating: "5.0",
      review:
        "From our first meeting with Brad we knew we were in great company. His professionalism and knowledge of the market left us feeling confident and initial appraisal met our expectations. To further credit Brad he has the support of a well orchestrated team of positive and encouraging people with exceptional communication and correspondence throughout the whole experience. We are both thankful for the successful sale of our property and are excited for the new...",
    },
    {
      profile: agencyAgentImg7,
      name: "Savannah Davis",
      post: "Buyer of House in Upper Coomera, Qld",
      time: "2 days ago",
      rating: "5.0",
      review:
        "From our first meeting with Brad we knew we were in great company. His professionalism and knowledge of the market left us feeling confident and initial appraisal met our expectations. To further credit Brad he has the support of a well orchestrated team of positive and encouraging people with exceptional communication and correspondence throughout the whole experience. We are both thankful for the successful sale of our property and are excited for the new...",
    },
    {
      profile: a2,
      name: "Brad Wilson",
      post: "Buyer of House in Upper Coomera, Qld",
      time: "3 days ago",
      rating: "5.0",
      review:
        "From our first meeting with Brad we knew we were in great company. His professionalism and knowledge of the market left us feeling confident and initial appraisal met our expectations. To further credit Brad he has the support of a well orchestrated team of positive and encouraging people with exceptional communication and correspondence throughout the whole experience. We are both thankful for the successful sale of our property and are excited for the new...",
    },
    {
      profile: agencyAgentImg7,
      name: "Savannah Davis",
      post: "Buyer of House in Upper Coomera, Qld",
      time: "5 days ago",
      rating: "5.0",
      review:
        "From our first meeting with Brad we knew we were in great company. His professionalism and knowledge of the market left us feeling confident and initial appraisal met our expectations. To further credit Brad he has the support of a well orchestrated team of positive and encouraging people with exceptional communication and correspondence throughout the whole experience. We are both thankful for the successful sale of our property and are excited for the new...",
    },
  ];

  return (
    <div className="flex flex-col justify-center items-start bg-[#FFFFFF] rounded-xl shadow-md hover:shadow-lg p-4 md:p-6">
      <div className="w-full flex justify-between sm:justify-start items-center gap-3">
        <div className="text-[#171717] font-bold text-base md:text-lg lg:text-xl">
          Our ratings and reviews
        </div>
        <img src={info} alt="icon" className="w-4 cursor-pointer" />
      </div>
      <div className="text-[#404040] font-medium text-sm md:text-sm lg:text-base mt-2">
        Read the latest reviews for the team at Ray White Coomera - COOMERA
      </div>

      {/* ------ Ratings ------ */}
      <div className="flex justify-center items-center mt-3">
        {/* <svg
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
        </svg> */}
        <Review rating={totalaverage} />
      </div>
      <div className="text-[#A3A3A3] text-center font-medium text-xs mt-1">
        {totalaverage} ({reviewlength} {"review"})
      </div>

      {/* ------ Tags ------ */}

      <div className="text-[#404040] font-semibold text-sm md:text-sm lg:text-base mt-4 md:mt-8">
        Clients say the Ray White Coomera - COOMERA team are...
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

      {/* ------ Tabs ------ */}

      <div
        id="navigation"
        className="w-full grid place-items-center overflow-x-scroll md:overflow-hidden rounded-xl"
      >
        <div className="w-full bg-[#FFFFFF] rounded-xl py-4">
          <div className="flex justify-between items-center border border-b-2 border-transparent border-b-[#E5E5E5]">
            <div
              className={`${NormalTab} ${
                isActive === "Sellers" ? ActiveTab : ""
              }`}
              onClick={(e) => {
                setisActive("Sellers");
              }}
            >
              Sellers
            </div>
            <div
              className={`${NormalTab} ${
                isActive === "Buyers" ? ActiveTab : ""
              }`}
              onClick={(e) => {
                setisActive("Buyers");
              }}
            >
              Buyers
            </div>
          </div>
        </div>
      </div>

      {isActive === "Sellers" && (
        <div className="w-full grid grid-cols-1 gap-4">
          {SellersReviews?.length > 0 &&
            SellersReviews?.map((i, index) => (
              <div
                key={index}
                className="w-full flex flex-col justify-start gap-3 bg-[#F5F5F5] rounded-xl p-4 md:p-6"
              >
                <div className="flex flex-col md:flex-row justify-start md:justify-between items-start gap-2">
                  <div className="flex flex-col justify-start items-start">
                    <div className="flex justify-start items-center gap-4 mt-5 md:mt-9">
                      <img
                        src={i?.profile}
                        alt="icon"
                        className="aspect-square w-10 md:w-14"
                      />
                      <div>
                        <div className="text-[#171717] font-semibold text-xs md:text-sm lg:text-base">
                          {i?.name}
                        </div>
                        <div className="text-[#737373] font-medium text-xs md:text-sm">
                          {i?.post}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center items-center mt-2">
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
                      <div className="text-[#A3A3A3] font-medium text-xs px-1">
                        {i?.rating}
                      </div>
                    </div>
                    <div className="text-[#737373] font-medium text-xs mt-2">
                      {i?.time}
                    </div>
                  </div>

                  <div className="flex justify-center items-center gap-2 mt-4 md:mt-6">
                    <img src={verify} alt="icon" className="w-4" />
                    <div className="text-[#737373] font-medium text-xs md:text-sm">
                      Verified review
                    </div>
                  </div>
                </div>
                <div className="text-[#737373] font-medium text-xs md:text-sm lg:text-base">
                  {i?.review}
                </div>
                <div className="flex justify-start items-center gap-2">
                  <div className="text-[#3B8FD4] font-semibold text-xs md:text-sm lg:text-base cursor-pointer">
                    Read More
                  </div>
                  <img
                    src={MoreBlue}
                    alt="icon"
                    className="w-3 cursor-pointer"
                  />
                </div>
              </div>
            ))}
          <button className="w-full flex justify-center items-center text-xs md:text-sm lg:text-base font-medium border text-[#FFFFFF] bg-[#E5002A] border-[#E5002A] hover:text-[#E5002A] hover:bg-[#FFFFFF] hover:font-semibold py-3 px-5 rounded-3xl">
            Show more reviews
          </button>
        </div>
      )}

      {isActive === "Buyers" && (
        <div className="w-full grid grid-cols-1 gap-4">
          {BuyersReviews?.length > 0 &&
            BuyersReviews?.map((i, index) => (
              <div
                key={index}
                className="w-full flex flex-col justify-start gap-3 bg-[#F5F5F5] rounded-xl p-4 md:p-6"
              >
                <div className="flex flex-col md:flex-row justify-start md:justify-between items-start gap-2">
                  <div className="flex flex-col justify-start items-start">
                    <div className="flex justify-start items-center gap-4 mt-5 md:mt-9">
                      <img
                        src={i?.profile}
                        alt="icon"
                        className="aspect-square w-10 md:w-14"
                      />
                      <div>
                        <div className="text-[#171717] font-semibold text-xs md:text-sm lg:text-base">
                          {i?.name}
                        </div>
                        <div className="text-[#737373] font-medium text-xs md:text-sm">
                          {i?.post}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center items-center mt-2">
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
                      <div className="text-[#A3A3A3] font-medium text-xs px-1">
                        {i?.rating}
                      </div>
                    </div>
                    <div className="text-[#737373] font-medium text-xs mt-2">
                      {i?.time}
                    </div>
                  </div>

                  <div className="flex justify-center items-center gap-2 mt-4 md:mt-6">
                    <img src={verify} alt="icon" className="w-4" />
                    <div className="text-[#737373] font-medium text-xs md:text-sm">
                      Verified review
                    </div>
                  </div>
                </div>
                <div className="text-[#737373] font-medium text-xs md:text-sm lg:text-base">
                  {i?.review}
                </div>
                <div className="flex justify-start items-center gap-2">
                  <div className="text-[#3B8FD4] font-semibold text-xs md:text-sm lg:text-base cursor-pointer">
                    Read More
                  </div>
                  <img
                    src={MoreBlue}
                    alt="icon"
                    className="w-3 cursor-pointer"
                  />
                </div>
              </div>
            ))}
          <button className="w-full flex justify-center items-center text-xs md:text-sm lg:text-base font-medium border text-[#FFFFFF] bg-[#E5002A] border-[#E5002A] hover:text-[#E5002A] hover:bg-[#FFFFFF] hover:font-semibold py-3 px-5 rounded-3xl">
            Show more reviews
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewsCard;
