import React from "react";
import {
    Row,
    Col,
} from 'react-bootstrap';
import { Icon } from '@iconify/react';
import DataTable from "react-data-table-component";
import { Link } from 'react-router-dom';
export default function StailessSteel() {

    const columns = [
        { name: 'Grade', selector: row => row.grade, sortable: false,  },
        { name: 'Thickness', selector: row => row.thickness, sortable: false,  },
        { name: 'Metric Thickness', selector: row => row.metricthickness, sortable: false,},
        { name: 'Min Part Size', selector: row => row.minpartsize, sortable: false, },
        { name: 'Max Part Size', selector: row => row.maxpartsize, sortable: false,  },
        { name: 'Min Feature Size', selector: row => row.minfeaturesize, sortable: false, },
        { name: 'Stocked?', selector: row => row.stocked, sortable: false, },
        { name: 'Bending?', selector: row => row.bending, sortable: false, },
    ]
    const columns2 = [
        { name: 'Grade', selector: row => row.grade, sortable: false,},
        { name: 'Thickness', selector: row => row.thickness, sortable: false,  },
        { name: 'Metric Thickness', selector: row => row.metricthickness, sortable: false,  },
        { name: 'Min Part Size', selector: row => row.minpartsize, sortable: false,},
        { name: 'Max Part Size', selector: row => row.maxpartsize, sortable: false,},
        { name: 'Min Feature Size', selector: row => row.minfeaturesize, sortable: false,},
        { name: 'Stocked?', selector: row => row.stocked, sortable: false,},
        { name: 'Bending?', selector: row => row.bending, sortable: false,},
    ]
    const columns3 = [
        { name: 'Grade', selector: row => row.grade, sortable: false,},
        { name: 'Thickness', selector: row => row.thickness, sortable: false,},
        { name: 'Metric Thickness', selector: row => row.metricthickness, sortable: false,},
        { name: 'Min Part Size', selector: row => row.minpartsize, sortable: false,},
        { name: 'Max Part Size', selector: row => row.maxpartsize, sortable: false,},
        { name: 'Min Feature Size', selector: row => row.minfeaturesize, sortable: false,},
        { name: 'Stocked?', selector: row => row.stocked, sortable: false,},
        { name: 'Bending?', selector: row => row.bending, sortable: false, },
    ]

    const data = [
        { id: 1, grade: '304 Stainless (2b)', thickness: '0.036(20 gauge)', metricthickness: '0.91', minpartsize: '0.25"x0.25"', maxpartsize: '48"x96"', minfeaturesize: '0.015"', stocked: 'Yes', bending: 'Yes' },
        { id: 2, grade: '304 Stainless (2b)', thickness: '0.048(18 gauge)', metricthickness: '1.22', minpartsize: '0.25"x0.25"', maxpartsize: '48"x96"', minfeaturesize: '0.02"', stocked: 'Yes', bending: 'Yes' },
        { id: 3, grade: '304 Stainless (2b)', thickness: '0.063(16 gauge)', metricthickness: '1.60', minpartsize: '0.25"x0.25"', maxpartsize: '48"x96"', minfeaturesize: '0.025"', stocked: 'Yes', bending: 'Yes' },
        { id: 4, grade: '304 Stainless (2b)', thickness: '0.074(14 gauge)', metricthickness: '1.88', minpartsize: '0.25"x0.25"', maxpartsize: '48"x96"', minfeaturesize: '0.03"', stocked: 'Yes', bending: 'Yes' },
        { id: 5, grade: '304 Stainless (2b)', thickness: '0.090(13 gauge)', metricthickness: '2.29', minpartsize: '0.25"x0.25"', maxpartsize: '48"x96"', minfeaturesize: '0.04"', stocked: 'Yes', bending: 'Yes' },
        { id: 6, grade: '304 Stainless (2b)', thickness: '0.100(12 gauge)', metricthickness: '2.54', minpartsize: '0.25"x0.25"', maxpartsize: '48"x96"', minfeaturesize: '0.06"', stocked: 'Yes', bending: 'Yes' },
    ];
    const data2 = [
        { id: 1, grade: '304 Stainless (#4)', thickness: '0.048(18 gauge)', metricthickness: '1.22', minpartsize: '1"x1"', maxpartsize: '48"x96"', minfeaturesize: '0.02"', stocked: 'Yes', bending: 'Yes' },
        { id: 2, grade: '304 Stainless (#4)', thickness: '0.063(20 gauge)', metricthickness: '1.60', minpartsize: '1"x1"', maxpartsize: '48"x96"', minfeaturesize: '0.025"', stocked: 'Yes', bending: 'Yes' },
        { id: 3, grade: '304 Stainless (#4)', thickness: '0.063(20 gauge)', metricthickness: '1.88', minpartsize: '1"x1"', maxpartsize: '48"x96"', minfeaturesize: '0.03"', stocked: 'Yes', bending: 'Yes' },
        { id: 4, grade: '304 Stainless (#4)', thickness: '0.063(20 gauge)', metricthickness: '2.54', minpartsize: '1"x1"', maxpartsize: '48"x96"', minfeaturesize: '0.04"', stocked: 'Yes', bending: 'Yes(limited)' },
        { id: 5, grade: '304 Stainless (#4)', thickness: '0.063(20 gauge)', metricthickness: '3.05', minpartsize: '1"x1"', maxpartsize: '48"x96"', minfeaturesize: '0.06"', stocked: 'Yes(limited)', bending: 'Yes' },
    ];
    const data3 = [
        { id: 1, grade: '316 Stainless (2b)', thickness: '0.036(20 gauge)', metricthickness: '0.91', minpartsize: '0.25"x0.25"', maxpartsize: '48"x96"', minfeaturesize: '0.015"', stocked: 'No', bending: 'Yes' },
        { id: 2, grade: '316 Stainless (2b)', thickness: '0.048(18 gauge)', metricthickness: '1.22', minpartsize: '0.25"x0.25"', maxpartsize: '48"x96"', minfeaturesize: '0.02"', stocked: 'No', bending: 'Yes' },
        { id: 3, grade: '316 Stainless (2b)', thickness: '0.063(16 gauge)', metricthickness: '1.60', minpartsize: '0.25"x0.25"', maxpartsize: '48"x96"', minfeaturesize: '0.025"', stocked: 'No', bending: 'Yes' },
        { id: 4, grade: '316 Stainless (2b)', thickness: '0.074(14 gauge)', metricthickness: '1.88', minpartsize: '0.25"x0.25"', maxpartsize: '48"x96"', minfeaturesize: '0.03"', stocked: 'No', bending: 'Yes(limited)' },
        { id: 5, grade: '316 Stainless (2b)', thickness: '0.090(13 gauge)', metricthickness: '2.29', minpartsize: '0.25"x0.25"', maxpartsize: '48"x96"', minfeaturesize: '0.04"', stocked: 'No', bending: 'No' },
        { id: 6, grade: '316 Stainless (2b)', thickness: '0.100(12 gauge)', metricthickness: '2.54', minpartsize: '0.25"x0.25"', maxpartsize: '48"x96"', minfeaturesize: '0.06"', stocked: 'No', bending: 'No' },
    ];

    return (
        <React.Fragment>
            <Row>
                {/* <Col lg={12} xl="auto" className="w-calc-100-258"> */}
                <Col lg={12} xl={12} >
                    <div className="resources-body">
                        <div className="resources-heading mb-4">
                            <span>Materials</span>
                            <h1>Laser Cut Stainless Steel</h1>
                        </div>

                        <div className="resources-content mb-4" id="stainless-steel1">
                            <h2>Stainless 304 (2b)</h2>
                            <p>304 stainless steel has great corrosion resistance. 2B is a mill finish. 2B is honestly tough to keep clean which is why we typically orbital sand this material when finishing. This keeps scratches and imperfections from showing. This material is cut with nitrogen so the edge is oxide free and ready to weld! Stainless steel has good corrosion resistance and doesn’t typically require any coatings (with the exception of hard chemicals and salt water).</p>

                            <DataTable
                                columns={columns}
                                data={data}
                                responsive
                                className="custom-table"
                            />
                        </div>
                        <div className="resources-content mb-4" id="stainless-steel2">
                            <h2>Stainless 304 (#4)</h2>
                            <p>304 stainless steel has great corrosion resistance. #4 is a brushed (linear) finish (similar to appliances). This material typically comes with a protective film in place to keep the sheet from getting scratched or damaged. This material is cut with nitrogen so the edge is oxide free and ready to weld! Stainless steel has good corrosion resistance and doesn’t typically require any coatings (with the exception of hard chemicals and salt water).</p>

                            <DataTable
                                columns={columns2}
                                data={data2}
                                responsive
                                className="custom-table"
                            />
                        </div>
                        <div className="resources-content mb-4" id="stainless-steel3">
                            <h2>Stainless 316 (2b)</h2>
                            <p>316 stainless steel has excellent corrosion resistance (more than 304 grade). 2B is a mill finish. 2B is honestly tough to keep clean which is why we typically orbital sand this material when finishing. This keeps scratches and imperfections from showing. This material is cut with nitrogen so the edge is oxide free and ready to weld! Stainless steel has good corrosion resistance and doesn’t typically require any coatings. The 316 grade is best suited for high purity environments, and exposure to salt water and harsh chemicals.</p>

                            <DataTable
                                columns={columns3}
                                data={data3}
                                responsive
                                className="custom-table"
                            />
                        </div>
                        <div className="resources-pagination d-flex align-items-center justify-content-between">
                            <Link className="pagination-prev" to="/resources/aluminum">
                                <span><Icon icon="streamline:next" /></span>
                                Aluminum
                            </Link>
                            <Link className="pagination-next" to="/resources/brass">
                                <span><Icon icon="streamline:next" /></span>
                                Brass
                            </Link>
                        </div>
                    </div>
                </Col>
                {/* <Col lg={12} xl="auto" className="d-none d-xl-block width-258">
                    <div className="resources-right">
                        <h2>Table of Contents</h2>
                        <a href="#stainless-steel1">Stainless 304 (2b)</a>
                        <a href="#stainless-steel2">Stainless 304 (#4)</a>
                        <a href="#stainless-steel3">Stainless 316 (2b)</a>
                    </div>
                </Col> */}
            </Row>

        </React.Fragment>
    )
}