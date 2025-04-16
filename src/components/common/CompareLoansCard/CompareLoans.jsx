import React from "react";
import homeloan from "../../../assets/homeloan.png";
import logoSmall from "../../../assets/logoSmall.png";

const CompareLoans = () => {
  return (
    <>
      <div className="container mx-auto my-8 pt-12">
        <div className="container mx-auto grid lg:grid-cols-2 grid-cols-1 bg-white rounded-xl shadow-[6px_6px_10px_-5px_rgba(0,0,0,0.3)]">
          <div className=" p-2">
            <img src={homeloan} alt="img" />
          </div>
          <div className="grid place-content-center px-10 my-6 gap-6">


            <img
              src={logoSmall}
              alt="logo"
              className=" h-[30px] mt-1 sm:mt-0 sm:h-10 rounded-xl cursor-pointer"
            />
            <h1 className="font-semibold xl:text-3xl lg:text-2xl md:text-xl text-lg  mb-2 text-[#262626]">Explore your home loan options</h1>
            <p className="lg:text-base text-xs py-2 text-[#737373] pr-5">
              Buying a house is one of the biggest dreams come true for most
              people and an extravagant affair altogether. Imparting life to
              such a dream requires a lot of effort from the buyers’ end and the
              best one can do to accommodate the home in their budget is through
              a home loan.
            </p>
            <button className="text-center bg-[#E5002A] w-[165px] py-3 px-3 rounded-3xl text-white">Compare loans</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompareLoans;
