import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Container,
  Tab,
  Nav,
  Tabs,
  Table,
  Form,
} from "react-bootstrap";
// import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import { Link, useNavigate, useParams } from "react-router-dom";
import {
  AdmingetEditQuote,
  getAllCustomers,
  getParticularProfile,
  getParticularUserQuotes,
  updateCustomerTaxExempt,
  updateQuoteState,
} from "../../../api/api";
import ConfirmationModal from "../../../components/ConfirmationModal";
import QuoteRow from "../../components/Quotes";
import Pagination from "../../components/Pagination";
import DateFormat from "../../components/DateFormat";
import MaterialBadge from "../../components/MaterialBadge";
import { Icon } from "@iconify/react";
import OrderStatus from "../../components/OrderStatus";
import { toast } from "react-toastify";
const ViewCustomer = () => {
  const navigate = useNavigate();
  const [checkedItems, setCheckedItems] = useState({});

  const { id } = useParams();
  const [customer, setCustomer] = useState([]);
  const [Quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingData, setLoadingData] = useState(true);
  const handleClose = () => setModalShow(false);
  const [modalShow, setModalShow] = useState(false);
  const [title, setTitle] = useState("");
  const [Ids, setIds] = useState("");
  const [type, setType] = useState("");
  const [loadingRows, setLoadingRows] = useState({});
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, settotalPage] = useState(10);
  const [itemsPerPage] = useState(10);

  const EditQuote = async (id) => {
    const data = {
      id: id,
    };
    const res = await AdmingetEditQuote(data);
    console.log(res);
    localStorage.setItem(
      "setItempartsDBdataAdmin",
      JSON.stringify(res.data.partsDBdata)
    );
    localStorage.setItem(
      "setItemelementDataAdmin",
      JSON.stringify(res.data.requestQuoteDB)
    );
    localStorage.setItem("UserDataAdmin", JSON.stringify(res.data?.userDBdata));
    navigate("/admin/quotes/view-quote");
  };
  const [isTaxExempt, setIsTaxExempt] = useState("");
  const handleCheckboxChange = async (value) => {
    try {
      const data = {
        id: id,
        tax_exempt: value,
      };
      const res = await updateCustomerTaxExempt(data);
      setIsTaxExempt(value);
      toast.success("Customer tax settings updated");
    } catch (error) {
      toast.success("Something wents wrong. Please try again later");
    }
  };

  const loadCustomer = async (page) => {
    try {
      const data = {
        id: id,
      };
      setLoading(true);
      setCustomer([]);
      const response = await getParticularProfile(data);
      setCustomer(response.data);
      setIsTaxExempt(response.data?.tax_exempt);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching cards:", error);
    } finally {
      setLoading(false);
    }
  };
  const [currentTab, setCurrentTab] = useState("");
  useEffect(() => {
    setCurrentTab("quotes");
  }, []);
  const changeStatus = async () => {
    const id = Ids;
    const status = type;
    setLoadingRows((prevState) => ({
      ...prevState,
      [id]: true,
    }));
    try {
      setLoadingBtn(true);
      const res = await updateQuoteState(id, status);
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
      getParticularUser(currentPage, currentTab);
    }
  };

  const getParticularUser = async (page = 1, type = currentTab) => {
    try {
      const data = {
        id: id,
        type: type,
        page: page,
      };
      setLoadingData(true);
      // setCustomer([]);
      const response = await getParticularUserQuotes(data);

      settotalPage(response.data?.total);
      setQuotes(response.data?.updatedQuotes || []);
    } catch (error) {
      console.error("Error fetching cards:", error);
    } finally {
      setLoadingData(false);
    }
  };

  const handleTabSelect = (tabKey) => {
    settotalPage(1);
    setCurrentPage(1);
    setCurrentTab(tabKey);
    getParticularUser(1, tabKey);
  };
  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    getParticularUser(pageNumber, currentTab);
  };
  useEffect(() => {
    loadCustomer(currentPage);
    setCurrentTab("quotes");
    getParticularUser(1, "quotes");
  }, []);

  return (
    <React.Fragment>
      <section className="myaccount ptb-50">
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
          <Container>
            <div className="QuoteBillMain_div">
              <Row>
                <Col lg={6} md={6}>
                  <div className="QuoteBill_box">
                    <h4>Customer Details:</h4>
                    <p>
                      <b>Name :</b> {customer.full_name}
                    </p>
                    <p>
                      <b>Email :</b> {customer.email}
                    </p>
                    <p>
                      <b>Phone Number :</b> {customer.phone_number}
                    </p>
                    <p>
                      <b>Company Name :</b> {customer.company_name || "N/A"}
                    </p>
                  </div>
                </Col>
                <Col lg={6} md={6}>
                  <div className="QuoteBill_box account_show_tax">
                    <h4>Tax Exempt?</h4>
                    <Form>
                      <Form.Check
                        type="checkbox"
                        id="taxExempt"
                        label="Yes"
                        checked={isTaxExempt == 1 ? true : false}
                        onChange={() => handleCheckboxChange(1)}
                      />
                      <Form.Check
                        type="checkbox"
                        id="notTaxExempt"
                        label="No"
                        checked={isTaxExempt == 0 ? true : false}
                        onChange={() => handleCheckboxChange(0)}
                      />
                    </Form>
                  </div>
                </Col>
              </Row>
            </div>
            <Tabs
              // defaultActiveKey="quotes"
              onSelect={handleTabSelect}
              // activeKey={currentTab}
              id="uncontrolled-tab-example"
              className="viewCustomerTabs_div"
            >
              <Tab eventKey="quotes" title="Quotes">
                <div className="wrapper">
                  <div className="maincontent_diva">
                    <div className="card ">
                      <div className="card-body">
                        <table className="tablecustom table">
                          <tbody>
                            {loadingData ? (
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
                            ) : Quotes && Quotes.length === 0 ? (
                              <Col>
                                <p className="text-center gpwTNyClass">
                                  <i>No Quote's to Display</i>
                                </p>
                              </Col>
                            ) : (
                              Quotes.map((row) => (
                                <QuoteRow
                                  key={row._id}
                                  row={row}
                                  EditQuote={EditQuote}
                                />
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                      {totalPage > 10 && (
                        <Pagination
                          totalItems={totalPage}
                          itemsPerPage={itemsPerPage}
                          currentPage={currentPage}
                          onPageChange={onPageChange}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="rfq" title="RFQ's">
                <div className="wrapper">
                  <div className="maincontent_diva">
                    <div className="card pb-4">
                      <div className="card-body">
                        <div className="table-responsive">
                          <Table className="tablecustom pt-0">
                            <tbody>
                              {loadingData ? (
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
                              ) : Quotes.length === 0 ? (
                                <Col>
                                  <p className="text-center gpwTNyClass">
                                    <i>No request quote to display.</i>
                                  </p>
                                </Col>
                              ) : (
                                Quotes.map((row) => {
                                  return (
                                    <React.Fragment>
                                      <tr>
                                        <td className="text-nowrap">
                                          <Link
                                            // to="/admin/rfqs/rfqs-detail"
                                            className="workorders"
                                            // onClick={() => getQueue(row._id)}
                                          >
                                            <b>
                                              WO#
                                              {row.search_quote}
                                            </b>
                                          </Link>
                                        </td>
                                        <td>
                                          <DateFormat
                                            dateString={row.createdAt}
                                          />
                                        </td>

                                        <td className="text-nowrap">
                                          <MaterialBadge
                                            materialDetails={
                                              row.material_details
                                            }
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
                                                    setModalShow(true);
                                                    setTitle(
                                                      "Are you sure you want to reject this quote?"
                                                    );
                                                    setIds(row._id);
                                                    setType(3);
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
                                                  RFQ Accepted. Waiting for
                                                  payemnt
                                                </p>
                                              </>
                                            ) : (
                                              <>
                                                <p className="text-danger mb-0">
                                                  RFQ Rejected. Waiting for
                                                  payemnt
                                                </p>
                                              </>
                                            )}
                                          </div>
                                        </td>
                                        <td>
                                          {(row.status == 1 ||
                                            row.status == 2) && (
                                            <Link
                                              className="btnaccept"
                                              onClick={() => EditQuote(row._id)}
                                            >
                                              <Icon icon="tabler:edit" />
                                              Edit Quote
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
                                              row.total_bend_price
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
                        {!loadingData && totalPage > 10 && (
                          <Pagination
                            totalItems={totalPage}
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onPageChange={onPageChange}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="orders" title="Orders">
                <div className="wrapper">
                  <div className="maincontent_diva">
                    <div className="card">
                      <div className="card-body">
                        <div className="table-responsive">
                          <Table className="tablecustom pt-0">
                            <tbody>
                              {loadingData ? (
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
                                  {Quotes && Quotes.length > 0 ? (
                                    Quotes.map((row) => {
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
                                            <DateFormat
                                              dateString={row.createdAt}
                                            />
                                          </td>
                                          <td className="text-nowrap">
                                            <MaterialBadge
                                              materialDetails={
                                                row.material_details
                                              }
                                            />
                                          </td>
                                          <td className="text-nowrap">
                                            <span className="statusnew">
                                              <OrderStatus
                                                status={row.status}
                                              />
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
                                                {/* <Form.Check
                                                type="checkbox"
                                                checked={
                                                  checkedItems[row._id] || false
                                                }
                                                onChange={() =>
                                                  handleCheckboxChange(row._id)
                                                }
                                              /> */}
                                              </div>
                                            )}
                                          </td>
                                        </tr>
                                      );
                                    })
                                  ) : (
                                    <p className="text-center mt-2 gpwTNyClass">
                                      <i className="gpwTNyClass">
                                        {" "}
                                        No Orders to Display{" "}
                                      </i>
                                    </p>
                                  )}
                                </>
                              )}
                            </tbody>
                          </Table>
                        </div>
                        {!loadingData && totalPage > 10 && (
                          <Pagination
                            totalItems={totalPage}
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onPageChange={onPageChange}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>
            </Tabs>
          </Container>
        )}
      </section>
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

export default ViewCustomer;
