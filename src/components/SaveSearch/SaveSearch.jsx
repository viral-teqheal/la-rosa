import React, { useEffect, useId, useState } from "react";
import Layout2 from "../../Layouts/Layout2";
import axiosInstanceAuth from "../../apiInstances/axiosInstanceAuth";
import { MdOutlineDelete, MdNotifications } from "react-icons/md";
import icon from "../.././assets/icon.svg";
import icon1 from "../.././assets/icon1.svg";
import icon2 from "../.././assets/icon2.svg";
import { useNavigate } from "react-router-dom";

const SaveSearch = () => {
  const [first, setFirst] = useState("");
  const navigate = useNavigate();
  const id = useId();

  const Savesearch = () => {
    axiosInstanceAuth
      .post(`/SearchShow`)
      .then((res) => {
        setFirst(res.data.data);
      })
      .catch((err) => {
        //console.log(err);
      });
  };

  useEffect(() => {
    Savesearch();
  }, []);

  const SaveSearchdelete = async (id) => {
    await axiosInstanceAuth
      .post(`/Searchdelete/${id}`)
      .then((res) => {
        if (res.data.status) {
          Savesearch();
        }
      })
      .catch((err) => {
        //console.log(err);
      });
  };

  const clickToRedirect = (data) => {
    localStorage.setItem("buyData", JSON.stringify(data));
    navigate("/buy");
  };

  return (
    <>
      <div className="pt-3">
        <div className="container mx-auto xl:max-w-7xl lg:max-w-4xl md:max-w-2xl max-w-xs w-full">
          <div className="text-[1.5rem] font-semibold text-[#3d3b40] mt-5 mb-16">
            Saved searches
          </div>
          {first?.length > 0 ? (
            <div className="grid md:grid-cols-2 xl:grid-cols-3  gap-10 mb-[7.7rem] ">
              {first?.map((data, i) => (
                <div className="bg-white rounded-lg  p-5" key={`${id}-${i}`}>
                  <div className="">
                    <h2
                      onClick={() =>
                        navigate(`/buy?data=${JSON.stringify(data?.data)}`)
                      }
                      // onClick={() => clickToRedirect(data)}
                      className="text-xl cursor-pointer font-semibold pb-4"
                    >
                      {data?.name}
                    </h2>
                    <hr className="-mx-5 pb-4" />
                  </div>
                  <div className=" text-[#767c81] py-3">Buy | Any Price</div>
                  <div className="flex gap-3">
                    <img src={icon} alt="img" className="w-7" /> |
                    <img src={icon1} alt="img" className="w-7" /> |
                    <img src={icon2} alt="img" className="w-7" />
                  </div>
                  <div className="text-sm text-[#767c81] py-2 leading-6">
                    Save your Property Save your Savesearch Property write.....
                  </div>
                  <hr className="-mx-5 my-5" />
                  <div className="flex justify-between px-3 ">
                    <div className="cursor-pointer">
                      <MdOutlineDelete
                        onClick={() => SaveSearchdelete(data?._id)}
                        size={"1.5em"}
                      />
                    </div>
                    <div className="flex gap-2">
                      <MdNotifications size={"1.5em"} />
                      Notify me
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center my-24 py-20">
              <div>You don't have any saved searches yet.</div>
              <div className="text-[#493b40] mt-3">
                Save your frequent searches after you perform a search.
              </div>
              <button
                onClick={() => navigate("/dashbord")}
                className="text-white px-5 py-3 bg-[#e4002b] rounded-lg mt-8"
              >
                Back to previous
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default SaveSearch;
