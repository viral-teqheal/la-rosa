import React from "react";
import calcu from "../../../assets/calcu.png";
import umbre from "../../../assets/umbre.png";
import doller from "../../../assets/doller.png";
import hammer from "../../../assets/hammer.png";
import bhouse from "../../../assets/bhouse.png";

const BenefitsCard = () => {
  const data = [
    {
      id: 1,
      img: calcu,
      head: "Explore home loans",
      pera: "Buying a house is one of the biggest dreams come true for most people and an extravagant affair altogether.",
    },
    {
      id: 2,
      img: umbre,
      head: "Insure your home",
      pera: "Buying a house is one of the biggest dreams come true for most people and an extravagant affair altogether.",
    },
    {
      id: 3,
      img: doller,
      head: "See what your home may be worth",
      pera: "Buying a house is one of the biggest dreams come true for most people and an extravagant affair altogether.",
    },
    {
      id: 4,
      img: hammer,
      head: "Explore home loans",
      pera: "Buying a house is one of the biggest dreams come true for most people and an extravagant affair altogether.",
    },
    {
      id: 5,
      img: bhouse,
      head: "Explore home loans",
      pera: "Buying a house is one of the biggest dreams come true for most people and an extravagant affair altogether.",
    },
  ];
  return (
    <>
      <div className="container mx-auto my-8 pt-12">
        <div className="pb-7">
          <h2 className="font-semibold xl:text-3xl lg:text-2xl md:text-xl text-lg  mb-2 text-[#262626]">Benefits of working</h2>
          <h2 className="font-semibold xl:text-3xl lg:text-2xl md:text-xl text-lg  mb-2 text-[#262626]">with us</h2>
        </div>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
          {data?.map((data, index) => (
            <div key={index} className="flex">
              <div className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-[6px_6px_10px_-5px_rgba(0,0,0,0.3)]">
                <div>
                  <img className=" 2xl:w-auto md:w-28 w-44 lg:mx-2 pr-3" src={data.img} alt="img" />
                </div>
                <div>
                  <h2 className="font-semibold lg:text-xl md:text-lg text-md">{data.head}</h2>
                  <p className="lg:text-sm text-xs py-2 text-[#737373]">{data.pera}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BenefitsCard;
