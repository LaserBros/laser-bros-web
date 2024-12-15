import React, { useEffect, useState } from "react";
import { Card, Col, Container, Image } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import nocart from "../../assets/img/no-cart.svg";
import { getOrders, reOrder } from "../../api/api";
import { toast } from "react-toastify";
import Pagination from "../../admin/components/Pagination";
import OrderStatus from "../../admin/components/OrderStatus";
import MaterialBadge from "../../admin/components/MaterialBadge";
export default function Orders() {
  // const navigate = useNavigation();
  const navigate = useNavigate();
  const [loadingResend, setLoadingResend] = useState(false);
  const [loadingRowId, setLoadingRowId] = useState(null);
  const [totalRows, setTotalRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, settotalPage] = useState(1);
  const [perPage] = useState(10);
  const [PerPage, setPerPage] = useState(10);
  const handleRowsPerPageChange = (newRowsPerPage, page) => {
    setPerPage(newRowsPerPage);
    loadOrders(currentPage, newRowsPerPage);
  };

  const OrderDetailClick = async (id) => {
    setLoadingRowId(id);
    const data = {
      id: id,
    };
    setLoadingResend(true);
    try {
      const res = await reOrder(data);
      // toast.success(
      //   "Order resend successfully. Please wait for admin approval"
      // );
      setLoadingResend(false);
      localStorage.setItem(
        "setItemelementData",
        JSON.stringify(res.data.mainQuoteCreate)
      );

      localStorage.setItem(
        "setItempartsDBdata",
        JSON.stringify(res.data.createSubQuote)
      );
      navigate("/quotes/quotes-detail");
      // navigate("/rfqs");
    } catch (error) {
      setLoadingResend(false);
      toast.error("Something wents wrong..");
    } finally {
      setLoadingRowId(null);
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
          <OrderStatus status={row.status} />
        </div>
      ),
      sortable: false,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <Link className="btnpay" to={`/orders/orders-detail/${row._id}`}>
            View
          </Link>
          <Link
            className="btnpay"
            to=""
            disabled={loadingRowId === row._id ? true : false}
            style={{ width: "70px" }}
            onClick={() => {
              OrderDetailClick(row._id);
            }}
          >
            {loadingRowId === row._id ? (
              <Icon icon="eos-icons:loading" spin={true}></Icon>
            ) : (
              "Reorder"
            )}
          </Link>
        </div>
      ),
    },
  ];
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadOrders = async (page, perPage) => {
    try {
      // setLoading(true);
      const response = await getOrders(page, perPage);
      setOrders(response.data.updatedQuotes);
      setTotalRows(response.data.total);
    } catch (error) {
      console.error("Error fetching cards:", error);
    } finally {
      setLoading(false);
    }
  };
  const formatDate = (dateCreate) => {
    const dateObj = new Date(dateCreate);
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const yearLastTwoDigits = String(dateObj.getFullYear()).slice(-2);
    return `Quote # ${month}-${yearLastTwoDigits}`;
  };
  useEffect(() => {
    loadOrders(currentPage);
  }, []);
  const [itemsPerPage] = useState(10);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const onPageChange = (pageNumber) => {
    console.log("Dssdsdssdsdsd");
    setCurrentPage(pageNumber);
    loadOrders(pageNumber);
  };

  const handlePageChange = (page) => {
    console.log("handlePageChange , handlePageChange", page);
    setCurrentPage(page);
    loadOrders(page);
  };
  const getMaterialsColor = (materials) => {
    // console.log("materials", materials);
    switch (materials) {
      case "Aluminium 5052":
        return {
          backgroundColor: "rgb(79 140 202)",
        };
      case "Steel 1008":
        return {
          backgroundColor: "rgb(225 31 38)",
        };
      case "Steel A36":
        return {
          backgroundColor: "rgb(225 31 38)",
        };
      case "Aluminium 6061":
        return {
          backgroundColor: "rgb(160 197 233)",
        };
      case "Stainless Steel 304 (2b)":
        return {
          backgroundColor: "rgb(42 92 23)",
        };
      case "Stainless Steel 304 (#4)":
        return {
          backgroundColor: "rgb(42 92 23)",
        };
      case "Stainless Steel 316 (2b)":
        return {
          backgroundColor: "rgb(42 92 23)",
        };
      case "Brass 260":
        return {
          backgroundColor: "rgb(255 186 22)",
        };
      case "Custom i.e. Titanium, Incolnel, etc.":
        return {
          backgroundColor: "rgb(115 103 240)",
        };
      default:
        return {};
    }
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

            <Card.Header>
              <h5>Orders</h5>{" "}
            </Card.Header>
            <Card.Body>
              {loading ? (
                <Col>
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
                </Col>
              ) : (
                <>
                  <DataTable
                    columns={columns}
                    data={orders}
                    responsive
                    pagination
                    paginationServer
                    paginationTotalRows={totalRows}
                    onChangePage={handlePageChange}
                    paginationPerPage={perPage}
                    noDataComponent={
                      <div style={{ textAlign: "center", padding: "24px" }}>
                        <span>No Orders to Display </span>
                      </div>
                    }
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
    </React.Fragment>
  );
}
