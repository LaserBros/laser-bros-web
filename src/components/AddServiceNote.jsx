import React, { useEffect, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";

const AddServiceNote = ({ show3, name, handleClose3, title, onSave }) => {
  return (
    <React.Fragment>
      <Modal
        centered
        show={show3}
        onHide={handleClose3}
        className="modal-custom max-width-574 modal_header_blocking"
      >
        <Modal.Header closeButton className="border-0 text-center pt-4">
          {/* <Modal.Title className="mx-auto">wswssw</Modal.Title> */}
        </Modal.Header> 

        <Modal.Body className="px-lg-5 px-4">
          <p style={{textAlign:'center',marginBottom:'0px'}}>Please Sign In or Sign Up to add services!</p>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default AddServiceNote;
