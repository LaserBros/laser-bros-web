import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./assets/css/style.scss";
import "./assets/css/style-dark.scss";

import "./employee/assets/css/style.scss";
import "./employee/assets/css/style-dark.scss";

import "bootstrap/dist/css/bootstrap.min.css";
import Loader from "./layouts/Loader";
import { ThemeProvider } from "./components/Themecontext";

import { ToastContainer } from "react-toastify";

import { UserProvider } from "./localstorage/UserProfileContext";

import RoutesFile from "./Routes";
// import DxfAnalyzer from "./screens/private/dxfFile";

function App() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {loading ? (
        <div className="loaderdiv">
          <Loader />
        </div>
      ) : (
        <UserProvider>
          <ThemeProvider>
            {/* <Router>  */}
            <Router basename={process.env.REACT_APP_BASENAME}>
             <RoutesFile />
            </Router>
            <ToastContainer />
          </ThemeProvider>
        </UserProvider>
      )}
    </>
  );
}

export default App;
