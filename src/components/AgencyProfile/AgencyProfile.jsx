import React, { useEffect, useState } from "react";
import Layout2 from "../../Layouts/Layout2";
import { LazyLoadImage } from "react-lazy-load-image-component";
import OverviewCard from "../common/OverviewCard/OverviewCard";
import ContactCard from "../common/ContactCard/ContactCard";
import AboutCard from "../common/AboutCard/AboutCard";
import ReviewsCard from "../common/ReviewsCard/ReviewsCard";
import ProformanceCard from "../common/ProformanceCard/ProformanceCard";
import PropertiesCard from "../common/PropertiesCard/PropertiesCard";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import ag1 from "../../assets/ag1.png";
import workHere1 from "../../assets/workHere1.png";
import workHere2 from "../../assets/workHere2.png";
import workHere3 from "../../assets/workHere3.png";
import email from "../../assets/message_icon.png";
import mailWhite from "../../assets/mailWhite.png";
import call from "../../assets/call_icon.png";
import shareRed from "../../assets/shareRed.png";
import agencyProfileMain from "../../assets/agencyProfileMain.png";
import AgencyConnectCard from "../common/AgencyConnectCard/AgencyConnectCard";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstanceAuth from "../../apiInstances/axiosInstanceAuth";
import { BACKEND_BASE_URL } from "../../apiInstances/baseurl";
import Review from "../common/Review/Review";

const AgencyProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [AgencyData, setAgencyData] = useState({});
  const [AgentsInfo, setAgentsInfo] = useState({});

  const [property, setProperty] = useState({});

  let reviewlength = 0;
  let startcount = 0;
  if (AgentsInfo.length > 0) {
    for (let d of AgentsInfo) {
      if (d.reviews.length > 0) {
        reviewlength += d.reviews.length;
        for (let i = 0; i < d.reviews.length; i++) {
          startcount += Number(d.reviews[i].star);
        }
      }
    }
  }
  let totalaverage = startcount / reviewlength;

  useEffect(() => {
    GetAgentData(id);
    GetAllAgentData(id);
  }, []);

  const GetAgentData = async (id) => {
    await axiosInstanceAuth
      .post(`agency/ViewProfile_U`, {
        id: id,
      })
      .then((res) => {
        const mydata = res?.data?.data;
        if (res?.data?.status) {
          setAgencyData(mydata);
          setProperty(res?.data?.data?.[0]?.properties);
        } else {
        }
      })
      .catch((err) => {
        //console.log("err --->", err);
      });
  };

  const GetAllAgentData = async (id) => {
    await axiosInstanceAuth
      .post("Agency_Agent/viewAllAgentsOfAgency_U", {
        id: id,
      })
      .then((res) => {
        const mydata = res?.data?.data;
        if (res?.data?.status) {
          setAgentsInfo(mydata);
        } else {
        }
      })
      .catch((err) => {
        //console.log("err --->", err);
      });
  };

  const [isActive, setisActive] = useState("Overview");
  const ActiveTab =
    "bg-[#FFEAEF] border-b-[#E5002A] rounded-t-lg text-[#404040] font-semibold";
  const NormalTab =
    "w-[20%] grid place-items-center  text-[#737373] font-medium text-sm md:text-sm  lg:text-base border border-b-2 border-transparent hover:border-b-[#E5002A] py-3 px-10 ease-in-out duration-700 cursor-pointer";

  const tabData = [
    { id: 1, title: "Overview" },
    { id: 2, title: "Properties" },
    { id: 3, title: "Proformance" },
    { id: 4, title: "About" },
    { id: 5, title: "Reviews" },
    { id: 6, title: "Contact" },
  ];
  const handleClick = (e) => {
    document.querySelector(`#${e}`).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      <div className="px-5 pt-3">
        <div className="xl:px-72 lg:px-60">
          {/* ---------- Start Section 1 ---------- */}
          <div className="">
            <div className="flex flex-col justify-between bg-white rounded-xl shadow-md hover:shadow-lg mb-6 md:mb-12">
              {/* ------ Heading ------ */}
              <div className="w-full flex flex-col justify-center items-start">
                <div
                  className={`w-full flex justify-between items-center py-3 rounded-t-xl bg-[${AgencyData[0]?.primary_color}] px-6 md:px-12`}
                >
                  <LazyLoadImage
                    src={AgencyData[0]?.agencySmallLogo}
                    alt=""
                    srcSet={AgencyData[0]?.agencySmallLogo}
                    loading="lazy"
                    effect="blur"
                    className="h-10 rounded-lg"
                  />
                  <div className="flex justify-center items-center">
                    <div className="hidden sm:block">
                      <AvatarGroup total={AgentsInfo?.length}>
                        {AgentsInfo?.length > 0 &&
                          AgentsInfo?.map((i, index) => (
                            <Avatar
                              key={index}
                              alt=""
                              src={i?.profileImg}
                              className="aspect-square rounded-full"
                            />
                          ))}
                      </AvatarGroup>
                    </div>
                    <div className="text-[#000000] font-semibold text-xs md:text-sm ml-3">
                      {AgentsInfo?.length} people work here
                    </div>
                  </div>
                </div>
                {/* ------ Image ------ */}
                <div className="grid place-content-center  ">
                  <LazyLoadImage
                    src={AgencyData[0]?.heroImg}
                    alt=""
                    srcSet={AgencyData[0]?.heroImg}
                    loading="lazy"
                    effect="blur"
                    className="h-[50vh] w-[100vw] object-fill"
                  />
                </div>
              </div>
              {/* ------ Detail ------ */}
              <div className="w-full flex flex-col md:flex-row justify-start md:justify-between items-start gap-4 p-4 md:p-6 ">
                <div className="flex flex-col justify-start gap-2">
                  <div className="text-[#171717] font-bold text-lg md:text-xl lg:text-xl">
                    {AgencyData[0]?.principal_name}
                  </div>
                  <div className="text-[#404040] font-medium text-sm md:text-base ">
                    {AgencyData[0]?.street} {AgencyData[0]?.suburb_area}{" "}
                    {AgencyData[0]?.postcode}
                  </div>
                  <div className="flex flex-row justify-start items-center gap-2 cursor-pointer">
                    {/* <svg
                      aria-hidden="true"
                      className="w-5 h-5 hover:text-gray-300 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg> */}
                    <Review rating={totalaverage} />
                    <div className="text-[#737373] text-xs md:text-sm">
                      {totalaverage} ({reviewlength} {"review"})
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-end items-end gap-3">
                  <div className="w-full flex justify-center items-center gap-4">
                    <button
                      onClick={() => {
                        handleClick("Contact");
                      }}
                      className="w-full flex justify-center items-center gap-2 text-xs md:text-sm font-medium border text-[#FFFFFF] bg-[#E5002A] border-[#E5002A] py-3 px-5 rounded-3xl"
                    >
                      <img
                        src={mailWhite}
                        alt="icon"
                        className="w-4 cursor-pointer"
                      />
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
                      onClick={() => {
                        handleClick("Contact");
                      }}
                      className="w-full flex justify-center items-center gap-2 text-xs md:text-sm font-medium border text-[#737373] bg-[#FFFFFF] border-[#737373] py-3 px-5 rounded-3xl"
                    >
                      <img
                        src={email}
                        alt="icon"
                        className="w-4 cursor-pointer"
                      />
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
          </div>
          {/* ---------- End Section 1 ---------- */}

          {/* ---------- Start Section 2 ---------- */}

          <div className="grid grid-cols-1 xl:grid-cols-9 place-content-center xl:place-items-start gap-10 mb-10">
            {/* ------ Left Part ------ */}
            <div className="w-full grid col-span-1 xl:col-span-7">
              {/* ------ Navigation ------ */}
              <div
                id="navigation"
                className="w-full grid place-items-center overflow-x-scroll rounded-xl"
              >
                <div className="w-full bg-[#FFFFFF] rounded-xl py-4 px-4 md:px-9">
                  <div className="flex justify-between items-center border border-b-2 border-transparent border-b-[#E5E5E5]">
                    {tabData.map((tab) => (
                      <div
                        key={tab.id}
                        className={`${NormalTab} ${isActive === tab.title ? ActiveTab : ""
                          }`}
                        onClick={() => {
                          handleClick(tab.title);
                          setisActive(tab.title);
                        }}
                      >
                        {tab.title}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ------ Overview ------ */}
              <div id="Overview" className="mt-4 md:mt-8">
                <OverviewCard AgencyData={AgencyData} />
              </div>

              {/* ------ Properties ------ */}
              <div id="Properties" className="mt-4 md:mt-8">
                <PropertiesCard property={property} AgencyData={AgencyData} />
              </div>

              {/* ------ Proformance ------ */}
              <div id="Performance" className="mt-4 md:mt-8">
                <ProformanceCard />
              </div>

              <div className="xl:hidden mt-4 md:mt-8">
                <AgencyConnectCard />
              </div>

              {/* ------ About ------ */}
              <div id="About" className="mt-4 md:mt-8">
                <AboutCard AgentsInfo={AgentsInfo} />
              </div>

              {/* ------ Reviews ------ */}
              <div id="Reviews" className="mt-4 md:mt-8">
                <ReviewsCard
                  totalaverage={totalaverage}
                  reviewlength={reviewlength}
                />
              </div>

              {/* ------ Contact ------ */}
              <div id="Contact" className="mt-4 md:mt-8">
                <ContactCard
                  totalaverage={totalaverage}
                  reviewlength={reviewlength}
                  AgencyData={AgencyData}
                />
              </div>
            </div>
            {/* ------ Right Part ------ */}
            <div className="hidden xl:grid col-span-1 xl:col-span-2 place-content-center xl:place-content-start">
              <AgencyConnectCard
                totalaverage={totalaverage}
                reviewlength={reviewlength}
                handleClick={handleClick}
                AgencyData={AgencyData}
              />
            </div>
          </div>
          {/* ---------- End Section 2 ---------- */}
        </div>
      </div>
    </>
  );
};

export default AgencyProfile;
