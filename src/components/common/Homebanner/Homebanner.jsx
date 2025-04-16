import React, { useEffect, useState } from "react";
import Design from "../../../assets/Homebanner.png";
import axiosInstance from "../../../apiInstances/axiosInstance";

const Homebanner = () => {
  const [count, setCount] = useState("");

  const dashbord = () => {
    axiosInstance
      .get(`/dashboard`)
      .then((res) => {
        setCount(res?.data?.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    dashbord();
  }, []);

  const data = [
    {
      id: 1,
      number: count?.allsold,
      title: "Number of Properties Sold",
    },
    {
      id: 2,
      number: count?.allsell,
      title: "Number of Properties For Sale",
    },
    {
      id: 3,
      number: count?.allagent,
      title: "number Of Agents",
    },
  ];
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 pt-3 md:pt-20 xl:pt-0">
        {/* left part */}
        <div className="my-auto px-5 2xl:px-60 xl:px-24 lg:px-8 mt-16 lg:my-auto">
          <div className="flex flex-wrap text-left ">
            <h2 className="font-semibold xl:text-3xl lg:text-2xl md:text-xl text-lg  mb-2 text-[#262626]">
              A new phase for Nigerian Real Estate
            </h2>
            <p className="lg:text-base text-sm text-[#737373]">
              Our platform simplifies the property search process, offering
              effortless access to a wealth of information on various real
              estate assets in Nigeria, including residences, homes, land
              parcels, retail spaces, office establishments, and an array of
              commercial properties.
            </p>
          </div>
          <div className="flex justify-between mt-10 gap-4">
            {data?.map((item, index) => (
              <div
                key={index}
              >
                <div className="xl:text-3xl lg:text-2xl md:text-xl text-lg font-bold">
                  <span>{item.number}<span className="text-red-600 ">+</span></span>
                </div>
                <p className="text-[#737373] lg:text-base text-sm">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* right part */}
        <div className="grid place-content-end">
          <img src={Design} alt="" className="" />
        </div>
      </div>
    </>
  );
};

export default Homebanner;
