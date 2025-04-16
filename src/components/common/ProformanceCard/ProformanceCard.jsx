import React, { useState } from "react";
import info from "../../../assets/infoOutline.png";
import House from "../../../assets/House.png";
import Townhouse from "../../../assets/Townhouse.png";

const ProformanceCard = () => {
  const [IsActive, setIsActive] = useState("Sold");

  const ActiveTab = "text-white bg-[#E5002A]";

  const SoldData = [
    {
      Image: House,
      Type: "House",
      Title1: "107",
      Description1: "sold",
      Title2: "$ 758k",
      Description2: "Median price",
      Title3: "21",
      Description3: "Median days advertised",
    },
    {
      Image: Townhouse,
      Type: "Townhouse",
      Title1: "20",
      Description1: "sold",
      Title2: "$ 520k",
      Description2: "Median price",
      Title3: "22",
      Description3: "Median days advertised",
    },
    {
      Image: Townhouse,
      Type: "Duplex/Semi-detached",
      Title1: "8",
      Description1: "sold",
      Title2: "$ 573k",
      Description2: "Median price",
      Title3: "23.5",
      Description3: "Median days advertised",
    },
  ];

  const LeasedData = [
    {
      Image: House,
      Type: "House",
      Title1: "170",
      Description1: "Leased",
      Title2: "$ 758k",
      Description2: "Median price",
      Title3: "21",
      Description3: "Median days advertised",
    },
    {
      Image: Townhouse,
      Type: "Townhouse",
      Title1: "120",
      Description1: "Leased",
      Title2: "$ 520k",
      Description2: "Median price",
      Title3: "22",
      Description3: "Median days advertised",
    },
    {
      Image: Townhouse,
      Type: "Duplex/Semi-detached",
      Title1: "80",
      Description1: "Leased",
      Title2: "$ 573k",
      Description2: "Median price",
      Title3: "23.5",
      Description3: "Median days advertised",
    },
  ];

  return (
    <div className="flex flex-col justify-center items-start bg-[#FFFFFF] rounded-xl shadow-md hover:shadow-lg p-4 md:p-6">
      <div className="w-full flex justify-between sm:justify-start items-center gap-3">
        <div className="text-[#171717] font-bold text-base md:text-lg lg:text-xl">
          Our Market Performance
        </div>
        <img src={info} alt="icon" className="w-4 cursor-pointer" />
      </div>
      <div className="text-[#404040] font-medium text-sm md:text-sm lg:text-base mt-2">
        In the last 12 months agents at Ray White Coomera - COOMERA have sold
        141 properties with a median sold price of $700k on realestate.com.au.
      </div>

      <div className="w-full sm:w-auto flex justify-center items-center border border-[#E5E5E5] rounded-[28px] cursor-pointer mt-4 md:mt-6">
        <button
          className={`w-full sm:w-auto text-xs md:text-sm lg:text-base py-3 px-10 rounded-[28px] text-[#404040] ${
            IsActive === "Sold" ? ActiveTab : null
          }`}
          onClick={() => {
            setIsActive("Sold");
          }}
        >
          Sold
        </button>
        <button
          className={`w-full sm:w-auto text-xs md:text-sm lg:text-base py-3 px-10 rounded-[28px] text-[#404040] ${
            IsActive === "Leased" ? ActiveTab : null
          }`}
          onClick={() => {
            setIsActive("Leased");
          }}
        >
          Leased
        </button>
      </div>

      <div className="w-full grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-4 md:mt-6">
        {IsActive === "Sold" &&
          SoldData?.length > 0 &&
          SoldData?.map((i, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center  gap-4 bg-[#F5F5F5] rounded-lg shadow-md hover:shadow-lg cursor-pointer p-4"
            >
              <div className="flex flex-col justify-center items-center">
                <img src={i?.Image} alt="icon" className="md:w-28" />
                <div className="text-[#404040] text-center font-semibold text-sm md:text-sm lg:text-base mt-2">
                  {i?.Type}
                </div>
              </div>
              <div className="flex justify-center items-start gap-4">
                <div className="w-[33%] flex flex-col justify-center items-center gap-2">
                  <div className="text-[#171717] text-center font-bold text-sm md:text-base lg:text-lg">
                    {i?.Title1}
                  </div>
                  <div className="text-[#525252] text-center font-medium text-sm md:text-sm">
                    {i?.Description1}
                  </div>
                </div>
                <div className="w-[33%] flex flex-col justify-center items-center gap-2">
                  <div className="text-[#171717] text-center font-bold text-sm md:text-base lg:text-lg">
                    {i?.Title2}
                  </div>
                  <div className="text-[#525252] text-center font-medium text-sm md:text-sm">
                    {i?.Description2}
                  </div>
                </div>
                <div className="w-[33%] flex flex-col justify-center items-center gap-2">
                  <div className="text-[#171717] text-center font-bold text-sm md:text-base lg:text-lg">
                    {i?.Title3}
                  </div>
                  <div className="text-[#525252] text-center font-medium text-sm md:text-sm">
                    {i?.Description3}
                  </div>
                </div>
              </div>
            </div>
          ))}

        {IsActive === "Leased" &&
          LeasedData?.length > 0 &&
          LeasedData?.map((i, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center  gap-4 bg-[#F5F5F5] rounded-lg shadow-md hover:shadow-lg cursor-pointer p-4"
            >
              <div className="flex flex-col justify-center items-center">
                <img src={i?.Image} alt="icon" className="md:w-28" />
                <div className="text-[#404040] text-center font-semibold text-sm md:text-sm lg:text-base mt-2">
                  {i?.Type}
                </div>
              </div>
              <div className="flex justify-center items-start gap-4">
                <div className="w-[33%] flex flex-col justify-center items-center gap-2">
                  <div className="text-[#171717] text-center font-bold text-sm md:text-base lg:text-lg">
                    {i?.Title1}
                  </div>
                  <div className="text-[#525252] text-center font-medium text-sm md:text-sm">
                    {i?.Description1}
                  </div>
                </div>
                <div className="w-[33%] flex flex-col justify-center items-center gap-2">
                  <div className="text-[#171717] text-center font-bold text-sm md:text-base lg:text-lg">
                    {i?.Title2}
                  </div>
                  <div className="text-[#525252] text-center font-medium text-sm md:text-sm">
                    {i?.Description2}
                  </div>
                </div>
                <div className="w-[33%] flex flex-col justify-center items-center gap-2">
                  <div className="text-[#171717] text-center font-bold text-sm md:text-base lg:text-lg">
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
    </div>
  );
};

export default ProformanceCard;
