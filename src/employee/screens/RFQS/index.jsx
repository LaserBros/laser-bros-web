import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  AdminfetchRFQ,
  AdmingetEditQuote,
  fetchRFQ,
  getParticularEditQuoteAdmin,
  updateQuoteState,
} from "../../../api/empApi";
import Pagination from "../../components/Pagination";
import CommonModal from "../../../components/Modal";
import ConfirmationModal from "../../../components/ConfirmationModal";
import DateFormat from "../../components/DateFormat";
import MaterialBadge from "../../components/MaterialBadge";
import RejectReason from "../../../components/RejectReason";
const RFQS = () => {
  const navigate = useNavigate();
  const [checkedItems, setCheckedItems] = useState({});
  const getQueue = (id) => {
    // console.log(id, "----------");
  };
  const handleCheckboxChange = (id) => {
    setCheckedItems((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const [reasonText, setReason] = useState("");

  const [loadingRows, setLoadingRows] = useState({});
  const [loadingBtn, setLoadingBtn] = useState(false);
  const handleClose = () => setModalShow(false);
  const [modalShow, setModalShow] = useState(false);
  const handleClose2 = () => setModalShow2(false);
  const [modalShow2, setModalShow2] = useState(false);

  const [title, setTitle] = useState("");
  const [Ids, setIds] = useState("");
  const [type, setType] = useState("");

  const [totalPage, settotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const changeStatus = async () => {
    const id = Ids;
    const status = type;
    const reason = reasonText;
    setLoadingRows((prevState) => ({
      ...prevState,
      [id]: true,
    }));
    try {
      setLoadingBtn(true);
      const res = await updateQuoteState(id, status, reason);
      if (status == 2) {
        toast.success("RFQ accepted successfully");
      }
      if (status == 3) {
        toast.success("RFQ rejected successfully");
      }
    } catch (error) {
      console.error("Error updating status", error);
    } finally {
      // Reset loading state for the specific row
      setLoadingRows((prevState) => ({
        ...prevState,
        [id]: false,
      }));
      setLoadingBtn(false);
      setModalShow(false);
      loadData(currentPage, name, sortOrder, true);
    }
  };

  const SubmitReason = (reason) => {
    setReason(reason);

    setModalShow(true);

    setTitle("Are you sure you want to reject this quote?");

    setType(3);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const debounceTimeout = useRef(null);

  const [name, searchName] = useState("");

  useEffect(() => {
    // Debounce effect

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      setCurrentPage(1);

      searchName(name);

      loadData(1, name, sortOrder);
    }, 500); // 500ms debounce delay

    return () => clearTimeout(debounceTimeout.current); // Cleanup
  }, [name]);

  const onPageChange = (pageNumber) => {
    // console.log(pageNumber, "response.data.");
    setCurrentPage(pageNumber);
    // loadData(pageNumber);
  };
  const [loadingId, setLoadingId] = useState("");
  const EditQuote = async (id) => {
    const data = {
      id: id,
    };
    setLoadingId(id);
    const res = await getParticularEditQuoteAdmin(data);
    // console.log(res);
    localStorage.setItem(
      "setItempartsDBdataAdmin",
      JSON.stringify(res.data.partsDBdata)
    );
    localStorage.setItem(
      "setItemelementDataAdmin",
      JSON.stringify(res.data.requestQuoteDB)
    );
    // localStorage.setItem("UserDataAdmin", JSON.stringify(res.data.userDBdata));
    localStorage.setItem(
      "shippingRates",
      JSON.stringify(res.data.shippingRates)
    );
    localStorage.setItem("taxRates", JSON.stringify(res.data.tax));
    localStorage.setItem("divideWeight", JSON.stringify(res.data.divideWeight));
    setLoadingId("");
    navigate("/employee/rfqs/edit-quote");
  };

  const [loading, setLoading] = useState(true);
  const [quotes, setQuotes] = useState([]);
  // const [name, searchName] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const handleSortChange = (e) => {
    const selectedValue = e.target.value;
    setSortOrder(selectedValue);
    loadData(1, name, selectedValue);
  };

  const loadData = async (page, search = "", sortOrder = "", type) => {
    if (!type) {
      setLoading(true);
    }
    try {
      if (!type) {
        setQuotes([]);
      }
      const [response] = await Promise.all([
        AdminfetchRFQ(page, search, sortOrder),
      ]);
      setQuotes(response.data.updatedQuotes);
      settotalPage(response.data.total);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(currentPage);
  }, [currentPage]);

  return (
    <React.Fragment>
      <Card>
        <CardHeader className="py-4">
          <h5>RFQ's</h5>
        </CardHeader>
        <CardBody>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
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
                      onChange={(e) => searchName(e.target.value)}
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
              <Col lg={4} xxl={3}>
                <Link
                  to={""}
                  className="btn btn-primary d-inline-flex align-items-center justify-content-center"
                  onClick={() => {
                    setCurrentPage(1);
                    setSortOrder("value1");
                    searchName("");
                    // loadData(1);
                  }}
                >
                  {" "}
                  Clear
                </Link>
              </Col>
            </Row>
          </Form>
          <div className="table-responsive">
            <Table className="tablecustom pt-0">
              <tbody>
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
                ) : quotes.length === 0 ? (
                  <Col>
                    <p className="text-center">
                      <i>No request quote found.</i>
                    </p>
                  </Col>
                ) : (
                  quotes.map((row) => {
                    const dateObj = new Date(row.createdAt);
                    const day = String(dateObj.getDate()).padStart(2, "0"); // Get the day of the month
                    const month = String(dateObj.getMonth() + 1).padStart(
                      2,
                      "0"
                    );
                    const yearLastTwoDigits = String(
                      dateObj.getFullYear()
                    ).slice(-2);
                    const hasNotes = row.material_details?.some(
                      (sub) =>
                        sub && // Ensure sub is not null or undefined
                        ((sub.notes_text && sub.notes_text.trim().length > 0) ||
                          (sub.notes_admin && sub.notes_admin.length > 0))
                    );
                    return (
                      <React.Fragment>
                        <tr>
                          <td className="text-nowrap">
                            <Link
                              // to="/employee/rfqs/rfqs-detail"
                              className="workorders d-flex gap-1"
                              onClick={() => getQueue(row._id)}
                            >
                              <b>
                                WO#
                                {row.search_quote}
                              </b>
                              {hasNotes && (
                                <span className="expansion_tag_manage">!</span>
                              )}
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
                            <div className="d-inline-flex align-items-center gap-3">
                              {row.status == 1 ? (
                                <>
                                  <Link
                                    className="btnaccept"
                                    // onClick={() => changeStatus(2, row._id)}
                                    onClick={() => {
                                      setModalShow(true);
                                      setTitle(
                                        "Are you sure you want to accept this quote?"
                                      );
                                      setIds(row._id);
                                      setType(2);
                                    }}
                                  >
                                    {loadingRows[row._id] ? (
                                      <span
                                        role="status"
                                        aria-hidden="true"
                                        className="spinner-border spinner-border-sm"
                                      ></span>
                                    ) : (
                                      <>
                                        <Icon icon="icon-park-outline:check-one" />
                                        Accept
                                      </>
                                    )}
                                  </Link>
                                  <Link
                                    className="btnreject"
                                    // onClick={() => changeStatus(3, row._id)}
                                    onClick={() => {
                                      setModalShow2(true);
                                      // setModalShow(true);
                                      // setTitle(
                                      //   "Are you sure you want to reject this quote?"
                                      // );
                                      setIds(row._id);
                                      // setType(3);
                                    }}
                                  >
                                    {loadingRows[row._id] ? (
                                      <span
                                        role="status"
                                        aria-hidden="true"
                                        className="spinner-border spinner-border-sm"
                                      ></span>
                                    ) : (
                                      <>
                                        <Icon icon="ion:close-circle-outline" />
                                        Reject
                                      </>
                                    )}
                                  </Link>
                                </>
                              ) : row.status == 2 ? (
                                <>
                                  <p className="text-success mb-0">
                                    RFQ Accepted. Waiting for payment
                                  </p>
                                </>
                              ) : (
                                <>
                                  <p className="text-danger mb-0">
                                    RFQ Rejected. Waiting for payment
                                  </p>
                                </>
                              )}
                            </div>
                          </td>
                          <td>
                            {(row.status == 1 || row.status == 2) && (
                              <Link
                                className="btnaccept"
                                onClick={() => EditQuote(row._id)}
                              >
                                {loadingId == row._id ? (
                                  <>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span
                                      className="spinner-border spinner-border-sm"
                                      role="status"
                                      aria-hidden="true"
                                    ></span>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  </>
                                ) : (
                                  <>
                                    <Icon icon="tabler:edit" />
                                    Edit Quote
                                  </>
                                )}
                              </Link>
                            )}
                          </td>
                          <td className="text-nowrap">
                            {new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "USD", // Change to your desired currency
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }).format(
                              row.total_amount +
                                row.total_bend_price +
                                row.shipping_price
                            )}
                          </td>
                        </tr>
                      </React.Fragment>
                    );
                  })
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
      <RejectReason
        show3={modalShow2}
        name={""}
        handleClose3={handleClose2}
        title={"Reason for Reject?"}
        onSave={SubmitReason}
      />
      <ConfirmationModal
        show={modalShow}
        onHide={handleClose}
        title={"Are you sure?"}
        desc={title}
        yesBtnText={"Yes"}
        noBtnText={"No"}
        onConfirm={changeStatus}
        loading={loadingBtn}
      />
    </React.Fragment>
  );
};

export default RFQS;
