import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import filter from "../../assets/filter.png";
import searchIcon from "../../assets/search.png";
import NewHomeFilterModel from '../common/FilterScreenModel/NewHomeFilterModel';

const NewHomesFilter = ({ setSearch, TabData, Filterable, activeTab, Searchindata, propertyLength }) => {
  const navigate = useNavigate();
  const [IsOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(TabData[0]);
  const [searchValue, setSearchValue] = useState("");
  const [searchDataPage, setSearchDataPage] = useState("New Apartments");
  const [searchData, setSearchData] = useState([]);
  const [BuyProperty, setBuyPropertyData] = useState([])
  const [first, setfirst] = useState("");

  const ActiveTab =
    "bg-[#FFEAEF] border-b-[#E5002A] rounded-t-lg text-[#404040] font-semibold";

  const NormalTab =
    "grid place-items-center  text-[#737373] font-medium text-[12px] md:text-sm lg:text-base border border-b-2 border-transparent hover:border-b-[#E5002A] py-2 px-8 lg:py-3 lg:px-10 ease-in-out duration-700 cursor-pointer";

  useEffect(() => {
    activeTab(isActive)
  }, [isActive])

  localStorage.setItem("searchData", searchData);
  const searchBtn = () => {
    if (searchValue.trim().length === 0) {
      navigate(`/${searchDataPage}`);
    } else {
      setSearch(searchValue);
      navigate(`/${searchDataPage}/searched/${searchValue}`);
    }
  };

  const filterData = (searchTerm) => {
    const filteredArray = Searchindata.filter((obj) => {
      const allValue = `${obj.street_address_name.trim().toLowerCase()} ${obj.street_address_number.toString()}`;
      searchTerm = searchTerm.toLowerCase();
      const searchCharacters = searchTerm.split("");
      return searchCharacters.every((char) => allValue.includes(char));
    });
    setBuyPropertyData(filteredArray);
  };

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
  const getid = (value) => {
    setfirst(value);
  };
  return (
    <>
      <div className="bg-[#FFFFFF] rounded-xl shadow-md hover:shadow-lg p-4 mx-0 mb-10">
        {/* ---------- Navigation ---------- */}
        <div
          id="navigation"
          className="w-full grid place-items-start overflow-x-scroll rounded-xl scrollBarHidden"
        >
          <div className="w-full flex justify-start items-start border border-b-2 mb-3 border-transparent border-b-[#E5E5E5]">
            {TabData?.length > 0 &&
              TabData?.map((d, index) => (
                <div
                  key={index}
                  className={`${NormalTab} ${isActive === d ? ActiveTab : ""}`}
                  onClick={(e) => {
                    setIsActive(d);
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
          <div className="flex flex-row justify-between gap-2">
            <div className="w-full xl:w-[40%] flex justify-start items-center border border-[#E5E5E5] rounded-[28px] py-3 px-4 md:px-7 cursor-pointer">
              <img
                src={searchIcon}
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
        )}
      </div>
      {/* ---------- Filter Screen Model ---------- */}
      <NewHomeFilterModel
        setIsOpen={setIsOpen}
        IsOpen={IsOpen}
        currentTab={isActive}
        id={first}
        dataCount={propertyLength}
      />
    </>
  )
}

export default NewHomesFilter