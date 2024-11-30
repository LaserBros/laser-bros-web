import React, { useEffect, useState } from "react";
import { Form, Button, Modal, Col, Row } from "react-bootstrap";
import DateFormat from "./DateFormat";
import OrderStatus from "./OrderStatus";
import Amount from "../../components/Amount";

const AddressDetails = ({
  shipAddress,
  billAdress,
  addressDetail,
  po_number,
  po_upload,
}) => {
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
              {shipAddress?.full_name} <br />
              {/* {shipAddress?.full_name} <br /> */}
              {shipAddress?.address_line_1} <br />
              {shipAddress?.address_line_2 != null ? (
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
        <Col lg={3} md={6}>
          <div className="QuoteBill_box">
            <h4>Ship To:</h4>
            <p>
              {billAdress?.full_name} <br />
              {/* {addressDetail?.address_details?.full_name} <br /> */}
              {billAdress?.address_line_1} 0909 <br />
              {billAdress?.address_line_2 != null ? (
                <>
                  {billAdress.address_line_2}
                  <br />
                </>
              ) : null}
              {billAdress?.city}, {billAdress?.state_code} {billAdress?.pincode}
            </p>
          </div>
        </Col>
        <Col lg={4} md={8}>
          <div className="QuoteBillInfo_box">
            <p>
              <b className="minWidth_110">Order date:</b>{" "}
              <DateFormat dateString={addressDetail?.createdAt} />
            </p>
            {addressDetail?.service_code && (
              <p>
                <b className="minWidth_110">Shipping Type:</b>{" "}
                {formatString(addressDetail?.service_code)}
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
        <Col lg={6}>
          <div className="QuoteBillInfo_box mb-0">
            {addressDetail?.address_details?.phone_number && (
              <p>
                <b>Phone Number:</b>
                {addressDetail?.address_details?.phone_number}
              </p>
            )}
            {addressDetail?.address_details?.email && (
              <p className="mb-0">
                <b>Email:</b>
                {addressDetail?.address_details?.email}
              </p>
            )}
          </div>
        </Col>
        <Col lg={6}>
          <div className="QuoteBillInfo_box mb-0 text-end">
            {/* <Button className="QuoteBillDownload_btn ms-2 mt-2" variant={null}>
              Download All Files
            </Button>
            <Button className="QuoteBillDownload_btn ms-2 mt-2" variant={null}>
              Download PDF
            </Button> */}
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default AddressDetails;
