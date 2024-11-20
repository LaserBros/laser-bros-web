import React, { useEffect, useState } from "react";
import { Form, Button, Modal, Col, Row } from "react-bootstrap";
import DateFormat from "./DateFormat";
import OrderStatus from "./OrderStatus";
import Amount from "../../components/Amount";

const AddressDetails = ({ addressDetail }) => {
  const formatString = (input) => {
    if (!input) return "";
    return input
      .replace(/_/g, " ") // Replace underscores with spaces
      .replace(/^\w/, (c) => c.toUpperCase()); // Capitalize the first character
  };

  return (
    <div className="QuoteBillMain_div">
      <Row>
        <Col lg={3} md={6}>
          <div className="QuoteBill_box">
            <h4>Bill To:</h4>
            <p>
              {addressDetail?.address_details?.full_name} <br />
              {/* {addressDetail?.address_details?.full_name} <br /> */}
              {addressDetail?.address_details?.address_line_1} <br />
              {addressDetail?.address_details?.address_line_2 != null ? (
                <>
                  {addressDetail.address_details.address_line_2}
                  <br />
                </>
              ) : null}
              {addressDetail?.address_details?.city},{" "}
              {addressDetail?.address_details?.state_code}{" "}
              {addressDetail?.address_details?.pincode}
            </p>
          </div>
        </Col>
        <Col lg={3} md={6}>
          <div className="QuoteBill_box">
            <h4>Ship To:</h4>
            <p>
              {addressDetail?.billing_details?.full_name} <br />
              {/* {addressDetail?.address_details?.full_name} <br /> */}
              {addressDetail?.billing_details?.address_line_1} 0909 <br />
              {addressDetail?.billing_details?.address_line_2 != null ? (
                <>
                  {addressDetail.billing_details.address_line_2}
                  <br />
                </>
              ) : null}
              {addressDetail?.billing_details?.city},{" "}
              {addressDetail?.billing_details?.state_code}{" "}
              {addressDetail?.billing_details?.pincode}
            </p>
          </div>
        </Col>
        <Col lg={4} md={8}>
          <div className="QuoteBillInfo_box">
            <p>
              <b className="minWidth_110">Order date:</b>{" "}
              <DateFormat dateString={addressDetail?.createdAt} />
            </p>
            <p>
              <b className="minWidth_110">Shipping Type:</b>
              {formatString(addressDetail?.service_code)}
            </p>
            {/* <p>
              <b className="minWidth_110">PO Number:</b>123987
            </p> */}
            <p>
              <b className="minWidth_110">Status:</b>{" "}
              <span className="badge_success">
                {" "}
                <OrderStatus status={addressDetail?.status} />
              </span>
            </p>
            <p className="mb-0">
              <b className="minWidth_110">Order Amount:</b>

              <Amount
                amount={
                  parseFloat(addressDetail?.total_amount || 0) +
                  parseFloat(addressDetail?.total_bend_price || 0)
                }
              />
            </p>
          </div>
        </Col>
        <Col lg={12}>
          <div className="QuoteBillInfo_box mb-0">
            <p>
              <b>Phone Number:</b>
              {addressDetail?.address_details?.phone_number}
            </p>
            <p className="mb-0">
              <b>Email:</b>
              {addressDetail?.address_details?.email}
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default AddressDetails;
