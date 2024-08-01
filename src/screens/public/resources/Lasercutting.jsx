import React from "react";
import {
    Row,
    Col,
} from 'react-bootstrap';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
export default function LaserCutting() {
    return (
        <React.Fragment>
            <Row>
                {/* <Col lg={12} xl="auto" className="w-calc-100-258"> */}
                <Col lg={12} xl={12} >
                    <div className="resources-body">
                        <div className="resources-heading mb-4">
                            <span>Guidelines</span>
                            <h1>Laser Cutting Guidelines</h1>
                        </div>
                        <div className="resources-content mb-4" id="lasercutting1">
                            <h2>What is CNC Fiber Laser Cutting?</h2>
                            <p className="mb-0">CNC Fiber Laser Cutting is a process that uses a powerful laser, controlled by a computer (CNC stands for Computer Numerical Control), to cut or mark materials with high precision. The fiber laser produces a concentrated beam that can precisely cut various metals.</p>
                        </div>
                        <div className="resources-content mb-4" id="lasercutting2">
                            <h2>Key Benefits</h2>
                            <ul className="list-unstyled">
                                <li><Icon icon="gg:check-o" /><b>High Precision:</b> Achieves detailed designs with exact cuts.</li>
                                <li><Icon icon="gg:check-o" /><b>Speed:</b> Faster than many traditional cutting methods.</li>
                                <li><Icon icon="gg:check-o" /><b>Versatility:</b> Can cut a wide range of materials</li>
                                <li><Icon icon="gg:check-o" /><b>Cost-Effective:</b> Minimizes waste and requires less maintenance.</li>
                                <li><Icon icon="gg:check-o" /><b>Clean Edges:</b> Produces smooth cuts, reducing the need for further finishing.</li>

                            </ul>
                        </div>
                        <div className="resources-content mb-4" id="lasercutting3">
                            <h2>Kerf</h2>
                            <p>In laser cutting, "kerf" refers to the width of the material removed by the laser beam as it cuts. This is important for the accuracy of the part. The kerf varies based on the material that’s being cut and the gas being used.</p>
                            <div className="resources-alerts">
                                <p className="mb-0"> <Icon icon="octicon:alert-16" /> <span>Note :</span> You do NOT have to account for kerf. We do that for you before cutting! </p>
                            </div>
                        </div>
                        <div className="resources-content mb-4" id="lasercutting4">
                            <h2>Taper</h2>
                            <p className="mb-0">In laser cutting, "taper" refers to the slight angle formed on the edges of the cut material. This typically starts to happen on thicker materials. You can typically expect 0.001" taper for every 0.1" in material thickness.</p>
                        </div>
                        <div className="resources-content mb-4" id="lasercutting5">
                            <h2>Surface Finish</h2>
                            <p className="mb-0">Surface finish varies by material. But, you can expect a smooth, clean surface finish with minimal burrs and heat-affected zones (HAZ). We typically post-process our parts to eliminate the work you have to do!</p>
                        </div>
                        <div className="resources-pagination d-flex align-items-center justify-content-end">
                         <Link className="pagination-next" to="/resources/bending">
                           <span><Icon icon="streamline:next"/></span>
                           Bending
                         </Link>
                        </div>
                    </div>
                </Col>
                {/* <Col lg={12} xl="auto" className="d-none d-xl-block width-258">
                    <div className="resources-right">
                        <h2>Table of Contents</h2>
                        <a href="#lasercutting1">What is CNC Fiber Laser Cutting?</a>
                        <a href="#lasercutting2">Key Benefits</a>
                        <a href="#lasercutting3">Kerf</a>
                        <a href="#lasercutting4">Taper</a>
                        <a href="#lasercutting5">Surface Finish</a>
                    </div>
                </Col> */}
            </Row>
        </React.Fragment>
    )
}