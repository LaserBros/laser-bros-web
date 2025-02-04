import React, { useState } from "react";

const ShippingRates = ({
  shippingRates,
  divideWeight,
  onRateSelected,
  service_code,
  RequestQuote,
  selectedShippingAddress,
  requestDb,
}) => {
  const [selectedRate, setSelectedRate] = useState(service_code);

  // Handle checkbox selection (only one at a time)
  const handleCheckboxChange = (carrierId, rate, price) => {
    const newSelectedRate = selectedRate === carrierId ? null : carrierId;
    setSelectedRate(newSelectedRate);
    if (newSelectedRate) {
      onRateSelected(rate, price);
    }
  };

  return (
    <div className="mt-3">
      <hr />
      <div className="head-quotes d-flex align-items-center justify-content-between">
        <span className="quotessubtotal">Shipping methodss</span>
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
              &nbsp;&nbsp;Local Pickup (FREE)
            </label>
          </div>

          {shippingRates && shippingRates.length > 0 ? (
            <>
              {shippingRates.map((rate, index) => (
                <div key={index} className="rate-option">
                  <label>
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
                    &nbsp;&nbsp;{rate.carrier_friendly_name} -{" "}
                    {rate.service_type}
                    {RequestQuote == 0 &&
                      " ($" +
                        parseFloat(
                          divideWeight * rate.shipping_amount.amount
                        ).toFixed(2) +
                        ")"}
                  </label>
                </div>
              ))}
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
