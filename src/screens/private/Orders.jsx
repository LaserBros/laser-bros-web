import React from "react";
import {
    Card,
    Container,
    Image
} from 'react-bootstrap';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import DataTable from "react-data-table-component";
import nocart from "../../assets/img/no-cart.svg";
export default function Orders() {
    const columns = [
        { name: 'Order Number', selector: row => row.orderno, sortable: false },
        { name: 'Materials', selector: row => <div className="badgematerials"><span style={getMaterialsColor(row.materials)}></span>{row.materials}</div>, sortable: false },
        { name: 'Quantity', selector: row => row.quantity, sortable: false },
        { name: 'Total Price', selector: row => row.totalprice, sortable: false },
        { name: 'Status', selector: row => <div className="badgestatus" style={getStatusColor(row.status)}>{row.status}</div>, sortable: false },
        {
            name: 'Actions',
            cell: row => (
                <div>
                    <Link className="btnview" to="/orders/orders-detail">
                        <Icon icon="hugeicons:view"></Icon>
                    </Link>
                    <Link className="btnreorder" to="">
                        <Icon icon="solar:reorder-line-duotone"></Icon>
                    </Link>
                </div>
            ),
        }
    ]
    const data = [
        { id: 1, orderno: 'ORD12343', materials: 'Aluminum', quantity: '54', totalprice: '$1,500.00', status: 'In Progress', },
        { id: 2, orderno: 'ORD12343', materials: 'Steel', quantity: '65', totalprice: '$1,630.00', status: 'Delivered', },
        { id: 3, orderno: 'ORD12343', materials: 'Stainless Steel', quantity: '25', totalprice: '$1,210.00', status: 'Shipped', },
        { id: 4, orderno: 'ORD12343', materials: 'Steel', quantity: '45', totalprice: '$1,300.00', status: 'Order Placed', },
        { id: 5, orderno: 'ORD12343', materials: 'Aluminum', quantity: '45', totalprice: '$2,201.00', status: 'Delivered', },
        { id: 6, orderno: 'ORD12343', materials: 'Stainless Steel', quantity: '45', totalprice: '$1,235.00', status: 'Shipped', },
        { id: 7, orderno: 'ORD12343', materials: 'Steel', quantity: '45', totalprice: '$1,699.00', status: 'Order Placed', },
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
            case 'In Progress':
                return {
                    backgroundColor: 'rgba(156,39,176,0.10)',
                    color: '#9C27B0',
                    padding: 6,
                };
            case 'Delivered':
                return {
                    backgroundColor: 'rgba(1,148,60,0.10)',
                    color: '#01943C',
                    padding: 6,
                };
            case 'Shipped':
                return {
                    backgroundColor: 'rgba(79,140,202,0.10)',
                    color: '#4F8CCA',
                    padding: 6,
                };
            case 'Order Placed':
                return {
                    backgroundColor: 'rgba(250 ,204,21,0.10)',
                    color: '#facc15',
                    padding: 6,
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
                       {/* <div className="no-cart text-center mt-5">
                            <Image src={nocart} className="img-fluid" alt="" />
                            <h3 className="text-center">You Have No Orders</h3>
                        </div>
                        <div className="orders-upload-file  mt-5 mb-5">
                            <h5 className="text-center">Start a new quote by uploading your files</h5>
                            <div className="banner-upload-file mb-2 text-center w-100">
                                <Icon icon="mage:file-plus" />
                                <p><label for="uploadfile">Browse Files</label><input type="file" id="uploadfile" name="uploadfile" className="d-none" /><span> or Drag or Drop</span></p>
                                <small> We accept DXF files for instant quotes</small>
                            </div>
                       </div>  */}

                        <Card.Header><h5>Orders</h5>  </Card.Header>
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