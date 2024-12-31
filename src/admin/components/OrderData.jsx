import React, { useState } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";

const ModalOrderData = ({
  QuoteNumber,
  modalShow4,
  handleClose4,
  QuoteData,
}) => {
  const formatToTwoDecimals = (value) => {
    const number = parseFloat(value); // Convert the input to a number
    if (isNaN(number)) {
      return number; // Handle invalid input
    }
    return number.toFixed(2);
  };
  return (
    <React.Fragment>
      <Modal
        centered
        show={modalShow4}
        onHide={handleClose4}
        className="modal-custom datamodal"
      >
        <Modal.Header closeButton className="border-0 text-center pt-4">
          <Modal.Title className="mx-auto">
            <b>Data For:</b> {QuoteData?.subquote_number || QuoteNumber}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <h6>Parse Data</h6>
              <p>Linear: {formatToTwoDecimals(QuoteData?.linear)}</p>
              <p>
                Bounding Area: {formatToTwoDecimals(QuoteData?.bounding_area)}
              </p>
              <p>Bounding X: {formatToTwoDecimals(QuoteData?.bounding_x)}</p>
              <p>Bounding Y: {formatToTwoDecimals(QuoteData?.bounding_y)}</p>
              <p>Pierce Count: {QuoteData?.pierce_count}</p>
            </Col>
            <Col md={6}>
              <h6>Part Data</h6>
              <p>Thickness: {formatToTwoDecimals(QuoteData?.thickness)}</p>
              <p>
                Cutting Time:{" "}
                {formatToTwoDecimals(QuoteData?.cutting_time * 60)} secs
              </p>
              <p>Weight: {formatToTwoDecimals(QuoteData?.weight)} pound</p>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default ModalOrderData;
