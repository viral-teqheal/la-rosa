// import React, { useEffect, useState } from "react";
// import Layout2 from "../../Layouts/Layout2";
// import building from "../../assets/building.png";
// import agent01 from "../../assets/agent01.png";
// import call from "../../assets/call_icon.png";
// import chat from "../../assets/chat_icon.png";
// import message from "../../assets/message_icon.png";
// import lock from "../../assets/lock_icon.png";
// import search from "../../assets/search.png";
// import Bar from "../../assets/Bars.png";
// import CustomSlider from "../common/CustomSlider/CustomSlider";
// import { useNavigate, useParams } from "react-router-dom";
// import axiosInstanceAuth from "../../apiInstances/axiosInstanceAuth";
// import axiosInstanceAuthFormData from "../../apiInstances/axiosInstanceAuthFormData";
// import { BACKEND_BASE_URL } from "../../apiInstances/baseurl";
// import { toast } from "react-toastify";

// const  AgentAppraisal = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const emailRegex =
//     /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//   const [Tracker, setTracker] = useState(1);
//   const [SelectedRange, setSelectedRange] = useState([0, 100]);

//   const [AgentData, setAgentData] = useState({});
//   //console.log("🚀 ~ AgentAppraisal ~ AgentData:", AgentData)

//   const [RequestData, setRequestData] = useState({
//     reason: "",
//     first_name: "",
//     last_name: "",
//     email: "",
//     mobile_no: "",
//     prefer_to_be_contacted: "Call",
//     timeframe: "Now",
//     address: "",
//     type: "",
//     min: "",
//     max: "",
//     remember_details: false,
//   });

//   let priceRange = [

//     {
//       min: RequestData?.min,
//     },
//     {
//       max: RequestData?.max,
//     },
//   ];

//   const onChangeInput = (e) => {
//     const { name, value } = e.target;
//     setRequestData({ ...RequestData, [name]: value });
//   };

//   useEffect(() => {
//     GetAgentData(id);
//   }, []);

//   const GetAgentData = async (id) => {
//     await axiosInstanceAuth
//       .post(`Agency_Agent/ViewProfile`, {
//         id: id,
//       })
//       .then((res) => {
//         const mydata = res?.data?.data;
//         if (res?.data?.status) {
//           setAgentData(mydata);
//         } else {
//         }
//       })
//       .catch((err) => {
//         //console.log("err --->", err);
//       });
//   };

//   const activeTracker = "!border !border-[#E5002A] !text-white !bg-[#E5002A]";

//   const ActiveContact =
//     "!border !border-[#E5002A] !bg-[#FFEAEF] !text-[#171717]";

//   const ActiveTimeFrame =
//     "!border !border-[#E5002A] !bg-[#FFEAEF] !text-[#E5002A]";

//   const SubmitReqest = () => {
//     try {
//       if (RequestData?.reason === "") {
//         toast.error("Please enter a Reason");
//       } else if (RequestData?.first_name === "") {
//         toast.error("Please enter a First Name");
//       } else if (RequestData?.last_name === "") {
//         toast.error("Please enter a Last Name");
//       } else if (!emailRegex?.test(RequestData?.email)) {
//         toast.error("Please enter a valid Email");
//       } else if (RequestData?.address === "") {
//         toast.error("Please enter a Property Address");
//       } else if (RequestData?.type === "") {
//         toast.error("Please enter a Property type");
//       } else {

//         // const formData = new FormData();
//         // formData.append("agent_id", id);
//         // formData.append("reason", RequestData?.reason);
//         // formData.append("first_name", RequestData?.first_name);
//         // formData.append("last_name", RequestData?.last_name);
//         // formData.append("email", RequestData?.email);
//         // formData.append("mobile_no", RequestData?.mobile_no);
//         // formData.append(
//         //   "prefer_to_be_contacted",
//         //   RequestData?.prefer_to_be_contacted
//         // );
//         // formData.append("timeframe", RequestData?.timeframe);
//         // formData.append("address", RequestData?.address);
//         // formData.append("type", RequestData?.type);
//         // formData.append("priceRange", JSON.stringify(priceRange));
//         // formData.append("remember_details", RequestData?.remember_details);

//         // //console.log(formData);
//         const data = {
//           agent_id: id,
//           reason: RequestData?.reason,
//           first_name: RequestData?.first_name,
//           last_name: RequestData?.last_name,
//           email: RequestData?.email,
//           mobile_no: RequestData?.mobile_no,
//           prefer_to_be_contacted: RequestData?.prefer_to_be_contacted,
//           timeframe: RequestData?.timeframe,
//           type : RequestData?.type,
//           address: RequestData?.address,
//           priceRange: JSON.stringify(priceRange),
//           remember_details: RequestData?.remember_details,

//         };
//         axiosInstanceAuthFormData
//           .post(`sendPropertyDetails`, data)
//           .then((res) => {
//             if (res?.data?.status) {
//               toast.success("Appraisal Submited Successfuly");
//               navigate(`/agent-profile/${id}`);
//             } else {
//               toast.error(res?.data?.message);
//             }
//           })
//           .catch((err) => {
//             //console.log("------>> Error", err);
//           });
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <Layout2>
//       <div className="pt-3">
//         {/* --------- Start Section 1 --------- */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 justify-center items-center">
//           <div className="flex flex-col justify-center items-center lg:items-start mx-5 md:mx-5 lg:mx-10 xl:mx-20">
//             <h1 className="font-semibold text-center lg:text-start text-xl md:text-2xl lg:text-3xl xl:text-4xl xl:leading-[50px]">
//               You’re contacting the agents who sold 5 Marriott Way
//             </h1>
//             <div className="flex justify-start items-center gap-4 bg-white rounded-xl lg:rounded-2xl shadow-md hover:shadow-lg p-4 lg:p-6 mt-5 md:mt-9">
//               <img
//                 src={`${BACKEND_BASE_URL}${AgentData?.profileImg}`}
//                 alt=""
//                 className="aspect-square w-10 md:w-20 rounded-full"
//               />
//               <div>
//                 <div className="text-[#171717] font-semibold ext-xs md:text-sm lg:text-base xl:text-lg">
//                   {AgentData?.first_name} {AgentData?.last_name}
//                 </div>
//                 <div className="text-[#737373] font-medium text-xs md:text-sm lg:text-base xl:text-lg">
//                   {AgentData?.job_title} - Burleigh / Mudgeeraba
//                 </div>
//               </div>
//             </div>
//           </div>
//           <img
//             src={building}
//             alt="banner"
//             className="grid place-self-end mt-12 lg:mt-0"
//           />
//         </div>
//         {/* --------- End Section 1 --------- */}

//         <div className="other-bg-gradient px-5 py-24">
//           <div className="container mx-auto grid place-content-center">
//             <div className="max-w-6xl bg-white rounded-xl shadow-md hover:shadow-lg">
//               {/* ------------- Tracking Section ------------- */}
//               <div className=" px-3  md:px-24 py-5 md:py-12">
//                 <div className="flex justify-between items-center ">
//                   <div
//                     className={`font-semibold border border-[#E5002A] text-white bg-[#E5002A] text-lg md:text-xl lg:text-2xl px-10 py-2 rounded-full cursor-pointer`}
//                     onClick={() => setTracker(1)}
//                   >
//                     1
//                   </div>
//                   <div
//                     className={`w-full border border-[#E5002A] border-dashed ${
//                       Tracker === 2 ? "!border-solid" : null
//                     }`}
//                   />
//                   <div
//                     className={`font-semibold border border-[#E5002A] text-[#E5002A] bg-white text-lg md:text-xl lg:text-2xl px-10 py-2 rounded-full cursor-pointer ${
//                       Tracker === 2 ? activeTracker : null
//                     }`}
//                     onClick={() => setTracker(2)}
//                   >
//                     2
//                   </div>
//                 </div>
//                 <div className="flex justify-between items-center mt-3">
//                   <div className="top-14 font-semibold text-center text-[#171717] text-sm md:text-base lg:text-lg">
//                     Contact Details
//                   </div>
//                   <div className="w-full" />
//                   <div className="top-14 font-semibold text-center text-[#171717] text-sm md:text-base lg:text-lg">
//                     Property Details
//                   </div>
//                 </div>
//               </div>

//               {/* ------------- Border Section ------------- */}

//               <div className="w-full border border-[#E5E5E5]" />

//               {/* ------------- Contact Details Section ------------- */}
//               {Tracker === 1 && (
//                 <div className="flex flex-col justify-start py-5 px-3 md:py-12 md:px-24">
//                   <div className="font-semibold text-[#171717] text-base md:text-lg lg:text-xl xl:text-2xl">
//                     Contact Details
//                   </div>

//                   <div className="mt-5 md:mt-12">
//                     <div className="font-medium text-[#171717] text-xs md:text-sm lg:text-base">
//                       Reason for requesting appraisal
//                       <span className="px-1 text-red-500">*</span>
//                     </div>
//                     <select
//                       name="reason"
//                       value={RequestData?.reason}
//                       onChange={onChangeInput}
//                       className="round w-full !text-[#737373] text-xs md:text-sm lg:text-base outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 cursor-pointer mt-2 md:mt-4"
//                     >
//                       <option value="">Please select</option>
//                       <option value="Buy House">Buy House</option>
//                       <option value="Sell House">Sell House</option>
//                       <option value="Rent House">Rent House</option>
//                     </select>
//                   </div>

//                   <div className="flex flex-col md:flex-row justify-center gap-4 mt-4 md:mt-6">
//                     <div className="w-full">
//                       <div className="font-medium text-[#171717] text-xs md:text-sm lg:text-base">
//                         First name
//                         <span className="px-1 text-red-500">*</span>
//                       </div>
//                       <input
//                         type="text"
//                         name="first_name"
//                         value={RequestData?.first_name}
//                         onChange={onChangeInput}
//                         placeholder="Enter first name"
//                         className="w-full font-medium text-[#737373] text-xs md:text-sm lg:text-base outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5  mt-2 md:mt-4"
//                       />
//                     </div>
//                     <div className="w-full">
//                       <div className="font-medium text-[#171717] text-xs md:text-sm lg:text-base">
//                         Last name <span className="px-1 text-red-500">*</span>
//                       </div>
//                       <input
//                         type="text"
//                         name="last_name"
//                         value={RequestData?.last_name}
//                         onChange={onChangeInput}
//                         placeholder="Enter last name"
//                         className="w-full font-medium text-[#737373] text-xs md:text-sm lg:text-base outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5  mt-2 md:mt-4"
//                       />
//                     </div>
//                   </div>

//                   <div className="flex flex-col md:flex-row justify-center gap-4 mt-4 md:mt-6">
//                     <div className="w-full">
//                       <div className="font-medium text-[#171717] text-xs md:text-sm lg:text-base">
//                         Email
//                         <span className="px-1 text-red-500">*</span>
//                       </div>
//                       <input
//                         type="email"
//                         name="email"
//                         value={RequestData?.email}
//                         onChange={onChangeInput}
//                         placeholder="Enter email address"
//                         className="w-full font-medium text-[#737373] text-xs md:text-sm lg:text-base outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5  mt-2 md:mt-4"
//                       />
//                     </div>
//                     <div className="w-full">
//                       <div className="font-medium text-[#171717] text-xs md:text-sm lg:text-base">
//                         Mobile phone number{" "}
//                         <span className="px-1 text-red-500">*</span>
//                       </div>
//                       <input
//                         type="number"
//                         name="mobile_no"
//                         value={RequestData?.mobile_no}
//                         onChange={onChangeInput}
//                         placeholder="Enter mobile phone number"
//                         className="w-full font-medium text-[#737373] text-xs md:text-sm lg:text-base outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5  mt-2 md:mt-4"
//                       />
//                     </div>
//                   </div>

//                   <div className="text-[#171717] font-medium text-xs md:text-sm lg:text-base mt-5 md:mt-12">
//                     We will Send you a one-time verification code to confirm
//                     your mobile number.
//                   </div>

//                   <div className="text-[#171717] font-medium text-xs md:text-sm lg:text-base mt-5 md:mt-12">
//                     How would you prefer to be contacted?
//                   </div>

//                   <div className="flex justify-between items-center gap-2 mt-4">
//                     <div
//                       className={`w-full border border-[#E5E5E5] bg-white text-[#737373] rounded-md flex flex-col justify-center items-center gap-2 py-4 md:py-5 ease-in-out duration-500 cursor-pointer ${
//                         RequestData?.prefer_to_be_contacted === "Call"
//                           ? ActiveContact
//                           : null
//                       }`}
//                       onClick={() => {
//                         setRequestData({
//                           ...RequestData,
//                           prefer_to_be_contacted: "Call",
//                         });
//                       }}
//                     >
//                       <img src={call} alt="icon" className="w-6 md:w-auto" />
//                       <div className="font-semibold  text-xs md:text-sm lg:text-base">
//                         Call Now
//                       </div>
//                     </div>

//                     <div
//                       className={`w-full border border-[#E5E5E5] bg-white text-[#737373] rounded-md flex flex-col justify-center items-center gap-2 py-4 md:py-5 ease-in-out duration-500 cursor-pointer ${
//                         RequestData?.prefer_to_be_contacted === "SMS"
//                           ? ActiveContact
//                           : null
//                       }`}
//                       onClick={() => {
//                         setRequestData({
//                           ...RequestData,
//                           prefer_to_be_contacted: "SMS",
//                         });
//                       }}
//                     >
//                       <img src={chat} alt="icon" className="w-6 md:w-auto" />
//                       <div className="font-semibold text-xs md:text-sm lg:text-base">
//                         SMS Now
//                       </div>
//                     </div>

//                     <div
//                       className={`w-full border border-[#E5E5E5] bg-white text-[#737373] rounded-md flex flex-col justify-center items-center gap-2 py-4 md:py-5 ease-in-out duration-500 cursor-pointer ${
//                         RequestData?.prefer_to_be_contacted === "Email"
//                           ? ActiveContact
//                           : null
//                       }`}
//                       onClick={() => {
//                         setRequestData({
//                           ...RequestData,
//                           prefer_to_be_contacted: "Email",
//                         });
//                       }}
//                     >
//                       <img src={message} alt="icon" className="w-6 md:w-auto" />
//                       <div className="font-semibold text-xs md:text-sm lg:text-base">
//                         Email Now
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex justify-start items-start mt-5 md:mt-12">
//                     <img
//                       src={lock}
//                       alt="icon"
//                       className="w-6 md:w-auto mr-3 md:mr-5"
//                     />
//                     <div className="text-[#171717] text-xs md:text-sm lg:text-base">
//                       Your phone and email will not be used for marketing
//                       purposes or shared with any third parties not related to
//                       your property appraisal. See our
//                       <span className="px-1 text-[#FF2830]">
//                         Personal Information Collection Statement.
//                       </span>
//                     </div>
//                   </div>

//                   <button
//                     className="w-full text-xs md:text-sm lg:text-base font-medium border bg-[#E5002A] text-white hover:bg-white  hover:text-[#E5002A] hover:border-[#E5002A] py-3 px-5 rounded-3xl mt-5 md:mt-12"
//                     onClick={(e) => {
//                       setTracker(2);
//                       window.scrollTo({ top: 0, behavior: "smooth" });
//                     }}
//                   >
//                     Continue
//                   </button>
//                 </div>
//               )}

//               {/* ------------- Property Details Section ------------- */}
//               {Tracker === 2 && (
//                 <div className="flex flex-col justify-start py-5 px-3 md:py-12 md:px-24">
//                   <div className="font-semibold text-[#171717] text-base md:text-lg lg:text-xl xl:text-2xl">
//                     Property Details
//                   </div>

//                   <div className="flex flex-col md:flex-row justify-center gap-4 mt-5 md:mt-12">
//                     <div className="w-full">
//                       <div className="font-medium text-[#171717] text-xs md:text-sm lg:text-base">
//                         What is your selling timeframe?
//                         <span className="px-1 text-red-500">*</span>
//                       </div>

//                       <div className="grid grid-cols-2 lg:grid-cols-4 justify-between items-center font-semibold text-start text-xs md:text-sm lg:text-base gap-2 mt-4">
//                         <div
//                           className={`w-full border border-[#E5E5E5] bg-white text-[#737373] rounded-full px-5 md:px-7 py-3 ease-in-out duration-500 cursor-pointer ${
//                             RequestData?.timeframe === "Now"
//                               ? ActiveTimeFrame
//                               : null
//                           }`}
//                           onClick={() => {
//                             setRequestData({
//                               ...RequestData,
//                               timeframe: "Now",
//                             });
//                           }}
//                         >
//                           Now
//                         </div>
//                         <div
//                           className={`w-full border border-[#E5E5E5] bg-white text-[#737373] rounded-full px-5 md:px-7 py-3 ease-in-out duration-500 cursor-pointer ${
//                             RequestData?.timeframe === "1 to 3 Months"
//                               ? ActiveTimeFrame
//                               : null
//                           }`}
//                           onClick={() => {
//                             setRequestData({
//                               ...RequestData,
//                               timeframe: "1 to 3 Months",
//                             });
//                           }}
//                         >
//                           1 to 3 Months
//                         </div>
//                         <div
//                           className={`w-full border border-[#E5E5E5] bg-white text-[#737373] rounded-full px-5 md:px-7 py-3 ease-in-out duration-500 cursor-pointer ${
//                             RequestData?.timeframe === "4 to 6 Months"
//                               ? ActiveTimeFrame
//                               : null
//                           }`}
//                           onClick={() => {
//                             setRequestData({
//                               ...RequestData,
//                               timeframe: "4 to 6 Months",
//                             });
//                           }}
//                         >
//                           4 to 6 Months
//                         </div>
//                         <div
//                           className={`w-full border border-[#E5E5E5] bg-white text-[#737373] rounded-full px-5 md:px-7 py-3 ease-in-out duration-500 cursor-pointer ${
//                             RequestData?.timeframe === "Not Sure"
//                               ? ActiveTimeFrame
//                               : null
//                           }`}
//                           onClick={() => {
//                             setRequestData({
//                               ...RequestData,
//                               timeframe: "Not Sure",
//                             });
//                           }}
//                         >
//                           Not Sure
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="mt-4 md:mt-6">
//                     <div className="font-medium text-[#171717] text-xs md:text-sm lg:text-base">
//                       Property address
//                       <span className="px-1 text-red-500">*</span>
//                     </div>
//                     <div className="w-full flex justify-start items-center !text-[#737373] text-xs md:text-sm lg:text-base outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 cursor-pointer mt-2 md:mt-4">
//                       <img
//                         src={search}
//                         alt="icon"
//                         className="w-3 lg:w-4 mr-3 cursor-pointer"
//                       />
//                       <input
//                         type="text"
//                         name="address"
//                         value={RequestData?.address}
//                         onChange={onChangeInput}
//                         placeholder="Search by Address"
//                         className="w-full text-[#737373] font-medium text-xs md:text-sm lg:text-base outline-none"
//                       />
//                     </div>
//                     <div className="text-[#404040] text-xs lg:text-sm mt-2 px-2">
//                       Can’t find your property?
//                       <span className="px-1 text-[#FF2830]">
//                         Enter address detail manually
//                       </span>
//                     </div>
//                   </div>

//                   <div className="mt-4 md:mt-6">
//                     <div className="font-medium text-[#171717] text-xs md:text-sm lg:text-base">
//                       Property type
//                       <span className="px-1 text-red-500">*</span>
//                     </div>
//                     <select
//                       name="type"
//                       value={RequestData?.type}
//                       onChange={onChangeInput}
//                       className="round w-full !text-[#737373] text-xs md:text-sm lg:text-base outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 cursor-pointer mt-2 md:mt-4"
//                     >
//                       <option value="">Select property type...</option>
//                       <option value="Residential">Residential</option>
//                       <option value="Commercial">Commercial</option>
//                       <option value="Industrial">Industrial</option>
//                     </select>
//                   </div>

//                   <div className="flex flex-col justify-center gap-6 text-xs md:text-sm lg:text-base mt-4 md:mt-6">
//                     <div className="text-[#171717] font-medium ">
//                       What is your sale price expectation?
//                     </div>
//                     <div className="grid place-items-center">
//                       <img
//                         src={Bar}
//                         alt="bar-chart"
//                         className="cursor-pointer"
//                       />
//                       <CustomSlider
//                         SelectedRange={SelectedRange}
//                         setSelectedRange={setSelectedRange}
//                       />
//                     </div>
//                     <div className="flex flex-col md:flex-row justify-center items-center gap-4">
//                       <select
//                         name="min"
//                         value={RequestData?.min}
//                         onChange={onChangeInput}
//                         className="round w-full !text-[#737373] text-xs md:text-sm lg:text-base outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 cursor-pointer "
//                       >
//                         <option value="Min $ 50,000">Min $ 50,000</option>
//                         <option value="Min $ 1,00,000">Min $ 1,00,000</option>
//                         <option value="Min $ 2,00,000">Min $ 2,00,000</option>
//                       </select>
//                       <select
//                         name="max"
//                         value={RequestData?.max}
//                         onChange={onChangeInput}
//                         className="round w-full !text-[#737373] text-xs md:text-sm lg:text-base outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 cursor-pointer "
//                       >
//                         <option value="Max $1,50,00,000">
//                           Max $1,50,00,000
//                         </option>
//                         <option value="Max $1,00,00,000">
//                           Max $1,00,00,000
//                         </option>
//                         <option value="Max $50,00,000">Max $50,00,000</option>
//                       </select>
//                     </div>
//                   </div>

//                   <div className="text-[#171717] font-medium text-xs md:text-sm lg:text-base mt-5 md:mt-12">
//                     This will enable the agent to focus on the right comparable
//                     sales prior to meeting you.
//                   </div>

//                   <div className="flex justify-start items-start mt-5 md:mt-12">
//                     <input
//                       type="checkbox"
//                       checked={RequestData?.remember_details}
//                       name="remember_details"
//                       onChange={() => {
//                         setRequestData({
//                           ...RequestData,
//                           remember_details: !RequestData?.remember_details,
//                         });
//                       }}
//                       className="w-6 md:w-auto mt-2 mr-3 md:mr-5 cursor-pointer"
//                     />
//                     <div className="text-[#171717] text-xs md:text-sm lg:text-base">
//                       <div>
//                         Remember these details to complete this form faster.
//                       </div>
//                       <div className=" text-[#737373] text-xs lg:text-sm mt-1">
//                         Details are stored in this web browser for one hour.
//                         Clear this checkbox if you are using a public or shared
//                         device.
//                       </div>
//                     </div>
//                   </div>

//                   <button
//                     className="w-full text-xs md:text-sm lg:text-base font-medium border bg-[#E5002A] text-white hover:bg-white  hover:text-[#E5002A] hover:border-[#E5002A] py-3 px-5 rounded-3xl mt-5 md:mt-12"
//                     onClick={SubmitReqest}
//                   >
//                     Request a free market appraisal
//                   </button>

//                   <div className="text-[#171717] text-center text-xs md:text-sm lg:text-base mt-4 md:mt-6">
//                     A notification will be sent to the selected agent(s). The
//                     agent must accept your request in order to see your contact
//                     details and respond to you. If no agent accepts your
//                     request, a member of our team will let you know.
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout2>
//   );
// };

// export default AgentAppraisal;

import React, { useEffect, useRef, useState } from "react";
import Layout2 from "../../Layouts/Layout2";
import building from "../../assets/building.png";
import agent01 from "../../assets/agent01.png";
import call from "../../assets/call_icon.png";
import chat from "../../assets/chat_icon.png";
import message from "../../assets/message_icon.png";
import lock from "../../assets/lock_icon.png";
import search from "../../assets/search.png";
import Bar from "../../assets/Bars.png";
import CustomSlider from "../common/CustomSlider/CustomSlider";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstanceAuth from "../../apiInstances/axiosInstanceAuth";
import axiosInstanceAuthFormData from "../../apiInstances/axiosInstanceAuthFormData";
import { BACKEND_BASE_URL } from "../../apiInstances/baseurl";
import { toast } from "react-toastify";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Review from "../common/Review/Review";
import AgentOverviewCard from "../common/AgentOverviewCard/AgentOverviewCard";

const AgentAppraisal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const parentDivRef = useRef(null);

  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const [Tracker, setTracker] = useState(1);
  const [SelectedRange, setSelectedRange] = useState([0, 100]);
  const [allAgentData, setAllAgentData] = useState({});
  //console.log("🚀 ~ AgentAppraisal ~ allAgentData:", allAgentData);

  const [AgentData, setAgentData] = useState({});
  //console.log("🚀 ~ AgentAppraisal ~ AgentData:", AgentData);

  const [RequestData, setRequestData] = useState({
    reason: "",
    first_name: "",
    last_name: "",
    email: "",
    mobile_no: "",
    prefer_to_be_contacted: "Email",
    timeframe: "Now",
    address: "",
    type: "",
    min: "",
    max: "",
    remember_details: false,
  });
  //console.log("RequestData---------------------->", RequestData);
  let priceRange = [
    {
      min: RequestData?.min,
    },
    {
      max: RequestData?.max,
    },
  ];

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setRequestData({ ...RequestData, [name]: value });
  };

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
        if (res?.data?.status) {
          setAgentData(mydata);
        } else {
        }
      })
      .catch((err) => {
        //console.log("err --->", err);
      });
  };

  const activeTracker = "!border !border-[#E5002A] !text-white !bg-[#E5002A]";

  const ActiveContact =
    "!border !border-[#E5002A] !bg-[#FFEAEF] !text-[#171717]";

  const ActiveTimeFrame =
    "!border !border-[#E5002A] !bg-[#FFEAEF] !text-[#E5002A]";

  const SubmitReqest = () => {
    try {
      if (RequestData?.reason === "") {
        toast.error("Please enter a Reason");
      } else if (RequestData?.first_name === "") {
        toast.error("Please enter a First Name");
      } else if (RequestData?.last_name === "") {
        toast.error("Please enter a Last Name");
      } else if (!emailRegex?.test(RequestData?.email)) {
        toast.error("Please enter a valid Email");
      } else if (RequestData?.address === "") {
        toast.error("Please enter a Property Address");
      } else if (RequestData?.type === "") {
        toast.error("Please enter a Property type");
        // } else if (RequestData?.remember_details === false) {
        //   toast.error("Please checked Remember these details");
      } else {
        // const formData = new FormData();
        // formData.append("agent_id", id);
        // formData.append("reason", RequestData?.reason);
        // formData.append("first_name", RequestData?.first_name);
        // formData.append("last_name", RequestData?.last_name);
        // formData.append("email", RequestData?.email);
        // formData.append("mobile_no", RequestData?.mobile_no);
        // formData.append(
        //   "prefer_to_be_contacted",
        //   RequestData?.prefer_to_be_contacted
        // );
        // formData.append("timeframe", RequestData?.timeframe);
        // formData.append("address", RequestData?.address);
        // formData.append("type", RequestData?.type);
        // formData.append("priceRange", JSON.stringify(priceRange));
        // formData.append("remember_details", RequestData?.remember_details);

        // //console.log(formData);
        const data = {
          agent_id: id,
          reason: RequestData?.reason,
          first_name: RequestData?.first_name,
          last_name: RequestData?.last_name,
          email: RequestData?.email,
          mobile_no: RequestData?.mobile_no,
          prefer_to_be_contacted: RequestData?.prefer_to_be_contacted,
          timeframe: RequestData?.timeframe,
          type: RequestData?.type,
          address: RequestData?.address,
          priceRange: JSON.stringify(priceRange),
          remember_details: RequestData?.remember_details,
        };
        axiosInstanceAuth
          .post(`sendPropertyDetails`, data)
          .then((res) => {
            if (res?.data?.status) {
              toast.success("Appraisal Submited Successfuly");
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

  const scrollToTop = () => {
    setTimeout(() => {
      if (parentDivRef.current) {
        parentDivRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
      }
    }, 100)
  };

  return (
    <>
      <div className="">
        <div className="w-full flex flex-col  justify-center items-start">
          {/* ------ Image ------ */}
          <div className="grid place-content-center w-full">
            <LazyLoadImage
              // src={agentCoverImg}
              src={AgentData.coverProfileImg}
              alt="icon"
              style={{ width: "100vw" }}
              // srcSet={agentCoverImg}
              srcSet={AgentData.coverProfileImg}
              loading="lazy"
              effect="blur"
              className="h-[50vh]"
            />
          </div>
        </div>
        <div className=" w-full flex flex-col md:flex-row justify-start md:justify-between items-center gap-4 p-4 md:p-6 ">
          <div className="flex flex-col md:flex-row justify-center items-center gap-0 md:gap-8">
            <div className="relative bottom-[50px] md:bottom-[130px] lg:bottom-[100px] xl:bottom-[120px] left-[20%]">
              <LazyLoadImage
                src={AgentData?.profileImg}
                alt="icon"
                srcSet={AgentData?.profileImg}
                loading="lazy"
                effect="blur"
                className="w-20 sm:w-28 md:w-56 aspect-square rounded-full p-1 bg-white"
              />
            </div>
            <div className="flex flex-col justify-start items-center md:items-start gap-1 -mt-10 md:mt-20 ">
              <div className="text-[#404040]  text-lg md:text-xl lg:text-xl">
                You are Contacting
              </div>
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
                    navigate(`/agency-profile/${AgentData?.agency_id?._id}`);
                  }}
                >
                  {AgentData?.agency_id?.principal_name}
                </span>
              </div>
            </div>
          </div>
          <div>
            {" "}
            <AgentOverviewCard AgentData={allAgentData} DataValue={true} />
          </div>
        </div>
        {/* --------- End Section 1 --------- */}

        <div className="other-bg-gradient px-5 py-24">
          <div className=" xl:px-60 lg:px-44 2xl:px-80 mt-16 lg:mt-0 grid place-content-center">
            <div className="max-w-6xl bg-white rounded-xl shadow-md hover:shadow-lg">
              {/* ------------- Tracking Section ------------- */}
              <div className=" px-3  md:px-24 py-5 md:py-12">
                <div className="flex justify-between items-center ">
                  <div
                    className={`font-semibold border border-[#E5002A] text-white bg-[#E5002A] text-lg md:text-xl lg:text-2xl px-10 py-2 rounded-full cursor-pointer`}
                    onClick={() => setTracker(1)}
                  >
                    1
                  </div>
                  <div
                    className={`w-full border border-[#E5002A] border-dashed ${Tracker === 2 ? "!border-solid" : null
                      }`}
                  />
                  <div
                    className={`font-semibold border border-[#E5002A] text-[#E5002A] bg-white text-lg md:text-xl lg:text-2xl px-10 py-2 rounded-full cursor-pointer ${Tracker === 2 ? activeTracker : null
                      }`}
                    onClick={() => setTracker(2)}
                  >
                    2
                  </div>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <div className="top-14 font-semibold text-center text-[#171717] text-sm md:text-base lg:text-lg">
                    Contact Details
                  </div>
                  <div className="w-full" />
                  <div className="top-14 font-semibold text-center text-[#171717] text-sm md:text-base lg:text-lg">
                    Property Details
                  </div>
                </div>
              </div>

              {/* ------------- Border Section ------------- */}

              <div className="w-full border border-[#E5E5E5] " />

              {/* ------------- Contact Details Section ------------- */}
              {Tracker === 1 && (
                <div className="flex flex-col justify-start py-5 px-3 md:py-12 md:px-24">
                  <div className="font-semibold text-[#171717] text-base md:text-lg lg:text-xl xl:text-2xl">
                    Contact Details
                  </div>

                  <div className="mt-5 md:mt-12">
                    <div className="font-medium text-[#171717] text-xs md:text-sm lg:text-base">
                      Reason for requesting appraisal
                      <span className="px-1 text-red-500">*</span>
                    </div>
                    <select
                      name="reason"
                      value={RequestData?.reason}
                      onChange={onChangeInput}
                      className="round w-full !text-[#737373] text-xs md:text-sm lg:text-base outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 cursor-pointer mt-2 md:mt-4"
                    >
                      <option value="">Please select</option>
                      <option value="Buy House">Buy House</option>
                      <option value="Sell House">Sell House</option>
                      <option value="Rent House">Rent House</option>
                    </select>
                  </div>

                  <div className="flex flex-col md:flex-row justify-center gap-4 mt-4 md:mt-6">
                    <div className="w-full">
                      <div className="font-medium text-[#171717] text-xs md:text-sm lg:text-base">
                        First name
                        <span className="px-1 text-red-500">*</span>
                      </div>
                      <input
                        type="text"
                        name="first_name"
                        value={RequestData?.first_name}
                        onChange={onChangeInput}
                        placeholder="Enter first name"
                        className="w-full font-medium text-[#737373] text-xs md:text-sm lg:text-base outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5  mt-2 md:mt-4"
                      />
                    </div>
                    <div className="w-full">
                      <div className="font-medium text-[#171717] text-xs md:text-sm lg:text-base">
                        Last name <span className="px-1 text-red-500">*</span>
                      </div>
                      <input
                        type="text"
                        name="last_name"
                        value={RequestData?.last_name}
                        onChange={onChangeInput}
                        placeholder="Enter last name"
                        className="w-full font-medium text-[#737373] text-xs md:text-sm lg:text-base outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5  mt-2 md:mt-4"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row justify-center gap-4 mt-4 md:mt-6">
                    <div className="w-full">
                      <div className="font-medium text-[#171717] text-xs md:text-sm lg:text-base">
                        Email
                        <span className="px-1 text-red-500">*</span>
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={RequestData?.email}
                        onChange={onChangeInput}
                        placeholder="Enter email address"
                        className="w-full font-medium text-[#737373] text-xs md:text-sm lg:text-base outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5  mt-2 md:mt-4"
                      />
                    </div>
                    <div className="w-full">
                      <div className="font-medium text-[#171717] text-xs md:text-sm lg:text-base">
                        Mobile phone number{" "}
                        <span className="px-1 text-red-500">*</span>
                      </div>
                      <input
                        type="number"
                        name="mobile_no"
                        value={RequestData?.mobile_no}
                        onChange={onChangeInput}
                        placeholder="Enter mobile phone number"
                        className="w-full font-medium text-[#737373] text-xs md:text-sm lg:text-base outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5  mt-2 md:mt-4"
                      />
                    </div>
                  </div>

                  <div className="text-[#171717] font-medium text-xs md:text-sm lg:text-base mt-5 md:mt-12">
                    We will Send you a one-time verification code to confirm
                    your mobile number.
                  </div>

                  <div className="text-[#171717] font-medium text-xs md:text-sm lg:text-base mt-5 md:mt-12">
                    How would you prefer to be contacted?
                  </div>

                  <div className="flex justify-between items-center gap-2 mt-4">
                    {/* <div
                      className={`w-full border border-[#E5E5E5] bg-white text-[#737373] rounded-md flex flex-col justify-center items-center gap-2 py-4 md:py-5 ease-in-out duration-500 cursor-pointer ${
                        RequestData?.prefer_to_be_contacted === "Call"
                          ? ActiveContact
                          : null
                      }`}
                      onClick={() => {
                        setRequestData({
                          ...RequestData,
                          prefer_to_be_contacted: "Call",
                        });
                      }}
                    >
                      <img src={call} alt="icon" className="w-6 md:w-auto" />
                      <div className="font-semibold  text-xs md:text-sm lg:text-base">
                        Call Now
                      </div>
                    </div> */}

                    {/* <div
                      className={`w-full border border-[#E5E5E5] bg-white text-[#737373] rounded-md flex flex-col justify-center items-center gap-2 py-4 md:py-5 ease-in-out duration-500 cursor-pointer ${
                        RequestData?.prefer_to_be_contacted === "SMS"
                          ? ActiveContact
                          : null
                      }`}
                      onClick={() => {
                        setRequestData({
                          ...RequestData,
                          prefer_to_be_contacted: "SMS",
                        });
                      }}
                    >
                      <img src={chat} alt="icon" className="w-6 md:w-auto" />
                      <div className="font-semibold text-xs md:text-sm lg:text-base">
                        SMS Now
                      </div>
                    </div> */}

                    <div
                      className={`w-full border border-[#E5E5E5] bg-white text-[#737373] rounded-md flex flex-col justify-center items-center gap-2 py-4 md:py-5 ease-in-out duration-500 cursor-pointer ${RequestData?.prefer_to_be_contacted === "Email"
                        ? ActiveContact
                        : null
                        }`}
                      onClick={() => {
                        setRequestData({
                          ...RequestData,
                          prefer_to_be_contacted: "Email",
                        });
                      }}
                    >
                      <img src={message} alt="icon" className="w-6 md:w-auto" />
                      <div className="font-semibold text-xs md:text-sm lg:text-base">
                        Email Now
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-start items-start mt-5 md:mt-12">
                    <img
                      src={lock}
                      alt="icon"
                      className="w-6 md:w-auto mr-3 md:mr-5"
                    />
                    <div className="text-[#171717] text-xs md:text-sm lg:text-base">
                      Your phone and email will not be used for marketing
                      purposes or shared with any third parties not related to
                      your property appraisal. See our
                      <span className="px-1 text-[#FF2830]">
                        Personal Information Collection Statement.
                      </span>
                    </div>
                  </div>

                  <button
                    className="w-full text-xs md:text-sm lg:text-base font-medium border bg-[#E5002A] text-white hover:bg-white  hover:text-[#E5002A] hover:border-[#E5002A] py-3 px-5 rounded-3xl mt-5 md:mt-12"
                    onClick={(e) => {
                      setTracker(2);
                      scrollToTop();
                    }}
                  >
                    Continue
                  </button>
                </div>
              )}

              {/* ------------- Property Details Section ------------- */}
              {Tracker === 2 && (
                <div className="flex flex-col justify-start py-5 px-3 md:py-12 md:px-24">
                  <div className="font-semibold text-[#171717] text-base md:text-lg lg:text-xl xl:text-2xl">
                    Property Details
                  </div>

                  <div className="flex flex-col md:flex-row justify-center gap-4 mt-5 md:mt-12" ref={parentDivRef} >
                    <div className="w-full">
                      <div className="font-medium text-[#171717] text-xs md:text-sm lg:text-base">
                        What is your selling timeframe?
                        <span className="px-1 text-red-500">*</span>
                      </div>

                      <div className="grid grid-cols-2 lg:grid-cols-4 justify-between items-center font-semibold text-start text-xs md:text-sm lg:text-base gap-2 mt-4">
                        <div
                          className={`w-full border border-[#E5E5E5] bg-white text-[#737373] rounded-full px-5 md:px-7 py-3 ease-in-out duration-500 cursor-pointer ${RequestData?.timeframe === "Now"
                            ? ActiveTimeFrame
                            : null
                            }`}
                          onClick={() => {
                            setRequestData({
                              ...RequestData,
                              timeframe: "Now",
                            });
                          }}
                        >
                          Now
                        </div>
                        <div
                          className={`w-full border border-[#E5E5E5] bg-white text-[#737373] rounded-full px-5 md:px-7 py-3 ease-in-out duration-500 cursor-pointer ${RequestData?.timeframe === "1 to 3 Months"
                            ? ActiveTimeFrame
                            : null
                            }`}
                          onClick={() => {
                            setRequestData({
                              ...RequestData,
                              timeframe: "1 to 3 Months",
                            });
                          }}
                        >
                          1 to 3 Months
                        </div>
                        <div
                          className={`w-full border border-[#E5E5E5] bg-white text-[#737373] rounded-full px-5 md:px-7 py-3 ease-in-out duration-500 cursor-pointer ${RequestData?.timeframe === "4 to 6 Months"
                            ? ActiveTimeFrame
                            : null
                            }`}
                          onClick={() => {
                            setRequestData({
                              ...RequestData,
                              timeframe: "4 to 6 Months",
                            });
                          }}
                        >
                          4 to 6 Months
                        </div>
                        <div
                          className={`w-full border border-[#E5E5E5] bg-white text-[#737373] rounded-full px-5 md:px-7 py-3 ease-in-out duration-500 cursor-pointer ${RequestData?.timeframe === "Not Sure"
                            ? ActiveTimeFrame
                            : null
                            }`}
                          onClick={() => {
                            setRequestData({
                              ...RequestData,
                              timeframe: "Not Sure",
                            });
                          }}
                        >
                          Not Sure
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 md:mt-6">
                    <div className="font-medium text-[#171717] text-xs md:text-sm lg:text-base">
                      Property address
                      <span className="px-1 text-red-500">*</span>
                    </div>
                    <div className="w-full flex justify-start items-center !text-[#737373] text-xs md:text-sm lg:text-base outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 cursor-pointer mt-2 md:mt-4">
                      <img
                        src={search}
                        alt="icon"
                        className="w-3 lg:w-4 mr-3 cursor-pointer"
                      />
                      <input
                        type="text"
                        name="address"
                        value={RequestData?.address}
                        onChange={onChangeInput}
                        placeholder="Search by Address"
                        className="w-full text-[#737373] font-medium text-xs md:text-sm lg:text-base outline-none"
                      />
                    </div>
                    <div className="text-[#404040] text-xs lg:text-sm mt-2 px-2">
                      Can’t find your property?
                      <span className="px-1 text-[#FF2830]">
                        Enter address detail manually
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 md:mt-6">
                    <div className="font-medium text-[#171717] text-xs md:text-sm lg:text-base">
                      Property type
                      <span className="px-1 text-red-500">*</span>
                    </div>
                    <select
                      name="type"
                      value={RequestData?.type}
                      onChange={onChangeInput}
                      className="round w-full !text-[#737373] text-xs md:text-sm lg:text-base outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 cursor-pointer mt-2 md:mt-4"
                    >
                      <option value="">Select property type...</option>
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Industrial">Industrial</option>
                    </select>
                  </div>

                  <div className="flex flex-col justify-center gap-6 text-xs md:text-sm lg:text-base mt-4 md:mt-6">
                    <div className="text-[#171717] font-medium ">
                      What is your sale price expectation?
                    </div>
                    {/* <div className="grid place-items-center">
                      <img
                        src={Bar}
                        alt="bar-chart"
                        className="cursor-pointer"
                      />
                      <CustomSlider
                        SelectedRange={SelectedRange}
                        setSelectedRange={setSelectedRange}
                      />
                    </div> */}
                    <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                      <select
                        name="min"
                        value={RequestData?.min}
                        onChange={onChangeInput}
                        className="round w-full !text-[#737373] text-xs md:text-sm lg:text-base outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 cursor-pointer "
                      >
                        <option value="Min $ 50,000">Min $ 50,000</option>
                        <option value="Min $ 1,00,000">Min $ 1,00,000</option>
                        <option value="Min $ 2,00,000">Min $ 2,00,000</option>
                      </select>
                      <select
                        name="max"
                        value={RequestData?.max}
                        onChange={onChangeInput}
                        className="round w-full !text-[#737373] text-xs md:text-sm lg:text-base outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 cursor-pointer "
                      >
                        <option value="Max $1,50,00,000">
                          Max $1,50,00,000
                        </option>
                        <option value="Max $1,00,00,000">
                          Max $1,00,00,000
                        </option>
                        <option value="Max $50,00,000">Max $50,00,000</option>
                      </select>
                    </div>
                  </div>

                  <div className="text-[#171717] font-medium text-xs md:text-sm lg:text-base mt-5 md:mt-12">
                    This will enable the agent to focus on the right comparable
                    sales prior to meeting you.
                  </div>

                  <div className="flex justify-start items-start mt-5 md:mt-12">
                    <input
                      type="checkbox"
                      checked={RequestData?.remember_details}
                      name="remember_details"
                      onChange={() => {
                        setRequestData({
                          ...RequestData,
                          remember_details: !RequestData?.remember_details,
                        });
                      }}
                      className="w-6 md:w-auto mt-2 mr-3 md:mr-5 cursor-pointer"
                    />
                    <div className="text-[#171717] text-xs md:text-sm lg:text-base">
                      <div>
                        Remember these details to complete this form faster.
                      </div>
                      <div className=" text-[#737373] text-xs lg:text-sm mt-1">
                        Details are stored in this web browser for one hour.
                        Clear this checkbox if you are using a public or shared
                        device.
                      </div>
                    </div>
                  </div>

                  <button
                    className="w-full text-xs md:text-sm lg:text-base font-medium border bg-[#E5002A] text-white hover:bg-white  hover:text-[#E5002A] hover:border-[#E5002A] py-3 px-5 rounded-3xl mt-5 md:mt-12"
                    onClick={SubmitReqest}
                  >
                    Request a free market appraisal
                  </button>

                  <div className="text-[#171717] text-center text-xs md:text-sm lg:text-base mt-4 md:mt-6">
                    A notification will be sent to the selected agent(s). The
                    agent must accept your request in order to see your contact
                    details and respond to you. If no agent accepts your
                    request, a member of our team will let you know.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AgentAppraisal;
