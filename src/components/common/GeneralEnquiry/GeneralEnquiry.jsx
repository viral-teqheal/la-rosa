import React, { useState } from "react";
import email from "../../../assets/message_icon.png";
import infoOutline from "../../../assets/infoOutline.png";
import call from "../../../assets/call_icon.png";
import chat from "../../../assets/chat_icon.png";
import message from "../../../assets/message_icon.png";
import axiosInstanceAuth from "../../../apiInstances/axiosInstanceAuth";
import { toast } from "react-toastify";

const GeneralEnquiry = ({ setNext, whichActive, data }) => {
  const [RequestData, setRequestData] = useState({
    address: "",
    message: "",
    name: "",
    mobile_no: "",
    prefer_to_be_contacted: "Email",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setRequestData({ ...RequestData, [name]: value });
  };

  const ActiveContact =
    "!border !border-[#E5002A] !bg-[#FFEAEF] !text-[#171717]";

  const submitEnquiry = async (RequestData) => {
    const errors = [];

    if (RequestData.address === "") {
      errors.push("Please enter a Address");
    }

    if (RequestData.message === "") {
      errors.push("Please enter a Message");
    }

    if (RequestData.name === "") {
      errors.push("Please enter a Name");
    }

    if (RequestData.mobile_no === "") {
      errors.push("Please enter a Mobile Number");
    }

    if (errors.length > 0) {
      for (const error of errors) {
        toast.error(error);
      }

      return;
    }

    const res = await axiosInstanceAuth.post("sendEnquiry", {
      agent_id: data?._id,
      type: whichActive,
      address: RequestData.address,
      message: RequestData.message,
      name: RequestData.name,
      mobile_no: RequestData.mobile_no,
      prefer_to_be_contacted: RequestData.prefer_to_be_contacted,
    });

    if (res.data.status) {
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }
  };

  return (
    <>
      <div className="lg:px-10 px-5 py-5">
        <div className="flex justify-between flex-col-reverse sm:flex-row   mb-5">
          <div>
            <h2 className="text-[#404040] font-semibold text-sm md:text-base lg:text-lg">
              Enquiry about general enquiry
            </h2>
          </div>
          <div
            className="text-sm text-blue-400 mb-2 sm:mb-0"
            onClick={() => setNext(true)}
          >
            Edit enquiry type
          </div>
        </div>

        <div className="w-full mb-5">
          <div className="font-medium text-[#171717] text-xs md:text-sm ">
            Property address
            <span className="px-1 text-lg text-red-500">*</span>
          </div>
          <input
            type="text"
            name="address"
            value={RequestData?.address}
            onChange={onChangeInput}
            placeholder="Enter your address"
            className="w-full font-medium text-[#737373] text-xs md:text-sm outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5  mt-2 md:mt-4"
          />
        </div>

        <div className="w-full mb-5">
          <div className="font-medium text-[#171717] text-xs md:text-sm ">
            Write a message
            <span className="px-1 text-lg text-red-500">*</span>
          </div>
          <textarea
            rows={4}
            type="text"
            name="message"
            value={RequestData?.message}
            onChange={onChangeInput}
            placeholder="Enter your message"
            className="w-full font-medium text-[#737373] text-xs md:text-sm outline-none border border-[#E5E5E5] rounded-lg py-3 px-5  mt-2 md:mt-4"
          />
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
          <div className="w-full">
            <div className="font-medium text-[#171717] text-xs md:text-sm ">
              Your name
              <span className="px-1 text-red-500">*</span>
            </div>
            <input
              type="text"
              name="name"
              value={RequestData?.name}
              onChange={onChangeInput}
              placeholder="Enter your name"
              className="w-full font-medium text-[#737373] text-xs md:text-sm outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5  mt-2 md:mt-4"
            />
          </div>
          <div className="w-full">
            <div className="font-medium text-[#171717] text-xs md:text-sm ">
              Your number <span className="px-1 text-red-500">*</span>
            </div>
            <input
              type="number"
              name="mobile_no"
              value={RequestData?.mobile_no}
              onChange={onChangeInput}
              placeholder="Enter your number"
              className="w-full font-medium text-[#737373] text-xs md:text-sm outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5  mt-2 md:mt-4"
            />
          </div>
        </div>

        <div className="text-[#171717] font-medium text-xs md:text-sm lg:text-base">
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
          </div>

          <div
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
            className={`w-full border border-[#E5E5E5] bg-white text-[#737373] rounded-md flex flex-col justify-center items-center gap-2 py-4 md:py-5 ease-in-out duration-500 cursor-pointer ${
              RequestData?.prefer_to_be_contacted === "Email"
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
        <div
          className="w-full bg-[#E5002A] rounded-full mt-9 py-3 text-center text-white"
          onClick={() => submitEnquiry(RequestData)}
        >
          <button>Send enquiry</button>
        </div>
        <div className="flex gap-4">
          <p className="text-[#171717] text-sm my-6">
            This form is only to be used for sending genuine email enquiries to
            the Agency. realestate.com.au Pty Ltd reserves its right to take any
            legal or other appropriate action in relation to misuse of this
            service. Personal collection statement
          </p>
          <div className="grid my-6">
            <img src={infoOutline} alt={infoOutline} className="max-w-xs" />
          </div>
        </div>
      </div>
    </>
  );
};

export default GeneralEnquiry;
