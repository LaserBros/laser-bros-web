import React, { useEffect, useState } from "react";
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
import {
  fetchOrdersInQueue,
  moveOrderStatus,
  moveOrderToQueue,
} from "../../../api/api";
import { toast } from "react-toastify";
const Queue = () => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await fetchOrdersInQueue();
      console.log("response.data", response.data.data);
      setOrders(response.data.data.subQuotes);
    } catch (error) {
      console.error("Error fetching cards:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadOrders();
  }, []);
  const data = [
    {
      id: 3,
      material: "SB0036",
      parts: 3,
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
        {
          id: 2,
          img: file,
          dimension: "11 in x 11 in",
          name: "SB0036(14)-plate1.dxf",
          qty: "13",
          price: "10",
          total: "100",
          labels: ["SB0036", "F15", "Bend", "Post OP"],
        },
        {
          id: 3,
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

  const moveQueue = () => {
    console.log("Dfdf");
    const checkedIds = Object.entries(checkedItems)
      .filter(([id, isChecked]) => isChecked)
      .map(([id]) => id);
    if (checkedIds.length === 0) {
      toast.error("Please check atleast one order");
    } else {
      checkedIds.forEach(async (id) => {
        const data = {
          id: id,
          move_status: 2,
        };
        try {
          const res = await moveOrderStatus(data);
        } catch (error) {
          toast.error("Error when order move to Queue");
        }
      });
      setTimeout(() => {
        loadOrders();
      }, 4000);
    }
  };
  const getMonthYear = (dateStr) => {
    const date = new Date(dateStr);
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();
    return `${month}-${year}`; // Returns "MM/YYYY"
  };
  const getMaterialColor = (materials) => {
    // console.log("materials", materials);
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
  const handleDownload = (url, name) => {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", name); // Set the custom file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Clean up after the click
  };

  return (
    <React.Fragment>
      <Card>
        <CardHeader className="py-4">
          <h5>Queue</h5>
        </CardHeader>
        <CardBody>
          <Form>
            <Row className="px-2 gx-3">
              <Col lg={3} xxl={12} className="text-lg-end">
                <Button
                  variant={null}
                  className="btn-outline-primary min-width-147"
                  onClick={moveQueue}
                >
                  Move To Cut
                </Button>
              </Col>
            </Row>
          </Form>
          <div className="table-responsive">
            <Table className="tablecustom pt-0">
              <tbody>
                {loading ? (
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
                  <>
                    {orders && orders.length > 0 ? (
                      orders.map((row) => (
                        <React.Fragment key={row.id}>
                          <tr
                            className={
                              expandedRow === row.id ? "expanded-row" : ""
                            }
                          >
                            <td className="text-nowrap">
                              <b>Materials:</b>
                              <span
                                className="badgestatus"
                                style={getMaterialColor(
                                  row?.updatedSubQuoteData[0]?.material_name +
                                    " " +
                                    row.updatedSubQuoteData[0].material_grade
                                )}
                              >
                                {row.updatedSubQuoteData[0].material_code}
                              </span>
                            </td>
                            <td className="text-nowrap">
                              <b>Number Of Parts:</b>
                              {row.total_quantity}
                            </td>
                            {/* <td className="text-nowrap">
                        <b>Due:</b>
                        {row.due}
                      </td> */}
                            <td className="text-end">
                              <div className="d-inline-flex align-items-center">
                                <Button
                                  variant="link"
                                  onClick={() => handleExpandClick(row._id)}
                                >
                                  {expandedRow === row._id ? (
                                    <Icon icon="teenyicons:minimise-alt-outline" />
                                  ) : (
                                    <Icon icon="teenyicons:expand-alt-solid" />
                                  )}
                                </Button>
                                <Form.Check
                                  type="checkbox"
                                  checked={checkedItems[row._id] || false}
                                  onChange={() => handleCheckboxChange(row._id)}
                                />
                              </div>
                            </td>
                          </tr>
                          {expandedRow === row._id && (
                            <tr>
                              <td colSpan="4" style={{ borderRadius: 12 }}>
                                <Row className="expanded-top align-items-center mb-3">
                                  <Col xs={5}>
                                    <div className="d-inline-flex align-items-center checkbox-top gap-3">
                                      {/* {row.checkboxes.map((option) => (
                                  <Form.Check
                                    key={option}
                                    type="checkbox"
                                    id={`${option}1`}
                                    label={option}
                                  />
                                ))} */}
                                    </div>
                                    <p className="workorders mb-0">
                                      WO# {getMonthYear(row.createdAt)}-
                                      {row.quote_number}
                                    </p>
                                  </Col>
                                  <Col xs={7} className="text-end">
                                    <div className="d-inline-flex align-items-center gap-3">
                                      <div
                                        className="upload-download"
                                        onClick={() =>
                                          handleDownload(
                                            row?.updatedSubQuoteData[0]
                                              ?.dxf_url,
                                            "dxf_file.dxf"
                                          )
                                        }
                                      >
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

                                {row.updatedSubQuoteData.map((wo, index) => (
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
                                          {wo.material_code}
                                          {"-"}
                                          {wo.quote_name}
                                          <Icon
                                            icon="material-symbols-light:download-sharp"
                                            onClick={() =>
                                              handleDownload(
                                                wo?.dxf_url,
                                                "dxf_file.dxf"
                                              )
                                            }
                                          />
                                        </h2>
                                        <div className="list-qty d-inline-flex align-items-center gap-3">
                                          <span className="qty">
                                            <strong>QTY:</strong> {wo.quantity}
                                          </span>
                                          <span className="price-total">
                                            {new Intl.NumberFormat("en-US", {
                                              style: "currency",
                                              currency: "USD", // Change to your desired currency
                                              minimumFractionDigits: 2,
                                              maximumFractionDigits: 2,
                                            }).format(wo.amount)}
                                            /ea.
                                          </span>
                                          <span className="price-total">
                                            {new Intl.NumberFormat("en-US", {
                                              style: "currency",
                                              currency: "USD", // Change to your desired currency
                                              minimumFractionDigits: 2,
                                              maximumFractionDigits: 2,
                                            }).format(wo.amount)}
                                            /total
                                          </span>
                                        </div>
                                      </div>
                                    </div>

                                    {/* <div className="list-checkboxes  d-inline-flex gap-3">
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
                              </div> */}
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
                      ))
                    ) : (
                      <p className="text-center mt-2">
                        <i> No Queue Order Found. </i>
                      </p>
                    )}
                  </>
                )}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default Queue;
