import React, { useEffect } from "react";
import Layout2 from "../../Layouts/Layout2";
import email from "../../assets/email.png";
import lock from "../../assets/lock.png";
import sideArrow from "../../assets/side-arrow.png";
import AlertsPopup from "../common/SettingPopup/SettingPopup";
import { useState } from "react";
import emailicon from "../../assets/emailicon.png";
import phone from "../../assets/phone.png";
import axiosInstance from "../../apiInstances/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import axiosInstanceAuth from "../../apiInstances/axiosInstanceAuth";

const AccountSetting = () => {
  const InputBox =
    "w-full text-xs md:text-sm rounded-lg border-[1px] border-[#949198] my-3 md:my-3 py-4 px-10 outline-none";

  const [AuthPopUp, setAuthPopUp] = useState();
  const [Email, setEmail] = useState();
  const [Iscale, setIscal] = useState(false);
  const [alertdata, setAlertdata] = useState({});
  const [datas, setData] = useState();
  const [popup, setPopup] = useState({ value: false, name: "" });
  //console.log("🚀 ~ AccountSetting ~ popup:", popup);
  const navigate = useNavigate();
  const [passHide, setPassHide] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [fields, setFields] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  useEffect(() => {
    const token = localStorage.getItem("email");
    setEmail(token);
  }, []);

  useEffect(() => {
    fields.newPassword == fields.confirmPassword ? setIsPasswordError(false) : setIsPasswordError(true)
    if (fields.confirmPassword.length == 0) {
      setIsPasswordError(false)
    }
  }, [fields.newPassword, fields.confirmPassword])

  const onChangeInput = (e) => {
    const value = e.target.value.replace(/^\s+|\s+$/gm, "");
    const name = e.target.name;
    setFields({
      ...fields,
      [name]: value,
    });
  };


  const data = [
    {
      id: 0,
      maintitle: "Your property journey",
      content:
        "Recommended property information and tools based on your searches and activity.",
      email: emailicon,
      name: "Email",
      checkbox: "checkbox",
    },
    {
      id: 1,
      maintitle: "Saved search alerts",
      content: "Manage what alerts you get when you've saved a search.",
      email: emailicon,
      name: "Email",
      push: phone,
      name1: "push",
      con: "Download the app for push notifications",
      link: "Manage individual saved searches here",
      checkbox: "checkbox",
    },
    {
      id: 2,
      maintitle: "Property updates",
      content: "Notifications about properties you've shown interest in.",
      push: phone,
      name1: "push",
      con: "Download the app for push notifications",
    },
    {
      id: 3,
      maintitle: "Promoted residential properties",
      content:
        "Notifications about residential properties relevant to your search. ",
      email: emailicon,
      name: "Email",
      checkbox: "checkbox",
    },
    {
      id: 4,
      maintitle: "Promoted new developments",
      content:
        "Recommended new developments and property projects based on your searches and activity.",
      email: emailicon,
      name: "Email",
      checkbox: "checkbox",
    },
    {
      id: 5,
      maintitle: "Property updates",
      content:
        "Relates to the bell icon and notifications about your saved properties you've shown interest in.",
      checkbox: "checkbox",
      bordertop: "mt-6",
    },
    {
      id: 6,
      maintitle: "Market updates",
      content:
        "Market data, recent sales, auction results and updates on properties you like.",
      email: emailicon,
      name: "Email",
    },
    {
      id: 7,
      maintitle: "Sales and auction results",
      content: "Latest auction results and property sales.",
      push: phone,
      name1: "push",
      con: "Download the app for push notifications",
    },
    {
      id: 8,
      maintitle: "Property news and guides",
      content: "The latest property news, guides and inspiration.",
      email: emailicon,
      name: "Email",
    },
    {
      id: 9,
      maintitle: "Personalised ads",
      content:
        "Advertising tailored to you based on your activity and the information you've provided. If you opt out, you'll still get ads but they won't be tailored to you.",
      checkbox: "checkbox",
    },
    {
      id: 10,
      maintitle: "Suggested properties",
      content: "Property suggestions that match your activity and searches.",
      checkbox: "checkbox",
    },
  ];

  const sendEmail = async () => {
    localStorage.setItem("newEmail", datas);

    try {
      await axiosInstance
        .post("updateEmail", { email: datas, firstname: Email })
        .then((res) => {
          //console.log("res--------------------", res);
          if (res?.data?.status) {
            //console.log("hiiiiiiiiiiiiiii");
            toast.success("check your email");
            navigate("/VerifyOtp");
          } else if (res?.data?.page) {
            toast.success("check your email");
            navigate(`/${res?.data?.page}`);
          }
          setPopup(!popup)

        });
    } catch (e) {
      console.error(e);
    }
  };
  const sendPassword = async () => {
    if (fields.newPassword.length == 0) {
      return toast.error("Please enter password.");
    }
    if (fields.confirmPassword.length == 0) {
      return toast.error("Please enter confirm password.");
    }
    if (!isPasswordError) {
      try {
        await axiosInstanceAuth
          .post("updatePassword", fields)
          .then((res) => {
            if (res?.data?.status) {
              toast.success(res.data.message)
              setAuthPopUp(false);
              setFields({
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
              })
              setPassHide({
                currentPassword: false,
                newPassword: false,
                confirmPassword: false,
              });
            } else {
              toast.error(res.data.message)
            }
          });
      } catch (e) {
        console.error(e);
      }
    }
  };
  const deleteAccount = async () => {
    try {
      await axiosInstance
        .post("deleteAccount", { email: Email })
        .then((res) => {
          if (res.data.status) {
            toast.success(res.data.message);
            localStorage.clear();
            navigate(`/log-in`);

          }
          setPopup(!popup)
        });
    } catch (e) {
      console.error(e);
    }
  };
  const signoutAll = async () => {
    //console.log("hiiiiiiiiiiiiiiiii");
    try {
      await axiosInstance.get("signoutAll").then((res) => {
        //console.log("🚀 ~ awaitaxiosInstance.get ~ res:", res);
        if (res.data.status) {
          toast.success(res.data.message);
          localStorage.clear();
          navigate("/log-in");
        }
        setPopup(!popup)

      });
    } catch (e) {
      console.error(e);
    }
  };
  const onClose = async (e) => {
    setAuthPopUp(false);
    setFields({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    })
  }
  return (
    <>
      <div className="px-5 pt-20 lg:pt-8 ">
        <div className="container mx-auto">
          {/* -------- Start Account overview -------- */}
          <div className="flex flex-col justify-start  bg-white rounded-2xl shadow-sm hover:shadow-md p-6 md:p-8">
            <div className="text-start font-extrabold text-[#171717] text-lg md:text-2xl lg:text-3xl">
              Account overview
            </div>
            <div className="flex flex-col md:flex-row justify-start gap-5 mt-8">
              <div className="w-full md:w-[50%] flex flex-col justify-start">
                <div className="font-medium text-[#171717] text-xs md:text-sm lg:text-base">
                  Email
                </div>
                <div className="flex justify-between items-center border border-[#737373] rounded-[28px] p-4 mt-3">
                  <div className="flex justify-start items-center">
                    <img src={email} alt="icon" className="w-4 lg:w-5 mr-2" />
                    <div className="font-medium text-[#737373] text-xs md:text-sm lg:text-base">
                      {Email}
                    </div>
                  </div>
                  {/* <button
                    className="font-medium text-[#737373] text-xs md:text-sm lg:text-base cursor-pointer"
                    onClick={() => setAuthPopUp(!AuthPopUp)}
                  >
                    Update
                  </button> */}
                </div>
              </div>

              <div className="w-full md:w-[50%] flex flex-col justify-start">
                <div className="font-medium text-[#171717] text-xs md:text-sm lg:text-base">
                  Password
                </div>
                <div className="flex justify-between items-center border border-[#737373] rounded-[28px] p-4 mt-3">
                  <div className="flex justify-start items-center">
                    <img src={lock} alt="icon" className="w-4 lg:w-5 mr-2" />
                    <div className="font-medium text-[#737373] text-xs md:text-sm lg:text-base">
                      ***********
                    </div>
                  </div>
                  <button className="font-medium text-[#737373] text-xs md:text-sm lg:text-base cursor-pointer" onClick={() => setAuthPopUp(!AuthPopUp)}>
                    Update
                  </button>
                </div>
              </div>
            </div>

            <div className="font-semibold text-[#404040] text-xs md:text-sm lg:text-base mt-8">
              Sign out on all devices
            </div>
            <div className="font-medium text-[#737373] text-xs md:text-sm lg:text-base mt-2">
              Lost a device or recently used a public computer? Protect your
              account by signing out on all devices.
            </div>
            <div className="font-medium text-[#737373] text-xs md:text-sm lg:text-base my-5 md:my-7 cursor-pointer">
              <button
                className="border border-[#737373] rounded-[28px] py-3 px-5"
                // onClick={signoutAll}>
                onClick={() => setPopup({ value: !popup, name: "signoutall" })}
              >
                Sign out on all devices
              </button>
            </div>
            <div
              className="font-medium text-[#E5002A] text-xs md:text-sm lg:text-base cursor-pointer"
              // onClick={deleteAccount}>
              onClick={() => setPopup({ value: !popup, name: "deleteAccount" })}
            >
              Delete account
            </div>
          </div>
          {/* -------- End Account overview -------- */}

          {/* -------- Start Notification settings -------- */}
          <div className="flex flex-col justify-start  bg-white rounded-2xl shadow-sm hover:shadow-md p-6 md:p-8 mt-10">
            <div className="text-start font-extrabold text-[#171717] text-lg md:text-2xl lg:text-3xl">
              Notification settings
            </div>
            <div className="flex flex-col justify-start">
              <div className="font-semibold text-[#171717] text-sm md:text-base lg:text-lg mt-5">
                Property journey
              </div>

              <div
                onClick={() => {
                  setIscal(true);
                  setAlertdata(data[0]);
                }}
                className="flex justify-between items-center border border-[#E5E5E5] rounded-[50px] py-4 px-7 mt-3 cursor-pointer"
              >
                <div className="flex flex-col justify-start">
                  <div className="font-medium text-[#000000] text-xs md:text-sm lg:text-base">
                    Personalised advertising
                  </div>
                  <div className="font-normal text-[#171717] text-xs">
                    On: Email
                  </div>
                </div>
                <img src={sideArrow} alt="icon" className="h-4" />
              </div>
            </div>

            <div className="flex flex-col justify-start">
              <div className="font-semibold text-[#171717] text-sm md:text-base lg:text-lg mt-8">
                Properties
              </div>

              <div
                onClick={() => {
                  setIscal(true);
                  setAlertdata(data[1]);
                }}
                className="flex justify-between items-center border border-[#E5E5E5] rounded-[50px] py-4 px-7 mt-3 cursor-pointer"
              >
                <div className="flex flex-col justify-start">
                  <div className="font-medium text-[#000000] text-xs md:text-sm lg:text-base">
                    Saved search alerts
                  </div>
                  <div className="font-normal text-[#171717] text-xs">
                    On: Email
                  </div>
                </div>
                <img src={sideArrow} alt="icon" className="h-4" />
              </div>

              <div
                onClick={() => {
                  setIscal(true);
                  setAlertdata(data[2]);
                }}
                className="flex justify-between items-center border border-[#E5E5E5] rounded-[50px] py-4 px-7 mt-3 cursor-pointer"
              >
                <div className="flex flex-col justify-start">
                  <div className="font-medium text-[#000000] text-xs md:text-sm lg:text-base">
                    Property updates
                  </div>
                  <div className="font-normal text-[#171717] text-xs">off</div>
                </div>
                <img src={sideArrow} alt="icon" className="h-4" />
              </div>

              <div
                onClick={() => {
                  setIscal(true);
                  setAlertdata(data[3]);
                }}
                className="flex justify-between items-center border border-[#E5E5E5] rounded-[50px] py-4 px-7 mt-3 cursor-pointer"
              >
                <div className="flex flex-col justify-start">
                  <div className="font-medium text-[#000000] text-xs md:text-sm lg:text-base">
                    Promoted residential properties
                  </div>
                  <div className="font-normal text-[#171717] text-xs">
                    On: Email
                  </div>
                </div>
                <img src={sideArrow} alt="icon" className="h-4" />
              </div>

              <div
                onClick={() => {
                  setIscal(true);
                  setAlertdata(data[4]);
                }}
                className="flex justify-between items-center border border-[#E5E5E5] rounded-[50px] py-4 px-7 mt-3 cursor-pointer"
              >
                <div className="flex flex-col justify-start">
                  <div className="font-medium text-[#000000] text-xs md:text-sm lg:text-base">
                    Promoted new developments
                  </div>
                  <div className="font-normal text-[#171717] text-xs">
                    On: Email
                  </div>
                </div>
                <img src={sideArrow} alt="icon" className="h-4" />
              </div>
            </div>
          </div>
          {/* -------- End Notification settings -------- */}

          {/* -------- Start Data privacy -------- */}
          <div className="flex flex-col justify-start  bg-white rounded-2xl shadow-sm hover:shadow-md p-6 md:p-8 my-10">
            <div className="text-start font-extrabold text-[#171717] text-lg md:text-2xl lg:text-3xl">
              Data privacy
            </div>
            <div className="flex flex-col justify-start">
              <div
                onClick={() => {
                  setIscal(true);
                  setAlertdata(data[9]);
                }}
                className="flex justify-between items-center border border-[#E5E5E5] rounded-[50px] py-4 px-7 mt-3 cursor-pointer"
              >
                <div className="flex flex-col justify-start">
                  <div className="font-medium text-[#000000] text-xs md:text-sm lg:text-base">
                    Personalised advertising
                  </div>
                  <div className="font-normal text-[#171717] text-xs">On</div>
                </div>
                <img src={sideArrow} alt="icon" className="h-4" />
              </div>

              <div
                onClick={() => {
                  setIscal(true);
                  setAlertdata(data[10]);
                }}
                className="flex justify-between items-center border border-[#E5E5E5] rounded-[50px] py-4 px-7 mt-3 cursor-pointer"
              >
                <div className="flex flex-col justify-start">
                  <div className="font-medium text-[#000000] text-xs md:text-sm lg:text-base">
                    Suggested properties
                  </div>
                  <div className="font-normal text-[#171717] text-xs">off</div>
                </div>
                <img src={sideArrow} alt="icon" className="h-4" />
              </div>

              <div
                onClick={() => {
                  setIscal(true);
                  setAlertdata(data[5]);
                }}
                className="flex justify-between items-center border border-[#E5E5E5] rounded-[50px] py-4 px-7 mt-3 cursor-pointer"
              >
                <div className="flex flex-col justify-start">
                  <div className="font-medium text-[#000000] text-xs md:text-sm lg:text-base">
                    Property updates
                  </div>
                  <div className="font-normal text-[#171717] text-xs">On</div>
                </div>
                <img src={sideArrow} alt="icon" className="h-4" />
              </div>
            </div>
          </div>
          {/* -------- End Data privacy -------- */}
        </div>
      </div>

      <AlertsPopup setIsOpen={setIscal} IsOpen={Iscale} data={alertdata} />

      {AuthPopUp ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[999999]  outline-none focus:outline-none border ">
            <div className="relative min-w-[30%] mx-auto  my-10 shadow-black shadow-2xl">
              {/* ------ Content ------ */}
              <div className="border-0 rounded-lg shadow-2xl relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/* ------ Header ------ */}
                <div className="grid place-items-center place-content-end">
                  <button
                    className="bg-transparent border-0 text-black opacity-9 text-2xl font-normal outline-none focus:outline-none mx-3 my-2"
                    onClick={(e) => onClose(e)}
                  >
                    ×
                  </button>
                </div>
                {/* ------ Body ------ */}
                <div className="relative px-6 md:px-10 py-2 flex-auto ">
                  {/* <p className="text-start pb-2">Current Password:</p> */}
                  <div className="relative">
                    <input
                      type={!passHide.currentPassword ? "password" : "text"}
                      className={`${InputBox}`}
                      placeholder="Current Password"
                      name="currentPassword"
                      value={fields?.currentPassword}
                      onChange={(e) => onChangeInput(e)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          sendPassword();
                        }
                      }}
                    />
                    <RiLockPasswordLine className="text-[22px] text-[#6c6b71] absolute top-[30px] left-[10px]" />
                    {passHide.currentPassword ? (
                      <IoEyeOutline
                        onClick={() => setPassHide({ ...passHide, currentPassword: false })}
                        className="text-[22px] text-[#6c6b71] absolute top-[30px] right-[15px] cursor-pointer"
                      />
                    ) : (
                      <FaRegEyeSlash
                        onClick={() => setPassHide({ ...passHide, currentPassword: true })}
                        className="text-[22px] text-[#6c6b71] absolute top-[30px] right-[15px] cursor-pointer"
                      />
                    )}
                  </div>
                </div>
                <div className="relative px-6 md:px-10 py-2 flex-auto ">
                  {/* <p className="text-start pb-2">New Password:</p> */}
                  <div className="relative">
                    <input
                      type={!passHide.newPassword ? "password" : "text"}
                      className={`${InputBox}`}
                      placeholder="New Password"
                      name="newPassword"
                      value={fields?.newPassword}
                      onChange={(e) => onChangeInput(e)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          sendPassword();
                        }
                      }}
                    />
                    <RiLockPasswordLine className="text-[22px] text-[#6c6b71] absolute top-[30px] left-[10px]" />
                    {passHide.newPassword ? (
                      <IoEyeOutline
                        onClick={() => setPassHide({ ...passHide, newPassword: false })}
                        className="text-[22px] text-[#6c6b71] absolute top-[30px] right-[15px] cursor-pointer"
                      />
                    ) : (
                      <FaRegEyeSlash
                        onClick={() => setPassHide({ ...passHide, newPassword: true })}
                        className="text-[22px] text-[#6c6b71] absolute top-[30px] right-[15px] cursor-pointer"
                      />
                    )}
                  </div>
                </div>
                <div className="relative px-6 md:px-10 py-2 flex-auto ">
                  {/* <p className="text-start pb-2">Confirm Password:</p> */}
                  <div className="relative">
                    <input
                      type={!passHide.confirmPassword ? "password" : "text"}
                      className={`${InputBox}`}
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      value={fields?.confirmPassword}
                      onChange={(e) => onChangeInput(e)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          sendPassword();
                        }
                      }}
                    />
                    <RiLockPasswordLine className="text-[22px] text-[#6c6b71] absolute top-[30px] left-[10px]" />
                    {passHide.confirmPassword ? (
                      <IoEyeOutline
                        onClick={() => setPassHide({ ...passHide, confirmPassword: false })}
                        className="text-[22px] text-[#6c6b71] absolute top-[30px] right-[15px] cursor-pointer"
                      />
                    ) : (
                      <FaRegEyeSlash
                        onClick={() => setPassHide({ ...passHide, confirmPassword: true })}
                        className="text-[22px] text-[#6c6b71] absolute top-[30px] right-[15px] cursor-pointer"
                      />
                    )}
                  </div>
                  <p className="text-red-600 text-xs">{isPasswordError ? "Confirm password did't match." : ""}</p>
                </div>

                {/* ------ Fotter ------ */}
                <div className="flex justify-center items-center m-5 mt-2">
                  {/* <button
                    className="border-2 border-[#525252] hover:border-black bg-white text-[#525252] font-semibold text-sm px-7 py-3 rounded-lg outline-none focus:outline-none ease-linear transition-all duration-150 mx-2"
                    // onClick={(e) => navigate("/sign-up")}
                  >
                    Join
                  </button> */}
                  <button
                    className="border-2 border-[#E5002A] bg-[#E5002A] hover:bg-[#db183c] text-white font-semibold text-sm px-7 py-3 rounded-lg outline-none focus:outline-none ease-linear transition-all duration-150 mx-2"
                    onClick={() => sendPassword()}
                  >
                    Change password
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-20 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {popup.name && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[999999]  outline-none focus:outline-none border ">
            <div className="relative min-w-[250px] max-w-[90%] mx-auto  my-10 shadow-black shadow-2xl">
              {/* ------ Content ------ */}
              <div className="border-0 rounded-lg shadow-2xl relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/* ------ Header ------ */}
                <div className="grid place-items-center place-content-end">
                  <button
                    className="bg-transparent border-0 text-black opacity-9 text-2xl font-normal outline-none focus:outline-none mx-3 my-2"
                    onClick={(e) => setPopup(!popup)}
                  >
                    ×
                  </button>
                </div>
                {/* ------ Body ------ */}
                <div className="relative grid place-items-center px-6 md:px-10 py-3 flex-auto">
                  <h3 className="text-black font-semibold text-base md:text-lg  leading-relaxed text-center">
                    Are You Sure ?
                  </h3>
                  <p className="text-black mt-5 font-medium text-xs md:text-sm  leading-normal text-center">
                    {popup.name === "signoutall"
                      ? "You want to Sign out From All Devices?"
                      : "You want to Delete Account? "}
                  </p>
                </div>

                {/* ------ Fotter ------ */}
                <div className="flex justify-center items-center m-5">
                  <button
                    className="bg-[#18b66c] text-white font-semibold uppercase text-sm px-6 py-3 rounded-lg shadow hover:bg-[#1a965c] hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 mx-2"
                    type="button"
                    onClick={(e) =>
                      popup.name === "signoutall"
                        ? signoutAll()
                        : deleteAccount()
                    }
                  >
                    Yes
                  </button>
                  <button
                    className="bg-[#d31e1e] text-white font-semibold uppercase text-sm px-6 py-3 rounded-lg shadow hover:bg-[#cc1616] hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 mx-2"
                    type="button"
                    onClick={(e) => setPopup(!popup)}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-20 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
};

export default AccountSetting;
