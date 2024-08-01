import React, { useState } from "react";
import {
    Form,
    Button,
    Modal,
} from 'react-bootstrap';
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
const AddNote = ({ show3, handleClose3, title }) => {
    const [comment, setComment] = useState('');
    const [notes, setNotes] = useState(true);
    const HandleNotes = () => {
        setNotes(false);
    }
    const HandleShowNotes = () =>{
        setNotes(true); 
    }
    const HandleComment = () => {
        setComment();
    }
    return (
        <React.Fragment>
            <Modal centered show={show3} onHide={handleClose3} className="modal-custom max-width-574">
                <Modal.Header closeButton className="border-0 text-center pt-4">
                    <Modal.Title className="mx-auto">{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="px-lg-5 px-4 pb-4">
                {notes ? (
                    <Form className="accountform">
                    <Form.Group className="mb-5 form-group">
                        <Form.Control as="textarea" rows="5" placeholder="Write a note" value={comment} onChange={HandleComment} style={{height:'auto'}}/>
                    </Form.Group>
                    <div className=" text-center ">
                        <Button as="input" value="Submit" onClick={HandleNotes} className="btn-primary min-width-159 mx-2 mb-2" variant={null} />
                    </div>
                </Form>
                ):(
                   <>
                   <div className="notesmain">
                    <div className="notescont">
                    <p className="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <Link><Icon icon="uiw:delete" /></Link>
               </div>
               <div className="notescont">
                    <p className="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <Link><Icon icon="uiw:delete" /></Link>
               </div>
               </div>
               <div className=" text-center mt-5">
               <Button as="input" value="Add Note"  onClick={HandleShowNotes} className="btn-primary min-width-159 mx-2 mb-2" variant={null} />
               </div>
               </>
                )
                    }
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
}
export default AddNote;