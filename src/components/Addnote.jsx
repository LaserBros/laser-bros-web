import React, { useEffect, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";

const AddNote = ({ show3, name, handleClose3, title, onSave }) => {
  const [comment, setComment] = useState("");

  useEffect(() => {
    console.log("Received name prop:", name);
    setComment(name);
  }, [name]);

  const handleNotes = () => {
    if (comment.trim() && onSave) {
      onSave(comment.trim()); // Save the trimmed note when the user submits it
    }
    handleClose3(); // Close the modal after saving
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
              {comment == null ? (
                <>
                  <Form.Control
                    as="textarea"
                    rows="5"
                    placeholder="Write a note"
                    value={""}
                    onChange={(e) => setComment(e.target.value)} // Update state with input
                    style={{ height: "auto" }}
                  />
                </>
              ) : (
                <Form.Control
                  as="textarea"
                  rows="5"
                  placeholder="Write a note"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)} // Update state with input
                  style={{ height: "auto" }}
                />
              )}
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
