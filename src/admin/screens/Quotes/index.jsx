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
import {
  AdmingetEditQuote,
  AdmingetUnAllRequestQuotes,
} from "../../../api/api";
import Pagination from "../../components/Pagination";
import DateFormat from "../../components/DateFormat";
import Amount from "../../../components/Amount";
import QuoteRow from "../../components/Quotes";
const Quotes = () => {
  const navigate = useNavigate();
  const [checkedItems, setCheckedItems] = useState({});
  const handleCheckboxChange = (id) => {
    setCheckedItems((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };


  const [loading, setLoading] = useState(true);
  const [quotes, setQuotes] = useState([]);
  const [totalPage, settotalPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [name, searchName] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const handleSortChange = (e) => {
    const selectedValue = e.target.value;
    setSortOrder(selectedValue);
    loadData(1, name, selectedValue);
  };
  const loadData = async (page, search = "", sortOrder = "") => {
    setLoading(true);
    try {
      const [response] = await Promise.all([
        AdmingetUnAllRequestQuotes(page, search, sortOrder),
      ]);
      setQuotes(response.data?.updatedQuotes || []);
      settotalPage(response.data?.total || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const EditQuote = async (id) => {
    const data = {
      id: id,
    };
    const res = await AdmingetEditQuote(data);
    // console.log(res);
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

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    loadData(pageNumber, name, sortOrder);
  };
  useEffect(() => {
    loadData(currentPage);
  }, []);
  return (
    <React.Fragment>
      <Card>
        <CardHeader className="py-4">
          <h5>Quotes</h5>
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
                      value={name}
                      placeholder="Search WO"
                      onChange={(e) => {
                        setCurrentPage(1);
                        searchName(e.target.value);
                        loadData(1, e.target.value, sortOrder);
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
              <Col lg={4} xxl={3}>
                <Link
                  to={""}
                  className="btn btn-primary d-inline-flex align-items-center justify-content-center"
                  onClick={() => {
                    setCurrentPage(1);
                    setSortOrder("value1");
                    searchName("");
                    loadData(1);
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
                ) : quotes && quotes.length === 0 ? (
                  <Col>
                    <p className="text-center">
                      <i>No quote found.</i>
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
                      <QuoteRow
                        key={row._id}
                        row={row}
                        EditQuote={EditQuote}
                      />
                    );
                  })
                )}
              </tbody>
            </Table>
          </div>
          {totalPage > 10 && (
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

export default Quotes;
