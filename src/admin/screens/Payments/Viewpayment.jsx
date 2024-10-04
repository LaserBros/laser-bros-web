import React, { useEffect, useState } from "react";
import { Row, Col, Card, CardHeader, CardBody, Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { Link, useParams } from "react-router-dom";
import file from "../../assets/img/file1.jpg";
import { getParticularTransaction } from "../../../api/api";
const ViewPayment = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [transaction, setTransaction] = useState([]);
  const fetchOrder = async () => {
    const data = {
      id: id,
    };
    const res = await getParticularTransaction(data);
    setTransaction(res.data);
    setLoading(false);
  };
  useEffect(() => {
    fetchOrder();
  }, []);
  const columns = [
    {
      name: "Image",
      selector: (row) => row.image,
      cell: (row) => (
        <div className="files-image">
          <img
            src={row.image_url}
            alt={row.image_url}
            className="img-fluid rounded-circle"
          />
        </div>
      ),
      sortable: false,
    },
    {
      name: "Name",
      selector: (row) => row.material_code + "-" + row.quote_name,
      sortable: true,
    },
    {
      name: "QTY",
      selector: (row) => row.quantity,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => {
        const formattedAmount = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(row.amount);

        return formattedAmount;
      },
      sortable: true,
    },
    // {
    //   name: "Dimension",
    //   selector: (row) => row.dimension,
    //   sortable: true,
    // },
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
  const getMonthYear = (dateStr) => {
    const date = new Date(dateStr);
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();
    return `${month}-${year}`; // Returns "MM/YYYY"
  };

  return (
    <React.Fragment>
      <Card>
        <CardHeader className="d-flex align-items-center justify-content-between flex-wrap">
          <h5>#TXN123456</h5>
          <Button
            as={Link}
            to="/admin/payment-history"
            className="d-inline-flex align-items-center justify-content-center"
          >
            Back To Payments
          </Button>
        </CardHeader>
        {!loading ? (
          <>
            <CardBody>
              <Row className="justify-content-between  mb-3">
                <Col xl={4} lg={4} md={6}>
                  <div className="payment-card">
                    <div className="d-flex align-items-center mb-3">
                      <label>Name </label>{" "}
                      <span>{transaction?.userDetails?.full_name}</span>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                      <label>Email Address </label>{" "}
                      <span>{transaction?.userDetails?.email}</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <label>Phone No </label>{" "}
                      <span>{transaction?.userDetails?.phone_number}</span>
                    </div>
                  </div>
                </Col>
                <Col xl={3} lg={4} md={6}>
                  <div className="payment-card">
                    <div className="d-flex align-items-center mb-3">
                      <label>Work Order </label>{" "}
                      <span>
                        WO# LB-
                        {getMonthYear(transaction?.orderDetails?.createdAt)}-
                        {transaction?.orderDetails?.quote_number}
                      </span>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                      <label>Total Amount </label>{" "}
                      <span>
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD", // Change to your desired currency
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }).format(transaction?.orderDetails?.total_amount)}
                      </span>
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
                data={transaction?.updatedSubQuoteData}
                responsive
                className="custom-table"
              />
              <Row className="justify-content-end viewpaymentdetail mt-3">
                <Col xl={2} lg={4} md={6}>
                  <p>
                    Subtotal{" "}
                    <span>
                      {" "}
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD", // Change to your desired currency
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(transaction?.orderDetails?.total_amount)}
                    </span>
                  </p>
                  <p>
                    <b>Total Amount</b>{" "}
                    <b>
                      {" "}
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD", // Change to your desired currency
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(transaction?.orderDetails?.total_amount)}
                    </b>
                  </p>
                </Col>
              </Row>
            </CardBody>
          </>
        ) : (
          <Col>
            <p className="text-center mt-4">Loading...</p>{" "}
          </Col>
        )}
      </Card>
    </React.Fragment>
  );
};
export default ViewPayment;
