import React, { useEffect, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";

const AddQty = ({ show3, handleClose3, title, quote, price, onSave }) => {
  const [priceValue, setPrice] = useState(price);
  const [error, setError] = useState("");

  // Restrict input to integers only
  const handlePriceChange = (e) => {
    const value = e.target.value;

    // Allow only integer values (no float or special characters)
    if (/^\d*$/.test(value)) {
      setPrice(value);
      setError("");
    } else {
      setError("Quantity must be a whole number");
    }
  };

  useEffect(() => {
    // // console.log("price:", price);
    setPrice(price);
  }, [show3]);

  const handleSave = () => {
    const parsedPrice = parseInt(priceValue, 10);

    if (!String(priceValue).trim()) {
      setError("Price cannot be empty");
      return;
    } else if (isNaN(parsedPrice)) {
      setError("Quantity must be a valid number");
      return;
    } else if (parsedPrice <= 0) {
      setError("Quantity must be greater than zero");
      return;
    }

    // Call onSave with the validated integer value
    onSave(parsedPrice);
    setError("");
    handleClose3();
  };

  return (
    <React.Fragment>
      <Modal
        centered
        show={show3}
        onHide={handleClose3}
        className="modal-custom max-width-574"
      >
        <Modal.Header closeButton className="border-0 text-center pt-4">
          <Modal.Title className="mx-auto">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-lg-5 px-4 pb-4">
          <Form className="accountform">
            <Form.Group className="mb-5 form-group">
              <Form.Control
                type="text"
                placeholder="Enter quantity"
                value={priceValue}
                onChange={handlePriceChange}
                isInvalid={!!error}
              />
              {error && (
                <Form.Control.Feedback type="invalid">
                  {error}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <div className="text-center">
              <Button
                as="input"
                value="Cancel"
                onClick={() => {
                  handleClose3();
                  setError("");
                }}
                className="btn-lt-primary min-width-159 mx-2 mb-2"
                variant={null}
              />
              <Button
                as="input"
                value="Save"
                onClick={handleSave}
                className="btn-primary min-width-159 mx-2 mb-2"
                variant={null}
              />
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default AddQty;
