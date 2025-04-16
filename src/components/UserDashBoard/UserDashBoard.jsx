import React, { useState } from "react";
import Layout2 from "../../Layouts/Layout2";
import { useNavigate } from "react-router-dom";
import axiosInstanceAuth from "../../apiInstances/axiosInstanceAuth";
import saved from "../../assets/My saved properties.png";
import settings from "../../assets/Account settings.png";
import advertise from "../../assets/Uses for advertise.png";
import { toast } from "react-toastify";

const UserDashBoard = () => {
  const navigate = useNavigate();
  const [DeletePopUp, setDeletePopUp] = useState(false);

  const OpenPopUp = () => {
    setDeletePopUp(true);
  };

  const ClosePopUp = () => {
    setDeletePopUp(false);
  };

  const ConfirmDelete = async () => {
    localStorage.clear();
    navigate("/");
    toast.success("Logout succesfully");
    // await axiosInstanceAuth
    //   .post(`logout`)
    //   .then((res) => {
    //     if (res?.data?.status) {
    //       toast.success(res?.data?.message);
    //       localStorage.clear();
    //       navigate("/");
    //     } else {
    //       toast.error(res?.data?.message);
    //     }
    //   })
    //   .catch((err) => {
    //     //console.log("err --->", err);
    //   });
  };

  const UserDashboardCard = [
    {
      id: 1,
      icon: saved,
      title: "My saved properties",
      description: "View open times and auctions for properties you’ve saved.",
      link: "/my-saved-property",
    },
    {
      id: 2,
      icon: settings,
      title: "Account settings",
      description:
        "Manage your password, email subscriptions and privacy settings.",
      link: "/account-settings",
    },
    // {
    //   id: 3,
    //   icon: advertise,
    //   title: "Uses for advertise",
    //   description:
    //     "Advertising product or service in the drawing it attention from consumers.",
    //   link: "/uses-for-advertise",
    // },
    {
      id: 3,
      icon: advertise,
      title: "Saved searches and alerts",
      description: "View your saved searches and configure their alerts.",
      link: "/SaveSearch",
    },
  ];

  return (
    <>
      <div className="px-5 pt-3">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="text-black font-semibold text-xl md:text-3xl">
              My Account
            </div>
            <button
              className="py-2 px-4 md:px-5 text-sm md:text-lg rounded-3xl border bg-[#E5002A] text-white hover:bg-white  hover:text-[#E5002A] hover:border-[#E5002A] font-normal"
              onClick={() => {
                OpenPopUp();
              }}
            >
              Log Out
            </button>
          </div>

          {/* <<----- Dashboard Cards ----->> */}

          <div className="grid place-items-center grid-cols-1 md:grid-cols-3 gap-5 my-12">
            {UserDashboardCard?.length > 0 &&
              UserDashboardCard?.map((i, index) => (
                <div
                  key={index}
                  className="w-full h-full flex flex-col justify-center items-center bg-white rounded-2xl py-7 md:py-10 shadow-md hover:shadow-lg cursor-pointer"
                  onClick={() => navigate(`${i?.link}`)}
                >
                  <div className="bg-[#FFEAEF] rounded-full p-8">
                    <img src={i?.icon} alt="icon" />
                  </div>
                  <p className="font-semibold text-center text-lg md:text-xl mx-5 mt-5 md:mt-9">
                    {i?.title}
                  </p>
                  <p className="font-normal text-center text-sm md:text-lg mx-5 mt-3">
                    {i?.description}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* <<----- Change Status Pop Up ----->> */}
      {DeletePopUp ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[999999]  outline-none focus:outline-none border ">
            <div className="relative min-w-[285px] md:min-w-[350px] max-w-[90%] mx-auto  my-10 shadow-black shadow-2xl">
              {/* ------ Content ------ */}
              <div className="border-0 rounded-lg shadow-2xl relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/* ------ Header ------ */}
                <div className="grid place-items-center place-content-end">
                  <button
                    className="bg-transparent border-0 text-black opacity-9 text-2xl font-normal outline-none focus:outline-none mx-3 my-2"
                    onClick={(e) => ClosePopUp()}
                  >
                    ×
                  </button>
                </div>
                {/* ------ Body ------ */}
                <div className="relative grid place-items-center px-6 md:px-10 py-4 flex-auto">
                  <h3 className="text-black font-semibold text-lg md:text-xl  leading-relaxed text-center mt-2">
                    Are You Sure ?
                  </h3>
                  <p className="text-black font-medium text-sm md:text-base leading-normal text-center mt-3">
                    You want to Log Out
                  </p>
                </div>

                {/* ------ Fotter ------ */}
                <div className="flex justify-center items-center m-5">
                  <button
                    className="bg-[#009600] text-white font-semibold uppercase text-sm px-6 py-3 rounded-lg shadow hover:bg-[#008500] hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 mx-2"
                    type="button"
                    onClick={(e) => ConfirmDelete()}
                  >
                    Yes
                  </button>
                  <button
                    className="bg-[#E5002A] text-white font-semibold uppercase text-sm px-6 py-3 rounded-lg shadow hover:bg-[#D80022] hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 mx-2"
                    type="button"
                    onClick={(e) => ClosePopUp()}
                  >
                    No
                  </button>
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

export default UserDashBoard;
