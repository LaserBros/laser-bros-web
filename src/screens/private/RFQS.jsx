import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import {
  fetchAddress,
  fetchRFQ,
  getCard,
  getEditQuote,
  getEditQuotePay,
  reOrder,
} from "../../api/api";
import Quotes from "./Quotes";
import { toast } from "react-toastify";
import CheckoutPopup from "../../components/CheckoutPopup";
import CheckOutPay from "../../components/checkOutPay";
import MaterialBadge from "../../admin/components/MaterialBadge";
export default function RFQS() {
  const [loading, setLoading] = useState(true);
  const [quoteData, setQuotes] = useState([]);
  const navigate = useNavigate();
  const [totalRows, setTotalRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [loadingRowId, setLoadingRowId] = useState(null);
  const [loadingResend, setLoadingResend] = useState(false);
  const [loadingPay, setLoadingPay] = useState();
  const [loadingPayId, setLoadingPayID] = useState();
  const [PerPage, setPerPage] = useState(10);
  const handleRowsPerPageChange = (newRowsPerPage, page) => {
    setPerPage(newRowsPerPage);
  };
  useEffect(() => {
  const fetchData = async (page = 1, perPageData) => {
    try {
      setLoading(true);
      const res = await fetchRFQ(currentPage, PerPage);
      console.log("SDsdsdsdsddssds =-=-=-=-=-=-=-", res.data);
      setQuotes(res.data.updatedQuotes);
      setTotalRows(res.data.total);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  fetchData();
}, [currentPage, PerPage]);
  const handleClosePay = () => setModalShowPay(false);
  const [modalShowPay, setModalShowPay] = useState(false);
  const [shippingInfo, setshippingInfo] = useState(false);
  const [cardsData, setCards] = useState([]);
  const [address, setAddresss] = useState([]);
  const loadCards = async () => {
    try {
      // setLoading(true);
      const response = await getCard(); // Call your API function
      setCards(response.data); // Assuming the data is in response.data
    } catch (error) {
      console.error("Error fetching cards:", error);
    } finally {
      // setLoading(false);
    }
  };
  const loadData = async () => {
    // setLoading(true);
    try {
      const [response] = await Promise.all([fetchAddress()]);
      console.log(response.data.data);
      setAddresss(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    loadCards();
  }, []);

  const handlePageChange = (page) => {
    console.log("SDsdsdsdddsdsds", page);
    setCurrentPage(page);
  };
  const RequestQuote = async (id) => {
    const data = {
      id: id,
    };
    setLoadingPay(id);
    setLoadingPayID(id);

    try {
      const response = await getEditQuotePay(data);
      setshippingInfo(response.data);
      setLoadingPay(false);
      setModalShowPay(true);
    } catch (error) {
      setLoadingPay(false);
      toast.error("Something wents wrong.");
    }

    // console.log("resss-----", response.data);
    // localStorage.setItem(
    //   "setItemelementDataPay",
    //   JSON.stringify(response.data.requestQuoteDB)
    // );

    // localStorage.setItem(
    //   "setItempartsDBdataPay",
    //   JSON.stringify(response.data.partsDBdata)
    // );
    // console.log("response.data.shippingRates", response.data.shippingRates);
    // localStorage.setItem(
    //   "ShippingDBdataPay",
    //   JSON.stringify(response.data.shippingRates)
    // );
    // localStorage.setItem(
    //   "divideWeight",
    //   JSON.stringify(response.data.divideWeight)
    // );
    // setLoadingPay(false);
    // navigate("/quotes/pay");
  };
  const columns = [
    {
      name: "Order Number",
      selector: (row) => {
        return `Quote # ${row.search_quote}`;
      },
      //   selector: (row) => row.quote_number,
      sortable: false,
    },
    {
      name: "Materials",
      minWidth: "240px",
      selector: (row) => (
        <div className="badgematerials custom_badgess">
          <MaterialBadge materialDetails={row?.material_details} />
        </div>
      ),
      sortable: false,
    },
    {
      name: "Parts Quantity",
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
        }).format(row.total_amount + row.total_bend_price + row.shipping_price);

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
          <Link className="btnpay" to={`/rfq/rfq-detail/${row._id}`}>
            {/* <Icon icon="hugeicons:view"></Icon> */}
            View
          </Link>
          {row.status === 2 && (
            <Link
              className="btnpay"
              onClick={() => RequestQuote(row._id)}
              disabled={loadingPay}
            >
              {loadingPay === row._id ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                "Pay"
              )}
            </Link>
          )}
        </div>
      ),
    },
  ];

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
              <h5>Request For Quotes </h5>{" "}
            </Card.Header>
            <Card.Body>
              {loading ? (
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
              ) : (
                <>
                  <DataTable
                    columns={columns}
                    data={quoteData}
                    progressPending={loading}
                    pagination
                    paginationServer
                    paginationTotalRows={totalRows}
                    paginationDefaultPage={currentPage}
                    onChangePage={handlePageChange}
                    paginationPerPage={PerPage}
                    paginationRowsPerPageOptions={[10, 25, 50,100]} 
                    noDataComponent={
                      <div style={{ textAlign: "center", padding: "24px" }}>
                        <span>No RFQ’s to Display</span>
                      </div>
                    }
                    onChangeRowsPerPage={handleRowsPerPageChange}
                    responsive
                    // paginationRowsPerPageOptions={[]} // Hide rows per page dropdown
                    className="custom-table custom-table2"
                    labelRowsPerPage=""
                  />
                </>
              )}
            </Card.Body>
          </Card>
        </Container>
      </section>
      <CheckOutPay
        show={modalShowPay}
        loadingPayId={loadingPayId}
        handleClose={handleClosePay}
        address={address}
        shippingInfo={shippingInfo}
        cardsData={cardsData}
      />
    </React.Fragment>
  );
}
