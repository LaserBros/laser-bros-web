import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Row,
  Col,
  Image,
  Form,
} from "react-bootstrap";
import { Icon } from "@iconify/react";
import barcode from "../../assets/img/barcode.jpg";
import { Link } from "react-router-dom";
import file from "../../assets/img/file1.jpg";
import attachment from "../../assets/img/attachment.svg";
import AddNote from "../../components/AddNote";
const RfqsDetail = () => {
  const [modalShow, setModalShow] = useState(false);
  const handleShow = () => setModalShow(true);
  const handleClose = () => setModalShow(false);
  const workOrders = [
    {
      id: 1,
      img: file,
      dimension: "11 in x 11 in",
      name: "CS0120(14)-jeepweldtab.dxf",
      qty: "14",
      price: "10",
      total: "100",
      materials: "CS0120",
      labels: ["CS0120", "F2", "Bend", "Post OP"],
    },
    {
      id: 2,
      img: file,
      dimension: "11 in x 11 in",
      name: "A50090(14)-plate1.dxf",
      qty: "14",
      price: "10",
      total: "100",
      materials: "A50090",
      labels: ["A50120", "F15", "Bend", "Post OP"],
    },
    {
      id: 3,
      img: file,
      dimension: "11 in x 11 in",
      name: "CS0120(14)-jeepweldtab.dxf",
      qty: "14",
      price: "10",
      total: "100",
      materials: "CS0120",
      labels: ["CS0120", "F15", "Bend", "Post OP"],
    },
  ];
  const getLabelsColor = (labels) => {
    switch (labels) {
      case "A50090":
        return {
          backgroundColor: "#4F8CCA",
        };
      case "CS0120":
        return {
          backgroundColor: "#E11F26",
        };
      case "SB0036":
        return {
          backgroundColor: "#2A5C17",
        };
      default:
        return {};
    }
  };
  return (
    <React.Fragment>
      <Card>
        <CardHeader className="d-flex align-items-center justify-content-between flex-wrap">
          <h5>WO#6-24-0001</h5>
          <div className="d-flex gap-2">
            <Button
              as={Link}
              className="btnaccept d-inline-flex align-items-center justify-content-center"
              variant={null}
            >
              <Icon icon="icon-park-outline:check-one" />
              Accept
            </Button>
            <Button
              as={Link}
              className="btnreject d-inline-flex align-items-center justify-content-center"
              variant={null}
            >
              <Icon icon="ion:close-circle-outline" />
              Reject
            </Button>
            <Button
              as={Link}
              to="/rfqs"
              className="d-inline-flex align-items-center justify-content-center"
            >
              Back To RFQ's
            </Button>
          </div>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md={6} lg={4} xl={3} className="mb-3">
              <div className="orders-card ">
                <h4>John Smith</h4>
                <p>Van Welder LLC</p>
                <p>909 E. Elm St.</p>
                <p>Suite 102</p>
                <p className="mb-0">Graham, NC 27253</p>
              </div>
            </Col>
            <Col md={6} lg={4} xl={3} className="mb-3">
              <div className="orders-card">
                <div className="d-flex align-items-center mb-3">
                  <label>Order Date: </label> <span>6-9-24</span>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <label>Due Date: </label> <span>-</span>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <label>Order Amount: </label> <span>-</span>
                </div>
                <div className="d-flex align-items-center">
                  <label>Status: </label> <span>-</span>
                </div>
              </div>
            </Col>
            <Col md={6} lg={4} xl={6} className="text-xl-end mb-3">
              <Image src={barcode} className="img-fluid mb-3" alt="" />
              <div className="d-flex align-items-center justify-content-xl-end gap-3">
                <div className="text-center download-wo-allfiles">
                  <Icon icon="solar:file-download-linear" />
                  <p className="mb-0">Download WO</p>
                </div>
                <div className="text-center download-wo-allfiles">
                  <Icon icon="bytesize:download" />
                  <p className="mb-0">Download All Files</p>
                </div>
              </div>
            </Col>
          </Row>
          <div className="orders-shipping d-flex align-items-center justify-content-between flex-wrap">
            <div className="d-inline-flex align-items-center gap-2 my-1">
              <b>In this order:</b>
              <span
                className="badgestatus"
                style={{ backgroundColor: "#e11f26" }}
              >
                CS0120
              </span>
              <span
                className="badgestatus"
                style={{ backgroundColor: "#4F8CCA" }}
              >
                A50120
              </span>
            </div>
            <div className="d-inline-flex align-items-center gap-2 my-1">
              <b>Shipping:</b>
              <span
                className="badgestatus"
                style={{ backgroundColor: "#CB6CE6" }}
              >
                UPS
              </span>
            </div>
          </div>
          <div className="orders-detail mt-3">
            {workOrders.map((wo, index) => (
              <div
                key={index}
                className="list-main  d-inline-flex justify-content-between w-100"
              >
                <div className="list-left d-inline-flex">
                  <div className="list-img-outer">
                    <div className="list-img">
                      <Image src={wo.img} alt={wo.wo} className="img-fluid" />
                    </div>
                    <span>{wo.dimension}</span>
                  </div>
                  <div className="list-content">
                    <h2>
                      {wo.name}{" "}
                      <Icon icon="material-symbols-light:download-sharp" />
                    </h2>
                    <div className="list-qty d-flex align-items-center gap-3 mb-3">
                      <span className="qty">
                        <strong>QTY:</strong> {wo.qty}
                      </span>
                      <span className="price-total">${wo.price}/ea.</span>
                      <span className="price-total">${wo.total}/total</span>
                    </div>
                    <Link className="btnnote" onClick={handleShow}>
                      View Notes
                    </Link>
                  </div>
                </div>

                <div className="list-checkboxes  d-inline-flex gap-3">
                  {wo.labels.map((label) => (
                    <div
                      className="custom-checkbox-container text-center"
                      key={label}
                    >
                      <label
                        className="custom-label"
                        htmlFor={`${label}${wo.id}`}
                        style={getLabelsColor(wo.materials)}
                      >
                        {label}
                      </label>
                      <Form.Check type="checkbox" id={`${label}${wo.id}`} />
                    </div>
                  ))}
                </div>
                <div className="list-attachment text-center d-inline-flex flex-column align-items-center">
                  <Image src={attachment} className="img-fluid" alt="" />
                  <span>Attachments</span>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
      <AddNote title="Notes" show={modalShow} handleClose={handleClose} />
    </React.Fragment>
  );
};

export default RfqsDetail;
