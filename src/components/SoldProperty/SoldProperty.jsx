import React, { useEffect, useState } from "react";
import Layout1 from "../../Layouts/Layout1";
import PropertyShowcaseCard from "../common/PropertyShowcaseCard/PropertyShowcaseCard";
import PropertySoldCard from "../common/PropertySoldCard/PropertySoldCard";
import PropertyWorthCard from "../common/PropertyWorthCard/PropertyWorthCard";
import FilterScreenModel from "../common/FilterScreenModel/FilterScreenModel";
import searchicon from "../../assets/search.png";
import filter from "../../assets/filter.png";
import heart from "../../assets/heart_icon.png";
import property1 from "../../assets/property-1.png";
import property2 from "../../assets/property-2.png";
import agency3 from "../../assets/agency-3.png";
import agency4 from "../../assets/agency-4.png";
import agent1 from "../../assets/agent-1.png";
import agent2 from "../../assets/agent-2.png";
import { toast } from "react-toastify";
import axiosInstanceAuth from "../../apiInstances/axiosInstanceAuth";
import { useSearchParams, useNavigate } from "react-router-dom";
import Savepropertypopup from "../savepropertypopup/savepropertypopup";
import axiosInstance from "../../apiInstances/axiosInstance";
import Loder from "../common/Loder";
import VerticalAds from "../Adds/VerticalAds";

const SoldProperty = () => {
  const [AuthPopUp, setAuthPopUp] = useState(false);
  const [savepropertypopup, setSavepropertypopup] = useState(false);
  const [IsOpen, setIsOpen] = useState(false);
  const [SoldPropertyData, setSoldPropertyData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [Searchindata, setSearchindata] = useState([]);

  const onClose = () => setSavepropertypopup(false);

  const isAuthanticate = localStorage.getItem("Token");
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
  const allpropertyid = SoldPropertyData.map((data) => {
    if (data?._id) {
      return data?.id;
    }
    return data.id;
  });

  const [Filter, setFilter] = useState({
    search: "",
    category: "",
    status: "Sold",
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
  //console.log("🚀 ~ SoldProperty ~ encryptedData:", encryptedData);

  // let { encryptedData } = useParams();

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

  const GetAllListingData = async (Filter) => {
    setIsLoading(true);
    await axiosInstance
      .post("Agency/viewAllProperty", {
        // search: Filter?.search,
        // category: Filter?.category,
        status: Filter?.status,
        // agent: Filter?.agent,
        // sort_by: Filter?.sort_by,
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
            saleDate: `Sold on ${i + 10} Oct 2022`,
          }));
          // setSoldPropertyData(newArray);

          let newResponse = newArray.map((x) => ({
            ...x,
            favourite: localStorage.getItem("Saved")?.split(",").includes(x.id),
          }));
          setIsLoading(false);
          setSearchindata(newResponse);
          setSoldPropertyData(newResponse);
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

          setSoldPropertyData(newResponse);
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
      .post("savedProperty", {
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

  useEffect(() => {
    const getToken = localStorage.getItem('Token');
    if (getToken != null) {
      GetSavedProperty();
    }
    if (encryptedData) {
      search();
    } else {
      GetAllListingData(Filter);
    }
  }, [encryptedData]);
  const [first, setfirst] = useState("");

  const getid = (value) => {
    setfirst(value);
  };

  const savesearch = () => {
    axiosInstanceAuth
      .post(`SaveSearch?id=${JSON.stringify(allpropertyid)}`)
      .then((res) => {
        const mydata = res?.data?.data;
      })
      .catch((err) => {
        //console.log(err);
      });
  };

  const sort = async () => {
    const sendData = { sort_by: Filter?.sort_by, status: Filter?.status };
    await axiosInstanceAuth
      .post(`/sortProperty`, sendData)
      .then((res) => {
        //console.log("🚀 ~ .then ~ res:", res);
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
          setSoldPropertyData(newResponse);
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        //console.log("err --->", err);
      });
  };

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
    setSoldPropertyData(filteredArray);
  };

  useEffect(() => {
    if (Filter?.sort_by) {
      sort();
    }
  }, [Filter?.sort_by]);

  return (
    <Layout1>
      <div className="px-5 pt-3">
        <div className="xl:px-60 lg:px-44 2xl:px-80 mt-16 lg:mt-0">
          {/* ---------- Start Filter & Search ---------- */}

          <div className="flex flex-col justify-start bg-white rounded-2xl shadow-sm hover:shadow-md p-5 mb-10">
            <div className="text-[#171717] font-semibold text-xs md:text-sm lg:text-base mb-3 px-4">
              {"Sold"}
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

          <div className="w-full grid grid-cols-1 2xl:grid-cols-12 place-items-center 2xl:place-items-start xl:place-items-center 2xl:gap-5 gap-10">
            <div className="w-full grid col-span-1 2xl:col-span-8">
              {/* ---------- Start Short by & Save ---------- */}
              <div className="flex md:flex-row flex-col justify-between bg-white rounded-2xl shadow-sm hover:shadow-md p-5 mb-10 gap-x-5">
                <div className="flex flex-col justify-start">
                  <div className="text-[#171717] font-semibold text-md lg:text-xl">
                    {"Sold"}  Real Estate & Property
                  </div>
                  <div className="text-[#737373] font-normal text-xs md:text-sm lg:text-base mt-1">
                    1-{SoldPropertyData?.length} of {SoldPropertyData?.length}{" "}
                    results
                  </div>
                </div>
                <div className="flex justify-start gap-2 mt-4 md:mt-0 flex-col sm:flex-row">
                  <div className="flex justify-center items-center border border-[#E5E5E5] rounded-[28px] px-2 md:px-auto cursor-pointer overflow-hidden">
                    {/* <div className="text-[#737373] font-medium text-xs md:text-sm lg:text-base">
                      Short by
                    </div> */}

                    <select
                      className="round text-[#737373] font-medium text-xs md:text-sm lg:text-base focus-visible:outline-none focus:outline-none"
                      name="sort_by"
                      onChange={(e) => {
                        onChangeFilter(e);
                      }}
                    >
                      <option className="pt-8">Featured</option>
                      <option value="dateDescending">
                        Date (Newest-Oldest)
                      </option>
                      <option value="dateAsending">Date (Oldest-Newest)</option>
                      <option value="priceAsending">
                        Price (Lowest-Highest)
                      </option>
                      <option value="priceDescending">
                        Price (Highest-Lowest)
                      </option>
                      <option value="DE">Next inspection</option>
                    </select>
                    {/* <img
                      src={filter}
                      alt=""
                      className="w-4 lg:w-6 mr-2 cursor-pointer"
                    /> */}
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
                          // savesearch();
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
                  PropertyData={SoldPropertyData}
                  setPropertyData={setSoldPropertyData}
                  style="mb-10"
                  adsList={ads.betweenAds}
                />
              )}
            </div>
            <div className="grid col-span-1 2xl:col-span-4 place-content-start">
              <PropertyShowcaseCard PropertyData={SoldPropertyData} />
              <PropertyWorthCard style="my-10" />
              {ads.verticalAds && ads.verticalAds.length > 0 &&
                ads.verticalAds.map((items, index) => {
                  return (
                    <VerticalAds style="my-10" adsList={items} key={index} />
                  )
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
        currentTab={"Sold"}
        id={first}
        dataCount={SoldPropertyData?.length}
      />
    </Layout1>
  );
};

export default SoldProperty;
