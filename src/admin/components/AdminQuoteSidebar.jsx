import React, { useState, useEffect } from "react";
import { Row, Col, Image, Form, Button, Tab, Tabs } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import "react-phone-input-2/lib/style.css";
import PaymentDone from "../../components/Paymentdone";
import CheckoutPopup from "../../components/CheckoutPopup";

import {
  CustomerAddress,
  getCustomerCard,
  getEditQuotePay,
  getEditQuotePayment,
  payment,
  shippingCost,
} from "../../api/api";
import axiosInstance from "../../axios/axiosInstance";
import { toast } from "react-toastify";
import Amount from "../../components/Amount";
import ShippingRates from "../../components/ShippingRates";
import CheckOutPay from "../../components/checkOutPay";
import AddCard from "../../components/Addcard";
import { Tooltip } from "react-tooltip";
import CustomerCheckoutPopup from "./CustomercheckoutPopup";
const AdminQuotesSidebar = ({
  amount,
  showDiv,
  buttonText,
  divideWeight,
  CustomerShippingDBdataPay,
  quoteData,
  isPayble,
  loadId,
  bendAmount,
  userId
}) => {
  const [modalShow, setModalShow] = useState(false);
  const [quoteDataVal, setquoteData] = useState(false);
  const [rateVal, setrateVal] = useState("");
  const [loadingPayId, setLoadingPayID] = useState();

    const [modalShowCard, setModalShowCard] = useState(false);
  
    const handleShowCard = () => setModalShowCard(true);
    const handleCloseCard = () => setModalShowCard(false);

  useEffect(() => {
    setquoteData(quoteData);
    // console.log("quoteData", quoteData);
  }, [quoteData]);
  const handleRateSelected = async (rate) => {
    setrateVal(rate);
    const elementId = localStorage.getItem("CustomersetItemelementDataPay");
    var getId = "";
    if (elementId) {
      getId = JSON.parse(elementId);
    }

    const data = {
      service_code: rate,
      id: getId._id,
    };
    try {
      const res = await shippingCost(data);

      setquoteData(res.data);
      localStorage.setItem("CustomersetItemelementDataPay", JSON.stringify(res.data));
    } catch (error) {}
  };
 
  const PaymentSubmit = async () => {
    // console.log("SDsdsddssd", rateVal);
    if (rateVal == "" || rateVal == null) {
      toast.error("Please Select Shipping Option.");
      return;
    }
    setLoading(true);
    const elementId = localStorage.getItem("CustomersetItemelementDataPay");
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
        localStorage.removeItem("CustomersetItemelementDataPay");
        localStorage.removeItem("CustomersetItempartsDBdataPay");
        localStorage.removeItem("CustomerShippingDBdataPay");
        localStorage.removeItem("CustomerdivideWeight");
      } else {
        toast.error(res.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  const [successMessage, setSuccessMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => {
    setShowModal(true);
  }
  const handleCloseModal = () => {
    setShowModal(false);
  }

    
    useEffect(() => {
      // console.log("Dsddsdsdsdsdsdsds=d-=sd-s=d-s-d-sd=s-")
      setShowModal(false);
      loadData();
      setSuccessMessage("");
    },[successMessage])
  const handleClose = () => setModalShow(false);
  const handleClosePay = () => setModalShowPay(false);
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
  const [loadingPay, setLoadingPay] = useState(false);
  const [modalShowPay, setModalShowPay] = useState(false);
  const [PayLoad, setPayLoad] = useState(false);
  const [PayLoadRfq, setPayLoadRfq] = useState(false);
  const [shippingInfo, setshippingInfo] = useState(false);
  const [ParamType, setParamType] = useState("");
  const RequestQuote = async (id) => {
    const data = {
      id: id,
    };
    setLoadingPay(id);
    setLoadingPayID(id);
    setPayLoad(true);
    try {
      const response = await getEditQuotePay(data);
      setshippingInfo(response.data);
      setLoadingPay(false);
      setModalShowPay(true);
      setPayLoad(false);
    } catch (error) {
      setPayLoad(false);
      setLoadingPay(false);
      toast.error("Something wents wrong.");
    }
  };
  const handleUpdateQuoteChange = async (type_param) => {
    const elementId = localStorage.getItem("CustomersetItemelementData");
    const updatedQuoteData = JSON.parse(
      localStorage.getItem("CustomersetItempartsDBdata")
    );
    // console.log("updatedQuoteData",updatedQuoteData) 
    let isValid = true; // Assume everything is valid initially
    // console.log("loading od");
    
    for (const quote of updatedQuoteData) {
      // console.log("loading od");
      // console.log(quote.bend_count)
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
      if (quote.bend_count == 1) {
        if(quote.step_file_bend == null || quote.step_file_bend == "") {
          isValid = false;
          toast.error(`Please upload bend STEP file.`);
          break; // Stop the loop if validation fails
        }
      }
    }

    // Only proceed with submission if all required fields are selected
    if (isValid) {
      let getId = "";

      if (elementId) {
        getId = JSON.parse(elementId);
      }
      if (getId && getId._id) {
        var id = getId._id;
      }
      const data = {
        id: id,
        type:type_param
      };
      // console.log("wswdwdwdwdwdwdwdwd", getId, elementId);
      // return;
      try {
       
          setPayLoadRfq(true)
        
        setLoadingPayID(getId);
        setModalShowPay(true);
        // if(type_param == "rfq") {
          setPayLoadRfq(false) 
        // } else {
        //   setPayLoad(false);
        // }
        // setModalShowPay(false);
      } catch (error) {
        if(type_param == "rfq") {
          setPayLoadRfq(false)
        } else {
          setPayLoad(false);
        }
        // setModalShowPay(false);
        toast.error("Something wents wrong.");
      }
    }
  };

  const handleUpdateQuote = async () => {
    const updatedQuoteData = JSON.parse(
      localStorage.getItem("CustomersetItempartsDBdata")
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
      const elementId = localStorage.getItem("CustomersetItemelementData");
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
            "/users/updateRequestQuote",
            data_id
          );

          if (response_local.data.data.check_status == 1) {
            localStorage.setItem("CustomersetItemelementData", "");
            localStorage.setItem("CustomersetItempartsDBdata", "");
            toast.success("Request quote sent successfully");
            setLoading(false);
            navigate("/rfqs");
          }
          if (response_local.data.data.check_status == 0) {
            localStorage.setItem("CustomersetItemelementData", "");
            localStorage.setItem("CustomersetItempartsDBdata", "");
            const data = {
              id: getId._id,
            };
            const response = await getEditQuotePay(data);
            // console.log("resss-----", response.data);
            localStorage.setItem(
              "CustomersetItemelementDataPay",
              JSON.stringify(response.data.requestQuoteDB)
            );

            localStorage.setItem(
              "CustomersetItempartsDBdataPay",
              JSON.stringify(response.data.partsDBdata)
            );

            if (response?.data?.shippingRates) {
              localStorage.setItem(
                "CustomerShippingDBdataPay",
                JSON.stringify(response.data.shippingRates)
              );
            }
            localStorage.setItem(
              "CustomerdivideWeight",
              JSON.stringify(response.data.divideWeight)
            );

            // toast.success("Request quote sent successfully");
            setLoading(false);
            navigate("/quotes/pay");
          }
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
      var user_id = userId;  
      const [response] = await Promise.all([CustomerAddress(user_id)]);
      // console.log(response.data.data);
      setAddresss(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    loadData();
    setShowDiv2(showDiv);
    setShowDiv1(!showDiv);
    // console.log("sdsdsd-sds-d-sd-d-sd-sd-ds-d", CustomerShippingDBdataPay);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");   
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
              <span className="quotesitem">Subtotal</span>
              <span className="quotesitem quotesright">
                <Amount amount={ parseFloat(amount || 0) +
                        parseFloat(bendAmount || 0)} />
              </span>
            </div>
            {/* <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="quotesitem">Services</span>
              <span className="quotesitem quotesright">
                <Amount amount={bendAmount} />{" "}
              </span>
            </div> */}

            {/* <hr className="quotes-separator" /> */}
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
                {/* <div className="d-flex align-items-center justify-content-between">
                  <span className="quotessubtotal">Total</span>
                  <span className="quotesprice">
                    <Amount
                      amount={
                        parseFloat(amount || 0) +
                        parseFloat(bendAmount || 0)
                      }
                    />
                  </span>
                </div> */}
                
                <Button
                    className="w-100 mt-3"
                    onClick={() =>{
                       handleUpdateQuoteChange("");
                       setParamType(""); 
                    }}
                    disabled={PayLoad}
                  >
                    {PayLoad ? (
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    ) : "Add Pay Information" }
                  </Button>
              </>
            ) : (
              <>
              
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
                  <span className="quotesitem">Subtotal</span>
                  <span className="quotesitem quotesright">
                    <Amount amount={parseFloat(amount) + parseFloat(bendAmount)} />{" "}
                  </span>
                </div>
                {/* <div className="d-flex align-items-center justify-content-between mb-2">
                  <span className="quotesitem">Services</span>
                  <span className="quotesitem quotesright">
                    <Amount amount={bendAmount} />{" "}
                  </span>
                </div> */}
                {rateVal != "" ? (
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="quotesitem">Shipping</span>
                    <span className="quotesitem quotesright">
                      <Amount amount={quoteDataVal.shipping_price} />{" "}
                    </span>
                  </div>
                ) : (
                  ""
                )}
                {quoteDataVal.transactionFees && (
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="quotesitem">Sales Tax</span>
                    <span className="quotesitem quotesright">
                      <Amount amount={quoteDataVal.transactionFees} />{" "}
                    </span>
                  </div>
                )}
                <div className="d-flex align-items-center justify-content-between">
                  <span className="quotessubtotal">Total</span>
                  <span className="quotesprice">
                    <Amount
                      amount={
                        parseFloat(amount || 0) +
                        parseFloat(bendAmount || 0) +
                        parseFloat(
                          rateVal == "" ? 0 : quoteDataVal.shipping_price || 0
                        ) +
                        parseFloat(quoteDataVal.transactionFees || 0)
                      }
                    />
                  </span>
                </div>
                <ShippingRates
                  shippingRates={CustomerShippingDBdataPay}
                  divideWeight={divideWeight}
                  onRateSelected={handleRateSelected}
                  RequestQuote={buttonText}
                  // service_code={quoteDataVal.service_code}
                />
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
                {/* <Form.Check
                  type="checkbox"
                  id="checkbox2"
                  name="checkbox2"
                  className="d-inline-flex mt-2"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  label={<>Billing is same as shipping information</>}
                /> */}
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
                        <Amount
                          amount={
                            parseFloat(amount || 0) +
                            parseFloat(bendAmount || 0) +
                            parseFloat(
                              rateVal == ""
                                ? 0
                                : quoteDataVal.shipping_price || 0
                            ) +
                            parseFloat(quoteDataVal.transactionFees || 0)
                          }
                        />
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
   
        <CustomerCheckoutPopup
          bendAmountPrice={bendAmount}
          loadingPayId={loadingPayId}
          setSuccessMessage={setSuccessMessage}
          show={modalShowPay}
          successMessage={successMessage}
          totalAmount = {parseFloat(amount) + parseFloat(bendAmount)}
          handleShow={handleShow}
          showPopup={showModal}
          handleCloseModal={handleCloseModal}
          handleClose={handleClosePay}
          modalShowCard={modalShowCard} 
          handleShowCard={handleShowCard}
          handleCloseCard={handleCloseCard}
          address={address}
          shippingInfo={shippingInfo}
          cardsData={cardsData}
          ParamType={ParamType}
          userId={userId}
        />
     
    </>
  );
};
export default AdminQuotesSidebar;
