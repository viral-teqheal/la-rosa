import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ag1 from "../../../assets/ag1.png";
import email from "../../../assets/message_icon.png";
import mailWhite from "../../../assets/mailWhite.png";
import call from "../../../assets/call_icon.png";
import shareRed from "../../../assets/shareRed.png";
import { BACKEND_BASE_URL } from "../../../apiInstances/baseurl";
import Review from "../Review/Review";

const AgencyConnectCard = ({
  AgencyData,
  handleClick,
  totalaverage,
  reviewlength,
}) => {

  return (
    <div className="flex flex-col justify-between bg-white rounded-xl shadow-md hover:shadow-lg cursor-pointer">
      {/* ------ Profile ------ */}
      <div className="flex flex-col justify-center items-center">
        <div
          className={`w-full grid place-items-center py-3 rounded-t-xl bg-[${AgencyData?.[0]?.primary_color}]`}
        >
          <LazyLoadImage
            src={AgencyData?.[0]?.agencySmallLogo}
            alt=""
            srcSet={AgencyData?.[0]?.agencySmallLogo}
            loading="lazy"
            effect="blur"
            className="h-10 rounded-lg"
          />
        </div>
        <div className="flex flex-col justify-center items-center pt-4 md:pt-6 px-4 md:px-6">
          <div className="text-[#171717] text-center font-semibold text-base md:text-lg lg:text-xl">
            {AgencyData?.[0]?.principal_name}
          </div>

          {/* ------ Ratings ------ */}
          <div className="flex flex-col gap-2 justify-center items-center mt-4">
            <Review rating={totalaverage} />
            <div className="text-[#737373] text-xs md:text-sm">
              {totalaverage} ({reviewlength} {"review"})
            </div>
          </div>
        </div>
      </div>
      {/* ------ Buttons ------ */}
      <div className="w-full p-4 md:p-6">
        <div className="flex flex-col justify-end items-end gap-3">
          <div className="w-full flex justify-center items-center gap-4">
            <button
              onClick={() => handleClick("Contact")}
              className="w-full flex justify-center items-center gap-1 text-xs font-medium border text-[#FFFFFF] bg-[#E5002A] border-[#E5002A] py-3 px-4 rounded-3xl"
            >
              <img src={mailWhite} alt="icon" className="w-4 cursor-pointer" />
              <div>Request a free appraisal</div>
            </button>
            <div className="grid place-content-center bg-[#FFEAEF] border border-[#FA979A] rounded-full p-2 md:p-3 cursor-pointer">
              <LazyLoadImage
                src={call}
                alt="icon"
                srcSet={call}
                loading="lazy"
                effect="blur"
                className="w-4 md:w-5"
              />
            </div>
          </div>
          <div className="w-full flex justify-center items-center gap-4">
            <button
              onClick={() => handleClick("Contact")}
              className="w-full flex justify-center items-center gap-2 text-xs font-medium border text-[#737373] bg-[#FFFFFF] border-[#737373] py-3 px-5 rounded-3xl"
            >
              <img src={email} alt="icon" className="w-4 cursor-pointer" />
              <div>Enquire</div>
            </button>
            <div className="grid place-content-center bg-[#FFEAEF] border border-[#FA979A] rounded-full p-2 md:p-3 cursor-pointer">
              <LazyLoadImage
                src={shareRed}
                alt="icon"
                srcSet={shareRed}
                loading="lazy"
                effect="blur"
                className="w-4 md:w-5"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgencyConnectCard;
