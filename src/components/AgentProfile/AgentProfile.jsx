import React, { useEffect, useState, useRef } from "react";
import Layout2 from "../../Layouts/Layout2";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import AgentConnectCard from "../common/AgentConnectCard/AgentConnectCard";
import AgentOverviewCard from "../common/AgentOverviewCard/AgentOverviewCard";
import AgentPropertiesCard from "../common/AgentPropertiesCard/AgentPropertiesCard";
import AgentProformanceCard from "../common/AgentProformanceCard/AgentProformanceCard";
import AgentReviewsCard from "../common/AgentReviewsCard/AgentReviewsCard";
import AgentContactCard from "../common/AgentContactCard/AgentContactCard";
import AgentAboutCard from "../common/AgentAboutCard/AgentAboutCard";
import email from "../../assets/message_icon.png";
import mailWhite from "../../assets/mailWhite.png";
import call from "../../assets/call_icon.png";
import shareRed from "../../assets/shareRed.png";
import axiosInstanceAuth from "../../apiInstances/axiosInstanceAuth";
import isEmpty from "../common/utils/isEmpty";
import Review from "../common/Review/Review";

const AgentProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  //console.log("🚀 ~ AgentProfile ~ id:", id);
  const targetDivRef = useRef(null);
  const scrollToDiv = () => {
    targetDivRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
  };
  const Tags = [
    "Professional (0)",
    "Great communicator (0)",
    "Genuine (0)",
  ];
  const [allAgentData, setAllAgentData] = useState({});

  const [AgentData, setAgentData] = useState({});
  //console.log("🚀 ~ AgentProfile ~ AgentData:", AgentData);
  //console.log(
  //   "🚀 ~ AgentProfile ~ AgentData-----------------id:",
  //   AgentData?.agency_id?._id
  // );

  const [property, setProperty] = useState({});
  const [isActive, setisActive] = useState("");
  useEffect(() => {
    GetAgentData(id);
  }, []);

  const GetAgentData = async (id) => {
    await axiosInstanceAuth
      .post(`Agency_Agent/ViewProfile`, {
        id: id,
      })
      .then((res) => {
        const allAgentData = res?.data;
        setAllAgentData(allAgentData);
        const mydata = res?.data?.data;

        // //console.log("-->>>Agency_Agent/ViewProfile", mydata);
        if (res?.data?.status) {
          setAgentData(mydata);
          setProperty(res?.data?.property);
        } else {
          // toast.error("Oops! Something went wrong");
        }
      })
      .catch((err) => {
        //console.log("err --->", err);
      });
  };

  const responce = isEmpty(AgentData);
  let averageRatings = 0;

  const getReviewsData = () => {
    for (var i = 0; i < AgentData?.reviews.length; i++) {
      averageRatings += Number(AgentData?.reviews[i].star);
    }
    return (averageRatings /= Number(AgentData?.reviews.length));
  };

  if (!responce) {
    if (AgentData?.reviews.length !== 0) getReviewsData();
  }
  return (
    <>
      <div className="px-5 pt-3">
        <div className="xl:px-60 lg:px-44 2xl:px-80 mt-16 lg:mt-0">
          {/* ---------- Start Section 1 -------------------- */}
          <div className="">
            <div className="flex flex-col justify-between bg-white rounded-xl shadow-md hover:shadow-lg mb-6 md:mb-12">
              {/* ------ Heading ------ */}
              <div className="w-full flex flex-col  justify-center items-start">
                <div
                  className={`relative w-full flex justify-center items-center py-3 rounded-t-xl px-6 md:px-12 bg-[${AgentData?.agency_id?.primary_color}]`}
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
                {/* ------ Image ------ */}
                <div className="grid place-content-center w-full">
                  <LazyLoadImage
                    // src={agentCoverImg}
                    src={AgentData?.coverProfileImg}
                    alt="icon"
                    style={{ width: "100vw" }}
                    // srcSet={agentCoverImg}
                    srcSet={AgentData?.coverProfileImg}
                    loading="lazy"
                    effect="blur"
                    className="h-[50vh]"
                  />
                </div>
              </div>
              {/* ------ Detail ------ */}
              <div className="w-full flex flex-col md:flex-row justify-start md:justify-between items-center gap-4 p-4 md:p-6 ">
                <div className="flex flex-col md:flex-row justify-center items-center gap-0 md:gap-8">
                  <div className="relative bottom-[50px] md:bottom-[70px] left-[0%]">
                    <LazyLoadImage
                      src={AgentData?.profileImg}
                      alt="icon"
                      srcSet={AgentData?.profileImg}
                      loading="lazy"
                      effect="blur"
                      className="w-20 sm:w-28 md:w-32 xl:w-40 aspect-square rounded-full p-1 bg-white "
                    />
                  </div>
                  <div className="flex flex-col justify-start items-center md:items-start gap-1 -mt-10 md:mt-0">
                    <div className="text-[#171717] font-extrabold text-lg md:text-xl lg:text-xl">
                      {AgentData?.first_name} {AgentData?.last_name}
                    </div>
                    {/* <div className="text-[#737373] font-medium text-xs md:text-sm">
                      5 years of experience
                    </div> */}
                    <div className="text-[#404040] text-center md:text-start font-medium text-sm md:text-base lg:text-lg mt-1">
                      {AgentData?.job_title} at
                      <span
                        className="text-[#3B8FD4] px-2 cursor-pointer"
                        onClick={() => {
                          navigate(
                            `/agency-profile/${AgentData?.agency_id?._id}`
                          );
                        }}
                      >
                        {console.log(AgentData)
                        }
                        {AgentData?.agency_id?.principal_name}
                      </span>
                    </div>

                    <Review rating={averageRatings} />
                    <div className="text-[#A3A3A3] font-medium text-xs md:text-sm mt-1 px-1">
                      {averageRatings == 0
                        ? averageRatings
                        : averageRatings.toFixed(1)}{" "}
                      ({AgentData?.reviews?.length} {"review"})
                    </div>
                    {/* <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 mt-1">
                      {Tags?.length > 0 &&
                        Tags?.map((i, index) => ( 
                          <div
                            key={index}
                            className="flex justify-center items-center bg-[#F5F5F5] rounded-md font-medium text-[#404040] text-xs p-2"
                          >
                            {i}
                          </div>
                        ))}
                    </div> */}
                  </div>
                </div>
                {/* <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-5 my-4 md:my-6 mx-2"> */}
                {/* <div className="ml-52">

                  <AgentOverviewCard AgentData={allAgentData} DataValue={true}/>
                  </div> */}
                {/* </div> */}
                <div className="flex flex-col justify-end items-end gap-3">
                  <div
                    className="w-full flex justify-center items-center gap-4"
                    onClick={() => {
                      navigate(`/appraisal/${AgentData?._id}`);
                    }}
                  >
                    <button className="w-full flex justify-center items-center gap-2 text-xs md:text-sm font-medium border text-[#FFFFFF] bg-[#E5002A] border-[#E5002A] py-3 px-5 rounded-3xl">
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
                      className="w-full flex justify-center items-center gap-2 text-xs md:text-sm font-medium border text-[#737373] bg-[#FFFFFF] border-[#737373] py-3 px-5 rounded-3xl"
                      onClick={(e) => {
                        e.preventDefault();
                        document.querySelector(`#Contact`).scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                        setisActive("Contact");
                      }}
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

          <div className="grid grid-cols-1 xl:grid-cols-8  2xl:grid-cols-12 place-content-center xl:place-items-start gap-10 mb-10">
            {/* ------ Left Part ------ */}
            <div className="w-full grid col-span-1 xl:col-span-6 2xl:col-span-9">
              {/* ------ Overview ------ */}
              <div className="">
                <AgentOverviewCard AgentData={allAgentData} property={property} />
              </div>

              {/* ------ Properties ------ */}
              <div className="mt-4 md:mt-8">
                <AgentPropertiesCard
                  AgentData={AgentData}
                  property={property}
                />
              </div>

              {/* ------ Proformance ------ */}
              {/* <div className="mt-4 md:mt-8">
                <AgentProformanceCard AgentData={AgentData} />
              </div> */}

              <div className="xl:hidden w-full mt-4 md:mt-8 ">
                <AgentConnectCard
                  AgentData={AgentData}
                  urlPath={`/agent-profile/${id}`}
                />
              </div>

              {/* ------ About ------ */}
              <div className="mt-4 md:mt-8">
                <AgentAboutCard AgentData={AgentData} />
              </div>

              {/* ------ Reviews ------ */}
              <div className="mt-4 md:mt-8">
                <AgentReviewsCard
                  AgentData={AgentData}
                  averageRatings={averageRatings}
                />
              </div>

              {/* ------ Contact ------ */}
              <div id="Contact" ref={targetDivRef} className="mt-4 md:mt-8" >
                <AgentContactCard
                  AgentData={AgentData}
                  averageRatings={averageRatings}
                />
              </div>
            </div>
            {/* ------ Right Part ------ */}
            <div className="hidden w-full xl:grid col-span-1 2xl:col-span-3 xl:col-span-2 sticky top-24 ">
              <AgentConnectCard
                AgentData={AgentData}
                averageRatings={averageRatings}
                scrollToDiv={scrollToDiv}
              />
            </div>
            <div className="w-full grid col-span-1 xl:col-span-5 text-[#525252] text-sm">
              {`^ Agent performance snapshot data & property lists include all
              properties ${AgentData.name} has sold (last 12 months) as lead and
              secondary agent and published on realestate.com.au. It may not
              contain off-market and private sales, properties with unknown sold
              dates, sales while at another agency and sales that may be
              exclusively listed on other websites. Please contact 
              ${AgentData.name} for their full sales history.`}
            </div>
          </div>
          {/* ---------- End Section 2 ---------- */}
        </div>
      </div>
    </>
  );
};

export default AgentProfile;
