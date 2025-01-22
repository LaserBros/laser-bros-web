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
                            <p className="mt-3"><b>Payments:</b></p>
                        </div>

                        <div className="resources-content mb-4">
                            <p>Laser Bros accepts payments by credit card or ACH Bank Transfer.</p>
                            <p>For pre-qualified customers we offer NET-30 payment terms. <br/>
                            In order to get approved for NET terms you will need to reach out to us by email: <a href="mailto:info@LaserBros.com">info@LaserBros.com</a><br/>
                            We have the following requirements for NET terms:</p>
                       </div>
                       <ul className="resources-content">
                        <li>Established business (2-years or older)</li>
                        <li>Estimated monthly purchase amounts of $5,000 or more </li>
                        <li>Have an established purchasing history with Laser Bros (5+ orders)</li>

                       </ul>
                       
                        <div className="resources-heading mb-1 mt-5">
                            <p><b>Sales Tax:</b></p>
                        </div>
                        <div className="resources-content mb-4">
                        <p className="mt-2">Sales tax will be collected on all orders. <br />
                            if you are tax exempt please reach out to us with your tax exempt certificate. You will be required to
                            provide an updated tax exempt certificate once a year. Please send them to <a href="mailto:info@LaserBros.com">info@LaserBros.com</a> </p>
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