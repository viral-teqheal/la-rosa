

import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useNavigate, useParams } from "react-router-dom";
import ag1 from "../../../assets/ag1.png";
import email from "../../../assets/message_icon.png";
import mailWhite from "../../../assets/mailWhite.png";
import call from "../../../assets/call_icon.png";
import shareRed from "../../../assets/shareRed.png";
import a2 from "../../../assets/a2.png";
import facebbok from "../../../assets/facebbok.png";
import twitter from "../../../assets/twitter.png";
import linkedIn from "../../../assets/linkedIn.png";
import { BACKEND_BASE_URL } from "../../../apiInstances/baseurl";
import Review from "../Review/Review";
import isEmpty from "../utils/isEmpty";
import whatsapp from "../../../assets/whatsapp.png";
import { TfiEmail } from "react-icons/tfi";
import { IoIosLink } from "react-icons/io";
import { toast } from "react-toastify";
import GeneralEnquiry from "../GeneralEnquiry/GeneralEnquiry";

const AgentConnectCard = ({ AgentData, averageRatings, scrollToDiv }) => {
  //console.log("🚀 ~ AgentConnectCard ~ AgentData:", AgentData);
  //console.log("🚀 ~ Aurl:", AgentData?.linkedIn_profile_URL);

  const { id } = useParams();
  const [share, setShare] = useState(false);
  const [calls, setCalls] = useState(false);
  const navigate = useNavigate();
  const copyEmail = (data) => {
    if (data === "email") {
      navigator.clipboard.writeText(AgentData?.confirm_email);
      toast.success("email copy successfully");
    } else {
      navigator.clipboard.writeText(
        `https://www.myrealestate-ng.com/agent-profile/${id}`
      );
      toast.success("link copy successfully");
    }
  };
  return (
    <>
      <div
        id="enquiry"
        className="flex flex-col justify-between bg-white rounded-xl shadow-md hover:shadow-lg"
      >
        {/* ------ Profile ------ */}

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
        <div className="flex relative  justify-center  cursor-pointer ">
          <div className="flex flex-col justify-center items-center pt-4 md:pt-6 px-4 md:px-6">
            <LazyLoadImage
              // src={a2}
              src={AgentData?.profileImg}
              alt=""
              // srcSet={a2}
              srcSet={AgentData?.profileImg}
              loading="lazy"
              effect="blur"
              className="aspect-square rounded-full w-14 md:w-24"
            />
            <div className="text-[#171717] text-center font-semibold text-base md:text-lg lg:text-xl mt-2">
              {AgentData?.first_name} {AgentData?.last_name}
            </div>

            {/* ------ Ratings ------ */}

            <Review rating={averageRatings} />
            <div className="text-[#A3A3A3] font-medium text-xs md:text-sm mt-1 px-1">
              {averageRatings == 0
                ? averageRatings
                : averageRatings?.toFixed(1)}
              ({AgentData?.reviews?.length} {"review"})
            </div>
          </div>
          <div
            className="grid absolute top-0 right-2 place-content-center bg-[#FFEAEF] border border-[#FA979A] rounded-full p-2 md:p-3 cursor-pointer h-max mt-3"
            onClick={() => setShare(!share)}
          >
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
        {/* ------ Buttons ------ */}
        <div className="w-full p-4 md:p-6">
          <div className="flex flex-col justify-end items-end gap-3">
            <div className="w-full flex justify-center items-center gap-4">
              <button
                className="w-full flex justify-center items-center gap-2 text-xs font-medium border text-[#FFFFFF] bg-[#E5002A] border-[#E5002A] py-3 px-5 rounded-3xl"
                onClick={() => {
                  navigate(`/appraisal/${AgentData?._id}`);
                }}
              >
                <img
                  src={mailWhite}
                  alt="icon"
                  className="w-4 cursor-pointer"
                />
                <div>Request a free appraisal</div>
              </button>
            </div>
            <div className="w-full flex justify-center items-center gap-4">
              <button
                className="w-full flex justify-center items-center gap-2 text-xs font-medium border text-[#737373] bg-[#FFFFFF] border-[#737373] py-3 px-5 rounded-3xl"
                onClick={() =>
                  scrollToDiv()
                  // window.open(
                  //   "https://mail.google.com/mail/u/0/#inbox?compose=new",
                  //   "_blank"
                  // )
                }
              >
                <img src={email} alt="icon" className="w-4 cursor-pointer" />
                <div>Enquire</div>
              </button>
            </div>

            {/* <div className="w-full flex justify-center items-center gap-4">
              <div
                className="w-full flex justify-center items-center gap-2 text-xs font-medium border text-[#737373] bg-[#FFFFFF] border-[#737373] py-3 px-5 rounded-3xl"
                onClick={() =>
                  window.open("https://wa.me/+91674646546278", "_blank")
                }
                style={{ cursor: "pointer" }}
              >
                <img
                  src={whatsapp}
                  alt="icon"
                  className="w-10 cursor-pointer"
                />
                <div className="font-bold">WhatsApp</div>
              </div>
            </div> */}

            <div className="w-full flex justify-center items-center gap-4">
              <button
                className="w-full flex justify-center items-center gap-2 text-xs font-medium border text-[#737373] bg-[#FFFFFF] border-[#737373] py-3 px-5 rounded-3xl"
                onClick={() => setCalls(!calls)}
              >
                <img src={call} alt="icon" className="w-4 cursor-pointer" />
                {calls ? (
                  <div className="font-bold">{`${AgentData?.mobile_number}`}</div>
                ) : (
                  <div className="font-bold">Call</div>
                )}
              </button>
            </div>
          </div>
          {/* ------ Social Icons ------ */}
          <div className="grid grid-flow-col place-content-center place-items-center gap-5 pt-4 md:pt-6">
            {/* {AgentData?.facebook_profile_URL ? ( */}
            <a
              href={`https://${AgentData?.facebook_profile_URL}`}
              target="_blank"
              className="cursor-pointer"
            >
              <img src={facebbok} alt="icon" className={`${AgentData?.facebook_profile_URL ? 'block' : 'hidden'}`} />
            </a>
            {/* ) : (
              <img src={facebbok} alt="icon" className="hidden"/>
            )} */}
            {/* {AgentData?.twitter_profile_URL ? ( */}
            <a
              href={`https://${AgentData?.twitter_profile_URL}`}
              target="_blank"
              className="cursor-pointer"
            >
              <img src={twitter} alt="icon" className={`${AgentData?.twitter_profile_URL ? 'block' : 'hidden'}`} />
            </a>
            {/* ) : (
              <img src={twitter} alt="icon" />
            )}

            {AgentData?.linkedIn_profile_URL ? ( */}
            <a
              href={`https://${AgentData?.linkedIn_profile_URL}`}
              target="_blank"
              className="cursor-pointer"
            >
              <img src={linkedIn} alt="icon" className={`${AgentData?.linkedIn_profile_URL ? 'block' : 'hidden'}`} />
            </a>
            {/* ) : (
              <img src={linkedIn} alt="icon" />
            )} */}
          </div>
        </div>
      </div>
      {share ? (
        <>
          <div className="justify-center  items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[999999]  outline-none focus:outline-none border ">
            <div className="relative min-w-[250px] max-w-[90%] mx-auto  my-10 shadow-black shadow-2xl rounded-xl">
              {/* ------ Content ------ */}
              <div className="border-0  rounded-xl shadow-2xl relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/* ------ Header ------ */}
                <div className="grid place-items-center place-content-end">
                  <button
                    className="bg-transparent border-0 text-black opacity-9 text-2xl font-normal outline-none focus:outline-none mx-3 my-2"
                    onClick={(e) => setShare(!share)}
                  >
                    ×
                  </button>
                </div>
                {/* ------ Body ------ */}
                <div className="relative grid place-items-start px-6 md:px-10 pb-3 flex-auto ">
                  <h3 className="text-black font-semibold text-base md:text-lg  leading-relaxed text-center pb-5">
                    Share {AgentData?.first_name} {AgentData?.last_name} details
                  </h3>
                  <div
                    className="flex gap-2 justify-center items-center cursor-pointer py-5"
                    onClick={() => copyEmail("email")}
                  >
                    <div>
                      <TfiEmail className="w-10 h-5" />
                    </div>
                    <div>Email</div>
                  </div>
                  <div
                    className="flex gap-2 justify-center items-center cursor-pointer py-5"
                    onClick={() => copyEmail("link")}
                  >
                    <div>
                      <IoIosLink className="w-10 h-5" />
                    </div>
                    <div>Copy Link</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-20 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default AgentConnectCard;

// import React, { useEffect, useState } from "react";
// import { LazyLoadImage } from "react-lazy-load-image-component";
// import { useNavigate } from "react-router-dom";
// import ag1 from "../../../assets/ag1.png";
// import email from "../../../assets/message_icon.png";
// import mailWhite from "../../../assets/mailWhite.png";
// import call from "../../../assets/call_icon.png";
// import shareRed from "../../../assets/shareRed.png";
// import a2 from "../../../assets/a2.png";
// import facebbok from "../../../assets/facebbok.png";
// import twitter from "../../../assets/twitter.png";
// import linkedIn from "../../../assets/linkedIn.png";
// import { BACKEND_BASE_URL } from "../../../apiInstances/baseurl";
// import Review from "../Review/Review";
// import isEmpty from "../utils/isEmpty";
// import whatsapp from "../../../assets/whatsapp.png";
// import { TfiEmail } from "react-icons/tfi";
// import { IoIosLink } from "react-icons/io";
// import { toast } from "react-toastify";

// const AgentConnectCard = ({ AgentData, averageRatings }) => {
//   //console.log("🚀 ~ AgentConnectCard ~ AgentData:", AgentData);
//   const [share, setShare] = useState(false);
//   const [calls, setCalls] = useState(false);
//   const navigate = useNavigate();
//   const copyEmail = () => {
//     navigator.clipboard.writeText(AgentData?.confirm_email);
//     toast.success("email copy successfully");
//   };
//   return (
//     <>
//       <div
//         id="enquiry"
//         className="flex flex-col justify-between bg-white rounded-xl shadow-md hover:shadow-lg 2xl:w-[350px]"
//       >
//         {/* ------ Profile ------ */}

//         <div
//           className={`w-full grid place-items-center py-3 rounded-t-xl bg-[${AgentData?.agency_id?.primary_color}]`}
//         >
//           <LazyLoadImage
//             src={`${BACKEND_BASE_URL}${AgentData?.agency_id?.agencySmallLogo}`}
//             alt=""
//             srcSet={`${BACKEND_BASE_URL}${AgentData?.agency_id?.agencySmallLogo}`}
//             loading="lazy"
//             effect="blur"
//             className="h-10 rounded-lg"
//           />
//         </div>
//         <div className="flex  justify-center  cursor-pointer ">
//           <div className="flex flex-col justify-center items-center pt-4 md:pt-6 px-4 md:px-6">
//             <LazyLoadImage
//               // src={a2}
//               src={`${BACKEND_BASE_URL}${AgentData?.profileImg}`}
//               alt=""
//               // srcSet={a2}
//               srcSet={`${BACKEND_BASE_URL}${AgentData?.profileImg}`}
//               loading="lazy"
//               effect="blur"
//               className="aspect-square rounded-full w-14 md:w-24"
//             />
//             <div className="text-[#171717] text-center font-semibold text-base md:text-lg lg:text-xl mt-2">
//               {AgentData?.first_name} {AgentData?.last_name}
//             </div>

//             {/* ------ Ratings ------ */}

//             <Review rating={averageRatings} />
//             <div className="text-[#A3A3A3] font-medium text-xs md:text-sm mt-1 px-1">
//               {averageRatings == 0
//                 ? averageRatings
//                 : averageRatings?.toFixed(1)}
//               ({AgentData?.reviews?.length} {"review"})
//             </div>
//             <div className="w-full ">
//               <div className="flex flex-col justify-end items-end gap-3">
//                 <div className="w-full flex justify-center items-center gap-4">
//                   <button
//                     className="w-full flex justify-center items-center gap-2 text-xs font-medium border text-[#FFFFFF] bg-[#E5002A] border-[#E5002A] py-3 px-5 rounded-3xl"
//                     onClick={() => {
//                       navigate(`/appraisal/${AgentData?._id}`);
//                     }}
//                   >
//                     <img
//                       src={mailWhite}
//                       alt="icon"
//                       className="w-4 cursor-pointer"
//                     />
//                     <div>Request a free appraisal</div>
//                   </button>
//                   {/* <div className="grid place-content-center bg-[#FFEAEF] border border-[#FA979A] rounded-full p-2 md:p-3 cursor-pointer">
//               <LazyLoadImage
//                 src={call}
//                 alt="icon"
//                 srcSet={call}
//                 loading="lazy"
//                 effect="blur"
//                 className="w-4 md:w-5"
//               />
//             </div> */}
//                 </div>
//                 <div className="w-full flex justify-center items-center gap-4">
//                   <button
//                     className="w-full flex justify-center items-center gap-2 text-xs font-medium border text-[#737373] bg-[#FFFFFF] border-[#737373] py-3 px-5 rounded-3xl"
//                     onClick={() => navigate(`/agent-review/${AgentData?._id}`)}
//                   >
//                     <img
//                       src={email}
//                       alt="icon"
//                       className="w-4 cursor-pointer"
//                     />
//                     <div>Enquire</div>
//                   </button>
//                   {/* <div className="grid place-content-center bg-[#FFEAEF] border border-[#FA979A] rounded-full p-2 md:p-3 cursor-pointer">
//               <LazyLoadImage
//                 src={shareRed}
//                 alt="icon"
//                 srcSet={shareRed}
//                 loading="lazy"
//                 effect="blur"
//                 className="w-4 md:w-5"
//               />
//             </div> */}
//                 </div>
//                 <div className="w-full flex justify-center items-center gap-4">
//                   <button
//                     className="w-full flex justify-center items-center gap-2 text-xs font-medium border text-[#737373] bg-[#FFFFFF] border-[#737373] py-3 px-5 rounded-3xl"
//                     onClick={() => {
//                       navigate(`/appraisal/${AgentData?._id}`);
//                     }}
//                   >
//                     <img
//                       src={whatsapp}
//                       alt="icon"
//                       className="w-10 cursor-pointer"
//                     />
//                     <div className="font-bold">WhatsApp</div>
//                   </button>
//                   {/* <div className="grid place-content-center bg-[#FFEAEF] border border-[#FA979A] rounded-full p-2 md:p-3 cursor-pointer">
//               <LazyLoadImage
//                 src={call}
//                 alt="icon"
//                 srcSet={call}
//                 loading="lazy"
//                 effect="blur"
//                 className="w-4 md:w-5"
//               />
//             </div> */}
//                 </div>
//                 <div className="w-full flex justify-center items-center gap-4">
//                   <button
//                     className="w-full flex justify-center items-center gap-2 text-xs font-medium border text-[#737373] bg-[#FFFFFF] border-[#737373] py-3 px-5 rounded-3xl"
//                     onClick={() => setCalls(!calls)}
//                   >
//                     <img
//                       src={email}
//                       alt="icon"
//                       className="w-4 cursor-pointer"
//                     />
//                     {calls ? (
//                       <div className="font-bold">9586324859</div>
//                     ) : (
//                       <div className="font-bold">Call</div>
//                     )}
//                   </button>
//                   {/* <div className="grid place-content-center bg-[#FFEAEF] border border-[#FA979A] rounded-full p-2 md:p-3 cursor-pointer">
//               <LazyLoadImage
//                 src={shareRed}
//                 alt="icon"
//                 srcSet={shareRed}
//                 loading="lazy"
//                 effect="blur"
//                 className="w-4 md:w-5"
//               />
//             </div> */}
//                 </div>
//               </div>
//               {/* ------ Social Icons ------ */}
//               <div className="grid grid-flow-col place-content-center place-items-center gap-5 pt-4 md:pt-6">
//                 <a
//                   href={`${AgentData?.facebook_profile_URL}`}
//                   target="_blank"
//                   className="cursor-pointer"
//                 >
//                   <img src={facebbok} alt="icon" />
//                 </a>
//                 <a
//                   href={AgentData?.twitter_profile_URL}
//                   target="_blank"
//                   className="cursor-pointer"
//                 >
//                   <img src={twitter} alt="icon" />
//                 </a>
//                 <a
//                   href={AgentData?.linkedIn_profile_URL}
//                   target="_blank"
//                   className="cursor-pointer"
//                 >
//                   <img src={linkedIn} alt="icon" />
//                 </a>
//               </div>
//             </div>
//           </div>
//           <div className="grid place-content-center bg-[#FFEAEF] border border-[#FA979A] rounded-full p-2 md:p-3 cursor-pointer h-max mt-10">
//             <LazyLoadImage
//               src={shareRed}
//               alt="icon"
//               srcSet={shareRed}
//               loading="lazy"
//               effect="blur"
//               className="w-4 md:w-5"
//               onClick={() => setShare(!share)}
//             />
//           </div>        </div>
//         {/* ------ Buttons ------ */}
//       </div>
//       {/* -----------------popup login-------------------- */}
//       {share ? (
//         <>
//           <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[999999]  outline-none focus:outline-none border ">
//             <div className="relative min-w-[250px] max-w-[90%] mx-auto  my-10 shadow-black shadow-2xl">
//               {/* ------ Content ------ */}
//               <div className="border-0 rounded-lg shadow-2xl relative flex flex-col w-full bg-white outline-none focus:outline-none">
//                 {/* ------ Header ------ */}
//                 <div className="grid place-items-center place-content-end">
//                   <button
//                     className="bg-transparent border-0 text-black opacity-9 text-2xl font-normal outline-none focus:outline-none mx-3 my-2"
//                     onClick={(e) => setShare(!share)}
//                   >
//                     ×
//                   </button>
//                 </div>
//                 {/* ------ Body ------ */}
//                 <div className="relative grid place-items-start px-6 md:px-10 py-3 flex-auto ">
//                   <h3 className="text-black font-semibold text-base md:text-lg  leading-relaxed text-center">
//                     Share {AgentData?.first_name} {AgentData?.last_name} details
//                   </h3>
//                   <div
//                     className="flex gap-2 justify-center items-center cursor-pointer"
//                     onClick={copyEmail}
//                   >
//                     <div>
//                       <TfiEmail className="w-10 h-5" />
//                     </div>
//                     <div>Email</div>
//                   </div>
//                   <div className="flex gap-2 justify-center items-center">
//                     <div>
//                       <IoIosLink className="w-10 h-5" />
//                     </div>
//                     <div>Copy Link</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="opacity-20 fixed inset-0 z-40 bg-black"></div>
//         </>
//       ) : null}
//     </>
//   );
// };

// export default AgentConnectCard;
