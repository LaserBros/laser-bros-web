import React, { useEffect, useState } from "react";
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
import JSZip from "jszip";
import { saveAs } from "file-saver";
import barcode from "../../assets/img/barcode.jpg";
import { Link, useParams } from "react-router-dom";
import file from "../../assets/img/file1.jpg";
import loaderimg from "../../../../src/assets/img/loader.svg";

import attachment from "../../assets/img/attachment.svg";
import AddNote from "../../components/AddNote";
import { getParticularOrderDetails, updateWorkStatus } from "../../../api/api";
import Amount from "../../../components/Amount";
import { ReactBarcode } from "react-jsbarcode";
const OrdersDetail = () => {
  const [modalShow, setModalShow] = useState(false);
  const [customer_note, setcustomer_note] = useState(false);
  const [admin_note, setadmin_note] = useState(false);
  const [order, setOrders] = useState([]);
  const handleShow = (customer_note, admin_note) => {
    setcustomer_note(customer_note);
    setadmin_note(admin_note);
    setModalShow(true);
  };
  const handleClose = () => setModalShow(false);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const fetchOrder = async () => {
    const data = {
      id: id,
    };
    const res = await getParticularOrderDetails(data);
    setOrders(res.data);
    setLoading(false);
  };
  useEffect(() => {
    fetchOrder();
  }, []);
  const handleDownloadAll = async (data) => {
    console.log("Sddssdds");
    const urls = data;
    const zip = new JSZip();
    const param = {
      id: id,
    };

    try {
      const filePromises = urls.map(async (url, index) => {
        const response = await fetch(url.dxf_url);
        const blob = await response.blob();
        const fileName = url?.material_code + "-" + url.quote_name;
        zip.file(fileName, blob);
      });

      await Promise.all(filePromises);

      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "files.zip");
    } catch (error) {
      console.error("Error downloading or zipping files:", error);
    }
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
  const handleDownload = async (url, name) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", name);

      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl); // Revoke the blob URL after the download
    } catch (error) {
      console.error("Download failed:", error);
    }
  };
  const handleCheckboxChangeEvent = async (event, id, type) => {
    const isChecked = event.target.checked;
    var checked = 0;
    if (isChecked) {
      checked = 1;
    } else {
      checked = 0;
    }
    const updatedMaterials = order.newUpdatedData.map((wo) => {
      if (wo._id === id) {
        return { ...wo, [type]: isChecked };
      }
      return wo; // Return original object if not matching
    });
    console.log(updatedMaterials);
    setOrders((prevOrders) => ({
      ...prevOrders,
      newUpdatedData: updatedMaterials, // Update the specific part of the state
    }));

    const data = {
      id: id,
      type:
        type === "isChecked_material"
          ? "isChecked_material"
          : type === "isChecked_bend"
          ? "isChecked_bend"
          : type === "isChecked_PO"
          ? "isChecked_PO"
          : type === "isChecked_finish"
          ? "isChecked_finish"
          : checked,
      checked: checked,
    };
    const res = await updateWorkStatus(data);
    console.log(res.data);
  };
  const MAX_LENGTH = 20;
  const shortenName = (materialCode, quoteName) => {
    const combinedLength = materialCode.length + quoteName.length;

    if (combinedLength > MAX_LENGTH) {
      const truncatedMaterialCode =
        materialCode.slice(0, Math.floor(19)) + "...";
      const truncatedQuoteName = quoteName.slice(0, Math.floor(MAX_LENGTH / 2));
      return `${truncatedMaterialCode}-${truncatedQuoteName}`;
    }

    return `${materialCode}-${quoteName}`;
  };

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

  const getMonthYear = (dateStr) => {
    const date = new Date(dateStr);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    return `${month}-${year}`;
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`; // Customize as needed (MM/DD/YYYY)
  };

  // <p>{formatDate(order.createdAt)}</p>;

  return (
    <React.Fragment>
      {!loading ? (
        <>
          <Card>
            <CardHeader className="d-flex align-items-center justify-content-between flex-wrap">
              <h5>
                WO# LB-{getMonthYear(order?.orderedQuote.createdAt)}-
                {order?.orderedQuote.quote_number}
              </h5>
              <Button
                as={Link}
                to="/admin/orders"
                className="d-inline-flex align-items-center justify-content-center"
              >
                Back To Orders
              </Button>
            </CardHeader>
            <CardBody>
              <Row>
                <Col md={6} lg={4} xl={3} className="mb-3">
                  <div className="orders-card ">
                    <h4>{order.addressDetails?.full_name}</h4>
                    <p>{order.addressDetails?.address_line_1}</p>
                    <p>{order.addressDetails?.address_line_2}</p>
                    <p>{order.addressDetails?.state}</p>
                    <p className="mb-0">
                      {order.addressDetails?.country},{" "}
                      {order.addressDetails?.pincode}
                    </p>
                  </div>
                </Col>
                <Col md={6} lg={4} xl={3} className="mb-3">
                  <div className="orders-card">
                    <div className="d-flex align-items-center mb-3">
                      <label>Order Date: </label>{" "}
                      <span>{formatDate(order?.orderedQuote.createdAt)}</span>
                    </div>
                    {/* <div className="d-flex align-items-center mb-3">
                      <label>Due Date: </label> <span>6-14-24</span>
                    </div> */}
                    <div className="d-flex align-items-center mb-3">
                      <label>Order Amount: </label>{" "}
                      <span>
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD", // Change to your desired currency
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }).format(order?.orderedQuote.total_amount)}
                      </span>
                    </div>
                    <div className="d-flex align-items-center">
                      <label>Status: </label>{" "}
                      <span className="statusnew fw-medium">Paid</span>
                    </div>
                  </div>
                </Col>
                <Col md={6} lg={4} xl={6} className="text-xl-end mb-3">
                  {/* <Image src={barcode} className="img-fluid mb-3" alt="" /> */}
                  {}
                  <ReactBarcode
                    value={`WO# LB-${getMonthYear(
                      order?.orderedQuote.createdAt
                    )}-
                ${order?.orderedQuote.quote_number}`}
                    options={{
                      width: 0.6,
                      textAlign: "right",
                      text: " ",
                      // format: "CODE39",
                    }}
                  />

                  <div className="d-flex align-items-center justify-content-xl-end gap-3">
                    <div className="text-center download-wo-allfiles">
                      <Icon icon="solar:file-download-linear" />
                      <p className="mb-0">Download WO</p>
                    </div>
                    <div
                      className="text-center download-wo-allfiles"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDownloadAll(order.newUpdatedData)}
                    >
                      <Icon icon="bytesize:download" />
                      <p className="mb-0">Download All Files</p>
                    </div>
                  </div>
                </Col>
              </Row>
              <div className="orders-shipping d-flex align-items-center justify-content-between flex-wrap">
                <div className="d-inline-flex align-items-center gap-2 my-1">
                  <b>In this order:</b>
                  {order.newUpdatedData.map((wo, index) => (
                    <span
                      className="badgestatus"
                      style={getMaterialColor(
                        wo?.material_name + " " + wo?.material_grade
                      )}
                    >
                      {wo?.material_code}
                    </span>
                  ))}
                </div>
                {/* <div className="d-inline-flex align-items-center gap-2 my-1">
                  <b>Shipping:</b>
                  <span
                    className="badgestatus"
                    style={{ backgroundColor: "#CB6CE6" }}
                  >
                    UPS
                  </span>
                </div> */}
              </div>
              <div className="orders-detail mt-3">
                {order.newUpdatedData.map((wo, index) => (
                  <div
                    key={index}
                    className="list-main  d-inline-flex justify-content-between w-100"
                  >
                    <div className="list-left d-inline-flex">
                      <div className="list-img-outer">
                        <div className="list-img">
                          <Image
                            src={wo.image_url}
                            alt={wo.image_url}
                            className="img-fluid"
                          />
                        </div>
                        {/* <span>{wo.dimension}</span> */}
                      </div>
                      <div className="list-content">
                        <h2>
                          {shortenName(wo.material_code, wo.quote_name)}
                          <Icon
                            icon="material-symbols-light:download-sharp"
                            onClick={() =>
                              handleDownload(
                                wo?.dxf_url,
                                wo?.material_code + "-" + wo.quote_name
                              )
                            }
                          />
                        </h2>
                        <div className="list-qty d-flex align-items-center gap-3 mb-3">
                          <span className="qty">
                            <strong>QTY:</strong> {wo.quantity}
                          </span>
                          <span className="price-total">
                            <Amount amount={wo.amount / wo.quantity} />
                            /ea.
                          </span>
                          <span className="price-total">
                            <Amount amount={wo.amount} />
                            /total
                          </span>
                        </div>
                        <Link
                          className="btnnote"
                          onClick={() => {
                            handleShow(wo.notes_text, wo.notes_admin);
                          }}
                        >
                          View Notes
                        </Link>
                      </div>
                    </div>

                    <div className="list-checkboxes  d-inline-flex gap-3">
                      <div
                        className="custom-checkbox-container text-center"
                        key={wo.material_code}
                      >
                        <label
                          key={`${wo._id}-${wo.material_code}`}
                          className="custom-label-tag"
                          htmlFor={`${wo.material_code}${wo._id}`}
                          style={getMaterialColor(
                            wo?.material_name + " " + wo?.material_grade
                          )}
                        >
                          {wo.material_code}
                        </label>
                        <Form.Check
                          type="checkbox"
                          id={`${wo.material_code}${wo._id}`}
                          checked={wo.isChecked_material == 1}
                          onChange={(event) =>
                            handleCheckboxChangeEvent(
                              event,
                              wo._id,
                              "isChecked_material"
                            )
                          }
                        />
                      </div>
                      {wo.bend_count > 0 && (
                        <div
                          className="custom-checkbox-container text-center"
                          key={wo.material_code}
                        >
                          <label
                            key={`${wo._id}-${wo.material_code}`}
                            className="custom-label-tag"
                            htmlFor={`${wo._id}-POST`}
                            style={getMaterialColor(
                              wo?.material_name + " " + wo?.material_grade
                            )}
                          >
                            Bend
                          </label>
                          <Form.Check
                            type="checkbox"
                            id={`${wo._id}-POST`}
                            checked={wo.isChecked_bend == 1}
                            onChange={(event) =>
                              handleCheckboxChangeEvent(
                                event,
                                wo._id,
                                "isChecked_bend"
                              )
                            }
                          />
                        </div>
                      )}
                      <div
                        className="custom-checkbox-container text-center"
                        key={wo.material_code}
                      >
                        <label
                          key={`${wo._id}-${wo.material_code}`}
                          className="custom-label-tag"
                          htmlFor={`${wo._id}-POST`}
                          style={getMaterialColor(
                            wo?.material_name + " " + wo?.material_grade
                          )}
                        >
                          Post OP
                        </label>
                        <Form.Check
                          type="checkbox"
                          id={`${wo._id}-POST`}
                          checked={wo.isChecked_PO == 1}
                          onChange={(event) =>
                            handleCheckboxChangeEvent(
                              event,
                              wo._id,
                              "isChecked_PO"
                            )
                          }
                        />
                      </div>
                      <div
                        className="custom-checkbox-container text-center"
                        key={wo.finishing_desc}
                      >
                        <label
                          key={`${wo._id}-${wo.finishing_desc}`}
                          className="custom-label-tag"
                          htmlFor={`${wo._id}-${wo.finishing_desc}`}
                          style={getMaterialColor(
                            wo?.material_name + " " + wo?.material_grade
                          )}
                        >
                          {wo.finishing_desc}
                        </label>
                        <Form.Check
                          type="checkbox"
                          id={`${wo._id}-${wo.finishing_desc}`}
                          checked={wo.isChecked_finish == 1}
                          onChange={(event) =>
                            handleCheckboxChangeEvent(
                              event,
                              wo._id,
                              "isChecked_finish"
                            )
                          }
                        />
                      </div>
                    </div>
                    {wo.bend_count > 0 ? (
                      <a href={wo.bendupload_url} download="filename.pdf">
                        <div className="list-attachment text-center d-inline-flex flex-column align-items-center">
                          <Image
                            src={attachment}
                            className="img-fluid"
                            alt=""
                          />
                          <span>Attachments</span>
                        </div>
                      </a>
                    ) : (
                      <div className="list-attachment text-center d-inline-flex flex-column align-items-center">
                        {/* <Image src={attachment} className="img-fluid" alt="" />
                        <span>Attachments</span> */}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
          <AddNote
            title="Notes"
            show={modalShow}
            customer_note={customer_note}
            admin_note={admin_note}
            handleClose={handleClose}
          />
        </>
      ) : (
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
      )}
    </React.Fragment>
  );
};

export default OrdersDetail;
