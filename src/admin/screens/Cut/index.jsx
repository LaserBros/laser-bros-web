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
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Icon } from "@iconify/react";
import attachment from "../../assets/img/attachment.svg";
import { downloadParticularFile, fetchOrdersInArchive } from "../../../api/api";
const Cut = () => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await fetchOrdersInArchive();
      console.log("response.data", response.data);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching cards:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadOrders();
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
      // Fetch the file as a blob
      const response = await fetch(url);
      const blob = await response.blob();

      // Create a temporary URL for the blob
      const blobUrl = window.URL.createObjectURL(blob);

      // Create a link element
      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", name); // Set the custom file name

      // Append the link to the document and trigger the download
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl); // Revoke the blob URL after the download
    } catch (error) {
      console.error("Download failed:", error);
    }
  };
  const getDateMonthYearWithSeconds = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}/${month}/${year} `;
  };
  const handleDownloadAll = async (data, id) => {
    const checkedIds = Object.keys(checkedItems).filter(
      (key) => checkedItems[key]
    );

    if (checkedIds.length === 0) {
      console.log("No items selected");
      return;
    }
    const selectedOrders = orders.filter((order) =>
      checkedIds.includes(order._id)
    );

    const urls = selectedOrders.map((order) => order);

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
        console.log(url.dxf_url);
        const response = await fetch(url);
        const blob = await response.blob();
        const fileName =
          url.material_code +
          "-" +
          url.quantity +
          "-" +
          getMonthYear(url.createdAt) +
          "-" +
          url.quote_number;
        zip.file(fileName, blob);
      });

      await Promise.all(filePromises);

      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "files.zip");
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
          <Form>
            <Row className="px-2 gx-3">
              <Col lg={3} xxl={2}>
                <Button
                  variant={null}
                  className="btn-outline-primary min-width-147"
                  onClick={handleDownloadAll}
                >
                  Download Files
                </Button>
              </Col>
            </Row>
          </Form>
          <div className="table-responsive">
            <Table className="tablecustom pt-0">
              <thead>
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
              </thead>
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
                        <React.Fragment key={row._id}>
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
                              {row.material_code}-{row.quantity}-
                              {getMonthYear(row.createdAt)}-{row.quote_number}
                            </td>

                            <td className="text-nowrap">
                              {getDateMonthYearWithSeconds(row.createdAt)}
                            </td>
                            <td className="text-nowrap">DXF File</td>
                          </tr>
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

export default Cut;
