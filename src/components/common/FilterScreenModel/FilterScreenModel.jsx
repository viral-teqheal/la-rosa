import React, { useEffect, useState } from "react";
import "./FilterScreenModel.css";
import CustomSlider from "../CustomSlider/CustomSlider";
import closeIcon from "../../../assets/closeIcon.png";
import Bar from "../../../assets/Bars.png";
import { json, useLocation, useNavigate } from "react-router-dom";
import {
  AvailableDate,
  Bathrooms,
  Bedrooms,
  CarSpaces,
  ClimateChangerAndEnergySaver,
  IndoorFeatures,
  MethodOfSale,
  NewOrEstablished,
  OutdoorFeatures,
  PropertyRequirements,
  TypeOfProperty,
} from "../../../Constants";

const FilterScreenModel = ({
  setIsOpen,
  IsOpen,
  currentTab,
  id,
  dataCount,
}) => {
  const navigate = useNavigate();
  const FilterTab = ["Buy", "Sold", "Rent"];
  const [isActive, setisActive] = useState(currentTab);
  const [isSelectAllBuy, setIsSelectAllBuy] = useState(true);
  const [isSelectAllSold, setIsSelectAllSold] = useState(true);
  const [isSelectAllRent, setIsSelectAllRent] = useState(true);
  const search = useLocation().pathname.split("/")?.[1];

  useEffect(() => {
    setisActive(currentTab);
  }, [currentTab]);

  const [sendData, setSendData] = useState(TypeOfProperty);

  const Value = sendData.map((sendData) =>
    sendData.isChecked === true ? sendData.name : ""
  );

  const handleChange = (event) => {
    const { name, checked } = event.target;
    if (name === "Allselecte") {
      // Check "All Types" and uncheck all other checkboxes
      const newSendData = sendData.map((item) => {
        return { ...item, isChecked: checked };
      });
      setSendData(newSendData);
    } else {
      // Update state for the clicked checkbox
      const newSendData = sendData.map((item) =>
        item.name === name ? { ...item, isChecked: checked } : item
      );
      setSendData(newSendData);
    }
  };

  const handleClickToActive = (id) => {
    setisActive(id);
  };

  const [SelectedRange, setSelectedRange] = useState([0, 100]);

  const ActiveTab =
    "bg-[#FFEAEF] border-b-[#E5002A] rounded-t-lg text-[#404040] font-semibold";

  const NormalTab =
    "w-auto md:w-24 grid place-items-center place-content-center text-[#737373] font-medium text-sm md:text-sm border border-b-2 border-transparent hover:border-b-[#E5002A] py-3 px-10 ease-in-out duration-700 cursor-pointer";

  const normalBox =
    "flex justify-center items-center gap-3 border border-[#E5E5E5] rounded-3xl font-medium text-xs md:text-sm cursor-pointer py-2 px-5";

  const selectedBox = "!text-[#E5002A] !bg-[#FFEAEF] !border-[#E5002A]";

  const selectedDate = "!bg-[#FFEAEF] !border-[#E5002A]";
  const [BuyCheckboxs, setBuyCheckboxs] = useState({
    // --------- Type Of Property ---------
    all_types: false,
    // -------- Outdoor Features ---------

    // ---------  Indoor Features ---------

    // ---------  Climate Changer & Energy Saver ---------
    indoor_features: [],
    outdoor_features: [],
    climate_energy: [],
    heating_cooling: [],
    Property_type: TypeOfProperty.map((type) => type.name),

    bedrooms: "any",
    bathrooms: "any",
    car_spaces: "any",
    new_or_established_checked: "",
    method_of_sale: "",
    keywords: "",
    price_start: "",
    price_end: "",
    size_of_land: "",

    outdoor_feature: false,
  });
  // console.log("🚀 ~ FilterScreenModel ~ BuyCheckboxs:", BuyCheckboxs);
  // //console.log(BuyCheckboxs?.size_of_land);
  // const indoorCheckBox = Object.entries(BuyCheckboxs).filter((item) => {
  //   return item[0].split("indoor").length > 1 && item[1] === true;
  // });

  // let indoorData = [];
  // indoorCheckBox.map((item) => indoorData.push(item[0]));

  const [SoldCheckboxs, setSoldCheckboxs] = useState({
    // --------- Type Of Property ---------

    // --------- Outdoor Features ---------

    indoor_features: [],
    outdoor_features: [],
    climate_energy: [],
    Property_type: TypeOfProperty.map((type) => type.name),

    // ---------  Indoor Features ---------

    // ---------  Climate Changer & Energy Saver ---------

    bedrooms: "any",
    bathrooms: "any",
    car_spaces: "any",
    keywords: "",
    price_start: "",
    price_end: "",
    show_sold_price: false,
    size_of_land: "",
  });

  const [RentCheckboxs, setRentCheckboxs] = useState({
    // --------- Type Of Property ---------
    all_types: "",

    // --------- Outdoor Features ---------
    indoor_features: [],
    outdoor_features: [],
    climate_energy: [],
    Property_type: TypeOfProperty.map((type) => type.name),

    // ---------  Indoor Features ---------

    // ---------  Climate Changer & Energy Saver ---------

    available_date: {
      tag: "",
      date: "",
      day: "",
      month: "",
    },

    property_requirements: "furnished",

    bedrooms: "any",
    bathrooms: "any",
    car_spaces: "any",
    keywords: "",

    price_start: "",
    price_end: "",
    size_of_land: "",
  });

  const onBuyInputChange = (e) => {
    const { name, value } = e.target;

    setBuyCheckboxs({ ...BuyCheckboxs, [name]: value });
  };

  const onSoldInputChange = (e) => {
    const { name, value } = e.target;
    setSoldCheckboxs({ ...SoldCheckboxs, [name]: value });
  };

  const onRentInputChange = (e) => {
    const { name, value } = e.target;
    setRentCheckboxs({ ...RentCheckboxs, [name]: value });
  };

  const handelSerach = async () => {
    // if (isActive === FilterTab[0]) {
    //   navigate(`/buy`);
    // }
    // if (isActive === FilterTab[1]) {
    //   navigate(`/sold`);
    // }
    // if (isActive === FilterTab[2]) {
    //   navigate(`/rent`);
    // }
    // setIsOpen(false);
  };
  function scrolltoId() {
    var access = document.getElementById(id);
    access?.scrollIntoView({ behavior: "smooth" }, true);
  }
  // setTimeout(() => {
  //   scrolltoId();
  // }, 100);

  const handel = async () => {
    // ====================senddata=====
    if (dataCount === 0) {
      navigate(`/${search}`);
      setIsOpen(false)
    } else {
      if (isActive === "Buy") {
        const encryptedData = JSON.stringify({
          new_or_established_checked:
            BuyCheckboxs?.new_or_established_checked || undefined,
          Bedrooms: BuyCheckboxs?.bedrooms || undefined,
          Bathrooms: BuyCheckboxs?.bathrooms || undefined,
          price_min: BuyCheckboxs?.price_start || undefined,
          price_max: BuyCheckboxs?.price_end || undefined,
          size_of_land: BuyCheckboxs?.size_of_land || undefined,
          property_type: BuyCheckboxs?.Property_type || undefined,
          climate_energy: BuyCheckboxs?.climate_energy || undefined,
          indoor_features: BuyCheckboxs?.indoor_features || undefined,
          outdoor_features: BuyCheckboxs?.outdoor_features || undefined,
          status: isActive === "Buy" ? "Active" : isActive,
        });
        setIsOpen(false);
        navigate(`/buy?encryptedData=${encodeURIComponent(encryptedData)}`);
      } else if (isActive === "Sold") {
        const encryptedData = JSON.stringify({
          new_or_established_checked:
            SoldCheckboxs?.new_or_established_checked || undefined,
          Bedrooms: SoldCheckboxs?.bedrooms || undefined,
          Bathrooms: SoldCheckboxs?.bathrooms || undefined,
          price_min: SoldCheckboxs?.price_start || undefined,
          price_max: SoldCheckboxs?.price_end || undefined,
          size_of_land: SoldCheckboxs?.size_of_land || undefined,
          property_type: SoldCheckboxs?.Property_type || undefined,
          climate_energy: SoldCheckboxs?.climate_energy || undefined,
          indoor_features: SoldCheckboxs?.indoor_features || undefined,
          outdoor_features: SoldCheckboxs?.outdoor_features || undefined,
          status: isActive === "Buy" ? "Active" : isActive,
        });
        setIsOpen(false);

        navigate(`/sold?encryptedData=${encodeURIComponent(encryptedData)}`);
      } else {
        const encryptedData = JSON.stringify({
          new_or_established_checked:
            RentCheckboxs?.new_or_established_checked || undefined,
          Bedrooms: RentCheckboxs?.bedrooms || undefined,
          Bathrooms: RentCheckboxs?.bathrooms || undefined,
          price_min: RentCheckboxs?.price_start || undefined,
          price_max: RentCheckboxs?.price_end || undefined,
          size_of_land: RentCheckboxs?.size_of_land || undefined,
          property_type: RentCheckboxs?.Property_type || undefined,
          climate_energy: RentCheckboxs?.climate_energy || undefined,
          indoor_features: RentCheckboxs?.indoor_features || undefined,
          outdoor_features: RentCheckboxs?.outdoor_features || undefined,
          status: isActive === "Buy" ? "Active" : isActive,
        });
        setIsOpen(false);

        navigate(`/rent?encryptedData=${encodeURIComponent(encryptedData)}`);
      }
    }
  };

  const clearAll = () => {
    setSendData(sendData?.map((item) => ({ ...item, isChecked: false })));
    setBuyCheckboxs({
      all_types: false,
      indoor_features: [],
      outdoor_features: [],
      climate_energy: [],
      heating_cooling: [],
      Property_type: [],
      bedrooms: "",
      bathrooms: "",
      car_spaces: "",
      new_or_established_checked: "",
      method_of_sale: "",
      keywords: "",
      price_start: "",
      price_end: "",
      size_of_land: "",
      outdoor_feature: false,
    });
    setSoldCheckboxs({
      indoor_features: [],
      outdoor_features: [],
      climate_energy: [],
      Property_type: [],
      bedrooms: "",
      bathrooms: "",
      car_spaces: "",
      keywords: "",
      price_start: "",
      price_end: "",
      show_sold_price: false,
      size_of_land: "",
    });
    setRentCheckboxs({
      all_types: "",
      indoor_features: [],
      outdoor_features: [],
      climate_energy: [],
      Property_type: [],
      available_date: {
        tag: "",
        date: "",
        day: "",
        month: "",
      },
      property_requirements: "furnished",
      bedrooms: "",
      bathrooms: "",
      car_spaces: "",
      keywords: "",
      price_start: "",
      price_end: "",
      size_of_land: "",
    });
  };

  const handleAllTypesButtonClick = () => {
    setIsSelectAllBuy(!isSelectAllBuy);
    setIsSelectAllSold(!isSelectAllSold);
    setIsSelectAllRent(!isSelectAllRent);
    const allTypesSelected =
      BuyCheckboxs?.Property_type?.length === TypeOfProperty?.length;
    let updatedFeatures;
    if (allTypesSelected) {
      // Deselect all property types
      updatedFeatures = [];
    } else {
      // Select all property types
      updatedFeatures = TypeOfProperty?.map((type) => type.name);
    }

    setBuyCheckboxs({
      ...BuyCheckboxs,
      Property_type: updatedFeatures,
    });
  };
  const handleAllTypesButtonClickSold = () => {
    const allTypesSelected =
      SoldCheckboxs?.Property_type?.length === TypeOfProperty?.length;
    let updatedFeatures;

    if (allTypesSelected) {
      // Deselect all property types
      updatedFeatures = [];
    } else {
      // Select all property types
      updatedFeatures = TypeOfProperty?.map((type) => type.name);
    }

    setSoldCheckboxs({
      ...SoldCheckboxs,
      Property_type: updatedFeatures,
    });
  };
  const handleAllTypesButtonClickRent = () => {
    const allTypesSelected =
      RentCheckboxs?.Property_type?.length === TypeOfProperty?.length;
    let updatedFeatures;

    if (allTypesSelected) {
      // Deselect all property types
      updatedFeatures = [];
    } else {
      // Select all property types
      updatedFeatures = TypeOfProperty?.map((type) => type.name);
    }

    setRentCheckboxs({
      ...RentCheckboxs,
      Property_type: updatedFeatures,
    });
  };

  const handlePropertyTypeCheckboxChange = (name) => {
    const isSelected = BuyCheckboxs?.Property_type?.some(
      (data) => data === name
    );
    let updatedFeatures;
    if (isSelected) {
      // Deselect the property type
      updatedFeatures = BuyCheckboxs?.Property_type?.filter(
        (data) => data !== name
      );
    } else {
      // Select the property type
      updatedFeatures = [...BuyCheckboxs?.Property_type, name];
    }
    if (isSelectAllBuy) {
      setIsSelectAllBuy(false)
      updatedFeatures = BuyCheckboxs?.Property_type?.filter(
        (data) => data == name
      );
    }

    setBuyCheckboxs({
      ...BuyCheckboxs,
      Property_type: updatedFeatures,
    });
  };
  const handlePropertyTypeCheckboxChangeSold = (name) => {
    const isSelected = SoldCheckboxs?.Property_type?.some(
      (data) => data === name
    );
    let updatedFeatures;

    if (isSelected) {
      // Deselect the property type
      updatedFeatures = SoldCheckboxs?.Property_type?.filter(
        (data) => data !== name
      );
    } else {
      // Select the property type
      updatedFeatures = [...SoldCheckboxs?.Property_type, name];
    }

    if (isSelectAllSold) {
      setIsSelectAllSold(false)
      updatedFeatures = SoldCheckboxs?.Property_type?.filter(
        (data) => data == name
      );
    }

    setSoldCheckboxs({
      ...SoldCheckboxs,
      Property_type: updatedFeatures,
    });
  };
  const handlePropertyTypeCheckboxChangeRent = (name) => {
    const isSelected = RentCheckboxs?.Property_type?.some(
      (data) => data === name
    );
    let updatedFeatures;

    if (isSelected) {
      // Deselect the property type
      updatedFeatures = RentCheckboxs?.Property_type?.filter(
        (data) => data !== name
      );
    } else {
      // Select the property type
      updatedFeatures = [...RentCheckboxs?.Property_type, name];
    }

    if (isSelectAllRent) {
      setIsSelectAllRent(false)
      updatedFeatures = RentCheckboxs?.Property_type?.filter(
        (data) => data == name
      );
    }

    setRentCheckboxs({
      ...RentCheckboxs,
      Property_type: updatedFeatures,
    });
  };

  return (
    <>
      {IsOpen === true && (
        <div className="fixed top-0 left-[0%] z-[9999999999999] w-full h-full  backdrop-brightness-50 grid place-items-center place-content-center">
          <div className="h-auto sm:max-w-[600px] filter-screen-model outline-none bg-white rounded-lg shadow-2xl mx-5">
            {/* ------ Header ------ */}
            <div>
              <div className="flex justify-between items-center m-5">
                <div className="text-[#404040] font-extrabold text-lg  md:text-xl lg:text-2xl">
                  Filter
                </div>
                <img
                  src={closeIcon}
                  alt="icon"
                  className="w-5 cursor-pointer"
                  onClick={(e) => setIsOpen(false)}
                />
              </div>
              <div className="border-t border-t-[#E5E5E5]" />
            </div>
            {/* ------ Content ------ */}
            <>
              <div className="px-5 max-h-[600px] overflow-y-scroll ">
                <div
                  id="navigation"
                  className="w-full grid place-items-start rounded-xl mt-5 scrollBarHidden"
                >
                  <div className="w-full flex justify-start items-end border border-b border-transparent overflow-x-scroll border-b-[#E5E5E5]">
                    {FilterTab?.length > 0 &&
                      FilterTab?.map((d, index) => (
                        <div
                          key={index}
                          className={`${NormalTab} ${isActive === d ? ActiveTab : ""
                            }`}
                          onClick={() => {
                            handleClickToActive(d);
                          }}
                        >
                          {d}
                        </div>
                      ))}
                  </div>
                </div>

                {isActive === FilterTab[0] && (
                  <>
                    {/* --------- Type of Property --------- */}

                    <div
                      className="text-[#404040] font-semibold text-sm md:text-base my-5 md:my-8 pt-54"
                      href="#type"
                      id="Property"
                    >
                      Type of Property
                      <div className="flex flex-wrap justify-start items-center gap-4 my-2 py-2">
                        <div
                          className={
                            BuyCheckboxs?.Property_type?.length ===
                              TypeOfProperty?.length
                              ? "flex bg-[#FFEAEF] px-3 py-2 rounded-3xl ring-1 ring-[#E5002A] font-medium text-xs md:text-sm cursor-pointer"
                              : "flex bg-[#FFFF] px-3 py-2 rounded-3xl ring-1 ring-[#E5E5E5] font-medium text-xs md:text-sm cursor-pointer"
                          }
                          onClick={handleAllTypesButtonClick}
                        >
                          <label> All types</label>
                        </div>
                        {TypeOfProperty?.length > 0 &&
                          TypeOfProperty?.map((d, index) => (
                            <div
                              key={index}
                              className={`${normalBox} ${BuyCheckboxs?.Property_type?.length === TypeOfProperty?.length ? ""
                                : BuyCheckboxs?.Property_type?.some((data) => data === d?.name) ? selectedBox : ""
                                }`}
                              onClick={() =>
                                handlePropertyTypeCheckboxChange(d?.name)
                              }
                            >
                              {d?.title}
                              {BuyCheckboxs?.Property_type?.includes(d?.name) &&
                                !(
                                  BuyCheckboxs?.Property_type?.length ===
                                  TypeOfProperty?.length
                                ) ? (
                                <div className="grid place-content-center rounded-2xl">
                                  <input
                                    type="checkbox"
                                    name={d?.name}
                                    defaultChecked={true}
                                    className="w-3 h-3 accent-[#E5002A] cursor-pointer"
                                  />
                                </div>
                              ) : null}
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="border-t border-t-[#E5E5E5]" />
                    {/* ---------  Price Range --------- */}
                    <div
                      id="Price"
                      className="text-[#404040] font-semibold text-sm md:text-base my-5 md:my-8"
                    >
                      Price Range
                      {/* <div className="grid place-items-center mx-5 mt-4 md:mt-6">
                        <img
                          src={Bar}
                          alt="bar-chart"
                          className="px-3 md:px-5 cursor-pointer"
                        />
                        <CustomSlider
                          SelectedRange={SelectedRange}
                          setSelectedRange={setSelectedRange}
                        />
                      </div> */}
                      <div className="flex flex-col md:flex-row justify-center items-center gap-4 font-medium mt-4">
                        <select
                          name="price_start"
                          value={BuyCheckboxs?.price_start}
                          onChange={onBuyInputChange}
                          className="round w-full !text-[#171717] text-xs md:text-sm outline-none border border-[#E5E5E5] rounded-[28px] py-2 px-5 cursor-pointer "
                        >
                          <option value="50000">Min $ 50,000</option>
                          <option value="75000">Min $ 75,000</option>
                          <option value="100000">Min $ 1,00,000</option>
                          <option value="200000">Min $ 2,00,000</option>
                        </select>
                        <select
                          name="price_end"
                          value={BuyCheckboxs?.price_end}
                          onChange={onBuyInputChange}
                          className="round w-full !text-[#171717] text-xs md:text-sm outline-none border border-[#E5E5E5] rounded-[28px] py-2 px-5 cursor-pointer "
                        >
                          <option value="15000000">Max $1,50,00,000</option>
                          <option value="10000000">Max $1,00,00,000</option>
                          <option value="5000000">Max $50,00,000</option>
                        </select>
                      </div>
                    </div>

                    <div className="border-t border-t-[#E5E5E5]" />

                    {/* ---------  Bedrooms, Bathrooms & Car Space --------- */}

                    <div
                      className="text-[#404040] font-semibold text-sm md:text-base my-5 md:my-8"
                      id="Bed"
                    >
                      Bedrooms, Bathrooms & Car Space
                      <div className="text-[#404040] font-semibold text-xs  mt-4 md:mt-6">
                        Bedrooms
                      </div>
                      <div className="flex justify-start items-center overflow-x-auto gap-4 my-2 py-2">
                        {Bedrooms?.length > 0 &&
                          Bedrooms?.map((d, index) => (
                            <div
                              key={index}
                              className={`${normalBox} ${BuyCheckboxs?.bedrooms === d?.name
                                ? selectedBox
                                : ""
                                }`}
                              onClick={() => {
                                setBuyCheckboxs((prev) => ({
                                  ...prev,
                                  bedrooms:
                                    prev.bedrooms === d?.name ? null : d?.name,
                                }));
                              }}
                            >
                              {d?.title}
                            </div>
                          ))}
                      </div>
                      <div className="text-[#404040] font-semibold text-xs  mt-4 md:mt-6">
                        Bathrooms
                      </div>
                      <div className="flex justify-start items-center overflow-x-auto gap-4 my-2 py-2">
                        {Bathrooms?.length > 0 &&
                          Bathrooms?.map((d, index) => (
                            <div
                              key={index}
                              className={`${normalBox} ${BuyCheckboxs?.bathrooms === d?.name
                                ? selectedBox
                                : ""
                                }`}
                              onClick={() => {
                                setBuyCheckboxs((prev) => ({
                                  ...prev,
                                  bathrooms:
                                    prev.bathrooms === d?.name ? null : d?.name,
                                }));
                              }}
                            >
                              {d?.title}
                            </div>
                          ))}
                      </div>
                      <div className="text-[#404040] font-semibold text-xs  mt-4 md:mt-6">
                        Car Spaces
                      </div>
                      <div className="flex justify-start items-center overflow-x-auto gap-4 my-2 py-2">
                        {CarSpaces?.length > 0 &&
                          CarSpaces?.map((d, index) => (
                            <div
                              key={index}
                              className={`${normalBox} ${BuyCheckboxs?.car_spaces === d?.name
                                ? selectedBox
                                : ""
                                }`}
                              onClick={() => {
                                setBuyCheckboxs((prev) => ({
                                  ...prev,
                                  car_spaces:
                                    prev.car_spaces === d?.name
                                      ? null
                                      : d?.name,
                                }));
                              }}
                            >
                              {d?.title}
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="border-t border-t-[#E5E5E5]" />

                    {/* ---------  Size of Land --------- */}

                    <div className="text-[#404040] font-semibold text-sm md:text-base my-5 md:my-8">
                      Size of Land
                      {/* <div className="grid place-items-center mx-5 mt-4 md:mt-6">
                        <img
                          src={Bar}
                          alt="bar-chart"
                          className="px-3 md:px-5 cursor-pointer"
                        />
                        <CustomSlider
                          SelectedRange={SelectedRange}
                          setSelectedRange={setSelectedRange}
                        />
                      </div> */}
                      <div className="flex flex-col md:flex-row justify-center items-center gap-4 font-medium mt-4">
                        <select
                          name="size_of_land"
                          value={BuyCheckboxs?.size_of_land}
                          onChange={onBuyInputChange}
                          className="round w-full !text-[#171717] text-xs md:text-sm outline-none border border-[#E5E5E5] rounded-[28px] py-2 px-5 cursor-pointer "
                        >
                          <option value="200000">Min 2,00,000 m2</option>
                          <option value="250000">Min 2,50,000 m2</option>
                          <option value="300000">Min 3,00,000 m2</option>
                        </select>
                      </div>
                    </div>

                    <div className="border-t border-t-[#E5E5E5]" />

                    {/* --------- New Property or Established Property --------- */}

                    <div className="text-[#404040] font-semibold text-sm md:text-base my-5 md:my-8">
                      New Property or Established Property
                      <div className="flex flex-wrap justify-start items-center gap-4 my-4">
                        {NewOrEstablished?.length > 0 &&
                          NewOrEstablished?.map((d, index) => (
                            <div
                              key={index}
                              className={`${normalBox} ${BuyCheckboxs?.new_or_established_checked ===
                                d?.name
                                ? selectedBox
                                : ""
                                }`}
                              onClick={() => {
                                setBuyCheckboxs({
                                  ...BuyCheckboxs,
                                  new_or_established_checked: d?.name,
                                });
                              }}
                            >
                              <div>{d?.title}</div>
                              <div className="grid place-content-center rounded-2xl">
                                <input
                                  type="checkbox"
                                  checked={
                                    BuyCheckboxs?.new_or_established_checked ===
                                    d?.name
                                  }
                                  className="w-3 h-3 accent-[#E5002A] cursor-pointer"
                                />
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="border-t border-t-[#E5E5E5]" />

                    {/* ---------  Outdoor & Indoor Features --------- */}

                    <div className="text-[#404040] font-semibold text-sm md:text-base my-5 md:my-8">
                      Outdoor & Indoor Features
                      <div className="text-[#404040] font-semibold text-xs  mt-4 md:mt-6">
                        Outdoor Features
                      </div>
                      <div className="flex flex-wrap justify-start items-center gap-4 my-2 py-2">
                        {OutdoorFeatures?.length > 0 &&
                          OutdoorFeatures?.map((d, index) => (
                            <div
                              key={index}
                              className={`${normalBox} ${BuyCheckboxs?.outdoor_features?.some(
                                (data) => data === d?.name
                              )
                                ? selectedBox
                                : ""
                                }`}
                              onClick={() => {
                                const isSelected =
                                  BuyCheckboxs?.outdoor_features?.some(
                                    (data) => data === d?.name
                                  );
                                let updatedFeatures;
                                if (isSelected) {
                                  // Item is already selected, remove it from the array
                                  updatedFeatures =
                                    BuyCheckboxs.outdoor_features?.filter(
                                      (data) => data !== d?.name
                                    );
                                } else {
                                  // Item is not selected, add it to the array
                                  updatedFeatures = [
                                    ...BuyCheckboxs?.outdoor_features,
                                    d?.name,
                                  ];
                                }
                                setBuyCheckboxs({
                                  ...BuyCheckboxs,
                                  outdoor_features: updatedFeatures,
                                });
                              }}
                            >
                              {d?.title}
                              {BuyCheckboxs?.outdoor_features
                                ?.filter((data) => data == d?.name)
                                .map((filteredData) => (
                                  <div className="grid place-content-center rounded-2xl">
                                    <input
                                      type="checkbox"
                                      name={d?.name}
                                      defaultChecked={BuyCheckboxs?.outdoor_features?.filter(
                                        (data) => data === d?.name
                                      )}
                                      className="w-3 h-3 accent-[#E5002A] cursor-pointer"
                                    />
                                  </div>
                                ))}
                            </div>
                          ))}
                      </div>
                      <div className="text-[#404040] font-semibold text-xs  mt-4 md:mt-6">
                        Indoor Features
                      </div>
                      {/* ------------------------------ */}
                      <div className="flex flex-wrap justify-start items-center gap-4 my-2 py-2">
                        {IndoorFeatures?.length > 0 &&
                          IndoorFeatures?.map((d, index) => (
                            <div
                              key={index}
                              className={`${normalBox} ${BuyCheckboxs?.indoor_features?.some(
                                (data) => data === d?.name
                              )
                                ? selectedBox
                                : ""
                                }`}
                              onClick={() => {
                                const isSelected =
                                  BuyCheckboxs?.indoor_features?.some(
                                    (data) => data === d?.name
                                  );
                                let updatedFeatures;
                                if (isSelected) {
                                  // Item is already selected, remove it from the array
                                  updatedFeatures =
                                    BuyCheckboxs?.indoor_features?.filter(
                                      (data) => data !== d?.name
                                    );
                                } else {
                                  // Item is not selected, add it to the array
                                  updatedFeatures = [
                                    ...BuyCheckboxs?.indoor_features,
                                    d?.name,
                                  ];
                                }
                                setBuyCheckboxs({
                                  ...BuyCheckboxs,
                                  indoor_features: updatedFeatures,
                                });
                              }}
                            >
                              {d?.title}
                              {BuyCheckboxs?.indoor_features
                                ?.filter((data) => data == d?.name)
                                .map((filteredData) => (
                                  <div className="grid place-content-center rounded-2xl">
                                    <input
                                      type="checkbox"
                                      name={d?.name}
                                      defaultChecked={BuyCheckboxs?.indoor_features?.filter(
                                        (data) => data === d?.name
                                      )}
                                      className="w-3 h-3 accent-[#E5002A] cursor-pointer"
                                    />
                                  </div>
                                ))}
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="border-t border-t-[#E5E5E5]" />

                    {/* ---------  Climate Changer & Energy Saver --------- */}

                    <div className="text-[#404040] font-semibold text-sm md:text-base my-5 md:my-8">
                      Climate Changer & Energy Saver
                      <div className="flex flex-wrap justify-start items-center gap-4 my-2 py-2">
                        {ClimateChangerAndEnergySaver?.length > 0 &&
                          ClimateChangerAndEnergySaver?.map((d, index) => (
                            <div
                              key={index}
                              className={`${normalBox} ${BuyCheckboxs?.climate_energy?.some(
                                (data) => data === d?.name
                              )
                                ? selectedBox
                                : ""
                                }`}
                              onClick={() => {
                                const isSelected =
                                  BuyCheckboxs?.climate_energy?.some(
                                    (data) => data === d?.name
                                  );
                                let updatedFeatures;
                                if (isSelected) {
                                  // Item is already selected, remove it from the array
                                  updatedFeatures =
                                    BuyCheckboxs.climate_energy?.filter(
                                      (data) => data !== d?.name
                                    );
                                } else {
                                  // Item is not selected, add it to the array
                                  updatedFeatures = [
                                    ...BuyCheckboxs.climate_energy,
                                    d?.name,
                                  ];
                                }
                                setBuyCheckboxs({
                                  ...BuyCheckboxs,
                                  climate_energy: updatedFeatures,
                                });
                              }}
                            >
                              {d?.title}
                              {BuyCheckboxs?.climate_energy
                                ?.filter((data) => data == d?.name)
                                .map((filteredData) => (
                                  <div className="grid place-content-center rounded-2xl">
                                    <input
                                      type="checkbox"
                                      name={d?.name}
                                      defaultChecked={BuyCheckboxs?.climate_energy?.filter(
                                        (data) => data === d?.name
                                      )}
                                      className="w-3 h-3 accent-[#E5002A] cursor-pointer"
                                    />
                                  </div>
                                ))}
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="border-t border-t-[#E5E5E5]" />

                    {/* --------- Keywords --------- */}

                    <div className="text-[#404040] font-semibold text-sm md:text-base my-5 md:my-8">
                      Keywords
                      <div className="w-full flex justify-start items-center border border-[#E5E5E5] rounded-3xl py-3 px-5 cursor-pointer mt-4 md:mt-6">
                        <input
                          type="text"
                          name="keywords"
                          value={BuyCheckboxs?.keywords}
                          onChange={onBuyInputChange}
                          placeholder="Air con, pool, garage, solar, ensuite...."
                          className="w-full text-[#737373] font-medium text-xs md:text-sm outline-none"
                        />
                      </div>
                      <div className="text-[#404040] font-normal text-xs mt-2 px-2">
                        Add specific property features to your search
                      </div>
                    </div>
                    <div className="border-t border-t-[#E5E5E5]" />
                    {/* --------- Method of Sale --------- */}
                    <div className="text-[#404040] font-semibold text-sm md:text-base my-5 md:my-8">
                      Method of Sale
                      <div className="flex flex-wrap justify-start items-center gap-4 my-4 md:my-6">
                        {MethodOfSale?.length > 0 &&
                          MethodOfSale?.map((d, index) => (
                            <div
                              key={index}
                              className={`${normalBox} ${BuyCheckboxs?.method_of_sale === d?.name
                                ? selectedBox
                                : ""
                                }`}
                              onClick={() => {
                                setBuyCheckboxs({
                                  ...BuyCheckboxs,
                                  method_of_sale: d?.name,
                                });
                              }}
                            >
                              <div>{d?.title}</div>
                              <div className="grid place-content-center rounded-2xl">
                                <input
                                  type="checkbox"
                                  checked={
                                    BuyCheckboxs?.method_of_sale === d?.name
                                  }
                                  className="w-3 h-3 accent-[#E5002A] cursor-pointer"
                                />
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="border-t border-t-[#E5E5E5]" />

                    {/* --------- T & C --------- */}

                    <div className="flex justify-start items-center gap-3 md:text-sm my-4 md:my-8">
                      <input
                        type="checkbox"
                        name="outdoor_feature"
                        checked={BuyCheckboxs?.outdoor_feature}
                        onChange={(e) => {
                          const { checked } = e.target;
                          setBuyCheckboxs({
                            ...BuyCheckboxs,
                            outdoor_feature: checked,
                          });
                        }}
                        className="w-4 h-4 accent-[#E5002A] cursor-pointer"
                      />
                      <div className="text-[#404040] font-medium text-xs md:text-sm ">
                        Outdoor Features
                      </div>
                    </div>
                  </>
                )}

                {isActive === FilterTab[1] && (
                  <>
                    {/* --------- Type of Property --------- */}

                    <div
                      className="text-[#404040] font-semibold text-sm md:text-base my-5 md:my-8 pt-54"
                      href="#type"
                      id="Property"
                    >
                      Type of Property
                      <div className="flex flex-wrap justify-start items-center gap-4 my-2 py-2">
                        <div
                          className={
                            SoldCheckboxs?.Property_type?.length ===
                              TypeOfProperty?.length
                              ? "flex bg-[#FFEAEF] px-3 py-2 rounded-3xl ring-1 ring-[#E5002A] font-medium text-xs md:text-sm cursor-pointer"
                              : "flex bg-[#FFFF] px-3 py-2 rounded-3xl ring-1 ring-[#E5E5E5] font-medium text-xs md:text-sm cursor-pointer"
                          }
                          onClick={handleAllTypesButtonClickSold}
                        >
                          <label> All types</label>
                        </div>
                        {TypeOfProperty?.length > 0 &&
                          TypeOfProperty?.map((d, index) => (
                            <div
                              key={index}
                              className={`${normalBox} ${SoldCheckboxs?.Property_type?.length ===
                                TypeOfProperty?.length ? "" : SoldCheckboxs?.Property_type?.some(
                                  (data) => data === d?.name
                                )
                                ? selectedBox
                                : ""
                                }`}
                              onClick={() =>
                                handlePropertyTypeCheckboxChangeSold(d?.name)
                              }
                            >
                              {d?.title}
                              {SoldCheckboxs?.Property_type?.includes(
                                d?.name
                              ) &&
                                !(
                                  SoldCheckboxs?.Property_type?.length ===
                                  TypeOfProperty?.length
                                ) ? (
                                <div className="grid place-content-center rounded-2xl">
                                  <input
                                    type="checkbox"
                                    name={d?.name}
                                    defaultChecked={true}
                                    className="w-3 h-3 accent-[#E5002A] cursor-pointer"
                                  />
                                </div>
                              ) : null}
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="border-t border-t-[#E5E5E5]" />

                    {/* ---------  Price Range --------- */}

                    <div
                      className="text-[#404040] font-semibold text-sm md:text-base my-5 md:my-8"
                      id="Price"
                    >
                      Price Range
                      {/* <div className="grid place-items-center mx-5 mt-4 md:mt-6">
                        <img
                          src={Bar}
                          alt="bar-chart"
                          className="px-3 md:px-5 cursor-pointer"
                        />
                        <CustomSlider
                          SelectedRange={SelectedRange}
                          setSelectedRange={setSelectedRange}
                        />
                      </div> */}
                      <div className="flex flex-col md:flex-row justify-center items-center gap-4 font-medium mt-4">
                        <select
                          name="price_start"
                          value={SoldCheckboxs?.price_start}
                          onChange={onSoldInputChange}
                          className="round w-full !text-[#171717] text-xs md:text-sm outline-none border border-[#E5E5E5] rounded-[28px] py-2 px-5 cursor-pointer "
                        >
                          <option value="50000">Min $ 50,000</option>
                          <option value="100000">Min $ 1,00,000</option>
                          <option value="200000">Min $ 2,00,000</option>
                        </select>
                        <select
                          name="select"
                          className="round w-full !text-[#171717] text-xs md:text-sm outline-none border border-[#E5E5E5] rounded-[28px] py-2 px-5 cursor-pointer "
                        >
                          <option value="15000000">Max $1,50,00,000</option>
                          <option value="10000000">Max $1,00,00,000</option>
                          <option value="5000000">Max $50,00,000</option>
                        </select>
                      </div>
                      <div className="flex justify-start items-center gap-3 mt-2 px-2">
                        <input
                          type="checkbox"
                          name="show_sold_price"
                          checked={SoldCheckboxs?.show_sold_price}
                          onChange={(e) => {
                            const { checked } = e.target;
                            setSoldCheckboxs({
                              ...SoldCheckboxs,
                              show_sold_price: checked,
                            });
                          }}
                          className="w-3 h-3 accent-[#E5002A] cursor-pointer"
                        />
                        <div className="text-[#737373] font-medium text-xs ">
                          Only show properties with a sold price
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-t-[#E5E5E5]" />

                    {/* ---------  Bedrooms, Bathrooms & Car Space --------- */}

                    <div
                      className="text-[#404040] font-semibold text-sm md:text-base my-5 md:my-8"
                      id="Bed"
                    >
                      Bedrooms, Bathrooms & Car Space
                      <div className="text-[#404040] font-semibold text-xs  mt-4 md:mt-6">
                        Bedrooms
                      </div>
                      <div className="flex justify-start items-center overflow-x-auto gap-4 my-2 py-2">
                        {Bedrooms?.length > 0 &&
                          Bedrooms?.map((d, index) => (
                            <div
                              key={index}
                              className={`${normalBox} ${SoldCheckboxs?.bedrooms === d?.name
                                ? selectedBox
                                : ""
                                }`}
                              onClick={() => {
                                setSoldCheckboxs((prev) => ({
                                  ...prev,
                                  bedrooms:
                                    prev.bedrooms === d?.name ? null : d?.name,
                                }));
                              }}
                            >
                              {d?.title}
                            </div>
                          ))}
                      </div>
                      <div className="text-[#404040] font-semibold text-xs  mt-4 md:mt-6">
                        Bathrooms
                      </div>
                      <div className="flex justify-start items-center overflow-x-auto gap-4 my-2 py-2">
                        {Bathrooms?.length > 0 &&
                          Bathrooms?.map((d, index) => (
                            <div
                              key={index}
                              className={`${normalBox} ${SoldCheckboxs?.bathrooms === d?.name
                                ? selectedBox
                                : ""
                                }`}
                              onClick={() => {
                                setSoldCheckboxs((prev) => ({
                                  ...prev,
                                  bathrooms:
                                    prev.bathrooms === d?.name ? null : d?.name,
                                }));
                              }}
                            >
                              {d?.title}
                            </div>
                          ))}
                      </div>
                      <div className="text-[#404040] font-semibold text-xs  mt-4 md:mt-6">
                        Car Spaces
                      </div>
                      <div className="flex justify-start items-center overflow-x-auto gap-4 my-2 py-2">
                        {CarSpaces?.length > 0 &&
                          CarSpaces?.map((d, index) => (
                            <div
                              key={index}
                              className={`${normalBox} ${SoldCheckboxs?.car_spaces === d?.name
                                ? selectedBox
                                : ""
                                }`}
                              onClick={() => {
                                setSoldCheckboxs((prev) => ({
                                  ...prev,
                                  car_spaces:
                                    prev.car_spaces === d?.name
                                      ? null
                                      : d?.name,
                                }));
                              }}
                            >
                              {d?.title}
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="border-t border-t-[#E5E5E5]" />

                    {/* ---------  Size of Land --------- */}

                    <div className="text-[#404040] font-semibold text-sm md:text-base my-5 md:my-8">
                      Size of Land
                      {/* <div className="grid place-items-center mx-5 mt-4 md:mt-6">
                        <img
                          src={Bar}
                          alt="bar-chart"
                          className="px-3 md:px-5 cursor-pointer"
                        />
                        <CustomSlider
                          SelectedRange={SelectedRange}
                          setSelectedRange={setSelectedRange}
                        />
                      </div> */}
                      <div className="flex flex-col md:flex-row justify-center items-center gap-4 font-medium mt-4">
                        <select
                          name="size_of_land"
                          value={SoldCheckboxs?.size_of_land}
                          onChange={onBuyInputChange}
                          className="round w-full !text-[#171717] text-xs md:text-sm outline-none border border-[#E5E5E5] rounded-[28px] py-2 px-5 cursor-pointer "
                        >
                          <option value="2,00,000 m2">Min 2,00,000 m2</option>
                          <option value="2,50,000 m2">Min 2,50,000 m2</option>
                          <option value="3,00,000 m2">Min 3,00,000 m2</option>
                        </select>
                      </div>
                    </div>

                    <div className="border-t border-t-[#E5E5E5]" />

                    {/* ---------  Outdoor & Indoor Features --------- */}

                    <div className="text-[#404040] font-semibold text-sm md:text-base my-5 md:my-8">
                      Outdoor & Indoor Features
                      <div className="text-[#404040] font-semibold text-xs  mt-4 md:mt-6">
                        Outdoor Features
                      </div>
                      <div className="flex flex-wrap justify-start items-center gap-4 my-2 py-2">
                        {OutdoorFeatures?.length > 0 &&
                          OutdoorFeatures?.map((d, index) => (
                            <div
                              key={index}
                              className={`${normalBox} ${SoldCheckboxs?.outdoor_features?.some(
                                (data) => data === d?.name
                              )
                                ? selectedBox
                                : ""
                                }`}
                              onClick={() => {
                                const isSelected =
                                  SoldCheckboxs?.outdoor_features?.some(
                                    (data) => data === d?.name
                                  );
                                let updatedFeatures;
                                if (isSelected) {
                                  // Item is already selected, remove it from the array
                                  updatedFeatures =
                                    SoldCheckboxs.outdoor_features?.filter(
                                      (data) => data !== d?.name
                                    );
                                } else {
                                  // Item is not selected, add it to the array
                                  updatedFeatures = [
                                    ...SoldCheckboxs?.outdoor_features,
                                    d?.name,
                                  ];
                                }
                                setSoldCheckboxs({
                                  ...SoldCheckboxs,
                                  outdoor_features: updatedFeatures,
                                });
                              }}
                            >
                              {d?.title}
                              {SoldCheckboxs?.outdoor_features
                                ?.filter((data) => data == d?.name)
                                .map((filteredData) => (
                                  <div className="grid place-content-center rounded-2xl">
                                    <input
                                      type="checkbox"
                                      name={d?.name}
                                      defaultChecked={SoldCheckboxs?.outdoor_features?.filter(
                                        (data) => data === d?.name
                                      )}
                                      className="w-3 h-3 accent-[#E5002A] cursor-pointer"
                                    />
                                  </div>
                                ))}
                            </div>
                          ))}
                      </div>
                      <div className="text-[#404040] font-semibold text-xs  mt-4 md:mt-6">
                        Indoor Features
                      </div>
                      {/* ------------------------------ */}
                      <div className="flex flex-wrap justify-start items-center gap-4 my-2 py-2">
                        {IndoorFeatures?.length > 0 &&
                          IndoorFeatures?.map((d, index) => (
                            <div
                              key={index}
                              className={`${normalBox} ${SoldCheckboxs?.indoor_features?.some(
                                (data) => data === d?.name
                              )
                                ? selectedBox
                                : ""
                                }`}
                              onClick={() => {
                                const isSelected =
                                  SoldCheckboxs?.indoor_features?.some(
                                    (data) => data === d?.name
                                  );
                                let updatedFeatures;
                                if (isSelected) {
                                  // Item is already selected, remove it from the array
                                  updatedFeatures =
                                    SoldCheckboxs?.indoor_features?.filter(
                                      (data) => data !== d?.name
                                    );
                                } else {
                                  // Item is not selected, add it to the array
                                  updatedFeatures = [
                                    ...SoldCheckboxs?.indoor_features,
                                    d?.name,
                                  ];
                                }
                                setSoldCheckboxs({
                                  ...SoldCheckboxs,
                                  indoor_features: updatedFeatures,
                                });
                              }}
                            >
                              {d?.title}
                              {SoldCheckboxs?.indoor_features
                                ?.filter((data) => data == d?.name)
                                .map((filteredData) => (
                                  <div className="grid place-content-center rounded-2xl">
                                    <input
                                      type="checkbox"
                                      name={d?.name}
                                      defaultChecked={SoldCheckboxs?.indoor_features?.filter(
                                        (data) => data === d?.name
                                      )}
                                      className="w-3 h-3 accent-[#E5002A] cursor-pointer"
                                    />
                                  </div>
                                ))}
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="border-t border-t-[#E5E5E5]" />

                    {/* ---------  Climate Changer & Energy Saver --------- */}

                    <div className="text-[#404040] font-semibold text-sm md:text-base my-5 md:my-8">
                      Climate Changer & Energy Saver
                      <div className="flex flex-wrap justify-start items-center gap-4 my-2 py-2">
                        {ClimateChangerAndEnergySaver?.length > 0 &&
                          ClimateChangerAndEnergySaver?.map((d, index) => (
                            <div
                              key={index}
                              className={`${normalBox} ${SoldCheckboxs?.climate_energy?.some(
                                (data) => data === d?.name
                              )
                                ? selectedBox
                                : ""
                                }`}
                              onClick={() => {
                                const isSelected =
                                  SoldCheckboxs?.climate_energy?.some(
                                    (data) => data === d?.name
                                  );
                                let updatedFeatures;
                                if (isSelected) {
                                  // Item is already selected, remove it from the array
                                  updatedFeatures =
                                    SoldCheckboxs.climate_energy?.filter(
                                      (data) => data !== d?.name
                                    );
                                } else {
                                  // Item is not selected, add it to the array
                                  updatedFeatures = [
                                    ...SoldCheckboxs.climate_energy,
                                    d?.name,
                                  ];
                                }
                                setSoldCheckboxs({
                                  ...SoldCheckboxs,
                                  climate_energy: updatedFeatures,
                                });
                              }}
                            >
                              {d?.title}
                              {SoldCheckboxs?.climate_energy
                                ?.filter((data) => data == d?.name)
                                .map((filteredData) => (
                                  <div className="grid place-content-center rounded-2xl">
                                    <input
                                      type="checkbox"
                                      name={d?.name}
                                      defaultChecked={SoldCheckboxs?.climate_energy?.filter(
                                        (data) => data === d?.name
                                      )}
                                      className="w-3 h-3 accent-[#E5002A] cursor-pointer"
                                    />
                                  </div>
                                ))}
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="border-t border-t-[#E5E5E5]" />

                    {/* --------- Keywords --------- */}

                    <div className="text-[#404040] font-semibold text-sm md:text-base my-5 md:my-8">
                      Keywords
                      <div className="w-full flex justify-start items-center border border-[#E5E5E5] rounded-3xl py-3 px-5 cursor-pointer mt-4 md:mt-6">
                        <input
                          type="text"
                          name="keywords"
                          value={SoldCheckboxs?.keywords}
                          onChange={onBuyInputChange}
                          placeholder="Air con, pool, garage, solar, ensuite...."
                          className="w-full text-[#737373] font-medium text-xs md:text-sm outline-none"
                        />
                      </div>
                      <div className="text-[#404040] font-normal text-xs mt-2 px-2">
                        Add specific property features to your search
                      </div>
                    </div>

                    <div className="border-t border-t-[#E5E5E5]" />
                  </>
                )}

                {isActive === FilterTab[2] && (
                  <>
                    {/* --------- Type of Property --------- */}

                    <div
                      className="text-[#404040] font-semibold text-sm md:text-base my-5 md:my-8 pt-54"
                      href="#type"
                      id="Property"
                    >
                      Type of Property
                      <div className="flex flex-wrap justify-start items-center gap-4 my-2 py-2">
                        <div
                          className={
                            RentCheckboxs?.Property_type?.length ===
                              TypeOfProperty?.length
                              ? "flex bg-[#FFEAEF] px-3 py-2 rounded-3xl ring-1 ring-[#E5002A] font-medium text-xs md:text-sm cursor-pointer"
                              : "flex bg-[#FFFF] px-3 py-2 rounded-3xl ring-1 ring-[#E5E5E5] font-medium text-xs md:text-sm cursor-pointer"
                          }
                          onClick={handleAllTypesButtonClickRent}
                        >
                          <label> All types</label>
                        </div>
                        {TypeOfProperty?.length > 0 &&
                          TypeOfProperty?.map((d, index) => (
                            <div
                              key={index}
                              className={`${normalBox} ${RentCheckboxs?.Property_type?.length ===
                                TypeOfProperty?.length ? "" : RentCheckboxs?.Property_type?.some(
                                  (data) => data === d?.name
                                )
                                ? selectedBox
                                : ""
                                }`}
                              onClick={() =>
                                handlePropertyTypeCheckboxChangeRent(d?.name)
                              }
                            >
                              {d?.title}
                              {RentCheckboxs?.Property_type?.includes(
                                d?.name
                              ) &&
                                !(
                                  RentCheckboxs?.Property_type?.length ===
                                  TypeOfProperty?.length
                                ) ? (
                                <div className="grid place-content-center rounded-2xl">
                                  <input
                                    type="checkbox"
                                    name={d?.name}
                                    defaultChecked={true}
                                    className="w-3 h-3 accent-[#E5002A] cursor-pointer"
                                  />
                                </div>
                              ) : null}
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="border-t border-t-[#E5E5E5]" />

                    {/* ---------  Price Range --------- */}

                    <div
                      className="text-[#404040] font-semibold text-sm md:text-base my-5 md:my-8"
                      id="Price"
                    >
                      Price Range
                      {/* <div className="grid place-items-center mx-5 mt-4 md:mt-6">
                        <img
                          src={Bar}
                          alt="bar-chart"
                          className="px-3 md:px-5 cursor-pointer"
                        />
                        <CustomSlider
                          SelectedRange={SelectedRange}
                          setSelectedRange={setSelectedRange}
                        />
                      </div> */}
                      <div className="flex flex-col md:flex-row justify-center items-center gap-4 font-medium mt-4">
                        <select
                          name="price_start"
                          value={RentCheckboxs?.price_start}
                          onChange={onRentInputChange}
                          className="round w-full !text-[#171717] text-xs md:text-sm outline-none border border-[#E5E5E5] rounded-[28px] py-2 px-5 cursor-pointer "
                        >
                          <option value="50000">Min $ 50,000</option>
                          <option value="100000">Min $ 1,00,000</option>
                          <option value="200000">Min $ 2,00,000</option>
                        </select>
                        <select
                          name="select"
                          className="round w-full !text-[#171717] text-xs md:text-sm outline-none border border-[#E5E5E5] rounded-[28px] py-2 px-5 cursor-pointer "
                        >
                          <option value="15000000">Max $1,50,00,000</option>
                          <option value="10000000">Max $1,00,00,000</option>
                          <option value="5000000">Max $50,00,000</option>
                        </select>
                      </div>
                    </div>

                    <div className="border-t border-t-[#E5E5E5]" />

                    {/* ---------  Bedrooms, Bathrooms & Car Space --------- */}

                    <div
                      className="text-[#404040] font-semibold text-sm md:text-base my-5 md:my-8"
                      id="Bed"
                    >
                      Bedrooms, Bathrooms & Car Space
                      <div className="text-[#404040] font-semibold text-xs  mt-4 md:mt-6">
                        Bedrooms
                      </div>
                      <div className="flex justify-start items-center overflow-x-auto gap-4 my-2 py-2">
                        {Bedrooms?.length > 0 &&
                          Bedrooms?.map((d, index) => (
                            <div
                              key={index}
                              className={`${normalBox} ${RentCheckboxs?.bedrooms === d?.name
                                ? selectedBox
                                : ""
                                }`}
                              onClick={() => {
                                setRentCheckboxs((prev) => ({
                                  ...prev,
                                  bedrooms:
                                    prev.bedrooms === d?.name ? null : d?.name,
                                }));
                              }}
                            >
                              {d?.title}
                            </div>
                          ))}
                      </div>
                      <div className="text-[#404040] font-semibold text-xs  mt-4 md:mt-6">
                        Bathrooms
                      </div>
                      <div className="flex justify-start items-center overflow-x-auto gap-4 my-2 py-2">
                        {Bathrooms?.length > 0 &&
                          Bathrooms?.map((d, index) => (
                            <div
                              key={index}
                              className={`${normalBox} ${RentCheckboxs?.bathrooms === d?.name
                                ? selectedBox
                                : ""
                                }`}
                              onClick={() => {
                                setRentCheckboxs((prev) => ({
                                  ...prev,
                                  bathrooms:
                                    prev.bathrooms === d?.name ? null : d?.name,
                                }));
                              }}
                            >
                              {d?.title}
                            </div>
                          ))}
                      </div>
                      <div className="text-[#404040] font-semibold text-xs  mt-4 md:mt-6">
                        Car Spaces
                      </div>
                      <div className="flex justify-start items-center overflow-x-auto gap-4 my-2 py-2">
                        {CarSpaces?.length > 0 &&
                          CarSpaces?.map((d, index) => (
                            <div
                              key={index}
                              className={`${normalBox} ${RentCheckboxs?.car_spaces === d?.name
                                ? selectedBox
                                : ""
                                }`}
                              onClick={() => {
                                setRentCheckboxs((prev) => ({
                                  ...prev,
                                  car_spaces:
                                    prev.car_spaces === d?.name
                                      ? null
                                      : d?.name,
                                }));
                              }}
                            >
                              {d?.title}
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="border-t border-t-[#E5E5E5]" />

                    {/* ---------  Available Date --------- */}

                    <div className="text-[#404040] font-semibold text-sm md:text-base my-5 md:my-8">
                      Available Date
                      <div className="flex justify-start items-center gap-4 font-medium overflow-x-auto my-2 md:my-3 p-2">
                        {AvailableDate?.length > 0 &&
                          AvailableDate?.map((d, index) => (
                            <div
                              key={index}
                              className={`w-32 flex flex-col justify-start items-start gap-1 border border-[#E5E5E5] rounded-lg cursor-pointer p-2 ${RentCheckboxs?.available_date?.date ===
                                d?.date &&
                                RentCheckboxs?.available_date?.month ===
                                d?.month
                                ? selectedDate
                                : ""
                                }`}
                              onClick={() => {
                                setRentCheckboxs({
                                  ...RentCheckboxs,
                                  available_date: d,
                                });
                              }}
                            >
                              <div className="text-[#737373] font-normal text-xs">
                                {d?.tag}
                              </div>
                              <div className="flex flex-row justify-start items-end gap-2 font-medium ">
                                <div className="text-[#171717] font-extrabold text-xl md:text-2xl lg:text-3xl">
                                  {d?.date}
                                </div>
                                <div className="text-[#171717] font-extrabold text-sm md:text-base">
                                  {d?.month}
                                </div>
                              </div>
                              <div className="text-[#737373] font-medium text-xs">
                                {d?.day}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="border-t border-t-[#E5E5E5]" />

                    {/* ---------  Property Requirements --------- */}

                    <div className="text-[#404040] font-semibold text-sm md:text-base my-5 md:my-8">
                      Property Requirements
                      <div className="flex flex-wrap justify-start items-center gap-4 font-medium my-4 md:my-6">
                        {PropertyRequirements?.length > 0 &&
                          PropertyRequirements?.map((d, index) => (
                            <div
                              key={index}
                              className={`${normalBox} ${RentCheckboxs?.property_requirements === d?.name
                                ? selectedBox
                                : ""
                                }`}
                              onClick={() => {
                                setRentCheckboxs({
                                  ...RentCheckboxs,
                                  property_requirements: d?.name,
                                });
                              }}
                            >
                              <div>{d?.title}</div>
                              <div className="grid place-content-center rounded-2xl">
                                <input
                                  type="checkbox"
                                  checked={
                                    RentCheckboxs?.property_requirements ===
                                    d?.name
                                  }
                                  className="w-3 h-3 accent-[#E5002A] cursor-pointer"
                                />
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="border-t border-t-[#E5E5E5]" />

                    {/* ---------  Outdoor & Indoor Features --------- */}

                    <div className="text-[#404040] font-semibold text-sm md:text-base my-5 md:my-8">
                      Outdoor & Indoor Features
                      <div className="text-[#404040] font-semibold text-xs  mt-4 md:mt-6">
                        Outdoor Features
                      </div>
                      <div className="flex flex-wrap justify-start items-center gap-4 my-2 py-2">
                        {OutdoorFeatures?.length > 0 &&
                          OutdoorFeatures?.map((d, index) => (
                            <div
                              key={index}
                              className={`${normalBox} ${RentCheckboxs?.outdoor_features?.some(
                                (data) => data === d?.name
                              )
                                ? selectedBox
                                : ""
                                }`}
                              onClick={() => {
                                const isSelected =
                                  RentCheckboxs?.outdoor_features?.some(
                                    (data) => data === d?.name
                                  );
                                let updatedFeatures;
                                if (isSelected) {
                                  // Item is already selected, remove it from the array
                                  updatedFeatures =
                                    RentCheckboxs.outdoor_features?.filter(
                                      (data) => data !== d?.name
                                    );
                                } else {
                                  // Item is not selected, add it to the array
                                  updatedFeatures = [
                                    ...RentCheckboxs?.outdoor_features,
                                    d?.name,
                                  ];
                                }
                                setRentCheckboxs({
                                  ...RentCheckboxs,
                                  outdoor_features: updatedFeatures,
                                });
                              }}
                            >
                              {d?.title}
                              {RentCheckboxs?.outdoor_features
                                ?.filter((data) => data == d?.name)
                                .map((filteredData) => (
                                  <div className="grid place-content-center rounded-2xl">
                                    <input
                                      type="checkbox"
                                      name={d?.name}
                                      defaultChecked={RentCheckboxs?.outdoor_features?.filter(
                                        (data) => data === d?.name
                                      )}
                                      className="w-3 h-3 accent-[#E5002A] cursor-pointer"
                                    />
                                  </div>
                                ))}
                            </div>
                          ))}
                      </div>
                      <div className="text-[#404040] font-semibold text-xs  mt-4 md:mt-6">
                        Indoor Features
                      </div>
                      {/* ------------------------------ */}
                      <div className="flex flex-wrap justify-start items-center gap-4 my-2 py-2">
                        {IndoorFeatures?.length > 0 &&
                          IndoorFeatures?.map((d, index) => (
                            <div
                              key={index}
                              className={`${normalBox} ${RentCheckboxs?.indoor_features?.some(
                                (data) => data === d?.name
                              )
                                ? selectedBox
                                : ""
                                }`}
                              onClick={() => {
                                const isSelected =
                                  RentCheckboxs?.indoor_features?.some(
                                    (data) => data === d?.name
                                  );
                                let updatedFeatures;
                                if (isSelected) {
                                  // Item is already selected, remove it from the array
                                  updatedFeatures =
                                    RentCheckboxs?.indoor_features?.filter(
                                      (data) => data !== d?.name
                                    );
                                } else {
                                  // Item is not selected, add it to the array
                                  updatedFeatures = [
                                    ...RentCheckboxs?.indoor_features,
                                    d?.name,
                                  ];
                                }
                                setRentCheckboxs({
                                  ...RentCheckboxs,
                                  indoor_features: updatedFeatures,
                                });
                              }}
                            >
                              {d?.title}
                              {RentCheckboxs?.indoor_features
                                ?.filter((data) => data == d?.name)
                                .map((filteredData) => (
                                  <div className="grid place-content-center rounded-2xl">
                                    <input
                                      type="checkbox"
                                      name={d?.name}
                                      defaultChecked={RentCheckboxs?.indoor_features?.filter(
                                        (data) => data === d?.name
                                      )}
                                      className="w-3 h-3 accent-[#E5002A] cursor-pointer"
                                    />
                                  </div>
                                ))}
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="border-t border-t-[#E5E5E5]" />

                    {/* ---------  Climate Changer & Energy Saver --------- */}

                    <div className="text-[#404040] font-semibold text-sm md:text-base my-5 md:my-8">
                      Climate Changer & Energy Saver
                      <div className="flex flex-wrap justify-start items-center gap-4 my-2 py-2">
                        {ClimateChangerAndEnergySaver?.length > 0 &&
                          ClimateChangerAndEnergySaver?.map((d, index) => (
                            <div
                              key={index}
                              className={`${normalBox} ${RentCheckboxs?.climate_energy?.some(
                                (data) => data === d?.name
                              )
                                ? selectedBox
                                : ""
                                }`}
                              onClick={() => {
                                const isSelected =
                                  RentCheckboxs?.climate_energy?.some(
                                    (data) => data === d?.name
                                  );
                                let updatedFeatures;
                                if (isSelected) {
                                  // Item is already selected, remove it from the array
                                  updatedFeatures =
                                    RentCheckboxs.climate_energy?.filter(
                                      (data) => data !== d?.name
                                    );
                                } else {
                                  // Item is not selected, add it to the array
                                  updatedFeatures = [
                                    ...RentCheckboxs.climate_energy,
                                    d?.name,
                                  ];
                                }
                                setRentCheckboxs({
                                  ...RentCheckboxs,
                                  climate_energy: updatedFeatures,
                                });
                              }}
                            >
                              {d?.title}
                              {RentCheckboxs?.climate_energy
                                ?.filter((data) => data == d?.name)
                                .map((filteredData) => (
                                  <div className="grid place-content-center rounded-2xl">
                                    <input
                                      type="checkbox"
                                      name={d?.name}
                                      defaultChecked={RentCheckboxs?.climate_energy?.filter(
                                        (data) => data === d?.name
                                      )}
                                      className="w-3 h-3 accent-[#E5002A] cursor-pointer"
                                    />
                                  </div>
                                ))}
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="border-t border-t-[#E5E5E5]" />

                    {/* --------- Keywords --------- */}

                    <div className="text-[#404040] font-semibold text-sm md:text-base my-5 md:my-8">
                      Keywords
                      <div className="w-full flex justify-start items-center border border-[#E5E5E5] rounded-3xl py-3 px-5 cursor-pointer mt-4 md:mt-6">
                        <input
                          type="text"
                          name="keywords"
                          value={RentCheckboxs?.keywords}
                          onChange={onRentInputChange}
                          placeholder="Air con, pool, garage, solar, ensuite...."
                          className="w-full text-[#737373] font-medium text-xs md:text-sm outline-none"
                        />
                      </div>
                      <div className="text-[#404040] font-normal text-xs mt-2 px-2">
                        Add specific property features to your search
                      </div>
                    </div>

                    <div className="border-t border-t-[#E5E5E5]" />
                  </>
                )}
              </div>
            </>

            {/* ------ Footer ------ */}
            <div>
              <div className="border-b border-b-[#E5E5E5]" />

              <div className="flex justify-between items-center m-5">
                <div
                  className="text-[#404040] font-semibold text-xs md:text-sm lg:text-base cursor-pointer hover:text-[#E5002A]"
                  onClick={() => clearAll()}
                >
                  Clear All
                </div>
                <button
                  className="font-medium text-xs md:text-sm lg:text-base py-2 px-5 rounded-3xl border bg-[#E5002A] text-white hover:bg-white  hover:text-[#E5002A] hover:border-[#E5002A]"
                  onClick={() => handel()}
                >
                  {/* Show {dataCount} Houses */}
                  Show Houses
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterScreenModel;
