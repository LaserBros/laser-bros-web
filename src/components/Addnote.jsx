import React, { useEffect, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";

const AddNote = ({ show3, name, handleClose3, title, onSave }) => {
  const [comment, setComment] = useState("");

  // Update the comment state when the `name` prop changes
  useEffect(() => {
    console.log("Received name prop:", name);
    setComment(name || ""); 
  }, [show3]);

  const handleNotes = () => {
    if (comment.trim() && onSave) {
      onSave(comment.trim());
    }
    handleClose3();
  };

  // console.log("Rendering AddNote. Comment value:", comment); // Debugging: Log the comment value

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
                as="textarea"
                rows="5"
                placeholder="Write a note"
                value={comment || ""} // Ensure value is always a string
                onChange={(e) => {
                  // console.log("Textarea changed:", e.target.value); // Debugging: Log changes
                  setComment(e.target.value);
                }}
                style={{ height: "auto" }}
              />
            </Form.Group>
            <div className="text-center">
              <Button
                as="input"
                value="Submit"
                onClick={handleNotes}
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

export default AddNote;