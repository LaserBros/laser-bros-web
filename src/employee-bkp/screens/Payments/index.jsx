import React from "react";
import { Card, CardHeader, CardBody } from "react-bootstrap";
import { Icon } from "@iconify/react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
const PaymentHistory = () => {
  const columns = [
    {
      name: "Transaction Id",
      selector: (row) => row.transactionid,
      sortable: true,
    },
    {
      name: "Work Order",
      selector: (row) => row.workorder,
      sortable: true,
    },
    {
      name: "Payment Mode",
      selector: (row) => row.paymentmode,
      sortable: true,
    },
    {
      name: "Total Amount",
      selector: (row) => row.amount,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <Link className="btnview" to="/payment-history/view-payment">
            <Icon icon="tabler:eye"></Icon>
          </Link>
        </>
      ),
    },
  ];
  const data = [
    {
      id: 1,
      transactionid: "TXN123456",
      workorder: "WO# LB-6-24-0001",
      paymentmode: "Stripe",
      amount: "$100.00",
      date: "May 10, 2024",
    },
    {
      id: 2,
      transactionid: "TXN234664",
      workorder: "WO# LB-6-24-0002",
      paymentmode: "Stripe",
      amount: "$100.00",
      date: "May 12, 2024",
    },
    {
      id: 3,
      transactionid: "TXN873456",
      workorder: "WO# LB-6-24-0003",
      paymentmode: "Stripe",
      amount: "$100.00",
      date: "May 16, 2024",
    },
    {
      id: 4,
      transactionid: "TXN324664",
      workorder: "WO# LB-6-24-0004",
      paymentmode: "Stripe",
      amount: "$100.00",
      date: "May 18, 2024",
    },
    {
      id: 5,
      transactionid: "TXN234623",
      workorder: "WO# LB-6-24-0005",
      paymentmode: "Stripe",
      amount: "$100.00",
      date: "May 20, 2024",
    },
    {
      id: 6,
      transactionid: "TXN324645",
      workorder: "WO# LB-6-24-0006",
      paymentmode: "Stripe",
      amount: "$100.00",
      date: "May 21, 2024",
    },
  ];
  return (
    <React.Fragment>
      <Card>
        <CardHeader className="py-4 ">
          <h5>All Payments</h5>
        </CardHeader>
        <CardBody>
          <DataTable
            columns={columns}
            data={data}
            responsive
            className="custom-table"
          />
        </CardBody>
      </Card>
    </React.Fragment>
  );
};
export default PaymentHistory;
