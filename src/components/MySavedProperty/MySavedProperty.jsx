import React, { useEffect, useState } from "react";
import SavePropertyCard from "../common/SavePropertyCard/SavePropertyCard";
import axiosInstanceAuth from "../../apiInstances/axiosInstanceAuth";
import { useNavigate } from "react-router-dom";
import Googlemap2 from "../common/GoogleMap/Googlemap2";
import { IoArrowBack } from "react-icons/io5";
const MySavedProperty = () => {
  const navigate = useNavigate();
  const AllTabs = ["All", "Buy", "Sold", "Rent"];

  const [isActive, setisActive] = useState(AllTabs?.[0]);

  const ActiveTab =
    "bg-[#FFEAEF] border-b-[#E5002A] rounded-t-lg text-[#404040] font-semibold";

  const NormalTab =
    "w-[25%] grid place-items-center  text-[#737373] font-medium  text-sm  md:text-lg border border-b-2 border-transparent hover:border-b-[#E5002A] py-3 px-10 ease-in-out duration-700 cursor-pointer";

  useEffect(() => {
    const getToken = localStorage.getItem('Token');
    if (getToken != null) {
      GetSavedProperty("");
    }
  }, []);

  const GetSavedProperty = async (isActive) => {
    await axiosInstanceAuth
      .post("savedProperty", {
        status: isActive,
      })
      .then((res) => {
        const mydata = res?.data?.data;
        if (res?.data?.status) {
          const newArray = mydata.map((obj, i) => ({
            ...obj,
            _id: mydata?.[i]?._id,
            frontPageImg: mydata?.[i]?.frontPageImg,
            lead_agent: mydata?.[i]?.lead_agent,
            price: mydata?.[i]?.price,
            street_address_number: mydata?.[i]?.street_address_number,
            street_address_name: mydata?.[i]?.street_address_name,
            suburb: mydata?.[i]?.suburb,
            favourite: mydata?.[i]?.isFavorite,
            bedroomCount: mydata?.[i]?.bedroomCount,
            showerCount: mydata?.[i]?.showerCount,
            carCount: mydata?.[i]?.carCount,
          }));
          setAllSavePropertyData(newArray);

          localStorage.setItem(
            "Saved",
            mydata.map((obj, i) => `${mydata?.[i]?._id}`)
          );
        } else {
          // localStorage.clear();
          // navigate(`/`);
          // toast.error("no data found!!");
          //console.log("no data found!!");
        }
      })
      .catch((err) => {
        //console.log("err --->", err);
      });
  };

  const [AllSavePropertyData, setAllSavePropertyData] = useState([
    // {
    //   iconTop: propertyImg0,
    //   iconBottom: propertyBottomImg0,
    //   title: "FOR SALE NOW",
    //   saveIcon: propertyImg0,
    //   locationIcon: propertyImg0,
    //   address: "41 Illawong Way Karana Downs",
    //   batrromCount: "3",
    //   showerCount: "4",
    //   carCount: "9",
    // },
    // {
    //   iconTop: propertyImg1,
    //   iconBottom: propertyBottomImg1,
    //   title: "$550 Weekly",
    //   saveIcon: propertyImg0,
    //   locationIcon: propertyImg0,
    //   address: "7/554 Marine Parade, Biggera Waters",
    //   batrromCount: "1",
    //   showerCount: "2",
    //   carCount: "1",
    // },
    // {
    //   iconTop: propertyImg0,
    //   iconBottom: propertyBottomImg0,
    //   title: "FOR SALE NOW",
    //   saveIcon: propertyImg0,
    //   locationIcon: propertyImg0,
    //   address: "41 Illawong Way Karana Downs",
    //   batrromCount: "3",
    //   showerCount: "4",
    //   carCount: "9",
    // },
    // {
    //   iconTop: propertyImg1,
    //   iconBottom: propertyBottomImg1,
    //   title: "$550 Weekly",
    //   saveIcon: propertyImg0,
    //   locationIcon: propertyImg0,
    //   address: "7/554 Marine Parade, Biggera Waters",
    //   batrromCount: "1",
    //   showerCount: "2",
    //   carCount: "1",
    // },
    // {
    //   iconTop: propertyImg0,
    //   iconBottom: propertyBottomImg0,
    //   title: "FOR SALE NOW",
    //   saveIcon: propertyImg0,
    //   locationIcon: propertyImg0,
    //   address: "41 Illawong Way Karana Downs",
    //   batrromCount: "3",
    //   showerCount: "4",
    //   carCount: "9",
    // },
    // {
    //   iconTop: propertyImg1,
    //   iconBottom: propertyBottomImg1,
    //   title: "$550 Weekly",
    //   saveIcon: propertyImg0,
    //   locationIcon: propertyImg0,
    //   address: "7/554 Marine Parade, Biggera Waters",
    //   batrromCount: "1",
    //   showerCount: "2",
    //   carCount: "1",
    // },
  ]);

  const SelectedTime = [
    {
      day: "Today",
      date: "6",
      selected: false,
    },
    {
      day: "Fri",
      date: "7",
      selected: false,
    },
    {
      day: "Sat",
      date: "8",
      selected: true,
    },
    {
      day: "Sun",
      date: "9",
      selected: false,
    },
    {
      day: "Mon",
      date: "10",
      selected: false,
    },
    {
      day: "Tue",
      date: "11",
      selected: false,
    },
    {
      day: "Wed",
      date: "12",
      selected: false,
    },
    {
      day: "Thu",
      date: "13",
      selected: false,
    },
    {
      day: "Fri",
      date: "14",
      selected: false,
    },
    {
      day: "Sat",
      date: "15",
      selected: false,
    },
    {
      day: "Sun",
      date: "16",
      selected: false,
    },
    {
      day: "Mon",
      date: "17",
      selected: false,
    },
    {
      day: "Tue",
      date: "18",
      selected: false,
    },
  ];

  const ActiveTime = "font-semibold !text-[#171717] !bg-[#FFCCD3]";
  const gotoBack = () => {
    navigate("/dashbord");
  };
  return (
    <>
      <div className="px-5 pt-3">
        <div className="xl:px-72 lg:px-60">
          <IoArrowBack
            className="w-14 h-10 bg-white rounded-2xl cursor-pointer"
            onClick={gotoBack}
          />
          {/* ------ Google Map ------ */}
          <div className="flex flex-col gap-1 mt-2 bg-white rounded-lg shadow-md hover:shadow-lg p-5 md:p-10 mb-10">
            <div className="text-[#171717] font-bold text-lg md:text-xl lg:text-2xl">
              My Saved Properties
            </div>
            <div className="text-[#A3A3A3] font-medium text-sm md:text-base lg:text-lg">
              Open times & auctions
            </div>

            <div className="h-28 flex justify-start items-center gap-2 my-5 md:my-10 overflow-x-scroll py-2">
              <div className="h-full !min-w-[90px] grid place-content-center font-medium text-white text-lg md:text-xl lg:text-2xl bg-[#E5002A] rounded-lg cursor-pointer">
                All
              </div>
              {SelectedTime?.length > 0 &&
                SelectedTime?.map((d, index) => (
                  <div
                    key={index}
                    className={`h-full !min-w-[90px] flex flex-col justify-center items-center gap-1 font-medium text-[#A3A3A3] text-base md:text-lg bg-white rounded-lg  cursor-pointer ${d?.selected ? ActiveTime : null
                      }`}
                    onClick={() => { }}
                  >
                    <div>{d?.day}</div>
                    <div>{d?.date}</div>
                  </div>
                ))}
            </div>

            {/* <LazyLoadImage
              src={map}
              alt="icon"
              srcSet={map}
              loading="lazy"
              effect="blur"
              className="cursor-pointer"
            /> */}
            <div className="custStyle !relative  h-[50vh] md:h-[50vh] ">
              <Googlemap2 location={AllSavePropertyData} />
            </div>
          </div>

          {/* ------ Tabs ------ */}

          <div className="grid place-items-center overflow-x-scroll md:overflow-hidden">
            <div className="w-auto md:w-[80%] bg-white rounded-xl py-4 px-4 md:px-9">
              <div className="flex justify-between items-center border border-b-2 border-transparent border-b-[#E5E5E5]">
                {AllTabs?.length > 0 &&
                  AllTabs?.map((d, index) => (
                    <div
                      key={index}
                      className={`${NormalTab} ${isActive === d ? ActiveTab : ""
                        }`}
                      onClick={() => {
                        setisActive(d);
                        if (d === "All") {
                          GetSavedProperty("");
                        } else if (d === "Buy") {
                          GetSavedProperty("Active");
                        } else {
                          GetSavedProperty(d);
                        }
                      }}
                    >
                      {d}
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <SavePropertyCard
            SavePropertyData={AllSavePropertyData}
            GetSavedProperty={GetSavedProperty}
            isActive={isActive}
          />
        </div>
      </div>
    </>
  );
};

export default MySavedProperty;
