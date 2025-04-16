import React, { useEffect, useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useNavigate, useParams } from "react-router-dom";
import Googlemap from "../common/GoogleMap/Googlemap";
import shareRed from "../../assets/shareRed.png";
import heart from "../../assets/emptyHeart.png";
import fullRedHeart from "../../assets/fillHeart.png";
import sideArrowRed from "../../assets/sideArrowRed.png";
import bedroom from "../../assets/bedroom_icon.png";
import car from "../../assets/car_icon.png";
import square from "../../assets/square.png";
import home from "../../assets/home.png";
import shower from "../../assets/shower_icon.png";
import shareBlue from "../../assets/shareBlue.png";
import locationRed from "../../assets/locationRed.png";
import news1 from "../../assets/news1.png";
import news2 from "../../assets/news2.png";
import logoSmall from "../../assets/logo-new.png";
import axiosInstanceAuth from "../../apiInstances/axiosInstanceAuth";
import useOnClickOutside from "../../Hooks/useOnClickOutside/useOnClickOutside";
import { toast } from "react-toastify";
import isEmpty from "../common/utils/isEmpty";
import LimitedContentView from "../../components/common/LimitedContentView/LimitedContentView";
import { MdOutlineLiving } from "react-icons/md";
import { MdOutlineBathroom } from "react-icons/md";
import { GiMechanicGarage } from "react-icons/gi";
import { FaBath } from "react-icons/fa";
import { MdBedroomParent } from "react-icons/md";
import { MdLocalParking } from "react-icons/md";
import { FaToilet } from "react-icons/fa";
import GallaryPopup from "./GallaryPopup";
import SharePopup from "../common/sharePopup/SharepPopup";
import { Helmet } from 'react-helmet';
import callBlue from "../../assets/callBlue.png";

const Rating = (props) => {
  const rating = props.rating;
  const stars = [];
  const fullStars = Math.floor(rating); // Number of full stars
  const hasHalfStar = rating - fullStars >= 0.5; // Check if there is a half star

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<i key={i} className="fa fa-star" />);
    } else if (i === fullStars && hasHalfStar) {
      stars.push(<i key={i} className="fa fa-star-half-o" />);
    } else {
      stars.push(<i key={i} className="fa fa-star-o" />);
    }
  }

  return <div className="rating text-yellow-400 gap-2 flex">{stars}</div>;
};

const DetailedViewProperty = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  //console.log("🚀 ~ DetailedViewProperty ~ ref:", ref);
  const { id } = useParams();

  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const [AuthPopUp, setAuthPopUp] = useState(false);
  const [likeFlag, setLikeFlag] = useState(false);

  const [GallaryView, setGallaryView] = useState(false);
  //console.log("🚀 ~ DetailedViewProperty ~ GallaryView:", GallaryView);
  useOnClickOutside(ref, () => setGallaryView(false));
  const isAuthanticate = localStorage.getItem("Token");

  const isfavorite = async (i) => {
    await axiosInstanceAuth
      .post("addToFavorites", {
        id: i?._id,
      })
      .then((res) => {
        const mydata = res?.data?.data;
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

        if (res?.data?.status) {
          toast.success(res?.data?.message);
          let savedArray = JSON.parse(localStorage.getItem("Saved"));
          savedArray = savedArray || []; // Initialize as empty array if null

          savedArray.push(i);
          localStorage.setItem("Saved", JSON.stringify(savedArray));
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        //console.log("err --->", err);
      });
  };
  const [index, setIndex] = useState(0);

  const [PropertyData, setPropertyData] = useState({});
  const resPonce = isEmpty(PropertyData);
  const [PropertyImages, setPropertyImages] = useState([]);
  //console.log("🚀 ~ DetailedViewProperty ~ PropertyImages:", PropertyImages);
  const [agentData, setAgentData] = useState({});
  const [EnqiryData, setEnqiryData] = useState({
    message: "",
    first_name: "",
    last_name: "",
    mobile_no: "",
    email: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setEnqiryData({ ...EnqiryData, [name]: value });
  };

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
            price_display_checked: mydata?.[i]?.price_display_checked,
            price_display: mydata?.[i]?.price_display,
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
    ViewPropertyDatabyID(id);
    const getToken = localStorage.getItem('Token');
    if (getToken != null) {
      GetSavedProperty();
    }
  }, []);

  const ViewPropertyDatabyID = async (id) => {
    await axiosInstanceAuth
      .post(`Agency/viewProperty`, {
        id: id,
      })
      .then((res) => {
        const mydata = res?.data?.data;
        const myagentdata = res?.data?.agentData;
        if (res?.data?.status) {
          setPropertyData({
            ...mydata,
            mydata,
            favourite: localStorage
              .getItem("Saved")
              ?.split(",")
              .includes(mydata?._id),
          });
          setAgentData(myagentdata);

          const frontPageImg = mydata?.frontPageImg.map((obj, i) => ({
            original: `${obj}`,
          }));
          const propertyImg = mydata?.propertyImg.map((obj, i) => ({
            original: `${obj}`,
          }));
          const florePlansImg = mydata?.florePlansImg.map((obj, i) => ({
            original: `${obj}`,
          }));

          setPropertyImages([
            ...frontPageImg,
            ...propertyImg,
            ...florePlansImg,
          ]);
        } else {
        }
      })
      .catch((err) => {
        //console.log("err --->", err);
      });
  };

  const SubmitReqest = () => {
    try {
      if (EnqiryData?.message === "") {
        toast.error("Please enter a Message");
      } else if (EnqiryData?.first_name === "") {
        toast.error("Please enter a First Name");
      } else if (EnqiryData?.last_name === "") {
        toast.error("Please enter a Last Name");
      } else if (EnqiryData?.mobile_no === "") {
        toast.error("Please enter a Mobile Number");
      } else if (!emailRegex?.test(EnqiryData?.email)) {
        toast.error("Please enter a valid Email");
      } else {
        axiosInstanceAuth
          .post(`sendEnquiry`, {
            property_id: id,
            agent_id: agentData?.id,
            message: EnqiryData?.message,
            first_name: EnqiryData?.first_name,
            last_name: EnqiryData?.last_name,
            mobile_no: EnqiryData?.mobile_no,
            email: EnqiryData?.email,
          })
          .then((res) => {
            if (res?.data?.status) {
              setEnqiryData({
                message: "",
                first_name: "",
                last_name: "",
                mobile_no: "",
                email: "",
              })
              toast.success("Enquiry Submitted Successfully");
            } else {
              toast.error(res?.data?.message);
            }
          })
          .catch((err) => {
            //console.log("------>> Error", err);
          });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const agentProfiles = useRef(null);
  const agencyInfo = useRef(null);
  const [sharePopUp, SetSharePopUp] = useState(false);
  const shareUrl = window.location.href

  return (
    <>
      <Helmet>
        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:title" content={`${PropertyData?.street_address_number} ${PropertyData?.street_address_name}, ${PropertyData?.suburb}`} />
        <meta property="og:description" content={PropertyData?.discription} />
        {/* <meta property="og:image" content="https://www.myrealestate-ng.com/static/media/news2.0720e989b340dffac792.png" /> */}
        {/* <meta property="og:image" content={`https://www.myrealestate-ng.com${news2}`} /> */}
        <meta property="og:url" content={shareUrl} />
        <meta property="og:type" content="website" />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={shareUrl} />
        <meta property="twitter:title" content={`${PropertyData?.street_address_number} ${PropertyData?.street_address_name}, ${PropertyData?.suburb}`} />
        <meta property="twitter:description" content={PropertyData?.discription} />
      </Helmet>

      {GallaryView && <GallaryPopup data={PropertyImages} GallaryView={GallaryView} setGallaryView={setGallaryView} />}{" "}
      <>
        <div className="px-5 pt-3">
          <div className="xl:px-60 lg:px-44 2xl:px-80 mt-16 lg:mt-0">
            {/* ||---------- Start Section 1 ----------|| */}
            <div className="">
              <div className="text-start text-[#171717] font-semibold text-xs md:text-sm">
                <span className="uppercase">
                  {PropertyData?.status === "active"
                    ? "buy"
                    : PropertyData?.status}
                </span>
                → {PropertyData?.municipality} → {PropertyData?.suburb} →
                {PropertyData?.street_address_name}
                {PropertyData?.street_address_number}
              </div>

              {/* ---------- Property Details Card ---------- */}
              <div className={`grid place-items-center my-5 md:my-10`}>
                <div className="flex flex-col bg-white rounded-lg shadow-md hover:shadow-lg p-4 md:p-6  md:w-full">
                  {/* ---------- Images ---------- */}

                  {!GallaryView && (
                    <div
                      onClick={() => setGallaryView(true)}
                      className={`w-full  flex justify-center items-center gap-4 md:!h-[50vh]`}
                    >
                      <LazyLoadImage
                        src={PropertyData?.frontPageImg?.[0]}
                        alt=""
                        srcSet={PropertyData?.frontPageImg?.[0]}
                        loading="lazy"
                        effect="blur"
                        style={{
                          width: "inherit !important",
                          objectFit: "contain"
                        }}
                        className=" md:h-[50vh] md:w-[65vw] rounded-lg cursor-pointer mb-2 "
                      />
                      <div className=" hidden md:flex flex-col justify-center items-center gap-4 secondimg">
                        <LazyLoadImage
                          style={{ width: "inherit", objectFit: "cover" }}
                          src={PropertyData?.propertyImg?.[0]}
                          alt=""
                          srcSet={PropertyData?.propertyImg?.[0]}
                          loading="lazy"
                          effect="blur"
                          className="w-full md:h-[24.2vh] max-w-[150px] lg:max-w-[250px] rounded-lg cursor-pointer "
                        />
                        <div className="relative h-[50%] max-w-[150px] lg:max-w-[250px]">
                          <LazyLoadImage
                            style={{ width: "inherit" }}
                            src={PropertyData?.florePlansImg?.[0]}
                            alt=""
                            srcSet={PropertyData?.florePlansImg?.[0]}
                            loading="lazy"
                            effect="blur"
                            className="brightness-50 md:h-[24.2vh] w-full rounded-lg cursor-pointer "
                          />
                          <div className="h-full w-full md:h-[25vh] grid place-content-center text-white font-semibold text-4xl absolute inset-0 opacity-100 cursor-pointer">
                            {PropertyImages?.length > 3
                              ? `+${PropertyImages?.length - 3}`
                              : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ---------- Details ---------- */}
                  <div className="">
                    <div className="md:flex md:justify-between items-start gap-5 mt-5 md:mt-7">
                      <div className="text-[#171717] font-bold text-md md:text-xl lg:text-2xl xl:text-3xl">
                        {PropertyData?.street_address_number},
                        {PropertyData?.street_address_name},
                        {PropertyData?.suburb}, {PropertyData?.municipality}
                      </div>
                      <div className="flex items-center gap-2">
                        <LazyLoadImage
                          src={shareRed}
                          alt="icon"
                          srcSet={shareRed}
                          loading="lazy"
                          effect="blur"
                          onClick={() => SetSharePopUp(true)}
                          className="bg-[#FFEAEF] border border-[#FA979A] rounded-full p-1 sm:p-2 md:p-3 cursor-pointer w-8 md:w-11"
                        />
                        {sharePopUp ? <SharePopup SetSharePopUp={SetSharePopUp} PropertyData={PropertyData} /> : ""}

                        {likeFlag || PropertyData?.favourite ? (
                          <LazyLoadImage
                            src={fullRedHeart}
                            alt="icon"
                            srcSet={fullRedHeart}
                            loading="lazy"
                            effect="blur"
                            onClick={(e) => {
                              if (!isAuthanticate) {
                                setAuthPopUp(true);
                              } else {
                                isfavorite(PropertyData);
                              }
                            }}
                            className="bg-[#FFEAEF] border border-[#FA979A] rounded-full p-1 sm:p-2 md:p-3 cursor-pointer w-8 md:w-11"
                          />
                        ) : (
                          <LazyLoadImage
                            src={heart}
                            alt="icon"
                            srcSet={heart}
                            loading="lazy"
                            effect="blur"
                            onClick={(e) => {
                              if (!isAuthanticate) {
                                setAuthPopUp(true);
                              } else {
                                isfavorite(PropertyData);
                              }
                            }}
                            className="bg-[#FFEAEF] border border-[#FA979A] rounded-full p-1 sm:p-2 md:p-3 cursor-pointer w-8 md:w-11"
                          />
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap justify-start items-center gap-2 mt-4">
                      <div className="flex justify-center items-center bg-[#F5F5F5] rounded-md p-2">
                        <img
                          src={bedroom}
                          alt="location"
                          className="w-4 md:w-5 mr-3"
                        />
                        <div className="font-semibold text-[#737373] text-xs md:text-base">
                          {PropertyData?.Bedrooms}
                        </div>
                      </div>
                      <div className="flex justify-center items-center bg-[#F5F5F5] rounded-md p-2">
                        <img
                          src={shower}
                          alt="bedroom"
                          className="w-4 md:w-5 mr-3"
                        />
                        <div className="font-semibold text-[#404040] text-xs md:text-sm">
                          {PropertyData?.Bathrooms}
                        </div>
                      </div>
                      <div className="flex justify-center items-center bg-[#F5F5F5] rounded-md p-2">
                        <img
                          src={car}
                          alt="shower"
                          className="w-4 md:w-5 mr-3"
                        />
                        <div className="font-semibold text-[#404040] text-xs md:text-sm">
                          {PropertyData?.garage_spaces}
                        </div>
                      </div>
                      <div className="flex justify-center items-center bg-[#F5F5F5] rounded-md p-2">
                        <img
                          src={square}
                          alt="car"
                          className="w-4 md:w-5 mr-3"
                        />
                        <div className="font-semibold text-[#404040] text-xs md:text-sm">
                          {PropertyData?.house_size_square}
                        </div>
                      </div>
                      <div className="flex justify-center items-center bg-[#F5F5F5] rounded-md p-2">
                        <img src={home} alt="car" className="w-4 md:w-5 mr-3" />
                        <div className="font-semibold text-[#404040] text-xs md:text-sm">
                          {PropertyData?.house_size}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-start gap-3 mt-5 md:mt-7">
                      <div className="flex flex-col justify-start gap-2">
                        <div className="text-[#171717] font-semibold text-sm md:text-lg lg:text-xl">
                          {/* $
                          {String(PropertyData?.price_display).replace(
                            /\B(?=(\d{3})+(?!\d))/g,
                            ","
                          )} */}
                          {PropertyData?.price && PropertyData?.price_display_checked == 'show_actual_price' ? `$${String(PropertyData?.price).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}` : PropertyData?.price_display}
                        </div>
                        <div className="text-[#737373] font-medium text-xs md:text-sm lg:text-base">
                          Sold on 07 Jul 20222
                        </div>
                      </div>
                      {/* <div className="flex justify-center items-center gap-2 bg-white border border-[#171717]  rounded-lg p-2 md:p-3">
                        <LazyLoadImage
                          src={historyGray}
                          alt="icon"
                          srcSet={historyGray}
                          loading="lazy"
                          effect="blur"
                          className="w-4 cursor-pointer"
                        />
                        <div className="text-[#171717] font-semibold text-xs md:text-sm lg:text-base">
                          Property History
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ---------- End Section 1 ---------- */}

            {/* ||---------- Start Section 2 ----------|| */}

            <div className="grid grid-cols-1 xl:grid-cols-7 place-content-start gap-5 mb-10">
              {/* ------ Left Part ------ */}
              <div className="grid col-span-1 xl:col-span-5">
                {/* ------ Cards ------ */}
                {/* <div className="w-full flex flex-col lg:flex-row justify-start gap-5">
                  <div
                    className={`w-auto lg:w-[50%] flex flex-col justify-start items-start bg-white rounded-2xl shadow-md hover:shadow-lg p-5`}
                  >
                    <div className="text-[#171717] font-semibold text-md md:text-xl">
                      Looking to buy a place like this?
                    </div>
                    <div className="w-full flex justify-start items-center mt-1">
                      <img
                        src={estimateGray}
                        alt="icon"
                        className="mr-2 cursor-pointer"
                      />
                      <div className="text-[#737373] font-medium text-xs md:text-sm lg:text-base underline">
                        Estimate repayments
                      </div>
                    </div>
                  </div>
                  <div
                    className={`w-auto lg:w-[50%] flex flex-col justify-start items-start bg-white rounded-2xl shadow-md hover:shadow-lg p-5`}
                  >
                    <div className="text-[#171717] font-semibold text-md md:text-xl">
                      Looking to sell a similar property?
                    </div>
                    <div className="w-full flex justify-between items-center gap-2 mt-1">
                      <div className="text-[#737373] font-medium text-xs md:text-sm lg:text-base underline">
                        See how the selling agwes
                      </div>
                      <img
                        src={shareBlue}
                        alt="icon"
                        className="p-1 cursor-pointer"
                      />
                    </div>
                  </div>
                </div> */}
                {/* ------ Google Map ------ */}
                <div className="flex flex-col bg-white rounded-lg shadow-md hover:shadow-lg p-4  ">
                  {/* <LazyLoadImage
                  src={map}
                  alt="icon"
                  srcSet={map}
                  loading="lazy"
                  effect="blur"
                  className="cursor-pointer"
                /> */}
                  <div className="custStyle !relative h-[50vh] rounded-md">
                    {resPonce ? (
                      ""
                    ) : (
                      <Googlemap
                        id={id}
                        location={PropertyData?.location?.coordinates}
                      />
                    )}
                  </div>
                  <div className="md:px-4">
                    <div className="text-[#171717] font-bold text-lg md:text-xl lg:text-xl mt-4 md:mt-6 ">
                      Sold By Paul Donahoe, Professionals Collective
                    </div>
                    <div className="text-[#737373] font-semibold text-sm md:text-base lg:text-lg mt-2 ">
                      {PropertyData?.street_address_number}
                      {PropertyData?.street_address_name},{" "}
                      {PropertyData?.suburb}
                    </div>
                    <div className="text-[#525252] font-medium text-xs md:text-sm lg:text-base mt-4 md:mt-6 ">
                      {PropertyData?.heading?.slice(0, 30)}
                    </div>
                    <div className="text-[#525252] font-medium text-xs md:text-sm lg:text-base mt-3 ">
                      <LimitedContentView content={PropertyData?.discription} />
                    </div>

                    {/* <div className="flex justify-start items-center text-[#E5002A] font-medium text-xs md:text-sm lg:text-base cursor-pointer my-4 md:my-8">
                      Read More 
                      <LazyLoadImage
                        src={sideArrowRed}
                        alt="icon"
                        srcSet={sideArrowRed}
                        loading="lazy"
                        effect="blur"
                        className="ml-2"
                      />
                    </div> */}
                  </div>
                </div>

                {/* ------------inspection start---------------- */}
                {/* -------Property features-------- */}
                <div
                  className={`w-auto flex flex-col justify-start items-start bg-white rounded-2xl shadow-md hover:shadow-lg p-5 mt-10`}
                >
                  <div className="text-[#171717] font-semibold text-md md:text-xl">
                    Property features
                  </div>
                  <div className="w-full grid md:grid-cols-2 gap-2 mt-1">
                    <div className="flex items-center gap-2">
                      <div>
                        <MdOutlineLiving />
                      </div>
                      <div>living areas : {PropertyData?.living_areas}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div>
                        {/* <PiToiletLight />  */}
                        <FaToilet />{" "}
                      </div>
                      <div>toilets : {PropertyData?.toilets}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div>
                        <FaBath />
                      </div>
                      <div>Bathrooms : {PropertyData?.Bathrooms}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div>
                        <MdBedroomParent />
                      </div>
                      <div>Bedrooms : {PropertyData?.Bedrooms}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div>
                        <MdOutlineBathroom />
                      </div>
                      <div>Ensuites : {PropertyData?.Ensuites}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div>
                        <MdLocalParking />
                      </div>
                      <div>Carport spaces : {PropertyData?.carport_spaces}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div>
                        <GiMechanicGarage />
                      </div>
                      <div>Garage spaces : {PropertyData?.garage_spaces}</div>
                    </div>
                  </div>
                </div>
                <div
                  className={`w-auto flex flex-col justify-start items-start bg-white rounded-2xl shadow-md hover:shadow-lg p-5 mt-10`}
                >
                  <div className="text-[#171717] font-semibold text-md md:text-xl">
                    Inspections
                  </div>
                  <div
                    className="w-full flex justify-between items-center gap-2 mt-1"
                    onClick={() => navigate(`/inspection`)}
                  >
                    <div className="text-[#737373] font-medium text-xs md:text-sm lg:text-base underline cursor-pointer">
                      There are no upcoming inspections for this property.
                      Contact the agent to see this place.
                    </div>
                    <img
                      src={shareBlue}
                      alt="icon"
                      className="p-1 cursor-pointer"
                    />
                  </div>
                </div>
                {/* ------------inspection end---------------- */}
              </div>
              {/* ------ Right Part ------ */}
              <div
                className={`grid col-span-1 xl:col-span-2 place-content-center xl:place-content-start `}
              >
                <div
                  className="flex flex-col justify-between bg-white rounded-xl shadow-md hover:shadow-lg cursor-pointer sticky top-20    "
                  ref={agentProfiles}
                >
                  {/* ------ Profile ------ */}
                  <div className="flex flex-col justify-center items-center">
                    <div
                      className={`w-full grid place-items-center py-3 rounded-t-xl bg-[${agentData.primary_color}]`}
                    >
                      <Link to={`/agency-profile/${PropertyData?.agency_id}`}>
                        <LazyLoadImage
                          src={agentData?.agencyLogo}
                          alt="icon"
                          srcSet={agentData?.agencyLogo}
                          loading="lazy"
                          effect="blur"
                          className="rounded-lg h-10"
                        />
                      </Link>
                    </div>
                    <div className="flex flex-col justify-center items-center pt-4 md:pt-6 px-4 md:px-6">
                      <LazyLoadImage
                        src={agentData?.profileImg}
                        alt="icon"
                        srcSet={agentData?.profileImg}
                        loading="lazy"
                        effect="blur"
                        className="w-24 aspect-square rounded-full"
                      />
                      <div className="text-[#171717] text-center font-semibold text-sm md:text-lg lg:text-xl mt-4">
                        {agentData?.name}
                      </div>
                      <div className="text-[#737373] text-center font-medium text-xs lg:text-sm mt-1">
                        {/* Professionals Collective - Burleigh / Mudgeeraba */}
                        {agentData?.agencyName}
                      </div>

                      {/* ------ Ratings ------ */}
                      <div className="flex justify-center items-center mt-4">
                        <Rating rating={agentData?.average} />
                      </div>
                      <div className="text-[#A3A3A3] text-center font-medium text-xs mt-1">
                        {agentData.average == 0 || agentData.average == null
                          ? agentData?.average
                          : agentData?.average.toFixed(1)}{" "}
                        ({agentData?.reviewCount} review)
                      </div>

                      {/* ------ Contact ------ */}
                      <div className="grid grid-cols-1 gap-3 my-4 md:my-6">
                        <div className="flex justify-start items-center gap-2 border border-[#F5F5F5] bg-white rounded-xl p-2">
                          <img
                            src={locationRed}
                            alt="icon"
                            className="bg-[#FFEAEF] p-3 rounded-lg"
                          />
                          <div className="flex flex-col justify-start items-center">
                            <div className="text-[#3B8FD4] font-medium text-xs">
                              {agentData?.agencyAddress}
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-start items-center gap-2 border border-[#F5F5F5] bg-white rounded-xl p-2">
                          <img
                            src={callBlue}
                            alt="icon"
                            className="bg-[#E5F3FA] p-3 rounded-lg"
                          />
                          <div className="flex flex-col justify-start items-center">
                            <div className="text-[#171717] font-semibold  text-xs">
                              Phone No.
                            </div>
                            <div className="text-[#3B8FD4] font-medium text-center text-xs mt-1">
                              <a
                                href={`tel:${agentData?.phone}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {agentData?.phone}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* ------ Buttons ------ */}
                  <div className="w-full px-4 md:px-6 pb-4 md:pb-6">
                    <button
                      className="w-full text-xs md:text-sm lg:text-base hover:font-semibold font-medium border bg-[#E5002A] text-white hover:bg-white  hover:text-[#E5002A] hover:border-[#E5002A] py-3 px-5 rounded-3xl mt-3"
                      onClick={() => navigate(`/appraisal/${agentData?.id}`)}
                    >
                      Get your property appraised
                    </button>

                    <button
                      className="w-full text-xs md:text-sm lg:text-base font-semibold border text-[#737373] border-[#737373] py-3 px-5 rounded-3xl mt-3"
                      onClick={() =>
                        navigate(`/agent-profile/${agentData?.id}`)
                      }
                    >
                      Get in touch
                    </button>

                    {/* <button className="w-full flex justify-center items-center text-xs md:text-sm lg:text-base font-semibold border text-[#737373] border-[#737373] py-3 px-5 rounded-3xl mt-3">
                      <img
                        src={startGray}
                        alt="icon"
                        className="mr-2 cursor-pointer"
                      />
                      <div>Save property</div>
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
            {/* ---------- End Section 2 -- -------- */}

            {/* ||---------- Start Section 3 -- --------|| */}
            <div className="grid grid-cols-1 xl:grid-cols-7 place-items-start gap-10 mb-10">
              {/* ------ Left Part ------ */}
              <div className="grid col-span-1 xl:col-span-5">
                {/* ------ Enquiry  ------ */}
                <div className="flex flex-col justify-between bg-white rounded-xl shadow-md hover:shadow-lg cursor-pointer">
                  {/* ------ Heading ------ */}
                  <div className="w-full flex flex-col justify-center items-start">
                    <div
                      className={`w-full grid place-items-center py-3 rounded-t-xl bg-[${agentData.primary_color}]`}
                    >
                      <Link to={`/agency-profile/${PropertyData?.agency_id}`}>
                        <LazyLoadImage
                          src={agentData?.agencyLogo}
                          alt="icon"
                          srcSet={agentData?.agencyLogo}
                          loading="lazy"
                          effect="blur"
                          className="rounded-lg h-10"
                        />
                      </Link>
                    </div>
                    {/* ------ Detail ------ */}

                    <div className="w-full flex flex-col justify-start items-start pt-6 md:pt-12 px-4 md:px-6">
                      <div className="text-[#171717] font-bold text-lg md:text-xl lg:text-2xl">
                        Email enquiry to {agentData.agencyName}
                      </div>

                      <div className="w-full flex flex-col md:flex-row justify-start items-center gap-4  md:gap-6 mt-4 md:mt-6">
                        <LazyLoadImage
                          src={PropertyData?.frontPageImg?.[0]}
                          alt=""
                          srcSet={PropertyData?.frontPageImg?.[0]}
                          loading="lazy"
                          effect="blur"
                          className="w-auto md:w-96 rounded-lg"
                        />
                        <div className="w-full flex flex-col justify-start">
                          <div className="text-[#171717] font-bold text-sm md:text-lg lg:text-xl">
                            {PropertyData?.street_address_number},
                            {PropertyData?.street_address_name},
                            {PropertyData?.suburb}, {PropertyData?.municipality}
                          </div>
                          <div className="text-[#404040] font-bold text-xs md:text-sm lg:text-base mt-2">
                            $ {PropertyData?.price_display}
                          </div>
                          <div className="flex flex-wrap justify-between items-start gap-4 mt-5 md:mt-5">
                            <div className="flex justify-start items-center gap-2">
                              <img
                                src={agentData?.profileImg}
                                alt="icon"
                                className="w-10 md:w-14 aspect-square rounded-full"
                              />
                              <div>
                                <div className="text-[#171717] font-semibold ext-xs md:text-sm lg:text-base xl:text-lg">
                                  {agentData?.name}
                                </div>
                                <Rating rating={agentData?.average} />
                                <span className="text-[#A3A3A3] text-sm">
                                  {agentData.average == 0 ||
                                    agentData.average == null
                                    ? agentData?.average
                                    : agentData?.average.toFixed(1)}{" "}
                                  ({agentData?.reviewCount} review)
                                </span>
                              </div>
                            </div>
                            <div className="flex justify-center items-center gap-2 bg-white border border-[#E5E5E5] cursor-pointer rounded-lg px-5 py-2">
                              <LazyLoadImage
                                src={callBlue}
                                alt="icon"
                                srcSet={callBlue}
                                loading="lazy"
                                effect="blur"
                                className="w-4 cursor-pointer"
                              />
                              <div className="text-[#171717] font-medium text-xs md:text-sm">
                                {agentData?.phone}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ------ Inputs ------ */}
                    <div className="w-full flex flex-col justify-start items-start pt-6 md:pt-12 px-4 md:px-6">
                      <div className="w-full">
                        <div className="font-medium text-[#171717] text-xs md:text-sm lg:text-base">
                          Message<span className="px-1 text-red-500">*</span>
                        </div>
                        <textarea
                          rows="6"
                          type="text"
                          name="message"
                          value={EnqiryData?.message}
                          onChange={onChangeInput}
                          placeholder="Type here...."
                          className="w-full font-medium text-[#737373] text-xs md:text-sm lg:text-base outline-none border border-[#E5E5E5] rounded-3xl py-3 px-5  mt-2 md:mt-4"
                        />
                      </div>

                      <div className="w-full flex flex-col md:flex-row gap-4 mt-4 md:mt-6">
                        <div className="w-full">
                          <div className="w-full font-medium text-[#171717] text-xs md:text-sm lg:text-base">
                            First name
                            <span className="px-1 text-red-500">*</span>
                          </div>
                          <input
                            type="text"
                            name="first_name"
                            value={EnqiryData?.first_name}
                            onChange={onChangeInput}
                            placeholder="Enter first name"
                            className="w-full font-medium text-[#737373] text-xs md:text-sm lg:text-base outline-none border border-[#E5E5E5] rounded-3xl py-3 px-5  mt-2 md:mt-4"
                          />
                        </div>
                        <div className="w-full">
                          <div className="font-medium text-[#171717] text-xs md:text-sm lg:text-base">
                            Last name
                            <span className="px-1 text-red-500">*</span>
                          </div>
                          <input
                            type="text"
                            name="last_name"
                            value={EnqiryData?.last_name}
                            onChange={onChangeInput}
                            placeholder="Enter last name"
                            className="w-full font-medium text-[#737373] text-xs md:text-sm lg:text-base outline-none border border-[#E5E5E5] rounded-3xl py-3 px-5  mt-2 md:mt-4"
                          />
                        </div>
                      </div>

                      <div className="w-full flex flex-col md:flex-row gap-4 mt-4 md:mt-6">
                        <div className="w-full">
                          <div className="w-full font-medium text-[#171717] text-xs md:text-sm lg:text-base">
                            Mobile phone number
                            <span className="px-1 text-red-500">*</span>
                          </div>
                          <input
                            type="number"
                            name="mobile_no"
                            value={EnqiryData?.mobile_no}
                            onChange={onChangeInput}
                            placeholder="Enter mobile phone number"
                            className="w-full font-medium text-[#737373] text-xs md:text-sm lg:text-base outline-none border border-[#E5E5E5] rounded-3xl py-3 px-5  mt-2 md:mt-4"
                          />
                        </div>
                        <div className="w-full">
                          <div className="font-medium text-[#171717] text-xs md:text-sm lg:text-base">
                            Email <span className="px-1 text-red-500">*</span>
                          </div>
                          <input
                            type="email"
                            name="email"
                            value={EnqiryData?.email}
                            onChange={onChangeInput}
                            placeholder="Enter email address"
                            className="w-full font-medium text-[#737373] text-xs md:text-sm lg:text-base outline-none border border-[#E5E5E5] rounded-3xl py-3 px-5  mt-2 md:mt-4"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* ------ Buttons ------ */}
                  <div className="w-full px-4 md:px-6 pb-6 md:pb-12">
                    <button
                      className="w-full text-xs md:text-sm lg:text-base hover:font-semibold font-medium border bg-[#E5002A] text-white hover:bg-white  hover:text-[#E5002A] hover:border-[#E5002A] py-3 px-5 rounded-3xl mt-5 md:mt-8"
                      onClick={SubmitReqest}
                    >
                      Send enquiry
                    </button>
                    <div className="text-[#171717] font-semibold text-xs md:text-sm lg:text-base underline px-2 mt-4 md:mt-6">
                      Personal Information Collection Statement
                    </div>
                    <div className="text-[#737373] font-medium text-xs md:text-sm lg:text-base px-2 mt-2">
                      This form is only to be used for sending genuine email
                      enquiries to the Agent. realestate.com.au Pty Ltd reserves
                      its right to take any legal or other appropriate action in
                      relation to misuse of this service.
                    </div>
                  </div>
                </div>
              </div>
              {/* ------ Right Part ------ */}
              <div
                ref={agencyInfo}
                className="sticky top-20 w-full xl:col-span-2 place-content-center xl:place-content-start"
              >
                <div className="grid grid-cols-1   ">
                  <div className="flex flex-col sm:flex-row xl:flex-col justify-between items-center sm:items-start gap-6 xl:gap-12 ">
                    {/* ------ News Card ------ */}
                    <div className="flex flex-col justify-start items-start bg-white rounded-lg shadow-md hover:shadow-lg p-2 ">
                      <LazyLoadImage
                        src={news1}
                        alt="icon"
                        srcSet={news1}
                        loading="lazy"
                        effect="blur"
                        className="rounded-lg"
                      />
                      <div className="text-[#404040] font-semibold text-sm md:text-base lg:text-lg mt-5 px-3">
                        Professionals Collective - Burleigh / Mudgeeraba
                      </div>
                      <div className="text-[#737373] font-medium text-xs md:text-sm lg:text-base my-2 px-3">
                        5/109 West Burleigh Road,, BURLEIGH WATERS, QLD 4220
                      </div>
                    </div>

                    {/* ------ News Card ------ */}
                    <div className="flex flex-col justify-start bg-white rounded-lg shadow-md hover:shadow-lg p-2">
                      <LazyLoadImage
                        src={news2}
                        alt="icon"
                        srcSet={news2}
                        loading="lazy"
                        effect="blur"
                        className="w-full rounded-lg"
                      />
                      <div className="text-[#737373] font-medium text-xs md:text-sm lg:text-base mt-4 px-3">
                        News: Victoria: Melbourne
                      </div>
                      <div className="text-[#404040] font-semibold text-sm md:text-base lg:text-lg mt-5 px-3">
                        Service taken to new levels at boutique Armadale
                        development
                      </div>
                      <div className="flex justify-start items-center text-[#E5002A] font-medium text-xs md:text-sm lg:text-base cursor-pointer my-5 px-3">
                        Read More
                        <LazyLoadImage
                          src={sideArrowRed}
                          alt="icon"
                          srcSet={sideArrowRed}
                          loading="lazy"
                          effect="blur"
                          className="ml-2"
                        />
                      </div>
                      <div className="flex justify-center items-end">
                        <img
                          src={logoSmall}
                          alt="logo"
                          className="h-6 sm:h-8 mx-3 mb-3 rounded-xl  cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ---------- End Section 3 -- -------- */}
          </div>
        </div>
      </>
      {/* <<----- Auth Pop Up ----->> */}
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
          <div className="opacity-20 fixed  inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default DetailedViewProperty;
