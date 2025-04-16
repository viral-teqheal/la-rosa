import React from "react";
import info from "../../../assets/infoOutline.png";
import dollerOutline from "../../../assets/dollerOutline.png";
import watchOutline from "../../../assets/watchOutline.png";
import soldOutline from "../../../assets/soldOutline.png";
import HomeOutline from "../../../assets/HomeOutline.png";

const OverviewCard = ({ AgencyData }) => {
  const SalesPerformanceData = [
    {
      Img: dollerOutline,
      Title: "$ 700k",
      Description: "Median sold price",
    },
    {
      Img: watchOutline,
      Title: "23",
      Description: "Median days on site",
    },
    {
      Img: soldOutline,
      Title: "141",
      Description: "Properties sold",
    },
    {
      Img: HomeOutline,
      Title: "14",
      Description: "Properties for sale",
    },
  ];

  const RentPerformanceData = [
    {
      Img: dollerOutline,
      Title: "$ 710pw",
      Description: "Median leased price",
    },
    {
      Img: watchOutline,
      Title: "6",
      Description: "Median days on site",
    },
    {
      Img: HomeOutline,
      Title: "12",
      Description: "Properties leased",
    },
  ];

  return (
    <div className="flex flex-col justify-center items-start bg-[#FFFFFF] rounded-xl shadow-md hover:shadow-lg p-4 md:p-6">
      <div className="w-full flex justify-between sm:justify-start items-center gap-3">
        <div className="text-[#171717] font-bold text-base md:text-lg lg:text-xl">
          Market performance snapshot
        </div>
        <img src={info} alt="icon" className="w-4 cursor-pointer" />
      </div>
      <div className="text-[#404040] font-medium text-sm md:text-sm lg:text-base mt-2">
        In the last 12 months {AgencyData?.principal_name} has sold 141
        properties and leased 12 properties on realestate.com.au.
      </div>

      <div className="w-full flex flex-col justify-start items-start gap-2 md:gap-4 mt-6 md:mt-10">
        <div className="text-[#404040] font-semibold text-sm md:text-sm lg:text-base">
          RENT PERFORMANCE
        </div>
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {SalesPerformanceData?.length > 0 &&
            SalesPerformanceData?.map((d, index) => (
              <div
                key={index}
                className="w-full flex flex-col justify-center items-center gap-1 bg-[#F5F5F5] rounded-lg p-4 md:p-6"
              >
                <img src={d?.Img} alt="icon" className="w-7 cursor-pointer" />
                <div className="text-[#171717] text-center font-bold text-sm md:text-base lg:text-lg mt-2">
                  {d?.Title}
                </div>
                <div className="text-[#525252] text-center font-semibold text-sm md:text-sm">
                  {d?.Description}
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="w-full flex flex-col justify-start items-start gap-2 md:gap-4 mt-6 md:mt-10">
        <div className="text-[#404040] font-semibold text-sm md:text-sm lg:text-base">
          SALES PERFORMANCE
        </div>
        <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {RentPerformanceData?.length > 0 &&
            RentPerformanceData?.map((d, index) => (
              <div
                key={index}
                className="w-full flex flex-col justify-center items-center gap-1 bg-[#F5F5F5] rounded-lg p-4 md:p-6"
              >
                <img src={d?.Img} alt="icon" className="w-7 cursor-pointer" />
                <div className="text-[#171717] text-center font-bold text-sm md:text-base lg:text-lg mt-2">
                  {d?.Title}
                </div>
                <div className="text-[#525252] text-center font-semibold text-sm md:text-sm">
                  {d?.Description}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;
