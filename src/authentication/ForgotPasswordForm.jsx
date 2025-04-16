import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Logo from "../assets/logo.png";
import useEncryption from "../useEncryption/useEncryption";
import axiosInstance from "../apiInstances/axiosInstance";

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const { decryptData } = useEncryption();

  const [fields, setFields] = useState({
    email: "",
  });

  const onChangeInput = (e) => {
    const value = e.target.value.replace(/^\s+|\s+$/gm, "");
    const name = e.target.name;

    setFields({
      ...fields,
      [name]: value,
    });
  };

  const onSendEmail = async (e) => {
    const encryptedData = JSON.stringify({
      email: fields?.email,
      role: "user",
    });
    await axiosInstance
      .post("forgotPassword", encryptedData)
      .then((res) => {
        if (res?.data?.status) {
          setFields({
            email: "",
          });
          toast.success(res?.data?.message);
          navigate("/log-in");
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        //console.log("err --->", err);
      });
  };

  const InputBox =
    "w-full md:w-[445px] text-xs md:text-sm rounded-lg shadow-[0_4px_4px_rgba(0,0,0,0.25)] my-3 md:my-5 py-5 px-8 outline-none";

  const OuterBox =
    "min-w-[40%] rounded-2xl shadow-[0_0_4px_rgba(0,0,0,0.25)] bg-white p-5";

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
                  navigate("/");
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
              {/* ---- Email input ---- */}

              <input
                type="email"
                className={`${InputBox}`}
                placeholder="Email"
                name="email"
                value={fields?.email}
                onChange={onChangeInput}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onSendEmail();
                  }
                }}
              />

              {/* ---- Log in ---- */}

              <div className="flex justify-end items-center">
                <button
                  className="text-xs md:text-sm text-gray-500 hover:text-gray-900 mx-3"
                  onClick={() => navigate("/log-in")}
                >
                  Log in
                </button>
              </div>

              {/* ---- Submit button ---- */}

              <div className="flex justify-center items-center">
                <button
                  className="my-5 py-3 px-8 rounded-lg bg-[#E5002A] hover:bg-[#E5002A] text-white text-sm md:text-base font-medium"
                  onClick={onSendEmail}
                >
                  Forgot Password
                </button>
              </div>
              <p
                className="text-xs md:text-sm text-gray-500 hover:text-gray-900 mx-3 text-center cursor-pointer"
                onClick={() => navigate("/")}
              >
                Back to the Home
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotPasswordForm;
