import React from "react";
import {
    Card,
    Container
} from 'react-bootstrap';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import DataTable from "react-data-table-component";
export default function RFQS() {
    const columns = [
        { name: 'Order Number', selector: row => row.orderno, sortable: false},
        { name: 'Materials', selector: row => <div className="badgematerials"><span  style={getMaterialsColor(row.materials)}></span>{row.materials}</div>, sortable: false},
        { name: 'Quantity', selector: row => row.quantity, sortable: false},
        { name: 'Total Price', selector: row => row.totalprice, sortable: false},
        { name: 'Status', selector: row => <div className="badgestatus" style={getStatusColor(row.status)}>{row.status}</div>, sortable: false},
        {
            name: 'Actions',
            minWidth:'160px',
            cell: row => (
                <div>
                    <Link className="btnview" to="">
                        <Icon icon="hugeicons:view"></Icon>
                    </Link>
                    <Link className="btnreorder" to="">
                        <Icon icon="solar:reorder-line-duotone"></Icon>
                    </Link>
                    {row.status === 'Approved!' && (
                        <Link className="btnpay" to="">
                            Pay
                        </Link>
                    )}
                </div>
            ),
        }
    ]
    const data = [
        { id: 1, orderno: 'ORD12343', materials: 'Aluminum', quantity: '54', totalprice: '$1,500.00', status: 'Approved!',},
        { id: 2, orderno: 'ORD12343', materials: 'Steel', quantity: '65', totalprice: '$1,630.00', status: 'Pending',},
        { id: 3, orderno: 'ORD12343', materials: 'Stainless Steel', quantity: '25', totalprice: '$1,210.00', status: 'Approved!',},
        { id: 4, orderno: 'ORD12343', materials: 'Steel', quantity: '45', totalprice: '$1,300.00', status: 'Pending',},
        { id: 5, orderno: 'ORD12343', materials: 'Aluminum', quantity: '45', totalprice: '$2,201.00', status: 'Approved!',},
        { id: 6, orderno: 'ORD12343', materials: 'Stainless Steel', quantity: '45', totalprice: '$1,235.00', status: 'Pending',},
        { id: 7, orderno: 'ORD12343', materials: 'Steel', quantity: '45', totalprice: '$1,699.00', status: 'Approved!',},
     ];
     const getMaterialsColor = (materials) => {
        switch (materials) {
            case 'Aluminum':
                return {
                    backgroundColor: '#E11F26',
                };
            case 'Steel':
                return {
                    backgroundColor: '#2A5C17',
                };
            case 'Stainless Steel':
                return {
                    backgroundColor: '#FACC15',
                }; 
            default:
                return {};
        }
    };
     const getStatusColor = (status) => {
        switch (status) {
            case 'Approved!':
                return {
                    backgroundColor: 'rgba(1,148,60,0.10)',
                    color: '#01943C',
                    padding:6,
                };
            case 'Pending':
                return {
                    backgroundColor: 'rgba(255,186,22,0.10)',
                    color: '#FFBA16',
                    padding:6,
                }; 
            default:
                return {};
        }
    };
    return (
        <React.Fragment>
            <section className="myaccount ptb-50">
                <Container>
                    <Card>
                        <Card.Header><h5>Request For Quotes</h5>  </Card.Header>
                        <Card.Body>
                        <DataTable
                                columns={columns}
                                data={data}
                                responsive
                                pagination
                                className="custom-table custom-table2"
                            />
                        </Card.Body>
                    </Card>
                </Container>
            </section>
        </React.Fragment>
    )
}