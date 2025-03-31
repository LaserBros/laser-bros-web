import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Image } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import file1 from "../../assets/img/file1.jpg";
import {
  UsergetParticularOrderDetails,
  generateRfqPDF,
  getOrders,
  getParticularOrderDetails,
  getParticularRFQDetails,
} from "../../api/api";
import Amount from "../../components/Amount";
import DimensionsToggle from "../../components/DimensionsToggle";
import QuotesSidebar from "../../components/Quotessidebar";
import AddressDetails from "../../admin/components/AddressDetails";
import { encodeS3Url } from "../../utils/encodeS3Url";
import axiosInstance from "../../axios/axiosInstance";
export default function RfqDetail() {
  const { id } = useParams();
  const getStatusColor = (status) => {
    switch (status) {
      case "Approved!":
        return {
          backgroundColor: "rgba(1,148,60,0.10)",
          color: "#01943C",
          padding: "0px 6px",
        };
      case "Rejected":
        return {
          backgroundColor: "rgb(225, 31, 38)",
          color: "#fff",
          padding: "0px 6px",
        };

      case "Pending":
        return {
          backgroundColor: "rgba(255,186,22,0.10)",
          color: "#FFBA16",
          padding: "0px 6px",
        };
      default:
        return {};
    }
  };
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrdersDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchOrder = async () => {
    const data = {
      id: id,
    };
    try {
      const res = await getParticularRFQDetails(data);
      setOrders(res.data.newUpdatedData);
      setOrdersDetail(res.data.mainQuote);
      // console.log(orders, "Sdsdsdsddsddsdssddssd");
      // console.log("res", res.data);
      setLoading(false);
    } catch (error) {
      setOrders([]);
      setOrdersDetail([]);
      setLoading(false);
    }
  };
  const formatDate = (dateCreate) => {
    const dateObj = new Date(dateCreate);
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const yearLastTwoDigits = String(dateObj.getFullYear()).slice(-2);
    return `Quote # ${month}-${yearLastTwoDigits}`;
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

  const downloadFile = (url) => {
    // Extract file name and remove URL parameters
    let fileNameWithParams = url.split("/").pop();
    let [fileName] = fileNameWithParams.split("?"); // Remove query parameters

    // Decode URL-encoded characters (like %20 for spaces)
    fileName = decodeURIComponent(fileName);

    // Remove unwanted prefixes (e.g., numerical prefixes like "1734240670591-")
    fileName = fileName.replace(/^\d+-/, "");

    // Fetch and download the file
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.blob();
      })
      .then((blob) => {
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName; // Set cleaned file name
        link.click();
        window.URL.revokeObjectURL(link.href); // Cleanup
      })
      .catch((error) => console.error("Error downloading the file:", error));
};

  const [loadRfq,setLoadRfq] = useState(false);
  const handlePDF = async () => {
    try {
      setLoadRfq(true);
      const response = await axiosInstance.post(
        '/users/generateRfqPDF',
        { id: orderDetails?._id },
        { responseType: 'blob' } 
      );
  
      const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = blobUrl; 
      link.download = `WO#${orderDetails?.search_quote}.pdf`;
      document.body.appendChild(link);
      link.click();
  
      // Cleanup
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
      setLoadRfq(false);
    } catch (error) {
      setLoadRfq(false);
      console.error('Error downloading PDF:', error);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);
  return (
    <React.Fragment>
      <section className="orders ptb-50">
        <Container>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center flex-wrap ">
              <h5>RFQ's Detail</h5>{" "}
              <div>
                <Link
                  to=""
                  onClick={handlePDF}
                  disabled={loadRfq}
                  className="btn btn-primary d-inline-flex align-items-center flex-shrink-0 justify-content-center ms-3"
                  style={{ marginRight: "4px" }}
                >
                    {loadRfq ? (
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
                  "Download RFQ"
        )}
                </Link>
                <Link
                  to="/rfqs"
                  className="btn btn-primary d-inline-flex align-items-center  justify-content-center min-width-159 ms-2"
                >
                  Back To RFQ's
                </Link>
              </div>
            </Card.Header>
            {loading ? (
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
            ) : orders && orders.length > 0 ? (
              <>
                <AddressDetails
                  shipAddress={orderDetails?.billing_details}
                  billAdress={orderDetails?.address_details}
                  addressDetail={orderDetails}
                  isPassShipping={
                    orderDetails.status == 1
                      ? "Pending"
                      : orderDetails.status == 2
                      ? "Approved!"
                      : "Rejected"
                  }
                  po_number={orderDetails?.po_number}
                  quote_number={orderDetails?.search_quote}
                  po_upload={orderDetails?.po_upload}
                />
                <Row>
                  <Col lg={8} xl={9}>
                    <Card.Body>
                      {orders
                        .slice()
                        .reverse()
                        .map((row, index) => {
                          return (
                            <div className="list-quotes-main">
                              <div className="list-quotes flex-column flex-md-row d-flex flex-wrap flex-md-nowrap">
                                <div className="img-quote mx-auto mx-md-0 position-relative">
                                  <span className="bublenumber">
                                    {String(index + 1).padStart(3, "0")}
                                  </span>
                                  <Image
                                    src={encodeS3Url(row.image_url)}
                                    className="img-fluid"
                                    alt=""
                                  />
                                </div>

                                <div className="content-quotes text-center text-md-start mt-3 mt-md-0 ps-0 ps-md-3 pe-md-2 pe-0">
                                  <h2>{row.quote_name}
                                     <Icon
                                                                icon="material-symbols-light:download-sharp"
                                                                onClick={() =>
                                                                  handleDownload(encodeS3Url(row?.dxf_url), row.quote_name)
                                                                }
                                                              />
                                  </h2>
                                  <p className="num-dim-main">
                                    {row?.subquote_number}
                                    {/* <span className="num-dim">
                              <span>Dimensions</span> 1.00 in x 1.00 in
                            </span> */}
                                  </p>
                                  <p className="num-dim-main">
                                    {/* <span className="px-2 num-dim-indicator">/</span>{" "} */}
                                    <span className="num-dim">
                                      <span>QTY:</span> {row.quantity}
                                    </span>
                                  </p>
                                  <p className="num-dim-main">
                                    <span className="num-dim">
                                      <span>Material</span> {row.material_name}{" "}
                                      {row.material_grade}
                                    </span>
                                    <span className="px-2 num-dim-indicator">
                                      /
                                    </span>{" "}
                                    <span className="num-dim">
                                      <span>Thickness:</span> {row.thickness}
                                    </span>{" "}
                                    <span className="px-2 num-dim-indicator">
                                      /
                                    </span>{" "}
                                    <span className="num-dim">
                                      <span>Finish:</span> {row.finishing_desc}
                                    </span>
                                  </p>
                                  {/* <Link
                            className="btn btn-secondary"
                            onClick={() => {
                              // handleShow(wo.notes_text, wo.notes_admin);
                            }}
                          >
                            View Notes
                          </Link> */}
                                  {row.bend_count > 0 && (
                                    <div className="quotes-services mt-3">
                                      <h4>Services</h4>
                                      <label>
                                        Bending :{" "}
                                        {row.step_file_bend != null &&
                                          row.step_file_bend != "null" &&
                                          row.step_file_bend != "" && (
                                            <>
                                              <Link
                                                // href={`${url}`}
                                                // target="_blank"
                                                onClick={() =>
                                                  downloadFile(
                                                    row.step_file_bend
                                                  )
                                                }
                                                style={{ paddingRight: "5px" }}
                                              >
                                                Step File
                                              </Link>
                                            </>
                                          )}
                                        {row.drawing_file_bend != null &&
                                          row.drawing_file_bend != "null" &&
                                          row.drawing_file_bend != "" && (
                                            <>
                                              <Link
                                                // href={`${url}`}
                                                // target="_blank"
                                                onClick={() =>
                                                  downloadFile(
                                                    row.drawing_file_bend
                                                  )
                                                }
                                                style={{ paddingRight: "5px" }}
                                              >
                                                Drawing File
                                              </Link>
                                            </>
                                          )}
                                        {row.bendupload_url.map(
                                          (url, index) => (
                                            <Link
                                              onClick={() => downloadFile(url)}
                                              style={{ paddingRight: "5px" }}
                                            >
                                              Attachment {String(index + 1)}
                                            </Link>
                                          )
                                        )}
                                      </label>
                                    </div>
                                  )}
                                </div>
                                <div className="right-quote flex-shrink-0 text-center text-md-end flex-grow-1 flex-md-grow-0">
                                  <p className=" text-md-end">
                                    <Amount amount={((row.amount) +  (row.bend_count >= 1 && row.per_bend_price * row.quantity))} /> total
                                  </p>
                                  <p className=" text-md-end">
                                    <strong className="quotes-price">
                                      <Amount
                                        amount={((row.amount / row.quantity) + (row.bend_count >= 1 && row.per_bend_price))}
                                      />
                                    </strong>
                                    /each
                                  </p>

                                  <span className="quote-off">
                                    {row.discount}% Saved
                                  </span>
                                  {row.estimated_lead_time && (
                                    <p className="mb-0 text-md-end">
                                      Typical Lead Time{" "}
                                      {row.estimated_lead_time} days
                                    </p>
                                  )}
                                </div>
                              </div>
                              <span className="num-dim">
                                <DimensionsToggle
                                  dimensions={row.dimensions}
                                  id={row._id}
                                  type={row.dimension_type}
                                />
                              </span>
                            </div>
                          );
                        })}
                      {/* <Row className="justify-content-end mt-2">
                      <Col lg={3} md={4} xs={6} className="totaltable ">
                        <p>
                          Subtotal{" "}
                          <span>
                            {" "}
                            <Amount amount={orderDetails.total_amount} />
                          </span>
                        </p>
                        <p>
                          Bending{" "}
                          <span>
                            {" "}
                            <Amount amount={orderDetails.total_bend_price} />
                          </span>
                        </p>
                        <p className="grandtotal">
                          Total{" "}
                          <span>
                            {" "}
                            <Amount
                              amount={
                                parseFloat(orderDetails.total_amount || 0) +
                                parseFloat(orderDetails.total_bend_price || 0)
                              }
                            />
                          </span>
                        </p>
                      </Col>
                    </Row> */}
                    </Card.Body>
                  </Col>
                  <Col lg={4} xl={3}>
                    <QuotesSidebar
                      amount={orderDetails.total_amount}
                      buttonText={orderDetails.check_status}
                      bendAmount={orderDetails.total_bend_price}
                      quoteData={orderDetails}
                      loadId={orderDetails._id}
                      isPayble={true}
                    />
                  </Col>
                </Row>
              </>
            ) : (
              <>
                <p className="text-center mt-5 mb-5">No Order Found..</p>
              </>
            )}
          </Card>
        </Container>
      </section>
    </React.Fragment>
  );
}
