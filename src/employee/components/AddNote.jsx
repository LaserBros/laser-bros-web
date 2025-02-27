import React, { useEffect, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
const AdminAddNote = ({
  show,
  isEditAdmin,
  onSave,
  customer_note,
  handleDeleteNote,
  admin_note,
  id,
  handleClose,
  title,
}) => {
  const [comment, setComment] = useState("");
  const [notes, setNotes] = useState(true);
  useEffect(() => {
    // console.log("admin_note", admin_note);
  }, []);
  const HandleNotes = () => {
    onSave(comment);
    setComment("");
    setNotes(true);
    handleClose();
  };
  const HandleShowNotes = () => {
    setNotes(false);
  };
  const HandleComment = (e) => {
    setComment(e.target.value);
  };
  return (
    <React.Fragment>
      <Modal
        centered
        show={show}
        onHide={() => {
          handleClose();
          setComment("");
          setNotes(true);
        }}
        className="modal-custom max-width-574"
      >
        <Modal.Header closeButton className="border-0 text-center pt-4">
          <Modal.Title className="mx-auto">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-lg-5 px-4 pb-4">
          {notes ? (
            <>
              <div className="notesmain">
                <div className="notescont">
                  <h4>Customer Notes</h4>
                  {customer_note == null || customer_note == "" ? (
                    <p className="mb-0 text-center">No note found...</p>
                  ) : (
                    <p className="mb-0">{customer_note}</p>
                  )}
                  {/* <Link><Icon icon="uiw:delete" /></Link> */}
                </div>
                {admin_note &&
                  admin_note.filter((note) => note && note.trim() !== "") // Filter out null and empty notes
                    .length > 0 && (
                    <div className="notescont">
                      <h4>Admin Notes</h4>
                      {admin_note.map(
                        (row, index) =>
                          row != null &&
                          row !== "" && (
                            <div key={index}>
                              <p className="mb-0">{row}</p>
                              <hr></hr>
                              {isEditAdmin && (
                                <div className="mt-2 text-end">
                                  <Link
                                    onClick={() => {
                                      handleDeleteNote(index);
                                      setNotes(true);
                                      handleClose();
                                    }}
                                  >
                                    <Icon icon="uiw:delete" />
                                  </Link>
                                </div>
                              )}
                            </div>
                          )
                      )}
                    </div>
                  )}

                {/* <div className="notescont">
                  <h4>Notes</h4>
                  <p className="mb-0">
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
                    odit aut fugit.
                  </p>
                  <div className="mt-2 text-end">
                    {" "}
                    <Link>
                      <Icon icon="uiw:delete" />
                    </Link>
                  </div>
                </div> */}
              </div>
              {isEditAdmin && (
                <div className=" text-center mt-5">
                  <Button
                    as="input"
                    value="Add Note"
                    onClick={HandleShowNotes}
                    className="btn-primary min-max-width-159 mx-2 mb-2"
                    variant={null}
                  />
                </div>
              )}
            </>
          ) : (
            <Form>
              <Form.Group className="mb-5 form-group">
                <Form.Control
                  as="textarea"
                  rows="5"
                  placeholder="Write a note"
                  value={comment}
                  onChange={HandleComment}
                  style={{ height: "auto" }}
                />
              </Form.Group>
              <div className=" text-center ">
                <Button
                  as="input"
                  value="Submit"
                  onClick={HandleNotes}
                  className="btn-primary min-max-width-159 mx-2 mb-2"
                  variant={null}
                />
              </div>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};
export default AdminAddNote;
