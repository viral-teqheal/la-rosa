import React, { useEffect } from "react";
import Layout1 from "../../Layouts/Layout1";
import Homebanner from "../common/Homebanner/Homebanner";
import Housecart from "../common/HouseCard/HouseCard";
import Developmentcart from "../common/Development/Developmentcart";
import BenefitsCard from "../common/BenefitCard/BenefitsCard";
import NewsCard from "../common/NewsCard/NewsCard";
import CompareLoans from "../common/CompareLoansCard/CompareLoans";
import FilterScreen from "../common/FilterScreen/FilterScreen";
import axiosInstanceAuth from "../../apiInstances/axiosInstanceAuth";
import { toast } from "react-toastify";

const MainDashBoard = ({ setSearch }) => {
  const GetSavedProperty = async (isActive) => {
    await axiosInstanceAuth
      .post("savedProperty", {
        status: isActive,
      })
      .then((res) => {
        const mydata = res?.data?.data;
        if (res?.data?.status) {
          console.log("m,ain details");
          const newArray = mydata.map((obj, i) => ({
            ...obj,
            _id: mydata?.[i]?._id,
            frontPageImg: mydata?.[i]?.frontPageImg,
            lead_agent: mydata?.[i]?.lead_agent,
            price: mydata?.[i]?.price,
            street_address_number: mydata?.[i]?.street_address_number,
            street_address_name: mydata?.[i]?.street_address_name,
            suburb: mydata?.[i]?.suburb,
            favourite: mydata?.[i]?.isFavorite,
            bedroomCount: mydata?.[i]?.bedroomCount,
            showerCount: mydata?.[i]?.showerCount,
            carCount: mydata?.[i]?.carCount,
          }));

          localStorage.setItem(
            "Saved",
            mydata.map((obj, i) => `${mydata?.[i]?._id}`)
          );
        } else {
          // localStorage.clear();
          // navigate(`/`);
          // toast.error("no data found!!");
          // //console.log("data not found!!!");
          //console.log("no data found!!");
        }
      })
      .catch((err) => {
        //console.log("err --->", err);
      });
  };

  useEffect(() => {
    const getToken = localStorage.getItem('Token');
    if (getToken != null) {
      GetSavedProperty();
    }
  }, []);
  return (
    <>

      <Homebanner />
      <div className="px-5 mb-10">
        <div className="container mx-auto">
          <FilterScreen setSearch={setSearch} />
          <Housecart />
          <Developmentcart />
          {/* <BenefitsCard /> */}
          {/* <NewsCard /> */}
          {/* <CompareLoans /> */}
        </div>
      </div>
    </>
  );
};

export default MainDashBoard;
