import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import paymentdone from "../assets/img/paymentdone.svg";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import ShippingRates from "./ShippingRates";
import Amount from "./Amount";
import { getEditQuotePay, payment, shippingCost } from "../api/api";
import axiosInstance from "../axios/axiosInstance";
import { toast } from "react-toastify";
import PaymentDone from "./Paymentdone";
const CheckoutPopup = ({
  show,
  handleClose,
  address,
  shippingInfo,
  cardsData,
}) => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isSameAsShipping, setIsSameAsShipping] = useState(false);

  const [handleCloseTrigger, sethandleCloseTrigger] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState(null);

  // Set default card using useEffect
  useEffect(() => {
    if (cardsData.length > 0) {
      const defaultCard = cardsData.find((card) => card.is_default === 1);
      setSelectedCard(defaultCard || null); // Set default card or null if not found
    }
  }, [cardsData]);
  const [modalShow, setModalShow] = useState(false);
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
      //   console.log("dassdasdsadadssadsadsds", selectedAddress, isSameAsShipping);
      if (!isSameAsShipping && !selectedAddress) {
        toast.error("Please select a billing address.");
        return;
      }
      if (rateVal === "") {
        toast.error("Please select a shipping method.");
        return;
      }
      if (shippingInfo?.requestQuoteDB?.check_status == 0) {
        if (!selectedCard) {
          toast.error("Please select a payment card.");
          return;
        }
      }
      const billingAddressId = isSameAsShipping
        ? address.find((addr) => addr.is_default === 1)?._id // Default shipping address `_id`
        : selectedAddress?._id;
      const elementId = localStorage.getItem("setItemelementData");
      let getId = "";

      if (elementId) {
        getId = JSON.parse(elementId);
      }
      if (getId && getId._id) {
        const data_id = {
          id: getId._id,
          status: 1,
          billing_id: billingAddressId,
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
              id: getId._id,
              billing_id: billingAddressId,
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
              console.log(error);
              setLoading(false);
              toast.error("Something went wrong.");
            }
          }
        } catch (error) {
          setLoading(false);
          console.log(error);
          toast.error("Something went wrong.");
        }
      }
    }
  };
  // Handle selection change
  const handleAddressChange = (event) => {
    const selectedId = event.target.value;
    const selectedAddr = address.find((addr) => addr._id === selectedId);
    setSelectedAddress(selectedAddr || null);
  };
  const handleCheckboxChange = (event) => {
    setIsSameAsShipping(event.target.checked);
    if (event.target.checked) {
      // Set the default shipping address as billing address
      const defaultShipping = address.find((addr) => addr.is_default === 1);
      setSelectedAddress(defaultShipping || null);
    } else {
      setSelectedAddress(null); // Clear selection when unchecked
    }
  };
  const [rateVal, setrateVal] = useState("");
  const handleRateSelected = async (rate, price) => {
    setrateVal(price);
    const elementId = localStorage.getItem("setItemelementData");
    var getId = "";
    if (elementId) {
      getId = JSON.parse(elementId);
    }

    const data = {
      service_code: rate,
      id: getId._id,
    };
    try {
      const res = shippingCost(data);
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
                <div className="shipping_addr_name">
                  <h2 className="shipping_head">Shipping Address</h2>
                  {address.length === 0 ? (
                    <Col>
                      <p>No addresses found</p>
                    </Col>
                  ) : (
                    address.map((addr) =>
                      addr.is_default === 1 ? (
                        <Col
                          xl={12}
                          lg={12}
                          md={12}
                          className="mb-4"
                          key={addr._id}
                        >
                          <div className="addresses-grid">
                            <div className="d-flex align-items-center justify-content-between mb-3">
                              <h2 className="mb-0">{addr.full_name}</h2>
                            </div>
                            <p className="mb-2">{addr.phone_number}</p>
                            <p className="mb-3">
                              {addr.address_line_1}, {addr.city}, {addr.pincode}
                              , {addr.country}
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
                </div>
              </Col>
              <Col lg={6}>
                <div className="ship_methods mb-4">
                  <h2 className="shipping_head">Shipping Method</h2>
                  <ShippingRates
                    shippingRates={shippingInfo.shippingRates}
                    divideWeight={shippingInfo.divideWeight}
                    onRateSelected={handleRateSelected}
                  />
                </div>
              </Col>
              <Col lg={6}>
                {/* Billing Address */}
                <div className="bill_addr_name">
                  <h2 className="shipping_head">Billing Address</h2>

                  {/* Checkbox for "Same as Shipping Address" */}
                  <Form.Check
                    type="checkbox"
                    label="Same as Shipping Address"
                    checked={isSameAsShipping}
                    onChange={handleCheckboxChange}
                    className="mb-3"
                  />

                  {/* If checkbox is unchecked, show dropdown */}
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
                  )}

                  {/* Show Address Details */}
                  {selectedAddress ? (
                    <Col xl={12} lg={12} md={12} className="mb-4">
                      <div className="addresses-grid">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <h2 className="mb-0">{selectedAddress.full_name}</h2>
                        </div>
                        <p className="mb-2">{selectedAddress.phone_number}</p>
                        <p className="mb-3">
                          {selectedAddress.address_line_1},{" "}
                          {selectedAddress.city}, {selectedAddress.pincode},{" "}
                          {selectedAddress.country}
                        </p>
                        <div className="btn-bottom">
                          <Link
                            className="btn-address"
                            to={`/my-address/edit-address/${selectedAddress._id}`}
                          >
                            <Icon icon="mynaui:edit" />
                          </Link>
                        </div>
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
                  <h2 className="shipping_head">Payment Method :</h2>
                  {shippingInfo?.requestQuoteDB?.check_status == 1 ? (
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
                <span className="quotesitem">Laser Cutting</span>
                <span className="quotesitem quotesright">
                  <Amount amount={shippingInfo?.requestQuoteDB?.total_amount} />{" "}
                </span>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="quotesitem">Services</span>
                <span className="quotesitem quotesright">
                  <Amount
                    amount={shippingInfo?.requestQuoteDB?.total_bend_price}
                  />{" "}
                </span>
              </div>
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
              <div className="d-flex align-items-center justify-content-between">
                <span className="quotessubtotal">Subtotal</span>
                <span className="quotesprice">
                  <Amount
                    amount={
                      parseFloat(
                        shippingInfo?.requestQuoteDB?.total_amount || 0
                      ) +
                      parseFloat(
                        shippingInfo?.requestQuoteDB?.total_bend_price || 0
                      ) +
                      parseFloat(rateVal == "" ? 0 : rateVal || 0)
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
                        Proceed To Pay
                        <b>
                          <Amount
                            amount={
                              parseFloat(
                                shippingInfo?.requestQuoteDB?.total_amount || 0
                              ) +
                              parseFloat(
                                shippingInfo?.requestQuoteDB
                                  ?.total_bend_price || 0
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
