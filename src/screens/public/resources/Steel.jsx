import React from "react";
import {
    Row,
    Col,
} from 'react-bootstrap';
import { Icon } from '@iconify/react';
import DataTable from "react-data-table-component";
import { Link } from 'react-router-dom';
export default function Steel() {


    const columns = [
        { name: 'Grade', selector: row => row.grade, sortable: false,},
        { name: 'Thickness', selector: row => row.thickness, sortable: false,},
        { name: 'Metric Thickness', selector: row => row.metricthickness, sortable: false,},
        { name: 'Min Part Size', selector: row => row.minpartsize, sortable: false,},
        { name: 'Max Part Size', selector: row => row.maxpartsize, sortable: false, },
        { name: 'Min Feature Size', selector: row => row.minfeaturesize, sortable: false,},
        { name: 'Stocked?', selector: row => row.stocked, sortable: false, },
        { name: 'Bending?', selector: row => row.bending, sortable: false,},
    ]
    const columns2 = [
        { name: 'Grade', selector: row => row.grade, sortable: false,},
        { name: 'Thickness', selector: row => row.thickness, sortable: false,},
        { name: 'Metric Thickness', selector: row => row.metricthickness, sortable: false,},
        { name: 'Min Part Size', selector: row => row.minpartsize, sortable: false,},
        { name: 'Max Part Size', selector: row => row.maxpartsize, sortable: false,},
        { name: 'Min Feature Size', selector: row => row.minfeaturesize, sortable: false,},
        { name: 'Stocked?', selector: row => row.stocked, sortable: false,},
        { name: 'Bending?', selector: row => row.bending, sortable: false,},
    ]

    const data = [
        { id: 1, grade: '1008 Steel', thickness: '0.036(20 gauge)', metricthickness: '0.91', minpartsize: '0.25"x0.25"', maxpartsize: '48"x96"', minfeaturesize: '0.015"', stocked: 'Yes', bending: 'Yes' },
        { id: 2, grade: '1008 Steel', thickness: '0.048(18 gauge)', metricthickness: '1.22', minpartsize: '0.25"x0.25"', maxpartsize: '48"x96"', minfeaturesize: '0.02"', stocked: 'Yes', bending: 'Yes' },
        { id: 3, grade: '1008 Steel', thickness: '0.063(16 gauge)', metricthickness: '1.60', minpartsize: '0.25"x0.25"', maxpartsize: '48"x96"', minfeaturesize: '0.025"', stocked: 'Yes', bending: 'Yes' },
        { id: 4, grade: '1008 Steel', thickness: '0.074(14 gauge)', metricthickness: '1.88', minpartsize: '0.25"x0.25"', maxpartsize: '48"x96"', minfeaturesize: '0.03"', stocked: 'Yes', bending: 'Yes' },
        { id: 5, grade: '1008 Steel', thickness: '0.090(13 gauge)', metricthickness: '2.29', minpartsize: '0.25"x0.25"', maxpartsize: '48"x96"', minfeaturesize: '0.04"', stocked: 'Yes', bending: 'Yes(limited)' },
        { id: 6, grade: '1008 Steel', thickness: '0.100(12 gauge)', metricthickness: '2.54', minpartsize: '0.25"x0.25"', maxpartsize: '48"x96"', minfeaturesize: '0.06"', stocked: 'Yes', bending: 'Yes' },
    ];
    const data2 = [
        { id: 1, grade: 'A36 Steel', thickness: '0.625(5/8)', metricthickness: '15.88', minpartsize: '2"x2"', maxpartsize: '48"x96"', minfeaturesize: '0.50"', stocked: 'No', bending: 'No' },
        { id: 2, grade: 'A36 Steel', thickness: '0.75(3/4)', metricthickness: '19.05', minpartsize: '2"x2"', maxpartsize: '48"x96"', minfeaturesize: '0.50"', stocked: 'No', bending: 'No' },
        { id: 3, grade: 'A36 Steel', thickness: '1.00(1)', metricthickness: '25.40', minpartsize: '2"x2"', maxpartsize: '48"x96"', minfeaturesize: '0.625"', stocked: 'No', bending: 'No' },
   ];

    return (
        <React.Fragment>
            <Row>
                {/* <Col lg={12} xl="auto" className="w-calc-100-258"> */}
                <Col lg={12} xl={12} >
                    <div className="resources-body">
                        <div className="resources-heading mb-4">
                            <span>Materials</span>
                            <h1>Laser Cut Steel</h1>
                        </div>

                        <div className="resources-content mb-4" id="steel1">
                            <h2>Steel 1008</h2>
                            <p>Low carbon steel is great for general fabrication. This material is formable & easy to weld. All of our materials are either cold rolled (CRS) or Hot Rolled Pickled & Oiled (HRPO), this means there’s no mill scale to grind through or prep in order to weld! Steel is not corrosion resistant and will require coatings in order to keep it from rusting</p>

                            <DataTable
                                columns={columns}
                                data={data}
                                responsive
                                className="custom-table"
                            />
                        </div>
                        <div className="resources-content mb-4" id="steel2">
                            <h2>Steel A36</h2>
                            <p>A36 is a common structural steel alloy. The material is formable and weldable. These plates are hot rolled so they will have a thick mill scale on both sides. This would require prep prior to welding or coating. Steel is not corrosion resistant and will require coatings in order to keep it from rusting!</p>

                            <DataTable
                                columns={columns2}
                                data={data2}
                                responsive
                                className="custom-table"
                            />
                        </div>
                        <div className="resources-pagination d-flex align-items-center justify-content-between">
                            <Link className="pagination-prev" to="/resources/laser-cutting">
                                <span><Icon icon="streamline:next" /></span>
                               Bending
                            </Link>
                            <Link className="pagination-next" to="/resources/aluminum">
                                <span><Icon icon="streamline:next" /></span>
                                Aluminum
                            </Link>
                        </div>
                    </div>
                </Col>
                {/* <Col lg={12} xl="auto" className="d-none d-xl-block width-258">
                    <div className="resources-right">
                        <h2>Table of Contents</h2>
                        <a href="#steel1">Steel 1008</a>
                        <a href="#steel2">Steel A36</a>
                    </div>
                </Col> */}
            </Row>

        </React.Fragment>
    )
}