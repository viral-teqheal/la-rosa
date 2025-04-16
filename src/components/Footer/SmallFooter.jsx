import React from "react";
import facebook from "../../assets/facebook.png";
import linkden from "../../assets/in.svg";
import printrest from "../../assets/printrest.svg";
import twter from "../../assets/twter.svg";
import youtube from "../../assets/youtube.svg";
import logoSmall from "../../assets/logo-new.png";

import "./Footer.css";

const SmallFooter = () => {
  const img = [facebook, linkden, printrest, twter, youtube]
  const navi = [
    {
      id: 1,
      name: "Advertise with us",
      link: "/advertise"
    },
    {
      id: 2,
      name: "Contact us",
      link: "#"
    },
    {
      id: 3,
      name: "Agent admin",
      link: "https://agent.myrealestate-ng.com/"
    },
    // {
    //   id: 4,
    //   name: "Media sales",
    //   link: "#"
    // },
    {
      id: 5,
      name: "Legal",
      link: "#"
    },
    {
      id: 6,
      name: "Privacy",
      link: "#"
    },
    {
      id: 7,
      name: "Site map",
      link: "#"
    },
    // {
    //   id: 8,
    //   name: "Careers",
    //   link: "#"
    // }
  ]

  return (
    <>
      <div className=" bg-white ">
        <div className="mx-auto p-5 ">
          <img
            src={logoSmall}
            alt="logo"
            className=" h-[30px] mt-1 sm:mt-0 sm:h-10 rounded-xl cursor-pointer mx-auto shadow-md"
          />
          <h2 className="lg:text-center my-4 font-bold xl:text-lg md:text-base text-sm">
            {/* realestate.com.au */}
          </h2>
          {/* <p className="lg:text-center text-start text-[#737373] xl:text-base md:text-sm text-xs">
            Lorem ipsum dolor amet, consectetur adipiscing elit. Eget nisl nunc
            quam ac
          </p>
          <p className="lg:text-center text-start text-[#737373] xl:text-base md:text-sm text-xs">
            {" "}
            sed turpis volutpat. Cursus sed massa non nisi, placerat.
          </p>  */}
          <p className="lg:text-center text-start text-[#737373] xl:text-base md:text-sm text-xs xl:px-96 lg:px-40 mt-5">
            Our platform simplifies the property search process, offering effortless access to a wealth of information on various real estate assets in Nigeria, including residences, homes, land parcels, retail spaces, office establishments, and an array of commercial properties.
          </p>
          {/* <p className="lg:text-center text-start text-[#737373] xl:text-base md:text-sm text-xs">
            {" "}
            sed turpis volutpat. Cursus sed massa non nisi, placerat.
          </p> */}

          <div className="flex gap-6 lg:justify-center py-4  ">
            {img?.map((e, ind) => (
              <div key={ind}>
                <img className="lg:w-8 w-6 cursor-pointer" src={e} alt="" />
              </div>
            ))}
          </div>
        </div>
        <div className="  border-t-2 border-gray-200  ">
          <div className="flex flex-wrap md:justify-between py-4 md:px-0 px-5 text-[#404040]">
            <div className="mx-auto md:text-sm text-xs">
              <a href="https://www.myrealestate-ng.com/">Copyright © 2024 myrealestate-ng</a>
            </div>
            <div className="grid md:grid-cols-8 grid-cols-2  xl:pr-12 pr-0 gap-2 md:pt-0 pt-3  md:text-center">
              {navi?.map((data, index) => (
                <a
                  key={index}
                  className="md:text-sm text-xs md:pr-0 pr-8"
                  href={data.link}
                >
                  {data.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SmallFooter;
