import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./assets/css/style.scss";
import "./assets/css/style-dark.scss";
import Layout from "./Layout";
import Layout2 from "./Layout2";
import Layout3 from "./Layout3";
import Login from "./auth/Login";
import ForgotPassword from "./auth/Forgotpassword";
import OTP from "./auth/OTP";
import ResetPassword from "./auth/Resetpassword";
import SignUp from "./auth/Signup";
import Home from "./screens/public/Home";
import Aboutus from "./screens/public/Aboutus";
import Lasercutting from "./screens/public/services/Lasercutting";
import LaserCuttingGuidelines from "./screens/public/resources/Lasercutting";
import BendingGuidelines from "./screens/public/resources/Bending";
import Steel from "./screens/public/resources/Steel";
import Aluminum from "./screens/public/resources/Aluminum";
import StainlessSteel from "./screens/public/resources/Stainlesssteel";
import Brass from "./screens/public/resources/Brass";
import Specialty from "./screens/public/resources/Specialty";
import FAQ from "./screens/public/resources/FAQ";
import Shipping from "./screens/public/resources/Shipping";
import PaymentTerms from "./screens/public/resources/Paymentterms";
import PrivacyPolicy from "./screens/public/resources/Privacypolicy";
import RefundPolicy from "./screens/public/resources/Refundpolicy";
import TermsService from "./screens/public/resources/Termsofservice";
import Bending from "./screens/public/services/Bending";
import Orders from "./screens/private/Orders";
import RFQS from "./screens/private/RFQS";
import MyProfile from "./screens/private/Profile";
import MyAddresses from "./screens/private/Addresses";
import AddAddress from "./screens/private/Addaddress";
import EditAddress from "./screens/private/Editaddress";
import PaymentCards from "./screens/private/Paymentcards";
import OrdersDetail from "./screens/private/Ordersdetail";
import Quotes from "./screens/private/Quotes";
import QuotesDetail from "./screens/private/Quotesdetail";
import "bootstrap/dist/css/bootstrap.min.css";
import Loader from "./layouts/Loader";
import { ThemeProvider } from "./components/Themecontext";
import ScrollToTop from "./components/ScrollToTop";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./middleware/PrivateRoute";
import { UserProvider } from "./localstorage/UserProfileContext";
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
              <ScrollToTop>
                <Routes>
                  <Route exact path="/login" element={<Login />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/otp" element={<OTP />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route
                    element={
                      <Layout>
                        <Outlet />
                      </Layout>
                    }
                  >
                    <Route path="/" element={<Home />} />
                    <Route path="/about-us" element={<Aboutus />} />
                    <Route path="/laser-cutting" element={<Lasercutting />} />
                    <Route path="/bending" element={<Bending />} />
                  </Route>
                  <Route
                    element={
                      <Layout2>
                        <Outlet />
                      </Layout2>
                    }
                  >
                    <Route
                      path="/resources/laser-cutting"
                      element={<LaserCuttingGuidelines />}
                    />
                    <Route
                      path="/resources/bending"
                      element={<BendingGuidelines />}
                    />
                    <Route path="/resources/steel" element={<Steel />} />
                    <Route path="/resources/aluminum" element={<Aluminum />} />
                    <Route
                      path="/resources/stainless-steel"
                      element={<StainlessSteel />}
                    />
                    <Route path="/resources/brass" element={<Brass />} />
                    <Route
                      path="/resources/specialty"
                      element={<Specialty />}
                    />
                    <Route path="/resources/faq" element={<FAQ />} />
                    <Route path="/resources/shipping" element={<Shipping />} />
                    <Route
                      path="/resources/payment-terms"
                      element={<PaymentTerms />}
                    />
                    <Route
                      path="/resources/privacy-policy"
                      element={<PrivacyPolicy />}
                    />
                    <Route
                      path="/resources/refund-policy"
                      element={<RefundPolicy />}
                    />
                    <Route
                      path="/resources/terms-service"
                      element={<TermsService />}
                    />
                  </Route>
                  <Route
                    element={
                      <Layout3>
                        <Outlet />
                      </Layout3>
                    }
                  >
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/rfqs" element={<RFQS />} />
                    <Route
                      path="/orders/orders-detail"
                      element={<OrdersDetail />}
                    />
                    <Route
                      path="/my-profile"
                      element={<PrivateRoute element={<MyProfile />} />}
                    />
                    <Route
                      path="/my-addresses"
                      element={<PrivateRoute element={<MyAddresses />} />}
                    />
                    <Route
                      path="/my-address/add-address"
                      element={<PrivateRoute element={<AddAddress />} />}
                    />
                    <Route
                      path="/my-address/edit-address/:id"
                      element={<PrivateRoute element={<EditAddress />} />}
                    />
                    <Route
                      path="/payment-cards"
                      element={<PrivateRoute element={<PaymentCards />} />}
                    />
                    <Route
                      path="/quotes"
                      element={<PrivateRoute element={<Quotes />} />}
                    />
                    <Route
                      path="/quotes/quotes-detail"
                      element={<QuotesDetail />}
                    />
                  </Route>
                </Routes>
              </ScrollToTop>
            </Router>
            <ToastContainer />
          </ThemeProvider>
        </UserProvider>
      )}
    </>
  );
}

export default App;
