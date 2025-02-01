import React from "react";
import { Modal } from "react-bootstrap";
import paymentdone from "../../assets/img/paymentdone.svg";
import check_box from '../../assets/img/check_box.png';
const PaymentDone = ({ show, handleClose }) => {
  return (
    <React.Fragment>
    <Modal show={show} onHide={handleClose} size="lg" centered className="reset-success">
        <Modal.Body className="px-lg-5 px-4 pb-4">
            <img src={check_box} className="img-fluid mb-4" alt="" style={{width:'50%'}} /> 
            <h2>Payment Done!</h2>
            <p className="mb-3">You'll receive an email shortly confirming your order.</p>
        </Modal.Body>
    </Modal>
</React.Fragment> 
  );
};
export default PaymentDone;
