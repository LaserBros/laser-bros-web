import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import AddAddress from "./Addaddress";

export default function AddAddressModal({ show, handleClose ,  setSuccessMessage,userId }) {
  return (
    <Modal show={show} onHide={handleClose} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Address</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddAddress  handleClose={handleClose} openPop={true} setSuccessMessage={setSuccessMessage} userId={userId} />
      </Modal.Body>
    </Modal>
  );
}
