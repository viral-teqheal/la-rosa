// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import Logo from "../assets/logo.png";
// import useEncryption from "../useEncryption/useEncryption";
// import axiosInstance from "../apiInstances/axiosInstance";

// const LogInForm = () => {
//   const navigate = useNavigate();
//   const { decryptData } = useEncryption();

//   useEffect(() => {
//     const checkAuth = localStorage.getItem("Token");

//     if (checkAuth === undefined || checkAuth === null) {
//     } else {
//       navigate("/");
//     }
//   }, []);

//   const [fields, setFields] = useState({
//     email: "",
//     password: "",
//   });

//   const onChangeInput = (e) => {
//     const value = e.target.value.replace(/^\s+|\s+$/gm, "");
//     const name = e.target.name;

//     setFields({
//       ...fields,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async () => {
//     const encryptedData = JSON.stringify({
//       email: fields?.email,
//       password: fields?.password,
//       role: "user",
//     });
//     await axiosInstance
//       .post("signin", encryptedData)
//       .then((res) => {
//         if (res?.data?.status) {
//           localStorage.setItem("Token", res?.data?.data?.token);
//           navigate("/dashbord");
//           toast.success(res?.data?.message);
//         } else {
//           if (res?.status === true) {
//             navigate("/VerifyOtp");
//           }
//           toast.error(res?.data?.message);
//         }
//       })
//       .catch((err) => {
//         //console.log("err --->", err);
//       });
//   };

//   const InputBox =
//     "w-full md:w-[445px] text-xs md:text-sm rounded-lg shadow-[0_4px_4px_rgba(0,0,0,0.25)] my-3 md:my-5 py-5 px-8 outline-none";

//   const OuterBox =
//     "min-w-[40%] rounded-2xl shadow-[0_0_4px_rgba(0,0,0,0.25)] bg-white p-5";

//   return (
//     <>
//       <section className="mx-auto px-5 h-screen">
//         <div className="h-full grid place-items-center">
//           <div
//             className={`flex flex-col justify-center items-center text-gray-800 ${OuterBox}`}
//           >
//             <div className="max-w-xs">
//               <img
//                 src={Logo}
//                 alt="logo"
//                 className="cursor-pointer"
//                 onClick={() => {
//                   navigate("/");
//                 }}
//               />
//               {/* <h1
//                 className="bg-[#FFCCD3] rounded-lg text-[#FF444D] font-extrabold text-2xl md:text-3xl px-5 py-2 my-5 cursor-pointer"
//                 onClick={() => {
//                   navigate("/");
//                 }}
//               >
//                 La Rosa
//               </h1> */}
//             </div>
//             <div className="max-w-md">
//               {/* ---- Email input ---- */}

//               <input
//                 type="email"
//                 className={`${InputBox}`}
//                 placeholder="Email"
//                 name="email"
//                 value={fields?.email}
//                 onChange={onChangeInput}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter") {
//                     handleSubmit();
//                   }
//                 }}
//               />

//               {/* ---- Password input ---- */}

//               <input
//                 type="password"
//                 className={`${InputBox}`}
//                 placeholder="Password"
//                 name="password"
//                 value={fields?.password}
//                 onChange={onChangeInput}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter") {
//                     handleSubmit();
//                   }
//                 }}
//               />

//               {/* ---- Forgot Password ---- */}

//               <div className="flex justify-end items-center">
//                 <button
//                   className="text-xs md:text-sm text-gray-500 hover:text-gray-900 mx-3"
//                   onClick={() => navigate("/auth/forgot-password")}
//                 >
//                   Forgot Password
//                 </button>
//               </div>

//               {/* ---- Submit button ---- */}

//               <div className="flex justify-center items-center">
//                 <button
//                   className="my-5 py-3 px-8 rounded-lg bg-[#E5002A] hover:bg-[#E5002A] text-white text-sm md:text-base font-medium"
//                   onClick={handleSubmit}
//                 >
//                   Log in
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default LogInForm;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Logo from "../assets/logo.png";
import Google from "../assets/google.png";
import Facebook from "../assets/fac.png";
import useEncryption from "../useEncryption/useEncryption";
import axiosInstance from "../apiInstances/axiosInstance";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { MdOutlineMail } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaApple } from "react-icons/fa";
import { SiFacebook } from "react-icons/si";
import axios from "axios";
import FacebookLogin from "react-facebook-login";
const LogInForm = () => {
  const navigate = useNavigate();
  const { decryptData } = useEncryption();
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const [fblogin, setFbLogin] = useState(false);
  const [passHide, setPassHide] = useState(false);
  useEffect(() => {
    const checkAuth = localStorage.getItem("Token");
    if (checkAuth === undefined || checkAuth === null) {
    } else {
      navigate("/");
    }
  }, []);

  const [fields, setFields] = useState({
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const value = e.target.value.replace(/^\s+|\s+$/gm, "");
    const name = e.target.name;

    setFields({
      ...fields,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const encryptedData = JSON.stringify({
      email: fields?.email,
      password: fields?.password,
      role: "user",
    });
    await axiosInstance
      .post("signin", encryptedData)
      .then(async (res) => {
        if (res?.data?.status) {
          localStorage.setItem("Token", res?.data?.data?.token);
          localStorage.setItem("email", res?.data?.data?.userData?.email);

          navigate("/dashbord");
          toast.success(res?.data?.message);
        } else {
          if (res?.status === true) {
            navigate("/VerifyOtp");
          }
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        //console.log("err --->", err);
      });
  };

  // google login

  const GoogleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  async function loginWithGoogle(data) {
    data = {
      firstname: data?.family_name,
      lastname: data?.given_name,
      email: data?.email,
      role: "user",
    };
    await axiosInstance
      .post("login-with-google", data)
      .then((res) => {
        localStorage.setItem("Token", res?.data?.data?.token);
        localStorage.setItem("email", data?.email);
        setProfile(data);
        toast.success("login success");
        navigate("/dashbord");
      })
      .catch((error) => {
        //console.log(error);
      });
  }

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then(async (res) => {
          if (res.status == 200) {
            loginWithGoogle(res?.data);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const InputBox =
    "w-full md:w-[445px] text-xs md:text-sm rounded-lg border-[1px] border-[#949198] my-3 md:my-3 py-4 px-10 outline-none";

  const OuterBox =
    "min-w-[40%] rounded-2xl shadow-[0_0_4px_rgba(0,0,0,0.25)] bg-white py-10";

  // const responseFacebook = async (data) => {
  //   //console.log("🚀 ~ responseFacebook ~ data:", data)
  //   if (data.accessToken) {
  //     data = {
  //       facebookUserId: data?.id,
  //       firstname: data?.name,
  //       email: data?.email || "",
  //       role: "user",
  //     };
  //     await axiosInstance
  //       .post("login-with-facebook", data)
  //       .then((res) => {
  //         //console.log("🚀 ~ .then ~ res:", res);
  //         localStorage.setItem("Token", res?.data?.data?.token);
  //         localStorage.setItem("email", data?.email);
  //         localStorage.setItem("fullname", data?.firstname);
  //         setProfile(data);
  //         toast.success("login success");
  //         navigate("/dashbord");
  //       })
  //       .catch((error) => {
  //         //console.log(error);
  //       });
  //   }
  //   setFbLogin(!fblogin);
  // };


  return (
    <>
      <section className="mx-auto px-5 h-screen">
        <div className="h-full grid place-items-center">
          <div
            className={`flex flex-col justify-center items-center text-gray-800 ${OuterBox}`}
          >
            <div className="m-5">
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
                  <MdOutlineMail className="text-[22px] text-[#6c6b71] absolute top-[26px] md:top-[30px] left-[10px]" />
                </div>

                {/* ---- Password input ---- */}
                <div className="relative">
                  <input
                    type={!passHide ? "password" : "text"}
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
                  <RiLockPasswordLine className="text-[22px] text-[#6c6b71] absolute top-[26px] md:top-[30px] left-[10px]" />
                  {passHide ? (
                    <IoEyeOutline
                      onClick={() => setPassHide(false)}
                      className="text-[22px] text-[#6c6b71] absolute top-[26px] md:top-[30px] right-[15px] cursor-pointer"
                    />
                  ) : (
                    <FaRegEyeSlash
                      onClick={() => setPassHide(true)}
                      className="text-[22px] text-[#6c6b71] absolute top-[26px] md:top-[30px] right-[15px] cursor-pointer"
                    />
                  )}
                </div>

                {/* ---- Submit button ---- */}

                <div className="flex justify-center items-center">
                  <button
                    className="mt-5 py-3 px-8 rounded-lg bg-[#E5002A] hover:bg-[#E5002A] text-white text-sm md:text-base font-medium w-full"
                    onClick={handleSubmit}
                  >
                    Sign in
                  </button>
                </div>

                {/* ---- Forgot Password ---- */}

                <div className="flex justify-center items-center my-5">
                  <button
                    className="text-xs md:text-[17px] text-[#00649c] font-[600] mx-3"
                    onClick={() => navigate("/auth/forgot-password")}
                  >
                    Forgot your Password?
                  </button>
                </div>

                {/* ------------------------ or ------------------------- */}
                <div className="flex justify-center items-center my-5">
                  <div className="w-full h-[1px] my-7 bg-[#c7c7c9]" />
                  <p className="font-[600] text-[20px] mx-5">OR</p>
                  <div className="w-full h-[1px] my-7 bg-[#c7c7c9]" />
                </div>

                {/* ---- Google button ---- */}

                <div className="flex flex-col  gap-5 ">
                  <div className="flex justify-center items-center border-[1px] border-[#949198]  rounded-lg ">
                    <img src={Google} alt="google" className="pl-5 w-[50px]" />
                    <button
                      className="py-4 px-8  text-black text-sm md:text-base font-[600] w-full"
                      onClick={GoogleLogin}
                    >
                      Continue with Google
                    </button>
                  </div>

                  {/* <div className="flex justify-center items-center bg-[#1977f3] border-[1px] border-[#949198] rounded-lg pl-5">
                    <SiFacebook className="text-white text-[35px]" />
                    <button
                      className="py-4 px-5 text-white  text-sm md:text-base font-[500] w-full"
                      onClick={() => setFbLogin(!fblogin)}
                    >
                      Continue with Facebook
                    </button>
                  </div> */}

                  {/* <div className="flex justify-center items-center border-[1px] bg-black border-[#949198]  rounded-lg pl-5">
                    <FaApple className="text-white text-[35px]" />
                    <button
                      className="py-4 px-8  text-white text-sm md:text-base font-[500] w-full"
                      // onClick={handleSubmit}
                    >
                      Continue with Apple
                    </button>
                  </div> */}
                  <div className="flex justify-center flex-col items-center mt-4">
                    <div className="flex justify-center items-center">
                      <button
                        className="text-xs md:text-[17px] text-[#4e4d5a] font-[600]"
                        onClick={() => navigate("/sign-up")}
                      >
                        Not signed in?
                      </button>
                      <button
                        className="text-xs md:text-[17px] text-[#00649c] font-[600] mx-3"
                        onClick={() => navigate("/sign-up")}
                      >
                        Create an account.
                      </button>
                    </div>
                    <p
                      className="cursor-pointer mt-5"
                      onClick={() => navigate("/")}
                    >
                      Back to the Home
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-[1px] mb-8 bg-[#c7c7c9]" />
            <p className="text-[15px]">
              Personal Information Collection Statement.
            </p>
          </div>
        </div>
        {/* {fblogin && (
          <FacebookLogin
            appId="1371988126843135"
            autoLoad={true}
            fields="name,email,picture"
            callback={responseFacebook}
            cssClass="hidden"
          />
        )} */}
      </section>
    </>
  );
};

export default LogInForm;
