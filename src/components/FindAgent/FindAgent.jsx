import React, { useDeferredValue, useEffect, useState } from "react";
import Layout2 from "../../Layouts/Layout2";
import FindAgencyCard from "../common/FindAgencyCard/FindAgencyCard";
import FindAgentCard from "../common/FindAgentCard/FindAgentCard";
import search from "../../assets/search.png";
import ag1 from "../../assets/ag1.png";
import rs1 from "../../assets/rs1.png";
import rs2 from "../../assets/rs2.png";
import rs3 from "../../assets/rs3.png";
import rs4 from "../../assets/rs4.png";
import axiosInstanceAuth from "../../apiInstances/axiosInstanceAuth";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Loder from "../common/Loder";

const FindAgent = () => {
  const [IsActive, setIsActive] = useState("Agents");
  const [AgentData, setAgentData] = useState([]);

  const [Filtered, setFiltered] = useState([]);
  const [FilteredAgency, setFilteredAgency] = useState([]);
  const deferredFilter = useDeferredValue(Filtered);
  const [Sort, setSort] = useState("");

  const [AgenciesData, setAgenciesData] = useState([]);
  const [Input, setInput] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const filterData = (searchTerm) => {
    const filteredArray = AgentData?.filter((obj) => {
      const allValue = `${obj.AgentName.toLowerCase()} ${obj.id.toLowerCase()} ${obj.Rating?.toString().toLowerCase()}`;
      searchTerm = searchTerm.toLowerCase();
      // Check if the name or ID contains all characters from the search term
      const searchCharacters = searchTerm.split("");
      return searchCharacters.every((char) => allValue.includes(char));
    });
    console.log("AgentData", AgentData);
    setFiltered(filteredArray);
  };
  const filterDataAgency = (searchTerm) => {
    const filteredArray = AgenciesData?.filter((obj) => {
      const allValue = `${obj.name?.toLowerCase()}`;
      searchTerm = searchTerm.toLowerCase();
      // Check if the name or ID contains all characters from the search term
      const searchCharacters = searchTerm.split("");
      return searchCharacters.every((char) => allValue.includes(char));
    });
    setFilteredAgency(filteredArray);
  };
  const handleSearchInput = (e) => {
    e.preventDefault();
    // Filter the data when the search term changes
    // const allValuealue = e?.target?.value;
    filterData(e.target.value);
    filterDataAgency(e.target.value);
    setInput(e.target.value);
  };
  const ActiveTab = "text-white bg-[#E5002A]";
  useEffect(() => {
    GetAllAgentData();
    GetAllAgenciesData();
  }, []);
  const { key } = useParams();
  //console.log("🚀 ~ FindAgent ~ key:", key)

  const GetAllAgentData = async () => {
    setIsLoading(true);
    const response = await axiosInstanceAuth.post(
      `Agency_Agent/viewAllAgents/${key}`
    );
    if (response.data.status) {
      // console.log("------------------------------------------------------>", response.data)
      const AllSold = response.data.totalSoldCount.length;
      //console.log("🚀 ~ GetAllAgentData ~ AllSold:", AllSold)
      const agentData = response?.data?.data;
      // console.log("agentDAta", agentData);
      const newArray = agentData?.map((obj, i) => ({
        id: obj?.id,
        AgentName: obj?.name,
        AgentImage: obj?.profileImg,
        AgencySmallLogo: obj?.agencySmallLogo,
        TopHeadColor: obj?.primary_color,
        TopHeadImage: ag1,
        AgentAbout: obj?.agencyName,
        AgencyId: obj.agencyId,
        AgentExperince: "10 years experience",
        Rating: obj?.average,
        Review: obj?.reviews,
        PropertiesSoldAsLeadAgent: obj?.property_sold,
        MedianDaysPrice: obj?.medianPrice?.toFixed(2),
        MediandaysAdvertised: "16",
        PropertiesSold: AllSold,
        VerifiedReview:
          "Right from the start of our chance meeting Jason exuded comfort, in a short period of time Jason gave us more information than anyone else. Throughout the time that followed Jason and his team, specific callout to Brady, made it their passion and goal to find our forever home. With many laughs and resilience they came through and gave us the best experience we could ask for. Highly recommend Jason and will definitely seek him out again in the future! Thanks Jason and Brady...",
        RecentlySold: obj?.propertyDetails,
        // RecentlySold: [
        //   {
        //     Recently: "RECENTLY SOLD",
        //     Img: rs1,
        //   },
        //   {
        //     Recently: "",
        //     Img: rs2,
        //   },
        //   {
        //     Recently: "",
        //     Img: rs3,
        //   },
        //   {
        //     Recently: "",
        //     Img: rs4,
        //   },
        // ],
      }));
      setIsLoading(false);
      setAgentData(newArray);
      setFiltered(newArray);
    } else {
      toast.error(response.data.message);
      setIsLoading(false);
    }
  };

  const GetAllAgenciesData = async () => {
    setIsLoading(true);
    await axiosInstanceAuth
      .get("agentadmin/viewAllAgency")
      .then((res) => {
        const mydata = res?.data?.data;
        if (res?.data?.status) {
          const newArray = mydata.map((obj, i) => ({
            ...obj,
            id: mydata?.[i]?.id,
            TopHeadColor: obj?.primary_color,
            agencyLargeLogo: mydata?.[i]?.agencyLargeLogo,
            name: mydata?.[i]?.name,
            street: mydata?.[i]?.street,
            suburb_area: mydata?.[i]?.suburb_area,
            postcode: mydata?.[i]?.postcode,
            Property_Sold: `${i + 978}`,
            Property_Rent: `${i + 41}`,
          }));
          setIsLoading(false);
          setAgenciesData(newArray);
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
  const SortAgent = async (data) => {
    const response = await axiosInstanceAuth.post(`sortAgent`, {
      sort_by: data,
    });
    if (response.data.status) {
      const agentData = response?.data?.data;
      const newArray = agentData?.map((obj, i) => ({
        id: obj?.id,
        AgentName: obj?.name,
        AgentImage: obj?.profileImg,
        AgencySmallLogo: obj?.agencySmallLogo,
        TopHeadColor: obj?.primary_color,
        TopHeadImage: ag1,
        AgentAbout: obj?.agencyName,
        AgentExperince: "10 years experience",
        Rating: obj?.average,
        Review: obj?.reviews,
        PropertiesSoldAsLeadAgent: "127",
        MedianDaysPrice: "$ 716k",
        MediandaysAdvertised: "16",
        PropertiesSold: "113",
        VerifiedReview:
          "Right from the start of our chance meeting Jason exuded comfort, in a short period of time Jason gave us more information than anyone else. Throughout the time that followed Jason and his team, specific callout to Brady, made it their passion and goal to find our forever home. With many laughs and resilience they came through and gave us the best experience we could ask for. Highly recommend Jason and will definitely seek him out again in the future! Thanks Jason and Brady...",
        RecentlySold: obj?.propertyDetails,
        // RecentlySold: [
        //   {
        //     Recently: "RECENTLY SOLD",
        //     Img: rs1,
        //   },
        //   {
        //     Recently: "",
        //     Img: rs2,
        //   },
        //   {
        //     Recently: "",
        //     Img: rs3,
        //   },
        //   {
        //     Recently: "",
        //     Img: rs4,
        //   },
        // ],
      }));
      setAgentData(newArray);
      setFiltered(newArray);
    } else {
      toast.error(response.data.message);
    }
  };

  const handleSelect = (e) => {
    setSort(e.target.value);
    SortAgent(e.target.value);
  };

  return (
    <Layout2>
      {isLoading ? (
        <div className="w-full h-[55vh] grid place-content-center">
          <Loder />
        </div>
      ) : (
        <div className="px-5 pt-3">
          <div className="xl:px-60 lg:px-44 2xl:px-80 mt-16 lg:mt-0">
            {/* ---------- Start Tab & Search & Sort---------- */}
            <div className="flex flex-col justify-start bg-white rounded-2xl shadow-sm hover:shadow-md p-4 md:p-7 mb-10">
              <div className="flex flex-col lg:flex-row justify-start items-start lg:items-end gap-3">
                <div className="flex justify-start items-center border border-[#E5E5E5] rounded-[28px]  cursor-pointer">
                  <button
                    className={`text-xs md:text-sm lg:text-base py-3 px-4 md:px-7 rounded-[28px] text-[#404040] ${IsActive === "Agents" ? ActiveTab : ""
                      }`}
                    onClick={() => {
                      setIsActive("Agents");
                    }}
                  >
                    Agents
                  </button>
                  <button
                    className={`text-xs md:text-sm lg:text-base py-3 px-4 md:px-7 rounded-[28px] text-[#404040] ${IsActive === "Agencies" ? ActiveTab : ""
                      }`}
                    onClick={() => {
                      setIsActive("Agencies");
                    }}
                  >
                    Agencies
                  </button>
                </div>
                <div className="w-full flex justify-start items-center border border-[#E5E5E5] rounded-[28px] py-3 px-4 md:px-7 cursor-pointer">
                  <img
                    src={search}
                    alt="icon"
                    className="w-3 lg:w-4 mr-3 cursor-pointer"
                  />
                  <input
                    type="text"
                    name="search"
                    placeholder="Search"
                    value={Input}
                    className="w-full text-[#737373] font-medium text-xs md:text-sm lg:text-base outline-none"
                    onChange={(e) => handleSearchInput(e)}
                  />
                </div>
                <div className="flex flex-col justify-start">
                  <div className="text-[#171717] font-medium text-xs md:text-sm lg:text-base mb-2 px-2">
                    Sort By
                  </div>
                  <div className="text-[#737373] font-medium text-xs md:text-sm lg:text-base">
                    <select
                      name="filter"
                      value={Sort}
                      onChange={(e) => {
                        handleSelect(e);
                      }}
                      className="round outline-none border border-[#E5E5E5] rounded-[28px] py-3 px-5 cursor-pointer"
                    >
                      <option value="number_of_properties_sold">
                        Number of properties sold
                      </option>
                      <option value="suburb_sales_and_performance">
                        Suburb Sales & Performance
                      </option>
                      <option value="property_sales_as_leadagent">
                        Property sales (as lead agent)
                      </option>
                      <option value="number_of_reviews">
                        Number of reviews
                      </option>
                      <option value="median_sold_price">
                        Median sold price
                      </option>
                      {/* <option value="median_days_advertised">
                        Median days advertised
                      </option> */}
                      <option value="years_experience">Years experience</option>
                      <option value="total_sales_across_all_suburbs">
                        Total sales across all suburbs
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-start mt-5 lg:mt-7 px-2">
                <input type="checkbox" className="mr-3 cursor-pointer" />
                <div className="font-medium text-[#737373] text-xs md:text-sm">
                  Offices located in this area
                </div>
              </div>
            </div>

            {/* ---------- End Tab & Search & Sort ---------- */}

            {IsActive === "Agents" ? (
              <FindAgentCard AgentData={deferredFilter} style="mb-10" />
            ) : null}
            {IsActive === "Agencies" ? (
              <FindAgencyCard
                AgenciesData={Input ? FilteredAgency : AgenciesData}
                style="mb-10"
              />
            ) : null}
          </div>
        </div>
      )}
    </Layout2>
  );
};

export default FindAgent;
