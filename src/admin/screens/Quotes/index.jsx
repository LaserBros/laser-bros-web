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
import { Link } from "react-router-dom";
import { AdmingetUnAllRequestQuotes } from "../../../api/api";
import Pagination from "../../components/Pagination";
const Quotes = () => {
  const [checkedItems, setCheckedItems] = useState({});
  const handleCheckboxChange = (id) => {
    setCheckedItems((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  const data = [
    {
      id: 1,
      wo: "LB-6-24-0001",
      material: ["CS0120", "A50120"],
    },
    {
      id: 2,
      wo: "LB-6-24-0002",
      material: ["CS0120", "A50120"],
    },
    {
      id: 3,
      wo: "LB-6-24-0003",
      material: ["CS0120", "A50120"],
    },
    {
      id: 4,
      wo: "LB-6-24-0004",
      material: ["SB0036", "A50120"],
    },
    {
      id: 5,
      wo: "LB-6-24-0005",
      material: ["CS0120", "A50120"],
    },
    {
      id: 6,
      wo: "LB-6-24-0006",
      material: ["CS0120", "SB0036"],
    },
    {
      id: 7,
      wo: "LB-6-24-0007",
      material: ["SB0036", "A50120"],
    },
  ];

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
  const [totalPage, settotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(1);
  const [name, searchName] = useState("");
  const loadData = async (page, search = "") => {
    setLoading(true);
    try {
      const [response] = await Promise.all([
        AdmingetUnAllRequestQuotes(page, search),
      ]);
      console.log(",response.data.data", response.data);
      setQuotes(response.data?.updatedQuotes || []);
      settotalPage(response.data?.total || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    loadData(pageNumber, name);
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
                      onChange={(e) => {
                        setCurrentPage(1);
                        searchName(e.target.value);
                        loadData(1, e.target.value);
                      }}
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
                      <React.Fragment>
                        <tr>
                          <td className="text-nowrap">
                            <Link
                              to="/quotes/quotes-detail"
                              className="workorders"
                            >
                              <b>
                                WO# LB-
                                {row.search_quote}
                              </b>
                            </Link>
                          </td>
                          <td className="text-nowrap">
                            {/* {row.material.map((materials, index) => ( */}
                            <span
                              className="badgestatus me-2"
                              style={getMaterialColor(
                                row.material_name1 + " " + row.material_grade1
                              )}
                            >
                              {row.material_code1}
                            </span>
                            {row.material_code2 && (
                              <span
                                className="badgestatus me-2"
                                style={getMaterialColor(
                                  row.material_name2 + " " + row.material_grade2
                                )}
                              >
                                {row.material_code2}
                              </span>
                            )}
                            {/* ))} */}
                          </td>
                          <td className="text-end">
                            <div className="d-inline-flex align-items-center gap-3">
                              <Link className="btnedit">
                                <Icon icon="teenyicons:bin-outline" />
                              </Link>
                              <Form.Check
                                type="checkbox"
                                checked={checkedItems[row._id] || false}
                                onChange={() => handleCheckboxChange(row._id)}
                              />
                            </div>
                          </td>
                        </tr>
                      </React.Fragment>
                    );
                  })
                )}
              </tbody>
            </Table>
          </div>
          {totalPage > 1 && (
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
