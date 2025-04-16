import React, { useState } from "react";
import info from "../../../assets/infoOutline.png";

const AgentProformanceCard = ({ AgentData }) => {
  const SoldData = [
    {
      MainTitle: "112",
      Type: "Properties sold *",
      Title1: "0 sold",
      Description1: "Apartments",
      Title2: "101 sold",
      Description2: "Houses",
      Title3: "4 sold",
      Description3: "Townhouses",
    },
    {
      MainTitle: "$ 812k",
      Type: "Median sold price",
      Title1: "-",
      Description1: "Apartments",
      Title2: "$ 855k",
      Description2: "Houses",
      Title3: "$ 551k",
      Description3: "Townhouses",
    },
    {
      MainTitle: "21 days",
      Type: "Median days advertised",
      Title1: "-",
      Description1: "Apartments",
      Title2: "21 days",
      Description2: "Houses",
      Title3: "19 days",
      Description3: "Townhouses",
    },
  ];

  return (
    <div className="flex flex-col justify-center items-start bg-[#FFFFFF] rounded-xl shadow-md hover:shadow-lg p-4 md:p-6">
      <div className="w-full flex justify-between sm:justify-start items-center gap-3">
        <div className="text-[#171717] font-bold text-base md:text-lg lg:text-xl">
          {AgentData?.first_name}'s performance
        </div>
        <img src={info} alt="icon" className="w-4 cursor-pointer" />
      </div>
      <div className="text-[#404040] font-medium text-sm md:text-sm lg:text-base mt-2">
        In the last 12 months agents at Ray White Coomera - COOMERA have sold
        141 properties with a median sold price of $700k on realestate.com.au.
      </div>

      <div className="w-full grid place-items-center md:place-items-start grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4 md:my-6">
        {SoldData?.length > 0 &&
          SoldData?.map((i, index) => (
            <div
              key={index}
              className="w-full flex flex-col justify-center items-center  gap-4 bg-[#F5F5F5] rounded-lg shadow-md hover:shadow-lg cursor-pointer p-4"
            >
              <div className="w-full flex flex-col justify-center items-center gap-2">
                <div className="text-[#404040] text-center font-extrabold text-lg md:text-xl">
                  {i?.MainTitle}
                </div>
                <div className="text-[#404040] text-center font-medium text-sm md:text-sm lg:text-base mt-2">
                  {i?.Type}
                </div>
              </div>
              <div className="w-full flex justify-center items-start gap-4">
                <div className="w-[33%] flex flex-col justify-center items-center gap-2">
                  <div className="text-[#171717] text-center font-bold text-sm md:text-base ">
                    {i?.Title1}
                  </div>
                  <div className="text-[#525252] text-center font-medium text-sm md:text-sm">
                    {i?.Description1}
                  </div>
                </div>
                <div className="w-[33%] flex flex-col justify-center items-center gap-2">
                  <div className="text-[#171717] text-center font-bold text-sm md:text-base">
                    {i?.Title2}
                  </div>
                  <div className="text-[#525252] text-center font-medium text-sm md:text-sm">
                    {i?.Description2}
                  </div>
                </div>
                <div className="w-[33%] flex flex-col justify-center items-center gap-2">
                  <div className="text-[#171717] text-center font-bold text-sm md:text-base">
                    {i?.Title3}
                  </div>
                  <div className="text-[#525252] text-center font-medium text-sm md:text-sm">
                    {i?.Description3}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      <li className="text-[#404040] font-medium text-sm md:text-sm lg:text-base">
        Properties sold may include other property types not listed here.
      </li>

      <li className="text-[#404040] font-medium text-sm md:text-sm lg:text-base mt-1">
        Statistics are based on realestate.com.au sold listings in the last 12
        months.
      </li>
    </div>
  );
};

export default AgentProformanceCard;
