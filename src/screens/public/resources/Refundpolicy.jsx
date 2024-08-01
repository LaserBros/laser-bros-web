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
                            <span>General</span>
                            <h1>Full Refund</h1>
                        </div>

                        <div className="resources-content mb-4">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. To get started with a refund please email <a href="mailto:info@LaserBros.com">info@LaserBros.com</a></p>
                       </div>
                       </div>
                        <div className="resources-content mb-4" id="refund2">
                            <h2>Partial Refund</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum please don't hesitate to reach out to <a href="mailto:info@LaserBros.com">info@LaserBros.com</a></p>
                        </div>
                        <div className="resources-content mb-4" id="refund3">
                        <h2>Non-refundable</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                       </div>
                        <div className="resources-content mb-4" id="refund4">
                        <h2>Returns</h2>
                        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                       </div>
                        <div className="resources-pagination d-flex align-items-center justify-content-between">
                            <Link className="pagination-prev" to="/resources/privacy-policy">
                                <span><Icon icon="streamline:next" /></span>
                                Privacy Policy
                            </Link>
                            <Link className="pagination-next" to="/resources/terms-service">
                                <span><Icon icon="streamline:next" /></span>
                                Terms Of Service
                            </Link>
                        </div>
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