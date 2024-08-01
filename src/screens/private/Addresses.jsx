import React from "react";
import {
    Card,
    Container,
    Row,
    Col,
} from 'react-bootstrap';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
export default function Addresses() {
    return (
        <React.Fragment>
            <section className="myaccount ptb-50">
                <Container>
                    <Card>
                        <Card.Header className="d-flex justify-content-between align-items-center flex-wrap gap-2"><h5>My Addresses</h5>  <Link to="/my-address/add-address" className="btn btn-primary d-inline-flex align-items-center  justify-content-center min-width-159">Add New</Link></Card.Header>
                        <Card.Body>
                            <Row>
                                <Col xl={4} lg={4} md={6} className="mb-4">
                                    <div className="addresses-grid">
                                        <div className="d-flex align-items-center justify-content-between mb-3">
                                           <h2 className="mb-0">Steve James</h2>
                                           <span className="statusdefault">Default</span>
                                        </div>
                                        <p className="mb-2">8980252445</p>
                                        <p className="mb-3">70 Washington Square South, New York, NY 10012, United States</p>
                                        <div className="btn-bottom">
                                            <Link className="btn-address" to="/my-address/edit-address/">
                                             <Icon icon="mynaui:edit"/>
                                            </Link>
                                            <Link className="btn-address">
                                             <Icon icon="uiw:delete"/>
                                            </Link>
                                        </div>
                                    </div>
                                </Col>
                                <Col xl={4} lg={4} md={6}  className="mb-4">
                                    <div className="addresses-grid">
                                    <div className="d-flex align-items-center mb-3">
                                           <h2 className="mb-0">Steve James</h2>
                                        </div>
                                        <p className="mb-2">8980252445</p>
                                        <p className="mb-3">70 Washington Square South, New York, NY 10012, United States</p>
                                        <div className="btn-bottom">
                                            <Link className="btn-address"  to="/my-address/edit-address/">
                                             <Icon icon="mynaui:edit"/>
                                            </Link>
                                            <Link className="btn-address">
                                             <Icon icon="uiw:delete"/>
                                            </Link>
                                            <Link className="btn-set-default">
                                            Set as Default
                                            </Link>
                                        </div>
                                    </div>
                                </Col>
                                <Col xl={4} lg={4} md={6}  className="mb-4">
                                    <div className="addresses-grid">
                                    <div className="d-flex align-items-center mb-3">
                                           <h2 className="mb-0">Steve James</h2>
                                        </div>
                                        <p className="mb-2">8980252445</p>
                                        <p className="mb-3">70 Washington Square South, New York, NY 10012, United States</p>
                                        <div className="btn-bottom">
                                            <Link className="btn-address"  to="/my-address/edit-address/">
                                             <Icon icon="mynaui:edit"/>
                                            </Link>
                                            <Link className="btn-address">
                                             <Icon icon="uiw:delete"/>
                                            </Link>
                                            <Link className="btn-set-default">
                                            Set as Default
                                            </Link>
                                        </div>
                                    </div>
                                </Col>
                                <Col xl={4} lg={4} md={6}  className="mb-4">
                                    <div className="addresses-grid">
                                    <div className="d-flex align-items-center mb-3">
                                           <h2 className="mb-0">Steve James</h2>
                                        </div>
                                        <p className="mb-2">8980252445</p>
                                        <p className="mb-3">70 Washington Square South, New York, NY 10012, United States</p>
                                        <div className="btn-bottom">
                                            <Link className="btn-address"  to="/my-address/edit-address/">
                                             <Icon icon="mynaui:edit"/>
                                            </Link>
                                            <Link className="btn-address">
                                             <Icon icon="uiw:delete"/>
                                            </Link>
                                            <Link className="btn-set-default">
                                            Set as Default
                                            </Link>
                                        </div>
                                    </div>
                                </Col>
                                <Col xl={4} lg={4} md={6}  className="mb-4">
                                    <div className="addresses-grid">
                                        <div className="d-flex align-items-center mb-3">
                                           <h2 className="mb-0">Steve James</h2>
                                        </div>
                                        <p className="mb-2">8980252445</p>
                                        <p className="mb-3">70 Washington Square South, New York, NY 10012, United States</p>
                                        <div className="btn-bottom">
                                            <Link className="btn-address"  to="/my-address/edit-address/">
                                             <Icon icon="mynaui:edit"/>
                                            </Link>
                                            <Link className="btn-address">
                                             <Icon icon="uiw:delete"/>
                                            </Link>
                                            <Link className="btn-set-default">
                                            Set as Default
                                            </Link>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                   
                </Container>
            </section>
        </React.Fragment>
    )
}