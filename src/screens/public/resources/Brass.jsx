import React from "react";
import {
    Row,
    Col,
} from 'react-bootstrap';
import { Icon } from '@iconify/react';
import DataTable from "react-data-table-component";
import { Link } from 'react-router-dom';
export default function Brass() {

    const columns = [
        { name: 'Grade', selector: row => row.grade, sortable: false,},
        { name: 'Thickness', selector: row => row.thickness, sortable: false, },
        { name: 'Metric Thickness', selector: row => row.metricthickness, sortable: false},
        { name: 'Min Part Size', selector: row => row.minpartsize, sortable: false,},
        { name: 'Max Part Size', selector: row => row.maxpartsize, sortable: false,},
        { name: 'Min Feature Size', selector: row => row.minfeaturesize, sortable: false,},
        { name: 'Stocked?', selector: row => row.stocked, sortable: false,},
        { name: 'Bending?', selector: row => row.bending, sortable: false,},
    ]
    // const data = [
    //     { id: 1, grade: 'Brass 260', thickness: '0.04', metricthickness: '1.02', minpartsize: '0.25"x0.25"', maxpartsize: '48"x96"', minfeaturesize: '0.02"', stocked: 'Yes(limited)', bending: 'No' },
    //     { id: 2, grade: 'Brass 260', thickness: '0.063', metricthickness: '1.60', minpartsize: '0.25"x0.25"', maxpartsize: '48"x96"', minfeaturesize: '0.03"', stocked: 'No', bending: 'Yes' },
    //     { id: 3, grade: 'Brass 260', thickness: '0.093', metricthickness: '2.36', minpartsize: '0.25"x0.25"', maxpartsize: '48"x96"', minfeaturesize: '0.045"', stocked: 'Yes(limited)', bending: 'Yes' },
    //     { id: 4, grade: 'Brass 260', thickness: '0.125', metricthickness: '3.18', minpartsize: '0.25"x0.25"', maxpartsize: '48"x96"', minfeaturesize: '0.053"', stocked: 'No', bending: 'Yes(limited)' },
    //     { id: 5, grade: 'Brass 260', thickness: '0.19', metricthickness: '4.83', minpartsize: '0.25"x0.25"', maxpartsize: '48"x96"', minfeaturesize: '0.06"', stocked: 'No', bending: 'No' },
    //  ];
    const data = [
        { id: 1, grade: 'Brass 260', thickness: '0.04', metricthickness: '1.02', minpartsize: '0.25"x0.25"', maxpartsize: '48"x96"', minfeaturesize: '0.02"', stocked: 'Yes (limited)', bending: 'No' },
        { id: 2, grade: 'Brass 260', thickness: '0.063', metricthickness: '1.60', minpartsize: '0.25"x0.25"', maxpartsize: '48"x96"', minfeaturesize: '0.03"', stocked: 'No', bending: 'No' },
        { id: 3, grade: 'Brass 260', thickness: '0.093', metricthickness: '2.36', minpartsize: '0.25"x0.25"', maxpartsize: '48"x96"', minfeaturesize: '0.045"', stocked: 'Yes (limited)', bending: 'No' },
        { id: 4, grade: 'Brass 260', thickness: '0.125', metricthickness: '3.18', minpartsize: '0.25"x0.25"', maxpartsize: '48"x96"', minfeaturesize: '0.05"', stocked: 'No', bending: 'No' },
        { id: 5, grade: 'Brass 260', thickness: '0.188', metricthickness: '4.78', minpartsize: '0.25"x0.25"', maxpartsize: '48"x96"', minfeaturesize: '0.06"', stocked: 'No', bending: 'No' }
    ];
    return (
        <React.Fragment>
            <Row>
                {/* <Col lg={12} xl="auto" className="w-calc-100-258"> */}
                <Col lg={12} xl={12} >
                    <div className="resources-body">
                        <div className="resources-heading mb-4">
                            <span>Materials</span>
                            <h1>Laser Cut Brass</h1>
                        </div>

                        <div className="resources-content mb-4" id="brass1">
                            <h2>Brass 260</h2>
                            <p>Brass 260 is a good general purpose brass. It’s great for decorative applications, and is easily cut, bent, & machined. This brass typically comes in a mill finish, but mirror polish is also an option.</p>

                            <DataTable
                                columns={columns}
                                data={data}
                                responsive
                                className="custom-table"
                            />
                        </div>
                        
                        <div className="resources-pagination d-flex align-items-center justify-content-between">
                            <Link className="pagination-prev" to="/resources/stainless-steel">
                                <span><Icon icon="streamline:next" /></span>
                                Stainless Steel
                            </Link>
                            <Link className="pagination-next" to="/resources/specialty">
                                <span><Icon icon="streamline:next" /></span>
                                Specialty
                            </Link>
                        </div>
                    </div>
                </Col>
                {/* <Col lg={12} xl="auto" className="d-none d-xl-block width-258">
                    <div className="resources-right">
                        <h2>Table of Contents</h2>
                        <a href="#brass1">Brass 260</a>
                    </div>
                </Col> */}
            </Row>

        </React.Fragment>
    )
}