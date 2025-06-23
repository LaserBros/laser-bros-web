import React, { useEffect, useState } from "react";
import {
    Row,
    Col,
    Dropdown,
} from 'react-bootstrap';
import { Icon } from '@iconify/react';
import BendingImg from "../../../assets/img/bending-img.png";
import DataTable from "react-data-table-component";
import { Link } from 'react-router-dom';
import { getBendingData } from "../../../api/api";
export default function Bending() {
    const [searchText, setSearchText] = useState('');
    const [Material, setMaterial] = useState({});
    const getBending = async () => {
        const res = await getBendingData();
        const bendingData = res.data;

            const materialPriority = {
            'Aluminium': 1,
            'Steel': 2,
            'Stainless Steel': 3
            };

            const sortedData = bendingData.sort((a, b) => {
            return (materialPriority[a.material_grade] || 99) - (materialPriority[b.material_grade] || 99);
            });
            setMaterial(sortedData);
            // console.log("Sorted bending data:", sortedData);
    }
    useEffect (() => {
        getBending();
    },[])
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
    const conditionalRowStyles = [
        {
          when: row => row.material_grade === 'Aluminium',
          classNames: ['highlight-aluminium'],
        },
        {
          when: row => row.material_grade === 'Steel',
          classNames: ['highlight-steel'],
        },
        {
          when: row => row.material_grade === 'Stainless Steel',
          classNames: ['highlight-stainless'],
        },
      ];
    const columns = [
        { name: 'Grade', selector: row => <div className={`badgestatus badgeadded-${row.material_grade}`} style={getGradeColor(row.material_grade)}>{row.material_grade}</div>, sortable: false, omit: !visibleColumns.Grade,},
        { name: 'Thickness', selector: row => row.material_thickness, sortable: false, omit: !visibleColumns['Thickness'], },
        { name: 'Min Flange Length', selector: row => row.min_flange_length+'"', sortable: false, omit: !visibleColumns['Min Flange Length'], },
        { name: 'Distortion Zone', selector: row => row.distortion_zone+'"', sortable: false, omit: !visibleColumns['Distortion Zone'], },
        { name: 'Bend Radius', selector: row => row.bend_radius, sortable: false, omit: !visibleColumns['Bend Radius'],},
        { name: 'Bend Deduction', selector: row => row.bend_deduction+'"', sortable: false, omit: !visibleColumns['Bend Deduction'], },
        { name: 'K-Factor', selector: row => row.k_factor, sortable: false, omit: !visibleColumns['K-Factor'], },
        { name: 'Max Length Of Part', selector: row => row.max_length_part, sortable: false, omit: !visibleColumns['Max Length Of Part'],},
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
                                {/* <div className="mb-2 searchfield position-relative">
                                    <Icon icon="icon-park-twotone:filter" />
                                    <input
                                        type="text"
                                        placeholder="Filter materials..."
                                        className="form-control"
                                        value={searchText}
                                        onChange={e => setSearchText(e.target.value)}
                                    />
                                </div> */}
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
                            {Material.length > 0 &&
                            <DataTable
                                columns={columns}
                                data={Material}
                                responsive
                                conditionalRowStyles={conditionalRowStyles}
                                className="custom-table"
                            />
}
                        </div>
                        <div className="resources-content mb-4" id="bending4">
                            <h2>Here’s how to use this chart to design your parts…</h2>
                            <p>The two biggest factors in your sheet metal design are K-factor & radius. If you’re using a 3D CAD software you can set up a new rule or set your parameters around this to get very accurate parts made! We physically cut and tested all of these settings to ensure they’re as accurate as possible! But, if you won’t have access to a 3D CAD software you can use the “Bend Deduction” amount to manually draw your parts in the flat pattern. This number is the amount the material will stretch, so you would deduct (or take away) that amount from your flat pattern on each bend. The bend deduction method should still get you very close when designing your parts!</p>
                        </div>
                        <div className="resources-content mb-4" id="bending5">
                            <h2>Other things to note in this chart.</h2>
                            <ul className="list-unstyled">
                                <li><Icon icon="gg:check-o" /><b>Minimum flange length:</b> This is the smallest allowable flange based on the material you select. There can be some exceptions, but this is standard for 99% of bends.</li>
                                <li><Icon icon="gg:check-o" /><b>Distortion Zone:</b> This is the area right next to the bend centerline that you won’t want any holes or features. If you need to have features in the “distortion zone” you could add a relief slot along the bend centerline or switch to a different thickness material.</li>
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