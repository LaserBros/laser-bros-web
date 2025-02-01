import React from "react";
import {
    Row,
    Col,
} from 'react-bootstrap';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
export default function RefundPolicy() {
    return (
        <React.Fragment>
            <Row>
                {/* <Col lg={12} xl="auto" className="w-calc-100-258"> */}
                <Col lg={12} xl={12} >
                    <div className="resources-body">
                        <div  id="refund1">
                        <div className="resources-heading mb-4">
                            <h1>Refund Policy</h1>
                        </div>

                        <div className="resources-content mb-4">
                            <p>If you are not 100% satisfied with your parts please email: <a href="mailto:info@LaserBros.com">info@LaserBros.com</a> or Call: 919-495-2902 so we can work towards a solution! </p>
                       </div>
                       </div>
                        <div className="resources-content mb-4" id="refund2">
                            <h2>Cancel and Refund Order</h2>
                            <p>For order that have been placed but not cut, processed, or shipped, we can offer a cancelation and full refund of the order. If you need to cancel and refund an order please email: <a href="mailto:info@LaserBros.com">info@LaserBros.com</a> or Call: 919-495-2902 (Please reference your order number)</p>
                        </div>
                        <div className="resources-content mb-4" id="refund3">
                        <h2>Partial Refund (if applicable)</h2>
                        <p>For the follow reasons we can offer a partial refund. We may request pictures of damage or imperfections prior to a refund. </p>
                       </div>
                        <ul className="resources-content">
                            <li>Deep surface imperfections (on raw material)</li>
                            <li>Damage from handling during shipping</li>
                            <li>Parts processed on the wrong material grade/thickness</li>
                        </ul>
                    </div>
                </Col>
                {/* <Col lg={12} xl="auto" className="d-none d-xl-block width-258">
                    <div className="resources-right">
                        <h2>Table of Contents</h2>
                        <a href="#refund1">Full Refund</a>
                        <a href="#refund2">Partial Refund</a>
                        <a href="#refund3">Non-refundable</a>
                        <a href="#refund4">Returns</a>
                    </div>
                </Col> */}
            </Row>

        </React.Fragment>
    )
}