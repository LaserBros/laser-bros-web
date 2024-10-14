import React, { useEffect, useState } from "react";
import { Card, Col, Container, Image } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import nocart from "../../assets/img/no-cart.svg";
import { getOrders, reOrder } from "../../api/api";
import { toast } from "react-toastify";
export default function Orders() {
  // const navigate = useNavigation();
  const navigate = useNavigate();
  const [loadingResend, setLoadingResend] = useState(false);
  const [loadingRowId, setLoadingRowId] = useState(null);

  const OrderDetailClick = async (id) => {
    setLoadingRowId(id);
    const data = {
      id: id,
    };
    setLoadingResend(true);
    try {
      const res = await reOrder(data);
      toast.success(
        "Order resend successfully. Please wait for admin approval"
      );
      setLoadingResend(false);
      navigate("/rfqs");
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
      selector: (row) => row.order_number,
      sortable: false,
    },
    {
      name: "Materials",
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
    },
    {
      name: "Status",
      selector: (row) => (
        <div className="badgestatus" style={getStatusColor(row.status)}>
          {row.status == 0
            ? "Order Placed"
            : row.status == 1
            ? "In Progress"
            : row.status == 2
            ? "Shipped"
            : row.status == 3
            ? "Delivered"
            : ""}
        </div>
      ),
      sortable: false,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <Link className="btnview" to={`/orders/orders-detail/${row._id}`}>
            <Icon icon="hugeicons:view"></Icon>
          </Link>
          <Link
            className="btnreorder"
            to=""
            disabled={loadingRowId === row._id ? true : false}
            onClick={() => {
              OrderDetailClick(row._id);
            }}
          >
            {loadingRowId === row._id ? (
              <Icon icon="eos-icons:loading" spin={true}></Icon>
            ) : (
              <Icon icon="solar:reorder-line-duotone"></Icon>
            )}
          </Link>
        </div>
      ),
    },
  ];
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await getOrders();
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching cards:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadOrders();
  }, []);

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
                  <p className="text-center mt-4">Loading...</p>{" "}
                </Col>
              ) : (
                <DataTable
                  columns={columns}
                  data={orders}
                  responsive
                  pagination
                  className="custom-table custom-table2"
                />
              )}
            </Card.Body>
          </Card>
        </Container>
      </section>
    </React.Fragment>
  );
}
