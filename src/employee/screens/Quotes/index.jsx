import React, { useState } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Table,
    Form,
    Row,
    Col
} from 'react-bootstrap';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
const Quotes = () => {
    const [checkedItems, setCheckedItems] = useState({});
    const handleCheckboxChange = (id) => {
        setCheckedItems(prevState => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };
    const data = [
        {
            id: 1,
            wo: 'LB-6-24-0001',
            material: ['CS0120', 'A50120'],
        },
        {
            id: 2,
            wo: 'LB-6-24-0002',
            material: ['CS0120', 'A50120'],
        },
        {
            id: 3,
            wo: 'LB-6-24-0003',
            material: ['CS0120', 'A50120'],
        },
        {
            id: 4,
            wo: 'LB-6-24-0004',
            material: ['SB0036', 'A50120'],
        },
        {
            id: 5,
            wo: 'LB-6-24-0005',
            material: ['CS0120', 'A50120'],
        },
        {
            id: 6,
            wo: 'LB-6-24-0006',
            material: ['CS0120', 'SB0036'],
        },
        {
            id: 7,
            wo: 'LB-6-24-0007',
            material: ['SB0036', 'A50120'],
        },
    ];

    const getMaterialColor = (material) => {
        switch (material) {
            case 'A50120':
                return {
                    backgroundColor: '#4F8CCA',
                };
            case 'CS0120':
                return {
                    backgroundColor: '#E11F26',
                };
            case 'SB0036':
                return {
                    backgroundColor: '#2A5C17',
                };
            default:
                return {};
        }
    };

    return (
        <React.Fragment>
            <Card>
                <CardHeader className="py-4">
                    <h5>Quotes</h5>
                </CardHeader>
                <CardBody>
                    <Form>
                        <Row className="px-2 gx-3">
                            <Col lg={3} xxl={2}>
                                <Form.Group className="form-group mb-2 searchfield">
                                    <div className=" position-relative">
                                        <Icon icon="flowbite:search-solid" className="position-absolute" />
                                        <Form.Control type="text" placeholder="Search WO" className="rounded-5" />
                                    </div>
                                </Form.Group>
                            </Col>
                            <Col lg={3} xxl={2}>
                                <Form.Group className="form-group mb-2">
                                    <Form.Select className="rounded-5" defaultValue="value1">
                                        <option disabled value="value1">Sort By</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col lg={3} xxl={2}>
                                <Form.Group className="form-group mb-2">
                                    <Form.Select className="rounded-5" defaultValue="value1">
                                        <option disabled value="value1">Filter By</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                    <div className="table-responsive">
                        <Table className="tablecustom pt-0">
                            <tbody>
                                {data.map(row => (
                                    <React.Fragment key={row.id}>
                                        <tr>
                                        <td className='text-nowrap'><Link to="/quotes/quotes-detail" className="workorders"><b>WO# {row.wo}</b></Link></td>
                                            <td className='text-nowrap'>  
                                                {row.material.map((materials,index) => (
                                                 <span key={`${row.id}-${materials}-${index}`} className="badgestatus me-2" style={getMaterialColor(materials)}>{materials}</span>
                                                 ))}
                                            </td>
                                            <td className="text-end" >
                                                <div className="d-inline-flex align-items-center gap-3">
                                                    <Link className="btnedit"><Icon icon="teenyicons:edit-outline"/></Link>
                                                    <Form.Check
                                                        type="checkbox"
                                                        checked={checkedItems[row.id] || false}
                                                        onChange={() => handleCheckboxChange(row.id)}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default Quotes;
