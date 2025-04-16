import React, { useEffect, useState } from "react";
import Layout1 from "../../Layouts/Layout1";
import PropertyShowcaseCard from "../common/PropertyShowcaseCard/PropertyShowcaseCard";
import PropertySoldCard from "../common/PropertySoldCard/PropertySoldCard";
import PropertyWorthCard from "../common/PropertyWorthCard/PropertyWorthCard";
import FilterScreenModel from "../common/FilterScreenModel/FilterScreenModel";
import searchicon from "../../assets/search.png";
import filter from "../../assets/filter.png";
import heart from "../../assets/heart_icon.png";
import agency4 from "../../assets/agency-4.png";
import agent2 from "../../assets/agent-2.png";
import { toast } from "react-toastify";
import axiosInstanceAuth from "../../apiInstances/axiosInstanceAuth";
import axiosInstance from "../../apiInstances/axiosInstance";
import { useSearchParams, useNavigate, useParams } from "react-router-dom";
import Savepropertypopup from "../savepropertypopup/savepropertypopup";
import SearchLocationInput from "../common/SearchLocationInput/SearchLocationInput";
import Loder from "../common/Loder";
import InPostAd from "../../ads/InPostAd";
import TopAds from "../Adds/TopAds";
import VerticalAds from "../Adds/VerticalAds";

const BuyProperty = () => {
  const [AuthPopUp, setAuthPopUp] = useState(false);
  const [savepropertypopup, setSavepropertypopup] = useState(false);
  const [IsOpen, setIsOpen] = useState(false);
  const [Searchindata, setSearchindata] = useState([]);
  const [BuyPropertyData, setBuyPropertyData] = useState([]);
  //console.log("🚀 ~ BuyProperty ~ BuyPropertyData:", BuyPropertyData)
  const [isLoading, setIsLoading] = useState(false);
  const [first, setfirst] = useState("");
  const onClose = () => setSavepropertypopup(false);
  const isAuthanticate = localStorage.getItem("Token");
  // const [query, setQuery] = useState("");
  const [ads, setAds] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { longitude, latitude } = pos.coords;
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      axiosInstance(url)
        .then((data) => {
          // const state = data.data.address.suburb ? data.data.address.suburb : data.data.address.city ? data.data.address.city : data.data.address.county ? data.data.address.county : data.data.address.country
          const state = data.data.address.state.split(' ')[0]
          getAdsList(state)
        })
        .catch((err) =>
          console.log("err", err))
    })
  }, [])

  const navigate = useNavigate();
  const typePriceBed = [
    {
      name: "Property type",
      id: "Property",
    },
    {
      name: "Price",
      id: "Price",
    },
    {
      name: "Bed",
      id: "Bed",
    },
  ];
  const allpropertyid =
    BuyPropertyData.length > 0 &&
    BuyPropertyData.map((data) => {
      if (data?._id) {
        return data?.id;
      }
      return data.id;
    });

  const [Filter, setFilter] = useState({
    search: "",
    category: "",
    status: "Active",
    agent: "",
    sort_by: "",
    serachbyaddress: "",
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
  useEffect(() => {
    GetSavedProperty("");
    if (encryptedData) {
      search();
    } else {
      GetAllListingData(Filter);
    }
  }, [encryptedData]);

  const getAdsList = (state) => {
    console.log("current city::::>>>>>", state)
    axiosInstance.get(`/advertise/ads/list?address=${state}`)
      .then((res) => {
        const result = res.data.data;
        setAds(result)
      })
      .catch((error) => console.log("err --->", error))
  }

  const GetAllListingData = async (Filter) => {
    setIsLoading(true);
    await axiosInstance
      .post("Agency/viewAllProperty", {
        status: Filter?.status,
      })
      .then((res) => {
        const mydata = res?.data?.data;
        //console.log("🚀 ~ .then ~ mydata---------------------------:", mydata)
        if (res?.data?.status) {
          const newArray = mydata.map((obj, i) => ({
            ...obj,
            id: mydata?.[i]?.id,
            frontPageImg: mydata?.[i]?.frontPageImg,
            agencyImg: agency4,
            agentImg: agent2,
            lead_agent: mydata?.[i]?.lead_agent,
            price: mydata?.[i]?.price,
            price_display_checked: mydata?.[i]?.price_display_checked,
            price_display: mydata?.[i]?.price_display,
            street_address_number: mydata?.[i]?.street_address_number,
            street_address_name: mydata?.[i]?.street_address_name,
            favourite: false,
            bedroomCount: mydata[i]?.Bedrooms,
            showerCount: mydata[i]?.Bathrooms,
            carCount: mydata[i]?.carport_spaces,
            squareCount: "6,580 m2",
            appartmentCount: "",
            acreageCount: mydata[i]?.property_type,
            // saleDate: `Sold on ${i + 10} Oct 2022`,
          }));
          // setBuyPropertyData(newArray);

          let newResponse = newArray.map((x) => ({
            ...x,
            favourite: localStorage.getItem("Saved")?.split(",").includes(x.id),
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
        //console.log("err --->", err);
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
            favourite: false,
            bedroomCount: mydata[i]?.Bedrooms,
            showerCount: mydata[i]?.Bathrooms,
            carCount: mydata[i]?.carport_spaces,
            squareCount: "6,580 m2",
            appartmentCount: "",
            acreageCount: mydata[i]?.property_type,
            // saleDate: `Sold on ${i + 10} Oct 2022`,
          }));
          // setBuyPropertyData(newArray);

          let newResponse = newArray.map((x) => ({
            ...x,
            favourite: localStorage.getItem("Saved")?.split(",").includes(x.id),
          }));

          setBuyPropertyData(newResponse);
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        //console.log("err --->", err);
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
        //console.log("err --->", err);
      });
  };

  const getid = (value) => {
    setfirst(value);
  };
  // ? setBuyPropertyData((prevData) =>
  //         [...prevData].sort(
  //           (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
  //         )
  //       )
  //     :  setBuyPropertyData((prevData) =>
  //         [...prevData].sort(
  //           (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt)
  //         )
  //       );
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

  const filterData = (searchTerm) => {
    const filteredArray = Searchindata.filter((obj) => {
      const allValue = `${obj.street_address_name
        .trim()
        .toLowerCase()} ${obj.street_address_number.toString()}`;
      searchTerm = searchTerm.toLowerCase();
      // Check if the name or ID contains all characters from the search term
      const searchCharacters = searchTerm.split("");
      return searchCharacters.every((char) => allValue.includes(char));
    });
    setBuyPropertyData(filteredArray);
  };
  return (
    <Layout1>
      <div className="px-5 pt-3">
        {/* <InPostAd /> */}
        <div className="xl:px-60 lg:px-44 2xl:px-80 mt-16 lg:mt-0">
          {/* ---------- Start Filter & Search ---------- */}
          <div className="mt-2 flex flex-col justify-start bg-white rounded-2xl shadow-sm hover:shadow-md p-5 mb-10">
            <div className="text-[#171717] font-semibold text-xs md:text-sm lg:text-base mb-3 px-4">
              {"BUY"}
            </div>
            <div className="flex flex-row justify-between gap-2">
              <div className="w-full xl:w-[40%] flex justify-start items-center border border-[#E5E5E5] rounded-[28px] py-3 px-4 md:px-7 cursor-pointer">
                <img
                  src={searchicon}
                  alt="icon"
                  className="w-3 lg:w-4 mr-3 cursor-pointer"
                />
                <input
                  type="text"
                  name="serachbyaddress"
                  placeholder="Search by Address"
                  className="w-full text-[#737373] font-medium text-xs md:text-sm lg:text-base outline-none"
                  onChange={(e) => {
                    // onChangeFilter()
                    filterData(e.target.value);
                  }}
                />
              </div>
              <div className="flex justify-end items-center gap-2">
                {typePriceBed?.map((item, index) => (
                  <div
                    className="hidden xl:flex justify-center items-center border border-[#E5E5E5] rounded-[28px] py-3 px-5 cursor-pointer"
                    key={index}
                  >
                    <div
                      className="text-[#737373] font-medium text-xs md:text-sm lg:text-base"
                      onClick={() => {
                        setIsOpen(true);
                        getid(item.id);
                      }}
                    >
                      {item.name}
                    </div>
                  </div>
                ))}
                <div
                  className="flex justify-center items-center border border-[#E5E5E5] rounded-[28px] py-3 px-4 md:px-7 cursor-pointer"
                  onClick={() => {
                    setIsOpen(true);
                    getid("all");
                  }}
                >
                  <img
                    src={filter}
                    alt=""
                    className="w-4 lg:w-6 mr-2 cursor-pointer"
                  />
                  <div className="text-[#737373] font-medium text-xs md:text-sm lg:text-base">
                    Filters
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ---------- End Filter & Search ---------- */}
          <div className="w-full grid grid-cols-1 xl:grid-cols-12 place-items-center xl:place-items-start gap-5 md:gap-10">
            {/* Content Section */}
            <div className="w-full grid col-span-1 xl:col-span-8">
              {/* ---------- Start Short by & Save ---------- */}
              <div className="flex flex-col md:flex-row justify-between bg-white rounded-2xl shadow-sm hover:shadow-md p-5 mb-10 gap-y-5 md:gap-x-5">
                <div className="flex flex-col justify-start">
                  <div className="text-[#171717] font-semibold text-sm md:text-md lg:text-xl">
                    {"Buy"} Real Estate & Property
                  </div>
                  <div className="text-[#737373] font-normal text-xs md:text-sm lg:text-base mt-1">
                    1-{BuyPropertyData?.length} of {BuyPropertyData?.length}{" "} results
                  </div>
                </div>
                <div className="flex flex-col md:flex-row justify-start gap-2 mt-4 md:mt-0 lg:flex xl:flex">
                  <div className="flex justify-center items-center border border-[#E5E5E5] rounded-[28px] cursor-pointer overflow-hidden">
                    <select
                      className=" text-[#737373] font-medium text-center text-xs md:text-sm lg:text-base py-3 px-4 focus-visible:outline-none focus:outline-none"
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
              {/* ---------- End Short by & Save ---------- */}

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
            {/* Sidebar Section */}
            <div className="grid col-span-1 xl:col-span-4 place-content-start">
              <PropertyShowcaseCard PropertyData={BuyPropertyData} />
              <PropertyWorthCard style="my-10" />
              {ads.verticalAds && ads.verticalAds.length > 0 &&
                ads.verticalAds.map((items, index) => {
                  return (
                    <VerticalAds style="my-10" adsList={items} key={index} />
                  );
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

      {/* ---------- Filter Screen Model ---------- */}

      <FilterScreenModel
        setIsOpen={setIsOpen}
        IsOpen={IsOpen}
        currentTab={"Buy"}
        id={first}
        dataCount={BuyPropertyData?.length}
      />
    </Layout1>
  );
};

export default BuyProperty;
