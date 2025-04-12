import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import AddAddressAdmin from "./AddAddressAdmin";

export default function AddAddressModalAdmin({type, show, handleClose ,  setSuccessMessage,SetAddressInfo, setType,OrderId }) {
  return (
    <Modal show={show} onHide={handleClose} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit {setType} Address</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddAddressAdmin typeAPI={type}  handleClose={handleClose} openPop={true} Id={OrderId} setSuccessMessage={setSuccessMessage} AddressInfo={SetAddressInfo} Type={setType} />
      </Modal.Body>
    </Modal>
  );
}
