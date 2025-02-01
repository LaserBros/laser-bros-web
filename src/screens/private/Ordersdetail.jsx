import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Image } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import file1 from "../../assets/img/file1.jpg";
import {
  UsergetParticularOrderDetails,
  getOrders,
  getParticularOrderDetails,
  orderTrackingDetails,
  trackingDetails,
} from "../../api/api";
import Amount from "../../components/Amount";
import DimensionsToggle from "../../components/DimensionsToggle";
import OrderStatus from "../../admin/components/OrderStatus";
import ShippingStatus from "../../components/ShippingStatus";
import AddressDetails from "../../admin/components/AddressDetails";
export default function OrdersDetail() {
  const { id } = useParams();
  const [Shipping, setShipping] = useState(0);
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrdersDetail] = useState([]);
  const [loading, setLoading] = useState(true);


  const handlePDF = async () => {
    const url = `${process.env.REACT_APP_API_URL}/generateOrderPDF`;

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set as JSON
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          orderId: orderDetails?._id, // Convert to JSON string
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to download PDF");
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      // Create a link element to trigger the download
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "WO#" + orderDetails?.search_quote + ".pdf"; // Set the desired file name
      document.body.appendChild(link);
      link.click();

      // Cleanup
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }

    // await loadImagesAsBase64(); // Ensure all images are converted to base64
    // const input = document.getElementById("pdf-content");

    // // Use html2canvas to create a canvas from the content
    // const canvas = await html2canvas(input, { useCORS: true });
    // const imgData = canvas.toDataURL("image/png");

    // const pdf = new jsPDF({
    //   orientation: "portrait",
    //   unit: "pt",
    //   format: "a4",
    // });

    // const imgWidth = 595.28; // A4 page width in points
    // const imgHeight = (canvas.height * imgWidth) / canvas.width; // Scale height according to width

    // // Calculate how many pages are needed
    // const pageHeight = pdf.internal.pageSize.height; // Height of the PDF page
    // let heightLeft = imgHeight; // Remaining height for the image

    // let position = 0;

    // // Add image to PDF, creating new pages as needed
    // while (heightLeft >= 0) {
    //   pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    //   heightLeft -= pageHeight; // Decrease height left by one page height
    //   position -= pageHeight; // Move position for next page
    //   if (heightLeft >= 0) {
    //     pdf.addPage(); // Add a new page if there's still more content
    //   }
    // }

    // pdf.save("download.pdf");
  };

  const fetchOrder = async () => {
    const data = {
      id: id,
    };
    try {
      const res = await UsergetParticularOrderDetails(data);
      setShipping(res.data);
      setOrders(res.data.newUpdatedData);
      setOrdersDetail(res.data.orderedQuote);
      console.log(orders, "Sdsdsdsddsddsdssddssd");
      console.log("res", res.data);
      setLoading(false);
    } catch (error) {
      setOrders([]);
      setOrdersDetail([]);
      setLoading(false);
    }
  };
  const handleClose = () => setModalShow(false);
  const [modalShow, setModalShow] = useState(false);
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [ordersTrack, setordersTrack] = useState([]);
  const handleShow = async (value) => {
    setLoadingOrder(true);
    setModalShow(true);
    setLoadingOrder(false);
  };
  const formatDate = (dateCreate) => {
    const dateObj = new Date(dateCreate);
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const yearLastTwoDigits = String(dateObj.getFullYear()).slice(-2);
    return `Quote # ${month}-${yearLastTwoDigits}`;
  };
  const [trackNumber, settrackNumber] = useState([]);
  const orderTracking = async () => {
    const data = {
      id: id,
    };
    const res = await orderTrackingDetails(data);
    setordersTrack(res.data);
    console.log(res.data, "DSsdsd");
    // settrackNumber(res.data);
  };
  useEffect(() => {
    orderTracking();
    fetchOrder();
  }, []);

  const downloadFile = (url) => {
    // Extract file name and extension from URL
    const fileNameWithParams = url.split("/").pop(); // Get everything after the last "/"
    const [fileName] = fileNameWithParams.split("?"); // Remove query parameters if present
    const extension = fileName.split(".").pop(); // Get the file extension
  
    // Clean the file name (remove digits and unwanted patterns at the start of the name)
    const cleanFileName = fileName
      .replace(/^\d+-/, "") // Remove timestamp or numerical prefix (e.g., "1734240670591-")
      .replace(/(\s*\(\d+\))?\.[^.]+$/, `.${extension}`); // Clean trailing patterns like "(5)" before the extension
  
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
        link.download = cleanFileName; // Set the final cleaned file name
        link.click();
        window.URL.revokeObjectURL(link.href); // Clean up
      })
      .catch((error) => console.error("Error downloading the file:", error));
  };
  
  
  return (
    <React.Fragment>
      <section className="orders ptb-50">
        <Container>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center flex-wrap">
              <h5>Orders Detail</h5>{" "}
              <div className="d-flex">
                {/* {orderDetails.status == 3 && trackNumber?.length > 0 && (
                  <select
                    // className="form-select me-2"
                    className="form-select"
                    onChange={(e) => handleShow(e.target.value)}
                    // disabled={
                    //   loadingOrder || !orders?.orderedQuote?.tracking_number
                    // }
                  >
                    <option value="">Select Tracking Number</option>
                    {trackNumber?.map((trackingNumber, index) => (
                      <option value={trackingNumber?._id}>
                        Tracking {trackingNumber?.tracking_number}
                      </option>
                    ))}
                  </select>
                )} */}
                {/* <Link
                    to=""
                    onClick={handlePDF}
                    className="btn btn-primary d-inline-flex align-items-center flex-shrink-0 justify-content-center"
                    style={{ marginRight: "4px" }}
                    disabled={loadingOrder}
                  >
                    Download Invoice
                  </Link> */}
                {orderDetails.status == 3 && ordersTrack?.length > 0 && (
                  <Link
                    to=""
                    onClick={handleShow}
                    className="btn btn-primary d-inline-flex align-items-center flex-shrink-0 justify-content-center ms-3"
                    style={{ marginRight: "4px" }}
                    disabled={loadingOrder}
                  >
                    {loadingOrder ? (
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
                    ) : (
                      "Track your order"
                    )}
                  </Link>
                )}
                <Link
                  to="/orders"
                  className="btn btn-primary d-inline-flex align-items-center flex-shrink-0 justify-content-center ms-3"
                >
                  Back To Orders
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
                  shipAddress={orderDetails?.billing_address}
                  billAdress={orderDetails}
                  addressDetail={orderDetails}
                  po_number={orderDetails?.po_number}
                  quote_number={orders[0]?.search_quote}
                  po_upload={orderDetails?.po_upload}
                />
                <Card.Body>
                  {/* <ul className="tablelist list-unstyled ">
                    <li>
                      <span>Quote # {orders[0]?.search_quote}</span>
                    </li>
                   
                    <li>
                      Order Amount{" "}
                      <span>
                        <Amount amount={orderDetails.total_amount} />
                      </span>
                    </li>
                   
                    <li>
                      Status{" "}
                      <span className="badge-status">
                        <OrderStatus status={orderDetails.status} />
                      </span>
                    </li>
                  </ul> */}
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
                                src={row.image_url}
                                className="img-fluid"
                                alt=""
                              />
                            </div>

                            <div className="content-quotes text-center text-md-start mt-3 mt-md-0 ps-0 ps-md-3 pe-md-2 pe-0">
                              <h2>{row.quote_name}</h2>
                              <p className="num-dim-main">
                                {row?.subquote_number}
                              </p>
                              <p className="num-dim-main">
                                {/* <span className="num-dim">
                              <span>Dimensions</span> 1.00 in x 1.00 in
                            </span> */}
                                {/* <span className="px-2 num-dim-indicator">/</span>{" "} */}
                                <span className="num-dim">
                                  <span>QTY:</span> {row.quantity}
                                </span>
                              </p>
                              <p className="num-dim-main">
                                <span className="num-dim">
                                  <span>Material</span> {row.material_name}
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
                              {row.bend_count > 0 && (
                                <div className="quotes-services mt-3">
                                  <h4>Services</h4>
                                  <label>
                                    Bending :{" "}
                                    
                                    {row.bendupload_url.map((url, index) => (
                                      <Link
                                        // href={`${url}`}
                                        // target="_blank"
                                        onClick={() => downloadFile(url)}
                                        style={{ paddingRight: "5px" }}
                                      >
                                        Attachment {String(index + 1)}
                                      </Link>
                                    ))}
                                  </label>
                                </div>
                              )}
                            </div>
                            <div className="right-quote flex-shrink-0 text-center text-md-end flex-grow-1 flex-md-grow-0">
                              <p className=" text-md-end">
                                <Amount amount={row.amount} /> total
                              </p>
                              <p className=" text-md-end">
                                <strong className="quotes-price">
                                  <Amount amount={row.amount / row.quantity} />
                                </strong>
                                /each
                              </p>
                              <span className="quote-off">
                                {row.discount}% Saved
                              </span>
                              {row.estimated_lead_time && (
                                <p className="mb-0 text-md-end">
                                  Typical Lead Time {row.estimated_lead_time}{" "}
                                  days
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
                  <Row className="justify-content-end mt-2">
                    <Col lg={3} md={4} xs={6} className="totaltable ">
                      <p>
                        Subtotal{" "}
                        <span>
                          {" "}
                          <Amount
                            amount={
                              parseFloat(orderDetails.total_amount || 0) -
                              parseFloat(Shipping.bendPrice || 0) -
                              parseFloat(Shipping.shippingPrice || 0)
                            }
                          />
                        </span>
                      </p>
                      <p>
                        Bending{" "}
                        <span>
                          {" "}
                          <Amount
                            amount={parseFloat(Shipping.bendPrice || 0)}
                          />
                        </span>
                      </p>
                      <p>
                        Shipping{" "}
                        <span>
                          {" "}
                          <Amount
                            amount={parseFloat(Shipping.shippingPrice || 0)}
                          />
                        </span>
                      </p>
                      {orderDetails.tax_amount != 0 && (
                        <p>
                          <span>
                            Tax{" "}
                            <small>
                              <b>({orderDetails.tax_percentage}%)</b>
                            </small>
                          </span>
                          <span>
                            {" "}
                            <Amount
                              amount={parseFloat(orderDetails.tax_amount || 0)}
                            />
                          </span>
                        </p>
                      )}
                      <p className="grandtotal">
                        Total{" "}
                        <span>
                          {" "}
                          <Amount
                            amount={parseFloat(orderDetails.total_amount)}
                          />
                        </span>
                      </p>
                    </Col>
                  </Row>
                </Card.Body>
              </>
            ) : (
              <>
                <p className="text-center mt-5 mb-5">No Order Found..</p>
              </>
            )}
          </Card>
        </Container>
      </section>
      <ShippingStatus
        show={modalShow}
        handleClose={handleClose}
        ordersTrack={ordersTrack}
      />
    </React.Fragment>
  );
}
