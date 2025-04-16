import React, { useState } from "react";
import { json, useNavigate } from "react-router-dom";
import search from "../../../assets/search.png";
import filter from "../../../assets/filter.png";
import FilterScreenModel from "../FilterScreenModel/FilterScreenModel";
import axiosInstance from "../../../apiInstances/axiosInstance";
import { toast } from "react-toastify";
import './filterScreen.css'

const FilterScreen = ({ setSearch }) => {
  //console.log("🚀 ~ FilterScreen ~ setSearch:", setSearch)
  const navigate = useNavigate();
  const [IsOpen, setIsOpen] = useState(false);

  const TabData = ["Buy", "Rent", "Sold", "Address", "Agents"];
  const Filterable = ["Buy", "Rent", "Sold"];
  const [isActive, setisActive] = useState(TabData[0]);

  const [searchValue, setSearchValue] = useState("");
  const [searchAddress, setSearchAddress] = useState("");
  const [searchDataPage, setSearchDataPage] = useState("buy");
  const [searchAgent, setSearchAgent] = useState("");

  const [searchData, setSearchData] = useState([]);

  localStorage.setItem("searchData", searchData);

  const searchBtn = () => {
    // navigate(`/${isActive}`);
    // if (searchValue == "" || searchValue == undefined) {
    //   return toast.error("please fill search value");
    // }
    // let status = "";
    // if (isActive === "Buy") {
    //   status = "Active";
    // } else if (isActive === "Address" || isActive === "Agents") {
    //   status = "";
    // } else {
    //   status = isActive;
    // }

    // const sendData = {
    //   key: status === "" ? searchAddress : searchValue,
    //   status: searchDataPage == "buy" ? "Active" : searchDataPage,
    // };
    // axiosInstance
    //   .post("/searchByAddress", sendData)
    //   .then((res) => {
    //     //console.log("🚀 ~ .then ~ res:", res);
    //     if (res.status == 200) {
    //       setSearchData(JSON.stringify(res?.data?.data));

    //       //console.log(res?.data?.data[0]?.status);

    //       navigate(`/${searchDataPage}`);
    //     } else {
    //       //
    //     }
    //   })
    //   .catch((err) => {
    //     //console.log("err --->", err);
    //   });

    if (searchValue.trim().length == 0) {
      navigate(`/${searchDataPage}`);
    } else {
      setSearch(searchValue);
      navigate(`/${searchDataPage}/searched/${searchValue}`);
    }
  };
  const localSave = (e) => {
    localStorage.setItem("search", e.target.value)
  }
  const ActiveTab =
    "bg-[#FFEAEF] border-b-[#E5002A] rounded-t-lg text-[#404040] font-semibold";

  const NormalTab =
    "w-32 md:w-44 grid place-items-center  text-[#737373] font-medium text-sm md:text-sm  lg:text-base border border-b-2 border-transparent hover:border-b-[#E5002A] py-3 px-10 ease-in-out duration-700 cursor-pointer";
  return (
    <>
      <div className="bg-[#FFFFFF] rounded-xl shadow-md hover:shadow-lg p-4 mx-0 lg:mx-40 mt-4">
        {/* ---------- Navigation ---------- */}
        <div
          id="navigation"
          className="w-full grid place-items-start overflow-x-scroll rounded-xl scrollBarHidden"
        >
          <div className="w-full flex justify-start items-start border border-b-2 border-transparent border-b-[#E5E5E5]">
            {TabData?.length > 0 &&
              TabData?.map((d, index) => (
                <div
                  key={index}
                  className={`${NormalTab} ${isActive === d ? ActiveTab : ""}`}
                  onClick={(e) => {
                    setisActive(d);
                    setSearchDataPage(d);
                  }}
                >
                  {d}
                </div>
              ))}
          </div>
        </div>

        {/* ---------- Search ---------- */}
        {Filterable?.find((x) => x === isActive) && (
          <div className="flex flex-row justify-start items-center m-2 mt-4 md:mt-6">
            <div className="w-full md:h-12 flex justify-start items-center border border-[#E5E5E5] rounded-r-3xl md:rounded-r-none rounded-l-3xl py-3 px-4 md:px-7 cursor-pointer">
              <img
                src={search}
                alt="icon"
                className="w-3 lg:w-4 mr-3 cursor-pointer"
              />
              <input
                type="text"
                name="searchValue"
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value)
                  localSave(e)
                }}
                // onKeyDown={(e) => {
                //   if (e.key === "Enter") {
                //     navigate(`/${isActive}`);
                //   }
                // }}
                placeholder="Search Suburb, Postcode or Region"
                className="w-full text-[#A3A3A3]  text-xs md:text-sm outline-none"
              />
            </div>
            <div
              className="h-12 hidden md:flex justify-center items-center border border-[#E5E5E5] rounded-r-3xl py-3 px-4 md:px-7 cursor-pointer "
              onClick={() => {
                setIsOpen(true);
              }}
            >
              <img
                src={filter}
                alt="icon"
                className="w-4 lg:w-6 mr-2 cursor-pointer"
              />
              <div className="text-[#525252] font-medium text-xs md:text-sm ">
                Filters
              </div>
            </div>
            <button
              className=" md:block font-medium text-xs md:text-sm lg:text-base rounded-3xl border bg-[#E5002A] text-white hover:bg-white hover:text-[#E5002A] hover:border-[#E5002A] py-3 px-4 md:px-7 ml-2"
              onClick={searchBtn}
            >
              Search
            </button>
          </div>
        )}

        {isActive === TabData[3] && (
          <div className="flex flex-row justify-start items-center m-2 mt-4 md:mt-6">
            <div className="w-full flex justify-start items-center border border-[#E5E5E5] rounded-3xl py-3 px-4 md:px-7 cursor-pointer">
              <img
                src={search}
                alt="icon"
                className="w-3 lg:w-4 mr-3 cursor-pointer"
              />
              <input
                type="text"
                name="searchAddress"
                value={searchAddress}
                onChange={(e) => setSearchAddress(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (searchAddress == "" || !searchAddress) {
                      return toast.error("Please enter a search address");
                    }
                    setSearch(searchAddress);
                    navigate(`address/searched`);
                  }
                }}
                placeholder="Search by Address"
                className="w-full text-[#A3A3A3]  text-xs md:text-sm outline-none"
              />
            </div>
            <button
              className=" md:block font-medium text-xs md:text-sm lg:text-base rounded-3xl border bg-[#E5002A] text-white hover:bg-white hover:text-[#E5002A] hover:border-[#E5002A] py-3 px-4 md:px-7 ml-2"
            >
              Search
            </button>
          </div>
        )}

        {isActive === TabData[4] && (
          <div className="flex flex-row justify-start items-center m-2 mt-4 md:mt-6">
            <div className="w-full flex justify-start items-center border border-[#E5E5E5] rounded-3xl py-3 px-4 md:px-7 cursor-pointer">
              <img
                src={search}
                alt="icon"
                className="w-3 lg:w-4 mr-3 cursor-pointer"
              />
              <input
                type="text"
                name="searchAgent"
                value={searchAgent}
                onChange={(e) => setSearchAgent(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    navigate(`/find-agents/${searchAgent}`);
                  }
                }}
                placeholder="Search Suburb, Postcode or Region"
                className="w-full text-[#A3A3A3]  text-xs md:text-sm outline-none"
              />
            </div>
            <button
              className=" md:block font-medium text-xs md:text-sm lg:text-base rounded-3xl border bg-[#E5002A] text-white hover:bg-white hover:text-[#E5002A] hover:border-[#E5002A] py-3 px-4 md:px-7 ml-2"
            >
              Search
            </button>
          </div>
        )}
      </div>

      {/* ---------- Filter Screen Model ---------- */}

      <FilterScreenModel
        setIsOpen={setIsOpen}
        IsOpen={IsOpen}
        currentTab={isActive}

      />
    </>
  );
};

export default FilterScreen;
