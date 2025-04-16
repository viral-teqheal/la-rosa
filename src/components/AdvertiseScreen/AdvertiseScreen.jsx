import React, { useEffect, useState } from "react";
import Layout2 from "../../Layouts/Layout2";
import PropertyShowcaseCard from "../common/PropertyShowcaseCard/PropertyShowcaseCard";
import PropertySoldCard from "../common/PropertySoldCard/PropertySoldCard";
import PropertyWorthCard from "../common/PropertyWorthCard/PropertyWorthCard";
import filter from "../../assets/filter.png";
import blackHeart from "../../assets/black-heart.png";
import property1 from "../../assets/property-1.png";
import property2 from "../../assets/property-2.png";
import agency1 from "../../assets/agency-1.png";
import agency2 from "../../assets/agency-2.png";
import agency3 from "../../assets/agency-3.png";
import agency4 from "../../assets/agency-4.png";
import agent1 from "../../assets/agent-1.png";
import agent2 from "../../assets/agent-2.png";
import UploadAdsCard from "../common/UploadAdsCard/UploadAdsCard";
import axiosInstanceAuth from "../../apiInstances/axiosInstanceAuth";
import { toast } from "react-toastify";
import axiosInstance from "../../apiInstances/axiosInstance";

const AdvertiseScreen = () => {
  const [SoldPropertyData, setSoldPropertyData] = useState([]);
  const [Filter, setFilter] = useState({
    search: "",
    category: "",
    status: "Sold",
    agent: "",
    sort_by: "",
  });

  useEffect(() => {
    GetAllListingData(Filter);
  }, []);

  const GetAllListingData = async (Filter) => {
    await axiosInstance
      .post("Agency/viewAllProperty", {
        search: Filter?.search,
        category: Filter?.category,
        status: Filter?.status,
        agent: Filter?.agent,
        sort_by: Filter?.sort_by,
      })
      .then((res) => {
        const mydata = res?.data?.data;
        if (res?.data?.status) {
          const newArray = mydata.map((obj, i) => ({
            ...obj,
            id: mydata?.[i]?.id,
            frontPageImg: mydata?.[i]?.frontPageImg,
            agencyImg: agency4,
            agentImg: agent2,
            lead_agent: mydata?.[i]?.lead_agent,
            price: mydata?.[i]?.price,
            street_address_number: mydata?.[i]?.street_address_number,
            street_address_name: mydata?.[i]?.street_address_name,
            favourite: false,
            bedroomCount: `${i + 3}`,
            showerCount: `${i + 4}`,
            carCount: mydata[i]?.carport_spaces,
            squareCount: "6,580 m2",
            appartmentCount: "",
            acreageCount: "Acreage",
            saleDate: `Sold on ${i + 10} Oct 2022`,
          }));

          let newResponse = newArray.map((x) => ({
            ...x,
            favourite: localStorage.getItem("Saved")?.split(",").includes(x.id),
          }));

          setSoldPropertyData(newResponse);
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        //console.log("err --->", err);
      });
  };

  return (
    <>
      <div className="px-5 pt-3">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-7 place-items-center xl:place-items-start gap-10">
            <div className="grid col-span-1 xl:col-span-5">
              {/* ---------- Start Short by & Save ---------- */}
              <div className="flex md:flex-row flex-col justify-between bg-white rounded-2xl shadow-sm hover:shadow-md p-5 mb-10">
                <div className="flex flex-col justify-start">
                  <div className="text-[#171717] font-semibold text-md lg:text-xl">
                    Sold  Real Estate & Property
                  </div>
                  <div className="text-[#737373] font-normal text-xs md:text-sm lg:text-base mt-1">
                    1-25 of 1291202 results
                  </div>
                </div>
                <div className="flex justify-start gap-2 mt-4 md:mt-0">
                  <div className="flex justify-center items-center border border-[#E5E5E5] rounded-[28px] px-4 md:px-7">
                    <img
                      src={filter}
                      alt=""
                      className="w-4 lg:w-6 mr-2 cursor-pointer"
                    />
                    <div className="text-[#737373] font-medium text-xs md:text-sm lg:text-base">
                      Short by
                    </div>
                  </div>
                  <div className="flex justify-center items-center border border-[#E5E5E5] rounded-[28px] py-3 px-4">
                    <img
                      src={blackHeart}
                      alt=""
                      className="w-4 lg:w-6 mr-2 cursor-pointer"
                    />
                    <div className="text-[#737373] font-medium text-xs md:text-sm lg:text-base">
                      Save search
                    </div>
                  </div>
                </div>
              </div>
              {/* ---------- End Short by & Save ---------- */}

              {/* <PropertySoldCard PropertyData={SoldPropertyData} />
              <UploadAdsCard style="py-12 xl:py-40 my-10" /> */}
              <PropertySoldCard
                PropertyData={SoldPropertyData}
                setPropertyData={setSoldPropertyData}
                style="mb-10"
              />
            </div>
            <div className="grid col-span-1 xl:col-span-2 place-content-start">
              <PropertyShowcaseCard />
              <PropertyWorthCard style="my-10" />
              <UploadAdsCard style="py-40 xl:py-80 mb-10" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvertiseScreen;
