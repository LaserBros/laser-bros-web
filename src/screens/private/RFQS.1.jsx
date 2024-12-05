import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { fetchRFQ, getEditQuote } from "../../api/api";

export default function RFQS() {
  const [loading, setLoading] = useState(true);
  const [quoteData, setQuotes] = useState(null);
  const navigate = useNavigate();
  const [totalRows, setTotalRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchRFQ();
        console.log("SDsdsdsdsddssds", res.data);
        setQuotes(res.data.updatedQuotes);
        setTotalRows(res.data.total);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const handlePageChange = (page) => {
    console.log("SDsdsdsdddsdsds", page);
    setCurrentPage(page);
    // loadOrders(page); // Load new page data
  };
  const RequestQuote = async (id) => {
    const data = {
      id: id,
    };
    const response = await getEditQuote(data);
    console.log("resss-----", response.data);
    localStorage.setItem(
      "setItemelementDataPay",
      JSON.stringify(response.data.requestQuoteDB)
    );

    localStorage.setItem(
      "setItempartsDBdataPay",
      JSON.stringify(response.data.partsDBdata)
    );

    navigate("/quotes/pay");
  };
  const columns = [
    {
      name: "Order Number",
      selector: (row) => {
        const dateObj = new Date(row.createdAt);
        const day = String(dateObj.getDate()).padStart(2, "0");
        const month = String(dateObj.getMonth() + 1).padStart(2, "0");
        const yearLastTwoDigits = String(dateObj.getFullYear()).slice(-2);
        return `Quote # ${month}-${yearLastTwoDigits}-${row.quote_number}`;
      },
      //   selector: (row) => row.quote_number,
      sortable: false,
    },
    {
      name: "Materials",
      minWidth: "240px",
      selector: (row) => (
        <div className="badgematerials">
          <span
            style={getMaterialsColor(
              row.material_name1 + " " + row.material_grade1
            )}
          ></span>
          {row.material_name1 + " " + row.material_grade1}
        </div>
      ),
      sortable: false,
    },
    {
      name: "Quantity",
      selector: (row) => row.total_quantity,
      sortable: false,
    },
    {
      name: "Total Price",
      selector: (row) => {
        const formattedAmount = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(row.total_amount);

        return formattedAmount;
      },
      sortable: false,
    },
    {
      name: "Status",
      selector: (row) => (
        <div
          className="badgestatus"
          style={getStatusColor(
            row.status == 1
              ? "Pending"
              : row.status == 2
              ? "Approved!"
              : "Rejected"
          )}
        >
          {row.status == 1
            ? "Pending"
            : row.status == 2
            ? "Approved!"
            : "Rejected"}
        </div>
      ),
      sortable: false,
    },
    {
      name: "Actions",
      minWidth: "160px",
      cell: (row) => (
        <div>
          <Link className="btnview" to="">
            <Icon icon="hugeicons:view"></Icon>
          </Link>
          <Link className="btnreorder" to="">
            <Icon icon="solar:reorder-line-duotone"></Icon>
          </Link>
          {row.status === 2 && (
            <Link className="btnpay" onClick={() => RequestQuote(row._id)}>
              Pay
            </Link>
          )}
        </div>
      ),
    },
  ];
  const data = [
    {
      id: 1,
      orderno: "ORD12343",
      materials: "Aluminum",
      quantity: "54",
      totalprice: "$1,500.00",
      status: "Approved!",
    },
    {
      id: 2,
      orderno: "ORD12343",
      materials: "Steel",
      quantity: "65",
      totalprice: "$1,630.00",
      status: "Pending",
    },
    {
      id: 3,
      orderno: "ORD12343",
      materials: "Stainless Steel",
      quantity: "25",
      totalprice: "$1,210.00",
      status: "Approved!",
    },
    {
      id: 4,
      orderno: "ORD12343",
      materials: "Steel",
      quantity: "45",
      totalprice: "$1,300.00",
      status: "Pending",
    },
    {
      id: 5,
      orderno: "ORD12343",
      materials: "Aluminum",
      quantity: "45",
      totalprice: "$2,201.00",
      status: "Approved!",
    },
    {
      id: 6,
      orderno: "ORD12343",
      materials: "Stainless Steel",
      quantity: "45",
      totalprice: "$1,235.00",
      status: "Pending",
    },
    {
      id: 7,
      orderno: "ORD12343",
      materials: "Steel",
      quantity: "45",
      totalprice: "$1,699.00",
      status: "Approved!",
    },
  ];
  const getMaterialsColor = (materials) => {
    switch (materials) {
      case "Aluminium 5052":
        return {
          backgroundColor: "rgb(164 194 244)",
        };
      case "Steel 1008":
        return {
          backgroundColor: "rgb(224 102 103)",
        };
      case "Steel A36":
        return {
          backgroundColor: "rgb(224 102 103)",
        };
      case "Aluminium 6061":
        return {
          backgroundColor: "rgb(160 197 233)",
        };
      case "Stainless Steel 304 (2b)":
        return {
          backgroundColor: "rgb(148 196 125)",
        };
      case "Stainless Steel 304 (#4)":
        return {
          backgroundColor: "rgb(148 196 125)",
        };
      case "Stainless Steel 316 (2b)":
        return {
          backgroundColor: "rgb(148 196 125)",
        };
      case "Brass 260":
        return {
          backgroundColor: "rgb(255 217 102)",
        };
      case "Custom i.e. Titanium, Incolnel, etc.":
        return {
          backgroundColor: "rgb(213 166 189)",
        };
      default:
        return {};
    }
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "Approved!":
        return {
          backgroundColor: "rgba(1,148,60,0.10)",
          color: "#01943C",
          padding: 6,
        };
      case "Rejected":
        return {
          backgroundColor: "rgb(225, 31, 38)",
          color: "#fff",
          padding: 6,
        };

      case "Pending":
        return {
          backgroundColor: "rgba(255,186,22,0.10)",
          color: "#FFBA16",
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
            <Card.Header>
              <h5>Request For Quotes --==</h5>{" "}
            </Card.Header>
            <Card.Body>
              {loading ? (
                <div className="loader text-center mt-4">Loading...</div>
              ) : quoteData && quoteData.length > 0 ? (
                <DataTable
                  columns={columns}
                  data={quoteData}
                  progressPending={loading}
                  pagination
                  paginationServer
                  paginationTotalRows={totalRows}
                  onChangePage={handlePageChange}
                  paginationPerPage={perPage}
                  responsive
                  className="custom-table custom-table2"
                />
              ) : (
                <div className="text-center mt-4">
                  {" "}
                  <i className="noQuotesFound_text">No quotes found.</i>
                </div>
              )}
            </Card.Body>
          </Card>
        </Container>
      </section>
    </React.Fragment>
  );
}
