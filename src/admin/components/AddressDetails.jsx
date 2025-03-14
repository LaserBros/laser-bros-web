import React, { useEffect, useState } from "react";
import { Form, Button, Modal, Col, Row } from "react-bootstrap";
import DateFormat from "./DateFormat";
import OrderStatus from "./OrderStatus";
import Amount from "../../components/Amount";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

const AddressDetails = ({
  shipAddress,
  billAdress,
  addressDetail,
  po_number,
  po_upload,
  isPassShipping,
  quote_number,
  isShowDownload,
  onClickDownloadWO,
  onClickDownloadAllFile,
  isShowTrack,
  onClickTrack,
  TaxRatesVal,
  isShippingInfo,
  onClickShipping,
  setAddressEdit,
  SetAddressInfo,
  setType,
}) => {
  const getStatusColorOrder = (status) => {
    switch (status) {
      case 1:
        return {
          backgroundColor: "rgba(233,240,248,1)",
          color: "#4F8CCA",
          padding: 6,
        };
      case 3:
        return {
          backgroundColor: "rgba(1,148,60,0.10)",
          color: "#01943C",
          padding: 6,
        };
      case 4:
        return {
          backgroundColor: "rgba(255, 0, 0, 0.1)",
          color: "red",
          padding: 6,
        };
      case 2:
        return {
          backgroundColor: "rgba(79,140,202,0.10)",
          color: "#4F8CCA",
          padding: 6,
        };
      case 0:
        return {
          backgroundColor: "rgba(233,240,248,1)",
          color: "#4F8CCA",
          padding: 6,
        };
      default:
        return {};
    }
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "Approved!":
        return {
          backgroundColor: "rgba(1,148,60,0.10)",
          color: "#01943C",
          padding: "0px 6px",
        };
      case "Rejected":
        return {
          backgroundColor: "rgb(225, 31, 38)",
          color: "#fff",
          padding: "0px 6px",
        };

      case "Pending":
        return {
          backgroundColor: "rgba(255,186,22,0.10)",
          color: "#FFBA16",
          padding: "0px 6px",
        };
      default:
        return {};
    }
  };
  const formatString = (input) => {
    if (input == "custom_rates") return "Freight Shipping";
    if (!input) return "";
    return input.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase());
  };

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

  return (
    <div className={`QuoteBillMain_div ${quote_number ? "border-0" : ""}`}>
      <Row>
        <Col lg={3} md={6}>
          <div className="QuoteBill_box">
            <h4>
              Ship To:{" "}
              {isShowDownload && (
              <Link
              className="btnicons" 
                onClick={() => {
                  setAddressEdit(true);
                  SetAddressInfo(billAdress);
                  setType("Shipping");
                }}
              >
                <Icon icon="mynaui:edit" width={16} height={16} />
              </Link>
              )}
            </h4>
            <p>
              {billAdress?.full_name} <br />
              {/* {addressDetail?.address_details?.full_name} <br /> */}
              {billAdress?.address_line_1} <br />
              {billAdress?.address_line_2 ? (
                <>
                  {billAdress.address_line_2}
                  <br />
                </>
              ) : null}
              {billAdress?.city}, {billAdress?.state_code} {billAdress?.pincode}
            </p>
          </div>
        </Col>
        <Col lg={3} md={6}>
          <div className="QuoteBill_box">
            <h4>
              Bill To:{" "}
              {isShowDownload && (
                <Link
                  className="btnicons" 
                  onClick={() => {
                    setAddressEdit(true);
                    SetAddressInfo(shipAddress);
                    setType("Billing");
                  }}
                >
                  <Icon
                    icon="mynaui:edit"
                     
                    width={16}
                    height={16}
                  />
                </Link>
              )}
            </h4>
            <p>
              {shipAddress?.full_name} <br />
              {/* {shipAddress?.full_name} <br /> */}
              {shipAddress?.address_line_1} <br />
              {shipAddress?.address_line_2 ? (
                <>
                  {shipAddress?.address_line_2}
                  <br />
                </>
              ) : null}
              {shipAddress?.city}, {shipAddress?.state_code}{" "}
              {shipAddress?.pincode}
            </p>
          </div>
        </Col>

        <Col lg={4} md={8}>
          <div className="QuoteBillInfo_box">
            <p>
              <b className="minWidth_110">Order date:</b>{" "}
              <DateFormat dateString={addressDetail?.createdAt} />
            </p>

            {(addressDetail?.service_code || addressDetail?.shipping) && (
              <p>
                <b className="minWidth_110">Shipping Type:</b>{" "}
                {formatString(
                  addressDetail?.service_code || addressDetail?.shipping
                )}
              </p>
            )}
            {po_number && (
              <p>
                <b className="minWidth_110">Purchase Number : </b> {po_number}
              </p>
            )}
            {po_upload && (
              <p>
                <b className="minWidth_110">Purchase Upload:</b>{" "}
                <a href={po_upload}>File</a>
              </p>
            )}
            {/* <p>
              <b className="minWidth_110">PO Number:</b>123987
            </p> */}

            {isPassShipping ? (
              <p>
                <b className="minWidth_110">Status:</b>{" "}
                <span
                  className="badge_success"
                  style={getStatusColor(isPassShipping)}
                >
                  {isPassShipping == "Pending"
                    ? "Pending Review"
                    : isPassShipping}
                </span>
              </p>
            ) : (
              <p>
                <b className="minWidth_110">Status:</b>{" "}
                <span
                  className="badge_success"
                  style={getStatusColorOrder(addressDetail?.status)}
                >
                  {" "}
                  <OrderStatus status={addressDetail?.status} />
                </span>
              </p>
            )}
  {TaxRatesVal?.tax_amount && Number(TaxRatesVal.tax_amount) > 0 && (
  <p className="mb-0">
    <b className="minWidth_110">
      Tax <span>({TaxRatesVal.tax_percentage}%)</span>:
    </b>{" "}
    <Amount amount={Number(TaxRatesVal.tax_amount)} />
  </p>
)}

            <p className="mb-0">
              <b className="minWidth_110">Order Amount:</b>

              <Amount
                amount={
                  parseFloat(addressDetail?.total_amount || 0) +
                  parseFloat(addressDetail?.total_bend_price || 0) +
                  parseFloat(TaxRatesVal?.tax_amount || 0) +
                  parseFloat(addressDetail?.shipping_price || 0)
                }
              />
            </p>
          </div>
        </Col>
        <Col lg={6}>
          <div className="QuoteBillInfo_box mb-0">
            {quote_number && (
              <p>
                <b>Quote Number:</b> #{quote_number}
              </p>
            )}
            {(addressDetail?.address_details?.phone_number ||
              addressDetail?.phone_number) && (
              <p>
                <b>Phone Number:</b>{" "}
                {formatPhoneNumber(
                  addressDetail?.address_details?.phone_number ||
                    addressDetail?.phone_number
                )}
              </p>
            )}

            {(addressDetail?.address_details?.email ||
              addressDetail?.email) && (
              <p className="mb-0">
                <b>Email: </b>{" "}
                {addressDetail?.address_details?.email || addressDetail?.email}
              </p>
            )}
            {/* {addressDetail?.address_details?.company_name} -- { addressDetail?.company_name} */}
            {isShowDownload &&
              (addressDetail?.address_details?.company_name ||
                addressDetail?.company_name) && (
                <p className="mb-0">
                  <b>Company Name: </b>{" "}
                  {addressDetail?.address_details?.company_name ||
                    addressDetail?.company_name}
                </p>
              )}
          </div>
        </Col>
        <Col lg={6}>
          <div className="QuoteBillInfo_box mb-0 text-end">
            {addressDetail?.status == 3 && isShowTrack && (
              <Button
                className="QuoteBillDownload_btn ms-2 mt-2"
                variant={null}
                onClick={onClickTrack}
              >
                Track Order
              </Button>
            )}

            {isShowDownload && (
              <>
                {isShippingInfo &&
                  addressDetail?.status == 2 &&
                  addressDetail?.move_status == 2 &&
                  addressDetail?.service_code == "custom_rates" && (
                    <Button
                      className="QuoteBillDownload_btn ms-2 mt-2"
                      variant={null}
                      onClick={onClickShipping}
                    >
                      Enter Shipping Info
                    </Button>
                  )}
                <Button
                  className="QuoteBillDownload_btn ms-2 mt-2"
                  variant={null}
                  onClick={onClickDownloadAllFile}
                >
                  Download All Files
                </Button>
                <Button
                  className="QuoteBillDownload_btn ms-2 mt-2"
                  variant={null}
                  onClick={onClickDownloadWO}
                >
                  Download WO
                </Button>
              </>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default AddressDetails;
