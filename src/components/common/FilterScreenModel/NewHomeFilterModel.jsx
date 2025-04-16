import React, { useEffect, useState } from 'react'
import { Bathrooms, Bedrooms, CarSpaces, ClimateChangerAndEnergySaver, IndoorFeatures, OutdoorFeatures, TypeOfProperty } from '../../../Constants';
import closeIcon from "../../../assets/closeIcon.png";
import "./FilterScreenModel.css";
import { useLocation, useNavigate } from 'react-router-dom';

const NewHomeFilterModel = ({ setIsOpen, IsOpen, currentTab, id, dataCount }) => {
  const FilterTab = ["New Apartments", "House & Land"];
  const [isActive, setIsActive] = useState(currentTab);
  const search = useLocation().pathname.split("/")?.[1];
  const navigate = useNavigate();
  const [apartmentCheckBox, setApartmentCheckBox] = useState({
    // --------- Type Of Property ---------

    // --------- Outdoor Features ---------
    indoor_features: [],
    outdoor_features: [],
    climate_energy: [],

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
  const [houseCheckBox, setHouseCheckBox] = useState({
    // --------- Type Of Property ---------

    // --------- Outdoor Features ---------
    indoor_features: [],
    outdoor_features: [],
    climate_energy: [],
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

  useEffect(() => {
    setIsActive(currentTab);
  }, [currentTab]);

  const onApartmentInputChange = (e) => {
    const { name, value } = e.target;
    setApartmentCheckBox({ ...apartmentCheckBox, [name]: value });
  };
  const onHouseInputChange = (e) => {
    const { name, value } = e.target;
    setHouseCheckBox({ ...houseCheckBox, [name]: value });
  };

  const clearAll = () => {
    setApartmentCheckBox({
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
    setHouseCheckBox({
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
  }

  const handel = async () => {
    // ====================senddata=====
    console.log("dataCount", dataCount);
    if (isActive === "New Apartments") {
      const encryptedData = JSON.stringify({
        new_or_established_checked:
          apartmentCheckBox?.new_or_established_checked || undefined,
        Bedrooms: apartmentCheckBox?.bedrooms || undefined,
        Bathrooms: apartmentCheckBox?.bathrooms || undefined,
        price_min: apartmentCheckBox?.price_start || undefined,
        price_max: apartmentCheckBox?.price_end || undefined,
        size_of_land: apartmentCheckBox?.size_of_land || undefined,
        property_type: apartmentCheckBox?.Property_type || undefined,
        climate_energy: apartmentCheckBox?.climate_energy || undefined,
        indoor_features: apartmentCheckBox?.indoor_features || undefined,
        outdoor_features: apartmentCheckBox?.outdoor_features || undefined,
        property_type: ['Apartment'],
        status: "new",
      });
      setIsOpen(false);
      navigate(`/new-homes?type=apartment&encryptedData=${encodeURIComponent(encryptedData)}`);
    } else {
      const encryptedData = JSON.stringify({
        new_or_established_checked:
          houseCheckBox?.new_or_established_checked || undefined,
        Bedrooms: houseCheckBox?.bedrooms || undefined,
        Bathrooms: houseCheckBox?.bathrooms || undefined,
        price_min: houseCheckBox?.price_start || undefined,
        price_max: houseCheckBox?.price_end || undefined,
        size_of_land: houseCheckBox?.size_of_land || undefined,
        property_type: houseCheckBox?.Property_type || undefined,
        climate_energy: houseCheckBox?.climate_energy || undefined,
        indoor_features: houseCheckBox?.indoor_features || undefined,
        outdoor_features: houseCheckBox?.outdoor_features || undefined,
        property_type: ['House&Land'],
        status: "new",
      });
      setIsOpen(false);
      navigate(`/new-homes?type=house&encryptedData=${encodeURIComponent(encryptedData)}`);

    }
  }

  const ActiveTab =
    "bg-[#FFEAEF] border-b-[#E5002A] rounded-t-lg text-[#404040] font-semibold";

  const NormalTab =
    "w-auto grid place-items-center place-content-center text-[#737373] font-medium text-sm md:text-sm border border-b-2 border-transparent hover:border-b-[#E5002A] py-3 px-10 ease-in-out duration-700 cursor-pointer";

  const normalBox =
    "flex justify-center items-center gap-3 border border-[#E5E5E5] rounded-3xl font-medium text-xs md:text-sm cursor-pointer py-2 px-5";

  const selectedBox = "!text-[#E5002A] !bg-[#FFEAEF] !border-[#E5002A]";

  return (
    <>{IsOpen === true && (
      <div className="fixed top-0 left-[0%] z-[9999999999999] w-full h-full  backdrop-brightness-50 grid place-items-center place-content-center">
        <div className="h-auto sm:max-w-[600px] filter-screen-model outline-none bg-white rounded-lg shadow-2xl mx-5">
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
          <div className="px-5 max-h-[600px] overflow-y-scroll ">
            <div id="navigation" className="w-full grid place-items-start rounded-xl mt-5 scrollBarHidden">
              <div className="w-full flex justify-start items-end border border-b border-transparent overflow-x-scroll border-b-[#E5E5E5]">
                {FilterTab?.length > 0 &&
                  FilterTab?.map((d, index) => (
                    <div
                      key={index}
                      className={`${NormalTab} ${isActive == d ? ActiveTab : ""
                        }`}
                      onClick={() => setIsActive(d)}
                    >
                      {d}
                    </div>
                  ))}
              </div>
            </div>
            {isActive === FilterTab[0] && (
              <>
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
                      value={apartmentCheckBox?.price_start}
                      onChange={onApartmentInputChange}
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
                          className={`${normalBox} ${apartmentCheckBox?.bedrooms === d?.name
                            ? selectedBox
                            : ""
                            }`}
                          onClick={() => {
                            setApartmentCheckBox((prev) => ({
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
                          className={`${normalBox} ${apartmentCheckBox?.bathrooms === d?.name
                            ? selectedBox
                            : ""
                            }`}
                          onClick={() => {
                            setApartmentCheckBox((prev) => ({
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
                          className={`${normalBox} ${apartmentCheckBox?.car_spaces === d?.name
                            ? selectedBox
                            : ""
                            }`}
                          onClick={() => {
                            setApartmentCheckBox((prev) => ({
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
                      value={apartmentCheckBox?.size_of_land}
                      onChange={onApartmentInputChange}
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
                          className={`${normalBox} ${apartmentCheckBox?.outdoor_features?.some(
                            (data) => data === d?.name
                          )
                            ? selectedBox
                            : ""
                            }`}
                          onClick={() => {
                            const isSelected =
                              apartmentCheckBox?.outdoor_features?.some(
                                (data) => data === d?.name
                              );
                            let updatedFeatures;
                            if (isSelected) {
                              // Item is already selected, remove it from the array
                              updatedFeatures =
                                apartmentCheckBox.outdoor_features?.filter(
                                  (data) => data !== d?.name
                                );
                            } else {
                              // Item is not selected, add it to the array
                              updatedFeatures = [
                                ...apartmentCheckBox?.outdoor_features,
                                d?.name,
                              ];
                            }
                            setApartmentCheckBox({
                              ...apartmentCheckBox,
                              outdoor_features: updatedFeatures,
                            });
                          }}
                        >
                          {d?.title}
                          {apartmentCheckBox?.outdoor_features
                            ?.filter((data) => data == d?.name)
                            .map((filteredData) => (
                              <div className="grid place-content-center rounded-2xl">
                                <input
                                  type="checkbox"
                                  name={d?.name}
                                  defaultChecked={apartmentCheckBox?.outdoor_features?.filter(
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
                          className={`${normalBox} ${apartmentCheckBox?.indoor_features?.some(
                            (data) => data === d?.name
                          )
                            ? selectedBox
                            : ""
                            }`}
                          onClick={() => {
                            const isSelected =
                              apartmentCheckBox?.indoor_features?.some(
                                (data) => data === d?.name
                              );
                            let updatedFeatures;
                            if (isSelected) {
                              // Item is already selected, remove it from the array
                              updatedFeatures =
                                apartmentCheckBox?.indoor_features?.filter(
                                  (data) => data !== d?.name
                                );
                            } else {
                              // Item is not selected, add it to the array
                              updatedFeatures = [
                                ...apartmentCheckBox?.indoor_features,
                                d?.name,
                              ];
                            }
                            setApartmentCheckBox({
                              ...apartmentCheckBox,
                              indoor_features: updatedFeatures,
                            });
                          }}
                        >
                          {d?.title}
                          {apartmentCheckBox?.indoor_features
                            ?.filter((data) => data == d?.name)
                            .map((filteredData) => (
                              <div className="grid place-content-center rounded-2xl">
                                <input
                                  type="checkbox"
                                  name={d?.name}
                                  defaultChecked={apartmentCheckBox?.indoor_features?.filter(
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
                          className={`${normalBox} ${apartmentCheckBox?.climate_energy?.some(
                            (data) => data === d?.name
                          )
                            ? selectedBox
                            : ""
                            }`}
                          onClick={() => {
                            const isSelected =
                              apartmentCheckBox?.climate_energy?.some(
                                (data) => data === d?.name
                              );
                            let updatedFeatures;
                            if (isSelected) {
                              // Item is already selected, remove it from the array
                              updatedFeatures =
                                apartmentCheckBox.climate_energy?.filter(
                                  (data) => data !== d?.name
                                );
                            } else {
                              // Item is not selected, add it to the array
                              updatedFeatures = [
                                ...apartmentCheckBox.climate_energy,
                                d?.name,
                              ];
                            }
                            setApartmentCheckBox({
                              ...apartmentCheckBox,
                              climate_energy: updatedFeatures,
                            });
                          }}
                        >
                          {d?.title}
                          {apartmentCheckBox?.climate_energy
                            ?.filter((data) => data == d?.name)
                            .map((filteredData) => (
                              <div className="grid place-content-center rounded-2xl">
                                <input
                                  type="checkbox"
                                  name={d?.name}
                                  defaultChecked={apartmentCheckBox?.climate_energy?.filter(
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
                      value={apartmentCheckBox?.keywords}
                      onChange={onApartmentInputChange}
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
            {isActive === FilterTab[1] && (
              <>
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
                      value={houseCheckBox?.price_start}
                      onChange={onHouseInputChange}
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
                          className={`${normalBox} ${houseCheckBox?.bedrooms === d?.name
                            ? selectedBox
                            : ""
                            }`}
                          onClick={() => {
                            setHouseCheckBox((prev) => ({
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
                          className={`${normalBox} ${houseCheckBox?.bathrooms === d?.name
                            ? selectedBox
                            : ""
                            }`}
                          onClick={() => {
                            setHouseCheckBox((prev) => ({
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
                          className={`${normalBox} ${houseCheckBox?.car_spaces === d?.name
                            ? selectedBox
                            : ""
                            }`}
                          onClick={() => {
                            setHouseCheckBox((prev) => ({
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
                      value={houseCheckBox?.size_of_land}
                      onChange={onApartmentInputChange}
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
                          className={`${normalBox} ${houseCheckBox?.outdoor_features?.some(
                            (data) => data === d?.name
                          )
                            ? selectedBox
                            : ""
                            }`}
                          onClick={() => {
                            const isSelected =
                              houseCheckBox?.outdoor_features?.some(
                                (data) => data === d?.name
                              );
                            let updatedFeatures;
                            if (isSelected) {
                              // Item is already selected, remove it from the array
                              updatedFeatures =
                                houseCheckBox.outdoor_features?.filter(
                                  (data) => data !== d?.name
                                );
                            } else {
                              // Item is not selected, add it to the array
                              updatedFeatures = [
                                ...houseCheckBox?.outdoor_features,
                                d?.name,
                              ];
                            }
                            setHouseCheckBox({
                              ...houseCheckBox,
                              outdoor_features: updatedFeatures,
                            });
                          }}
                        >
                          {d?.title}
                          {houseCheckBox?.outdoor_features
                            ?.filter((data) => data == d?.name)
                            .map((filteredData) => (
                              <div className="grid place-content-center rounded-2xl">
                                <input
                                  type="checkbox"
                                  name={d?.name}
                                  defaultChecked={houseCheckBox?.outdoor_features?.filter(
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
                          className={`${normalBox} ${houseCheckBox?.indoor_features?.some(
                            (data) => data === d?.name
                          )
                            ? selectedBox
                            : ""
                            }`}
                          onClick={() => {
                            const isSelected =
                              houseCheckBox?.indoor_features?.some(
                                (data) => data === d?.name
                              );
                            let updatedFeatures;
                            if (isSelected) {
                              // Item is already selected, remove it from the array
                              updatedFeatures =
                                houseCheckBox?.indoor_features?.filter(
                                  (data) => data !== d?.name
                                );
                            } else {
                              // Item is not selected, add it to the array
                              updatedFeatures = [
                                ...houseCheckBox?.indoor_features,
                                d?.name,
                              ];
                            }
                            setHouseCheckBox({
                              ...houseCheckBox,
                              indoor_features: updatedFeatures,
                            });
                          }}
                        >
                          {d?.title}
                          {houseCheckBox?.indoor_features
                            ?.filter((data) => data == d?.name)
                            .map((filteredData) => (
                              <div className="grid place-content-center rounded-2xl">
                                <input
                                  type="checkbox"
                                  name={d?.name}
                                  defaultChecked={houseCheckBox?.indoor_features?.filter(
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
                          className={`${normalBox} ${houseCheckBox?.climate_energy?.some(
                            (data) => data === d?.name
                          )
                            ? selectedBox
                            : ""
                            }`}
                          onClick={() => {
                            const isSelected =
                              houseCheckBox?.climate_energy?.some(
                                (data) => data === d?.name
                              );
                            let updatedFeatures;
                            if (isSelected) {
                              // Item is already selected, remove it from the array
                              updatedFeatures =
                                houseCheckBox.climate_energy?.filter(
                                  (data) => data !== d?.name
                                );
                            } else {
                              // Item is not selected, add it to the array
                              updatedFeatures = [
                                ...houseCheckBox.climate_energy,
                                d?.name,
                              ];
                            }
                            setHouseCheckBox({
                              ...houseCheckBox,
                              climate_energy: updatedFeatures,
                            });
                          }}
                        >
                          {d?.title}
                          {houseCheckBox?.climate_energy
                            ?.filter((data) => data == d?.name)
                            .map((filteredData) => (
                              <div className="grid place-content-center rounded-2xl">
                                <input
                                  type="checkbox"
                                  name={d?.name}
                                  defaultChecked={houseCheckBox?.climate_energy?.filter(
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
                      value={houseCheckBox?.keywords}
                      onChange={onHouseInputChange}
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
          {/* ------ Footer ------ */}
          <div>
            <div className="border-b border-b-[#E5E5E5]" />
            <div className="flex justify-between items-center m-5">
              <div className="text-[#404040] font-semibold text-xs md:text-sm lg:text-base cursor-pointer hover:text-[#E5002A]"
                onClick={() => clearAll()}>
                Clear All
              </div>
              <button
                className="font-medium text-xs md:text-sm lg:text-base py-2 px-5 rounded-3xl border bg-[#E5002A] text-white hover:bg-white  hover:text-[#E5002A] hover:border-[#E5002A]"
                onClick={() => handel()}
              >
                Show Houses
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  )
}

export default NewHomeFilterModel