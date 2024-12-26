import React from "react";
import { Row, Col, Card, CardHeader, CardBody, Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import file from "../../assets/img/file1.jpg";
const ViewPayment = () => {
  const columns = [
    {
      name: "Image",
      selector: (row) => row.image,
      cell: (row) => (
        <div className="files-image">
          <img
            src={row.image}
            alt={row.name}
            className="img-fluid rounded-circle"
          />
        </div>
      ),
      sortable: false,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "QTY",
      selector: (row) => row.qty,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "Dimension",
      selector: (row) => row.dimension,
      sortable: true,
    },
  ];
  const data = [
    {
      id: 1,
      image: file,
      name: "SB0036(14)-plate1.dxf",
      qty: "14",
      price: "$150",
      dimension: "11 in x 11 in",
    },
    {
      id: 2,
      image: file,
      name: "SB0036(14)-plate1.dxf",
      qty: "14",
      price: "$150",
      dimension: "11 in x 11 in",
    },
  ];
  return (
    <React.Fragment>
      <Card>
        <CardHeader className="d-flex align-items-center justify-content-between flex-wrap">
          <h5>#TXN123456</h5>
          <Button
            as={Link}
            to="/payment-history"
            className="d-inline-flex align-items-center justify-content-center"
          >
            Back To Payments
          </Button>
        </CardHeader>
        <CardBody>
          <Row className="justify-content-between  mb-3">
            <Col xl={3} lg={4} md={6}>
              <div className="payment-card">
                <div className="d-flex align-items-center mb-3">
                  <label>Name </label> <span>John Smith</span>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <label>Email Address </label> <span>johnsmith@gmail.com</span>
                </div>
                <div className="d-flex align-items-center">
                  <label>Phone No </label> <span>9874563210</span>
                </div>
              </div>
            </Col>
            <Col xl={3} lg={4} md={6}>
              <div className="payment-card">
                <div className="d-flex align-items-center mb-3">
                  <label>Work Order </label> <span>WO#6-24-0001</span>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <label>Total Amount </label> <span>$150</span>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <label>Payment Mode </label> <span>Stripe</span>
                </div>
                <div className="d-flex align-items-center">
                  <label>Status </label>{" "}
                  <span className="statusactive">Paid</span>
                </div>
              </div>
            </Col>
          </Row>
          <DataTable
            columns={columns}
            data={data}
            responsive
            className="custom-table"
          />
          <Row className="justify-content-end viewpaymentdetail mt-3">
            <Col xl={2} lg={4} md={6}>
              <p>
                Subtotal <span>$300.00</span>
              </p>
              <p>
                <b>Total Amount</b> <b>$300.00</b>
              </p>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};
export default ViewPayment;
