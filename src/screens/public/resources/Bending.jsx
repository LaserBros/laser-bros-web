import React, { useState } from "react";
import {
    Row,
    Col,
    Dropdown,
} from 'react-bootstrap';
import { Icon } from '@iconify/react';
import BendingImg from "../../../assets/img/bending-img.png";
import DataTable from "react-data-table-component";
import { Link } from 'react-router-dom';
export default function Bending() {
    const [searchText, setSearchText] = useState('');
    const [visibleColumns, setVisibleColumns] = useState({
        Grade: true,
        'Thickness': true,
        'Min Flange Length': true,
        'Distortion Zone': true,
        'Bend Radius': true,
        'Bend Deduction': true,
        'K-Factor': true,
        'Max Length Of Part': true,
    });

    const toggleColumn = (column) => {
        setVisibleColumns({
            ...visibleColumns,
            [column]: !visibleColumns[column],
        });
    };

    const columns = [
        { name: 'Grade', selector: row => <div className="badgestatus" style={getGradeColor(row.grade)}>{row.grade}</div>, sortable: false, omit: !visibleColumns.Grade,},
        { name: 'Thickness', selector: row => row.thickness, sortable: false, omit: !visibleColumns['Thickness'], },
        { name: 'Min Flange Length', selector: row => row.minflangelength, sortable: false, omit: !visibleColumns['Min Flange Length'], },
        { name: 'Distortion Zone', selector: row => row.distortionzone, sortable: false, omit: !visibleColumns['Distortion Zone'], },
        { name: 'Bend Radius', selector: row => row.bendradius, sortable: false, omit: !visibleColumns['Bend Radius'],},
        { name: 'Bend Deduction', selector: row => row.benddeduction, sortable: false, omit: !visibleColumns['Bend Deduction'], },
        { name: 'K-Factor', selector: row => row.kfactor, sortable: false, omit: !visibleColumns['K-Factor'], },
        { name: 'Max Length Of Part', selector: row => row.maxlength, sortable: false, omit: !visibleColumns['Max Length Of Part'],},
    ].filter(column => !column.omit);

    // const data = [
    //     { id: 1, grade: 'Aluminium', thickness: '0.032', minflangelength: '0.32"', distortionzone: '0.32"', bendradius: '0.032', benddeduction: '-', kfactor: '-', maxlength: '72' },
    //     { id: 2, grade: '', thickness: '0.032', minflangelength: '0.32"', distortionzone: '0.32"', bendradius: '0.032', benddeduction: '-', kfactor: '-', maxlength: '72' },
    //     { id: 3, grade: '', thickness: '0.032', minflangelength: '0.32"', distortionzone: '0.32"', bendradius: '0.032', benddeduction: '-', kfactor: '-', maxlength: '72' },
    //     { id: 4, grade: '', thickness: '0.032', minflangelength: '0.32"', distortionzone: '0.32"', bendradius: '0.032', benddeduction: '-', kfactor: '-', maxlength: '72' },
    //     { id: 5, grade: 'Steel', thickness: '0.036(20 gauge)',minflangelength: '0.32"', distortionzone: '0.32"', bendradius: '0.032', benddeduction: '-', kfactor: '-', maxlength: '72'  },
    //     { id: 6, grade: '', thickness: '0.036(20 gauge)', minflangelength: '0.32"', distortionzone: '0.32"', bendradius: '0.032', benddeduction: '-', kfactor: '-', maxlength: '72'  },
    //     { id: 7, grade: '', thickness: '0.036(20 gauge)', minflangelength: '0.32"', distortionzone: '0.32"', bendradius: '0.032', benddeduction: '-', kfactor: '-', maxlength: '72' },
    //     { id: 8, grade: '', thickness: '0.036(20 gauge)', minflangelength: '0.32"', distortionzone: '0.32"', bendradius: '0.032', benddeduction: '-', kfactor: '-', maxlength: '72'  },
    //     { id: 9, grade: 'Stainless Steel', thickness: '0.036(20 gauge)', minflangelength: '0.32"', distortionzone: '0.32"', bendradius: '0.032', benddeduction: '-', kfactor: '-', maxlength: '72'  },
    //     { id: 10, grade: '', thickness: '0.036(20 gauge)', minflangelength: '0.32"', distortionzone: '0.32"', bendradius: '0.032', benddeduction: '-', kfactor: '-', maxlength: '72'  },
    //     { id: 11, grade: '', thickness: '0.036(20 gauge)', minflangelength: '0.32"', distortionzone: '0.32"', bendradius: '0.032', benddeduction: '-', kfactor: '-', maxlength: '72'  },
    //     { id: 12, grade: '', thickness: '0.036(20 gauge)', minflangelength: '0.32"', distortionzone: '0.32"', bendradius: '0.032', benddeduction: '-', kfactor: '-', maxlength: '72'  },
    // ];
    const data = [
        { id: 1, grade: 'Aluminium', thickness: '0.032', minflangelength: '0.32"', distortionzone: '0.32"', bendradius: '0.032', benddeduction: '0.055"', kfactor: '0.45', maxlength: '72' },
    { id: 2, grade: '', thickness: '0.04', minflangelength: '0.32"', distortionzone: '0.32"', bendradius: '0.032', benddeduction: '0.069"', kfactor: '0.39', maxlength: '72' },
    { id: 3, grade: '', thickness: '0.063', minflangelength: '0.40"', distortionzone: '0.40"', bendradius: '0.032', benddeduction: '0.111"', kfactor: '0.3', maxlength: '72' },
    { id: 4, grade: '', thickness: '0.08', minflangelength: '0.50"', distortionzone: '0.50"', bendradius: '0.032', benddeduction: '0.131"', kfactor: '0.34', maxlength: '72' },
    { id: 5, grade: '', thickness: '0.09', minflangelength: '0.50"', distortionzone: '0.50"', bendradius: '0.032', benddeduction: '0.145"', kfactor: '0.34', maxlength: '72' },
    { id: 6, grade: '', thickness: '0.1', minflangelength: '0.50"', distortionzone: '0.50"', bendradius: '0.032', benddeduction: '0.164"', kfactor: '0.315', maxlength: '72' },
    { id: 7, grade: '', thickness: '0.125', minflangelength: '0.60"', distortionzone: '0.60"', bendradius: '0.032', benddeduction: '0.207"', kfactor: '0.29', maxlength: '72' },
    { id: 8, grade: '', thickness: '0.19', minflangelength: '1.00"', distortionzone: '1.00"', bendradius: '0.125', benddeduction: '0.307"', kfactor: '0.4', maxlength: '44.5"' },
    { id: 9, grade: '', thickness: '0.25', minflangelength: '1.00"', distortionzone: '1.00"', bendradius: '0.125', benddeduction: '0.394"', kfactor: '0.41', maxlength: '36' },
    { id: 10, grade: 'Steel', thickness: '0.036 (20 gauge)', minflangelength: '0.32"', distortionzone: '0.32"', bendradius: '0.032', benddeduction: '0.08', kfactor: '0', maxlength: '72' },
    { id: 11, grade: '', thickness: '0.048 (18 gauge)', minflangelength: '0.32"', distortionzone: '0.32"', bendradius: '0.06', benddeduction: '0.089"', kfactor: '0.43', maxlength: '72' },
    { id: 12, grade: '', thickness: '0.063 (16 gauge)', minflangelength: '0.32"', distortionzone: '0.32"', bendradius: '0.08', benddeduction: '0.133"', kfactor: '0.28', maxlength: '72' },
    { id: 13, grade: '', thickness: '0.074 (14 gauge)', minflangelength: '0.40"', distortionzone: '0.40"', bendradius: '0.08', benddeduction: '0.136"', kfactor: '0.4', maxlength: '72' },
    { id: 14, grade: '', thickness: '0.100 (12 gauge)', minflangelength: '0.50"', distortionzone: '0.50"', bendradius: '0.1', benddeduction: '0.190"', kfactor: '0.34', maxlength: '72' },
    { id: 15, grade: '', thickness: '0.120 (11 gauge)', minflangelength: '0.60"', distortionzone: '0.60"', bendradius: '0.1', benddeduction: '0.207"', kfactor: '0.405', maxlength: '60' },
    { id: 16, grade: '', thickness: '0.135 (10 gauge)', minflangelength: '0.60"', distortionzone: '0.60"', bendradius: '0.14', benddeduction: '0.235"', kfactor: '0.45', maxlength: '48' },
    { id: 17, grade: '', thickness: '0.188 (3/16)', minflangelength: '1.00"', distortionzone: '1.00"', bendradius: '0.14', benddeduction: '0.315"', kfactor: '0.41', maxlength: '30' },
    { id: 18, grade: '', thickness: '0.25 (1/4)', minflangelength: '1.00"', distortionzone: '1.00"', bendradius: '0.25', benddeduction: '0.437"', kfactor: '0.44', maxlength: '20' },
    { id: 19, grade: 'Stainless Steel', thickness: '0.036 (20 gauge)', minflangelength: '0.32"', distortionzone: '0.32"', bendradius: '0.032', benddeduction: '0.092"', kfactor: '0', maxlength: '72' },
    { id: 20, grade: '', thickness: '0.048 (18 gauge)', minflangelength: '0.32"', distortionzone: '0.32"', bendradius: '0.032', benddeduction: '0.101"', kfactor: '0.3', maxlength: '72' },
    { id: 21, grade: '', thickness: '0.063 (16 gauge)', minflangelength: '0.32"', distortionzone: '0.32"', bendradius: '0.075', benddeduction: '0.151"', kfactor: '0.1', maxlength: '72' },
    { id: 22, grade: '', thickness: '0.074 (14 gauge)', minflangelength: '0.40"', distortionzone: '0.40"', bendradius: '0.078', benddeduction: '0.149"', kfactor: '0.28', maxlength: '72' },
    { id: 23, grade: '', thickness: '0.100 (12 gauge)', minflangelength: '0.50"', distortionzone: '0.50"', bendradius: '0.109', benddeduction: '0.197"', kfactor: '0.32', maxlength: '60' },
    { id: 24, grade: '', thickness: '0.120 (11 gauge)', minflangelength: '0.60"', distortionzone: '0.60"', bendradius: '0.12', benddeduction: '0.229"', kfactor: '0.33', maxlength: '40' },
    { id: 25, grade: '', thickness: '0.135 (10 gauge)', minflangelength: '0.60"', distortionzone: '0.60"', bendradius: '0.14', benddeduction: '0.265"', kfactor: '0.3', maxlength: '40' },
    { id: 26, grade: '', thickness: '0.188 (3/16)', minflangelength: '1.00"', distortionzone: '1.00"', bendradius: '0.312', benddeduction: '0.414"', kfactor: '0.32', maxlength: '20' },
    { id: 27, grade: '', thickness: '0.25 (1/4)', minflangelength: '1.00"', distortionzone: '1.00"', bendradius: '0.282', benddeduction: '0.487"', kfactor: '0.34', maxlength: '20' }
    ];

    const filteredData = data.filter(
        item =>
            JSON.stringify(item)
                .toLowerCase()
                .indexOf(searchText.toLowerCase()) !== -1
    );

    const getGradeColor = (grade) => {
        switch (grade) {
            case 'Aluminium':
                return {
                    backgroundColor: '#4F8CCA',
                    color: '#ffffff',
                    padding:6,
                };
            case 'Steel':
                return {
                    backgroundColor: '#E11F26',
                    color: '#ffffff',
                    padding:6,
                };
            case 'Stainless Steel':
                return {
                    backgroundColor: '#2A5C17',
                    color: '#ffffff',
                    padding:6,
                };
            default:
                return {};
        }
    };

    return (
        <React.Fragment>
            <Row>
                {/* <Col lg={12} xl="auto" className="w-calc-100-258"> */}
                <Col lg={12} xl={12} >
                    <div className="resources-body">
                        <div className="resources-heading mb-4">
                            <span>Guidelines</span>
                            <h1>Bending Guidelines</h1>
                        </div>
                        <div className="resources-content mb-4" id="bending1">
                            <h2>What is a CNC press brake?</h2>
                            <p className="mb-0">A CNC press brake is a machine specially designed for bending sheet metal & plate materials. It uses a combination of a punch and die to achieve these bends. CNC control (computer numerical control) allows precision and accuracy. But, bends can only be accurate if they’re designed properly! See below for some guidelines on bending.</p>
                        </div>
                        <div className="resources-content mb-4" id="bending2">
                            <h2>How should I design my part?</h2>
                            <p>Designing your parts in a CAD program will typically yield the best results. Programs like Fusion360, Solidworks, & OnShape have robust sheet metal design which allows you to design a part with the program handling the calculations for bend deduction, etc. If you don’t have access to CAD software you can design your part in the flat and calculate the bend deductions needed based on the charts below. This is a down and dirty method, but it can yield fairly accurate results if you take your time.</p>
                            <p className="mb-0">We can also help with files if needed! Reach out to use via email @ <a href="mailto:info@LaserBros.com">info@LaserBros.com</a></p>
                        </div>
                        <div className="resources-content mb-4" id="bending3">
                            <h2>Materials</h2>
                            <p>Here's a list of common materials and their appropriate bending parameters</p>
                            <div className="d-flex align-items-center justify-content-between flex-wrap">
                                <div className="mb-2 searchfield position-relative">
                                    <Icon icon="icon-park-twotone:filter" />
                                    <input
                                        type="text"
                                        placeholder="Filter materials..."
                                        className="form-control"
                                        value={searchText}
                                        onChange={e => setSearchText(e.target.value)}
                                    />
                                </div>
                                {/* <Dropdown className="mb-2">
                                    <Dropdown.Toggle id="dropdown-basic"  variant={null}>
                                        Columns <Icon icon="ion:chevron-down"/>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {Object.keys(visibleColumns).map(column => (
                                            <Dropdown.Item key={column} onClick={() => toggleColumn(column)}>
                                                {visibleColumns[column] ? (
                                                    <> {column} <Icon icon="tabler:check" /></>
                                                ) : (
                                                    <> {column} </>
                                                )}
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown> */}
                            </div>
                            <DataTable
                                columns={columns}
                                data={filteredData}
                                responsive
                                className="custom-table"
                            />
                        </div>
                        <div className="resources-content mb-4" id="bending4">
                            <h2>Here’s how to use this chart to design your parts…</h2>
                            <p>The two biggest factors in your sheet metal design are K-factor & radius. If you’re using a 3D CAD software you can set up a new rule or set your parameters around this to get very accurate parts made! We physically cut and tested all of these settings to ensure they’re as accurate as possible! But, if you won’t have access to a 3D CAD software you can use the “Bend Deduction” amount to manually draw your parts in the flat pattern. This number is the amount the material will stretch, so you would deduct (or take away) that amount from your flat pattern on each bend. The bend deduction method should still get you very close when designing your parts!</p>
                        </div>
                        <div className="resources-content mb-4" id="bending5">
                            <h2>Other things to note in this chart.</h2>
                            <ul className="list-unstyled">
                                <li><Icon icon="gg:check-o" /><b>Minimum flange length:</b> This is the smallest allowable flange based on the material you select. There can be some exceptions, but this is standard for 99% of bends.</li>
                                <li><Icon icon="gg:check-o" /><b>Distortion Zone:</b> This is the area right next to the bend centerline that you won’t want any holes or features. If you need to have features in the “distortion zone” you could add a relief slot along the bend centerline of switch to a different thickness material.</li>
                                <li><Icon icon="gg:check-o" /><b>Max Length Of Part:</b> This is the longest part we can bend with the selected material. As we upgrade our machines and tooling we can hopefully increase these numbers. But for now this is our limit for length.</li>

                            </ul>
                        </div>
                        <div className="resources-content mb-4" id="bending6">
                            <h2>Other things to note in this chart.</h2>
                            <ul className="list-unstyled">
                                <li><Icon icon="gg:check-o" /><b>Bend relief or slit</b> This will eliminate the distortion zone allowing holes and features to be really close to your bend centerline. Keep the slit the same width as the feature you’re trying to keep from distorting. Example: if you have a 0.25” diameter hole make the slit 0.25” wide, parallel with the hole.</li>
                            </ul>
                            <img src={BendingImg} className="img-fluid" alt="" />
                        </div>
                        <div className="resources-pagination d-flex align-items-center justify-content-between">
                         <Link className="pagination-prev"  to="/resources/laser-cutting">
                           <span><Icon icon="streamline:next"/></span>
                           Laser Cutting
                         </Link>
                         <Link className="pagination-next"  to="/resources/steel">
                           <span><Icon icon="streamline:next"/></span>
                           Steel
                         </Link>
                        </div>
                    </div>
                </Col>
                {/* <Col lg={12} xl="auto" className="d-none d-xl-block width-258">
                    <div className="resources-right">
                        <h2>Table of Contents</h2>
                        <a href="#bending1">What is a CNC press brake?</a>
                        <a href="#bending2">How should I design my part?</a>
                        <a href="#bending3">Material Table</a>
                        <a href="#bending4">Here’s how to use this chart to design your parts…</a>
                        <a href="#bending5">Other things to note in this chart.</a>
                        <a href="#bending6">Some TIPS!</a>
                    </div>
                </Col> */}
            </Row>
        
        </React.Fragment>
    )
}