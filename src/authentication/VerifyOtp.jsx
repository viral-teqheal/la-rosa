import OtpInput from "react-otp-input";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Logo from "../assets/logo.png";

import axiosInstance from "../apiInstances/axiosInstance";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [newEmail, setnewEmail] = useState();
  const getemail = localStorage.getItem("email");
  useEffect(() => {
    const checkAuth = localStorage.getItem("Token");

    const newEmail = localStorage.getItem("newEmail");
    setnewEmail(newEmail);
    if (checkAuth === undefined || checkAuth === null) {
    } else {
      // navigate("/");
    }
  }, []);

  const handleSubmit = async () => {
    if (newEmail) {
      const encryptedData = JSON.stringify({
        otp: otp,
        oldEmail: getemail,
        newEmail: newEmail
      });
      await axiosInstance
        .post("/verifyEmail", encryptedData)
        .then((res) => {
          if (res?.data?.status) {
            // localStorage.setItem("Token", res?.data?.data?.token);
            navigate("/log-in");
            toast.success(res?.data?.message);
            localStorage.clear("email");
          } else {
            toast.error(res?.data?.message);
          }
        })
        .catch((err) => {
          //console.log("err --->", err);
        });
    }
    else {
      const encryptedData = JSON.stringify({
        otp: otp,
        email: getemail,
      });
      await axiosInstance
        .post("/verifyOtp", encryptedData)
        .then((res) => {
          if (res?.data?.status) {
            // localStorage.setItem("Token", res?.data?.data?.token);
            navigate("/log-in");
            toast.success(res?.data?.message);
            localStorage.clear("email");
          } else {
            toast.error(res?.data?.message);
          }
        })
        .catch((err) => {
          //console.log("err --->", err);
        });
    }

  };

  const resendotp = async () => {
    await axiosInstance.post("/resendOtp", { email: getemail }).then((res) => {
      if (res?.data?.status) {
        toast.success(res?.data?.message);
      } else {
        toast.error(res?.data?.message);
      }
    });
  };

  const InputBox =
    "w-full md:w-[445px] text-xs md:text-sm rounded-lg shadow-[0_4px_4px_rgba(0,0,0,0.25)] my-3 md:my-5 py-5 px-8 outline-none";

  const OuterBox =
    "min-w-[30%] rounded-2xl shadow-[0_0_4px_rgba(0,0,0,0.25)] bg-white p-5";

  return (
    <>
      <section className="mx-auto px-5 h-screen">
        <div className="h-full grid place-items-center">
          <div
            className={`flex flex-col justify-center items-center text-gray-800 ${OuterBox}`}
          >
            <div className="max-w-xs">
              <img
                src={Logo}
                alt="logo"
                className="cursor-pointer"
                onClick={() => {
                  // navigate("/");
                }}
              />
              {/* <h1
                className="bg-[#FFCCD3] rounded-lg text-[#FF444D] font-extrabold text-2xl md:text-3xl px-5 py-2 my-5 cursor-pointer"
                onClick={() => {
                  navigate("/");
                }}
              >
                La Rosa
              </h1> */}
            </div>
            <div className="max-w-md">
              <div className="grid place-items-center">
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={4}
                  inputStyle="inputStyle"
                  containerStyle={"otp-container"}
                  className="flex  justify-center items-center"
                  // renderSeparator={<span className="px-6 py-3 mx-2 ring-1 bg-transparent">- </span>}
                  renderInput={(props) => (
                    <input
                      {...props}
                    // className=" px-6 py-3 mx-2 ring-1 bg-transparent "
                    />
                  )}
                />
              </div>
              {/* ---- Forgot Password ---- */}

              <div className="otp-container">
                <button
                  className="text-xs md:text-sm text-gray-500 hover:text-gray-900 ml-4 mt-2 "
                  onClick={() => resendotp()}
                >
                  Resend OTP
                </button>
              </div>
              {/* ---- Submit button ---- */}
              <div className="flex justify-center items-center ">
                <button
                  className="my-5 py-3 px-8 rounded-lg bg-[#E5002A] hover:bg-[#E5002A] text-white text-sm md:text-base font-medium"
                  onClick={handleSubmit}
                >
                  Verify OTP
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VerifyOtp;
//
//
// ;
