import React, { useEffect, useState } from "react";
import { Card, Container, Image } from "react-bootstrap";
import { Icon } from "@iconify/react";
import file1 from "../../assets/img/file1.jpg";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteRequestQuote,
  fetchRFQ,
  getAllLoggedInRequestedQuote,
  getEditQuote,
} from "../../api/api";
import Pagination from "../../admin/components/Pagination";
import DataTable from "react-data-table-component";
import OrderStatus from "../../admin/components/OrderStatus";
import ConfirmationModal from "../../components/ConfirmationModal";
import MaterialBadge from "../../admin/components/MaterialBadge";
// Add loading state

const Quotes = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [quoteData, setQuotes] = useState(null);
  const [totalPage, settotalPage] = useState(10);
  const [loadingRowId, setLoadingRowId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [PerPage, setPerPage] = useState(10);
  const [loadData, setloadData] = useState(false);
  const [itemsPerPage] = useState(10);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setQuotes([]);
        const res = await getAllLoggedInRequestedQuote(currentPage, PerPage);
        setQuotes(res.data.data);
        settotalPage(res.data.total);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, PerPage, loadData]);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // // console.log(pageNumber, currentPage);
    // fetchData(pageNumber);
    // }
  };
  const [DeletemodalShow, setDeleteModalShow] = useState(false);
  const [MainId, setId] = useState("");

  const handleCloseModal = (shouldReload = false) => {
    setDeleteModalShow(false);
    if (shouldReload) {
      //   loadCards();
    }
  };
  const deleteModal = (id) => {
    setDeleteModalShow(true);
    setId(id);
  };
  const [Deleteloading, setDeleteLoading] = useState(false);
  const deleteCardHandler = async () => {
    const data = {
      id: MainId,
    };
    try {
      setDeleteLoading(true);
      const res = await deleteRequestQuote(data);
      setDeleteLoading(false);
      setDeleteModalShow(false);
      setloadData(true);
    } catch (error) {
      setDeleteLoading(false);
    }
  };
  const RequestQuote = async (id) => {
    setLoadingRowId(id);
    const data = {
      id: id,
    };
    const response = await getEditQuote(data);
    // console.log("resss-----", response.data);
    localStorage.setItem(
      "setItemelementData",
      JSON.stringify(response.data.requestQuoteDB)
    );

    localStorage.setItem(
      "setItempartsDBdata",
      JSON.stringify(response.data.partsDBdata)
    );
    setLoadingRowId("");
    navigate("/quotes/quotes-detail");
  };

  function formatDate(dateString) {
    const date = new Date(dateString);

    // Extract day, month, and year
    const day = String(date.getUTCDate()).padStart(2, "0");
    const monthName = date.toLocaleString("default", { month: "long" }); // Full month name
    const year = date.getUTCFullYear();

    // Format as dd-mm-yyyy
    return `${day} ${monthName} ${year}`;
  }
  const handleClick = () => {
    localStorage.removeItem("setItemelementData");
    localStorage.removeItem("setItempartsDBdata");
    localStorage.removeItem("setItempartsDBdataPay");
    localStorage.removeItem("setItemelementDataPay");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 1:
        return {
          backgroundColor: "rgba(156,39,176,0.10)",
          color: "#9C27B0",
          padding: 6,
        };
      case 3:
        return {
          backgroundColor: "rgba(1,148,60,0.10)",
          color: "#01943C",
          padding: 6,
        };
      case 2:
        return {
          backgroundColor: "rgba(79,140,202,0.10)",
          color: "#4F8CCA",
          padding: 6,
        };
      case 0:
        return {
          backgroundColor: "rgba(250 ,204,21,0.10)",
          color: "#facc15",
          padding: 6,
        };
      default:
        return {};
    }
  };
  const columns = [
    {
      name: "Order Number",
      selector: (row) => "Quote #" + row.search_quote,
      sortable: false,
    },
    {
      name: "Materials",
      minWidth: "240px",
      selector: (row) => (
        <div className="badgematerials custom_badgess">
          <MaterialBadge materialDetails={row.material_details} />
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
        }).format(row.total_amount);

        return formattedAmount;
      },
    },
    {
      name: "Status",
      selector: (row) => (
        <div className="badgestatus" style={getStatusColor(row.status)}>
          Editing
        </div>
      ),
      sortable: false,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <Link
            className="btnpay"
            to=""
            disabled={loadingRowId === row._id ? true : false}
            onClick={() => {
              RequestQuote(row._id);
            }}
          >
            {loadingRowId === row._id ? (
              <Icon icon="eos-icons:loading" spin={true}></Icon>
            ) : (
              "View"
            )}
          </Link>
          <Link
            className="btnpay"
            to=""
            style={{ width: "70px" }}
            onClick={() => {
              deleteModal(row._id);
            }}
          >
            Delete
          </Link>
        </div>
      ),
    },
  ];

  const handleRowsPerPageChange = (newRowsPerPage, page) => {
    // console.log(" setPerPage", newRowsPerPage);
    setPerPage(newRowsPerPage);
  };

  return (
    <React.Fragment>
      <section className="myaccount ptb-50">
        <Container>
          <Card>
            <Card.Header>
              <div className="d-flex align-items-center justify-content-between  flex-wrap">
                <h5 className="quotes-head">Quotes</h5>
                <Link
                  // to=""
                  to="/quotes/quotes-detail"
                  className="btn btn-primary d-inline-flex align-items-center  justify-content-center min-width-259"
                  onClick={handleClick}
                >
                  Add New Quote
                </Link>
              </div>
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
                    responsive
                    pagination
                    paginationServer
                    paginationTotalRows={totalPage}
                    paginationDefaultPage={currentPage}
                    onChangePage={handlePageChange}
                    noDataComponent={
                      <div style={{ textAlign: "center", padding: "24px" }}>
                        <span>No Quotes to Display </span>
                      </div>
                    }
                    paginationPerPage={PerPage}
                    // responsive
                    // paginationRowsPerPageOptions={[]} // Hide rows per page dropdown
                    onChangeRowsPerPage={handleRowsPerPageChange}
                    className="custom-table custom-table2"
                    labelRowsPerPage=""
                  />
                </>
              )}
            </Card.Body>
          </Card>
        </Container>
      </section>
      <ConfirmationModal
        show={DeletemodalShow}
        onHide={handleCloseModal}
        title={"Are you sure?"}
        desc={"Are you sure you want to delete this quote?"}
        yesBtnText={"Yes"}
        noBtnText={"No"}
        onConfirm={deleteCardHandler}
        loading={Deleteloading}
        message="Do you want to delete this quote?"
      />
    </React.Fragment>
  );
};
export default Quotes;
