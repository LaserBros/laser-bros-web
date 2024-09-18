import React, { useState } from "react";
import {
    Form,
    Button,
    Modal,
} from 'react-bootstrap';
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
const AddNote = ({ show, handleClose, title }) => {
    const [comment, setComment] = useState('');
    const [notes, setNotes] = useState(true);
    const HandleNotes = () => {
        setNotes(true);
    }
    const HandleShowNotes = () => {
        setNotes(false);
    }
    const HandleComment = () => {
        setComment();
    }
    return (
        <React.Fragment>
            <Modal centered show={show} onHide={handleClose} className="modal-custom max-width-574">
                <Modal.Header closeButton className="border-0 text-center pt-4">
                    <Modal.Title className="mx-auto">{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="px-lg-5 px-4 pb-4">
                    {notes ? (
                        <>
                         <div className="notesmain">
                         <div className="notescont">
                             <h4>Customer Notes</h4>
                             <p className="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                             {/* <Link><Icon icon="uiw:delete" /></Link> */}
                         </div>
                         <div className="notescont">
                             <h4>Admin Notes</h4>
                             <p className="mb-0">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.</p>
                             {/* <Link><Icon icon="uiw:delete" /></Link> */}
                         </div>
                         <div className="notescont">
                         <h4>Notes</h4>
                             <p className="mb-0">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>
                          <div className="mt-2 text-end"> <Link><Icon icon="uiw:delete" /></Link></div> 
                         </div>
                         </div>
                         <div className=" text-center mt-5">
                             <Button as="input" value="Add Note" onClick={HandleShowNotes} className="btn-primary min-max-width-159 mx-2 mb-2" variant={null} />
                         </div>
                     </>
                       
                    ) : (
                        <Form>
                            <Form.Group className="mb-5 form-group">
                                <Form.Control as="textarea" rows="5" placeholder="Write a note" value={comment} onChange={HandleComment} style={{ height: 'auto' }}/>
                            </Form.Group>
                            <div className=" text-center ">
                                <Button as="input" value="Submit" onClick={HandleNotes} className="btn-primary min-max-width-159 mx-2 mb-2" variant={null} />
                            </div>
                        </Form>
                    )}
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
}
export default AddNote;