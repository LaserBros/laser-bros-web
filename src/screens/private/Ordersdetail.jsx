import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Image } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import file1 from "../../assets/img/file1.jpg";
import {
  UsergetParticularOrderDetails,
  getOrders,
  getParticularOrderDetails,
  trackingDetails,
} from "../../api/api";
import Amount from "../../components/Amount";
import DimensionsToggle from "../../components/DimensionsToggle";
import OrderStatus from "../../admin/components/OrderStatus";
import ShippingStatus from "../../components/ShippingStatus";
export default function OrdersDetail() {
  const { id } = useParams();
  const [Shipping, setShipping] = useState(0);
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrdersDetail] = useState([]);
  const [loading, setLoading] = useState(true);
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
  const handleShow = async () => {
    setLoadingOrder(true);
    try {
      const res = await trackingDetails(orderDetails?.label_id);
      setordersTrack(res.data);
      setModalShow(true);
    } catch (error) {
    } finally {
      setLoadingOrder(false);
    }
  };
  const formatDate = (dateCreate) => {
    const dateObj = new Date(dateCreate);
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const yearLastTwoDigits = String(dateObj.getFullYear()).slice(-2);
    return `Quote # ${month}-${yearLastTwoDigits}`;
  };
  useEffect(() => {
    fetchOrder();
  }, []);
  return (
    <React.Fragment>
      <section className="orders ptb-50">
        <Container>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center flex-wrap">
              <h5>Orders Detail</h5>{" "}
              <div className="">
                <Link
                  to=""
                  onClick={handleShow}
                  className="btn btn-primary d-inline-flex align-items-center flex-shrink-0 justify-content-center"
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
                <Link
                  to="/orders"
                  className="btn btn-primary d-inline-flex align-items-center flex-shrink-0 justify-content-center"
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
              <Card.Body>
                <ul className="tablelist list-unstyled ">
                  <li>
                    <span>Quote # {orders[0]?.search_quote}</span>
                  </li>
                  {/* <li>
                    Order Date <span>May 21, 2024 3:05 pm</span>
                  </li> */}
                  <li>
                    Order Amount{" "}
                    <span>
                      <Amount amount={orderDetails.total_amount} />
                    </span>
                  </li>
                  {/* <li>Payment Method <span>Credit Card</span></li> */}
                  <li>
                    Status{" "}
                    <span className="badge-status">
                      <OrderStatus status={orderDetails.status} />
                    </span>
                  </li>
                </ul>
                {orders
                  .slice()
                  .reverse()
                  .map((row) => {
                    return (
                      <div className="list-quotes-main">
                        <div className="list-quotes flex-column flex-md-row d-flex flex-wrap flex-md-nowrap">
                          <div className="img-quote mx-auto mx-md-0">
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
                              <span className="px-2 num-dim-indicator">/</span>{" "}
                              <span className="num-dim">
                                <span>Thickness:</span> {row.thickness}
                              </span>{" "}
                              <span className="px-2 num-dim-indicator">/</span>{" "}
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
                                    <a
                                      href={`${url}`}
                                      target="_blank"
                                      style={{ paddingRight: "5px" }}
                                    >
                                      Attachment {String(index + 1)}
                                    </a>
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
                            <p className="mb-0 text-md-end">
                              Typical Lead Time 2-3 days
                            </p>
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
                        <Amount amount={parseFloat(Shipping.bendPrice || 0)} />
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
                    <p className="grandtotal">
                      Total{" "}
                      <span>
                        {" "}
                        <Amount amount={orderDetails.total_amount} />
                      </span>
                    </p>
                  </Col>
                </Row>
              </Card.Body>
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
        data={ordersTrack}
      />
    </React.Fragment>
  );
}
