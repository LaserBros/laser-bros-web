import React, { useEffect, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";

const RejectReason = ({ show3, name, handleClose3, title, onSave }) => {
  const [reason, setReason] = useState("");
  const [error, setError] = useState(null);

  // Update the reason state when the `name` prop changes
  useEffect(() => {
    console.log("Received name prop:", name);
    setReason(name || "");
    setError(null); // Reset error when modal opens
  }, [show3, name]);

  const handleNotes = () => {
    if (!reason.trim()) {
      setError("Reject reason is required.");
      return;
    }

    if (reason.trim().length < 10) {
      setError("Reject reason must be at least 10 characters long.");
      return;
    }

    if (onSave) {
      onSave(reason.trim());
    }
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
            <Form.Group className="mb-3 form-group">
              <Form.Control
                as="textarea"
                rows="5"
                placeholder="Write a reason"
                value={reason}
                onChange={(e) => {
                  setReason(e.target.value);
                  setError(null);
                }}
                style={{ height: "auto" }}
                isInvalid={!!error}
              />
              {error && (
                <Form.Control.Feedback type="invalid">
                  {error}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <small className="text-center d-block mb-3"><i>Reason for reject will be visible to the customer!</i></small>
            <div className="text-center">
              <Button
                as="input"
                value="Save and continue"
                onClick={handleNotes}
                className="btn-primary min-width-200 mx-2 mb-2"
                variant={null}
              />
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default RejectReason;
