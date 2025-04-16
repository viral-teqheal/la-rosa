// import React from "react";
// import info from "../../../assets/infoOutline.png";
// import dollerOutline from "../../../assets/dollerOutline.png";
// import watchOutline from "../../../assets/watchOutline.png";
// import soldOutline from "../../../assets/soldOutline.png";
// import HomeOutline from "../../../assets/HomeOutline.png";

// const AgentOverviewCard = ({ AgentData }) => {
//   //console.log("🚀 ~ AgentOverviewCard ~ AgentData:", AgentData)
//   const PerformanceData = [
//     {
//       Img: dollerOutline,
//       Title: "$ 822k",
//       Description: "Median sold price",
//     },
//     {
//       Img: watchOutline,
//       Title: "20",
//       Description: "Median days advertised",
//     },
//     {
//       Img: soldOutline,
//       Title: "110",
//       Description: "Properties sold (as lead agent)",
//     },
//     {
//       Img: HomeOutline,
//       Title: "4",
//       Description: "Properties sold (as secondary agent)",
//     },
//   ];


//   return (
//     <div
//       className={`flex flex-col justify-center items-start ${AgentData==null ? '' : 'bg-[#FFFFFF] rounded-xl shadow-md hover:shadow-lg' }    p-4 md:p-6`}
//     >
//       <div className={`w-full  justify-between sm:justify-start items-center gap-3  ${AgentData==null ? 'hidden' :'flex'}`}>
//         <div className={`text-[#171717] font-bold text-base md:text-lg lg:text-xl ${AgentData==null ? 'hidden' :'flex'}`}>
//           {AgentData?.first_name}'s performance snapshot
//         </div>
//         <img src={info} alt="icon" className="w-4 cursor-pointer" />
//       </div>
//       <div className={`text-[#404040] font-medium text-sm md:text-sm lg:text-base mt-2 ${AgentData==null && 'hidden' }`}>
//         Performance in the last 12 months on realestate.com.au.
//       </div>

//       <div className="w-full flex flex-col justify-start items-start gap-2 md:gap-4 mt-4 md:mt-6">
//         <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
//           {PerformanceData?.length > 0 &&
//             PerformanceData?.map((d, index) => (
//               <div
//                 key={index}
//                 className={`w-full flex flex-col justify-center items-center gap-1   p-4 md:p-6 ${AgentData==null ? '' :'bg-[#F5F5F5] rounded-lg'}`}
//               >
//                 <img src={d?.Img} alt="icon" className="w-7 cursor-pointer" />
//                 <div className="text-[#171717] text-center font-bold text-sm md:text-base lg:text-lg mt-2">
//                   {d?.Title}
//                 </div>
//                 <div className="text-[#525252] text-center font-semibold text-sm md:text-sm">
//                   {d?.Description}
//                 </div>
//               </div>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AgentOverviewCard;

//with grid

import React from "react";
import info from "../../../assets/infoOutline.png";
import dollerOutline from "../../../assets/dollerOutline.png";
import watchOutline from "../../../assets/watchOutline.png";
import soldOutline from "../../../assets/soldOutline.png";
import HomeOutline from "../../../assets/HomeOutline.png";

const AgentOverviewCard = ({ AgentData, DataValue, property }) => {
  // console.log("🚀 ~ AgentOverviewCard ~ AgentData:", DataValue)
  const totalSoldCount = AgentData
  const PerformanceData = [
    {
      Img: dollerOutline,
      Title: `${AgentData?.data?.medianPrice.toFixed(2)}`,
      Description: "Median sold price",
    },
    {
      Img: watchOutline,
      Title: "0",
      Description: "Median days advertised",
    },
    {
      Img: soldOutline,
      Title: `${AgentData?.data?.property_sold?.toFixed(2)} `,
      Description: "Properties sold (as lead agent)",
    },
    {
      Img: HomeOutline,
      Title: `${property?.length}`,
      Description: "All Properties sold ",
    },
  ];


  return (
    <div
      className={`flex flex-col justify-center items-start ${DataValue == true ? '' : 'bg-[#FFFFFF] rounded-xl shadow-md hover:shadow-lg'}    p-4 md:p-6`}
    >
      <div className={`w-full  justify-between sm:justify-start items-center gap-3  ${DataValue == true ? 'hidden' : 'flex'}`}>
        <div className={`text-[#171717] font-bold text-base md:text-lg lg:text-xl ${DataValue == true ? 'hidden' : 'flex'}`}>
          {AgentData?.data?.first_name}'s performance snapshot
        </div>
        <img src={info} alt="icon" className="w-4 cursor-pointer" />
      </div>
      <div className={`text-[#404040] font-medium text-sm md:text-sm lg:text-base mt-2 ${DataValue == true && 'hidden'}`}>
        Performance in the last 12 months on realestate.com.au.
      </div>

      <div className="w-full flex flex-col justify-start items-start gap-2 md:gap-4 mt-4 md:mt-6">
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {PerformanceData?.length > 0 &&
            PerformanceData?.map((d, index) => (
              <div
                key={index}
                className={`w-full grid  gap-1   ${DataValue == true ? '' : 'bg-[#F5F5F5] rounded-lg'}`}
              >
                <div className="flex justify-center items-center">
                  <img src={d?.Img} alt="icon" className="w-7 h-7 cursor-pointer" />
                </div>
                <div className="text-[#171717] text-center font-bold text-sm md:text-base lg:text-lg mt-2">
                  {`${String(d?.Title).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
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

export default AgentOverviewCard;

