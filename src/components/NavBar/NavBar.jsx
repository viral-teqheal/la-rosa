import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./NavBar.css";
import logoSmall from "../../assets/logo-new.png";
import sideArrow from "../../assets/side-arrow.png";
import Profile from "../../assets/Profile.png";
import { FaBars } from "react-icons/fa";
import TopAds from "../Adds/TopAds";
import axiosInstance from "../../apiInstances/axiosInstance";

const NavBar = () => {
  const getPath = useLocation().pathname.split("/")?.[1];
  // console.log("🚀 ~ NavBar ~ getPath:", getPath)
  const navigate = useNavigate();

  const checkAuth = localStorage.getItem("Token");
  const headerData = [
    {
      id: 0,
      pathname: "/buy",
      pagename: "Buy",
    },
    {
      id: 1,
      pathname: "/rent",
      pagename: "Rent",
    },
    {
      id: 2,
      pathname: "/sold",
      pagename: "Sold",
    },
    {
      id: 3,
      pathname: "/new-homes",
      pagename: "New homes",
    },
    {
      id: 4,
      pathname: "/find-agents",
      pagename: "Find agents",
    },
    {
      id: 5,
      pathname: "/commercial",
      pagename: "Commercial",
    },
  ];
  const [navbar, setNavbar] = useState(true)
  const [navbarSticky, setNavbarSticky] = useState(true)
  const [ads, setAds] = useState([]);
  const [scrolling, setScrolling] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { longitude, latitude } = pos.coords;
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      axiosInstance(url)
        .then((data) => {
          const state = data.data.address.state.split(' ')[0]
          getAdsList(state)
        })
        .catch((err) =>
          console.log("err", err))
    })
  }, [])
  const getAdsList = (state) => {
    axiosInstance.get(`/advertise/ads/list?address=${state}`)
      .then((res) => {
        const result = res.data.data;
        setAds(result)
      })
      .catch((error) => console.log("err --->", error))
  }

  const onScroll = (e) => {
    const currentScrollTop = e.target.documentElement.scrollTop;
    if (currentScrollTop > 140) {
      setNavbarSticky(false);
    }
    if (currentScrollTop < 140) {
      setNavbarSticky(true);
    }
    setScrollTop(currentScrollTop);
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [scrollTop]);

  return (
    <>
      {getPath == "" || getPath == "advertise" ? "" :
        ads.topAds && ads.topAds[0] && <div className="bg-white justify-center w-full border-b py-4 hidden lg:flex ">
          <TopAds list={ads.topAds} />
        </div>}
      <nav className={`navbar navbar-container ${!navbarSticky ? 'fixed -mt-[140px]' : ''}`}>
        <div className="flex justify-between items-center">
          {navbar ?
            <div className="block lg:hidden text-2xl pl-3" onClick={() => setNavbar(!navbar)}>
              <FaBars />
            </div> :
            <div className="block lg:hidden text-2xl pl-3" onClick={() => setNavbar(!navbar)}>&#10006;</div>
          }
          <div
            className="logo grid place-items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src={logoSmall}
              alt="logo"
              className="h-[25px] xl:h-[30px]  lg:h-10 sm:mx-5 mx-2 rounded-xl cursor-pointer"
            />
          </div>
          {navbar &&
            <>
              <ul className={`${`menu-items hidden ${checkAuth === undefined || checkAuth === null ? "xl:ml-[-160px]" : "xl:ml-[-300px]"} lg:flex !justify-center !items-center`}`}>
                {headerData?.map((data, index) => (
                  <div key={index}>
                    <li className="min-w-max effect-h">
                      <Link to={data.pathname}>
                        <div className={`${`/${getPath}` === data.pathname && "font-bold "} lg:!flex !justify-center !items-center text-[#000000] rounded-3xl hidden hover:font-semibold hover:text-[#404040]`}>
                          {data.pagename}
                        </div>
                      </Link>
                    </li>
                  </div>
                ))}
              </ul>
            </>
          }
          {checkAuth === undefined || checkAuth === null ? (
            <div className="auth-button mx-1 lg:mx-5">
              <button
                className="sign text-black font-medium mx-1 lg:mx-5"
                onClick={() => {
                  navigate("/log-in");
                }}
              >
                <p className="flex justify-center items-center">
                  Sign in
                  <img src={sideArrow} alt="" className="signin-arrow pl-2 h-2 " />
                </p>
              </button>
              <button
                className="join py-2 px-5 rounded-3xl border bg-[#E5002A] text-white hover:bg-white  hover:text-[#E5002A] hover:border-[#E5002A] font-medium"
                onClick={() => {
                  navigate("/sign-up");
                }}
              >
                Join
              </button>
            </div>
          ) : (
            <div className="auth-button auth-icon mx-5">
              <img
                src={Profile}
                alt="profile"
                className="profile sm:p-3 p-2"
                onClick={() => {
                  navigate("/dashbord");
                }}
              />
            </div>
          )}
        </div>
      </nav >
      {!navbar &&
        <ul className="menuitems lg:hidden block h-screen z-50" >
          {headerData?.map((data, index) => (
            <div key={index}>
              <li className="min-w-max effect-h" onClick={() => {
                setNavbar(!navbar)
                navigate(data?.pathname)
              }}>
                {/* <Link to={data.pathname}> */}
                <div className={`${`/${getPath}` === data.pathname && "font-bold"} flex justify-center items-center  text-[#000000] rounded-3xl mb-7 hover:font-semibold hover:text-[#404040]`}>
                  {data.pagename}
                </div>
                {/* </Link> */}
              </li>
            </div>
          ))}
        </ul>
      }
    </>
  );
};

export default NavBar;