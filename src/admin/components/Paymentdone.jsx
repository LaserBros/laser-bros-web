import React from "react";
import { Modal } from "react-bootstrap";
import paymentdone from "../../assets/img/paymentdone.svg";
const PaymentDone = ({ show, handleClose }) => {
  return (
    <React.Fragment>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        className="reset-success"
      >
        <Modal.Body className="px-lg-5 px-4 pb-4">
          <img src={paymentdone} className="img-fluid mb-4" alt="" />
          <h2>Payment Done!</h2>
          <p className="mb-3">
            Your payment is successfully done. You can now proceed further.
          </p>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};
export default PaymentDone;
