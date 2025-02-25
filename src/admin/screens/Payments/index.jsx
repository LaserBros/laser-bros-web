import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody } from "react-bootstrap";
import { Icon } from "@iconify/react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { getAllTransactions } from "../../../api/api";
import Pagination from "../../components/Pagination";
const PaymentHistory = () => {
  const [loading, setLoading] = useState(true);
  const [transaction, setTransaction] = useState([]);
  const [totalPage, settotalPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const fetchData = async (page) => {
    try {
      const res = await getAllTransactions(page);
      console.log(res.data.data);
      setTransaction(res.data.data.transactions);
      settotalPage(res.data.data.total);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchData(pageNumber);
  };
  useEffect(() => {
    fetchData(currentPage);
  }, []);

  const columns = [
    {
      name: "Transaction Id",
      selector: (row) => row.transaction_id,
      sortable: true,
    },
    {
      name: "Work Order",
      selector: (row) => row.search_quote,
      sortable: true,
    },
    {
      name: "Payment Mode",
      selector: (row) => "Stripe",
      sortable: true,
    },
    {
      name: "Total Amount",
      selector: (row) => {
        {
          const formattedAmount = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(row.total_amount);

          return formattedAmount;
        }
      },
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => {
        const dateObj = new Date(row.createdAt);
        const day = String(dateObj.getDate()).padStart(2, "0");
        const month = String(dateObj.getMonth() + 1).padStart(2, "0");
        const yearLastTwoDigits = String(dateObj.getFullYear());
        return `${month}/${day}/${yearLastTwoDigits}`;
      },
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => (
        <>
        {row.refund == 1 ?
          <span className="statusactiveData">Order Canceled</span>
          :
          <span className="statusactiveNew">Paid</span>
        }
        </>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <Link
            className="btnview"
            to={`/admin/payment-history/view-payment/${row._id}`}
          >
            <Icon icon="tabler:eye"></Icon>
          </Link>
        </>
      ),
    },
  ];

  return (
    <React.Fragment>
      <Card>
        <CardHeader className="py-4 ">
          <h5>All Payments</h5>
        </CardHeader>
        <CardBody>
          {!loading ? (
            <>
              <DataTable
                columns={columns}
                data={transaction}
                responsive
                className="custom-table"
              />

              {totalPage > 10 ? (
                <Pagination
                  totalItems={totalPage}
                  itemsPerPage={itemsPerPage}
                  currentPage={currentPage}
                  onPageChange={onPageChange}
                />
              ) : (
                ""
              )}
            </>
          ) : (
            <>
              <span
                role="status"
                aria-hidden="true"
                className="spinner-border spinner-border-sm text-center"
                style={{
                  margin: "0 auto",
                  display: "block",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              ></span>
            </>
          )}
        </CardBody>
      </Card>
    </React.Fragment>
  );
};
export default PaymentHistory;
