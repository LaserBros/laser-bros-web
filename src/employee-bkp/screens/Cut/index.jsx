import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  Button,
  Form,
  Image,
  Row,
  Col,
} from "react-bootstrap";
import file from "../../assets/img/file1.jpg";
import { Icon } from "@iconify/react";
import attachment from "../../assets/img/attachment.svg";
const Cut = () => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});

  const data = [
    {
      id: 1,
      material: "CS0120",
      parts: 1,
      due: "6-14-4",
      wo: "LB-6-24-0001",
      checkboxes: ["3KW", "12KW"],
      workOrders: [
        {
          id: 1,
          img: file,
          dimension: "11 in x 11 in",
          name: "CS0120(14)-plate1.dxf",
          qty: "13",
          price: "10",
          total: "100",
          labels: ["CS0120", "F15", "Bend", "Post OP"],
        },
      ],
    },
    {
      id: 2,
      material: "A50120",
      parts: 2,
      due: "7-18-4",
      wo: "LB-6-24-0002",
      checkboxes: ["3KW", "12KW"],
      workOrders: [
        {
          id: 1,
          img: file,
          dimension: "11 in x 11 in",
          name: "A50120(14)-plate1.dxf",
          qty: "13",
          price: "10",
          total: "100",
          labels: ["A50120", "F15", "Bend", "Post OP"],
        },
        {
          id: 2,
          img: file,
          dimension: "11 in x 11 in",
          name: "A50120(14)-plate1.dxf",
          qty: "13",
          price: "10",
          total: "100",
          labels: ["A50120", "F15", "Bend", "Post OP"],
        },
      ],
    },
    {
      id: 3,
      material: "SB0036",
      parts: 1,
      due: "7-18-4",
      wo: "LB-6-24-0003",
      checkboxes: ["3KW", "12KW"],
      workOrders: [
        {
          id: 1,
          img: file,
          dimension: "11 in x 11 in",
          name: "SB0036(14)-plate1.dxf",
          qty: "13",
          price: "10",
          total: "100",
          labels: ["SB0036", "F15", "Bend", "Post OP"],
        },
      ],
    },
  ];

  const handleExpandClick = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const handleCheckboxChange = (id) => {
    setCheckedItems((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  const getMaterialColor = (materials) => {
    // // console.log("materials", materials);
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
  return (
    <React.Fragment>
      <Card>
        <CardHeader className="py-4">
          <h5>Cut</h5>
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
              <Col lg={3} xxl={6} className="text-lg-end">
                <Button
                  variant={null}
                  className="btn-outline-primary min-width-147"
                >
                  Archive
                </Button>
              </Col>
            </Row>
          </Form>
          <div className="table-responsive">
            <Table className="tablecustom pt-0">
              <tbody>
                {data.map((row) => (
                  <React.Fragment key={row.id}>
                    <tr
                      className={expandedRow === row.id ? "expanded-row" : ""}
                    >
                      <td className="text-nowrap">
                        <b>Material:</b>
                        <span
                          className="badgestatus"
                          style={getMaterialColor(row.material)}
                        >
                          {row.material}
                        </span>
                      </td>
                      <td className="text-nowrap">
                        <b>Number Of Parts:</b>
                        {row.parts}
                      </td>
                      <td className="text-nowrap">
                        <b>Due:</b>
                        {row.due}
                      </td>
                      <td className="text-end">
                        <div className="d-inline-flex align-items-center">
                          <Button
                            variant="link"
                            onClick={() => handleExpandClick(row.id)}
                          >
                            {expandedRow === row.id ? (
                              <Icon icon="teenyicons:minimise-alt-outline" />
                            ) : (
                              <Icon icon="teenyicons:expand-alt-solid" />
                            )}
                          </Button>
                          <Form.Check
                            type="checkbox"
                            checked={checkedItems[row.id] || false}
                            onChange={() => handleCheckboxChange(row.id)}
                          />
                        </div>
                      </td>
                    </tr>
                    {expandedRow === row.id && (
                      <tr>
                        <td colSpan="4" style={{ borderRadius: 12 }}>
                          <Row className="expanded-top align-items-center mb-3">
                            <Col xs={5}>
                              <div className="d-inline-flex align-items-center checkbox-top gap-3">
                                {" "}
                                {row.checkboxes.map((option) => (
                                  <Form.Check
                                    key={option}
                                    type="checkbox"
                                    id={`${option}1`}
                                    label={option}
                                  />
                                ))}
                              </div>
                              <p className="workorders mb-0">WO# {row.wo}</p>
                            </Col>
                            <Col xs={7} className="text-end">
                              <div className="d-inline-flex align-items-center gap-3">
                                <div className="upload-download">
                                  <Icon icon="bytesize:download" />
                                  <span>Download DXF Files</span>
                                </div>
                                <div className="upload-download">
                                  <Icon icon="bytesize:upload" />
                                  <span>Upload Nest</span>
                                </div>
                                <div className="upload-download">
                                  <Icon icon="bytesize:download" />
                                  <span>Download Nest</span>
                                </div>
                              </div>
                            </Col>
                          </Row>

                          {row.workOrders.map((wo, index) => (
                            <div
                              key={index}
                              className="list-main  d-inline-flex justify-content-between w-100"
                            >
                              <div className="list-left d-inline-flex">
                                <div className="list-img-outer">
                                  <div className="list-img">
                                    <Image
                                      src={wo.img}
                                      alt={wo.wo}
                                      className="img-fluid"
                                    />
                                  </div>
                                  <span>{wo.dimension}</span>
                                </div>
                                <div className="list-content">
                                  <h2>
                                    {wo.name}{" "}
                                    <Icon icon="material-symbols-light:download-sharp" />
                                  </h2>
                                  <div className="list-qty d-inline-flex align-items-center gap-3">
                                    <span className="qty">
                                      <strong>QTY:</strong> {wo.qty}
                                    </span>
                                    <span className="price-total">
                                      ${wo.price}/ea.
                                    </span>
                                    <span className="price-total">
                                      ${wo.total}/total
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="list-checkboxes  d-inline-flex gap-3">
                                {wo.labels.map((label, index) => (
                                  <div
                                    className="custom-checkbox-container text-center"
                                    key={label}
                                  >
                                    <label
                                      key={`${row.id}-${label}-${index}`}
                                      className="custom-label"
                                      htmlFor={`${label}${wo.id}`}
                                      style={getMaterialColor(row.material)}
                                    >
                                      {label}
                                    </label>
                                    <Form.Check
                                      type="checkbox"
                                      id={`${label}${wo.id}`}
                                    />
                                  </div>
                                ))}
                              </div>
                              <div className="list-attachment text-center d-inline-flex flex-column align-items-center">
                                <Image
                                  src={attachment}
                                  className="img-fluid"
                                  alt=""
                                />
                                <span>Attachments</span>
                              </div>
                            </div>
                          ))}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default Cut;
