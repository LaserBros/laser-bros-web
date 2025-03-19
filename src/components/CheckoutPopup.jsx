import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import paymentdone from "../assets/img/paymentdone.svg";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import ShippingRates from "./ShippingRates";
import Amount from "./Amount";
import {
  getEditQuotePay,
  getShippingRatesAll,
  payment,
  shippingCost,
} from "../api/api";
import axiosInstance from "../axios/axiosInstance";
import { toast } from "react-toastify";
import PaymentDone from "./Paymentdone";
import AddAddressModal from "../screens/private/AddaddressModal";
const CheckoutPopup = ({
  loadingPayId,
  show,
  bendAmountPrice,
  handleClose,
  address,
  shippingInfo, 
  cardsData,
  setSuccessMessage,
  handleShow,
  showPopup,
  handleCloseModal,
  modalShowCard,
          handleShowCard,
          handleCloseCard,
          ParamType
}) => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isSameAsShipping, setIsSameAsShipping] = useState(false);
  const [selectedShippingAddress, setShippingSelectedAddress] = useState(null);
  const [handleCloseTrigger, sethandleCloseTrigger] = useState(false);
  const [loading, setLoading] = useState(false);

  const [rateVal, setrateVal] = useState("");
  const [taxPercentage, setaxPercentage] = useState(0);
  const [taxAmount, setaxAmount] = useState(0);

  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState(null);
  const [shippingInfoData, setshippingInfo] = useState("");
  
  useEffect(() => {
    setSelectedAddress(null);
    setShippingSelectedAddress(null);
    setShippingSelectedAddress(null);
    setIsSameAsShipping(false);
    setshippingInfo(shippingInfo);
    if(ParamType == "rfq") {
      setaxAmount(0);
      setaxPercentage(0);
      setrateVal("");
    }
  }, [show]);



  useEffect(() => {
    if (cardsData.length > 0) {
      const defaultCard = cardsData.find((card) => card.is_default === 1);
      setSelectedCard(defaultCard || null); // Set default card or null if not found
    }
  }, [cardsData]);
  const [modalShow, setModalShow] = useState(false);
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
    if (handleCloseTrigger) {
      const timer = setTimeout(() => {
        navigate("/orders");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [handleCloseTrigger]);
  const PaymentSubmit = async () => {
    const updatedQuoteData = JSON.parse(
      localStorage.getItem("setItempartsDBdata")
    );
    // console.log("updatedQuoteData =-=-=-=-", updatedQuoteData);
    let isValid = true;
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

    if (isValid) {
      // // console.log(
      //   "dassdasdsadadssadsadsds",
      //   selectedAddress,
      //   selectedShippingAddress
      // );
      // return;
      if (!selectedShippingAddress) {
        toast.error("Please select a shipping address.");
        return;
      }
      if (!isSameAsShipping && !selectedAddress) {
        toast.error("Please select a billing address.");
        return;
      }

      if (rateVal === "") {
        toast.error("Please select a shipping method.");
        return;
      }
      if (shippingInfoData?.requestQuoteDB?.check_status == 0) {
        if (!selectedCard) {
          toast.error("Please select a payment card.");
          return;
        }
      }
      const billingAddressId = isSameAsShipping
        ? selectedShippingAddress._id
        : selectedAddress?._id;

      const selectedShippingAddressId = selectedShippingAddress._id;
      // // console.log(
      //   "billingAddressId",
      //   billingAddressId,
      //   "selectedShippingAddressId",
      //   selectedShippingAddressId
      // );
      // return;
      const elementId = localStorage.getItem("setItemelementData");
      // let getId = "";

      // if (elementId) {
      //   getId = JSON.parse(elementId);
      // }
      // if (getId && getId._id) {
      const data_id = {
        id: loadingPayId?._id,
        status: 1,
        billing_id: billingAddressId,
        address_id: selectedShippingAddressId,
        type:ParamType
      };

      try {
        setLoading(true);
        const response_local = await axiosInstance.post(
          "/users/updateRequestQuote",
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
          const data = {
            id: loadingPayId?._id,
            billing_id: billingAddressId,
            address_id: selectedShippingAddressId,
          };
          const res = await payment(data);

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
      // }
    }
  };

  const [loadingShip, setloadingShip] = useState(false);
  const handleShippingAddressChange = async (event) => {
    const selectedId = event.target.value;
    
    const selectedAddr = address.find((addr) => addr._id === selectedId);
    setShippingSelectedAddress(selectedAddr || null);
    if (isSameAsShipping && selectedAddress) {
      setSelectedAddress(selectedAddress || null);
    }
    // // console.log("Dsdsdsdssddsd");
    setloadingShip(true);
    if(selectedId == "" || selectedId == null) {
      // setshippingInfo("")
      setIsSameAsShipping(false);
      setaxPercentage(0);
      setaxAmount(0);
      setrateVal(0);
      setSelectedAddress("")
      setloadingShip(false);
      return;
    }
    try {
      const data = {
        id: loadingPayId?._id,
        address_id: selectedId,
      };
      
      const res = await getShippingRatesAll(data);
      setshippingInfo(res.data);
      if(ParamType == "rfq") {
      const updatedShippingInfo = { 
        ...res.data, 
        requestQuoteDB: {
          ...res.data.requestQuoteDB,
          check_status: 1, 
        }
      };
      setshippingInfo(updatedShippingInfo);
    } 
    } catch (error) {
      // setshippingInfo("")
      setaxPercentage(0);
      setaxAmount(0);
      setrateVal(0);
      setIsSameAsShipping(false);
      setSelectedAddress("")
    }
   
    setloadingShip(false);
  };

  const handleAddressChange = (event) => {
    const selectedId = event.target.value;
    const selectedAddr = address.find((addr) => addr._id === selectedId);
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

  const handleRateSelected = async (rate, price) => {
    // // console.log("shippingInfo?.requestQuoteDB?.check_status",shippingInfoData?.requestQuoteDB?.check_status)
   
    setrateVal(price);
    if (shippingInfoData?.requestQuoteDB?.check_status == 1) {
      setrateVal(0);
      // return;
    }
    const elementId = localStorage.getItem("setItemelementData");
    var getId = "";
    if (elementId) {
      getId = JSON.parse(elementId);
    }
    // // console.log("selectedAddress?._id", selectedShippingAddress);
    // return;
    const data = {
      service_code: rate,
      id: loadingPayId?._id,
      address_id: selectedShippingAddress?._id,
      type :  shippingInfoData?.requestQuoteDB?.check_status == 1 ? 'request' : ''
    };
    try {
      const res = await shippingCost(data);
      // console.log(
      //   "shippingInfo?.userDBdata?.tax_exempt",
      //   shippingInfo?.requestQuoteDB?.check_status
      // );
      if (shippingInfo?.userDBdata?.tax_exempt == 0) {
        setaxAmount(res.data.tax_amount);
        setaxPercentage(res.data.tax_percentage);
        if (shippingInfoData?.requestQuoteDB?.check_status == 1 || ParamType == 'rfq') {
          setrateVal(0);
          setaxAmount(0);
          setaxPercentage(0);
          // return;
        }
      }
    } catch (error) {
      setaxAmount(0);
      setaxPercentage(0);
    }
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
                <div className="d-flex align-items-center justify-content-between mb-3 gap-2 flex-wrap">
                  <h2 className="shipping_head mb-0">Shipping Address</h2>
                  
                  <Button onClick={handleShow}  variant={null} className="btncstm p-0"><Icon icon="mdi:add" className="me-1" width={17} height={17}/> Add Address</Button>
                  <AddAddressModal show={showPopup} handleClose={handleCloseModal} setSuccessMessage={setSuccessMessage} />
                  </div>
                  <Form.Select
                    aria-label="Select Address"
                    onChange={handleShippingAddressChange}
                    className="mb-3"
                  >
                    <option value="">Select Address</option>
                    {address.map((addr) => (
                      <option key={addr?._id} value={addr?._id}>
                        {addr?.full_name} - {addr?.nickname}
                      </option>
                    ))}
                  </Form.Select>
                  {selectedShippingAddress ? (
                    <Col xl={12} lg={12} md={12} className="mb-4">
                      <div className="addresses-grid">
                        <div className="d-flex align-items-center justify-content-between mb-1">
                          <h2 className="mb-0">
                            {selectedShippingAddress.full_name}
                          </h2>
                        </div>
                        <p className="mb-2">
                          {selectedShippingAddress.nickname}
                        </p>
                        <p className="mb-2">
                          {formatPhoneNumber(selectedShippingAddress.phone_number)} 
                        </p>
                        <p className="mb-3">
                          {selectedShippingAddress.address_line_1},{" "}
                          {selectedShippingAddress.city}  {selectedShippingAddress?.state_code},{" "}
                          {selectedShippingAddress.pincode},{" "}
                          {selectedShippingAddress.country}
                        </p>
                        {selectedShippingAddress?.permanent == 0 &&
                        <div className="btn-bottom">
                          <Link
                            className="btn-address"
                            to={`/my-address/edit-address/${selectedShippingAddress._id}`}
                          >
                            <Icon icon="mynaui:edit" />
                          </Link>
                        </div>
                        }
                      </div>
                    </Col>
                  ) : (
                    !isSameAsShipping && (
                      <Col>
                        <p>No address selected</p>
                      </Col>
                    )
                  )}
                </div>
              </Col>
              <Col lg={6}>
                <div className="ship_methods mb-4">
                  <h2 className="shipping_head">Shipping Method</h2>
                  {loadingShip ? (
                    <span
                      role="status"
                      aria-hidden="true"
                      className="spinner-border spinner-border-sm text-center"
                      style={{
                        margin: "0 auto",
                        display: "block",
                        marginTop: "20px",
                        marginBottom: "20px",
                      }}
                    ></span>
                  ) : (
                    <>
                    <ShippingRates
                      shippingRates={shippingInfoData.shippingRates}
                      divideWeight={shippingInfoData.divideWeight}
                      onRateSelected={handleRateSelected}
                      RequestQuote={
                        shippingInfoData?.requestQuoteDB?.check_status
                      }
                      selectedShippingAddress={selectedShippingAddress}
                    />
                    </>
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
                  )} */}

                  {!isSameAsShipping && (
                    <Form.Select
                      aria-label="Select Address"
                      onChange={handleAddressChange}
                      className="mb-3"
                    >
                      <option value="">Select Address</option>
                      {address.map((addr) => (
                        addr?.permanent == 0 &&
                        <option key={addr?._id} value={addr?._id}>
                          {addr?.full_name} - {addr?.nickname}
                        </option>
                      ))}
                    </Form.Select>
                  )}
                  {selectedAddress ? (
                    <Col xl={12} lg={12} md={12} className="mb-4">
                      <div className="addresses-grid">
                        <div className="d-flex align-items-center justify-content-between mb-1">
                          <h2 className="mb-0">{selectedAddress.full_name}</h2>
                        </div>
                        <p className="mb-2">{selectedAddress.nickname}</p>
                        <p className="mb-2">{formatPhoneNumber(selectedAddress.phone_number)}</p>
                        <p className="mb-3">
                          {selectedAddress.address_line_1},{" "}
                          {selectedAddress.city} {selectedAddress?.state_code}, {selectedAddress.pincode},{" "}
                          {selectedAddress.country}
                        </p>
                        {selectedShippingAddress?.permanent == 0 &&
                        <div className="btn-bottom">
                          <Link
                            className="btn-address"
                            to={`/my-address/edit-address/${selectedAddress._id}`}
                          >
                            <Icon icon="mynaui:edit" />
                          </Link>
                        </div>
                        }
                      </div>
                    </Col>
                  ) : (
                    !isSameAsShipping && (
                      <Col>
                        <p>No address selected</p>
                      </Col>
                    )
                  )}
                </div>
              </Col>
              <Col lg={6}>
                <div className="cards_sect">
                  <div className="d-flex align-items-center justify-content-between mb-3 gap-2 flex-wrap">
                  <h2 className="shipping_head mb-0">Payment Method </h2>
                   <Button onClick={handleShowCard} variant={null} className="btncstm p-0">
                                <Icon icon="mdi:add" className="me-1" width={17} height={17}/> Add New
                                </Button>
                  </div>  
                  {shippingInfoData?.requestQuoteDB?.check_status == 1 ? (
                    <>
                      <div className="text-center mt-2">
                        <b>
                          Once your RFQ has been approved you can proceed with
                          your payment.
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
                </div>
              </Col>
            </Row>
            <div className="main_price text-center">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="quotesitem">Subtotal</span>
                <span className="quotesitem quotesright">
                  <Amount
                    amount={shippingInfoData?.requestQuoteDB?.total_amount + parseFloat(bendAmountPrice)}
                  />{" "}
                </span>
              </div>
              {/* <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="quotesitem">Services</span>
                <span className="quotesitem quotesright">
                  <Amount
                    amount={bendAmountPrice} 
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
                  <span className="quotesitem">
                    Tax
                    <b>
                      {" "}
                      <small>({taxPercentage}%)</small>
                    </b>
                  </span>
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
                        shippingInfoData?.requestQuoteDB?.total_amount || 0
                      ) +
                      parseFloat(
                        bendAmountPrice || 0
                      ) +
                      parseFloat(rateVal == "" ? 0 : rateVal || 0) +
                      parseFloat(taxAmount || 0)
                    }
                  />
                </span>
              </div>
            </div>
            <div className="footer_btn">
              {shippingInfoData?.requestQuoteDB?.check_status == 1 ? (
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
                        Proceed To Pay&nbsp;
                        <b>
                          <Amount
                            amount={
                              parseFloat(
                                shippingInfoData?.requestQuoteDB
                                  ?.total_amount || 0
                              ) +
                              parseFloat(
                                bendAmountPrice || 0
                              ) +
                              parseFloat(rateVal == "" ? 0 : rateVal || 0)
                            }
                          />
                        </b>
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
export default CheckoutPopup;
