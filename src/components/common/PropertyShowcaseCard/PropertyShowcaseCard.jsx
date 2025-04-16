import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import showcaseAgency from "../../../assets/showcase-agency.png";
import Image0 from "../../../assets/image (0).png";
import bedroom_icon from "../../../assets/bedroom_icon.png";
import shower_icon from "../../../assets/shower_icon.png";
import car_icon from "../../../assets/car_icon.png";
import square from "../../../assets/square.png";
import { useNavigate } from "react-router-dom";

const PropertyShowcaseCard = ({ PropertyData }) => {
  const navigate = useNavigate();
  const randomIndex = Math.floor(Math.random() * PropertyData.length)
  return (
    <>
      {PropertyData?.length > 0 && (
        <>
          <div className="grid place-items-center mx-auto">
            <div className="text-start font-semibold text-sm lg:text-lg text-[#737373] py-4 px-5">
              PROPERTY SHOWCASE
            </div>
            <div className="max-w-lg grid place-items-center bg-white rounded-2xl shadow-md hover:shadow-lg overflow-hidden">
              <div className="bg-[#172C66] w-full h-16 flex justify-center items-center">
                <img src={PropertyData[randomIndex].agencyLogo} alt="agency_logo" className="rounded-xl w-14 h-12 object-cover" />
              </div>

              <div className="p-5">
                <div className="flex flex-col lg:flex-row justify-center gap-2">
                  {PropertyData?.length === 1 ? (
                    <div className="data1">
                      <LazyLoadImage
                        src={PropertyData[0]?.frontPageImg[0]}
                        alt="icon"
                        srcSet={Image0}
                        loading="lazy"
                        effect="blur"
                        className="rounded-md h-40"
                      />
                    </div>
                  ) : (
                    <div className=" mainImg">
                      <LazyLoadImage
                        src={PropertyData[randomIndex]?.frontPageImg[0]}
                        alt="icon"
                        srcSet={Image0}
                        loading="lazy"
                        effect="blur"
                        className="rounded-md h-40"
                      />
                    </div>
                  )}
                  {PropertyData?.length > 1 && (
                    <div className="grid grid-cols-2 gap-2 subimg">
                      {PropertyData?.slice(0, 4).map((data, key) => (
                        <LazyLoadImage
                          key={key}
                          src={data?.frontPageImg[0]}
                          alt="icon"
                          srcSet={data?.frontPageImg[0]}
                          loading="lazy"
                          effect="blur"
                          className="rounded-md"
                        />
                      ))}
                    </div>
                  )}
                </div>
                <div className="mx-4">
                  <div className="font-extrabold text-[#171717] text-start text-md lg:text-xl mt-4 lg:mt-5">
                    {`${PropertyData[randomIndex]?.street_address_name}`}
                  </div>

                  <div className="flex flex-wrap justify-start items-center gap-2 mt-3">
                    <div className="flex justify-center items-center bg-[#F5F5F5] rounded-md p-2">
                      <img
                        src={bedroom_icon}
                        alt="location"
                        className="w-4 lg:w-5 mr-3"
                      />
                      <div className="font-semibold text-[#737373] text-xs lg:text-base">
                        {`${PropertyData[randomIndex]?.Bedrooms}`}
                      </div>
                    </div>
                    <div className="flex justify-center items-center bg-[#F5F5F5] rounded-md p-2">
                      <img
                        src={shower_icon}
                        alt="bedroom"
                        className="w-4 lg:w-5 mr-3"
                      />
                      <div className="font-semibold text-[#737373] text-xs lg:text-base">
                        {`${PropertyData[randomIndex]?.Bathrooms}`}
                      </div>
                    </div>
                    <div className="flex justify-center items-center bg-[#F5F5F5] rounded-md p-2">
                      <img
                        src={car_icon}
                        alt="shower"
                        className="w-4 lg:w-5 mr-3"
                      />
                      <div className="font-semibold text-[#737373] text-xs lg:text-base">
                        {`${PropertyData[randomIndex]?.carport_spaces}`}
                      </div>
                    </div>
                    <div className="flex justify-center items-center bg-[#F5F5F5] rounded-md p-2">
                      <img src={square} alt="car" className="w-4 lg:w-5 mr-3" />
                      <div className="font-semibold text-[#737373] text-xs lg:text-base">
                        {`${PropertyData[randomIndex]?.street_address_name}`}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-start items-center mt-3">
                    {/* <img
                src={showcaseAgent}
                alt="bedroom"
                className="w-10 lg:w-14 rounded-full mr-3"
              /> */}
                    <LazyLoadImage
                      src={PropertyData[randomIndex]?.lead_agent?.profileImg}
                      alt="icon"
                      srcSet={PropertyData[randomIndex]?.lead_agent?.profileImg}
                      loading="lazy"
                      effect="blur"
                      className=" h-10 md:w-auto rounded-full aspect-square mr-2 "
                    />
                    <div className="font-semibold text-[#171717] text-sm lg:text-lg">
                      {`${PropertyData[randomIndex]?.lead_agent?.name}`}
                    </div>
                  </div>

                  <div className="w-full grid place-items-center border border-[#737373] rounded-3xl mt-3 cursor-pointer">
                    <div
                      className="font-semibold text-[#737373] text-sm lg:text-lg py-2"
                      onClick={() =>
                        navigate(`/property-house/${PropertyData[randomIndex]?.id}`)
                      }
                    >
                      View Property
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PropertyShowcaseCard;