import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import axiosInstanceAuth from "../../../apiInstances/axiosInstanceAuth";
import fullRedHeart from "../../../assets/fullRedHeart.png";
import heart from "../../../assets/heart_icon.png";
import { BACKEND_BASE_URL } from "../../../apiInstances/baseurl";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Import your image here
import locationImage from "../../../assets/location.svg";

export default function HousePropertySlider({ e, savedLocalPost }) {
  const navigate = useNavigate();
  const [likeFlag, setLikeFlag] = useState(false);
  async function isfavorite(id) {
    await axiosInstanceAuth
      .post("addToFavorites", {
        id,
      })
      .then((res) => {
        if (
          res?.data?.message.trim() ===
          "This Property is added to your wishlist"
        ) {
          setLikeFlag(true);
        } else if (
          res?.data?.message.trim() ===
          "This Property is removed from your wishlist"
        ) {
          setLikeFlag(false);
        }
        toast.success(res?.data?.message);
      })
      .catch((err) => {
        //console.log("🚀 ~ .then ~ err:", err);
      });
  }
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

  useEffect(() => {
    const getToken = localStorage.getItem('Token');
    if (getToken) {
      GetSavedProperty();
    }
  }, []);
  return (
    <div className="my-3 bg-white rounded-xl w-auto p-2 shadow-[6px_6px_10px_-5px_rgba(0,0,0,0.3)]">
      <div>
        <div
          className="cursor-pointer"
          onClick={() => navigate(`/property-house/${e?.id}`)}
        >
          <Carousel infinite={true} autoPlay={true}>
            {e?.clientImage?.map((innerimg, index) => (
              <div key={index}>
                <img
                  src={innerimg}
                  alt="img"
                  className="h-56"
                />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="flex justify-between mt-2 items-center px-2">
          <h2 className="font-semibold lg:text-xl md:text-md text-lg text-[#262626]">
            {e?.head?.substring(0, 15)}...
          </h2>
          <div className="bg-[#FFEAEF] rounded-full p-2 md:p-3 cursor-pointer">
            {likeFlag || savedLocalPost?.includes(e.id) ? (
              <img
                src={fullRedHeart}
                alt="heart"
                className="w-4 h-4 md:w-5 md:h-5 cursor-pointer"
                onClick={() => isfavorite(e.id)}
              />
            ) : (
              <img
                src={heart}
                alt="heart"
                className="w-4 h-4 md:w-5 md:h-5 cursor-pointer"
                onClick={() => {
                  isfavorite(e.id);
                }}
              />
            )}
          </div>
        </div>
        <div className="flex justify-start items-start py-3 px-2 gap-1 ">
          <img src={locationImage} alt="img" /> {/* Use your image here */}
          <p className="lg:text-sm text-xs h-10 text-[#737373]">{e?.place}</p>
        </div>
        <div className="flex gap-4 px-2 mt-3">
          {e?.iconWithCount?.length > 0 &&
            e?.iconWithCount?.map((elm, ind) => (
              <div key={ind} className="flex gap-2 bg-[#F5F5F5] rounded-lg p-2">
                <img src={elm?.icon} alt="" />
                <span>{elm?.count}</span>
              </div>
            ))}
        </div>
      </div>
      <p className="h-[4.5rem] overflow-hidden  mt-3 px-3 lg:text-base text-sm text-[#737373]">
        {e?.discription?.substring(0, 95)}...
      </p>
    </div>
  );
}
