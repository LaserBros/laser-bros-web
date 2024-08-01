import React, {useState} from "react";
import {
    Card,
    Container,
    Row,
    Col,
    Image,
    Form,
    Button
} from 'react-bootstrap';
import User from "../../assets/img/user-3.jpg"
import { Icon } from '@iconify/react';
export default function MyProfile() {
    const [name, setName] = useState('Andrew James');
    const [companyname, setCompanyname] = useState('LaserBros pvt ltd');
    const [email, setEmail] = useState('andrewjames@gmail.com');
    const [phoneno, setPhoneno] = useState('9874563230');

    const HandleName = () => {
        setName();
    }
    const HandleCompanyName = () => {
        setCompanyname();
    }
    const HandleEmail = () => {
        setEmail();
    }
    const HandlePhone = () => {
        setPhoneno();
    }
    return (
        <React.Fragment>
            <section className="myaccount ptb-50">
                <Container>
                    <Card>
                        <Card.Header><h5>My Profile</h5>  </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col xl={4} md={5}>
                                    <div className="profile_user_main text-center mb-3 ">
                                        <div className="user_info position-relative">
                                            <Image src={User} className="img-fluid rounded-circle" alt="" />
                                            <Form.Label htmlFor="uploadimg"><Icon icon="teenyicons:edit-outline" /></Form.Label>
                                            <Form.Control type="file" id="uploadimg" name="uploadimg" className="d-none" />
                                        </div>
                                        <h4>Andrew James</h4>
                                        <p>andrewjames@gmail.com</p>
                                    </div>
                                </Col>
                                <Col xl={8} md={7}>
                                    <Form className="accountform">
                                        <Row>
                                            <Col md={6}>
                                                <Form.Group className="mb-3 form-group">
                                                    <Form.Label>Full Name</Form.Label>
                                                    <Form.Control type="text" placeholder="Enter full name" value={name} onChange={HandleName}/>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3 form-group">
                                                    <Form.Label>Company Name</Form.Label>
                                                    <Form.Control type="text" placeholder="Enter Company name" value={companyname} onChange={HandleCompanyName}/>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3 form-group">
                                                    <Form.Label>Email Address</Form.Label>
                                                    <Form.Control type="email" placeholder="Enter email address" value={email} onChange={HandleEmail}/>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3 form-group">
                                                    <Form.Label>Phone No</Form.Label>
                                                    <Form.Control type="tel" placeholder="Enter phone no" value={phoneno} onChange={HandlePhone}/>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Button type="submit" className="min-width-159 mt-2">Update</Button>
                                    </Form>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                   
                </Container>
            </section>
        </React.Fragment>
    )
}