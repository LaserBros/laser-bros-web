import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Image } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import file1 from "../../assets/img/file1.jpg";
import {
  UsergetParticularOrderDetails,
  getOrders,
  getParticularOrderDetails,
} from "../../api/api";
import Amount from "../../components/Amount";
export default function OrdersDetail() {
  const { id } = useParams();
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrdersDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchOrder = async () => {
    const data = {
      id: id,
    };
    try {
      const res = await UsergetParticularOrderDetails(data);
      setOrders(res.data.newUpdatedData);
      setOrdersDetail(res.data.orderedQuote);
      console.log("res", res.data);
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
              <Link
                to="/orders"
                className="btn btn-primary d-inline-flex align-items-center  justify-content-center min-width-159"
              >
                Back To Orders
              </Link>
            </Card.Header>
            {loading ? (
              <div className="loader text-center mt-5 mb-5">Loading...</div>
            ) : !loading && orders.length > 0 ? (
              <Card.Body>
                <ul className="tablelist list-unstyled ">
                  <li>
                    <span>
                      {formatDate(orderDetails.createdAt)}-
                      {orderDetails.quote_number}
                    </span>
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
                      {orderDetails.status == 0
                        ? "New"
                        : orderDetails.status == 1
                        ? "In Progress"
                        : orderDetails.status == 2
                        ? "Shipped"
                        : orderDetails.status == 3
                        ? "Delivered"
                        : ""}
                    </span>
                  </li>
                </ul>
                <div className="list-quotes-main">
                  <div className="list-quotes flex-column flex-md-row d-flex flex-wrap flex-md-nowrap">
                    <div className="img-quote mx-auto mx-md-0">
                      <Image src={file1} className="img-fluid" alt="" />
                    </div>
                    <div className="content-quotes text-center text-md-start mt-3 mt-md-0 ps-0 ps-md-3 pe-md-2 pe-0">
                      <h2>Cube</h2>
                      <p className="num-dim-main">
                        <span className="num-dim">
                          <span>Dimensions</span> 1.00 in x 1.00 in
                        </span>
                        <span className="px-2 num-dim-indicator">/</span>{" "}
                        <span className="num-dim">
                          <span>QTY:</span> 14
                        </span>
                      </p>
                      <p className="num-dim-main">
                        <span className="num-dim">
                          <span>Material</span> Aluminum 6061
                        </span>
                        <span className="px-2 num-dim-indicator">/</span>{" "}
                        <span className="num-dim">
                          <span>Thickness:</span> .040" / 1.02mm
                        </span>{" "}
                        <span className="px-2 num-dim-indicator">/</span>{" "}
                        <span className="num-dim">
                          <span>Finish:</span>{" "}
                          <Icon
                            icon="mdi:circle"
                            color="#E11F26"
                            className="me-1"
                          />{" "}
                          Gloss Red P.C.
                        </span>
                      </p>
                      <div className="quotes-services mt-3">
                        <h4>Services</h4>
                        <label>Bending</label>
                      </div>
                    </div>
                    <div className="right-quote flex-shrink-0 text-center text-md-end flex-grow-1 flex-md-grow-0">
                      <p className=" text-md-end">$35.00 total</p>
                      <p className=" text-md-end">
                        <strong className="quotes-price">$35.00</strong>/each
                      </p>
                      <span className="quote-off">0% Saved</span>
                      <p className="mb-0 text-md-end">
                        Typical Lead Time 2-3 days
                      </p>
                    </div>
                  </div>
                </div>
                <div className="list-quotes-main">
                  <div className="list-quotes flex-column flex-md-row d-flex flex-wrap flex-md-nowrap">
                    <div className="img-quote mx-auto mx-md-0">
                      <Image src={file1} className="img-fluid" alt="" />
                    </div>
                    <div className="content-quotes text-center text-md-start mt-3 mt-md-0 ps-0 ps-md-3 pe-md-2 pe-0">
                      <h2>Cube</h2>
                      <p className="num-dim-main">
                        <span className="num-dim">
                          <span>Dimensions</span> 1.00 in x 1.00 in
                        </span>
                        <span className="px-2 num-dim-indicator">/</span>{" "}
                        <span className="num-dim">
                          <span>QTY:</span> 14
                        </span>
                      </p>
                      <p className="num-dim-main">
                        <span className="num-dim">
                          <span>Material</span> Aluminum 6061
                        </span>
                        <span className="px-2 num-dim-indicator">/</span>{" "}
                        <span className="num-dim">
                          <span>Thickness:</span> .040" / 1.02mm
                        </span>{" "}
                        <span className="px-2 num-dim-indicator">/</span>{" "}
                        <span className="num-dim">
                          <span>Finish:</span>{" "}
                          <Icon
                            icon="mdi:circle"
                            color="#E11F26"
                            className="me-1"
                          />{" "}
                          Gloss Red P.C.
                        </span>
                      </p>
                      <div className="quotes-services mt-3">
                        <h4>Services</h4>
                        <label>Bending</label>
                      </div>
                    </div>
                    <div className="right-quote flex-shrink-0 text-center text-md-end flex-grow-1 flex-md-grow-0">
                      <p className=" text-md-end">$35.00 total</p>
                      <p className=" text-md-end">
                        <strong className="quotes-price">$35.00</strong>/each
                      </p>
                      <span className="quote-off">0% Saved</span>
                      <p className="mb-0 text-md-end">
                        Typical Lead Time 2-3 days
                      </p>
                    </div>
                  </div>
                </div>
                <div className="list-quotes-main">
                  <div className="list-quotes flex-column flex-md-row d-flex flex-wrap flex-md-nowrap">
                    <div className="img-quote mx-auto mx-md-0">
                      <Image src={file1} className="img-fluid" alt="" />
                    </div>
                    <div className="content-quotes text-center text-md-start mt-3 mt-md-0 ps-0 ps-md-3 pe-md-2 pe-0">
                      <h2>Cube</h2>
                      <p className="num-dim-main">
                        <span className="num-dim">
                          <span>Dimensions</span> 1.00 in x 1.00 in
                        </span>
                        <span className="px-2 num-dim-indicator">/</span>{" "}
                        <span className="num-dim">
                          <span>QTY:</span> 14
                        </span>
                      </p>
                      <p className="num-dim-main">
                        <span className="num-dim">
                          <span>Material</span> Aluminum 6061
                        </span>
                        <span className="px-2 num-dim-indicator">/</span>{" "}
                        <span className="num-dim">
                          <span>Thickness:</span> .040" / 1.02mm
                        </span>{" "}
                        <span className="px-2 num-dim-indicator">/</span>{" "}
                        <span className="num-dim">
                          <span>Finish:</span>{" "}
                          <Icon
                            icon="mdi:circle"
                            color="#E11F26"
                            className="me-1"
                          />{" "}
                          Gloss Red P.C.
                        </span>
                      </p>
                      <div className="quotes-services mt-3">
                        <h4>Services</h4>
                        <label>Bending</label>
                      </div>
                    </div>
                    <div className="right-quote flex-shrink-0 text-center text-md-end flex-grow-1 flex-md-grow-0">
                      <p className=" text-md-end">$35.00 total</p>
                      <p className=" text-md-end">
                        <strong className="quotes-price">$35.00</strong>/each
                      </p>
                      <span className="quote-off">0% Saved</span>
                      <p className="mb-0 text-md-end">
                        Typical Lead Time 2-3 days
                      </p>
                    </div>
                  </div>
                </div>
                {/* <div className="table-responsive">
                                <table className="table tablecustom">
                                    <thead>
                                        <tr>
                                            <th> Name </th>
                                            <th> Materials </th>
                                            <th> Quantity </th>
                                            <th> Type </th>
                                            <th> Parts </th>
                                            <th> Payment Method </th>
                                            <th> Total Price </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Cube</td>
                                            <td><div className="badgematerials d-inline-flex align-items-center"><span style={{ backgroundColor: '#E11F26' }}></span>Aluminum</div></td>
                                            <td>54</td>
                                            <td>DXF File</td>
                                            <td>1</td>
                                            <td>Credit Card</td>
                                            <td>$1,500.00</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div> */}
                <Row className="justify-content-end mt-2">
                  <Col lg={3} md={4} xs={6} className="totaltable ">
                    <p>
                      Subtotal <span>$135.00</span>
                    </p>
                    <p className="grandtotal">
                      Total <span>$135.00</span>
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
    </React.Fragment>
  );
}
