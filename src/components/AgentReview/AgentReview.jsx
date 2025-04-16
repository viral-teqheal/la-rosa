import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout2 from "../../Layouts/Layout2";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ag1 from "../../assets/ag1.png";
import search from "../../assets/search.png";
import mailWhite from "../../assets/mailWhite.png";
import call from "../../assets/call_icon.png";
import shareRed from "../../assets/shareRed.png";
import a2 from "../../assets/a2.png";
import facebbok from "../../assets/facebbok.png";
import twitter from "../../assets/twitter.png";
import linkedIn from "../../assets/linkedIn.png";
import axiosInstanceAuth from "../../apiInstances/axiosInstanceAuth";
import { BACKEND_BASE_URL } from "../../apiInstances/baseurl";
import axiosInstanceAuthFormData from "../../apiInstances/axiosInstanceAuthFormData";
import { toast } from "react-toastify";
import Rating from "../common/Rating/Rating";

const AgentReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const [star, setStar] = useState(0);

  const [AgentData, setAgentData] = useState({});
  const [ReviewData, setReviewData] = useState({
    // star: 5,
    review: "",
    type: "Selling",
    client_address: "",
    client_firstname: "",
    client_lastname: "",
    client_phoneNumber: "",
    client_email: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setReviewData({ ...ReviewData, [name]: value });
  };

  //console.log("🚀 ~ AgentReview ~ ReviewData:===============================================>", ReviewData)
  useEffect(() => {
    GetAgentData(id);
  }, []);

  const GetAgentData = async (id) => {
    await axiosInstanceAuth
      .post(`Agency_Agent/ViewProfile`, {
        id: id,
      })
      .then((res) => {
        const mydata = res?.data?.data;
        if (res?.data?.status) {
          setAgentData(mydata);
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        //console.log("err --->", err);
      });
  };

  const [textAreaLength, setTextAreaLength] = useState();

  const ActiveTab = "text-white bg-[#E5002A]";

  const SubmitReqest = async () => {
    try {
      if (star === 0) {
        toast.error("Please give a Star");
      } else if (ReviewData?.review === "") {
        toast.error("Please enter a Review");
      } else if (ReviewData?.client_firstname === "") {
        toast.error("Please enter a First Name");
      } else if (ReviewData?.client_lastname === "") {
        toast.error("Please enter a Last Name");
      } else if (ReviewData?.client_phoneNumber === "") {
        toast.error("Please enter a Phone Number");
      } else if (!emailRegex?.test(ReviewData?.client_email)) {
        toast.error("Please enter a valid Email");
      } else {
        await axiosInstanceAuth
          .post(`agentReview/${id}`, {
            // agent_id: id,
            star: star,
            review: ReviewData?.review,
            type: ReviewData?.type,
            client_address: ReviewData?.client_address,
            client_firstname: ReviewData?.client_firstname,
            client_lastname: ReviewData?.client_lastname,
            client_phoneNumber: ReviewData?.client_phoneNumber,
            client_email: ReviewData?.client_email,
          })
          .then((res) => {
            //console.log("🚀 ~ .then ~ res:", res)
            if (res?.data?.status) {
              toast.success("Review Submited Successfuly");
              navigate(`/agent-profile/${id}`);
            } else {
              toast.error(res?.data?.message);
            }
          })
          .catch((err) => {
            //console.log("------>> Error", err);
          });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="px-5 py-28">
        <div className="container mx-auto">
          <div className="grid place-items-center gap-4 md:gap-8">
            {/* ---------- Intro Section---------- */}
            <div className="w-full flex flex-col justify-between bg-white rounded-xl shadow-md hover:shadow-lg pb-4 md:pb-6">
              {/* ------ Profile ------ */}
              <div className="flex flex-col justify-center items-center">
                <div
                  className={`w-full grid place-items-center py-3 rounded-t-xl bg-[#FFE512]`}
                >
                  <LazyLoadImage
                    src={ag1}
                    alt="icon"
                    srcSet={ag1}
                    loading="lazy"
                    effect="blur"
                    className="rounded-lg"
                  />
                </div>
                <div className="flex flex-col justify-center items-center pt-4 md:pt-6 px-4 md:px-6">
                  <div className="text-[#171717] text-center font-bold text-base md:text-lg lg:text-xl">
                    Leave a rating review for {AgentData?.first_name}
                  </div>

                  <LazyLoadImage
                    src={`${BACKEND_BASE_URL}${AgentData?.profileImg}`}
                    alt=""
                    srcSet={`${BACKEND_BASE_URL}${AgentData?.profileImg}`}
                    loading="lazy"
                    effect="blur"
                    className="w-20 md:w-28 aspect-square rounded-full mt-4 md:mt-6"
                  />
                  <div className="text-[#171717] text-center font-semibold text-base md:text-lg lg:text-xl mt-4">
                    {AgentData?.first_name} {AgentData?.last_name}
                  </div>
                  <div className="text-[#737373] text-center font-medium text-xs md:text-sm mt-1">
                    Ray White Coomera - COOMERA
                  </div>

                  {/* ------ Ratings ------ */}
                  <Rating
                    main_style="!mt-4"
                    inner_style=""
                    star={ReviewData?.star}
                    setstar={() => {}}
                  />
                  <div className="text-[#A3A3A3] text-center font-medium text-xs mt-1">
                    5.0 (133 review)
                  </div>
                </div>
              </div>
            </div>

            {/* ---------- Rating Section---------- */}
            <div className="w-full flex justify-start gap-2 bg-white rounded-xl shadow-md hover:shadow-lg p-4 md:p-6">
              <div className="text-[#171717] font-extrabold text-base md:text-lg lg:text-xl">
                1.
              </div>
              <div className="">
                <div className="text-[#171717] font-extrabold text-base md:text-lg lg:text-xl">
                  How would you rate {AgentData?.first_name}’s work overall?
                </div>
                <Rating
                  main_style="!justify-start !mt-2"
                  inner_style="w-7 h-7"
                  star={star}
                  setstar={setStar}
                />
              </div>
            </div>
            {/* ---------- Review Section---------- */}
            <div className="w-full flex flex-col justify-start bg-white rounded-xl shadow-md hover:shadow-lg p-4 md:p-6">
              <div className="text-[#171717] font-extrabold text-base md:text-lg lg:text-xl">
                2. Your review of {AgentData?.first_name}’s work
              </div>
              <div className="text-[#404040] font-extrabold text-sm md:text-base mt-4">
                Some things to consider
              </div>
              <li className="text-[#404040] font-medium text-sm md:text-base mt-2">
                Please don't mention your name or financial details.
              </li>
              <li className="text-[#404040] font-medium text-sm md:text-base mt-1">
                Keep it clean or we won't publish it.
              </li>
              <li className="text-[#404040] font-medium text-sm md:text-base mt-1">
                Please check for errors before you submit it!
              </li>

              <div className="text-[#171717] font-medium text-sm md:text-base mt-4">
                Enter your review <span className="px-1 text-[#E5002A]">*</span>
              </div>

              <div className="w-full flex justify-start items-center !text-[#737373] text-xs md:text-sm lg:text-base outline-none border border-[#E5E5E5] rounded-2xl p-4 cursor-pointer mt-2 md:mt-4">
                <textarea
                  rows={5}
                  type="text"
                  name="review"
                  value={ReviewData?.review}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setTextAreaLength(value.split("").length);
                    setReviewData({ ...ReviewData, review: value });
                  }}
                  placeholder="How was their knowledge of the market, timeliness in responding... anything else?"
                  className="w-full text-[#737373] font-medium text-xs md:text-sm outline-none"
                />
              </div>
              {textAreaLength < 501 ? (
                <p className="grid place-content-end text-[#171717] font-medium text-xs p-2">
                  {textAreaLength !== undefined ? textAreaLength : 0} / 500
                </p>
              ) : null}
            </div>

            {/* ---------- Property Section---------- */}
            <div className="w-full flex flex-col justify-start bg-white rounded-xl shadow-md hover:shadow-lg p-4 md:p-6">
              <div className="text-[#171717] font-extrabold text-base md:text-lg lg:text-xl">
                3. Your Property
              </div>
              <div className="text-[#404040] font-semibold text-sm md:text-base mt-4">
                What did {AgentData?.first_name} help you with?
              </div>

              <div className="w-full sm:w-[50%] md:w-[30%] flex justify-start items-center border border-[#E5E5E5] rounded-[28px] cursor-pointer mt-4 md:mt-6">
                <button
                  className={`w-full text-xs md:text-sm lg:text-base py-3 px-4 md:px-7 rounded-[28px] text-[#404040] ${
                    ReviewData?.type === "Selling" ? ActiveTab : null
                  }`}
                  onClick={() => {
                    setReviewData({ ...ReviewData, type: "Selling" });
                  }}
                >
                  Selling
                </button>
                <button
                  className={`w-full text-xs md:text-sm lg:text-base py-3 px-4 md:px-7 rounded-[28px] text-[#404040] ${
                    ReviewData?.type === "Buying" ? ActiveTab : null
                  }`}
                  onClick={() => {
                    setReviewData({ ...ReviewData, type: "Buying" });
                  }}
                >
                  Buying
                </button>
              </div>

              <div className="text-[#404040] font-semibold text-sm md:text-base mt-4">
                Property Address bought or sold in the last 12 months
              </div>

              <div className="w-full flex justify-start items-center border border-[#E5E5E5] rounded-[28px] py-3 px-4 md:px-7 cursor-pointer mt-4 md:mt-6">
                <img
                  src={search}
                  alt="icon"
                  className="w-3 lg:w-4 mr-3 cursor-pointer"
                />
                <input
                  type="text"
                  name="client_address"
                  value={ReviewData?.client_address}
                  onChange={onChangeInput}
                  placeholder="Search for a street address"
                  className="w-full text-[#737373] font-medium text-xs md:text-sm outline-none"
                />
              </div>

              <div className="text-[#171717] text-xs md:text-sm lg:text-base mt-2">
                We’ll only publish the suburb.
              </div>
            </div>

            {/* ---------- Details Section---------- */}
            <div className="w-full flex flex-col justify-start bg-white rounded-xl shadow-md hover:shadow-lg p-4 md:p-6">
              <div className="text-[#171717] font-extrabold text-base md:text-lg lg:text-xl">
                4. Your details
              </div>

              <div className="flex flex-col md:flex-row justify-center gap-4 mt-4 md:mt-6">
                <div className="w-full">
                  <div className="font-medium text-[#171717] text-xs md:text-sm lg:text-base">
                    First name
                    <span className="px-1 text-red-500">*</span>
                  </div>
                  <input
                    type="text"
                    name="client_firstname"
                    value={ReviewData?.client_firstname}
                    onChange={onChangeInput}
                    placeholder="Enter first name"
                    className="w-full font-medium text-[#737373] text-xs md:text-sm outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5  mt-2 md:mt-4"
                  />
                </div>
                <div className="w-full">
                  <div className="font-medium text-[#171717] text-xs md:text-sm lg:text-base">
                    Last name <span className="px-1 text-red-500">*</span>
                  </div>
                  <input
                    type="text"
                    name="client_lastname"
                    value={ReviewData?.client_lastname}
                    onChange={onChangeInput}
                    placeholder="Enter last name"
                    className="w-full font-medium text-[#737373] text-xs md:text-sm outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5  mt-2 md:mt-4"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-center gap-4 mt-4 md:mt-6">
                <div className="w-full">
                  <div className="font-medium text-[#171717] text-xs md:text-sm lg:text-base">
                    Mobile phone number
                    <span className="px-1 text-red-500">*</span>
                  </div>
                  <input
                    type="number"
                    name="client_phoneNumber"
                    value={ReviewData?.client_phoneNumber}
                    onChange={onChangeInput}
                    placeholder="Enter mobile phone number"
                    className="w-full font-medium text-[#737373] text-xs md:text-sm  outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5  mt-2 md:mt-4"
                  />
                </div>
                <div className="w-full">
                  <div className="font-medium text-[#171717] text-xs md:text-sm lg:text-base">
                    Email <span className="px-1 text-red-500">*</span>
                  </div>
                  <input
                    type="email"
                    name="client_email"
                    value={ReviewData?.client_email}
                    onChange={onChangeInput}
                    placeholder="Enter email address"
                    className="w-full font-medium text-[#737373] text-xs md:text-sm outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5  mt-2 md:mt-4"
                  />
                </div>
              </div>
         
              <img src="" alt="" srcset="" />
              <div className="text-[#404040] font-extrabold text-sm md:text-base mt-4">
                Why do we collect this information?
              </div>
              <li className="text-[#404040] font-medium text-xs md:text-sm mt-2">
                It's for the agent to confirm you're on the contract of sale.
              </li>
              <li className="text-[#404040] font-medium text-xs md:text-sm mt-1">
                We won't publish your full name, email address or mobile number.
              </li>
              <li className="text-[#404040] font-medium text-xs md:text-sm mt-1">
                We will only publish your first name and the first letter of
                your last name along with your review, for example Jane S
                (vendor). This helps build trust for other consumers.
              </li>
            </div>

            {/* ---------- Button---------- */}
            <button
              className="w-full flex justify-center items-center text-xs md:text-sm lg:text-base font-medium border text-[#FFFFFF] bg-[#E5002A] border-[#E5002A] hover:text-[#E5002A] hover:bg-[#FFFFFF] hover:font-semibold py-3 px-5 rounded-3xl"
              onClick={SubmitReqest}
            >
              Send Review
            </button>

            {/* ---------- T & C---------- */}
            <div className="w-full flex flex-col justify-start items-start">
              <div className="text-[#737373] font-medium text-xs md:text-sm">
                Pleace view our
                <span className="px-1 underline cursor-pointer">
                  terms and conditions
                </span>
                and
                <span className="px-1 underline cursor-pointer">
                  personal information collection policy.
                </span>
              </div>
              <div className="text-[#000000] font-semibold text-sm md:text-base mt-3">
                Questions?
              </div>
              <div className="text-[#737373] font-medium text-xs md:text-sm mt-1">
                We’re here to help. Call us on
                <span className="px-2 text-[#2B6ED2] font-semibold cursor-pointer">
                  1300 134 174
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AgentReview;
