import React, { useState, useEffect } from "react";
import Layout1 from "../../Layouts/Layout1";
import PropertyShowcaseCard from "../common/PropertyShowcaseCard/PropertyShowcaseCard";
import PropertyWorthCard from "../common/PropertyWorthCard/PropertyWorthCard";
import FilterScreenModel from "../common/FilterScreenModel/FilterScreenModel";
import CalendarScreen from "../common/CalendarScreen/CalendarScreen";
import search from "../../assets/search.png";
import filter from "../../assets/filter.png";
import inspection1 from "../../assets/inspection1.png";
import inspection2 from "../../assets/inspection2.png";
import inspection3 from "../../assets/inspection3.png";
import inspection4 from "../../assets/inspection4.png";
import location from "../../assets/location.svg";
import bedroom from "../../assets/bedroom_icon.png";
import shower from "../../assets/shower_icon.png";
import car from "../../assets/car_icon.png";
import calender from "../../assets/calender.png";
import logomor from "../../assets/logomor.png";

import agencyAgentImg7 from "../../assets/a4.png";
import auction from "../../assets/auction.png";
import map from "../../assets/map-pin.png";
import axiosInstance from "../../apiInstances/axiosInstance";
import { BACKEND_BASE_URL } from "../../apiInstances/baseurl";

const Inspection = () => {
  const [Inspection, setInspection] = useState([]);
  //console.log(
  //   "🚀 ~ file: Inspection.jsx:27 ~ Inspection ~ Inspection:",
  //   Inspection
  // );

  useEffect(() => {
    GetAlldata();
  }, []);

  const SellersReviews = [
    {
      profile: agencyAgentImg7,
      name: "Savannah Davis",
      post: "Seller of House in Upper Coomera, Qld",
    },
  ];

  // const data = [
  //   {
  //     img: inspection1,
  //     title: "12:00am - 12:30am",
  //     amount: "$520,000",
  //     address: "40/28 Fortune Street Coomera, Qld",
  //     bedroomCount: 1,
  //     showerCount: 3,
  //     carCount: 4,
  //     house: "House",
  //   },
  //   {
  //     img: inspection2,
  //     title: "12:00am - 1:00pm",
  //     amount: "Offers in mid $700,000's",
  //     address: "56 Ningi Esplanade, Ningi",
  //     house: "House",
  //   },
  //   {
  //     img: inspection3,
  //     title: "1:00am - 1:30am",
  //     amount: "Offers over $650,000",
  //     address: "56 Ningi Esplanade, Ningi",
  //     house: "House",
  //   },
  //   {
  //     img: inspection4,
  //     title: "12:00am - 12:30am",
  //     amount: "Contact Agent",
  //     address: "38 Old Gympie Rd, Yandina",
  //     house: "House",
  //   },
  //   {
  //     img: inspection1,
  //     title: "12:00am - 12:30am",
  //     amount: "$520,000",
  //     address: "40/28 Fortune Street Coomera, Qld",
  //     bedroomCount: 1,
  //     showerCount: 3,
  //     carCount: 4,
  //     house: "House",
  //   },
  //   {
  //     img: inspection2,
  //     title: "12:00am - 1:00pm",
  //     amount: "Offers in mid $700,000's",
  //     address: "56 Ningi Esplanade, Ningi",
  //     house: "House",
  //   },
  //   {
  //     img: inspection3,
  //     title: "1:00am - 1:30am",
  //     amount: "Offers over $650,000",
  //     address: "56 Ningi Esplanade, Ningi",
  //     house: "House",
  //   },
  //   {
  //     img: inspection4,
  //     title: "12:00am - 12:30am",
  //     amount: "Contact Agent",
  //     address: "38 Old Gympie Rd, Yandina",
  //     house: "House",
  //   },
  //   {
  //     img: inspection2,
  //     title: "12:00am - 1:00pm",
  //     amount: "Offers in mid $700,000's",
  //     address: "56 Ningi Esplanade, Ningi",
  //     house: "House",
  //   },
  // ];

  const btn = [
    {
      img: filter,
      title: "List",
      link: "#",
    },
    {
      img: map,
      title: "Map",
      link: "#",
    },
    {
      img: calender,
      title: "Inspections",
      link: "#",
    },
    {
      img: auction,
      title: "Auctions",
      link: "#",
    },
  ];

  const [IsOpen, setIsOpen] = useState(false);
  const [Iscale, setIscal] = useState(false);
  const time = ["Today", "Fri 13", "Sat 14", "Sun 15", "Mon 16", "Tue 17"];
  const ActiveTab =
    "bg-[#FFEAEF] border-b-[#E5002A] rounded-t-lg text-[#404040] font-semibold";
  const NormalTab =
    " grid place-items-center whitespace-nowrap  text-[#737373] font-medium text-sm md:text-sm  lg:text-base border border-b-2 border-transparent hover:border-b-[#E5002A] py-3 px-5 ease-in-out duration-700 cursor-pointer";

  const [isActi, setisActi] = useState(time[0]);

  const GetAlldata = () => {
    axiosInstance
      .get("/inspection")
      .then((res) => {
        const mydata = res?.data?.data;
        if (res?.data?.status) {
          const newArray = mydata.map((obj, i) => ({
            ...obj,
            id: mydata?.[i]?.id,
            frontPageImg: mydata?.[i]?.frontPageImg,
            // agencyImg: agency4,
            // agentImg: agent2,
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
            // saleDate: `Sold on ${i + 10} Oct 2022`,
          }));
          // setBuyPropertyData(newArray);

          let newResponse = newArray.map((x) => ({
            ...x,
            favourite: localStorage.getItem("Saved")?.split(",").includes(x.id),
          }));

          setInspection(newResponse);
        } else {
          // toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        //console.log("err --->", err);
      });
  };

  return (
    <>
      <div className="px-5 pt-3">
        <div className="container mx-auto ">
          {/* ---------- Start Filter & Search ---------- */}

          <div className="flex flex-col justify-start bg-white rounded-2xl shadow-sm hover:shadow-md p-5 mb-10">
            <div className="text-[#171717] font-semibold text-xs md:text-sm lg:text-base mb-3 px-4">
              BUY → SPECATION
            </div>
            <div className="flex flex-row justify-between gap-2">
              <div className="w-full lg:w-[40%] flex justify-start items-center border border-[#E5E5E5] rounded-[28px] py-3 px-4 md:px-7 cursor-pointer">
                <img
                  src={search}
                  alt="icon"
                  className="w-3 lg:w-4 mr-3 cursor-pointer"
                />
                <input
                  type="text"
                  placeholder="Search by Address"
                  className="w-full text-[#737373] font-medium text-xs md:text-sm lg:text-base outline-none"
                />
              </div>
              <div className="flex justify-end items-center gap-2">
                <div className="hidden lg:flex justify-center items-center border border-[#E5E5E5] rounded-[28px] py-3 px-5 cursor-pointer">
                  <div className="text-[#737373] font-medium text-xs md:text-sm lg:text-base">
                    Property type
                  </div>
                </div>
                <div className="hidden lg:flex justify-center items-center border border-[#E5E5E5] rounded-[28px] py-3 px-5 cursor-pointer">
                  <div className="text-[#737373] font-medium text-xs md:text-sm lg:text-base">
                    Price
                  </div>
                </div>
                <div className="hidden lg:flex justify-center items-center border border-[#E5E5E5] rounded-[28px] py-3 px-5 cursor-pointer">
                  <div className="text-[#737373] font-medium text-xs md:text-sm lg:text-base">
                    Bed
                  </div>
                </div>
                <div
                  className="flex justify-center items-center border border-[#E5E5E5] rounded-[28px] py-3 px-4 md:px-7 cursor-pointer"
                  onClick={() => {
                    setIsOpen(true);
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

          <div className="grid grid-cols-1 xl:grid-cols-7 place-items-center xl:place-items-start gap-10">
            <div className="grid col-span-1 xl:col-span-5">
              {/* ---------- Start Short by & Save ---------- */}

              {/* ---------- End Short by & Save ---------- */}

              <div className="my-8">
                <h2 className="font-semibold xl:text-2xl lg:text-xl md:text-lg text-base pb-5 px-3">
                  Properties open for inspection on Saturday 14th in Australia
                </h2>
                <div className="w-full bg-[#FFFFFF] rounded-xl p-5">
                  <span className="text-xs text-[#737373]">
                    1-25 of 31432 results
                  </span>
                  <div className="flex gap-2">
                    {btn?.map((e, index) => (
                      <div
                        key={index}
                        className="flex justify-center items-center border border-[#E5E5E5] rounded-[28px] py-3 px-4 md:px-7 cursor-pointer"
                        onClick={() => {
                          setIsOpen(true);
                        }}
                      >
                        <img
                          src={e.img}
                          alt=""
                          className="w-4 lg:w-6 mr-2 cursor-pointer"
                        />
                        <div className="text-[#737373] font-medium text-xs md:text-sm lg:text-base">
                          {e.title}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* navigation start */}

              <h1 className="font-semibold xl:text-2xl lg:text-xl md:text-lg text-base pb-5 px-3">
                Inspections this week
              </h1>
              <div
                id="navigation"
                className="w-full grid place-items-start overflow-x-scroll rounded-xl"
              >
                <div className="w-full bg-[#FFFFFF] rounded-xl p-4">
                  <div className="flex justify-between items-center border border-b-2 border-transparent border-b-[#E5E5E5]">
                    {time.map((data, index) => (
                      <div
                        key={index}
                        className={`${NormalTab} ${isActi === data ? ActiveTab : ""
                          }`}
                        onClick={() => {
                          setisActi(data);
                        }}
                      >
                        <div className="px-8">{data}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* {Inspection} */}
              <div className="grid place-items-center lg:grid-cols-3 md:grid-cols-2 grid-cols-1 my-10  gap-5">
                {Inspection?.map((cont, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-[6px_6px_10px_-5px_rgba(0,0,0,0.3)]"
                  >
                    <div className="p-2 text-[3D3B40] text-sm">
                      {cont?.inspection_times[0].date}
                    </div>
                    <img
                      className="px-3 inline-block h-48 w-96"
                      src={`${BACKEND_BASE_URL}${cont.frontPageImg}`}
                      alt=""
                      srcset=""
                    />
                    <div className="px-4">
                      <div className="xl:text-lg lg:text-base md:text-sm font-semibold py-2">
                        ${cont.price}
                      </div>

                      <div className="flex gap-1">
                        <img src={location} alt="" />
                        <span className="text-[#737373] text-sm font-semibold">
                          {`${cont.street_address_number} ${cont.street_address_name}`}
                        </span>
                      </div>

                      {/* {carts house bad etc} */}
                      <div className="flex flex-wrap justify-start items-center gap-2 my-2">
                        <div className="flex justify-center items-center gap-2 bg-[#F5F5F5] rounded-md p-[6px]">
                          <img
                            src={bedroom}
                            alt="location"
                            className="w-4 md:w-5"
                          />
                          <div className="font-semibold text-[#737373] text-xs md:text-sm">
                            {cont?.Bedrooms}
                          </div>
                        </div>
                        <div className="flex justify-center items-center gap-2 bg-[#F5F5F5] rounded-md p-[6px]">
                          <img
                            src={shower}
                            alt="bedroom"
                            className="w-4 md:w-5"
                          />
                          <div className="font-semibold text-[#404040] text-xs md:text-sm">
                            {cont?.showerCount}
                          </div>
                        </div>
                        <div className="flex justify-center items-center gap-2 bg-[#F5F5F5] rounded-md p-[6px]">
                          <img src={car} alt="shower" className="w-4 md:w-5" />
                          <div className="font-semibold text-[#404040] text-xs md:text-sm">
                            {cont?.carCount}
                          </div>
                        </div>
                        <div className="flex justify-center items-center bg-[#F5F5F5] rounded-md py-2 px-1">
                          <div className="font-semibold text-[#404040] text-xs">
                            {cont?.property_type}
                          </div>
                        </div>
                      </div>
                      {/* {and carts house bad etc} */}
                      <div
                        className="flex  items-center gap-2 my-3 cursor-pointer "
                        onClick={() => {
                          setIscal(true);
                        }}
                      >
                        <img className="w-5" src={calender} alt="img" />
                        <span className="text-[#737373] text-sm font-semibold">
                          Add to calendar
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* navigation end */}

              <div className="container rounded-xl bg-white my-10">
                <div className="flex justify-center my-5">
                  <img src={logomor} alt="" />
                </div>
                <div className="grid lg:px-16">
                  <h2 className="text-lg font-semibold lg:text-left text-center">
                    Talk to a Mortgage Choice broker
                  </h2>
                  <p className="text-sm lg:text-left text-center py-1">
                    While you search for your new home, we'll search for your
                    home loan.
                  </p>

                  {/* cart first  */}
                  <div className="grid lg:grid-cols-2 place-items-center lg:place-items-start">
                    {SellersReviews?.map((i, index) => (
                      <div
                        key={index}
                        className="flex flex-col md:flex-row justify-start md:justify-between items-start gap-2"
                      >
                        <div className="flex flex-col justify-start items-start">
                          <div className="flex justify-start items-center gap-4 mt-5 md:mt-9">
                            <img
                              src={i?.profile}
                              alt="icon"
                              className="w-10 md:w-14"
                            />
                            <div>
                              <div className="text-[#171717] font-semibold text-xs md:text-sm lg:text-base">
                                {i?.name}
                              </div>
                              <div className="text-[#737373] font-medium text-xs md:text-sm">
                                {i?.post}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="w-full my-auto">
                      <input
                        type="text"
                        placeholder="Speak with Stephanie"
                        className="w-full font-medium text-[#737373] text-xs md:text-sm outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5  mt-2 md:mt-4"
                      />
                    </div>
                  </div>
                  {/* cart end  */}

                  <div className="flex flex-col md:flex-row justify-center gap-4 mt-4 md:mt-6">
                    <div className="w-full">
                      <div className="font-medium text-[#171717] text-xs md:text-sm lg:text-base">
                        First name
                        <span className="px-1 text-red-500">*</span>
                      </div>
                      <input
                        type="text"
                        placeholder="Enter first name"
                        className="w-full font-medium text-[#737373] text-xs md:text-sm outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5  mt-2 md:mt-4"
                      />
                    </div>
                    <div className="w-full">
                      <div className="font-medium text-[#171717] text-xs md:text-sm lg:text-base">
                        Mobile phone number{" "}
                        <span className="px-1 text-red-500">*</span>
                      </div>
                      <input
                        type="text"
                        placeholder="Enter mobile phone number"
                        className="w-full font-medium text-[#737373] text-xs md:text-sm outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5  mt-2 md:mt-4"
                      />
                    </div>
                  </div>

                  <div className="my-8">
                    <div className="flex gap-4 pb-3">
                      <input className="w-4" type="checkbox" />
                      <span>
                        I'm in Western Australia. Check the local time before
                        you call.
                      </span>
                    </div>
                    <div>
                      <span className="border-b border-b-[#171717] font-semibold">
                        Privacy collection statement
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid col-span-1 xl:col-span-2 place-content-start">
              <PropertyShowcaseCard />
              <PropertyWorthCard style="my-10" />
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Filter Screen Model ---------- */}

      <FilterScreenModel
        setIsOpen={setIsOpen}
        IsOpen={IsOpen}
        currentTab={"Rent"}
      />

      <CalendarScreen
        setIsOpen={setIscal}
        IsOpen={Iscale}
        currentTab={"Rent"}
      />
    </>
  );
};

export default Inspection;
