import React , {useState} from "react";
import {
    Card,
    Container,
    Row,
    Col,
    Form,
    Button
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
export default function AddAddress() {
    const [name, setName] = useState('Andrew James');
    const [email, setEmail] = useState('andrewjames@gmail.com');
    const [address1, setAddress1] = useState('indiit solutions');
    const [city, setCity] = useState('New York');
    const [zipcode, setZipcode] = useState('10001');
    const [phoneno, setPhoneno] = useState('9876231221');
    const HandleName = () => {
        setName();
    }
    const HandleEmail = () => {
        setEmail();
    }
    const HandleAddress = () => {
        setAddress1();
    }
    const HandleCity = () => {
        setCity();
    }
    const HandleZipcode = () => {
        setZipcode();
    }
    const HandlePhone = () => {
        setPhoneno();
    }
    return (
        <React.Fragment>
            <section className="myaccount ptb-50">
                <Container>
                    <Card>
                        <Card.Header className="d-flex justify-content-between align-items-center flex-wrap"><h5>Edit Address</h5>  <Link to="/my-addresses" className="btn btn-primary d-inline-flex align-items-center  justify-content-center min-width-18">Back To Addresses</Link></Card.Header>
                        <Card.Body>
                        <Form className="accountform">
                                        <Row>
                                            <Col md={6} lg={4}>
                                                <Form.Group className="mb-3 form-group">
                                                    <Form.Label>Full Name</Form.Label>
                                                    <Form.Control type="text" placeholder="Enter full name" value={name} onChange={HandleName}/>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6} lg={4}>
                                                <Form.Group className="mb-3 form-group">
                                                    <Form.Label>Email Address</Form.Label>
                                                    <Form.Control type="email" placeholder="Enter email address" value={email} onChange={HandleEmail}/>
                                                </Form.Group>
                                            </Col>
                                          
                                            <Col md={6} lg={4}>
                                                <Form.Group className="mb-3 form-group">
                                                    <Form.Label>Country</Form.Label>
                                                    <Form.Select >
                                                    <option disabled selected>Select</option>
                                                    <option value="1" selected>USA</option>
                                                    <option value="2">UK</option>
                                                    <option value="3">Canada</option>
                                                    <option value="4">India</option>
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6} lg={4}>
                                                <Form.Group className="mb-3 form-group">
                                                    <Form.Label>Address Line 1</Form.Label>
                                                    <Form.Control type="text" placeholder="Enter your address" value={address1} onChange={HandleAddress}/>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6} lg={4}>
                                                <Form.Group className="mb-3 form-group">
                                                    <Form.Label>Address Line 2</Form.Label>
                                                    <Form.Control type="text" placeholder="Apt., suite, unit number, etc. (optional)"/>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6} lg={4}>
                                                <Form.Group className="mb-3 form-group">
                                                    <Form.Label>City</Form.Label>
                                                    <Form.Control type="text" placeholder="Enter your city" value={city} onChange={HandleCity}/>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6} lg={4}>
                                                <Form.Group className="mb-3 form-group">
                                                    <Form.Label>State</Form.Label>
                                                    <Form.Select >
                                                    <option disabled selected>Select</option>
                                                    <option value="1">California</option>
                                                    <option value="2" selected>New YorK</option>
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6} lg={4}>
                                                <Form.Group className="mb-3 form-group">
                                                    <Form.Label>Zip Code</Form.Label>
                                                    <Form.Control type="text" placeholder="Enter zip code" value={zipcode} onChange={HandleZipcode}/>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6} lg={4}>
                                                <Form.Group className="mb-3 form-group">
                                                    <Form.Label>Phone No</Form.Label>
                                                    <Form.Control type="tel" placeholder="Enter your phone no" value={phoneno} onChange={HandlePhone}/>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Button type="submit" className="min-width-159 mt-2">Update</Button>
                                    </Form>
                        </Card.Body>
                    </Card>
                   
                </Container>
            </section>
        </React.Fragment>
    )
}