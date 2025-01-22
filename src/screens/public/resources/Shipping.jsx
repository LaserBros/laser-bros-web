import React from "react";
import {
    Row,
    Col,
    Image
} from 'react-bootstrap';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import Map from "../../../assets/img/map.jpg"
import UPS from "../../../assets/img/UPS-Map.png"
import LTL from "../../../assets/img/LTL.png"
export default function Shipping() {

    return (
        <React.Fragment>
            <Row>
                {/* <Col lg={12} xl="auto" className="w-calc-100-258"> */}
                <Col lg={12} xl={12}>
                    <div className="resources-body">
                        <div className="resources-heading mb-4">
                            <span>General</span>
                            <h1>Shipping</h1>
                        </div>

                        <div className="resources-content mb-4" id="faq1">
                            <p>All of our orders ship via UPS ground or LTL freight. You can also select local pickup if you’d rather pick up your parts from our facility in Graham, NC.</p>
                            <p><b>Our shop address for local pickup: </b></p>
                            <p>909 E. Elm St. <br />
                            Suite 102 <br />
                            Graham, NC 27253</p>
                       </div>
                        <div className="resources-content mb-4" id="faq2">
                            <h2>Here’s a map of UPS ground delivery times</h2>
                            <div className="map-resources">
                                <Image src={UPS} className="img-fluid" alt=""/>
                            </div>
                        </div>
                        <div className="resources-content mb-4" id="faq3">
                            <h2>Here’s a map of LTL shipping delivery times</h2>
                            <div className="map-resources">
                                <Image src={LTL} className="img-fluid" alt=""/>
                            </div>
                        </div>

                        <div className="resources-pagination d-flex align-items-center justify-content-between">
                            <Link className="pagination-prev" to="/resources/faq">
                                <span><Icon icon="streamline:next" /></span>
                                FAQ
                            </Link>
                            <Link className="pagination-next" to="/resources/payment-terms">
                                <span><Icon icon="streamline:next" /></span>
                                Payment Terms
                            </Link>
                        </div>
                    </div>
                </Col>

            </Row>

        </React.Fragment>
    )
}