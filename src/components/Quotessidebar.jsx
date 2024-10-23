import React, { useState, useEffect } from "react";
import { Row, Col, Image, Form, Button, Tab, Tabs } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import "react-phone-input-2/lib/style.css";
import cards from "../assets/img/cards.png";
import cvv from "../assets/img/cvv.png";
import PaymentDone from "./Paymentdone";
import { fetchAddress, getCard, payment } from "../api/api";
import axiosInstance from "../axios/axiosInstance";
import { toast } from "react-toastify";
import Amount from "./Amount";
const QuotesSidebar = ({ amount, showDiv }) => {
  const [modalShow, setModalShow] = useState(false);
  // const handleShow = () => setModalShow(true);
  const PaymentSubmit = async () => {
    setLoading(true);
    const elementId = localStorage.getItem("setItemelementDataPay");
    var getId = "";

    if (elementId) {
      getId = JSON.parse(elementId);
    }
    const data = {
      id: getId._id,
    };
    const res = await payment(data);
    try {
      if (res.status == "success") {
        setModalShow(true);
        setLoading(false);
        localStorage.removeItem("setItemelementDataPay");
        localStorage.removeItem("setItempartsDBdataPay");
      } else {
        toast.error(res.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  const handleClose = () => setModalShow(false);
  const [key, setKey] = useState("card");
  const navigate = useNavigate();
  const [showDiv1, setShowDiv1] = useState(true);
  const [showDiv2, setShowDiv2] = useState(false);
  const [isChecked, setIsChecked] = useState(true);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const toggleDiv = (divNumber) => {
    if (divNumber === 1) {
      setShowDiv1(false);
      setShowDiv2(true);
    } else if (divNumber === 2) {
      setShowDiv1(true);
      setShowDiv2(false);
    }
  };
  const [name, setName] = useState("Andrew James");
  const [address, setAddresss] = useState([]);
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("andrewjames@gmail.com");
  const [address1, setAddress1] = useState("indiit solutions");
  const [city, setCity] = useState("New York");
  const [zipcode, setZipcode] = useState("10001");
  const [phoneno, setPhoneno] = useState("1 9876231221");
  const [loading, setLoading] = useState(true);

  const handleUpdateQuote = async () => {
    const updatedQuoteData = JSON.parse(
      localStorage.getItem("setItempartsDBdata")
    );

    let isValid = true; // Assume everything is valid initially

    // Use a for...of loop to allow breaking out of the loop
    for (const quote of updatedQuoteData) {
      if (!quote.material_id) {
        isValid = false;
        toast.error(`Please select Material.`);
        break; // Stop the loop if validation fails
      }
      if (!quote.thickness_id) {
        isValid = false;
        toast.error(`Please select Thickness.`);
        break; // Stop the loop if validation fails
      }
      if (!quote.finishing_id) {
        isValid = false;
        toast.error(`Please select Finish.`);
        break; // Stop the loop if validation fails
      }
    }

    // Only proceed with submission if all required fields are selected
    if (isValid) {
      const elementId = localStorage.getItem("setItemelementData");
      let getId = "";

      if (elementId) {
        getId = JSON.parse(elementId);
      }
      if (getId && getId._id) {
        const data_id = {
          id: getId._id,
          status: 1,
        };

        try {
          setLoading(true);
          const response_local = await axiosInstance.post(
            "/users/updateQuoteState",
            data_id
          );
          localStorage.setItem("setItemelementData", "");
          localStorage.setItem("setItempartsDBdata", "");
          toast.success("Request quote sent successfully");
          setLoading(false);
          navigate("/rfqs");
        } catch (error) {
          toast.error("Something went wrong.");
        }
      }
    }
  };

  const [cardsData, setCards] = useState([]);
  const loadData = async () => {
    setLoading(true);
    try {
      const [response] = await Promise.all([fetchAddress()]);
      console.log(response.data.data);
      setAddresss(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadCards = async () => {
    try {
      setLoading(true);
      const response = await getCard(); // Call your API function
      setCards(response.data); // Assuming the data is in response.data
    } catch (error) {
      console.error("Error fetching cards:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    loadCards();
    setShowDiv2(showDiv);
    setShowDiv1(!showDiv);
  }, []);

  const HandleName = () => {
    setName();
  };
  const HandleEmail = () => {
    setEmail();
  };
  const HandleAddress = () => {
    setAddress1();
  };
  const HandleCity = () => {
    setCity();
  };
  const HandleZipcode = () => {
    setZipcode();
  };
  const Handlephoneno = () => {
    setPhoneno();
  };
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setToken(token);
  }, []);
  useEffect(() => {
    if (modalShow) {
      const timer = setTimeout(() => {
        navigate("/orders");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [modalShow]);
  return (
    <>
      {showDiv1 && (
        <div className="quotes-sidebar">
          <div className="quotes-inner">
            <div className="head-quotes">
              <h2 className="mb-0">Quote Summary</h2>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <span className="quotesitem">Laser Cutting</span>
              <span className="quotesitem quotesright">
                <Amount amount={amount} />
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
              <>
                <div className="d-flex align-items-center justify-content-between">
                  <span className="quotessubtotal">Subtotal</span>
                  <span className="quotesprice">
                    <Amount amount={amount} />
                  </span>
                </div>
                <Button
                  className="w-100 mt-3"
                  onClick={() => handleUpdateQuote()}
                  disabled={loading}
                >
                  {loading ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    "Request a Quote"
                  )}
                </Button>
                {/* <Button
                  variant={null}
                  className="w-100 btn-outline-primary mt-3"
                >
                  {" "}
                  Forward to Purchaser
                </Button> */}
              </>
            ) : (
              <>
                <div className="text-center">
                  <p className="order-cont-btm mb-0 mt-3 text-center">
                    Price is for cutting only.
                  </p>
                  <p className="order-cont-btm mb-0 mt-1 text-center">
                    Please login or sign up to see shipping rates.
                  </p>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <Button
                    variant={null}
                    className="w-100 me-2 btn-outline-primary mt-3"
                    onClick={() => navigate("/login")}
                  >
                    Sign In
                  </Button>
                  <Button
                    className="w-100 mt-3"
                    onClick={() => navigate("/SignUp")}
                  >
                    Sign Up
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
                    <Amount amount={amount} />{" "}
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <span className="quotessubtotal">Subtotal</span>
                  <span className="quotesprice">
                    <Amount amount={amount} />
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
                <small className=" mb-3 d-block">
                  <i>
                    Card : If you want to change card{" "}
                    <Link className="btn-address" to={`/payment-cards`}>
                      {" "}
                      click here
                    </Link>
                  </i>
                </small>
                {cardsData.length === 0 ? (
                  <Col>
                    <p>No cards found</p>
                  </Col>
                ) : (
                  cardsData.map(
                    (card) =>
                      card.is_default === 1 && (
                        <Col
                          xl={12}
                          lg={12}
                          md={12}
                          className="mb-4"
                          key={card.id}
                        >
                          <div className="addresses-grids payment-grids">
                            <div className="d-flex align-items-center justify-content-between mb-3">
                              {/* <Image src={visa} className="img-fluid mb-3" alt="" /> */}
                            </div>
                            <p
                              className="mb-2 card-no"
                              style={{ fontSize: "13px" }}
                            >
                              **** **** **** {card.last4}
                            </p>

                            <div className="card-actions">
                              <div className="card-info">
                                <strong>Expiry Date</strong> {card.exp_month}/
                                {card.exp_year}
                              </div>
                              <div className="card-info">
                                <strong>Name</strong>{" "}
                                {card.full_name.toUpperCase()}
                              </div>
                            </div>
                          </div>
                        </Col>
                      )
                  )
                )}
                {/* Request  A Quote before Payment Start*/}
                {/* <div className='quotes-login mb-3 mt-3'>
                                    <p className='text-center'>Payment options will be made available after bending has been approved. Please submit your RFQ!</p>
                                </div>  */}
                {/* Request  A Quote before Payment Ends*/}
                <Form.Check
                  type="checkbox"
                  id="checkbox2"
                  name="checkbox2"
                  className="d-inline-flex mt-2"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  label={<>Billing is same as shipping information</>}
                />
                <Button
                  className="w-100 mt-3"
                  onClick={PaymentSubmit}
                  disabled={loading}
                >
                  {loading ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    <>
                      Proceed To Pay{" "}
                      <b>
                        <Amount amount={amount} />
                      </b>
                    </>
                  )}
                </Button>
                {/* Request  A Quote Button Start*/}
                {/* <Button className="w-100 mt-3">Request  A Quote</Button> */}
                {/* Request  A Quote Button Ends*/}
              </Form>
              {/* <hr className="quotes-separator" />
                            <p className="order-cont">Order in <b>5 hrs 45 mins</b> to ship on <b>May 30</b></p> */}
            </div>
            {/* <p className="order-cont-btm mb-0 mt-3 text-center">Orders are deburred and shipped <b>Free</b></p> */}
          </div>
        </>
      )}
      <PaymentDone show={modalShow} handleClose={handleClose} />
    </>
  );
};
export default QuotesSidebar;
