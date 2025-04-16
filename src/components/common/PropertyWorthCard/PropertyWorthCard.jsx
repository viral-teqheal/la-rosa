import React from "react";
import sideArrow from "../../../assets/side-arrow.png";

const PropertyWorthCard = (props) => {
  return (
    <>

      {!props &&

        <div
          className={`flex justify-between items-center bg-white rounded-2xl shadow-md hover:shadow-lg p-5 ${props.style}`}
        >
          <div className="flex flex-col justify-start">
            <div className="text-[#171717] font-semibold text-md md:text-xl">
              What’s your property worth?
            </div>
            <div className="text-[#737373] font-medium text-base md:text-lg mt-2">
              Get a guide to the market.
            </div>
          </div>
          <img src={sideArrow} alt="" className="p-3 cursor-pointer" />
        </div>
      }
    </>
  );
};

export default PropertyWorthCard;
