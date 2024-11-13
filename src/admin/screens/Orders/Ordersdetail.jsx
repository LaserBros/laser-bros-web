import React, { useEffect, useRef, useState } from "react";
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
import { Link, useNavigate, useParams } from "react-router-dom";
import file from "../../assets/img/file1.jpg";
import loaderimg from "../../../../src/assets/img/loader.svg";
import Select from "react-select";
import attachment from "../../assets/img/attachment.svg";
import AddNote from "../../components/AddNote";
import {
  AdminmoveOrderStatus,
  assignTaskToEmployees,
  getEmployeeDetails,
  getParticularOrderDetails,
  markCompleteQuote,
  moveOrderStatus,
  moveOrderToComplete,
  startPackaging,
  updateWorkStatus,
} from "../../../api/api";
import Amount from "../../../components/Amount";
import { ReactBarcode } from "react-jsbarcode";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { toast } from "react-toastify";
import DimensionsToggle from "../../../components/DimensionsToggle";
import { useTheme } from "../../../components/Themecontext";
import ConfirmationModal from "../../../components/ConfirmationModal";
import ConfirmationModal2 from "../../../components/ConfirmationModal";
import html2pdf from "html2pdf.js";

const OrdersDetail = () => {
  const pdfRef = useRef();

  const apiData = {
    quoteNumber: "11-24-0703",
    customerName: "Cort Van Wingerden",
    companyName: "Van Welder LLC",
    addressLine1: "909 E. Elm St.",
    addressLine2: "Suite 102",
    city: "Graham",
    state: "NC",
    zip: "27253",
    billingName: "Cort Van Wingerden",
    billingCompany: "Van Welder LLC",
    billingAddressLine1: "909 E. Elm St.",
    billingAddressLine2: "Suite 102",
    billingCity: "Graham",
    billingState: "NC",
    billingZip: "27253",
    shippingName: "Cort Van Wingerden",
    shippingCompany: "Van Welder LLC",
    shippingAddressLine1: "909 E. Elm St.",
    shippingAddressLine2: "Suite 102",
    shippingCity: "Graham",
    shippingState: "NC",
    shippingZip: "27253",
    orderDate: "09-11-2024",
    poNumber: "123987",
    shippingType: "UPS Ground",
    items: [
      {
        description: "Item 1",
        quantity: 3,
        priceEach: 3.25,
        totalPrice: 9.75,
        image: "https://via.placeholder.com/150",
      },
      {
        description: "Item 2",
        quantity: 3,
        priceEach: 3.25,
        totalPrice: 9.75,
        image:
          "https://laserbros-image-upload.s3.amazonaws.com/1730885032049-bridge/1730885032049-bridge.svg",
      },
      {
        description: "Item 3",
        quantity: 3,
        priceEach: 4.0,
        totalPrice: 12.0,
        image:
          "https://laserbros-image-upload.s3.amazonaws.com/1730885032049-bridge/1730885032049-bridge.svg",
      },
    ],
  };
  const [quoteData, setQuoteData] = useState(null);

  useEffect(() => {
    // Assuming `apiData` is the response you get from your API call
    setQuoteData(apiData);
  }, [apiData]);

  const generatePDF = async () => {
    const pdfElement = document.getElementById("quotePdf");
    const doc = new jsPDF("p", "pt", "a4");

    const canvas = await html2canvas(pdfElement);
    const imgData = canvas.toDataURL("image/png");

    // Add canvas image to PDF
    doc.addImage(imgData, "PNG", 0, 0, 595, 842);
    doc.save("Quote.pdf");
  };

  const loadImagesAsBase64 = async () => {
    const images = document.querySelectorAll("#pdf-content img");
    const promises = Array.from(images).map(async (img) => {
      try {
        if (
          img.src.startsWith("http") &&
          !img.src.includes(window.location.origin)
        ) {
          const response = await fetch(img.src, { mode: "cors" });
          if (!response.ok)
            throw new Error(`Failed to fetch image: ${img.src}`);

          const blob = await response.blob();
          const reader = new FileReader();

          return new Promise((resolve) => {
            reader.onload = () => {
              img.src = reader.result; // Replace image src with base64 data
              resolve();
            };
            reader.readAsDataURL(blob);
          });
        }
      } catch (error) {
        console.error(error); // Log the error for debugging
        return Promise.resolve(); // Continue without breaking
      }
    });
    return Promise.all(promises);
  };

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");
  const [errors, setErrors] = useState({});
  const [loadingWeight, setLoadingWeight] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [title, setTitle] = useState("");
  const [Ids, setIds] = useState("");
  const [typeId, setType] = useState("");
  const [eventId, setevent] = useState({});
  const validateFields = () => {
    const newErrors = {};

    if (!height || isNaN(height)) {
      newErrors.height = "Height must be a number.";
    }

    if (!weight || isNaN(weight)) {
      newErrors.Weight = "Weight must be a number.";
    }

    if (!width || isNaN(width)) {
      newErrors.Width = "Width must be a number.";
    }

    if (!length || isNaN(length)) {
      newErrors.Length = "Length must be a number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (validateFields()) {
  //     setLoadingWeight(true);
  //     // console.log(height, weight, width, length);
  //     try {
  //       const data = {
  //         id: order?.orderedQuote._id,
  //         weight: weight,
  //         length: length,
  //         width: width,
  //         height: height,
  //       };
  //       const res = await startPackaging(data);
  //       setLoadingWeight(false);
  //       navigate("/admin/complete-orders");
  //     } catch (error) {
  //       setLoadingWeight(false);
  //     }
  //   }
  // };

  const downloadPDF = async () => {
    await loadImagesAsBase64(); // Ensure all images are converted to base64
    const input = document.getElementById("pdf-content");

    // Use html2canvas to create a canvas from the content
    const canvas = await html2canvas(input, { useCORS: true });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    const imgWidth = 595.28; // A4 page width in points
    const imgHeight = (canvas.height * imgWidth) / canvas.width; // Scale height according to width

    // Calculate how many pages are needed
    const pageHeight = pdf.internal.pageSize.height; // Height of the PDF page
    let heightLeft = imgHeight; // Remaining height for the image

    let position = 0;

    // Add image to PDF, creating new pages as needed
    while (heightLeft >= 0) {
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight; // Decrease height left by one page height
      position -= pageHeight; // Move position for next page
      if (heightLeft >= 0) {
        pdf.addPage(); // Add a new page if there's still more content
      }
    }

    pdf.save("download.pdf");
  };

  const [modalShow, setModalShow] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);
  const [modalShow3, setModalShow3] = useState(false);
  const [customer_note, setcustomer_note] = useState(false);
  const [admin_note, setadmin_note] = useState(false);
  const navigate = useNavigate();
  const [order, setOrders] = useState([]);
  const handleShow = (customer_note, admin_note) => {
    setcustomer_note(customer_note);
    setadmin_note(admin_note);
    setModalShow(true);
  };

  const [Rowloading, setLoadingRow] = useState(true);
  const handleComplete = async () => {
    const id = Ids;
    setLoadingBtn(true);
    try {
      const data = {
        id: id,
      };
      const res = await markCompleteQuote(data);
      await fetchOrder();
      setModalShow3(false);
      setLoadingBtn(false);
    } catch (error) {
      setLoadingBtn(false);

      toast.error(error.response.data.message);
    }
  };
  const handleClose = () => setModalShow(false);
  const handleClose2 = () => setModalShow2(false);
  const handleClose3 = () => setModalShow3(false);
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
    loadEmp();
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

  const [shippingInfo, setShippingInfo] = useState([
    { height: "", weight: "", width: "", length: "" },
  ]);
  // const [errors, setErrors] = useState({}); // Initialize errors state

  // Add new empty shipping info section
  const handleAddMore = () => {
    setShippingInfo([
      ...shippingInfo,
      { height: "", weight: "", width: "", length: "" },
    ]);
  };

  // Remove specific shipping info section by index
  const handleRemove = (index) => {
    // Remove the shipping info at the specified index
    const newShippingInfo = [...shippingInfo];
    newShippingInfo.splice(index, 1);
    setShippingInfo(newShippingInfo);

    // Filter out errors related to the removed index
    const newErrors = { ...errors };
    delete newErrors[`height-${index}`];
    delete newErrors[`weight-${index}`];
    delete newErrors[`width-${index}`];
    delete newErrors[`length-${index}`];

    // Shift any remaining error keys down by one
    Object.keys(newErrors).forEach((key) => {
      const errorIndex = parseInt(key.split("-")[1], 10);
      if (errorIndex > index) {
        newErrors[`${key.split("-")[0]}-${errorIndex - 1}`] = newErrors[key];
        delete newErrors[key];
      }
    });

    setErrors(newErrors);
  };

  // Handle input change for specific fields in shipping info sections
  const handleInputChange = (index, field, value) => {
    const updatedInfo = [...shippingInfo];
    updatedInfo[index][field] = value;
    setShippingInfo(updatedInfo);
  };

  // Validate fields and submit the form
  const handleCompleteShip = async (e) => {
    setLoadingWeight(true);
    try {
      const new_data = {
        id: order?.orderedQuote._id,
        move_status: 3,
        status: 3,
      };
      await moveOrderToComplete(new_data);
      setLoadingWeight(false);
      navigate("/admin/complete-orders");
    } catch (error) {
      console.error("Error submitting data:", error);
      setLoadingWeight(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;
    const newErrors = {};

    // Validate each field in every shipping info entry
    shippingInfo.forEach((info, index) => {
      // Regular expression to check if a value is a number or float
      const numberRegex = /^[0-9]+(\.[0-9]+)?$/;

      if (!info.height) {
        hasError = true;
        newErrors[`height-${index}`] = "Height is required";
      } else if (!numberRegex.test(info.height)) {
        hasError = true;
        newErrors[`height-${index}`] = "Height must be a number or decimal";
      }

      if (!info.weight) {
        hasError = true;
        newErrors[`weight-${index}`] = "Weight is required";
      } else if (!numberRegex.test(info.weight)) {
        hasError = true;
        newErrors[`weight-${index}`] = "Weight must be a number or decimal";
      }

      if (!info.width) {
        hasError = true;
        newErrors[`width-${index}`] = "Width is required";
      } else if (!numberRegex.test(info.width)) {
        hasError = true;
        newErrors[`width-${index}`] = "Width must be a number or decimal";
      }

      if (!info.length) {
        hasError = true;
        newErrors[`length-${index}`] = "Length is required";
      } else if (!numberRegex.test(info.length)) {
        hasError = true;
        newErrors[`length-${index}`] = "Length must be a number or decimal";
      }
    });

    if (hasError) {
      setErrors(newErrors);
    } else {
      // Submit form data
      console.log("Submitting data:", shippingInfo);
      try {
        // Prepare an array of data for each shippingInfo item
        const dataArray = shippingInfo.map((info) => ({
          id: order?.orderedQuote._id,
          weight: info.weight,
          length: info.length,
          width: info.width,
          height: info.height,
        }));

        // Send each data entry in a loop
        for (const data of dataArray) {
          await startPackaging(data);
        }
        const new_data = {
          id: order?.orderedQuote._id,
          move_status: 3,
          status: 3,
        };
        await moveOrderToComplete(new_data);
        setLoadingWeight(false);
        navigate("/admin/complete-orders");
      } catch (error) {
        console.error("Error submitting data:", error);
        setLoadingWeight(false);
      }

      setErrors({});
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
  const [moveOrder, setMoveOrder] = useState(false);
  const handleMove = async (id) => {
    setMoveOrder(true);
    const data = {
      id: id,
      move_status: 2,
    };
    try {
      const res = await AdminmoveOrderStatus(data);
      toast.success("Order move sucessfully.");
      navigate("/admin/shipping-orders");
    } catch (error) {
      toast.error("Something wents wrong.");
    }
  };
  const handleCheckboxChangeEvent = async () => {
    const event = eventId;
    const id = Ids;
    const type = typeId;

    const isChecked = event.target.checked;
    var checked = 0;
    console.log("setevent", isChecked);
    setLoadingBtn(true);
    if (!isChecked) {
      checked = 1;
    } else {
      checked = 0;
    }
    const updatedMaterials = order.newUpdatedData.map((wo) => {
      if (wo._id === id) {
        return { ...wo, [type]: checked };
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
    setModalShow2(false);
    setLoadingBtn(false);
  };
  const MAX_LENGTH = 20;
  const shortenName = (materialCode, quoteName) => {
    // const combinedLength = materialCode.length + quoteName.length;

    // if (combinedLength > MAX_LENGTH) {
    //   const truncatedMaterialCode =
    //     materialCode.slice(0, Math.floor(19)) + "...";
    //   const truncatedQuoteName = quoteName.slice(0, Math.floor(MAX_LENGTH / 2));
    //   return `${truncatedMaterialCode}-${truncatedQuoteName}`;
    // }

    return `${materialCode}-${quoteName}`;
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
  // <p>{formatDate(order.createdAt)}</p>;
  const [selectedEmp, setSelectedEmp] = useState("");
  const [Emp, setEmp] = useState([]);
  const [EmpLoad, setEmpLoad] = useState(false);
  const { theme, togglenewTheme } = useTheme();
  useEffect(() => {
    const defaultEmployee = Emp.find(
      (emp) => emp.value === order?.orderedQuote?.task_assigned
    );

    if (defaultEmployee) {
      setSelectedEmp({
        value: defaultEmployee?.value,
        label: defaultEmployee?.label,
      });
    } else {
      setSelectedEmp();
    }
    // setSelectedEmp();
  }, [order]);

  const loadEmp = async () => {
    try {
      const res = await getEmployeeDetails();
      const options = res.data.map((code) => ({
        label: code.full_name,
        value: code._id,
      }));
      setEmp(options);
    } catch (error) {
      setEmp([]);
    }
  };

  const handleSortChange = (value) => {
    const selectedValue = value.value;
    setSelectedEmp(value);
  };
  const SaveEmp = async () => {
    setEmpLoad(true);
    try {
      const data = {
        id: order?.orderedQuote._id,
        employee_id: selectedEmp.value,
      };
      const res = await assignTaskToEmployees(data);
      setEmpLoad(false);
      toast.success("Employee assign sucessfully!!");
    } catch (error) {
      setEmpLoad(false);
      toast.error("Something wents wrong.");
    }
  };
  return (
    <div id="pdf-content">
      <React.Fragment>
        <div
          id="quote-pdf"
          style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}
        >
          <h2>Quote #{quoteData?.quoteNumber}</h2>

          {/* Customer Details */}
          <div style={{ marginBottom: "20px" }}>
            <strong>{quoteData?.customerName}</strong>
            <br />
            {quoteData?.companyName}
            <br />
            {quoteData?.addressLine1}
            <br />
            {quoteData?.addressLine2}
            <br />
            {quoteData?.city}, {quoteData?.state} {quoteData?.zip}
          </div>

          {/* Billing and Shipping Details */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <div>
              <strong>Bill To:</strong>
              <br />
              {quoteData?.billingName}
              <br />
              {quoteData?.billingCompany}
              <br />
              {quoteData?.billingAddressLine1}
              <br />
              {quoteData?.billingAddressLine2}
              <br />
              {quoteData?.billingCity}, {quoteData?.billingState}{" "}
              {quoteData?.billingZip}
            </div>
            <div>
              <strong>Ship To:</strong>
              <br />
              {quoteData?.shippingName}
              <br />
              {quoteData?.shippingCompany}
              <br />
              {quoteData?.shippingAddressLine1}
              <br />
              {quoteData?.shippingAddressLine2}
              <br />
              {quoteData?.shippingCity}, {quoteData?.shippingState}{" "}
              {quoteData?.shippingZip}
            </div>
          </div>

          {/* Order Information */}
          <div style={{ marginBottom: "20px" }}>
            <strong>Order Date:</strong> {quoteData?.orderDate || "N/A"}
            <br />
            <strong>PO Number:</strong> {quoteData?.poNumber || "N/A"}
            <br />
            <strong>Shipping Type:</strong> {quoteData?.shippingType || "N/A"}
          </div>

          {/* Table for Items */}
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>
                  Item Description
                </th>
                <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>
                  Qty
                </th>
                <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>
                  $ / Each
                </th>
                <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>
                  $ / Total
                </th>
              </tr>
            </thead>
            <tbody>
              {quoteData?.items?.map((item, index) => (
                <tr key={index}>
                  <td
                    style={{ padding: "8px", borderBottom: "1px solid #eee" }}
                  >
                    <img src={item.image} height={100} width={100} />
                  </td>
                  <td
                    style={{ padding: "8px", borderBottom: "1px solid #eee" }}
                  >
                    {item.description}
                  </td>
                  <td
                    style={{ padding: "8px", borderBottom: "1px solid #eee" }}
                  >
                    {item.quantity}
                  </td>
                  <td
                    style={{ padding: "8px", borderBottom: "1px solid #eee" }}
                  >
                    ${item.priceEach}
                  </td>
                  <td
                    style={{ padding: "8px", borderBottom: "1px solid #eee" }}
                  >
                    ${item.totalPrice}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!loading ? (
          <>
            <Card>
              <CardHeader className="d-flex align-items-center justify-content-between flex-wrap">
                <h5>
                  WO# LB-
                  {order?.newUpdatedData[0]?.search_quote}
                </h5>
                <div className="d-flex">
                  {order?.serviceCode?.name == "Local Pickup" &&
                    order?.orderedQuote.move_status === 2 && (
                      <>
                        <div className="orders-shipping mb-2">
                          <Button
                            type="submit"
                            // className="my-3 ms-3"
                            onClick={handleCompleteShip}
                            disabled={loadingWeight}
                          >
                            {loadingWeight ? (
                              <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                              ></span>
                            ) : (
                              "Move To Complete"
                            )}
                          </Button>
                        </div>
                      </>
                    )}
                  {order?.orderedQuote.status == 2 &&
                  order?.orderedQuote.move_status == 2 ? (
                    <Button
                      as={Link}
                      to="/admin/complete-orders"
                      className="d-inline-flex align-items-center justify-content-center ms-2"
                    >
                      Back
                    </Button>
                  ) : (
                    <Button
                      as={Link}
                      to="/admin/orders"
                      className="d-inline-flex align-items-center justify-content-center"
                    >
                      Back To Orders
                    </Button>
                  )}
                </div>
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
                      <div className="d-flex align-items-center mb-3">
                        <label>Shipping Type: </label>{" "}
                        <span>{order?.serviceCode?.name || "N/A"}</span>
                      </div>
                      <div className="d-flex align-items-center">
                        <label>Status: </label>{" "}
                        <span className="statusnew fw-medium">
                          {order?.orderedQuote.status == 0
                            ? "New"
                            : order?.orderedQuote.status == 1
                            ? "Paid"
                            : order?.orderedQuote.status == 2
                            ? "Complete"
                            : order?.orderedQuote.status == 3
                            ? "Complete"
                            : ""}
                        </span>
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
                      <div
                        className="text-center download-wo-allfiles"
                        style={{ cursor: "pointer" }}
                        onClick={downloadPDF}
                      >
                        <Icon icon="solar:file-download-linear" />
                        <p className="mb-0">Download WO</p>
                      </div>
                      <button onClick={generatePDF}>Generate Quote PDF</button>
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
                {order?.serviceCode?.name != "Local Pickup" &&
                  order?.orderedQuote.status == 3 &&
                  order?.orderedQuote.tracking_number && (
                    <div className="orders-shipping align-items-center justify-content-between flex-wrap my-2">
                      <div className="d-flex">
                        <p>Tracking Number : &nbsp;&nbsp;</p>
                        <p>
                          {order?.orderedQuote?.tracking_number?.join(", ")}
                        </p>
                      </div>
                      <div className="d-flex">
                        <p>Download Labels:&nbsp;&nbsp;</p>
                        {order?.orderedQuote?.label_url?.map((url, index) => (
                          <a
                            key={index}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="me-2" // Add some margin between links if needed
                          >
                            <p>Label {index + 1}</p>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                <div className="orders-shipping d-flex align-items-center justify-content-between flex-wrap my-2">
                  {order?.orderedQuote.status == 0 ? (
                    <>
                      <div>
                        <span
                          className=" d-inline-flex align-items-center justify-content-center"
                          style={{ paddingRight: "20px" }}
                        >
                          Select Employee
                        </span>
                      </div>
                      {/* {selectedEmp} -== */}
                      <Select
                        className="rounded-5 flex-grow-1 mr-2"
                        styles={customStyles}
                        value={selectedEmp == null ? "" : selectedEmp}
                        onChange={handleSortChange}
                        options={Emp}
                        isSearchable={false}
                        placeholder="Select Employee"
                      />
                      <div className="col-xxl-1 col-lg-1 text-lg-end">
                        <Link
                          className="btn btn-primary d-inline-flex align-items-center justify-content-center ml-2"
                          to={""}
                          onClick={() => {
                            SaveEmp();
                          }}
                          disabled={EmpLoad}
                        >
                          {EmpLoad ? (
                            <span
                              className="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>
                          ) : (
                            "Save"
                          )}
                        </Link>
                      </div>
                    </>
                  ) : (
                    <>
                      {order?.orderedQuote.employee_name ? (
                        <span>
                          <b>
                            Order assigned : {order?.orderedQuote.employee_name}
                          </b>
                        </span>
                      ) : (
                        <span>No Employee Selected</span>
                      )}
                    </>
                  )}
                </div>
                {order?.serviceCode?.name != "Local Pickup" ? (
                  order?.orderedQuote.move_status === 2 && (
                    <div className="orders-shipping">
                      <h5 className="py-3">Add Shipping Information</h5>

                      <Form className="accountform" onSubmit={handleSubmit}>
                        {shippingInfo.map((info, index) => (
                          <div
                            key={index}
                            className="shipping-info-section position-relative mb-4"
                          >
                            <Row>
                              <Col md={6}>
                                <Form.Group className="mb-3 form-group">
                                  <Form.Label>Height (in inches)</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter height in inches"
                                    value={info.height}
                                    onChange={(e) =>
                                      handleInputChange(
                                        index,
                                        "height",
                                        e.target.value
                                      )
                                    }
                                    isInvalid={!!errors[`height-${index}`]}
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {errors[`height-${index}`]}
                                  </Form.Control.Feedback>
                                </Form.Group>
                              </Col>
                              <Col md={6}>
                                <Form.Group className="mb-3 form-group">
                                  <Form.Label>Weight (in pounds)</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter weight in pounds"
                                    value={info.weight}
                                    onChange={(e) =>
                                      handleInputChange(
                                        index,
                                        "weight",
                                        e.target.value
                                      )
                                    }
                                    isInvalid={!!errors[`weight-${index}`]}
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {errors[`weight-${index}`]}
                                  </Form.Control.Feedback>
                                </Form.Group>
                              </Col>
                              <Col md={6}>
                                <Form.Group className="mb-3 form-group">
                                  <Form.Label>Width (in inches)</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter width in inches"
                                    value={info.width}
                                    onChange={(e) =>
                                      handleInputChange(
                                        index,
                                        "width",
                                        e.target.value
                                      )
                                    }
                                    isInvalid={!!errors[`width-${index}`]}
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {errors[`width-${index}`]}
                                  </Form.Control.Feedback>
                                </Form.Group>
                              </Col>
                              <Col md={6}>
                                <Form.Group className="mb-3 form-group">
                                  <Form.Label>Length (in inches)</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter length in inches"
                                    value={info.length}
                                    onChange={(e) =>
                                      handleInputChange(
                                        index,
                                        "length",
                                        e.target.value
                                      )
                                    }
                                    isInvalid={!!errors[`length-${index}`]}
                                  />
                                  <Form.Control.Feedback type="invalid">
                                    {errors[`length-${index}`]}
                                  </Form.Control.Feedback>
                                </Form.Group>
                              </Col>
                            </Row>

                            {/* Remove button */}
                            {index != 0 && shippingInfo.length > 1 && (
                              <Button
                                variant="danger"
                                className="remove-section-btn position-absolute"
                                style={{ top: "-17px", right: "10px" }}
                                onClick={() => handleRemove(index)}
                              >
                                - Remove
                              </Button>
                            )}
                          </div>
                        ))}

                        {/* Add more button */}
                        <Button
                          variant="primary"
                          className="my-2"
                          onClick={handleAddMore}
                        >
                          + Add More Shipping Info
                        </Button>

                        {/* Submit button */}
                        <Button
                          type="submit"
                          className="my-3 ms-3"
                          disabled={loadingWeight}
                        >
                          {loadingWeight ? (
                            <span
                              className="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>
                          ) : (
                            "Submit Shipping Information"
                          )}
                        </Button>
                      </Form>
                    </div>
                  )
                ) : (
                  <div></div>
                )}

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

                  {order?.orderedQuote.status == 2 &&
                    order?.orderedQuote.move_status != 2 && (
                      <Link
                        className="btnnote p-3 btn-success btn text-white"
                        onClick={() => {
                          handleMove(order?.orderedQuote._id);
                        }}
                        disabled={moveOrder}
                      >
                        {moveOrder ? (
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        ) : (
                          " Move To Shipping Order"
                        )}
                      </Link>
                    )}
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
                  {order.newUpdatedData
                    .slice()
                    .reverse()
                    .map((wo, index) => (
                      <div className="list-main  d-inline-flex justify-content-between w-100">
                        <div className="list-left d-inline-flex">
                          <div
                            className="list-img-outer"
                            style={{ width: "110px" }}
                          >
                            <div className="list-img">
                              <Image
                                src={wo.image_url}
                                alt={wo.image_url}
                                className="img-fluid"
                                style={{
                                  objectFit: "contain", // use camelCase for CSS properties
                                  height: "65px", // specify values as strings
                                }}
                              />
                            </div>
                            {/* <span>{wo.dimension}</span> */}
                            <DimensionsToggle
                              dimensions={wo.dimensions}
                              id={wo._id}
                              type={wo.dimension_type}
                              // isEdit={true}
                            />
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
                            <span
                              className="num-dim mb-2"
                              style={{ fontSize: "12px" }}
                            >
                              {wo?.subquote_number}
                            </span>
                            {wo.pierce_count && (
                              <>
                                <br></br>
                                <span
                                  className="num-dim mb-2"
                                  style={{ fontSize: "12px" }}
                                >
                                  Pierce Count : {wo.pierce_count}
                                  {/* </span> */}
                                </span>
                              </>
                            )}
                            <div className="list-qty d-flex align-items-center gap-3 mb-3 pt-3">
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
                            {wo.isDownloaded == 1 && wo.isCompleted == 0 && (
                              <Link
                                className="btnnote ms-2"
                                onClick={() => {
                                  setIds(wo._id);
                                  setModalShow3(true);
                                  // handleComplete(wo._id);
                                }}
                              >
                                {Rowloading == wo._id ? (
                                  <span
                                    className="spinner-border spinner-border-sm"
                                    role="status"
                                    aria-hidden="true"
                                  ></span>
                                ) : (
                                  "Mark Complete"
                                )}
                              </Link>
                            )}
                            {wo.isCompleted == 1 && (
                              <Link className="ms-2 text-success text-decoration-none">
                                Completed
                              </Link>
                            )}
                          </div>
                        </div>

                        <div className="list-checkboxes  d-inline-flex gap-3">
                          <div className="custom-checkbox-container text-center">
                            <label
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
                              disabled={
                                order?.orderedQuote.status == 3 ? true : false
                              }
                              onChange={(event) => {
                                // handleCheckboxChangeEvent(
                                //   event,
                                //   wo._id,
                                //   "isChecked_material"
                                // )
                                setIds(wo._id);
                                setevent(event);
                                setType("isChecked_material");
                                setModalShow2(true);
                              }}
                            />
                          </div>
                          {wo.bend_count > 0 && (
                            <div className="custom-checkbox-container text-center">
                              <label
                                className="custom-label-tag"
                                htmlFor={`${wo._id}-POST`}
                                style={getMaterialColor(
                                  wo?.material_name + " " + wo?.material_grade
                                )}
                              >
                                Bend ({wo.bend_count})
                              </label>
                              <Form.Check
                                type="checkbox"
                                id={`${wo._id}-POST`}
                                disabled={
                                  order?.orderedQuote.status == 3 ? true : false
                                }
                                checked={wo.isChecked_bend == 1}
                                onChange={(event) => {
                                  // handleCheckboxChangeEvent(
                                  //   event,
                                  //   wo._id,
                                  //   "isChecked_bend"
                                  // )
                                  setIds(wo._id);
                                  setevent(event);
                                  setType("isChecked_bend");
                                  setModalShow2(true);
                                }}
                              />
                            </div>
                          )}
                          <div className="custom-checkbox-container text-center">
                            <label
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
                              disabled={
                                order?.orderedQuote.status == 3 ? true : false
                              }
                              onChange={(event) => {
                                // handleCheckboxChangeEvent(
                                //   event,
                                //   wo._id,
                                //   "isChecked_bend"
                                // )
                                setIds(wo._id);
                                setevent(event);
                                setType("isChecked_PO");
                                setModalShow2(true);
                              }}
                            />
                          </div>
                          {wo.finishing_desc && (
                            <div className="custom-checkbox-container text-center">
                              <label
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
                                disabled={
                                  order?.orderedQuote.status == 3 ? true : false
                                }
                                onChange={(event) => {
                                  // handleCheckboxChangeEvent(
                                  //   event,
                                  //   wo._id,
                                  //   "isChecked_bend"
                                  // )
                                  setIds(wo._id);
                                  setevent(event);
                                  setType("isChecked_finish");
                                  setModalShow2(true);
                                }}
                              />
                            </div>
                          )}
                        </div>
                        {wo.bend_count > 0 ? (
                          <div>
                            {wo.bendupload_url.map((url, index) => (
                              <a
                                href={url}
                                download="filename.pdf"
                                style={{ paddingLeft: "9px" }}
                              >
                                <div className="list-attachment text-center d-inline-flex flex-column align-items-center">
                                  <Image
                                    src={attachment}
                                    className="img-fluid"
                                    alt=""
                                  />
                                  <span>Attachment {String(index + 1)}</span>
                                </div>
                              </a>
                            ))}
                          </div>
                        ) : (
                          <div className="list-attachment text-center d-inline-flex flex-column align-items-center"></div>
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
        <ConfirmationModal
          show={modalShow2}
          onHide={handleClose2}
          title={"Are you sure?"}
          desc={title}
          yesBtnText={"Yes"}
          noBtnText={"No"}
          onConfirm={handleCheckboxChangeEvent}
          loading={loadingBtn}
        />
        <ConfirmationModal2
          show={modalShow3}
          onHide={handleClose3}
          title={"Are you sure?"}
          desc={title}
          yesBtnText={"Yes"}
          noBtnText={"No"}
          onConfirm={handleComplete}
          loading={loadingBtn}
        />
      </React.Fragment>
    </div>
  );
};

export default OrdersDetail;
