import React, { useEffect, useState } from "react";
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
  updateQuoteState,
} from "../../../api/api";

const RFQS = () => {
  const navigate = useNavigate();
  const [checkedItems, setCheckedItems] = useState({});
  const getQueue = (id) => {
    console.log(id, "----------");
  };
  const handleCheckboxChange = (id) => {
    setCheckedItems((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  const [loadingRows, setLoadingRows] = useState({});

  const changeStatus = async (status, id) => {
    setLoadingRows((prevState) => ({
      ...prevState,
      [id]: true,
    }));
    try {
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
      loadData();
    }
  };
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
    navigate("/admin/rfqs/edit-quote");
  };
  const getMaterialColor = (materials) => {
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
  const [loading, setLoading] = useState(true);
  const [quotes, setQuotes] = useState([]);
  const loadData = async () => {
    setLoading(true);
    try {
      const [response] = await Promise.all([AdminfetchRFQ()]);
      console.log(",response.data.data", response.data);
      setQuotes(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <React.Fragment>
      <Card>
        <CardHeader className="py-4">
          <h5>RFQ's</h5>
        </CardHeader>
        <CardBody>
          <Form>
            <Row className="px-2 gx-3">
              <Col lg={3} xxl={2}>
                <Form.Group className="form-group mb-2 searchfield">
                  <div className=" position-relative">
                    <Icon
                      icon="flowbite:search-solid"
                      className="position-absolute"
                    />
                    <Form.Control
                      type="text"
                      placeholder="Search WO"
                      className="rounded-5"
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col lg={3} xxl={2}>
                <Form.Group className="form-group mb-2">
                  <Form.Select className="rounded-5" defaultValue="value1">
                    <option disabled value="value1">
                      Sort By
                    </option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col lg={3} xxl={2}>
                <Form.Group className="form-group mb-2">
                  <Form.Select className="rounded-5" defaultValue="value1">
                    <option disabled value="value1">
                      Filter By
                    </option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Form>
          <div className="table-responsive">
            <Table className="tablecustom pt-0">
              <tbody>
                {loading ? (
                  <Col>
                    <p className="text-center mt-4">Loading...</p>{" "}
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
                    return (
                      <React.Fragment key={row._id}>
                        <tr>
                          <td className="text-nowrap">
                            <Link
                              // to="/admin/rfqs/rfqs-detail"
                              className="workorders"
                              onClick={() => getQueue(row._id)}
                            >
                              <b>
                                WO# {month}-{yearLastTwoDigits}-
                                {row.quote_number}
                              </b>
                            </Link>
                          </td>
                          <td className="text-nowrap">
                            <span
                              key={`${row._id}`}
                              className="badgestatus me-2"
                              style={getMaterialColor(
                                row.material_name1 + " " + row.material_grade1
                              )}
                            >
                              {row.material_code1}
                            </span>
                            {row.material_code2 && (
                              <span
                                key={`${row._id}`}
                                className="badgestatus me-2"
                                style={getMaterialColor(
                                  row.material_name2 + " " + row.material_grade2
                                )}
                              >
                                {row.material_code2}
                              </span>
                            )}
                          </td>
                          <td className="text-nowrap">
                            <div className="d-inline-flex align-items-center gap-3">
                              {row.status == 1 ? (
                                <>
                                  <Link
                                    className="btnaccept"
                                    onClick={() => changeStatus(2, row._id)}
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
                                    onClick={() => changeStatus(3, row._id)}
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
                                    RFQ Accepted. Waiting for payemnt
                                  </p>
                                </>
                              ) : (
                                <>
                                  <p className="text-danger mb-0">
                                    RFQ Rejected. Waiting for payemnt
                                  </p>
                                </>
                              )}
                            </div>
                          </td>
                          <td>
                            {row.status == 1 && (
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
                            }).format(row.total_amount)}
                          </td>
                        </tr>
                      </React.Fragment>
                    );
                  })
                )}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default RFQS;
