import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { BACKEND_BASE_URL } from "../../../apiInstances/baseurl";
import ag1 from "../../../assets/ag1.png";
import GeneralEnquiry from "../GeneralEnquiry/GeneralEnquiry";
import Review from "../Review/Review";

const ContactCard = ({ AgencyData, totalaverage, reviewlength }) => {
  const [whichActive, setWhichActive] = useState("Selling a property");
  const [Next, setNext] = useState(true);

  const ActiveTab = "!border !text-[#FFFFFF] !bg-[#E5002A] !border-[#E5002A]";

  return (
    <div className="flex flex-col justify-between bg-white rounded-xl shadow-md hover:shadow-lg cursor-pointer">
      {/* ------ Profile ------ */}
      <div className="flex flex-col justify-center items-center">
        <div
          className={`w-full grid place-items-center py-3 rounded-t-xl bg-[${AgencyData[0]?.primary_color}]`}
        >
          <LazyLoadImage
            src={AgencyData[0]?.agencySmallLogo}
            alt=""
            srcSet={AgencyData[0]?.agencySmallLogo}
            loading="lazy"
            effect="blur"
            className="h-10 rounded-lg"
          />
        </div>
        <div className="flex flex-col justify-center items-center pt-4 md:pt-6 px-4 md:px-6">
          <div className="text-[#171717] text-center font-bold text-base md:text-lg lg:text-xl">
            {AgencyData[0]?.principal_name}
          </div>

          {/* ------ Ratings ------ */}
          <div className="flex justify-center items-center mt-4">
            <Review rating={totalaverage} />
          </div>
          <div className="text-[#A3A3A3] text-center font-medium text-xs mt-1">
            {totalaverage} ({reviewlength} {"review"})
          </div>
        </div>
      </div>
      {/* ------ Buttons ------ */}
      {Next ? (
        <div className="w-full p-4 md:p-6">
          <div className="flex flex-col justify-start items-start gap-3 mt-5 md:mt-10">
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
            data={AgencyData}
          />
        </div>
      )}
    </div>
  );
};

export default ContactCard;
