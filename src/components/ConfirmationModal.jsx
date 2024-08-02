// ConfirmationModal.js
import React from "react";
import { Modal, Button } from "react-bootstrap";

const ConfirmationModal = ({
  title,
  desc,
  show,
  onHide,
  onConfirm,
  yesBtnText,
  noBtnText,
  message,
  loading,
}) => {
  return (
    <Modal show={show} onHide={onHide} centered className="reset-success">
      <Modal.Body>
        {/* <img src={vector} className="img-fluid mb-4" alt="" /> */}
        <h2>{title}</h2>
        <p className="mb-4">{desc}</p>

        <Button variant="primary" onClick={onConfirm} disabled={loading}>
          {loading ? (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          ) : (
            yesBtnText
          )}
        </Button>

        <Button variant="" type="submit" className="btn ssds" onClick={onHide}>
          {noBtnText}
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmationModal;
