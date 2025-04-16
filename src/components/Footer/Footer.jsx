import React, { useState } from "react";
import facebook from "../../assets/facebook.png";
import linkden from "../../assets/in.svg";
import printrest from "../../assets/printrest.svg";
import twter from "../../assets/twter.svg";
import youtube from "../../assets/youtube.svg";
import logoSmall from "../../assets/logo-new.png";
import { footerData } from "./FooterData";
import { Link } from "react-router-dom";

import {
  FaFacebook,
  FaLinkedin,
  FaPinterest,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import Contact from "../.././components/common/Contactus/Contactus";

export const Footer = () => {
  const sliderData = Object.keys(footerData);
  const [isActiveTab, setIsActiveTab] = useState(sliderData[0]);

  const icon = [
    {
      icons: FaFacebook,
      link: "https://www.facebook.com/myrealestate.ng.2023",
      iconsColor: "hover:text-blue-500",
    },
    // {
    //   icons: FaLinkedin,
    //   link: "https://in.linkedin.com/",
    //   iconsColor: "hover:text-[#0A66C2]",
    // },
    {
      icons: FaPinterest,
      link: "https://in.pinterest.com/myrealestateng/",
      iconsColor: "hover:text-[#E60023]",
    },
    {
      icons: FaTwitter,
      link: "https://twitter.com/myrealestateng",
      iconsColor: "hover:text-[#1d9bf0]",
    },
    {
      icons: FaYoutube,
      link: "https://www.youtube.com/",
      iconsColor: "hover:text-[#F00]",
    },
  ];
  const navi = [
    {
      id: 1,
      name: "Advertise with us",
      link: "/advertise",
    },
    {
      id: 2,
      name: "Contact us",
      link: "/contactus",
    },
    // {
    //   id: 3,
    //   name: "Agent admin",
    //   link: "https://agent.myrealestate-ng.com/",
    // },
    // {
    //   id: 4,
    //   name: "Media sales",
    //   link: "#",
    // },
    {
      id: 5,
      name: "Legal",
      link: "#",
    },
    {
      id: 6,
      name: "Privacy",
      link: "#",
    },
    {
      id: 7,
      name: "Site map",
      link: "#",
    },
    // {
    //   id: 8,
    //   name: "Careers",
    //   link: "#", 
    // },
  ];

  const ActiveTab =
    "bg-[#FFEAEF] border-b-[#E5002A] rounded-t-lg text-[#404040] font-semibold";

  const NormalTab =
    "w-full md:w-[26%]  grid place-items-center whitespace-nowrap  text-[#737373] font-medium text-sm md:text-sm  lg:text-base border border-b-2 border-transparent hover:border-b-[#E5002A] py-3 px-5 ease-in-out duration-700 cursor-pointer";

  return (
    <>
      <footer className="bg-white w-auto pt-4 mt-10">
        <div className="xl:px-48 px-5">
          {/* <div
            id="navigation"
            className="w-full grid place-items-start overflow-x-scroll rounded-xl scrollBarHidden"
          >
            <div className="w-full flex justify-start items-start border border-b-2 border-transparent border-b-[#E5E5E5]">
              {sliderData?.length > 0 &&
                sliderData?.map((e, index) => (
                  <div
                    key={index}
                    className={`${NormalTab} ${isActiveTab === e ? ActiveTab : ""
                      }`}
                    onClick={() => {
                      setIsActiveTab(e);
                    }}
                  >
                    {e}
                  </div>
                ))}
            </div>
          </div> */}
          <div className="py-5 xl:text-lg lg:text-base md:text-sm font-semibold text-[#404040]">
            Real estate in Nigeria
          </div>

          <div className="grid md:grid-cols-4 grid-cols-1 md:text-sm text-xs text-[#737373] ">
            <div>
              {footerData[isActiveTab].data1.map((e, index) => (
                <div key={index} className="py-1 hover:text-slate-700">
                  <Link to={e.propertyLink}>{e.propertyName}</Link>
                </div>
              ))}
            </div>

            <div>
              {footerData[isActiveTab].data2.map((e, inde) => (
                <div key={inde} className="py-1 hover:text-black">
                  <Link to={e.propertyLink}>{e.propertyName}</Link>
                </div>
              ))}
            </div>

            <div>
              {footerData[isActiveTab].data3.map((e, ind) => (
                <div key={ind} className="py-1 hover:text-slate-700">
                  <Link to={e.propertyLink}>{e.propertyName}</Link>
                </div>
              ))}
            </div>

            <div>
              <img
                src={logoSmall}
                alt="logo"
                className=" h-[30px] mt-1 sm:mt-0 sm:h-10 rounded-xl cursor-pointer"
              />
              <div className="my-3 lg:text-base md:text-sm font-semibold text-[#404040] mt-5">
                {/* argimb.com.ar */}
              </div>
              <p>
                Our platform simplifies the property search process, offering
                effortless access to a wealth of information on various real
                estate assets in Nigeria.
              </p>
              <div className="flex gap-3 mt-5 mb-14">
                {icon?.map((i, index) => (
                  <a href={i?.link} key={index} target="_blank">
                    <i.icons className={`text-3xl ${i.iconsColor}`} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="  border-t-2 border-gray-200 text-[#404040] ">
          <div className="flex flex-wrap md:justify-between py-4 md:px-0 px-5">
            <div className=" mx-auto xl:text-md md:text-sm text-xs">
              <a href="https://www.myrealestate-ng.com/">Copyright © 2024 myrealestate-ng.com</a>
            </div>
            <div className="grid place-content-end md:grid-cols-8 grid-cols-2 xl:pr-12 pr-0 gap-2 md:pt-0 pt-3  md:text-center">
              {navi?.map((data, index) => (
                <Link key={index} className="md:text-sm text-xs" to={data.link}>{data.name}</Link>
              ))}
              <div className="md:text-sm text-xs">
                <a href="https://agent.myrealestate-ng.com/">Agent admin</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

