import React, { useState, useEffect } from "react";
import { Row, Col, Image, Form, Button, Tab, Tabs } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import "react-phone-input-2/lib/style.css";
import cards from "../../assets/img/cards.png";
import cvv from "../../assets/img/cvv.png";
import PaymentDone from "./Paymentdone";
import { editSubQuote, fetchAddress, getCard, payment } from "../../api/api";
import axiosAdminInstance from "../axios/axiosadminInstanse";
import { toast } from "react-toastify";
import Amount from "../../components/Amount";
import CheckoutPopup from "./checkoutPopup";
const QuotesSidebar = ({
  amount,
  showDiv,
  quoteData,
  UserData,
  divideWeight,
  TaxRatesVal,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const [quoteDataVal, setquoteData] = useState(false);
  const [checkOutmodal, setcheckOutmodal] = useState(false);
  useEffect(() => {
    setquoteData(quoteData);
  }, [quoteData]);
  // const handleShow = () => setModalShow(true);
  const OnSave = (data) => {
    setcheckOutmodal(false);
  };
  const updateQuote = async () => {
    const storedData = localStorage.getItem("setItempartsDBdataAdmin");
    const quote_list = localStorage.getItem("setItemelementDataAdmin");
    let isValid = true; // Assume everything is valid initially
    const storedDataVal = JSON.parse(localStorage.getItem("setItempartsDBdataAdmin"));
    for (const quote of storedDataVal) {
      if (quote.bend_count == 1) {
        if (quote.step_file_bend == null || quote.step_file_bend == "") {
          isValid = false;
          toast.error(`Please upload bend STEP file.`);
          break; // Stop the loop if validation fails
        }
      }
    }
    if (isValid) {
      if (storedData) {
        setLoading(true);
        const parsedData = JSON.parse(storedData);
        const quote_list_val = JSON.parse(quote_list);
        // // console.log(parsedData);
        // // console.log(quote_list_val._id);
        try {
          const param = {
            id: quote_list_val._id,
            subQuotes: parsedData,
          };
          const res = await editSubQuote(param);
          toast.success("Quote Updated Successfully...");
          setLoading(false);
          navigate("/admin/rfqs");
        } catch (error) {
          setLoading(false);
          toast.error("Something wents wrong..");
        }
      }
    }
  };
  const handleClose = () => setModalShow(false);
  const [key, setKey] = useState("card");
  const navigate = useNavigate();
  const [showDiv1, setShowDiv1] = useState(true);
  const [showDiv2, setShowDiv2] = useState(false);
  const [isChecked, setIsChecked] = useState(true);
  const [name, setName] = useState("Andrew James");
  const [address, setAddresss] = useState([]);
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("andrewjames@gmail.com");
  const [address1, setAddress1] = useState("indiit solutions");
  const [city, setCity] = useState("New York");
  const [zipcode, setZipcode] = useState("10001");
  const [phoneno, setPhoneno] = useState("1 9876231221");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setShowDiv2(showDiv);
    setShowDiv1(!showDiv);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setToken(token);
  }, []);
  useEffect(() => {
    if (modalShow) {
      const timer = setTimeout(() => {
        navigate("/orders");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [modalShow]);
  const EditCheckout = () => {
    setcheckOutmodal(true);
  };
  const handleClosePop = () => {
    setcheckOutmodal(false);
  };
  return (
    <>
      {showDiv1 && (
        <div className="quotes-sidebar">
          <div className="quotes-inner">
            <div className="head-quotes d-none">
              <h2 className="mb-0 d-none">Quote Summary</h2>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <span className="quotesitem">Subtotal</span>
              <span className="quotesitem quotesright">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(amount)}
              </span>
            </div>
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="quotesitem">Bending</span>
              <span className="quotesitem quotesright">
                <Amount amount={quoteDataVal.total_bend_price} />{" "}
              </span>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <span className="quotessubtotal">Total</span>
              <span className="quotesprice">
                <Amount
                  amount={
                    parseFloat(amount || 0) +
                    parseFloat(quoteDataVal.total_bend_price || 0) +
                    parseFloat(TaxRatesVal.tax_amount || 0) +
                    parseFloat(quoteDataVal.shipping_price || 0)
                  }
                />
              </span>
            </div>
            <hr className="quotes-separator" />
            {/* When Not Login Start*/}
            {/* <div className='quotes-login mb-3'>
                                    <p className='text-center mb-1'>Price is for cutting only.</p>
                                    <p className='text-center'>Please login or sign up to see shipping rates.</p>
                                    <div className='d-flex gap-2'>
                                        <Link className='btn btn-outline-primary d-inline-flex align-items-center justify-content-center flex-grow-1'>
                                        Login
                                        </Link>
                                        <Link className='btn btn-primary d-inline-flex align-items-center justify-content-center flex-grow-1'>
                                        Sign Up
                                        </Link>
                                    </div> 
                                </div> */}
            {/* When Not Login Ends*/}
            {token != "" && token != undefined && token != null ? (
              <></>
            ) : (
              <>
                <div className="d-flex align-items-center justify-content-between">
                  <Button
                    variant={null}
                    className="w-100 me-2 btn-outline-primary mt-3"
                    onClick={() => updateQuote()}
                    disabled={loading}
                  >
                    {loading ? (
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    ) : (
                      " Update Quote"
                    )}
                  </Button>
                </div>
                <div>
                  <Button
                    variant={null}
                    className="w-100 me-2 btn-outline-primary mt-3"
                    onClick={() => EditCheckout()}
                    disabled={loading}
                  >
                    {/* {loading ? (
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span> */}
                    Edit Checkout
                  </Button>
                </div>
              </>
            )}
            {/* <hr className="quotes-separator" /> */}
            {/* <p className="order-cont">Order in <b>5 hrs 45 mins</b> to ship on <b>May 30</b></p> */}
          </div>
          {/* <p className="order-cont-btm mb-0 mt-3 text-center">Orders are deburred and shipped <b>Free</b></p> */}
        </div>
      )}
      {showDiv2 && (
        <>
          <div className="quotes-sidebar">
            <div className="quotes-inner">
              <div className="head-quotes d-flex align-items-center justify-content-between">
                <h2 className="mb-0">Checkout</h2>
                {/* <Link className="btnicon" onClick={() => toggleDiv(2)}>
                  <Icon icon="ion:chevron-back" />
                </Link> */}
              </div>
              <Form className="accountform">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span className="quotesitem">Laser Cutting</span>
                  <span className="quotesitem quotesright">
                    ${amount.toLocaleString("en-US")}{" "}
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <span className="quotessubtotal">Subtotal</span>
                  <span className="quotesprice">
                    ${amount.toLocaleString("en-US")}
                  </span>
                </div>
                <hr className="quotes-separator" />
                <small className=" mb-3 d-block">
                  <i>
                    Address : If you want to change address{" "}
                    <Link className="btn-address" to={`/my-addresses`}>
                      {" "}
                      click here
                    </Link>
                  </i>
                </small>
                {address.length === 0 ? (
                  <Col>
                    <p>No addresses found</p>
                  </Col>
                ) : (
                  address.map((addr) =>
                    addr.is_default === 1 ? (
                      <Col xl={12} lg={12} md={12} className="mb-4">
                        <div className="addresses-grid">
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <h2 className="mb-0">{addr.full_name}</h2>
                          </div>
                          <p className="mb-2">{addr.phone_number}</p>
                          <p className="mb-3">
                            {addr.address_line_1}, {addr.city}, {addr.pincode},{" "}
                            {addr.country}
                          </p>
                          <div className="btn-bottom">
                            <Link
                              className="btn-address"
                              to={`/my-address/edit-address/${addr._id}`}
                            >
                              <Icon icon="mynaui:edit" />
                            </Link>
                          </div>
                        </div>
                      </Col>
                    ) : null
                  )
                )}

                <Form.Group className="freeshipping d-inline-flex align-items-center justify-content-between  mb-2">
                  <span>
                    <b>Free Shipping</b> (1- 5 days)
                  </span>{" "}
                  <b>Free</b>
                </Form.Group>
                <Form.Group className="mb-2 form-group">
                  <Form.Label>Discount Code</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your discount code"
                  />
                </Form.Group>
                <Form.Check
                  type="checkbox"
                  id="checkbox1"
                  name="checkbox"
                  className="d-inline-flex"
                  label={
                    <>
                      <span>1% Discount </span> Let us post photos/videos of
                      these parts on our social media.
                    </>
                  }
                />

                {/* <Tabs
                  defaultActiveKey="basicinfo"
                  id="uncontrolled-tab-example"
                  className="customtabs mb-3 mt-3"
                  activeKey={key}
                  onSelect={(k) => setKey(k)}
                >
                  <Tab
                    eventKey="card"
                    title={
                      <>
                        <span>
                          <Icon icon="solar:card-broken" />
                        </span>
                        Card
                      </>
                    }
                  >
                    <Row className="gx-2">
                      <Col md={12}>
                        <Form.Group className="mb-2 form-group">
                          <Form.Label className="d-flex align-items-center justify-content-between">
                            Card Number{" "}
                            <Image src={cards} className="img-fluid" alt="" />
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="1234 1234 1234 1234"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-2 form-group">
                          <Form.Label className="d-flex align-items-center justify-content-between">
                            Expiration
                          </Form.Label>
                          <Form.Control type="date" placeholder="MM/YY" />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-2 form-group">
                          <Form.Label className="d-flex align-items-center justify-content-between">
                            CVV <Image src={cvv} className="img-fluid" alt="" />
                          </Form.Label>
                          <Form.Control type="text" placeholder="123" />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Tab>
                  <Tab
                    eventKey="googlepay"
                    title={
                      <>
                        <span>
                          <Icon icon="cib:google-pay" />
                        </span>
                        Google Pay
                      </>
                    }
                  ></Tab>
                  <Tab
                    eventKey="usbankaccount"
                    title={
                      <>
                        <span>
                          <Icon icon="mingcute:bank-line" />
                        </span>
                        US Bank Account
                      </>
                    }
                  ></Tab>
                </Tabs> */}
              </Form>
              {/* <hr className="quotes-separator" />
                            <p className="order-cont">Order in <b>5 hrs 45 mins</b> to ship on <b>May 30</b></p> */}
            </div>
            {/* <p className="order-cont-btm mb-0 mt-3 text-center">Orders are deburred and shipped <b>Free</b></p> */}
          </div>
        </>
      )}
      {/* <PaymentDone show={modalShow} handleClose={handleClose} /> */}

      <CheckoutPopup
        show={checkOutmodal}
        handleClose={handleClosePop}
        addressDetail={quoteData}
        UserData={UserData}
        divideWeight={divideWeight}
        onSave={OnSave}
        TaxRatesVal={TaxRatesVal}
      />
    </>
  );
};
export default QuotesSidebar;
