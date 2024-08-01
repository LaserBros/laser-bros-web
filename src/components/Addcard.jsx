import React from "react";
import {
    Form,
    Row,
    Col,
    Button,
    Modal,
    Image
} from 'react-bootstrap';
import cards from "../assets/img/cards.png";
import cvv from "../assets/img/cvv.png";
const AddCard = ({ show, handleClose, title }) => {
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
                                    <Form.Label className="d-flex align-items-center justify-content-between">Card Number <Image src={cards} className="img-fluid" alt=""/></Form.Label>
                                    <Form.Control type="text" placeholder="Enter your card number"/>
                                </Form.Group>
                            </Col>
                            <Col md={12}>
                                <Form.Group className="mb-3 form-group">
                                    <Form.Label>Card Holder Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter your name"/>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3 form-group">
                                    <Form.Label>Expiration</Form.Label>
                                    <Form.Control type="date" placeholder="MM/YY"/>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3 form-group">
                                    <Form.Label className="d-flex align-items-center justify-content-between">CVV <Image src={cvv} className="img-fluid" alt=""/></Form.Label>
                                    <Form.Control type="text" placeholder="Enter your cvv"/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <div className=" text-center mt-3">
                            <Button as="input" value="Cancel" onClick={handleClose} className="btn-lt-primary min-width-159 mx-2 mb-2" variant={null} />
                            <Button as="input" value="Save" onClick={handleClose} className="btn-primary min-width-159 mx-2 mb-2" variant={null} />
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
}
export default AddCard;