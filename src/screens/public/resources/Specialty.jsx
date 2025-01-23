import React from "react";
import {
    Row,
    Col,
} from 'react-bootstrap';
import { Icon } from '@iconify/react';
import DataTable from "react-data-table-component";
import { Link } from 'react-router-dom';
export default function Specialty() {

    const columns = [
        { name: 'Grade', selector: row => row.grade, sortable: false,},
        { name: 'Thickness', selector: row => row.thickness, sortable: false,},
        { name: 'Metric Thickness', selector: row => row.metricthickness, sortable: false, },
        { name: 'Min Part Size', selector: row => row.minpartsize, sortable: false, },
        { name: 'Max Part Size', selector: row => row.maxpartsize, sortable: false, },
        { name: 'Min Feature Size', selector: row => row.minfeaturesize, sortable: false,},
        { name: 'Stocked?', selector: row => row.stocked, sortable: false,},
        { name: 'Bending?', selector: row => row.bending, sortable: false,},
    ]
    // const data = [
    //     { id: 1, grade: 'Custom i.e Titanium, Incolnel, etc', thickness: '0.036(20 gauge)', metricthickness: '0.91', minpartsize: '0.25"x0.25"', maxpartsize: '48"x96"', minfeaturesize: '0.015"', stocked: 'No', bending: 'Depends' },
    //     { id: 2, grade: 'Custom i.e Titanium, Incolnel, etc', thickness: '0.048(18 gauge)', metricthickness: '1.22', minpartsize: '0.25"x0.25"', maxpartsize: '48"x96"', minfeaturesize: '0.02"', stocked: 'No', bending: 'Depends' },
    //     { id: 3, grade: 'Custom i.e Titanium, Incolnel, etc', thickness: '0.063(16 gauge)', metricthickness: '1.60', minpartsize: '0.25"x0.25"', maxpartsize: '48"x96"', minfeaturesize: '0.025"', stocked: 'No', bending: 'Depends' },
    //     { id: 4, grade: 'Custom i.e Titanium, Incolnel, etc', thickness: '0.074(14 gauge)', metricthickness: '1.88', minpartsize: '0.25"x0.25"', maxpartsize: '48"x96"', minfeaturesize: '0.03"', stocked: 'No', bending: 'Depends' },
    //     { id: 5, grade: 'Custom i.e Titanium, Incolnel, etc', thickness: '0.090(13 gauge)', metricthickness: '2.29', minpartsize: '0.25"x0.25"', maxpartsize: '48"x96"', minfeaturesize: '0.04"', stocked: 'No', bending: 'Depends' },
    //     { id: 5, grade: 'Custom i.e Titanium, Incolnel, etc', thickness: '0.100(12 gauge)', metricthickness: '2.54', minpartsize: '0.25"x0.25"', maxpartsize: '48"x96"', minfeaturesize: '0.06"', stocked: 'No', bending: 'Depends' },
    //  ];
    const data = [
        { id: 1, grade: 'Custom: i.e. Titanium, Inconnel, etc.', thickness: '0.036 (20 gauge)', metricthickness: '0.91', minpartsize: '0.25"x0.25"', maxpartsize: '48"x96"', minfeaturesize: '0.015"', stocked: 'No', bending: 'Depends' },
        { id: 2, grade: 'Custom: i.e. Titanium, Inconnel, etc.', thickness: '0.048 (18 gauge)', metricthickness: '1.22', minpartsize: '0.25"x0.25"', maxpartsize: '48"x96"', minfeaturesize: '0.02"', stocked: 'No', bending: 'Depends' },
        { id: 3, grade: 'Custom: i.e. Titanium, Inconnel, etc.', thickness: '0.063 (16 gauge)', metricthickness: '1.60', minpartsize: '0.25"x0.25"', maxpartsize: '48"x96"', minfeaturesize: '0.025"', stocked: 'No', bending: 'Depends' },
        { id: 4, grade: 'Custom: i.e. Titanium, Inconnel, etc.', thickness: '0.074 (14 gauge)', metricthickness: '1.88', minpartsize: '0.25"x0.25"', maxpartsize: '48"x96"', minfeaturesize: '0.03"', stocked: 'No', bending: 'Depends' },
        { id: 5, grade: 'Custom: i.e. Titanium, Inconnel, etc.', thickness: '0.090 (13 gauge)', metricthickness: '2.29', minpartsize: '0.25"x0.25"', maxpartsize: '48"x96"', minfeaturesize: '0.03"', stocked: 'No', bending: 'Depends' },
        { id: 6, grade: 'Custom: i.e. Titanium, Inconnel, etc.', thickness: '0.100 (12 gauge)', metricthickness: '2.54', minpartsize: '0.25"x0.25"', maxpartsize: '48"x96"', minfeaturesize: '0.04"', stocked: 'No', bending: 'Depends' },
        { id: 7, grade: 'Custom: i.e. Titanium, Inconnel, etc.', thickness: '0.120 (11 gauge)', metricthickness: '3.05', minpartsize: '0.25"x0.25"', maxpartsize: '48"x96"', minfeaturesize: '0.06"', stocked: 'No', bending: 'Depends' },
        { id: 8, grade: 'Custom: i.e. Titanium, Inconnel, etc.', thickness: '0.188 (3/16)', metricthickness: '4.78', minpartsize: '0.50"x0.50"', maxpartsize: '48"x96"', minfeaturesize: '0.08"', stocked: 'No', bending: 'Depends' },
        { id: 9, grade: 'Custom: i.e. Titanium, Inconnel, etc.', thickness: '0.25 (1/4)', metricthickness: '6.35', minpartsize: '0.50"x0.50"', maxpartsize: '48"x96"', minfeaturesize: '0.12"', stocked: 'No', bending: 'Depends' }
    ];
    return (
        <React.Fragment>
            <Row>
                <Col lg={12} xl="auto" className="w-calc-100-258">
                    <div className="resources-body">
                        <div className="resources-heading mb-4">
                            <span>Materials</span>
                            <h1>Laser Cut Specialty</h1>
                        </div>

                        <div className="resources-content mb-4" id="specialty">
                            <p>This is for literally anything else that’s “metallic”. We can cut titanium, inconel, high grade aluminum, 4130N steel, you name it. We cut these specialty metals using nitrogen or high pressure air. Similar rules apply to these as the rest of the materials. If you have a special need, let us know!</p>

                            <DataTable
                                columns={columns}
                                data={data}
                                responsive
                                className="custom-table"
                            />
                        </div>
                        
                        <div className="resources-pagination d-flex align-items-center justify-content-between">
                            <Link className="pagination-prev" to="/resources/brass">
                                <span><Icon icon="streamline:next" /></span>
                                Brass
                            </Link>
                            <Link className="pagination-next" to="/resources/faq">
                                <span><Icon icon="streamline:next" /></span>
                                FAQ
                            </Link>
                        </div>
                    </div>
                </Col>
                
            </Row>

        </React.Fragment>
    )
}