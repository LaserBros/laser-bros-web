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

import "./employee/assets/css/style.scss";
import "./employee/assets/css/style-dark.scss";

import AdminDashboard from "./admin/screens/Dashboard";
import AdminPaymentHistory from "./admin/screens/Payments";
import AdminViewPayment from "./admin/screens/Payments/Viewpayment";
import AdminEditProfile from "./admin/screens/Editprofile";
import AdminCut from "./admin/screens/Cut";
import AdminQueue from "./admin/screens/Queue";
import AdminOrders from "./admin/screens/Orders";
import AdminOrdersDetail from "./admin/screens/Orders/Ordersdetail";
import AdminQuotes from "./admin/screens/Quotes";
import AdminQuotesDetail from "./admin/screens/Quotes/Quotesdetail";
import AdminRFQS from "./admin/screens/RFQS";
import AdminRfqsDetail from "./admin/screens/RFQS/Rfqsdetail";
import EditRFQS from "./admin/screens/Quotes/EditQuote";
import ViewRFQS from "./admin/screens/Quotes/viewRFQ";
import CompleteOrders from "./admin/screens/Orders/complete";
import Employe from "./admin/screens/Employe";
import AddEmp from "./admin/screens/Employe/AddEmp";
import ShippingAddress from "./admin/screens/Orders/Shipping";
import Customers from "./admin/screens/Customers";
import ViewCustomer from "./admin/screens/Customers/ViewCustomer";
import DataBase from "./admin/screens/Database";
import EditFinishing from "./admin/screens/Database/EditFinishing";
import EditQty from "./admin/screens/Database/EditQty";
import EditMaterial from "./admin/screens/Database/EditMaterial";
import AddQty from "./admin/components/AddQty";
import AddQtyDatabase from "./admin/screens/Database/AddQty";
import AddFinish from "./admin/screens/Database/AddFinish";
import AddMaterial from "./admin/screens/Database/AddMaterial";
import AddThickness from "./admin/screens/Database/AddThickness";
import AdminLayout from "./admin/Layout";



import EmpDashboard from "./employee/screens/Dashboard";
import EmpPaymentHistory from "./employee/screens/Payments";
import EmpViewPayment from "./employee/screens/Payments/Viewpayment";
import EmpEditProfile from "./employee/screens/Editprofile";
import EmpCut from "./employee/screens/Cut";
import EmpQueue from "./employee/screens/Queue";
import EmpOrders from "./employee/screens/Orders";
import EmpOrdersDetail from "./employee/screens/Orders/Ordersdetail";
import EmpQuotes from "./employee/screens/Quotes";
import EmpQuotesDetail from "./employee/screens/Quotes/Quotesdetail";
import EmpRFQS from "./employee/screens/RFQS";
import EmpRfqsDetail from "./employee/screens/RFQS/Rfqsdetail";
import EmpEditRFQS from "./employee/screens/Quotes/EditQuote";
import EmpViewRFQS from "./employee/screens/Quotes/viewRFQ";
import EmpCompleteOrders from "./employee/screens/Orders/complete";
import EmpEmploye from "./employee/screens/Employe";
import EmpAddEmp from "./employee/screens/Employe/AddEmp";
import EmpShippingAddress from "./employee/screens/Orders/Shipping";
import EmpCustomers from "./employee/screens/Customers";
import EmpViewCustomer from "./employee/screens/Customers/ViewCustomer";
import EmpDataBase from "./employee/screens/Database";
import EmpEditFinishing from "./employee/screens/Database/EditFinishing";
import EmpEditQty from "./employee/screens/Database/EditQty";
import EmpEditMaterial from "./employee/screens/Database/EditMaterial";
import EmpAddQty from "./employee/components/AddQty";
import EmpAddQtyDatabase from "./employee/screens/Database/AddQty";
import EmpAddFinish from "./employee/screens/Database/AddFinish";
import EmpAddMaterial from "./employee/screens/Database/AddMaterial";
import EmpAddThickness from "./employee/screens/Database/AddThickness";
import EmpAdminLayout from "./employee/Layout";

// import EmpDashboard from "./employee/screens/Dashboard";
// import EmpPaymentHistory from "./employee/screens/Payments";
// import EmpViewPayment from "./employee/screens/Payments/Viewpayment";
// import EmpEditProfile from "./employee/screens/Editprofile";
// import EmpCut from "./employee/screens/Cut";
// import EmpQueue from "./employee/screens/Queue";
// import EmpOrders from "./employee/screens/Orders";
// import EmpOrdersDetail from "./employee/screens/Orders/Ordersdetail";
// import EmpQuotes from "./employee/screens/Quotes";
// import EmpQuotesDetail from "./employee/screens/Quotes/Quotesdetail";
// import EmpRFQS from "./employee/screens/RFQS";
// import EmpRfqsDetail from "./employee/screens/RFQS/Rfqsdetail";
// import EmpCompleteOrders from "./employee/screens/Orders/complete";
// import EmpDashboard from "./employee/screens/Dashboard";
// import EmpPaymentHistory from "./employee/screens/Payments";
// import EmpViewPayment from "./employee/screens/Payments/Viewpayment";
// import EmpEditProfile from "./employee/screens/Editprofile";
// import EmpCut from "./employee/screens/Cut";
// import EmpQueue from "./employee/screens/Queue";
// import EmpOrders from "./employee/screens/Orders";
// import EmpOrdersDetail from "./employee/screens/Orders/Ordersdetail";
// import EmpQuotes from "./employee/screens/Quotes";
// import EmpQuotesDetail from "./employee/screens/Quotes/Quotesdetail";
// import EmpRFQS from "./employee/screens/RFQS";
// import EmpRfqsDetail from "./employee/screens/RFQS/Rfqsdetail";


import Layouts from "./employee/Layout";
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
import EmployeRoute from "./middleware/Employe";
import AdminRoute from "./middleware/AdminRoute";
import QuotesDetailPay from "./screens/private/QuotesDetailPay";
import RfqDetail from "./screens/private/RfqDetail";

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
                  <Route
                    path="/admin/dashboard"
                    element={
                      <AdminRoute
                        element={
                          <AdminLayout title={"Dashboard"}>
                            <AdminDashboard />
                          </AdminLayout>
                        }
                      />
                    }
                  />

                  <Route
                    path="/admin/payment-history"
                    element={
                      <AdminRoute
                        element={
                          <AdminLayout title={"Payment History"}>
                            <AdminPaymentHistory />
                          </AdminLayout>
                        }
                      />
                    }
                  ></Route>
                  <Route
                    path="/admin/payment-history/view-payment/:id"
                    element={
                      <AdminRoute
                        element={
                          <AdminLayout title={"View Payment"}>
                            <AdminViewPayment />
                          </AdminLayout>
                        }
                      />
                    }
                  ></Route>
                  <Route
                    path="/admin/edit-profile"
                    element={
                      <AdminRoute
                        element={
                          <AdminLayout title={"Edit Profile"}>
                            <AdminEditProfile />
                          </AdminLayout>
                        }
                      />
                    }
                  ></Route>
                  <Route
                    path="/admin/archive"
                    element={
                      <AdminRoute
                        element={
                          <AdminLayout title={"Archive"}>
                            <AdminCut />
                          </AdminLayout>
                        }
                      />
                    }
                  ></Route>
                  <Route
                    path="/admin/queue"
                    element={
                      <AdminRoute
                        element={
                          <AdminLayout title={"Queue"}>
                            <AdminQueue />
                          </AdminLayout>
                        }
                      />
                    }
                  ></Route>
                  <Route
                    path="/admin/orders"
                    element={
                      <AdminRoute
                        element={
                          <AdminLayout title={"Orders"}>
                            <AdminOrders />
                          </AdminLayout>
                        }
                      />
                    }
                  ></Route>
                  <Route
                    path="/admin/complete-orders"
                    element={
                      <AdminRoute
                        element={
                          <AdminLayout title={"Complete Orders"}>
                            <CompleteOrders />
                          </AdminLayout>
                        }
                      />
                    }
                  ></Route>
                  <Route
                    path="/admin/shipping-orders"
                    element={
                      <AdminRoute
                        element={
                          <AdminLayout title={"Shipping Orders"}>
                            <ShippingAddress />
                          </AdminLayout>
                        }
                      />
                    }
                  ></Route>
                  <Route
                    path="/admin/orders-detail/:id"
                    element={
                      <AdminRoute
                        element={
                          <AdminLayout title={"Orders Detail"}>
                            <AdminOrdersDetail />
                          </AdminLayout>
                        }
                      />
                    }
                  ></Route>
                  <Route
                    path="/admin/employes"
                    element={
                      <AdminRoute
                        element={
                          <AdminLayout title={"Employee"}>
                            <Employe />
                          </AdminLayout>
                        }
                      />
                    }
                  ></Route>
                  <Route
                    path="/admin/customers"
                    element={
                      <AdminRoute
                        element={
                          <AdminLayout title={"Customers"}>
                            <Customers />
                          </AdminLayout>
                        }
                      />
                    }
                  ></Route>
                  <Route
                    path="/admin/customers/:id"
                    element={
                      <AdminRoute
                        element={
                          <AdminLayout title={"View Customer"}>
                            <ViewCustomer />
                          </AdminLayout>
                        }
                      />
                    }
                  ></Route>
                  <Route
                    path="/admin/add/:id?"
                    element={
                      <AdminRoute
                        element={
                          <AdminLayout title={"Add Employee"}>
                            <AddEmp />
                          </AdminLayout>
                        }
                      />
                    }
                  ></Route>

                  <Route
                    path="/admin/quotes"
                    element={
                      <AdminRoute
                        element={
                          <AdminLayout title={"Quotes"}>
                            <AdminQuotes />
                          </AdminLayout>
                        }
                      />
                    }
                  ></Route>
                  <Route
                    path="/admin/quotes/quotes-detail"
                    element={
                      <AdminRoute
                        element={
                          <AdminLayout title={"Quotes Detail"}>
                            <AdminQuotesDetail />
                          </AdminLayout>
                        }
                      />
                    }
                  ></Route>
                  <Route
                    path="/admin/rfqs"
                    element={
                      <AdminRoute
                        element={
                          <AdminLayout title={"RFQ's"}>
                            <AdminRFQS />
                          </AdminLayout>
                        }
                      />
                    }
                  ></Route>

                  <Route
                    path="/admin/rfqs/edit-quote"
                    element={
                      <AdminRoute
                        element={
                          <AdminLayout title={"Edit Quote"}>
                            <EditRFQS />
                          </AdminLayout>
                        }
                      />
                    }
                  ></Route>
                  <Route
                    path="/admin/quotes/view-quote"
                    element={
                      <AdminRoute
                        element={
                          <AdminLayout title={"View RFQ's"}>
                            <ViewRFQS />
                          </AdminLayout>
                        }
                      />
                    }
                  ></Route>
                  <Route
                    path="/admin/rfqs/rfqs-detail"
                    element={
                      <AdminRoute
                        element={
                          <AdminLayout title={"RFQ's Detail"}>
                            <AdminRfqsDetail />
                          </AdminLayout>
                        }
                      />
                    }
                  ></Route>

                  <Route
                    path="/admin/database"
                    element={
                      <AdminRoute
                        element={
                          <AdminLayout title={"Database"}>
                            <DataBase />
                          </AdminLayout>
                        }
                      />
                    }
                  ></Route>

                  <Route
                    path="/admin/database/edit-finish/:id"
                    element={
                      <AdminRoute
                        element={
                          <AdminLayout title={"Edit Finishing"}>
                            <EditFinishing />
                          </AdminLayout>
                        }
                      />
                    }
                  ></Route>
                  <Route
                    path="/admin/database/add-finish"
                    element={
                      <AdminRoute
                        element={
                          <AdminLayout title={"Add Finishing"}>
                            <AddFinish />
                          </AdminLayout>
                        }
                      />
                    }
                  ></Route>
                  <Route
                    path="/admin/database/edit-material/:id"
                    element={
                      <AdminRoute
                        element={
                          <AdminLayout title={"Edit Material"}>
                            <EditMaterial />
                          </AdminLayout>
                        }
                      />
                    }
                  ></Route>
                    <Route
                    path="/admin/database/add-material"
                    element={
                      <AdminRoute
                        element={
                          <AdminLayout title={"Add Material"}>
                            <AddMaterial />
                          </AdminLayout>
                        }
                      />
                    }
                  ></Route>
                   <Route
                    path="/admin/database/add-thickness"
                    element={
                      <AdminRoute
                        element={
                          <AdminLayout title={"Add Thickness"}>
                            <AddThickness />
                          </AdminLayout>
                        }
                      />
                    }
                  ></Route>
                  <Route
                    path="/admin/database/edit-quantity/:id"
                    element={
                      <AdminRoute
                        element={
                          <AdminLayout title={"Edit Quantity"}>
                            <EditQty />
                          </AdminLayout>
                        }
                      />
                    }
                  ></Route>
                     <Route
                    path="/admin/database/add-quantity"
                    element={
                      <AdminRoute
                        element={
                          <AdminLayout title={"Add Quantity"}>
                            <AddQtyDatabase />
                          </AdminLayout>
                        }
                      />
                    }
                  ></Route>

                  {/* Employee API's */}
                  <Route
                    path="/employee/dashboard"
                    element={
                      <EmployeRoute
                        element={
                          <Layouts title={"Dashboard"}>
                            <EmpDashboard />
                          </Layouts>
                        }
                      />
                    }
                  />

                  <Route
                    path="/employee/payment-history"
                    element={
                      <EmployeRoute
                        element={
                          <Layouts title={"Payment History"}>
                            <EmpPaymentHistory />
                          </Layouts>
                        }
                      />
                    }
                  ></Route>
                  <Route
                    path="/employee/payment-history/view-payment/:id"
                    element={
                      <EmployeRoute
                        element={
                          <Layouts title={"View Payment"}>
                            <EmpViewPayment />
                          </Layouts>
                        }
                      />
                    }
                  ></Route>
                  <Route
                    path="/employee/edit-profile"
                    element={
                      <EmployeRoute
                        element={
                          <Layouts title={"Edit Profile"}>
                            <EmpEditProfile />
                          </Layouts>
                        }
                      />
                    }
                  ></Route>
                  <Route
                    path="/employee/archive"
                    element={
                      <EmployeRoute
                        element={
                          <Layouts title={"Archive"}>
                            <EmpCut />
                          </Layouts>
                        }
                      />
                    }
                  ></Route>
                  <Route
                    path="/employee/queue"
                    element={
                      <EmployeRoute
                        element={
                          <Layouts title={"Queue"}>
                            <EmpQueue />
                          </Layouts>
                        }
                      />
                    }
                  ></Route>
                  <Route
                    path="/employee/orders"
                    element={
                      <EmployeRoute
                        element={
                          <Layouts title={"Orders"}>
                            <EmpOrders />
                          </Layouts>
                        }
                      />
                    }
                  ></Route>
                  <Route
                    path="/employee/complete-orders"
                    element={
                      <EmployeRoute
                        element={
                          <Layouts title={"Complete Orders"}>
                            <EmpCompleteOrders />
                          </Layouts>
                        }
                      />
                    }
                  ></Route>
                  <Route
                    path="/employee/shipping-orders"
                    element={
                      <EmployeRoute
                        element={
                          <Layouts title={"Shipping Orders"}>
                            <EmpShippingAddress />
                          </Layouts>
                        }
                      />
                    }
                  ></Route>
                  <Route
                    path="/employee/orders-detail/:id"
                    element={
                      <EmployeRoute
                        element={
                          <Layouts title={"Orders Detail"}>
                            <EmpOrdersDetail />
                          </Layouts>
                        }
                      />
                    }
                  ></Route>
                  <Route
                    path="/employee/employes"
                    element={
                      <EmployeRoute
                        element={
                          <Layouts title={"Employee"}>
                            <EmpEmploye />
                          </Layouts>
                        }
                      />
                    }
                  ></Route>
                  <Route
                    path="/employee/customers"
                    element={
                      <EmployeRoute
                        element={
                          <Layouts title={"Customers"}>
                            <EmpCustomers />
                          </Layouts>
                        }
                      />
                    }
                  ></Route>
                  <Route
                    path="/employee/customers/:id"
                    element={
                      <EmployeRoute
                        element={
                          <Layouts title={"View Customer"}>
                            <EmpViewCustomer />
                          </Layouts>
                        }
                      />
                    }
                  ></Route>
                  <Route
                    path="/employee/add/:id?"
                    element={
                      <EmployeRoute
                        element={
                          <Layouts title={"Add Employee"}>
                            <EmpAddEmp />
                          </Layouts>
                        }
                      />
                    }
                  ></Route>

                  <Route
                    path="/employee/quotes"
                    element={
                      <EmployeRoute
                        element={
                          <Layouts title={"Quotes"}>
                            <EmpQuotes />
                          </Layouts>
                        }
                      />
                    }
                  ></Route>
                  <Route
                    path="/employee/quotes/quotes-detail"
                    element={
                      <EmployeRoute
                        element={
                          <Layouts title={"Quotes Detail"}>
                            <EmpQuotesDetail />
                          </Layouts>
                        }
                      />
                    }
                  ></Route>
                  <Route
                    path="/employee/rfqs"
                    element={
                      <EmployeRoute
                        element={
                          <Layouts title={"RFQ's"}>
                            <EmpRFQS />
                          </Layouts>
                        }
                      />
                    }
                  ></Route>

                  <Route
                    path="/employee/rfqs/edit-quote"
                    element={
                      <EmployeRoute
                        element={
                          <Layouts title={"Edit Quote"}>
                            <EmpEditRFQS />
                          </Layouts>
                        }
                      />
                    }
                  ></Route>
                  <Route
                    path="/employee/quotes/view-quote"
                    element={
                      <EmployeRoute
                        element={
                          <Layouts title={"View RFQ's"}>
                            <EmpViewRFQS />
                          </Layouts>
                        }
                      />
                    }
                  ></Route>
                  <Route
                    path="/employee/rfqs/rfqs-detail"
                    element={
                      <EmployeRoute
                        element={
                          <Layouts title={"RFQ's Detail"}>
                            <EmpRfqsDetail />
                          </Layouts>
                        }
                      />
                    }
                  ></Route>

                  <Route
                    path="/employee/database"
                    element={
                      <EmployeRoute
                        element={
                          <Layouts title={"Database"}>
                            <EmpDataBase />
                          </Layouts>
                        }
                      />
                    }
                  ></Route>

                  <Route
                    path="/employee/database/edit-finish/:id"
                    element={
                      <EmployeRoute
                        element={
                          <Layouts title={"Edit Finishing"}>
                            <EmpEditFinishing />
                          </Layouts>
                        }
                      />
                    }
                  ></Route>
                  <Route
                    path="/employee/database/add-finish"
                    element={
                      <EmployeRoute
                        element={
                          <Layouts title={"Add Finishing"}>
                            <EmpAddFinish />
                          </Layouts>
                        }
                      />
                    }
                  ></Route>
                  <Route
                    path="/employee/database/edit-material/:id"
                    element={
                      <EmployeRoute
                        element={
                          <Layouts title={"Edit Material"}>
                            <EmpEditMaterial />
                          </Layouts>
                        }
                      />
                    }
                  ></Route>
                    <Route
                    path="/employee/database/add-material"
                    element={
                      <EmployeRoute
                        element={
                          <Layouts title={"Add Material"}>
                            <EmpAddMaterial />
                          </Layouts>
                        }
                      />
                    }
                  ></Route>
                   <Route
                    path="/employee/database/add-thickness"
                    element={
                      <EmployeRoute
                        element={
                          <Layouts title={"Add Thickness"}>
                            <EmpAddThickness />
                          </Layouts>
                        }
                      />
                    }
                  ></Route>
                  <Route
                    path="/employee/database/edit-quantity/:id"
                    element={
                      <EmployeRoute
                        element={
                          <Layouts title={"Edit Quantity"}>
                            <EmpEditQty />
                          </Layouts>
                        }
                      />
                    }
                  ></Route>
                     <Route
                    path="/employee/database/add-quantity"
                    element={
                      <EmployeRoute
                        element={
                          <Layouts title={"Add Quantity"}>
                            <EmpAddQtyDatabase />
                          </Layouts>
                        }
                      />
                    }
                  ></Route>

                  

                  {/* End Employee API's */}

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
                    <Route
                      path="/orders"
                      element={<PrivateRoute element={<Orders />} />}
                    />
                    <Route
                      path="/rfqs"
                      element={<PrivateRoute element={<RFQS />} />}
                    />
                    <Route
                      path="/orders/orders-detail/:id"
                      element={<PrivateRoute element={<OrdersDetail />} />}
                    />
                    <Route
                      path="/rfq/rfq-detail/:id"
                      element={<PrivateRoute element={<RfqDetail />} />}
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
                    <Route
                      path="/quotes/pay"
                      element={<PrivateRoute element={<QuotesDetailPay />} />}
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
