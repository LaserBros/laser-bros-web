import React ,{useState} from "react";
import {
    Form,
    Button,
    Modal,
} from 'react-bootstrap';
const RenamePart = ({ show, handleClose, title }) => {
    const [name, setName] = useState('Cube');
    const HandleName = () => {
        setName();
    }
    return (
        <React.Fragment>
            <Modal centered show={show} onHide={handleClose} className="modal-custom max-width-574">
                <Modal.Header closeButton className="border-0 text-center pt-4">
                    <Modal.Title className="mx-auto">{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="px-lg-5 px-4 pb-4">
                    <Form className="accountform">
                                <Form.Group className="mb-5 form-group">
                                    <Form.Control type="text" placeholder="Enter name" value={name} onChange={HandleName}/>
                                </Form.Group>
                        <div className=" text-center ">
                            <Button as="input" value="Cancel" onClick={handleClose} className="btn-lt-primary min-width-159 mx-2 mb-2" variant={null} />
                            <Button as="input" value="Rename" onClick={handleClose} className="btn-primary min-width-159 mx-2 mb-2" variant={null} />
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
}
export default RenamePart;