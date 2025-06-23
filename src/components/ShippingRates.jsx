import React, { useState } from "react";

const ShippingRates = ({
  shippingRates,
  divideWeight,
  onRateSelected,
  service_code,
  RequestQuote,
  selectedShippingAddress,
  requestDb,
  ByDefaultShipping
}) => {
  const [selectedRate, setSelectedRate] = useState(service_code);
  const serviceOrder = [
    'UPS Ground®',
    'UPS 2nd Day Air®',
    'UPS Next Day Air®'
  ];
  
  const sortedShippingRates =
    Array.isArray(shippingRates)
      ? [...shippingRates].sort(
          (a, b) =>
            serviceOrder.indexOf(a.service_type) -
            serviceOrder.indexOf(b.service_type)
        )
      : [];
  // Handle checkbox selection (only one at a time)
  // const handleCheckboxChange = (carrierId, rate, price) => {
  //   console.log("checked",carrierId)
  //   const newSelectedRate = selectedRate === carrierId ? null : carrierId;
  //   setSelectedRate(newSelectedRate);
  //   if (newSelectedRate) {
  //     onRateSelected(rate, price); 
  //   }
  // };
 
  const handleCheckboxChange = (carrierId, rate, price) => {
    const isUnchecking = selectedRate === carrierId;
    const newSelectedRate = isUnchecking ? null : carrierId;
    setSelectedRate(newSelectedRate);
  
    if (isUnchecking) {
      // console.log("Checkbox unchecked for:", carrierId);
      onRateSelected("", "");
    } else {
      // console.log("Checkbox checked for:", carrierId);
      onRateSelected(rate, price);
    }
  };

  return (
    <div className="mt-3">
      <hr />
      <div className="head-quotes d-flex align-items-center justify-content-between">
        <span className="quotessubtotal">Shipping method</span>
      </div>
      {selectedShippingAddress ? (
        <>
          {RequestQuote == 1 && (
            <div className="quotessubtotal text-center">
              <i>
                Shipping rates will be calculates during the review of your
                quote
              </i>
            </div>
          )}
          {selectedShippingAddress?.permanent == 1 &&
          <div className="rate-option">
            <label>
              <input
                type="checkbox"
                value="local_pickup"
                checked={selectedRate === "local_pickup"}
                onChange={() =>
                  handleCheckboxChange("local_pickup", "local_pickup", 0.0)
                }
              />
              <b>&nbsp;&nbsp;Local Pickup (FREE)</b>
            </label>
          </div>
          }
          {shippingRates && shippingRates.length > 0 && selectedShippingAddress?.permanent == 0 ? (
            <>
            <div className="shippingbg_box">
              {sortedShippingRates.map((rate, index) => (
                <>
                <div key={index} className="rate-option">
                  <label className="d-flex align-items-start gap-2">
                    <input
                      type="checkbox"
                      value={rate.service_code}
                      checked={selectedRate === rate.service_code}
                      onChange={() =>
                        handleCheckboxChange(
                          rate.service_code,
                          rate.service_code,
                          parseFloat(
                            divideWeight * rate.shipping_amount.amount
                          ).toFixed(2)
                        )
                      }
                    />
                    <div className="flex-grow-1">
                    <b>{rate.service_type == 'UPS® Ground' ? 'UPS Ground®' : rate.service_type}

                    {RequestQuote == 0 &&
                      " - $" +
                        parseFloat(
                          divideWeight * rate.shipping_amount.amount
                        ).toFixed(2) +

                        ""}</b>
                        <br/>
                        <span>Time in transit : {rate.delivery_days} Business Day{rate.delivery_days > 1 ? 's' : '' }</span>

                        </div>
                  </label>
                
                </div>
                  </>

              ))}
              </div>
            </>
          ) : (
            <p> </p>
          )}
        </>
      ) : (
        <p className="text-center">Please select shipping address</p> 
      )}
    </div>
  );
};

export default ShippingRates;
