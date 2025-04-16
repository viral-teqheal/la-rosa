import React, { useEffect, useState } from "react";
import axiosInstance from "../../../apiInstances/axiosInstance";
// import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import righta from "../../../assets/lefta.png";
import lefta from "../../../assets/righta.png";
import { BACKEND_BASE_URL } from "../../../apiInstances/baseurl";
import { useNavigate } from "react-router-dom";

const Developmentcart = () => {
  const navigate = useNavigate();
  const [ClientSliderData, setClientSliderData] = useState([]);

  useEffect(() => {
    const agentDetail = async () => {
      try {
        const res = await axiosInstance.get(`/latestagent`);
        const myData = res?.data?.data;
        const arrData = myData.map((e, i) => ({
          id: i + 1,
          clientImage: e.profileImg,
          head: e.name,
          property: e.count,
          _id: e._id,
        }));
        setClientSliderData(arrData);
      } catch (error) {
        //console.log(error);
      }
    };
    agentDetail();
  }, []);

  return (
    <>
      <div className="mt-20 lg:mx-40">
        <div className="flex justify-between">
          <h2 className="font-semibold xl:text-3xl lg:text-2xl md:text-xl text-lg mb-2 text-[#262626]">
            New Agents
          </h2>
          <div className="flex my-auto mb-auto gap-2">
            <div className="">
              <img className="prev1 cursor-pointer w-10 " src={righta} alt="" />
            </div>
            <img className="next2 cursor-pointer w-10" src={lefta} alt="" />
          </div>
        </div>
        <p className="lg:text-base text-sm text-[#737373] pb-8"></p>
      </div>
      <div className="Agent lg:mx-40">
        <Swiper
          loop={false}
          spaceBetween={20}
          slidesPerView={1}
          modules={[Navigation]}
          navigation={{
            prevEl: ".prev1",
            nextEl: ".next2",
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            // 1080: {
            //   slidesPerView: 4,
            //   spaceBetween: 30,
            // },
            1440: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1460: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
          }}
          className="w-[100%]"
        >
          <div className="grid place-content-center">
            {ClientSliderData.map((e) => (
              <SwiperSlide key={e.id}>
                <div className="bg-white rounded-xl p-2 shadow-[6px_6px_10px_-5px_rgba(0,0,0,0.3)]">
                  <div
                    className="relative rounded-xl cursor-pointer"
                    onClick={() => navigate(`/agent-profile/${e?._id}`)}
                  >
                    <img
                      className="rounded-xl object-cover object-top bg-white h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] w-full"
                      src={e.clientImage}
                      alt="img"
                    />
                    <div>
                      <p className="absolute top-0 m-2 bg-white inline-block font-semibold p-2 text-sm md:text-base rounded-md">
                        {e.property} Properties
                      </p>
                    </div>
                    <div className="text-black -bottom-11 rounded-b-md text mx-auto bg-white w-full p-3">
                      <h2 className="font-medium text-md md:text-lg">
                        {e.head}
                      </h2>
                      {/* <p className="text-xs lg:text-sm">{e.para}</p> */}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </div>

          {ClientSliderData.length > 10 ? <SwiperSlide key="show-more">
            <div className="flex justify-start items-center h-80 px-2">
              <div className="bg-[#ffd9e2] p-3 rounded-full cursor-pointer flex justify-center items-center" onClick={() => navigate('/find-agents')}>
                <p className=" text-sm pe-2 text-semibold">See More</p>
                <img src={lefta} alt="more" className="w-[30px]" />
              </div>
            </div>
          </SwiperSlide> : null}
        </Swiper>
      </div>
    </>
  );
};

export default Developmentcart;
