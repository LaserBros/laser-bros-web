import React from "react";
import {
    Row,
    Col,
} from 'react-bootstrap';
import { Icon } from '@iconify/react';
import DataTable from "react-data-table-component";
import { Link } from 'react-router-dom';
export default function Aluminum() {


    const columns = [
        { name: 'Grade', selector: row => row.grade, sortable: false,},
        { name: 'Thickness', selector: row => row.thickness, sortable: false,},
        { name: 'Metric Thickness', selector: row => row.metricthickness, sortable: false,},
        { name: 'Min Part Size', selector: row => row.minpartsize, sortable: false,},
        { name: 'Max Part Size', selector: row => row.maxpartsize, sortable: false,},
        { name: 'Min Feature Size', selector: row => row.minfeaturesize, sortable: false},
        { name: 'Stocked?', selector: row => row.stocked, sortable: false,},
        { name: 'Bending?', selector: row => row.bending, sortable: false,},
    ]
    const columns2 = [
        { name: 'Grade', selector: row => row.grade, sortable: false,},
        { name: 'Thickness', selector: row => row.thickness, sortable: false,},
        { name: 'Metric Thickness', selector: row => row.metricthickness, sortable: false,},
        { name: 'Min Part Size', selector: row => row.minpartsize, sortable: false},
        { name: 'Max Part Size', selector: row => row.maxpartsize, sortable: false,},
        { name: 'Min Feature Size', selector: row => row.minfeaturesize, sortable: false,},
        { name: 'Stocked?', selector: row => row.stocked, sortable: false,},
        { name: 'Bending?', selector: row => row.bending, sortable: false,},
    ]

    // const data = [
    //     { id: 1, grade: '5052 Aluminum', thickness: '0.032', metricthickness: '0.81', minpartsize: '0.25"x0.25"', maxpartsize: '48"x96"', minfeaturesize: '0.015"', stocked: 'Yes', bending: 'Yes' },
    //     { id: 2, grade: '5052 Aluminum', thickness: '0.04', metricthickness: '0.81', minpartsize: '0.25"x0.25"', maxpartsize: '48"x96"', minfeaturesize: '0.015"', stocked: 'Yes', bending: 'Yes' },
    //     { id: 3, grade: '5052 Aluminum', thickness: '0.04', metricthickness: '0.81', minpartsize: '0.25"x0.25"', maxpartsize: '48"x96"', minfeaturesize: '0.015"', stocked: 'Yes', bending: 'Yes' },
    //     { id: 4, grade: '5052 Aluminum', thickness: '0.04', metricthickness: '0.81', minpartsize: '0.25"x0.25"', maxpartsize: '48"x96"', minfeaturesize: '0.015"', stocked: 'Yes', bending: 'Yes' },
    //     { id: 5, grade: '5052 Aluminum', thickness: '0.04', metricthickness: '0.81', minpartsize: '0.25"x0.25"', maxpartsize: '48"x96"', minfeaturesize: '0.015"', stocked: 'Yes', bending: 'Yes(limited)' },
    //     { id: 6, grade: '5052 Aluminum', thickness: '0.04', metricthickness: '0.81', minpartsize: '0.25"x0.25"', maxpartsize: '48"x96"', minfeaturesize: '0.015"', stocked: 'Yes', bending: 'No' },
    // ];
    const data = [
        { id: 1, grade: '5052 Aluminum', thickness: '0.032', metricthickness: '0.81', minpartsize: '0.25" x 0.25"', maxpartsize: '48" x 96"', minfeaturesize: '0.015"', stocked: 'yes', bending: 'yes' },
        { id: 2, grade: '5052 Aluminum', thickness: '0.04', metricthickness: '1.02', minpartsize: '0.25" x 0.25"', maxpartsize: '48" x 96"', minfeaturesize: '0.02"', stocked: 'yes', bending: 'yes' },
        { id: 3, grade: '5052 Aluminum', thickness: '0.05', metricthickness: '1.27', minpartsize: '0.25" x 0.25"', maxpartsize: '48" x 96"', minfeaturesize: '0.025"', stocked: 'yes', bending: 'yes' },
        { id: 4, grade: '5052 Aluminum', thickness: '0.063', metricthickness: '1.60', minpartsize: '0.25" x 0.25"', maxpartsize: '48" x 96"', minfeaturesize: '0.03"', stocked: 'yes', bending: 'yes' },
        { id: 5, grade: '5052 Aluminum', thickness: '0.08', metricthickness: '2.03', minpartsize: '0.25" x 0.25"', maxpartsize: '48" x 96"', minfeaturesize: '0.04"', stocked: 'yes', bending: 'yes' },
        { id: 6, grade: '5052 Aluminum', thickness: '0.09', metricthickness: '2.29', minpartsize: '0.25" x 0.25"', maxpartsize: '48" x 96"', minfeaturesize: '0.045"', stocked: 'yes', bending: 'yes' },
        { id: 7, grade: '5052 Aluminum', thickness: '0.1', metricthickness: '2.54', minpartsize: '0.25" x 0.25"', maxpartsize: '48" x 96"', minfeaturesize: '0.05"', stocked: 'yes', bending: 'yes' },
        { id: 8, grade: '5052 Aluminum', thickness: '0.125', metricthickness: '3.18', minpartsize: '0.25" x 0.25"', maxpartsize: '48" x 96"', minfeaturesize: '0.05"', stocked: 'yes', bending: 'yes' },
        { id: 9, grade: '5052 Aluminum', thickness: '0.19', metricthickness: '4.83', minpartsize: '0.25" x 0.25"', maxpartsize: '48" x 96"', minfeaturesize: '0.06"', stocked: 'yes', bending: 'yes' },
        { id: 10, grade: '5052 Aluminum', thickness: '0.25', metricthickness: '6.35', minpartsize: '0.50" x 0.50"', maxpartsize: '48" x 96"', minfeaturesize: '0.100"', stocked: 'yes', bending: 'yes (limited)' },
        { id: 11, grade: '5052 Aluminum', thickness: '0.375', metricthickness: '9.53', minpartsize: '0.50" x 0.50"', maxpartsize: '48" x 96"', minfeaturesize: '0.200"', stocked: 'yes', bending: 'no' },
        { id: 12, grade: '5052 Aluminum', thickness: '0.5', metricthickness: '12.70', minpartsize: '0.50" x 0.50"', maxpartsize: '48" x 96"', minfeaturesize: '0.25"', stocked: 'no', bending: 'no' }
    ];
    // const data2 = [
    //     { id: 1, grade: '6061 Aluminum', thickness: '0.032', metricthickness: '0.81', minpartsize: '2"x2"', maxpartsize: '48"x96"', minfeaturesize: '0.50"', stocked: 'No', bending: 'No' },
    //     { id: 2, grade: '6061 Aluminum', thickness: '0.04', metricthickness: '1.02', minpartsize: '2"x2"', maxpartsize: '48"x96"', minfeaturesize: '0.50"', stocked: 'No', bending: 'No' },
    //     { id: 3, grade: '6061 Aluminum', thickness: '0.04', metricthickness: '1.02', minpartsize: '2"x2"', maxpartsize: '48"x96"', minfeaturesize: '0.625"', stocked: 'Yes(limited)', bending: 'No' },
    //     { id: 3, grade: '6061 Aluminum', thickness: '0.04', metricthickness: '1.02', minpartsize: '2"x2"', maxpartsize: '48"x96"', minfeaturesize: '0.625"', stocked: 'No', bending: 'No' },
    //     { id: 3, grade: '6061 Aluminum', thickness: '0.04', metricthickness: '1.02', minpartsize: '2"x2"', maxpartsize: '48"x96"', minfeaturesize: '0.625"', stocked: 'Yes(limited)', bending: 'No' },
    //     { id: 3, grade: '6061 Aluminum', thickness: '0.04', metricthickness: '1.02', minpartsize: '2"x2"', maxpartsize: '48"x96"', minfeaturesize: '0.625"', stocked: 'No', bending: 'No' },
    // ];
    const data2 = [
        { id: 1, grade: '6061 Aluminum', thickness: '0.032', metricthickness: '0.81', minpartsize: '0.25" x 0.25"', maxpartsize: '48" x 96"', minfeaturesize: '0.015"', stocked: 'no', bending: 'no' },
        { id: 2, grade: '6061 Aluminum', thickness: '0.04', metricthickness: '1.02', minpartsize: '0.25" x 0.25"', maxpartsize: '48" x 96"', minfeaturesize: '0.02"', stocked: 'no', bending: 'no' },
        { id: 3, grade: '6061 Aluminum', thickness: '0.05', metricthickness: '1.27', minpartsize: '0.25" x 0.25"', maxpartsize: '48" x 96"', minfeaturesize: '0.025"', stocked: 'no', bending: 'no' },
        { id: 4, grade: '6061 Aluminum', thickness: '0.063', metricthickness: '1.60', minpartsize: '0.25" x 0.25"', maxpartsize: '48" x 96"', minfeaturesize: '0.03"', stocked: 'yes (limited)', bending: 'no' },
        { id: 5, grade: '6061 Aluminum', thickness: '0.08', metricthickness: '2.03', minpartsize: '0.25" x 0.25"', maxpartsize: '48" x 96"', minfeaturesize: '0.04"', stocked: 'no', bending: 'no' },
        { id: 6, grade: '6061 Aluminum', thickness: '0.09', metricthickness: '2.29', minpartsize: '0.25" x 0.25"', maxpartsize: '48" x 96"', minfeaturesize: '0.045"', stocked: 'yes (limited)', bending: 'no' },
        { id: 7, grade: '6061 Aluminum', thickness: '0.1', metricthickness: '2.54', minpartsize: '0.25" x 0.25"', maxpartsize: '48" x 96"', minfeaturesize: '0.05"', stocked: 'no', bending: 'no' },
        { id: 8, grade: '6061 Aluminum', thickness: '0.125', metricthickness: '3.18', minpartsize: '0.25" x 0.25"', maxpartsize: '48" x 96"', minfeaturesize: '0.05"', stocked: 'yes (limited)', bending: 'no' },
        { id: 9, grade: '6061 Aluminum', thickness: '0.19', metricthickness: '4.83', minpartsize: '0.25" x 0.25"', maxpartsize: '48" x 96"', minfeaturesize: '0.06"', stocked: 'yes (limited)', bending: 'no' },
        { id: 10, grade: '6061 Aluminum', thickness: '0.25', metricthickness: '6.35', minpartsize: '0.50" x 0.50"', maxpartsize: '48" x 96"', minfeaturesize: '0.100"', stocked: 'yes (limited)', bending: 'no' },
        { id: 11, grade: '6061 Aluminum', thickness: '0.375', metricthickness: '9.53', minpartsize: '0.50" x 0.50"', maxpartsize: '48" x 96"', minfeaturesize: '0.200"', stocked: 'no', bending: 'no' },
        { id: 12, grade: '6061 Aluminum', thickness: '0.5', metricthickness: '12.70', minpartsize: '0.50" x 0.50"', maxpartsize: '48" x 96"', minfeaturesize: '0.25"', stocked: 'no', bending: 'no' }
    ];
    return (
        <React.Fragment>
            <Row>
                {/* <Col lg={12} xl="auto" className="w-calc-100-258"> */}
                <Col lg={12} xl={12} >
                    <div className="resources-body">
                        <div className="resources-heading mb-4">
                            <span>Materials</span>
                            <h1>Laser Cut Aluminum</h1>
                        </div>

                        <div className="resources-content mb-4" id="aluminum1">
                            <h2>Aluminum 5052</h2>
                            <p>5052 is a great general purpose grade aluminum. This grade of aluminum is formable, which means it can be bent without any risk of cracking. We Cut our aluminum using high pressure air, leaving a clean cut edge. This aluminum does have corrosion resistance, but coatings are recommended for parts that are exposed to the elements</p>

                            <DataTable
                                columns={columns}
                                data={data}
                                responsive
                                className="custom-table"
                            />
                        </div>
                        <div className="resources-content mb-4" id="aluminum2">
                            <h2>Aluminum 6061</h2>
                            <p>6061 is a high strength aluminum alloy. This grade of aluminum is non-formable, which means it will crack with normal bending techniques. We Cut our aluminum using high pressure air, leaving a clean cut edge. This aluminum does have corrosion resistance, but coatings are recommended for parts that are exposed to the elements.</p>

                            <DataTable
                                columns={columns2}
                                data={data2}
                                responsive
                                className="custom-table"
                            />
                        </div>
                        <div className="resources-pagination d-flex align-items-center justify-content-between">
                            <Link className="pagination-prev" to="/resources/steel">
                                <span><Icon icon="streamline:next" /></span>
                                Steel
                            </Link>
                            <Link className="pagination-next" to="/resources/stainless-steel">
                                <span><Icon icon="streamline:next" /></span>
                                Stainless Steel
                            </Link>
                        </div>
                    </div>
                </Col>
                {/* <Col lg={12} xl="auto" className="d-none d-xl-block width-258">
                    <div className="resources-right">
                        <h2>Table of Contents</h2>
                        <a href="#aluminum1">Aluminum 5052 </a>
                        <a href="#aluminum2">Aluminum 6061</a>
                    </div>
                </Col> */}
            </Row>

        </React.Fragment>
    )
}