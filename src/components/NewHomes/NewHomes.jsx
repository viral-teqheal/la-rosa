import React, { useEffect, useState } from "react";
import Savepropertypopup from "../savepropertypopup/savepropertypopup";
import PropertyShowcaseCard from "../common/PropertyShowcaseCard/PropertyShowcaseCard";
import PropertyWorthCard from "../common/PropertyWorthCard/PropertyWorthCard";
import PropertySoldCard from "../common/PropertySoldCard/PropertySoldCard";
import Loder from "../common/Loder";
import Layout1 from "../../Layouts/Layout1";
import { toast } from "react-toastify";
import axiosInstanceAuth from "../../apiInstances/axiosInstanceAuth";
import axiosInstance from "../../apiInstances/axiosInstance";
import { useNavigate, useSearchParams } from "react-router-dom";
import heart from "../../assets/heart_icon.png";
import agency4 from "../../assets/agency-4.png";
import agent2 from "../../assets/agent-2.png";
import NewHomesFilter from "./NewHomesFilter";
import VerticalAds from "../Adds/VerticalAds";

const NewHomes = () => {
  const onClose = () => setSavepropertypopup(false);
  const navigate = useNavigate();
  const [AuthPopUp, setAuthPopUp] = useState(false);
  const [savepropertypopup, setSavepropertypopup] = useState(false);
  const [Searchindata, setSearchindata] = useState([]);
  const [BuyPropertyData, setBuyPropertyData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isAuthanticate = localStorage.getItem("Token");
  const TabData = ["New Apartments", "House & Land"];
  const Filterable = ["New Apartments", "House & Land"];
  const [isActiveTab, setIsActiveTab] = useState(TabData[0])
  const [Filter, setFilter] = useState({
    search: "",
    category: "",
    status: "new",
    property_type: "Apartment",
    agent: "",
    sort_by: "",
    serachbyaddress: "",
  });

  const allpropertyid =
    BuyPropertyData.length > 0 &&
    BuyPropertyData.map((data) => {
      if (data?._id) {
        return data?.id;
      }
      return data.id;
    });

  const onChangeFilter = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  let [data] = useSearchParams();
  const encryptedData = data.get("encryptedData");
  //console.log("🚀 ~ BuyProperty ~ encryptedData:-------------", encryptedData)

  const [ads, setAds] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { longitude, latitude } = pos.coords;
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      axiosInstance(url)
        .then((data) => {
          const state = data.data.address.state.split(' ')[0]
          getAdsList(state)
        })
        .catch((err) =>
          console.log("err", err))
    })
  }, [])

  const getAdsList = (state) => {
    axiosInstance.get(`/advertise/ads/list?address=${state}`)
      .then((res) => {
        const result = res.data.data;
        setAds(result)
      })
      .catch((error) => console.log("err --->", error))
  }

  useEffect(() => {
    GetSavedProperty("");
    if (encryptedData) {
      search();
    } else {
      // GetAllListingData(Filter);
    }
  }, [encryptedData]);

  const GetAllListingData = async (Filter) => {
    setIsLoading(true);
    await axiosInstance
      .post("Agency/viewAllProperty", {
        status: Filter?.status,
        property_type: Filter?.property_type,
      })
      .then((res) => {
        const myData = res?.data?.data;
        if (res?.data?.status) {
          const newArray = myData.map((obj, i) => ({
            ...obj,
            id: myData?.[i]?.id,
            frontPageImg: myData?.[i]?.frontPageImg,
            agencyImg: agency4,
            agentImg: agent2,
            lead_agent: myData?.[i]?.lead_agent,
            price: myData?.[i]?.price,
            price_display_checked: myData?.[i]?.price_display_checked,
            price_display: myData?.[i]?.price_display,
            street_address_number: myData?.[i]?.street_address_number,
            street_address_name: myData?.[i]?.street_address_name,
            favorite: false,
            bedroomCount: myData[i]?.Bedrooms,
            showerCount: myData[i]?.Bathrooms,
            carCount: myData[i]?.carport_spaces,
            squareCount: "6,580 m2",
            apartmentCount: "",
            acreageCount: myData[i]?.property_type,
          }));

          let newResponse = newArray.map((x) => ({
            ...x,
            favorite: localStorage.getItem("Saved")?.split(",").includes(x.id),
          }));
          setIsLoading(false);
          setBuyPropertyData(newResponse);
          setSearchindata(newResponse);
        } else {
          toast.error(res?.data?.message);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const search = () => {
    axiosInstance
      .post("/searchProperty", encryptedData)
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
            favorite: false,
            bedroomCount: mydata[i]?.Bedrooms,
            showerCount: mydata[i]?.Bathrooms,
            carCount: mydata[i]?.carport_spaces,
            squareCount: "6,580 m2",
            apartmentCount: "",
            acreageCount: mydata[i]?.property_type,
            // saleDate: `Sold on ${i + 10} Oct 2022`,
          }));
          // setBuyPropertyData(newArray);

          let newResponse = newArray.map((x) => ({
            ...x,
            favorite: localStorage.getItem("Saved")?.split(",").includes(x.id),
          }));

          setBuyPropertyData(newResponse);
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        console.log("err --->", err);
      });
  };

  const GetSavedProperty = async (isActive) => {
    await axiosInstanceAuth
      .post(`savedProperty`, {
        status: isActive,
      })
      .then((res) => {
        const mydata = res?.data?.data;

        if (res?.data?.status) {
          localStorage.setItem(
            "Saved",
            mydata.map((obj, i) => `${mydata?.[i]?._id}`)
          );
        } else {
        }
      })
      .catch((err) => {
        console.log("err --->", err);
      });
  };

  const customsort = (value) => {
    if (value === "DE") {
      const nextinspection = Searchindata.filter(
        (data) => new Date() < new Date(data.inpection_time)
      );
      if (nextinspection != "") {
        setBuyPropertyData(nextinspection);
      } else {
        alert("inpection is blank");
      }
    } else {
      value === "priceDescending" || value === "priceAsending"
        ? value === "priceDescending"
          ? setBuyPropertyData((prevData) =>
            [...prevData].sort((a, b) => b.price - a.price)
          )
          : setBuyPropertyData((prevData) =>
            [...prevData].sort((a, b) => a.price - b.price)
          )
        : value === "dateDescending"
          ? setBuyPropertyData((prevData) =>
            [...prevData].sort(
              (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
            )
          )
          : setBuyPropertyData((prevData) =>
            [...prevData].sort(
              (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt)
            )
          );
    }
  };

  useEffect(() => {
    customsort(Filter?.sort_by);
  }, [Filter?.sort_by]);

  const activeTab = (tab) => {
    setIsActiveTab(tab);
    const newFilter = { ...Filter, property_type: tab === 'House & Land' ? 'House&Land' : 'Apartment' };
    setFilter(newFilter);
  };

  useEffect(() => {
    GetAllListingData(Filter)
    setBuyPropertyData([])
  }, [isActiveTab])

  return (
    <Layout1>
      <div className="px-5 pt-3">
        <div className="xl:px-60 lg:px-44 2xl:px-80 mt-16 lg:mt-0">
          {/* ---------- Start Filter & Search ---------- */}
          <NewHomesFilter
            TabData={TabData}
            propertyLength={BuyPropertyData.length}
            Filterable={Filterable}
            activeTab={activeTab}
            Searchindata={Searchindata}
          />
          {/* ---------- End Filter & Search ---------- */}

          <div className="w-full grid grid-cols-1 2xl:grid-cols-12 place-items-center 2xl:place-items-start xl:place-items-center 2xl:gap-5 gap-10">
            <div className="w-full grid col-span-1 2xl:col-span-8">
              {/* ---------- Start Sort by & Save ---------- */}
              <div className="mt-2 flex md:flex-row flex-col  items-center justify-between bg-white rounded-2xl shadow-sm hover:shadow-md p-5 mb-10 ">
                <div className="flex flex-col justify-start gap-2">
                  <div className="text-[#171717] font-semibold text-md lg:text-xl">
                    {`Discover ${isActiveTab}`}
                  </div>
                  <div className="text-[#737373] font-normal text-xs md:text-sm lg:text-base mt-1">
                    1-{BuyPropertyData?.length} of {BuyPropertyData?.length} results
                  </div>
                </div>
                <div className="flex flex-col md:flex-row justify-start gap-2 mt-4 md:mt-0 lg:flex xl:flex">
                  <div className="flex justify-center items-center border border-[#E5E5E5] rounded-[28px] px-2 md:px-auto cursor-pointer overflow-hidden">
                    <select
                      className="round text-[#737373] font-medium text-xs md:text-sm lg:text-base focus-visible:outline-none focus:outline-none"
                      name="sort_by"
                      onChange={(e) => {
                        onChangeFilter(e);
                      }}
                    >
                      <option className="pt-8">Featured</option>
                      <option value="dateDescending">Date (Newest-Oldest)</option>
                      <option value="dateAsending">Date (Oldest-Newest)</option>
                      <option value="priceAsending">Price (Lowest-Highest)</option>
                      <option value="priceDescending">Price (Highest-Lowest)</option>
                      <option value="DE">Next inspection</option>
                    </select>
                  </div>
                  <div className="flex justify-center items-center border border-[#E5E5E5] rounded-[28px] py-3 px-4">
                    <img
                      src={heart}
                      alt=""
                      className="w-4 lg:w-6 mr-2 cursor-pointer"
                      onClick={() => {
                        if (!isAuthanticate) {
                          setAuthPopUp(true);
                        } else {
                          setSavepropertypopup(true);
                        }
                      }}
                    />
                    <div className="text-[#737373] font-medium text-xs md:text-sm lg:text-base">
                      Save search
                    </div>
                  </div>
                </div>
              </div>
              {/* ---------- End Sort by & Save ---------- */}

              {isLoading ? (
                <div className="w-full h-[55vh] grid place-content-center">
                  <Loder />
                </div>
              ) : (
                <PropertySoldCard
                  PropertyData={BuyPropertyData}
                  setPropertyData={setBuyPropertyData}
                  style="mb-10"
                  adsList={ads.betweenAds}
                />
              )}
            </div>
            <div className="grid col-span-1 2xl:col-span-4 place-content-start">
              <PropertyShowcaseCard PropertyData={BuyPropertyData} />
              <PropertyWorthCard style="my-10" />
              {ads.verticalAds &&
                ads.verticalAds.length > 0 &&
                ads.verticalAds.map((items, index) => {
                  return <VerticalAds style="my-10" adsList={items} key={index} />;
                })}
            </div>
          </div>
        </div>
      </div>

      {/* ----------------------------popup savesearch-------------- */}
      {savepropertypopup ? (
        <Savepropertypopup allpropertyid={allpropertyid} onClose={onClose} />
      ) : null}

      {/* -----------------popup login-------------------- */}
      {AuthPopUp ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[999999]  outline-none focus:outline-none border ">
            <div className="relative min-w-[250px] max-w-[90%] mx-auto  my-10 shadow-black shadow-2xl">
              {/* ------ Content ------ */}
              <div className="border-0 rounded-lg shadow-2xl relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/* ------ Header ------ */}
                <div className="grid place-items-center place-content-end">
                  <button
                    className="bg-transparent border-0 text-black opacity-9 text-2xl font-normal outline-none focus:outline-none mx-3 my-2"
                    onClick={(e) => setAuthPopUp(false)}
                  >
                    ×
                  </button>
                </div>
                {/* ------ Body ------ */}
                <div className="relative grid place-items-center px-6 md:px-10 py-3 flex-auto">
                  <h3 className="text-black font-semibold text-base md:text-lg  leading-relaxed text-center">
                    Sign in to save
                  </h3>
                  <p className="text-black font-medium text-xs md:text-sm  leading-normal text-center mt-5">
                    Save properties to your account and sync across devices.
                  </p>
                </div>

                {/* ------ Fotter ------ */}
                <div className="flex justify-center items-center m-5 mt-2">
                  <button
                    className="border-2 border-[#525252] hover:border-black bg-white text-[#525252] font-semibold text-sm px-7 py-3 rounded-lg outline-none focus:outline-none ease-linear transition-all duration-150 mx-2"
                    onClick={(e) => navigate("/sign-up")}
                  >
                    Join
                  </button>
                  <button
                    className="border-2 border-[#E5002A] bg-[#E5002A] hover:bg-[#db183c] text-white font-semibold text-sm px-7 py-3 rounded-lg outline-none focus:outline-none ease-linear transition-all duration-150 mx-2"
                    onClick={(e) => navigate("/log-in")}
                  >
                    Sign in
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-20 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </Layout1>
  );
};

export default NewHomes;
