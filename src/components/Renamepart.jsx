import React, { useEffect, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";

const RenamePart = ({ show, handleClose, title, quote, onSave }) => {
  const [name, setName] = useState(quote);
  const [error, setError] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
    setError(""); // Clear the error when the user starts typing
  };
  useEffect(() => {
    setName(quote); // Sync state with prop if it changes
  }, [quote]);

  const handleSave = () => {
    if (!name.trim()) {
      setError("Name cannot be empty");
      return;
    }
    onSave(name); // Pass the new name back to the parent component
    handleClose(); // Close the modal
  };

  return (
    <React.Fragment>
      <Modal
        centered
        show={show}
        onHide={handleClose}
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
                placeholder="Enter name"
                value={name} // Controlled component
                onChange={handleNameChange} // Ensure this is properly set
                isInvalid={!!error} // Show validation error if exists
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
                onClick={handleClose}
                className="btn-lt-primary min-width-159 mx-2 mb-2"
                variant={null}
              />
              <Button
                as="input"
                value="Rename"
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

export default RenamePart;
