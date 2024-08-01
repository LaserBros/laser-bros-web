import React from "react";
import {
    Form,
    Row,
    Col,
    Button,
    Modal
} from 'react-bootstrap';
const ChangePassword = ({ show, handleClose, title }) => {


    return (
        <React.Fragment>
            <Modal centered show={show} onHide={handleClose} className="modal-custom max-width-574">
                <Modal.Header closeButton className="border-0 text-center pt-4">
                    <Modal.Title className="mx-auto">{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="px-lg-5 px-4 pb-4">
                    <Form className="accountform">
                        <Row>
                            <Col md={12}>
                                <Form.Group className="mb-3 form-group">
                                    <Form.Label>Current Password</Form.Label>
                                    <Form.Control type="password" placeholder="Enter password" />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3 form-group">
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control type="password" placeholder="Enter password" />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3 form-group">
                                    <Form.Label>Confirm New Password</Form.Label>
                                    <Form.Control type="password" placeholder="Enter password" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <div className=" text-center mt-3">
                            <Button as="input" value="Cancel" onClick={handleClose} className="btn-outline-primary min-width-159 mx-2 mb-2" variant={null} />
                            <Button as="input" value="Update" onClick={handleClose} className="btn-primary min-width-159 mx-2 mb-2" variant={null} />
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
}
export default ChangePassword;