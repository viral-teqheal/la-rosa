import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ScrollToTop from "./ScrollToTop";
import { StyledEngineProvider } from "@mui/material/styles";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <GoogleOAuthProvider clientId="1056607567741-s0freilol3fkvk9da72c2gfup3e5aldc.apps.googleusercontent.com">
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        style={{ fontSize: "16px", zIndex: 999999999999999 }}
        pauseOnHover
      />
      <ScrollToTop>
        <StyledEngineProvider injectFirst>
          <HelmetProvider>
            <Provider store={store}>
              <App />
            </Provider>
          </HelmetProvider>
        </StyledEngineProvider>
      </ScrollToTop>
    </BrowserRouter>
  </GoogleOAuthProvider>
  // </React.StrictMode>
);

reportWebVitals();
