import React, {useState} from "react";
import {
    Card,
    Container,
    Row,
    Col,
    Button,
    Image
} from 'react-bootstrap';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import visa from '../../assets/img/visa.png';
import AddCard from '../../components/Addcard';
export default function PaymentCards() {
    const [modalShow, setModalShow] = useState(false);
    const handleShow = () => setModalShow(true);
    const handleClose = () => setModalShow(false);
    return (
        <React.Fragment>
            <section className="myaccount ptb-50">
                <Container>
                    <Card>
                        <Card.Header className="d-flex justify-content-between align-items-center flex-wrap gap-2"><h5>Payment Cards</h5>  <Button onClick={handleShow} className="btn btn-primary min-width-159">Add New</Button></Card.Header>
                        <Card.Body>
                            <Row>
                                <Col xl={4} lg={4} md={6} className="mb-4">
                                    <div className="addresses-grid payment-grids">
                                        <Image src={visa} className="img-fluid mb-3" alt=""/>
                                        <p className="mb-2 card-no">* * * *  * * * *  * * * *  3434</p>
                                        <div className="card-actions">
                                        <div className="card-info">
                                            <strong>Expiry Date</strong> 12/24
                                        </div>
                                        <div className="card-info">
                                            <strong>Name</strong> John Doe
                                        </div>
                                    </div>
                                        <div className="btn-bottom">
                                            <Link className="btn-address">
                                             <Icon icon="uiw:delete"/>
                                            </Link>
                                        </div>
                                    </div>
                                </Col>
                                <Col xl={4} lg={4} md={6} className="mb-4">
                                    <div className="addresses-grid payment-grids">
                                        <Image src={visa} className="img-fluid mb-3" alt=""/>
                                        <p className="mb-2 card-no">* * * *  * * * *  * * * *  3434</p>
                                        <div className="card-actions">
                                        <div className="card-info">
                                            <strong>Expiry Date</strong> 12/24
                                        </div>
                                        <div className="card-info">
                                            <strong>Name</strong> John Doe
                                        </div>
                                    </div>
                                        <div className="btn-bottom">
                                            <Link className="btn-address">
                                             <Icon icon="uiw:delete"/>
                                            </Link>
                                        </div>
                                    </div>
                                </Col>
                                <Col xl={4} lg={4} md={6} className="mb-4">
                                    <div className="addresses-grid payment-grids">
                                        <Image src={visa} className="img-fluid mb-3" alt=""/>
                                        <p className="mb-2 card-no">* * * *  * * * *  * * * *  3434</p>
                                        <div className="card-actions">
                                        <div className="card-info">
                                            <strong>Expiry Date</strong> 12/24
                                        </div>
                                        <div className="card-info">
                                            <strong>Name</strong> John Doe
                                        </div>
                                    </div>
                                        <div className="btn-bottom">
                                            <Link className="btn-address">
                                             <Icon icon="uiw:delete"/>
                                            </Link>
                                        </div>
                                    </div>
                                </Col>
                                <Col xl={4} lg={4} md={6} className="mb-4">
                                    <div className="addresses-grid payment-grids">
                                        <Image src={visa} className="img-fluid mb-3" alt=""/>
                                        <p className="mb-2 card-no">* * * *  * * * *  * * * *  3434</p>
                                        <div className="card-actions">
                                        <div className="card-info">
                                            <strong>Expiry Date</strong> 12/24
                                        </div>
                                        <div className="card-info">
                                            <strong>Name</strong> John Doe
                                        </div>
                                    </div>
                                        <div className="btn-bottom">
                                            <Link className="btn-address">
                                             <Icon icon="uiw:delete"/>
                                            </Link>
                                        </div>
                                    </div>
                                </Col>
                                <Col xl={4} lg={4} md={6} className="mb-4">
                                    <div className="addresses-grid payment-grids">
                                        <Image src={visa} className="img-fluid mb-3" alt=""/>
                                        <p className="mb-2 card-no">* * * *  * * * *  * * * *  3434</p>
                                        <div className="card-actions">
                                        <div className="card-info">
                                            <strong>Expiry Date</strong> 12/24
                                        </div>
                                        <div className="card-info">
                                            <strong>Name</strong> John Doe
                                        </div>
                                    </div>
                                        <div className="btn-bottom">
                                            <Link className="btn-address">
                                             <Icon icon="uiw:delete"/>
                                            </Link>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                   
                </Container>
            </section>
            <AddCard
                show={modalShow}
                handleClose={handleClose}
                title="Add Card"
            />
        </React.Fragment>
    )
}