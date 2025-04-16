import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ag1 from "../../../assets/ag1.png";
import a2 from "../../../assets/a2.png";
import { BACKEND_BASE_URL } from "../../../apiInstances/baseurl";
import GeneralEnquiry from "../GeneralEnquiry/GeneralEnquiry";
import Review from "../Review/Review";
import isEmpty from "../utils/isEmpty";
import { Link } from "react-router-dom";

const AgentContactCard = ({ AgentData, averageRatings }) => {
  const [Next, setNext] = useState(true);
  const [whichActive, setWhichActive] = useState("Selling a property");
  const ActiveTab = "!border !text-[#FFFFFF] !bg-[#E5002A] !border-[#E5002A]";

  return (
    <div className="flex flex-col justify-between bg-white rounded-xl shadow-md hover:shadow-lg cursor-pointer">
      {/* ------ Profile ------ */}
      <div className="flex flex-col justify-center">
        <div
          className={`w-full grid place-items-center py-3 rounded-t-xl bg-[${AgentData?.agency_id?.primary_color}]`}
        >
          <Link to={`/agency-profile/${AgentData?.agency_id?._id}`}>

            <LazyLoadImage
              src={AgentData?.agency_id?.agencySmallLogo}
              alt=""
              srcSet={AgentData?.agency_id?.agencySmallLogo}
              loading="lazy"
              effect="blur"
              className="h-10 rounded-lg"
            />
          </Link>
        </div>
        <div className="flex flex-col justify-start pt-4 md:pt-6 px-4 md:px-6">
          <div className="flex justify-start items-start gap-4 mt-5 md:mt-9">
            <img
              src={AgentData?.profileImg}
              alt=""
              className="w-14 md:w-24 aspect-square rounded-full"
            />
            <div className="flex flex-col justify-start items-start">
              <div className="text-[#171717] font-bold text-base md:text-lg lg:text-xl px-1">
                {AgentData?.first_name} {AgentData?.last_name}
              </div>
              <Review rating={averageRatings} />

              <div className="text-[#A3A3A3] font-medium text-xs md:text-sm mt-1 px-1">
                {averageRatings == 0
                  ? averageRatings
                  : averageRatings.toFixed(1)}{" "}
                ({AgentData?.reviews?.length} {"review"})
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ------ Buttons ------ */}
      {Next ? (
        <div className="w-full p-4 md:p-6">
          <div className="flex flex-col justify-start items-start gap-3 mt-5">
            <div className="text-[#404040] text-center font-semibold text-sm md:text-base lg:text-lg">
              What’s your enquiry about?
            </div>

            <div className="w-full flex flex-col justify-center items-center gap-3">
              <div className="w-full flex flex-col md:flex-row justify-center items-center gap-3">
                <button
                  className={`w-full flex justify-center items-center text-xs md:text-sm lg:text-base font-medium border border-[#737373] text-[#737373] hover:bg-[#FFFFFF] py-3 px-5 rounded-3xl ${whichActive === "Selling a property" ? ActiveTab : null
                    }`}
                  onClick={() => setWhichActive("Selling a property")}
                >
                  Selling a property
                </button>
                <button
                  className={`w-full flex justify-center items-center text-xs md:text-sm lg:text-base font-medium border border-[#737373] text-[#737373] hover:bg-[#FFFFFF] py-3 px-5 rounded-3xl ${whichActive === "An advertised property" ? ActiveTab : null
                    }`}
                  onClick={() => setWhichActive("An advertised property")}
                >
                  An advertised property
                </button>
              </div>
              <div className="w-full flex flex-col md:flex-row justify-center items-center gap-3">
                <button
                  className={`w-full flex justify-center items-center text-xs md:text-sm lg:text-base font-medium border border-[#737373] text-[#737373] hover:bg-[#FFFFFF] py-3 px-5 rounded-3xl ${whichActive === "Property management" ? ActiveTab : null
                    }`}
                  onClick={() => setWhichActive("Property management")}
                >
                  Property management
                </button>
                <button
                  className={`w-full flex justify-center items-center text-xs md:text-sm lg:text-base font-medium border border-[#737373] text-[#737373] hover:bg-[#FFFFFF] py-3 px-5 rounded-3xl ${whichActive === "General enquiry" ? ActiveTab : null
                    }`}
                  onClick={() => setWhichActive("General enquiry")}
                >
                  General enquiry
                </button>
              </div>
            </div>

            <div className="w-full flex justify-center items-center mt-5 md:mt-10">
              <button
                className="w-full flex justify-center items-center text-xs md:text-sm lg:text-base font-medium border text-[#FFFFFF] bg-[#E5002A] border-[#E5002A] hover:text-[#E5002A] hover:bg-[#FFFFFF] hover:font-semibold py-3 px-5 rounded-3xl"
                onClick={() => setNext(false)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <GeneralEnquiry
            setNext={setNext}
            whichActive={whichActive}
            data={AgentData}
          />
        </div>
      )}
    </div>
  );
};

export default AgentContactCard;
