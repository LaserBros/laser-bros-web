import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, Tab, Tabs } from "react-bootstrap";
import paymentdone from "../assets/img/paymentdone.svg";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import ShippingRates from "./ShippingRates";
import Amount from "./Amount";
import { getEditQuotePay, payment, shippingCost } from "../api/api";
import axiosInstance from "../axios/axiosInstance";
import { toast } from "react-toastify";
import PaymentDone from "./Paymentdone";
const CheckOutPay = ({
  show,
  loadingPayId, 
  handleClose, 
  address,
  shippingInfo,
  cardsData,
  handleShowCard,
}) => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isSameAsShipping, setIsSameAsShipping] = useState(false);
  const [selectedShippingAddress, setShippingSelectedAddress] = useState(null);
  const [handleCloseTrigger, sethandleCloseTrigger] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedRate, setSelectedRate] = useState("");
  const [taxPercentage, setaxPercentage] = useState(0);
  const [taxAmount, settaxAmount] = useState(0);

  const formatPhoneNumber = (number) => {
    // Convert the input to a string
    const numberStr = String(number);

    // Remove non-numeric characters
    const cleaned = numberStr.replace(/\D/g, "");

    // Format based on length
    if (cleaned.length === 10) {
      // Format for a standard 10-digit phone number
      return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
    } else if (cleaned.length === 11 && cleaned.startsWith("1")) {
      // Format for US-style 11-digit numbers with country code "1"
      return cleaned.replace(/(\d)(\d{3})(\d{3})(\d{4})/, "$1-$2-$3-$4");
    } else {
      // Generic fallback for other formats
      return cleaned;
    }
  };



  useEffect(() => {
    setSelectedAddress(null);
    setShippingSelectedAddress(null);
    setShippingSelectedAddress(null);
    setIsSameAsShipping(false);
    setActiveTab("card");
    setpoNumber("");
    setfileUpload("");
    setaxPercentage(shippingInfo?.tax?.tax_percentage);
    settaxAmount(shippingInfo?.tax?.tax_amount);
    setSelectedRate(shippingInfo?.requestQuoteDB?.service_code);
    // console.log(shippingInfo.requestQuoteDB?.service_code,".requestQuoteDB")
    if (shippingInfo?.requestQuoteDB?.service_code != null) {
      handleRateSelected(
        shippingInfo?.requestQuoteDB?.service_code,
        shippingInfo?.requestQuoteDB?.service_code == "ups_next_day_air"
          ? shippingInfo?.requestQuoteDB?.shipping_upsair_price
          : shippingInfo?.requestQuoteDB?.service_code == "ups_ground"
          ? shippingInfo?.requestQuoteDB?.shipping_upsground_price
          : shippingInfo?.requestQuoteDB?.service_code == "ups_2nd_day_air"
          ? shippingInfo?.requestQuoteDB?.shipping_ups_2nd_day_air_price
          : shippingInfo?.requestQuoteDB?.service_code == "custom_rates"
          ? shippingInfo?.requestQuoteDB?.custom_rates
          : "0.00"
      );
    }
    console.log("shippingInfo ::::::::::",shippingInfo)
  }, [show]);

  useEffect(() => {
    if (cardsData.length > 0) {
      const defaultCard = cardsData.find((card) => card.is_default === 1);
      setSelectedCard(defaultCard || null); // Set default card or null if not found
    }
  }, [cardsData]);
  const [modalShow, setModalShow] = useState(false);
  const [activeTab, setActiveTab] = useState("card"); // Set default active tab key

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const matchedRate = shippingInfo.shippingRates?.find(
    (rate) => rate.service_code === selectedRate
  );
  
  const deliveryDays = matchedRate?.delivery_days;
  useEffect(() => {
    if (handleCloseTrigger) {
      const timer = setTimeout(() => {
        navigate("/orders");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [handleCloseTrigger]);

  const [poNumberText, setpoNumber] = useState("");
  const [fileUpload, setfileUpload] = useState("");
  const handlePONumberChange = (e) => {
    const poNumber = e.target.value;
    // console.log("PO Number:", poNumber);
    setpoNumber(poNumber);
    // Perform any necessary state updates or validation here
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // // console.log("Uploaded file:", file);
      if (file.type !== "application/pdf") {
        alert("Please upload a valid PDF file.");
        return;
      }
      setfileUpload(file);
      // Handle file upload logic here, e.g., send to an API
    }
  };

  const PaymentSubmit = async () => {
    let isValid = true;
    var po_number_type = "";
    var po_upload_type = "";
    if (isValid) {
      // // console.log(
      //   "dassdasdsadadssadsadsds",
      //   selectedAddress,
      //   selectedShippingAddress
      // );
      // return;
      // if (!selectedShippingAddress) {
      //   toast.error("Please select a shipping address.");
      //   return;
      // }
      // if (!isSameAsShipping && !selectedAddress) {
      //   toast.error("Please select a billing address.");
      //   return;
      // }

      if (rateVal === "") {
        toast.error("Please select a shipping method.");
        return;
      }
      if (activeTab == "card") {
        if (shippingInfo?.requestQuoteDB?.check_status == 0) {
          if (!selectedCard) {
            toast.error("Please select a payment card.");
            return;
          }
        }
      }
      if (activeTab == "net_terms") {
        if (poNumberText == "" && poNumberText.length < 1) {
          toast.error("Please add PO Number");
          return;
        }
        if (!fileUpload) {
          toast.error("Please upload a valid PDF file.");
          return;
        }
      }
      // const billingAddressId = isSameAsShipping
      //   ? selectedShippingAddress._id
      //   : selectedAddress?._id;

      // const selectedShippingAddressId = selectedShippingAddress._id;
      // // console.log("activeTab", fileUpload);
      // return;
      const data_id = {
        id: loadingPayId,
        status: 1,

        // billing_id: billingAddressId,
        // address_id: selectedShippingAddressId,
      };

      try {
        setLoading(true);
        const response_local = await axiosInstance.post(
          "/users/updateRequestQuoteRFQ",
          data_id
        );

        if (response_local.data.data.check_status == 1) {
          localStorage.setItem("setItemelementData", "");
          localStorage.setItem("setItempartsDBdata", "");
          toast.success("Request quote sent successfully");
          setLoading(false);
          navigate("/rfqs");
        }
        if (response_local.data.data.check_status == 0) {
          var formData = new FormData();
          formData.append("id", loadingPayId);
          formData.append("po_number", poNumberText);
          formData.append("po_upload", fileUpload);
          formData.append("type", activeTab);
          const res = await payment(formData);

          try {
            if (res.status == "success") {
              setModalShow(true);
              setLoading(false);
              sethandleCloseTrigger(true);
              localStorage.removeItem("setItemelementData");
              localStorage.removeItem("setItempartsDBdata");
            } else {
              toast.error(res.message);
              setLoading(false);
            }
          } catch (error) {
            // console.log(error);
            setLoading(false);
            toast.error("Something went wrong.");
          }
        }
      } catch (error) {
        setLoading(false);
        // console.log(error);
        toast.error("Something went wrong.");
      }
    }
  };

  // Handle selection change
  const handleShippingAddressChange = (event) => {
    const selectedId = event.target.value;
    const selectedAddr = address.find((addr) => addr?._id === selectedId);
    setShippingSelectedAddress(selectedAddr || null);
    if (isSameAsShipping && selectedAddress) {
      setSelectedAddress(selectedAddr || null);
    }
  };

  const handleAddressChange = (event) => {
    const selectedId = event.target.value;
    const selectedAddr = address.find((addr) => addr?._id === selectedId);
    setSelectedAddress(selectedAddr || null);
  };
  const handleCheckboxChange = (event) => {
    setIsSameAsShipping(event.target.checked);
    if (event.target.checked) {
      // Set the default shipping address as billing address
      const defaultShipping = address.find(
        (addr) => addr._id === selectedShippingAddress?._id
      );
      setSelectedAddress(defaultShipping || null);
    } else {
      setSelectedAddress(null);
    }
  };

  const [rateVal, setrateVal] = useState("");

  const handleRateSelected = async (rate, price) => {
    setSelectedRate(rate);
    if (shippingInfo?.requestQuoteDB?.check_status == 1) {
      setrateVal(0);
      return;
    }
    setrateVal(price);
    const elementId = localStorage.getItem("setItemelementData");

    const data = {
      service_code: rate,
      id: loadingPayId,
      address_id: selectedShippingAddress?._id,
       type :  shippingInfo?.requestQuoteDB?.check_status == 1 ? 'request' : ''
    };
    try {
      const res = await shippingCost(data);
      setaxPercentage(res?.data?.tax_percentage);
      settaxAmount(res?.data?.tax_amount);
    } catch (error) {}
  };


  return (
    <React.Fragment>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        className="proceedCheckout_modal"
        size="lg"
      >
        <Modal.Body className="w-100">
          <div className="shipping_info">
            <Row>
              <Col lg={6}>
                {/* Shipping Address */}
                <div className="shipping_addr_name bill_addr_name">
                  <h2 className="shipping_head">Shipping Address</h2>

                  {/* {selectedShippingAddress ? ( */}
                  <Col xl={12} lg={12} md={12} className="mb-4">
                    <div className="addresses-grid">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <h2 className="mb-0">
                          {
                            shippingInfo?.requestQuoteDB?.address_details
                              ?.full_name
                          }
                        </h2>
                      </div>
                      <p className="mb-2">
                        {
                          shippingInfo?.requestQuoteDB?.address_details
                            ?.nickname
                        }
                      </p>
                      <p className="mb-2">
                        {
                          formatPhoneNumber(shippingInfo?.requestQuoteDB?.address_details
                            ?.phone_number)
                        }
                      </p>
                      <p className="mb-3">
                        {
                          shippingInfo?.requestQuoteDB?.address_details
                            ?.address_line_1
                        }
                        , {shippingInfo?.requestQuoteDB?.address_details?.city} {shippingInfo?.requestQuoteDB?.address_details?.state_code},{" "}
                        {shippingInfo?.requestQuoteDB?.address_details?.pincode}
                        ,{" "}
                        {shippingInfo?.requestQuoteDB?.address_details?.country}
                      </p>
                      {/* <div className="btn-bottom">
                          
                        </div> */}
                    </div>
                  </Col>
                  {/* ) : (
                    !isSameAsShipping && (
                      <Col>
                        <p>No address selected</p>
                      </Col>
                    )
                  )} */}
                </div>
              </Col>
              <Col lg={6}>
                <div className="ship_methods mb-4">
                  <h2 className="shipping_head">Shipping Method</h2>
                  {shippingInfo?.requestQuoteDB?.shipping_price_update == 1 ? (
                    <>
                    
                      {selectedRate === "local_pickup" && (
                        <div className="rate-option">
                          <label>
                            <input
                              type="checkbox"
                              value="local_pickup"
                              checked={selectedRate === "local_pickup"}
                              onChange={() =>
                                handleRateSelected("local_pickup", 0.0)
                              }
                            />
                             <b>&nbsp;&nbsp;Local Pickup (FREE)</b>
                          </label>
                        </div>
                      )}
                      {selectedRate === "ups_ground" && (
                        <div className="shippingbg_box">
                        <div className="rate-option">
                          <label className="d-flex align-items-start gap-2">
                            <input
                              type="checkbox"
                              value="ups_ground"
                              checked={selectedRate === "ups_ground"}
                              onChange={() =>
                                handleRateSelected(
                                  "ups_ground",
                                  shippingInfo?.requestQuoteDB
                                    ?.shipping_upsground_price
                                )
                              }
                            />
                            <div className="flex-grow-1">
                            <b>UPS Ground® -&nbsp;
                            <Amount
                              amount={
                                shippingInfo?.requestQuoteDB
                                  ?.shipping_upsground_price
                              }
                            /></b>
                            
                            <br/>
                            {/* {shippingInfo.shippingRates?.find(rate => rate.service_code === "ups_ground")?.delivery_days && ( */}
                                    <span>
                                    {(() => {
    const rate = shippingInfo.shippingRates.find(
      (rate) => rate.service_code === "ups_ground"
    );

    if (rate && rate.delivery_days !== null && rate.delivery_days !== undefined) {
      return (
        <>
          Time in transit: {rate.delivery_days} Business day
          {rate.delivery_days > 1 ? "s" : ""}
        </>
      );
    } else {
      return "Delivery time not available ---"+JSON.stringify(rate);
    }
  })()}
                                    </span>
                            {/* )} */}
                            </div>
                          </label>

                        </div>
                        </div>
                      )}
                       {selectedRate === "ups_2nd_day_air" && (
                        <div className="shippingbg_box">
                        <div className="rate-option">
                          <label className="d-flex align-items-start gap-2">
                            <input
                              type="checkbox"
                              value="ups_2nd_day_air"
                              checked={selectedRate === "ups_2nd_day_air"}
                              onChange={() =>
                                handleRateSelected("ups_2nd_day_air",  shippingInfo?.requestQuoteDB
                                  ?.shipping_ups_2nd_day_air_price)
                              }
                            />
                            <div className="flex-grow-1">
                            <b>UPS 2nd Day Air® -&nbsp;
                            <Amount
                              amount={
                                shippingInfo?.requestQuoteDB
                                  ?.shipping_ups_2nd_day_air_price
                              }

                              /></b>
                            
                            <br/>
                            {shippingInfo.shippingRates?.find(rate => rate.service_code === "ups_2nd_day_air")?.delivery_days && (
                                    <span>
                                      Time in transit :  {shippingInfo.shippingRates.find(rate => rate.service_code === "ups_2nd_day_air").delivery_days} Business day{shippingInfo.shippingRates.find(rate => rate.service_code === "ups_2nd_day_air").delivery_days > 1 ? 's' : ''}
                                    </span>
                            )}
                            </div>
                          </label>
 
                        </div>
                        </div>
                      )}
                      {selectedRate === "ups_next_day_air" && (
                        <div className="shippingbg_box">
                        <div className="rate-option">
                          <label className="d-flex align-items-start gap-2">
                            <input
                              type="checkbox"
                              value="ups_next_day_air"
                              checked={selectedRate === "ups_next_day_air"}
                              onChange={() =>
                                handleRateSelected(
                                  "ups_next_day_air",
                                  shippingInfo?.requestQuoteDB
                                    ?.shipping_upsair_price
                                )
                              }
                            />
                            <div className="flex-grow-1">

                            <b> UPS Next Day Air® -&nbsp;

                            <Amount
                              amount={
                                shippingInfo?.requestQuoteDB
                                  ?.shipping_upsair_price
                              }
                            />
                            </b>
                            <br/>
                            {shippingInfo.shippingRates?.find(rate => rate.service_code === "ups_next_day_air")?.delivery_days && (
                                    <span>
                                      Time in transit : {shippingInfo.shippingRates.find(rate => rate.service_code === "ups_next_day_air").delivery_days} Business day{shippingInfo.shippingRates.find(rate => rate.service_code === "ups_next_day_air").delivery_days > 1 ? 's' : ''} 
                                    </span>
                            )}
                          </div>
                          </label>
                        </div>
                        </div>
                      )}
                      
                      {selectedRate === "custom_rates" &&
                        shippingInfo?.requestQuoteDB?.custom_rates !== 0 && (
                          <div className="rate-option">
                            <label>
                              <input
                                type="checkbox"
                                value="custom_rates"
                                checked={selectedRate === "custom_rates"}
                                onChange={() =>
                                  handleRateSelected(
                                    "custom_rates",
                                    shippingInfo?.requestQuoteDB?.custom_rates
                                  )
                                }
                              />
                               <b>&nbsp;&nbsp;Freight Shipping (
                              <Amount
                                amount={
                                  shippingInfo?.requestQuoteDB?.custom_rates
                                }
                              />
                              )</b>
                            </label>
                          </div>
                        )}
                    </>
                  ) : ( 
                    <ShippingRates
                      shippingRates={shippingInfo.shippingRates}
                      divideWeight={shippingInfo.divideWeight}
                      onRateSelected={handleRateSelected}
                      RequestQuote={shippingInfo?.requestQuoteDB?.check_status}
                      selectedShippingAddress={111}
                      requestDb={shippingInfo?.requestQuoteDB}
                    />
                  )}
                </div>
              </Col>
              <Col lg={6}>
                {/* Billing Address */}
                <div className="bill_addr_name">
                  <h2 className="shipping_head">Billing Address</h2>

                  {/* Checkbox for "Same as Shipping Address" */}
                  {/* {selectedShippingAddress && (
                    <Form.Check
                      type="checkbox"
                      label="Same as Shipping Address"
                      checked={isSameAsShipping}
                      onChange={handleCheckboxChange}
                      className="mb-3"
                    />
                  )}

                  {!isSameAsShipping && (
                    <Form.Select
                      aria-label="Select Address"
                      onChange={handleAddressChange}
                      className="mb-3"
                    >
                      <option value="">Select Address</option>
                      {address.map((addr) => (
                        <option key={addr._id} value={addr._id}>
                          {addr.full_name} - {addr.address_line_1}, {addr.city}
                        </option>
                      ))}
                    </Form.Select>
                  )} */}
                  {/* {selectedAddress ? ( */}
                  <Col xl={12} lg={12} md={12} className="mb-4">
                    <div className="addresses-grid">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <h2 className="mb-0">
                          {
                            shippingInfo?.requestQuoteDB?.billing_details
                              ?.full_name
                          }
                        </h2>
                      </div>
                      <p className="mb-2">
                        {
                          shippingInfo?.requestQuoteDB?.billing_details
                            ?.nickname
                        }
                      </p>
                      <p className="mb-2">
                        {
                          formatPhoneNumber(shippingInfo?.requestQuoteDB?.billing_details
                            ?.phone_number)
                        }
                      </p>
                      <p className="mb-3">
                        {
                          shippingInfo?.requestQuoteDB?.billing_details
                            ?.address_line_1
                        }
                        , {shippingInfo?.requestQuoteDB?.billing_details?.city} {shippingInfo?.requestQuoteDB?.billing_details?.state_code},{" "}
                        {shippingInfo?.requestQuoteDB?.billing_details?.pincode}
                        ,{" "}
                        {shippingInfo?.requestQuoteDB?.billing_details?.country}
                      </p>
                    </div>
                  </Col>
                  {/* ) : (
                    !isSameAsShipping && (
                      <Col>
                        <p>No address selected</p>
                      </Col>
                    )
                  )} */}
                </div>
              </Col>
              <Col lg={6}>
                <div className="cards_sect paymentTab_div">
                <div className="d-flex align-items-center justify-content-between mb-3 gap-2 flex-wrap">
                  <h2 className="shipping_head mb-0">Payment Method </h2>
                    <Button onClick={handleShowCard} variant={null} className="btncstm p-0">
                                                  <Icon icon="mdi:add" className="me-1" width={17} height={17}/> Add New
                                                  </Button>
                                                  </div> 
                  {/* {shippingInfo?.requestQuoteDB?.} */}
                  <Tabs
                    defaultActiveKey="card"
                    id="uncontrolled-tab-example"
                    activeKey={activeTab}
                    onSelect={(key) => handleTabChange(key)}
                    className="mb-3"
                  >
                    <Tab eventKey="card" title="Card">
                      {shippingInfo?.requestQuoteDB?.check_status == 1 ? (
                        <>
                          <div className="text-center mt-2">
                            <b>
                              Once your RFQ has been approved you can proceed
                              with your payment.
                            </b>
                          </div>
                        </>
                      ) : cardsData.length === 0 ? (
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
                                  {/* <div className="d-flex align-items-center justify-content-between mb-3"> */}
                                  {/* <Image src={visa} className="img-fluid mb-3" alt="" /> */}
                                  {/* </div> */}
                                  <p
                                    className="mb-2 card-no"
                                    style={{ fontSize: "13px" }}
                                  >
                                    **** **** **** {card.last4}
                                  </p>
                                  <div className="card-actions">
                                    <div className="card-info">
                                      <strong>Expiry Date</strong>{" "}
                                      {card.exp_month}/{card.exp_year}
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
                    </Tab>
                    {shippingInfo?.requestQuoteDB?.pay_type == "1" && (
                      <Tab eventKey="net_terms" title="NET TERMS">
                        <div className="netTerms_flex">
                          <label htmlFor="poNumber">PO:</label>
                          <input
                            type="text"
                            id="poNumber"
                            name="poNumber"
                            min="1"
                            placeholder="Enter PO Number"
                            onChange={(e) => handlePONumberChange(e)}
                            style={{
                              margin: "10px 0",
                              width: "100%",
                            }}
                          />
                        </div>

                        <div className="POupload_field">
                          <label htmlFor="poUpload">
                            PO Upload (PDF only):
                          </label>
                          <input
                            type="file"
                            id="poUpload"
                            name="poUpload"
                            accept="application/pdf"
                            onChange={(e) => handleFileUpload(e)}
                            style={{
                              margin: "10px 0",
                              padding: "5px",
                              width: "100%",
                            }}
                          />
                        </div>
                      </Tab>
                    )}
                  </Tabs>
                </div>
              </Col>
            </Row>
            <div className="main_price text-center">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="quotesitem">Subtotal</span>
                <span className="quotesitem quotesright">
                  <Amount amount={shippingInfo?.requestQuoteDB?.total_amount + parseFloat(shippingInfo?.requestQuoteDB?.total_bend_price)} />{" "}
                </span>
              </div>
              {/* <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="quotesitem">Services</span>
                <span className="quotesitem quotesright">
                  <Amount
                    amount={shippingInfo?.requestQuoteDB?.total_bend_price}
                  />{" "}
                </span>
              </div> */}
              {rateVal != "" ? (
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span className="quotesitem">Shipping</span>
                  <span className="quotesitem quotesright">
                    <Amount amount={rateVal || 0} />{" "}
                  </span>
                </div>
              ) : (
                ""
              )}
               {taxAmount != "" ? (
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span className="quotesitem">Tax <b>({taxPercentage}%)</b></span>
                  <span className="quotesitem quotesright">
                    <Amount amount={taxAmount || 0} />{" "}
                  </span>
                </div>
              ) : (
                ""
              )}
              <div className="d-flex align-items-center justify-content-between">
                <span className="quotessubtotal">Total</span>
                <span className="quotesprice">
                  <Amount
                    amount={
                      parseFloat(
                        shippingInfo?.requestQuoteDB?.total_amount || 0
                      ) +
                      parseFloat(
                        shippingInfo?.requestQuoteDB?.total_bend_price || 0
                      ) +
                      parseFloat(rateVal == "" ? 0 : rateVal || 0) +  parseFloat(taxAmount == "" ? 0 : taxAmount || 0)
                    }
                  />
                </span>
              </div>
            </div>
            <div className="footer_btn">
              {shippingInfo?.requestQuoteDB?.check_status == 1 ? (
                <>
                  <Button
                    className="mt-3"
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
                      <>Request a Quote</>
                    )}
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    className="mt-3"
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
                        {activeTab == "card" ? (
                          <>
                            Proceed To Pay&nbsp;
                            <b>
                              <Amount
                                amount={
                                  parseFloat(
                                    shippingInfo?.requestQuoteDB
                                      ?.total_amount || 0
                                  ) +
                                  parseFloat(
                                    shippingInfo?.requestQuoteDB
                                      ?.total_bend_price || 0
                                  ) +
                                  parseFloat(rateVal == "" ? 0 : rateVal || 0) +  parseFloat(taxAmount == "" ? 0 : taxAmount || 0)
                                }
                              />
                            </b>
                          </>
                        ) : (
                          "Pay With Net Terms"
                        )}
                      </>
                    )}
                    {/* </> */}
                    {/* )} */}
                  </Button>
                </>
              )}
              <Button
                className="mt-3"
                variant="lt-primary ms-2"
                onClick={handleClose}
              >
                {" "}
                Cancel
              </Button>
            </div>
          </div>
          <PaymentDone show={modalShow} handleClose={handleCloseTrigger} />
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};
export default CheckOutPay;
