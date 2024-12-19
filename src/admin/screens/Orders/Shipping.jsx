import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  Button,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import {
  fetchOrdersInComplete,
  fetchOrdersInPackaging,
  getOrdersAdmin,
  moveOrderToQueue,
} from "../../../api/api";
import { toast } from "react-toastify";
import Pagination from "../../components/Pagination";
import OrderStatus from "../../components/OrderStatus";
import DateFormat from "../../components/DateFormat";
import MaterialBadge from "../../components/MaterialBadge";
import Amount from "../../../components/Amount";
const ShippingAddress = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPage, settotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [name, searchName] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const indexOfLastItem = currentPage * itemsPerPage;
  const handleSortChange = (e) => {
    const selectedValue = e.target.value;
    setSortOrder(selectedValue);
    loadOrders(1, name, selectedValue);
  };
  const loadOrders = async (page, search = "", sortOrder = "") => {
    try {
      setLoading(true);
      setOrders([]);
      settotalPage(1);
      const response = await fetchOrdersInPackaging(page, search, sortOrder);
      setOrders(response.data.data.updatedQuotes);
      settotalPage(response.data.data.total);
    } catch (error) {
      console.error("Error fetching cards:", error);
    } finally {
      setLoading(false);
    }
  };

  const onPageChange = (pageNumber) => {
    console.log(pageNumber, "response.data.");
    setCurrentPage(pageNumber);
    loadOrders(pageNumber);
  };
  useEffect(() => {
    loadOrders(currentPage);
  }, []);
  const getMonthYear = (dateStr) => {
    const date = new Date(dateStr);
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();
    return `${month}-${year}`; // Returns "MM/YYYY"
  };
  const [checkedItems, setCheckedItems] = useState({});
  const handleCheckboxChange = (id) => {
    setCheckedItems((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const [loadingQueue, setLoadingQueue] = useState(false);
  const moveQueue = () => {
    const checkedIds = Object.entries(checkedItems)
      .filter(([id, isChecked]) => isChecked)
      .map(([id]) => id);
    if (checkedIds.length === 0) {
      toast.error("Please check atleast one order");
    } else {
      checkedIds.forEach(async (id) => {
        const data = {
          id: id,
          move_status: 1,
        };
        try {
          setLoadingQueue(true);
          const res = await moveOrderToQueue(data);
        } catch (error) {
          toast.error("Error when order move to Queue");
        }
      });
      setTimeout(() => {
        setLoadingQueue(false);
        loadOrders();
      }, 4000);
    }
  };
  return (
    <React.Fragment>
      <Card>
        <CardHeader className="py-4">
          <h5>Shipping Orders</h5>
        </CardHeader>
        <CardBody>
          <Form>
            <Row className="px-2 gx-3">
              <Col lg={3} xxl={3}>
                <Form.Group className="form-group mb-2 searchfield">
                  <div className=" position-relative">
                    <Icon
                      icon="flowbite:search-solid"
                      className="position-absolute"
                    />
                    <Form.Control
                      type="text"
                      placeholder="Search WO"
                      value={name}
                      onChange={(e) => {
                        setCurrentPage(1);
                        searchName(e.target.value);
                        loadOrders(1, e.target.value, sortOrder);
                      }}
                      className="rounded-5"
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col lg={4} xxl={3}>
                <Form.Group className="form-group mb-2">
                  <Form.Select
                    className="rounded-5"
                    value={sortOrder}
                    onChange={handleSortChange}
                  >
                    <option disabled value="value1">
                      Sort By
                    </option>
                    <option value="false">Sort Newest to Oldest</option>
                    <option value="true">Sort Oldest to Newest</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col lg={2} xxl={3}>
                <Link
                  to={""}
                  className="btn btn-primary d-inline-flex align-items-center justify-content-center"
                  onClick={() => {
                    setCurrentPage(1);
                    setSortOrder("value1");
                    searchName("");
                    loadOrders(1);
                  }}
                >
                  {" "}
                  Clear
                </Link>
              </Col>
              {/* <Col lg={3} xxl={3} className="text-lg-end">
                <Button
                  variant={null}
                  onClick={moveQueue}
                  className="btn-outline-primary min-width-147"
                  disabled={loadingQueue}
                >
                  {loadingQueue ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    "Move To Queue"
                  )}
                </Button>
              </Col> */}
            </Row>
          </Form>
          <div className="table-responsive">
            <Table className="tablecustom pt-0">
              <tbody>
                {loading ? (
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
                ) : (
                  <>
                    {orders && orders.length > 0 ? (
                      orders.map((row) => {
                        return (
                          <tr>
                            <td>
                              <Link
                                className="workorders"
                                to={`/admin/orders-detail/${row._id}`}
                              >
                                <b>
                                  WO#
                                  {row.search_quote}
                                </b>
                              </Link>
                            </td>
                            <td>
                              <DateFormat dateString={row.createdAt} />
                            </td>
                            <td className="text-nowrap">
                              <MaterialBadge
                                materialDetails={row.material_details}
                              />
                            </td>
                            <td className="text-nowrap">
                              <span className="statusnew">
                                <OrderStatus status={row.status} />
                              </span>
                            </td>
                            <td className="text-nowrap">
                              {" "}
                              <Amount
                                amount={
                                  parseFloat(row.total_amount) +
                                  parseFloat(row.tax_amount)
                                }
                              />
                            </td>
                            {/* <td className="text-nowrap">
                          <b>Due:</b>
                          {row.due}
                        </td> */}
                            <td className="text-end">
                              {row.move_status == 0 && (
                                <div className="d-inline-flex align-items-center gap-3">
                                  {/* <Link className="btnedit">
                              <Icon icon="teenyicons:edit-outline" />
                            </Link> */}
                                  <Form.Check
                                    type="checkbox"
                                    checked={checkedItems[row._id] || false}
                                    onChange={() =>
                                      handleCheckboxChange(row._id)
                                    }
                                  />
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <p className="text-center mt-2">
                        <i> No orders available </i>
                      </p>
                    )}
                  </>
                )}
              </tbody>
            </Table>
          </div>
          {!loading && totalPage > 10 && (
            <Pagination
              totalItems={totalPage}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
          )}
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default ShippingAddress;
