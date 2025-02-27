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
import JSZip from "jszip";
import Select from "react-select";

import { saveAs } from "file-saver";
import {
  AdmingetThickness,
  downloadAllFiles,
  downloadParticularFile,
  fetchOrdersInQueue,
  getAllMaterialCodes,
  moveOrderStatus,
  moveOrderToQueue,
} from "../../../api/empApi";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useTheme } from "../../../components/Themecontext";
const Queue = () => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [materialCodes, setMaterialCodes] = useState([]);
  const [selectedCode, setSelectedCode] = useState("");
  const { theme, togglenewTheme } = useTheme();

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: `1px solid ${
        theme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.15)"
      }`,
      background: theme == "dark" ? "#212121" : "#fff",
      boxShadow: "none",
      minHeight: "50px",
      borderRadius: "40px",
      fontSize: "14px",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: theme == "dark" ? "#bfbfbf" : "#6C6A72", // Text color change
    }),
    multiValue: (provided, state) => ({
      ...provided,
      color: "#fff",
      backgroundColor: "#4f8cca", // Change background color of the selected value container
    }),
    multiValueLabel: (provided, state) => ({
      ...provided,
      color: "#fff",
    }),
  };
  const loadOrders = async (selectedValue = "") => {
    try {
      setLoading(true);
      setOrders([]);
      const response = await fetchOrdersInQueue(selectedValue);
      setOrders(response.data.data.result);
    } catch (error) {
      setOrders([]);
      console.error("Error fetching cards:", error);
    } finally {
      setLoading(false);
    }
  };
  const getCode = async () => {
    try {
      const res = await getAllMaterialCodes();
      const options = res.data.map((code) => ({
        label: code, // What you want to display in the dropdown
        value: code, // The value associated with the option
      }));
      setMaterialCodes(options);
    } catch {}
  };
  useEffect(() => {
    loadOrders();
    getCode();
  }, []);

  const [selectAll, setSelectAll] = useState(false);
  const handleSelectAllChange = (event) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);

    // Update all individual checkboxes based on select all state
    const newCheckedItems = {};
    orders.forEach((row) => {
      newCheckedItems[row._id] = isChecked;
    });
    setCheckedItems(newCheckedItems);
  };

  const handleCheckboxChangeEvent = (event, id, type) => {
    const isChecked = event.target.checked;
    setCheckedItems((prevState) => ({
      ...prevState,
      [id]: isChecked,
    }));
  };

  const moveQueue = () => {
    const checkedIds = Object.entries(checkedItems)
      .filter(([id, isChecked]) => isChecked)
      .map(([id]) => id);
    if (checkedIds.length === 0) {
      toast.error("Please check atleast one order");
    } else {
      checkedIds.forEach(async (id) => {
        const data = {
          id: id,
        };
        try {
          const res = await moveOrderStatus(data);
          if (res.data.status == "failure") {
            toast.error("This quote not downloaded yet. Please download quote");
          }
        } catch (error) {
          toast.error("Error when order move to Queue");
        }
      });
      setLoading(true);
      setTimeout(() => {
        loadOrders();
      }, 4000);
    }
  };
  const handleSortChange = (value) => {
    const selectedValue = value.value;
    setSelectedCode(value);
    loadOrders(selectedValue);
  };
  const getMonthYear = (dateStr) => {
    const date = new Date(dateStr);
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = String(date.getFullYear()).slice(-2);
    return `${month}-${year}`;
  };
  const getDateMonthYearWithSeconds = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${month}/${day}/${year} `;
  };

  const handleDownloadAll = async (data, id) => {
    const checkedIds = Object.keys(checkedItems).filter(
      (key) => checkedItems[key]
    );

    if (checkedIds.length === 0) {
      // console.log("No items selected");
      return;
    }
    const selectedOrders = orders.filter((order) =>
      checkedIds.includes(order._id)
    );

    const urls = selectedOrders.map((order) => order);
    const confirmSave = window.confirm(
      "Do you want to proceed with the download?"
    );
    if (!confirmSave) {
      // console.log("User canceled the download.");
      return; // Exit if the user clicks "Cancel"
    }
    selectedOrders.map(async (order) => {
      const param = {
        id: order._id,
        order_id: order.order_id,
        type: 0,
      };
      try {
        const result = await downloadParticularFile(param);
      } catch (error) {}
    });
    const zip = new JSZip();

    try {
      const filePromises = urls.map(async (url, index) => {
        const response = await fetch(url.dxf_url);
        const blob = await response.blob();
        const fileName = url.subquote_number + ".dxf";
        zip.file(fileName, blob);
      });

      await Promise.all(filePromises);

      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "files.zip");
      setTimeout(() => {
        loadOrders();
      }, 1000);
      setCheckedItems({});
    } catch (error) {
      console.error("Error downloading or zipping files:", error);
    }
  };

  return (
    <React.Fragment>
      <Card>
        <CardHeader className="py-4">
          <h5>Queue</h5>
        </CardHeader>
        <CardBody>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <Row className="px-2 gx-3">
              <Col lg={6} xxl={7}>
                <div className="d-flex align-items-center gap-2">
                  <Select
                    className="rounded-5 flex-grow-1"
                    styles={customStyles}
                    value={selectedCode}
                    onChange={handleSortChange}
                    options={materialCodes}
                    isSearchable={true}
                    placeholder="Select Material Code"
                  />
                  <Link
                    to={""}
                    className="flex-shrink-0 btn btn-primary d-inline-flex align-items-center justify-content-center"
                    onClick={() => {
                      setSelectedCode("");
                      loadOrders();
                    }}
                  >
                    {" "}
                    Clear
                  </Link>
                </div>
              </Col>
              <Col lg={3} xxl={5} className="text-lg-end">
                <Button
                  variant={null}
                  className="btn-outline-primary min-width-147"
                  onClick={handleDownloadAll}
                >
                  Download Files
                </Button>
              </Col>
              {/* <Col lg={3} xxl={3} className="text-lg-end">
                <Button
                  variant={null}
                  className="btn-outline-primary min-width-147"
                  onClick={moveQueue}
                >
                  Move To Archive
                </Button>
              </Col> */}
            </Row>
          </Form>
          <div className="table-responsive">
            <Table className="tablecustom pt-0">
              <thead>
                <tr>
                  <th>
                    <Form.Check
                      type="checkbox"
                      id={`selectall`}
                      checked={selectAll}
                      onChange={handleSelectAllChange}
                    />
                  </th>
                  <th>Name</th>
                  <th>Order Date</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <>
                    <tr className="text-center mt-2">
                      <td colSpan={4}>
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
                      </td>
                    </tr>
                  </>
                ) : (
                  <>
                    {orders && orders.length > 0 ? (
                      orders.map((row) => (
                        <React.Fragment>
                          <tr
                            className={
                              expandedRow === row._id ? "expanded-row" : ""
                            }
                          >
                            <td className="text-nowrap">
                              <Form.Check
                                type="checkbox"
                                id={`${row.material_code}${row._id}`}
                                checked={checkedItems[row._id] || false} // Set checked based on state
                                onChange={(event) =>
                                  handleCheckboxChangeEvent(
                                    event,
                                    row._id,
                                    "isChecked_material"
                                  )
                                }
                              />
                            </td>
                            <td className="text-nowrap">
                              {row.subquote_number}
                            </td>

                            <td className="text-nowrap">
                              {getDateMonthYearWithSeconds(row.createdAt)}
                            </td>
                            <td className="text-nowrap">DXF File</td>
                          </tr>
                        </React.Fragment>
                      ))
                    ) : (
                      <tr className="text-center mt-2">
                        <td colSpan={4}> No Queue Order Found. </td>
                      </tr>
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
