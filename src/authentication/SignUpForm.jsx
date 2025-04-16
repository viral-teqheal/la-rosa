import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Logo from "../assets/logo.png";
import useEncryption from "../useEncryption/useEncryption";
import axiosInstance from "../apiInstances/axiosInstance";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";

const SignUpForm = () => {
  const navigate = useNavigate();
  const { decryptData } = useEncryption();

  useEffect(() => {
    const checkAuth = localStorage.getItem("Token");

    if (checkAuth === undefined || checkAuth === null) {
    } else {
      navigate("/");
    }
  }, []);
  const [isLoading, setIsLoading] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passHide, setPassHide] = useState({
    password: false,
    confirmPassword: false,
  });
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });
  localStorage.setItem("email", fields.email);
  const onChangeInput = (e) => {
    const value = e.target.value.replace(/^\s+|\s+$/gm, "");
    const name = e.target.name;

    setFields({
      ...fields,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (fields?.email == "") {
      return toast.error("email is required!!");
    }
    if (confirmPassword !== fields?.password) {
      return toast.error("password and confirm password do not match!");
    }
    const encryptedData = JSON.stringify({
      email: fields?.email,
      password: fields?.password,
      role: "user",
    });
    setIsLoading(true);
    await axiosInstance
      .post("signup", encryptedData)
      .then((res) => {
        if (res?.data?.status) {
          navigate("/VerifyOtp");
          toast.success(res?.data?.message);
          setIsLoading(false);
        } else if (res?.data?.page === "verifyOtp") {
          setIsLoading(false);
          navigate("/VerifyOtp");
        } else {
          setIsLoading(false);
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        //console.log("err --->", err);
      });
  };

  const InputBox =
    "w-full md:w-[445px] text-xs md:text-sm rounded-lg shadow-[0_4px_4px_rgba(0,0,0,0.25)] my-3 md:my-5 py-5 px-10 outline-none";

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

              {/* <input
                type="email"
                className={`${InputBox}`}
                placeholder="Email"
                name="email"
                value={fields?.email}
                onChange={onChangeInput}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
              /> */}
              <div className="relative">
                <input
                  type="email"
                  className={`${InputBox} `}
                  placeholder="Email"
                  name="email"
                  value={fields?.email}
                  onChange={onChangeInput}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSubmit();
                    }
                  }}
                />
                <MdOutlineMail className="text-[22px] text-[#6c6b71] absolute top-[30px] md:top-[38px]  left-[10px]" />
              </div>

              {/* ---- Password input ---- */}

              {/* <input
                type="password"
                className={`${InputBox}`}
                placeholder="Password"
                name="password"
                value={fields?.password}
                onChange={onChangeInput}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
              /> */}
              <div className="relative">
                <input
                  type={!passHide?.password ? "password" : "text"}
                  className={`${InputBox}`}
                  placeholder="Password"
                  name="password"
                  value={fields?.password}
                  onChange={onChangeInput}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSubmit();
                    }
                  }}
                />
                <RiLockPasswordLine className="text-[22px] text-[#6c6b71] absolute top-[30px] md:top-[38px] left-[10px]" />
                {passHide?.password ? (
                  <IoEyeOutline
                    onClick={() =>
                      setPassHide({ ...passHide, password: false })
                    }
                    className="text-[22px] text-[#6c6b71] absolute top-[30px] md:top-[38px] right-[15px] cursor-pointer"
                  />
                ) : (
                  <FaRegEyeSlash
                    onClick={() => setPassHide({ ...passHide, password: true })}
                    className="text-[22px] text-[#6c6b71] absolute top-[30px] md:top-[38px] right-[15px] cursor-pointer"
                  />
                )}
              </div>
              {/* <input
                type="password"
                className={`${InputBox}`}
                placeholder="Confirm Password"
                name="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
              /> */}
              <div className="relative">
                <input
                  type={!passHide?.confirmPassword ? "password" : "text"}
                  className={`${InputBox}`}
                  placeholder="Confirm Password"
                  name="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSubmit();
                    }
                  }}
                />
                <RiLockPasswordLine className="text-[22px] text-[#6c6b71] absolute top-[30px] md:top-[38px] left-[10px]" />
                {passHide?.confirmPassword ? (
                  <IoEyeOutline
                    onClick={() =>
                      setPassHide({ ...passHide, confirmPassword: false })
                    }
                    className="text-[22px] text-[#6c6b71] absolute top-[30px] md:top-[38px] right-[15px] cursor-pointer"
                  />
                ) : (
                  <FaRegEyeSlash
                    onClick={() =>
                      setPassHide({ ...passHide, confirmPassword: true })
                    }
                    className="text-[22px] text-[#6c6b71] absolute top-[30px] md:top-[38px] right-[15px] cursor-pointer"
                  />
                )}
              </div>
              {/* ---- Forgot Password ---- */}

              <div className="flex justify-end items-center">
                <button
                  className="text-xs md:text-sm text-gray-500 hover:text-gray-900 mx-3"
                  onClick={() => navigate("/log-in")}
                >
                  Sign In
                </button>
              </div>

              {/* ---- Submit button ---- */}

              <div className="flex justify-center items-center">
                <button
                  className="my-5 py-3 px-5 rounded-lg bg-[#E5002A] hover:bg-[#E5002A] text-white text-sm md:text-base font-medium"
                  onClick={handleSubmit}
                >
                  <div className="flex justify-center items-center gap-2">
                    {isLoading ? <span className="btn-loader"></span> : ""}
                    <span>Sign Up</span>
                  </div>
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

export default SignUpForm;
