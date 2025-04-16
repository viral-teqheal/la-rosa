import React from "react";
import mailWhite from "../../../assets/mailWhite.png";
import upArrowRed from "../../../assets/upArrowRed.png";
import sideArrowRed from "../../../assets/sideArrowRed.png";
import realEstate from "../../../assets/realEstate.mp4";
import { useNavigate } from "react-router-dom";
import isEmpty from "../utils/isEmpty";

const AgentAboutCard = ({ AgentData }) => {
  let respone = isEmpty(AgentData);
  const navigate = useNavigate();

  return (
    <>
      {respone === false && (
        <div className="flex flex-col justify-start items-start bg-[#FFFFFF] rounded-xl shadow-md hover:shadow-lg p-4 md:p-6">
          <div className="text-[#171717] font-bold text-base md:text-lg lg:text-xl">
            About {AgentData?.first_name}
          </div>
          {/* <div className="text-[#737373] font-medium text-sm md:text-sm mt-2">
            5 years of experience
          </div> */}

          <div className="text-[#525252] font-medium text-xs md:text-sm mt-4 md:mt-6">
            {AgentData?.about_me}
          </div>
          <div className="flex justify-start items-center gap-2 mt-4">
            <div className="text-[#E5002A] font-semibold text-xs md:text-sm cursor-pointer">
              Read less
            </div>
            <img src={upArrowRed} alt="icon" className="w-3 cursor-pointer" />
          </div>
          <div className="text-[#171717] font-semibold text-sm md:text-base mt-4 md:mt-6">
            SPECIALITIES
          </div>
          <div className="text-[#525252] font-medium text-sm md:text-sm mt-2">
            {AgentData?.specialties}
          </div>
          {/* <div className="text-[#525252] font-medium text-sm md:text-sm mt-2">
        - Customer focused approach (most recommended agent in Upper Coomera)
      </div>
      <div className="text-[#525252] font-medium text-sm md:text-sm">
        - Highly trained in Auction and Private Treaty campaign execution with
        proven results
      </div>
      <div className="text-[#525252] font-medium text-sm md:text-sm">
        - Average sale price exceeding industry average for Upper Coomera
      </div> */}
          <div className="flex justify-start items-center gap-2 mt-4">
            <div className="text-[#E5002A] font-semibold text-xs md:text-sm cursor-pointer">
              Read more
            </div>
            <img src={sideArrowRed} alt="icon" className="w-4 cursor-pointer" />
          </div>

          <div className="w-full   mt-4 md:mt-6 rounded-lg cursor-pointer">
            <iframe
              width="100%"
              height="400px"
              src={`https://www.youtube.com/embed/${AgentData?.video_URL.slice(
                32,
                43
              )}`}
            ></iframe>
            {/* <video width="full" height="full" controls>
          <source src={realEstate} type="video/mp4" />
        </video> */}
          </div>

          <div className="text-[#171717] font-semibold text-sm md:text-base mt-4 md:mt-6">
            AWARDS
          </div>
          <div className="text-[#525252] font-medium text-sm md:text-sm mt-2">
            {AgentData?.awards}
          </div>
          {/* <div className="text-[#525252] font-medium text-sm md:text-sm mt-2">
        Awarded Ray White Elite performer 20-21, Elite performer 21-22 (top 3%
        ray white agents internationally)
      </div>
      <div className="text-[#525252] font-medium text-sm md:text-sm">
        Awarded Premier member sales status 2021 - 2022, Awarded Premier member
        sales status 2020 - 2021.
      </div>
      <div className="text-[#525252] font-medium text-sm md:text-sm">
        Awarded Agent of the year for Upper Coomera (Rate my Agent) 2021
      </div> */}
          <div className="flex justify-start items-center gap-2 mt-4">
            <div className="text-[#E5002A] font-semibold text-xs md:text-sm cursor-pointer">
              Read more
            </div>
            <img src={sideArrowRed} alt="icon" className="w-4 cursor-pointer" />
          </div>
          <div className="text-[#171717] font-semibold text-sm md:text-base mt-4 md:mt-6">
            COMMUNITY INVOLVEMENT
          </div>
          <div className="text-[#525252] font-medium text-sm md:text-sm mt-2">
            {AgentData?.community_involvement}
          </div>
          {/* <div className="text-[#525252] font-medium text-sm md:text-sm mt-2">
        As an individual agent, Brad supports Ray White Coomera/Upper Coomera
        and the fundraising efforts for our local community.
      </div>
      <div className="text-[#525252] font-medium text-sm md:text-sm">
        Currently we are proud supporters of
      </div>
      <div className="text-[#525252] font-medium text-sm md:text-sm">
        - Upper Coomera State College and their Future Stars Program.
      </div> */}
          <div className="flex justify-start items-center gap-2 mt-4">
            <div className="text-[#E5002A] font-semibold text-xs md:text-sm cursor-pointer">
              Read more
            </div>
            <img src={sideArrowRed} alt="icon" className="w-4 cursor-pointer" />
          </div>

          <div
            className="w-full grid place-items-center mt-5 md:mt-8"
            onClick={() => {
              navigate(`/appraisal/${AgentData?._id}`);
            }}
          >
            <button className="w-full flex justify-center items-center gap-2 text-xs font-medium border text-[#FFFFFF] bg-[#E5002A] border-[#E5002A] py-3 px-5 rounded-3xl">
              <img src={mailWhite} alt="icon" className="w-4 cursor-pointer" />
              <div>Request Appraisal</div>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default AgentAboutCard;
