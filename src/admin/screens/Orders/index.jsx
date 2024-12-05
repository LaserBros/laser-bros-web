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
  getAllMaterialCodesFilter,
  getBendingFilter,
  getFinishingFilter,
  getOrdersAdmin,
  getSpecificFilters,
  moveOrderToQueue,
} from "../../../api/api";
import { toast } from "react-toastify";
import Pagination from "../../components/Pagination";
import OrderStatus from "../../components/OrderStatus";
import DateFormat from "../../components/DateFormat";
import MaterialBadge from "../../components/MaterialBadge";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPage, settotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [name, searchName] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [filter, setFilter] = useState("");
  const [filter_select, setfilterSelect] = useState("");
  const [filterOptions, setFilterOptions] = useState([]);
  const [operation, setoperation] = useState("");
  const indexOfLastItem = currentPage * itemsPerPage;

  const getMaterialColor = (materials) => {
    switch (materials) {
      case "Aluminium 5052":
        return { backgroundColor: "rgb(79 140 202)", color: "#fff" };
      case "Steel 1008":
      case "Steel A36":
        return { backgroundColor: "rgb(225 31 38)", color: "#fff" };
      case "Aluminium 6061":
        return { backgroundColor: "rgb(160 197 233)", color: "#fff" };
      case "Stainless Steel 304 (2b)":
      case "Stainless Steel 304 (#4)":
      case "Stainless Steel 316 (2b)":
        return { backgroundColor: "rgb(42 92 23)", color: "#fff" };
      case "Brass 260":
        return { backgroundColor: "rgb(255 186 22)", color: "#fff" };
      case "Custom i.e. Titanium, Incolnel, etc.":
        return { backgroundColor: "rgb(115 103 240)", color: "#fff" };
      default:
        return {};
    }
  };

  const handleFilterChange = async (e) => {
    const selectedValue = e.target.value;
    setFilter(selectedValue);
    let res = "";

    if (selectedValue === "Bending") {
      res = await getBendingFilter();
    }
    if (selectedValue === "Cutting") {
      res = await getAllMaterialCodesFilter();
    }
    if (selectedValue === "Finishing") {
      res = await getFinishingFilter();
    }

    if (res?.data) {
      setFilterOptions(res.data);
    } else {
      setFilterOptions([]);
    }
    if (selectedValue == "post_ops") {
      setFilterOptions([
        { value: "Yes", _id: "1" },
        { value: "No", _id: "0" },
      ]);
    }
  };
  // const handleSortChange = (value) => {
  //   const selectedValue = value;
  //   setSortOrder(selectedValue);
  //   loadOrders(1, name, selectedValue, filter, filter_select);
  // };
  const [tags, setTags] = useState([]);
  const [selecttag, setSelectTag] = useState("");
  const [Phase, setPhase] = useState("");
  const [SortVal, setSort] = useState("");
  const [loadingTags, setloadingTags] = useState(false);
  const loadOrders = async (
    query = "",
    page = "",
    type = "",
    material_code = "",
    move_status = "",
    postOps = "",
    ascending = ""
  ) => {
    try {
      setLoading(true);
      setOrders([]);
      const response = await getOrdersAdmin(
        query,
        page,
        type,
        material_code,
        move_status,
        postOps,
        ascending
      );
      setOrders(response.data.data.updatedQuotes);
      settotalPage(response.data.data.total);
    } catch (error) {
      setOrders([]);
      console.error("Error fetching cards:", error);
    } finally {
      setLoading(false);
    }
  };
  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    loadOrders(
      name,
      pageNumber,
      operation,
      operation == "cutting" ? selecttag : "",
      Phase,
      operation == "post_ops" ? selecttag : "",
      SortVal
    );
  };
  useEffect(() => {
    loadOrders(
      name,
      currentPage,
      operation,
      operation === "cutting" ? selecttag : "",
      Phase,
      operation === "post_ops" ? selecttag : "",
      SortVal
    );
  }, [SortVal, Phase, selecttag, operation, currentPage, name]);
  const handleSortChangeFilter = async (type, data) => {
    if (type == "sort") {
      setSort(data);
    }
    if (type == "phase") {
      setPhase(data);
    }
    if (type == "tags") {
      setSelectTag(data);
    }
    // if (type == "sort" || type == "phase" || type == "tags") {
    //   loadOrders(
    //     name,
    //     currentPage,
    //     operation,
    //     operation == "cutting" ? selecttag : "",
    //     Phase,
    //     operation == "post_ops" ? selecttag : "",
    //     SortVal
    //   );
    // }
    if (type == "operation") {
      setoperation(data);
      setloadingTags(true);
      const res = await getSpecificFilters(data, 0);
      setTags(res.data.updatedQuotes);
      setloadingTags(false);
    }
  };

  const FilterClear = async (type, Typedata) => {
    if (type == "search_name") {
      searchName("");
    }
    if (type == "sort") {
      setSort(Typedata);
    }
    if (type == "phase") {
      setPhase(Typedata);
    }
    if (type == "tags") {
      setSelectTag(Typedata);
      setTags("");
    }
    if (type == "operation") {
      setoperation("");
      setSelectTag("");
      setTags("");
    }
    if (type == "sort" || type == "phase" || type == "tags") {
      loadOrders(
        name,
        currentPage,
        operation,
        operation == "cutting" ? selecttag : "",
        Phase,
        operation == "post_ops" ? selecttag : "",
        SortVal
      );
    }
  };

  useEffect(() => {
    loadOrders("", currentPage);
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
        loadOrders("", currentPage);
      }, 4000);
    }
  };
  return (
    <React.Fragment>
      <Card>
        <CardHeader className="py-4">
          <h5>Orders</h5>
        </CardHeader>
        <CardBody>
          <Form>
            <Row className="px-2 gx-3">
              <Col lg={3} xxl={3} className="mb-3">
                <Form.Group className="form-group mb-2 SearchFilterfield">
                  <div className="position-relative">
                    <Icon
                      icon="flowbite:search-solid"
                      // onClick={() => FilterClear("search_name", "")}
                      className="position-absolute search_icon"
                    />
                    <Form.Control
                      type="text"
                      placeholder="Search WO"
                      value={name}
                      onChange={(e) => {
                        setCurrentPage(1);
                        searchName(e.target.value);
                        loadOrders(
                          e.target.value,
                          1,
                          operation,
                          operation == "cutting" ? selecttag : "",
                          Phase,
                          operation == "post_ops" ? selecttag : "",
                          SortVal
                        );
                        // loadOrders(
                        //   1,
                        //   e.target.value,
                        //   sortOrder,
                        //   filter,
                        //   filter_select
                        // );
                      }}
                      className="rounded-5"
                    />
                  </div>

                  <div className="sortByFilterBtn">
                    <Icon icon="fa6-solid:filter" />
                    {name != "" && (
                      <Icon
                        className="sortFilterClose"
                        onClick={() => FilterClear("search_name", "")}
                        icon="zondicons:close-solid"
                      />
                    )}
                  </div>
                </Form.Group>
              </Col>
            </Row>
            <Row className="px-2 gx-3">
              <Col lg={9} xxl={9}>
                <div className="sortByMain_box">
                  <div className="sortByMain_head">
                    <span className="sortByHead_box">Sort By : </span>
                    <div className="sortByFilterBtn">
                      <Icon icon="fa6-solid:filter" />
                      {SortVal !== "" && (
                        <Icon
                          className="sortFilterClose"
                          onClick={() => FilterClear("sort", "")}
                          icon="zondicons:close-solid"
                        />
                      )}
                    </div>
                  </div>
                  <div className="SortFilterBtnBox">
                    <Button
                      className={`SortFilter_btn ${
                        SortVal === true ? "active" : ""
                      }`}
                      variant={null}
                      onClick={() => handleSortChangeFilter("sort", true)}
                    >
                      Old to New
                    </Button>
                    <Button
                      className={`SortFilter_btn ${
                        SortVal === false ? "active" : ""
                      }`}
                      variant={null}
                      onClick={() => handleSortChangeFilter("sort", false)}
                    >
                      New to Old
                    </Button>
                  </div>
                </div>
                <div className="sortByMain_box">
                  <div className="sortByMain_head">
                    <span className="sortByHead_box">Phase : </span>
                    <div className="sortByFilterBtn">
                      <Icon icon="fa6-solid:filter" />
                      {Phase !== "" && (
                        <Icon
                          className="sortFilterClose"
                          onClick={() => FilterClear("phase", "")}
                          icon="zondicons:close-solid"
                        />
                      )}
                    </div>
                  </div>
                  <div className="SortFilterBtnBox">
                    <Button
                      className={`SortFilter_btn ${
                        Phase === 0 ? "active" : ""
                      }`}
                      variant={null}
                      onClick={() => handleSortChangeFilter("phase", 0)}
                    >
                      New
                    </Button>
                    <Button
                      className={`SortFilter_btn ${
                        Phase === 1 ? "active" : ""
                      }`}
                      variant={null}
                      onClick={() => handleSortChangeFilter("phase", 1)}
                    >
                      In Progress
                    </Button>
                    <Button
                      className={`SortFilter_btn ${
                        Phase === 2 ? "active" : ""
                      }`}
                      variant={null}
                      onClick={() => handleSortChangeFilter("phase", 2)}
                    >
                      Ready to SHIP
                    </Button>
                  </div>
                </div>
                <div className="sortByMain_box">
                  <div className="sortByMain_head">
                    <span className="sortByHead_box">Operation : </span>
                    <div className="sortByFilterBtn">
                      <Icon icon="fa6-solid:filter" />
                      {operation !== "" && (
                        <Icon
                          className="sortFilterClose"
                          onClick={() => FilterClear("operation", "")}
                          icon="zondicons:close-solid"
                        />
                      )}
                    </div>
                  </div>
                  <div className="SortFilterBtnBox">
                    <Button
                      className={`SortFilter_btn ${
                        operation == "cutting" ? "active" : ""
                      }`}
                      variant={null}
                      onClick={() =>
                        handleSortChangeFilter("operation", "cutting")
                      }
                    >
                      Cutting
                    </Button>
                    <Button
                      className={`SortFilter_btn ${
                        operation == "post_ops" ? "active" : ""
                      }`}
                      variant={null}
                      onClick={() =>
                        handleSortChangeFilter("operation", "post_ops")
                      }
                    >
                      POST OPS
                    </Button>
                  </div>
                </div>
                {loadingTags ? (
                  <>
                    <span
                      role="status"
                      aria-hidden="true"
                      className="spinner-border spinner-border-sm text-center"
                      style={{
                        // margin: "0 auto",
                        // display: "block",
                        marginLeft: "30px",
                        marginTop: "20px",
                        marginBottom: "20px",
                      }}
                    ></span>
                  </>
                ) : (
                  tags?.length > 0 && (
                    <div className="sortByMain_box">
                      <div className="sortByMain_head">
                        <span className="sortByHead_box">Tag : </span>
                        <div className="sortByFilterBtn">
                          <Icon icon="fa6-solid:filter" />
                          {selecttag !== "" && (
                            <Icon
                              className="sortFilterClose"
                              onClick={() => FilterClear("tags", "")}
                              icon="zondicons:close-solid"
                            />
                          )}
                        </div>
                      </div>
                      <div className="tagFilterBtnBox">
                        {operation === "post_ops"
                          ? tags.map((item, index) => {
                              return (
                                <Button
                                  key={index}
                                  className={`tagFilter_btn ${
                                    selecttag == item ? "active" : ""
                                  } `}
                                  onClick={() =>
                                    handleSortChangeFilter("tags", item)
                                  }
                                  variant={null}
                                >
                                  {item}
                                </Button>
                              );
                            })
                          : tags.map((item, index) => {
                              // if (Array.isArray(item)) {
                              return (
                                <div key={index}>
                                  {/* {item.map((subItem, subIndex) => ( */}
                                  <Button
                                    key={index}
                                    style={getMaterialColor(
                                      `${item?.material_name} ${item?.material_grade}`
                                    )}
                                    className={`tagFilter_btn ${
                                      selecttag == item?.material_code
                                        ? "active"
                                        : ""
                                    } `}
                                    onClick={() =>
                                      handleSortChangeFilter(
                                        "tags",
                                        item?.material_code
                                      )
                                    }
                                    variant={null}
                                  >
                                    {item?.material_code}
                                  </Button>
                                  {/* ))} */}
                                </div>
                              );
                              // } else {
                              //   // Handle unexpected formats in non-"cutting" operations
                              //   return (
                              //     <p key={index} style={{ color: "red" }}>
                              //       Invalid tag formatdddd for this operation
                              //     </p>
                              //   );
                              // }
                            })}
                      </div>
                    </div>
                  )
                )}
                <div>
                  {/* <Button onClick={handleSortChange("false")}>Cutting</Button>
                  <Button onClick={handleSortChange("true")}>POST OPS</Button> */}
                </div>
                {/* <Form.Group className="form-group mb-2">
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
                </Form.Group> */}
              </Col>
              {/* <Col lg={2} xxl={2}>
                <Form.Group className="form-group mb-2">
                  <Form.Select
                    className="rounded-5"
                    value={filter}
                    onChange={handleFilterChange}
                  >
                    <option selected value="">
                      Sort By Filter
                    </option>
                    <option value="Cutting">Cutting</option>
                    <option value="Finishing">Finishing</option>
                    <option value="Bending">Bending</option>
                    <option value="post_ops">Post Ops</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col lg={2} xxl={2}>
                <Form.Group className="form-group mb-2">
                  <Form.Select
                    className="rounded-5"
                    value={filter_select}
                    onChange={handleFilterApply}
                  >
                    <option value="">Choose options</option>
                    {filterOptions.map((option) => (
                      <option value={option._id}>{option.value}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col> */}
              {/* <Col lg={3} xxl={2}>
                <Link
                  to={""}
                  className="btn btn-primary d-inline-flex align-items-center justify-content-center"
                  onClick={() => {
                    setCurrentPage(1);
                    setSortOrder("value1");
                    searchName("");
                    loadOrders(1);
                    setfilterSelect("");
                    setFilter("");
                  }}
                >
                  {" "}
                  Clear
                </Link>
              </Col> */}
              <Col lg={3} xxl={3} className="text-lg-end align-self-end">
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
              </Col>
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
                              {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD", // Change to your desired currency
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }).format(row.total_amount)}
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

export default Orders;
