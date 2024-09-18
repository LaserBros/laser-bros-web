import React, { useState } from "react";
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Image,
    Button,
    Tab,
    Tabs,
    Form,
} from 'react-bootstrap';
import { Icon } from '@iconify/react';
import Avatar from '../assets/img/Avatar.jpg';
const EditProfile = () => {
    const [key, setKey] = useState('basicinfo');
    const [name, setName] = useState('David Jones');
    const [cname, setCName] = useState('LaserBros pvt ltd');
    const [email, setEmail] = useState('davidjones@gmail.com');
    const [phone, setPhone] = useState('8745632108');
    const HandleName = () => {
        setName();
    }
    const HandleCName = () => {
        setCName();
    }
    const HandleEmail = () => {
        setEmail();
    }
    const HandlePhone = () => {
        setPhone();
    }
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const togglePasswordVisibility1 = () => {
        setShowPassword1(!showPassword1);
    };
    const togglePasswordVisibility2 = () => {
        setShowPassword2(!showPassword2);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <React.Fragment>
            <Card>
                <CardHeader className="py-4">
                    <h5>Edit Profile</h5>
                </CardHeader>
                <CardBody>
                    <Tabs
                        defaultActiveKey="basicinfo"
                        id="uncontrolled-tab-example"
                        className="customtabs mb-2"
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                    >
                        <Tab eventKey="basicinfo" title="Basic Info">
                            <Row>
                                <Col xl={3} lg={4}>
                                    <div className="profileuser  text-center">
                                        <div className="userinfo mx-auto">
                                            <Image src={Avatar} className="img-fluid" alt="" />
                                            <Form.Label htmlFor="uploadimg"><Icon icon="teenyicons:edit-outline" /></Form.Label>
                                            <Form.Control type="file" id="uploadimg" name="uploadimg" className="d-none" />
                                        </div>
                                        <h4>David Jones</h4>
                                        <p>davidjones@gmail.com</p>
                                    </div>
                                </Col>
                                <Col xl={9} lg={8}>
                                    <Form onSubmit={handleSubmit}>
                                        <Row>
                                            <Col lg={6}>
                                                <Form.Group className="mb-3 form-group">
                                                    <Form.Label>Full Name</Form.Label>
                                                    <Form.Control type="text" placeholder="Enter name" value={name} onChange={HandleName} />
                                                </Form.Group>
                                            </Col>
                                            <Col lg={6}>
                                                <Form.Group className="mb-3 form-group">
                                                    <Form.Label>Company Name</Form.Label>
                                                    <Form.Control type="text" placeholder="Enter company name" value={cname} onChange={HandleCName} />
                                                </Form.Group>
                                            </Col>
                                            <Col lg={6}>
                                                <Form.Group className="mb-3 form-group">
                                                    <Form.Label>Email Address</Form.Label>
                                                    <Form.Control type="email" placeholder="Enter email address" value={email} onChange={HandleEmail} />
                                                </Form.Group>
                                            </Col>
                                            <Col lg={6}>
                                                <Form.Group className="mb-3 form-group">
                                                    <Form.Label>Phone No</Form.Label>
                                                    <Form.Control type="tel" placeholder="Enter phone no" value={phone} onChange={HandlePhone} />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Button as="input" type="submit" value="Update" className="btn btn-primary min-width-159 mt-2"/>
                                    </Form>
                                </Col>
                            </Row>
                        </Tab>
                        <Tab eventKey="changepassword" title="Change Password">
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col lg={6}>
                                        <Form.Group className="mb-3 form-group">
                                            <Form.Label>Current Password</Form.Label>
                                            <div className="password-input-group position-relative">
                                                <Form.Control type={showPassword ? "text" : "password"} placeholder="Enter current password" />
                                                <Icon
                                                    icon={showPassword ? 'lucide:eye-off' : 'lucide:eye'}
                                                    onClick={togglePasswordVisibility}
                                                    className="password-toggle-icon"
                                                />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group className="mb-3 form-group">
                                            <Form.Label>New Password</Form.Label>
                                            <div className="password-input-group position-relative">
                                                <Form.Control type={showPassword1 ? "text" : "password"} placeholder="Enter new password" />
                                                <Icon
                                                    icon={showPassword1 ? 'lucide:eye-off' : 'lucide:eye'}
                                                    onClick={togglePasswordVisibility1}
                                                    className="password-toggle-icon"
                                                />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group className="mb-3 form-group">
                                            <Form.Label>Confirm New Password</Form.Label>
                                            <div className="password-input-group position-relative">
                                                <Form.Control type={showPassword2 ? "text" : "password"} placeholder="Enter confirm new password" />
                                                <Icon
                                                    icon={showPassword2 ? 'lucide:eye-off' : 'lucide:eye'}
                                                    onClick={togglePasswordVisibility2}
                                                    className="password-toggle-icon"
                                                />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Button as="input" type="submit" value="Update" className="btn btn-primary min-width-159 mt-2 mb-3"/>
                            </Form>

                        </Tab>
                    </Tabs>
                </CardBody>
            </Card>
        </React.Fragment>
    )
}
export default EditProfile;