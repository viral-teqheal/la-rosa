import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-image-gallery/styles/css/image-gallery.css";
import {
  SignUpForm,
  LogInForm,
  ForgotPasswordForm,
  ResetPasswordForm,
  VerifyOtp,
} from "./authentication";
import {
  MainDashBoard,
  BuyProperty,
  BuyPropertylist,
  RentProperty,
  SoldProperty,
  NewHomes,
  FindAgent,
  Commercial,
  AgentAppraisal,
  DetailedViewProperty,
  AgencyProfile,
  AgentProfile,
  AgentReview,
  UserDashBoard,
  MySavedProperty,
  AdvertiseScreen,
  AccountSetting,
  Inspection,
  SaveSearch,
  Contactus,
  NavBar,
  Footer,
} from "./components";
import BuyPropertySearch from "./components/BuyProperty/BuyPropertySearch";
import RentPropertySearch from "./components/RentProperty/RentPropertySearched";
import SoldPropertySearch from "./components/SoldProperty/SoldPropertySearch";
import SearchbyAddress from "./components/searchByAddress/SearchByAddress";
import Advertise from "./components/Advertise/Advertise";

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const getPath = useLocation().pathname.split("/")?.[2];
  const checkAuth = localStorage.getItem("Token");
  const location = useLocation();
  const path = location.pathname;
  useEffect(() => {
    if (checkAuth === undefined || checkAuth === null) {
      if (getPath === "reset-password") {
      } else {
        if (getPath === "log-in") {
          navigate("/");
        }
      }
    }
  }, [checkAuth]);
  const [search, setSearch] = useState(undefined);
  return (
    <>
      {path !== "/log-in" &&
        path !== "/auth/forgot-password" &&
        path !== "/sign-up" && <NavBar setSearch={setSearch} />}

      <Routes>
        <Route
          exact
          path="/"
          element={<MainDashBoard setSearch={setSearch} />}
        />
        <Route exact path="/buy" element={<BuyProperty />} />
        <Route
          exact
          path="/buy/searched/:data"
          element={<BuyPropertySearch />}
        />
        {/* <Route path="/buy/:encryptedData" element={<BuyProperty />} /> */}

        <Route path="/buy/list-1" element={<BuyPropertylist />} />
        <Route exact path="/rent" element={<RentProperty />} />
        <Route
          exact
          path="/rent/searched/:data"
          element={<RentPropertySearch />}
        />
        <Route
          exact
          path="address/searched"
          element={<SearchbyAddress search={search} />}
        />
        <Route exact path="/sold" element={<SoldProperty />} />
        <Route
          exact
          path="/sold/searched/:data"
          element={<SoldPropertySearch />}
        />
        <Route exact path="/new-homes" element={<NewHomes />} />

        <Route exact path="/find-agents" element={<FindAgent />}>
          <Route path="/find-agents/:key" element={<FindAgent />} />
        </Route>
        <Route exact path="/commercial" element={<Commercial />} />

        <Route exact path="/appraisal/:id" element={<AgentAppraisal />} />
        <Route
          exact
          path="/property-house/:id"
          element={<DetailedViewProperty />}
        />
        <Route exact path="/agency-profile/:id" element={<AgencyProfile />} />
        <Route exact path="/agent-profile/:id" element={<AgentProfile />} />
        <Route exact path="/agent-review/:id" element={<AgentReview />} />

        <Route exact path="/dashbord" element={<UserDashBoard />} />
        <Route exact path="/my-saved-property" element={<MySavedProperty />} />
        <Route exact path="/account-settings" element={<AccountSetting />} />
        <Route exact path="/uses-for-advertise" element={<AdvertiseScreen />} />
        <Route exact path="/inspection" element={<Inspection />} />
        <Route exact path="/SaveSearch" element={<SaveSearch />} />
        <Route exact path="/contactus" element={<Contactus />} />

        <Route exact path="/VerifyOtp" element={<VerifyOtp />} />
        <Route exact path="/log-in" element={<LogInForm />} />
        <Route exact path="/sign-up" element={<SignUpForm />} />
        <Route
          exact
          path="/auth/forgot-password"
          element={<ForgotPasswordForm />}
        />
        <Route
          exact
          path="/auth/reset-password/:id/:token"
          element={<ResetPasswordForm />}
        />
        {/* Advertise route */}
        <Route exact path="/advertise" element={<Advertise />} />
      </Routes>
      {path !== "/log-in" &&
        path !== "/auth/forgot-password" &&
        path !== "/sign-up" && <Footer />}
    </>
  );
}

export default App;
