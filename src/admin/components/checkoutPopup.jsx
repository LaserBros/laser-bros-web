import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import paymentdone from "../../assets/img/paymentdone.svg";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import ShippingRates from "../../components/ShippingRates";
import Amount from "../../components/Amount";
import {
  getEditQuotePay,
  getShippingEstimatedCost,
  payment,
  shippingCost,
  updateShippingCost,
} from "../../api/api";
import axiosInstance from "../../axios/axiosInstance";
import { toast } from "react-toastify";
import PaymentDone from "./Paymentdone";
const CheckoutPopup = ({
  show,
  addressDetail,
  handleClose,
  UserData,
  divideWeight,
  onSave,
  TaxRatesVal
}) => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isSameAsShipping, setIsSameAsShipping] = useState(false);
  const [selectedShippingAddress, setShippingSelectedAddress] = useState(null);
  const [handleCloseTrigger, sethandleCloseTrigger] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState(null);
  const [shippingMethods, setShippingMethods] = useState([]);
  const [custom_rates , setCustomRates] = useState(0);
  const [UpsRates , setUpsRates] = useState(0);
  const [UpsGround , setUpsGround] = useState(0);
  const [shipping_ups_2nd_day_air_price , setshipping_ups_2nd_day_air_price] = useState(0);
  const [TaxRateVal , setTaxRateVal] = useState("");
  const existingShippingMethods = [
    {
      id: "local_pickup",
      name: "Local Pickup (FREE)",
      price: 0.0,
      isChecked: false,
      isEditing: false,
    },
    {
      id: "custom_rates",
      name: "Freight Shipping",
      price:  custom_rates != 0 ? custom_rates : addressDetail.shipping_price_update == 1 ? addressDetail.custom_rates : custom_rates,
      isChecked: false,
      isEditing: false,
    }, 
    {
      id: "ups_ground",
      name: "UPS® Ground",
      price:  UpsGround != 0 ? UpsGround : addressDetail.shipping_price_update == 1 ? addressDetail.shipping_upsground_price : UserData[1]?.service_code == 'ups_ground' ? UserData[1]?.shipping_amount?.amount : UpsGround,
      isChecked: false,
      isEditing: false,
    },
    {
      id: "ups_2nd_day_air",
      name: "UPS 2nd Day Air®",
      price:  shipping_ups_2nd_day_air_price != 0 ? shipping_ups_2nd_day_air_price : addressDetail.shipping_ups_2nd_day_air_price == 1 ? addressDetail.shipping_ups_2nd_day_air_price : UserData[0]?.service_code == 'ups_2nd_day_air' ? UserData[0]?.shipping_amount?.amount : shipping_ups_2nd_day_air_price,
      isChecked: false,
      isEditing: false,
    },
    {
      id: "ups_next_day_air",
      name: "UPS Next Day Air®",
      price:  UpsRates != 0 ? UpsRates : addressDetail.shipping_price_update == 1 ? addressDetail.shipping_upsair_price : UserData[2]?.service_code == 'ups_next_day_air' ? UserData[2]?.shipping_amount?.amount : UpsRates,
      isChecked: false,
      isEditing: false,
    },
  ];

  useEffect(() => {
    // // console.log("shipping_ups_2nd_day_air_price",shipping_ups_2nd_day_air_price, UserData)
    // // console.log("addressDetail ---=-=-=-",addressDetail.custom_rates)
    // const transformedMethods = UserData.map((rate) => ({
    //   id: rate.service_code,
    //   name: rate.service_type,
    //   price: divideWeight * rate.shipping_amount.amount,
    //   isChecked: false,
    //   isEditing: false,
    // }));

    // Combine the transformed methods with existing ones
    const mergedMethods = [...existingShippingMethods];
    setTaxRateVal(TaxRatesVal);
    // Update existingShippingMethods if IDs match or add new entries
    // transformedMethods.forEach((newMethod) => {
    //   const existingMethodIndex = mergedMethods.findIndex(
    //     (method) => method.id === newMethod.id
    //   );

    //   if (existingMethodIndex !== -1) {
    //     // Update price for matching IDs
    //     mergedMethods[existingMethodIndex] = {
    //       ...mergedMethods[existingMethodIndex],
    //       price: newMethod.price,
    //     };
    //   } else {
    //     // Add new shipping methods
    //     mergedMethods.push(newMethod);
    //   }
    // });

    setShippingMethods(mergedMethods);
    const selectedService = existingShippingMethods.find((method) => method.id === selectedServiceCode);
    // // console.log("selectedService",selectedService);
    setrateVal(selectedService?.price || 0);


  }, [show]);
  // const [shippingMethods, setShippingMethods] = useState([
  //   {
  //     id: "local_pickup",
  //     name: "Local Pickup",
  //     price: 0.0,
  //     isChecked: false,
  //     isEditing: false,
  //   },
  //   {
  //     id: "ups_ground",
  //     name: "UPS - UPS® Ground",
  //     price: 59.64,
  //     isChecked: false,
  //     isEditing: false,
  //   },
  //   {
  //     id: "ups_next_day_air",
  //     name: "UPS - UPS Next Day Air®",
  //     price: 297.51,
  //     isChecked: false,
  //     isEditing: false,
  //   },
  //   {
  //     id: "custom_rates",
  //     name: "Custom Rates",
  //     price: 17.51,
  //     isChecked: false,
  //     isEditing: false,
  //   },
  // ]);
  const [selectedOptions, setSelectedOptions] = useState([]); // State to hold selected options
  const [oldPrice, setOldPrice] = useState("");
  // Handle checkbox change
  const handleOptionChange = (option) => {
    if (selectedOptions.includes(option)) {
      // If option is already selected, remove it
      setSelectedOptions(selectedOptions.filter((opt) => opt !== option));
    } else {
      // If option is not selected, add it
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  // Handle submit to get the selected values
  const handleSubmit = () => {
    alert(`Selected Payment Options: ${selectedOptions.join(", ")}`);
    // // console.log("Selected Payment Options:", selectedOptions);
  };
  const handleCancelClick = (id, price) => {
    setShippingMethods((prev) =>
      prev.map((method) =>
        method.id === id
          ? { ...method, price: oldPrice, isEditing: false }
          : method
      )
    );
  };
  // Function to handle checkbox selection (only one at a time)
  const handleCheckboxChange =async (id) => {
    
    setSelectedServiceCode(id);
    const custom_rates = shippingMethods.find(
      (method) => method.id === "custom_rates"
    );
    const custom_ratesPrice = custom_rates ? custom_rates.price : 0;

    const ups_ground = shippingMethods.find(
      (method) => method.id === "ups_ground"
    );
    const ups_groundPrice = ups_ground ? ups_ground.price : 0;

    const ups_next_day_air = shippingMethods.find(
      (method) => method.id === "ups_next_day_air"
    );
    const ups_next_day_airPrice = ups_next_day_air ? ups_next_day_air.price : 0;

      const ups_2nd_day_air = shippingMethods.find(
      (method) => method.id === "ups_2nd_day_air"
    );
    const ups_2nd_day_airPrice = ups_2nd_day_air ? ups_2nd_day_air.price : 0;

    const isNetTermSelected = selectedOptions.includes("NET Term");
    const selectedMethod =
      shippingMethods.find((method) => method.isChecked)?.id || null;
    

    try {
      const data = {
        id: addressDetail?._id,
        pay_type: isNetTermSelected ? 1 : 0,
        shipping_upsair_price: ups_next_day_airPrice,
        shipping_upsground_price: ups_groundPrice,
        shipping_ups_2nd_day_air_price: ups_2nd_day_airPrice,
        custom_rates: custom_ratesPrice,
        service_code: id,
      };

      const res = await getShippingEstimatedCost(data);
      setTaxRateVal(res?.data?.tax);
    } catch {

    }
    setShippingMethods((prev) =>
      prev.map((method) => {
        const isSelected = method.id === id;
        if (isSelected) {
          setrateVal(method.price);
        }
        return {
          ...method,
          isChecked: isSelected, // Only the selected checkbox remains checked
        };
      })
    );
  };
  const [selectedServiceCode, setSelectedServiceCode] = useState(
    addressDetail?.service_code || null
  );

  const handleCheckout = async () => {
    const custom_rates = shippingMethods.find(
      (method) => method.id === "custom_rates"
    );
    const custom_ratesPrice = custom_rates ? custom_rates.price : 0;

    const ups_ground = shippingMethods.find(
      (method) => method.id === "ups_ground"
    );
    const ups_groundPrice = ups_ground ? ups_ground.price : 0;

    const ups_next_day_air = shippingMethods.find(
      (method) => method.id === "ups_next_day_air"
    );
    const ups_next_day_airPrice = ups_next_day_air ? ups_next_day_air.price : 0;


    const shipping_ups_2nd_day_air_price = shippingMethods.find(
      (method) => method.id === "ups_2nd_day_air"
    );
    const shipping_ups_2nd_day_airPrice = shipping_ups_2nd_day_air_price ? shipping_ups_2nd_day_air_price.price : 0;

    const isNetTermSelected = selectedOptions.includes("NET Term");
    const selectedMethod =
      shippingMethods.find((method) => method.isChecked)?.id || null;
    // // console.log("shippingMethods", selectedServiceCode);
    // return;
    try {
      const data = {
        id: addressDetail?._id,
        pay_type: isNetTermSelected ? 1 : 0,
        shipping_upsair_price: ups_next_day_airPrice,
        shipping_upsground_price: ups_groundPrice,
        shipping_ups_2nd_day_air_price:shipping_ups_2nd_day_airPrice,
        custom_rates: custom_ratesPrice,
        service_code: selectedServiceCode,
      };

      const res = await updateShippingCost(data);
      setCustomRates(res.data.updateShippingCosts.custom_rates || 0);
      setUpsGround(res.data.updateShippingCosts.shipping_upsground_price || 0)
      setshipping_ups_2nd_day_air_price(res.data.updateShippingCosts.shipping_ups_2nd_day_air_price || 0);
      setUpsRates(res.data.updateShippingCosts.shipping_upsair_price || 0)
      onSave(res.data);
    } catch (error) {}
  };

  // Function to handle edit/save button click
  const handleEditSaveClick = (id, editedPrice) => {
    setOldPrice(editedPrice);
    setShippingMethods((prev) =>
      prev.map((method) => {
        if (method.id === id) {
          if (method.isEditing) {
            if (method.isChecked) {
              setrateVal(editedPrice);
            }
            return {
              ...method,
              price: parseFloat(editedPrice),
              isEditing: !method.isEditing, // Toggle editing mode
            };
          } else {
            // If not editing, just toggle the editing mode
            return { ...method, isEditing: !method.isEditing };
          }
        }
        return method;
      })
    );
  };

  // Function to handle price change
  const handlePriceChange = (id, newPrice) => {
    setShippingMethods((prev) =>
      prev.map((method) =>
        method.id === id
          ? { ...method, price: parseFloat(newPrice) || 0 }
          : method
      )
    );
  };
  useEffect(() => {
    setSelectedAddress(null);
    setShippingSelectedAddress(null);
    setShippingSelectedAddress(null);
    setIsSameAsShipping(false);
    // // console.log("addressDetail", addressDetail);
    if(addressDetail.shipping_price_update == 1) {
      setCustomRates(addressDetail.custom_rates || 0);
      setUpsGround(addressDetail.shipping_upsground_price || 0)
      setshipping_ups_2nd_day_air_price(addressDetail.shipping_ups_2nd_day_air_price || 0);
      setUpsRates(addressDetail.shipping_upsair_price || 0)
    }
  }, [show]);

  const [modalShow, setModalShow] = useState(false);
  useEffect(() => {
    if (handleCloseTrigger) {
      const timer = setTimeout(() => {
        navigate("/orders");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [handleCloseTrigger]);

  const [rateVal, setrateVal] = useState("");

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
                  <Col xl={12} lg={12} md={12} className="mb-4">
                    <div className="addresses-grid">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <h2 className="mb-0">
                          {addressDetail?.address_details?.full_name}
                        </h2>
                      </div>
                      <p className="mb-2">
                        {addressDetail?.address_details?.nickname}
                      </p>
                      <p className="mb-2">
                        {addressDetail?.address_details?.phone_number}
                      </p>
                      <p className="mb-3">
                        {addressDetail?.address_details?.address_line_1},{" "}
                        {addressDetail?.address_details?.city},{" "}
                        {addressDetail?.address_details?.pincode},{" "}
                        {addressDetail?.address_details?.country}
                      </p>
                      {/* <div className="btn-bottom"> */}
                      {/* <Link
                            className="btn-address"
                            to={`/my-address/edit-address/${addressDetail?.billing_details?._id}`}
                          >
                            <Icon icon="mynaui:edit" />
                          </Link> */}
                      {/* </div> */}
                    </div>
                  </Col>
                </div>
              </Col>
              <Col lg={6}>
                <div className="ship_methods mb-4">
                  <h2 className="shipping_head">Shipping Method</h2>
                  <div className="mt-3">
                    <hr />
                    <div className="head-quotes d-flex align-items-center justify-content-between">
                      <span className="quotessubtotal">Shipping Method</span>
                    </div>
                    {shippingMethods?.map((method) => (
                      <div
                        className="rate-option ShippingMethodCheckbox_div mb-3"
                        key={method.id}
                      >
                        <label>
                          <input
                            type="checkbox"
                            checked={
                              selectedServiceCode === method.id ||
                              method.isChecked
                            }
                            onChange={() => handleCheckboxChange(method.id)}
                          />
                          &nbsp;&nbsp;
                          {method.name}
                          
                           (
                          {method.isEditing ? (
                            <div className="ShippingMethodCount_div">
                              <input
                                type="number"
                                className="addNumber_input"
                                value={method.price}
                                onChange={(e) =>
                                  handlePriceChange(method.id, e.target.value)
                                }
                              />
                              {method.isEditing && (
                                <>
                                  <Button
                                    variant={null}
                                    className="save-price-btn"
                                    onClick={() =>
                                      handleEditSaveClick(
                                        method.id,
                                        method.price
                                      )
                                    }
                                  > 
                                    <Icon icon="lucide:check" />
                                  </Button>
                                  <Button
                                    variant={null}
                                    className="cancel-price-btn"
                                    onClick={() =>
                                      handleCancelClick(method.id, method.price)
                                    }
                                  >
                                    <Icon icon="majesticons:close" />
                                  </Button>
                                </>
                              )}
                            </div>
                          ) : (
                             <Amount amount={parseFloat(method.price) * parseFloat(divideWeight) } /> 
                          )}
                          )
                        </label>

                        {!method.isEditing && (
                          <Button
                            variant={null}
                            className="Edit-price-btn ms-2"
                            onClick={() =>
                              handleEditSaveClick(method.id, method.price)
                            }
                          >
                            <Icon icon="mynaui:edit" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </Col>
              <Col lg={6}>
                {/* Billing Address */}
                <div className="bill_addr_name">
                  <h2 className="shipping_head">Billing Address</h2>
                  <div className="addresses-grid">
                    <div className="d-flex align-items-center justify-content-between mb-1">
                      <h2 className="mb-0">
                        {addressDetail?.billing_details?.full_name}
                      </h2>
                    </div>
                    <p className="mb-2">
                      {addressDetail?.billing_details?.nickname}
                    </p>
                    <p className="mb-2">
                      {addressDetail?.billing_details?.phone_number}
                    </p>
                    <p className="mb-3">
                      {addressDetail?.billing_details?.address_line_1},{" "}
                      {addressDetail?.billing_details?.city},{" "}
                      {addressDetail?.billing_details?.pincode},{" "}
                      {addressDetail?.billing_details?.country}
                    </p>
                    {/* <div className="btn-bottom"> */}
                    {/* <Link
                            className="btn-address"
                            to={`/my-address/edit-address/${addressDetail?.billing_details?._id}`}
                          >
                            <Icon icon="mynaui:edit" />
                          </Link> */}
                    {/* </div> */}
                  </div>
                </div>
              </Col>
              <Col lg={6}>
                <div className="cards_sect">
                  <h2 className="shipping_head">Payment Method </h2>
                  <Form.Check
                    type="checkbox"
                    id="payWithCard"
                    checked={true}
                    disabled={true}
                    label="Pay with Card"
                    // checked={selectedOptions.includes("Pay with Card")}
                    onChange={() => handleOptionChange("Pay with Card")}
                  />
                  <Form.Check
                    type="checkbox"
                    id="netTerm"
                    label="NET Term"
                    checked={selectedOptions.includes("NET Term")}
                    onChange={() => handleOptionChange("NET Term")}
                  />
                </div>
              </Col>
            </Row>
            <div className="main_price text-center mt-3">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="quotesitem">Subtotal</span>
                <span className="quotesitem quotesright">
                  <Amount amount={addressDetail?.total_amount + parseFloat(addressDetail?.total_bend_price)} />{" "}
                </span>
              </div>
              {/* <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="quotesitem">Services</span>
                <span className="quotesitem quotesright">
                  <Amount amount={addressDetail?.total_bend_price} />{" "}
                </span>
              </div>
               */}
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
               {TaxRateVal != "" ? (
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span className="quotesitem">Tax ({TaxRateVal?.tax_percentage}%)</span>
                  <span className="quotesitem quotesright">
                    <Amount amount={parseFloat(TaxRateVal?.tax_amount || 0)} />{" "}
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
                      parseFloat(addressDetail?.total_amount || 0) +
                      parseFloat(addressDetail?.total_bend_price || 0) +
                      parseFloat(rateVal == "" ? 0 : rateVal || 0) + 
                      parseFloat(TaxRateVal?.tax_amount || 0)
                    }
                  />
                </span>
              </div>
            </div>
            <div className="footer_btn">
              <Button className="mt-3" onClick={handleCheckout}>
                {" "}
                Save & Close
              </Button>
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
