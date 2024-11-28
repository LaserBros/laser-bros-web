import React, { useEffect, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";

const CommonModal = ({
  show,
  handleClose,
  title,
  btnConfirmTxt,
  btnRejectTxt,
  ConfirmBtnEvent,
  loading,
}) => {
  return (
    <React.Fragment>
      <Modal
        centered
        show={show}
        onHide={handleClose}
        className="modal-custom max-width-574"
      >
        <Modal.Header closeButton className="border-0 text-center pt-4">
          <Modal.Title className="mx-auto">Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-lg-5 px-4 pb-4">
          <div className="tracking-info">
            <h5 className="text-center">{title}</h5>
            <Button className="me-2"
              variant="primary"
              onClick={ConfirmBtnEvent}
              disabled={loading}
            >
              {loading ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                btnConfirmTxt
              )}
            </Button>

            <Button
              variant="outline-primary"
              type="submit"
              onClick={handleClose}
            >
              {btnRejectTxt}
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default CommonModal;
