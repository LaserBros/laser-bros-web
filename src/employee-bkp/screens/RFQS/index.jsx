import React, { useState } from "react";
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

const RFQS = () => {
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
      price: "100",
      due: "6-14-4",
    },
    {
      id: 2,
      wo: "LB-6-24-0002",
      material: ["CS0120", "A50120"],
      price: "150",
      due: "6-14-4",
    },
    {
      id: 3,
      wo: "LB-6-24-0003",
      material: ["CS0120", "A50120"],
      price: "175",
      due: "6-14-4",
    },
    {
      id: 4,
      wo: "LB-6-24-0004",
      material: ["SB0036", "A50120"],
      price: "189",
      due: "6-14-4",
    },
    {
      id: 5,
      wo: "LB-6-24-0005",
      material: ["CS0120", "A50120"],
      price: "169",
      due: "6-14-4",
    },
    {
      id: 6,
      wo: "LB-6-24-0006",
      material: ["CS0120", "SB0036"],
      price: "190",
      due: "6-14-4",
    },
    {
      id: 7,
      wo: "LB-6-24-0007",
      material: ["SB0036", "A50120"],
      price: "211",
      due: "6-14-4",
    },
  ];

  const getMaterialColor = (materials) => {
    // // console.log("materials", materials);
    switch (materials) {
      case "Aluminium 5052":
        return {
          backgroundColor: "rgb(164 194 244)",
        };
      case "Steel 1008":
        return {
          backgroundColor: "rgb(224 102 103)",
        };
      case "Steel A36":
        return {
          backgroundColor: "rgb(224 102 103)",
        };
      case "Aluminium 6061":
        return {
          backgroundColor: "rgb(160 197 233)",
        };
      case "Stainless Steel 304 (2b)":
        return {
          backgroundColor: "rgb(148 196 125)",
        };
      case "Stainless Steel 304 (#4)":
        return {
          backgroundColor: "rgb(148 196 125)",
        };
      case "Stainless Steel 316 (2b)":
        return {
          backgroundColor: "rgb(148 196 125)",
        };
      case "Brass 260":
        return {
          backgroundColor: "rgb(255 217 102)",
        };
      case "Custom i.e. Titanium, Incolnel, etc.":
        return {
          backgroundColor: "rgb(213 166 189)",
        };
      default:
        return {};
    }
  };

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
                {data.map((row) => (
                  <React.Fragment key={row.id}>
                    <tr>
                      <td className="text-nowrap">
                        <Link to="/rfqs/rfqs-detail" className="workorders">
                          <b>WO# {row.wo}</b>
                        </Link>
                      </td>
                      <td className="text-nowrap">
                        {row.material.map((materials, index) => (
                          <span
                            key={`${row.id}-${materials}-${index}`}
                            className="badgestatus me-2"
                            style={getMaterialColor(materials)}
                          >
                            {materials}
                          </span>
                        ))}
                      </td>
                      <td className="text-nowrap">
                        <div className="d-inline-flex align-items-center gap-3">
                          <Link className="btnaccept">
                            <Icon icon="icon-park-outline:check-one" />
                            Accept
                          </Link>
                          <Link className="btnreject">
                            <Icon icon="ion:close-circle-outline" />
                            Reject
                          </Link>
                        </div>
                      </td>
                      <td className="text-nowrap">${row.price}</td>
                      <td className="text-nowrap">
                        <b>Due:</b>
                        {row.due}
                      </td>
                      <td className="text-end">
                        <div className="d-inline-flex align-items-center gap-3">
                          <Link className="btnedit">
                            <Icon icon="teenyicons:edit-outline" />
                          </Link>
                          <Form.Check
                            type="checkbox"
                            checked={checkedItems[row.id] || false}
                            onChange={() => handleCheckboxChange(row.id)}
                          />
                        </div>
                      </td>
                    </tr>
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

export default RFQS;
