import React from "react";
import {
    Row,
    Col,
} from 'react-bootstrap';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
export default function PaymentTerms() {

    return (
        <React.Fragment>
            <Row>
                <Col lg={12} xl="auto" className="w-calc-100-258">
                    <div className="resources-body">
                        <div className="resources-heading mb-4">
                            <span>General</span>
                            <h1>Payment Terms</h1>
                        </div>

                        <div className="resources-content mb-4">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                       </div>
                       <hr/>
                        <div className="resources-content mb-4">
                            <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. </p>
                            <ul className="list-unstyled">
                                <li><Icon icon="gg:check-o" /> COD Payment</li>
                                <li><Icon icon="gg:check-o" /> Net 30 Payment</li>
                                <li><Icon icon="gg:check-o" /> Bank Transfer</li>
                                <li><Icon icon="gg:check-o" /> Check</li>
                                <li><Icon icon="gg:check-o" /> ACH Bank Transfer</li>

                            </ul>
                        </div>

                        <div className="resources-pagination d-flex align-items-center justify-content-between">
                            <Link className="pagination-prev" to="/resources/shipping">
                                <span><Icon icon="streamline:next" /></span>
                                Shipping
                            </Link>
                            <Link className="pagination-next" to="/resources/privacy-policy">
                                <span><Icon icon="streamline:next" /></span>
                                    Privacy Policy
                            </Link>
                        </div>
                    </div>
                </Col>
             
            </Row>

        </React.Fragment>
    )
}