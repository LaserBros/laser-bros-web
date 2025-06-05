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
  Modal,
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
  generateOrderPDF,
  updateWorkStatus, 
  getShippingRates,
  fetchShippingBoxDetails,
  orderAdminTrackingDetails,
  getSubQuote,
  generateOrderPDFAdmin,
  moveOrderToLocalPickup,
  refundLabelData,
} from "../../../api/empApi";
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
import AddressDetails from "../../components/AddressDetails";
import ShippingStatus from "../../../components/ShippingStatus";
import ModalOrderData from "../../components/OrderData";
import getMaterialColor from "../../components/ColorCode";
import ModalShippingInfo from "../../components/ModalShippingInfo";
import { encodeS3Url } from "../../../utils/encodeS3Url";
import { getFormattedSubquote } from "../../../utils/AddBendingQuote";

const OrdersDetail = () => { 
  const pdfRef = useRef();

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");
  const [errors, setErrors] = useState({});
  const [loadingWeight, setLoadingWeight] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [title, setTitle] = useState("");
  const [Ids, setIds] = useState("");
  const [loadingBtn6, setLoadingBtn6] = useState(false);
  const [typeId, setType] = useState("");
  const [subPostId, setsubPostId] = useState("")
  const [modalShow6, setModalShow6] = useState(false);
  const handleClose6 = () => setModalShow6(false);
  const [eventId, setevent] = useState({});
  const [loadingInfo, setloadingInfo] = useState("");
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [ordersTrack, setordersTrack] = useState([]);
  const [modalShowTrack, setModalShowTrack] = useState(false);
  const handleShowTrack = async (value) => {
    setLoadingOrder(true);
    setModalShowTrack(true);
    setLoadingOrder(false);
  };
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
  const [LoadRefund,setLoadRefund] = useState("");
  const [LabelId,setLabelId] = useState("");
  const [RefundId,setRefundId] = useState("");
    const AddRefund = (e, id, label_id) => {
      setModalShow6(true);
      setLabelId(label_id);
      setRefundId(id);
    }
    const handleRefundLabel = async () => {
      setLoadRefund(id);
      const data = {
        id:RefundId,
        label_id:LabelId
      }
      setLoadingBtn6(true);
      await refundLabelData(data);
      shipping();
      loadEmp();
      setLoadRefund("");
      setLoadingBtn6(false);
      setModalShow6(false); 
      
    };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (validateFields()) {
  //     setLoadingWeight(true);
  //     // // console.log(height, weight, width, length);
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
  //       navigate("/employee/complete-orders");
  //     } catch (error) {
  //       setLoadingWeight(false);
  //     }
  //   }
  // };

  const downloadPDF = async () => {

    try {
      const data = {
        orderId: order?.orderedQuote._id
      }
      const response = await generateOrderPDFAdmin(data);
      if (response.data && response.data.pdf_url) {
        const pdfUrl = response.data.pdf_url;
        const fileName = `WO#${order?.newUpdatedData[0]?.search_quote}.pdf`;
    
        // Fetch the PDF file as a blob
        const pdfResponse = await fetch(pdfUrl);
        const blob = await pdfResponse.blob();
    
        // Create a blob URL
        const blobUrl = window.URL.createObjectURL(blob);
    
        // Create a link element and trigger download
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = fileName; // Custom filename
        document.body.appendChild(link);
        link.click();
    
        // Cleanup
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      }
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

  const [boxes, setBoxes] = useState([
    { length: "", width: "", height: "", weight: "" },
  ]);

  // Add a new box
  const addBox = () => {
    setBoxes([...boxes, { length: "", width: "", height: "", weight: "" }]);
  };

  // Remove a box
  const removeBox = (index) => {
    const updatedBoxes = boxes.filter((_, i) => i !== index);
    setBoxes(updatedBoxes);
  };

  // Handle input change for specific box
  const handleInputChangeBox = (index, field, value) => {
    const updatedBoxes = boxes?.map((box, i) =>
      i === index ? { ...box, [field]: value } : box
    );
    setBoxes(updatedBoxes);
  };

  const [modalShow, setModalShow] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);
  const [modalShow3, setModalShow3] = useState(false);
  const [modalShow4, setModalShow4] = useState(false);
  const [modalShow5, setModalShow5] = useState(false);
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
  const handleCloseTrack = () => setModalShowTrack(false);
  const handleClose = () => setModalShow(false);
  const handleClose2 = () => setModalShow2(false);
  const handleClose3 = () => setModalShow3(false);
  const [subquote_number, setsubquote_number] = useState("");
  const [loadingOrderQuote, setLoadingOrderQuote] = useState(false);
  const handleShow4 = async (id) => {
    try {
      setLoadingOrderQuote(id);
      const res = await getSubQuote(id);
      setsubquote_number(res.data);
      setLoadingOrderQuote("");
      setModalShow4(true);
    } catch (error) {
      setLoadingOrderQuote("");
    }
  };
  const handleClose5 = () => setModalShow5(false);
  const handleClose4 = () => setModalShow4(false);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [orderInfo, setOrderInfo] = useState("");
  const fetchOrder = async () => {
    const data = {
      id: id,
    };
    const res = await getParticularOrderDetails(data);

    setOrders(res.data);
    setLoading(false);
  };
  const shipping = async () => {
    const data = {
      id: id,
    };
    const res = await fetchShippingBoxDetails(data);
    setOrderInfo(res.data);
  };
  useEffect(() => {
    shipping();
    fetchOrder();
    loadEmp();
    TrackOrder();
  }, []);
  const handleDownloadAll = async (data) => {
    const zip = new JSZip();
    const fileNameCount = {}; // Track occurrences of file names
  
    try {
      const filePromises = data.flatMap((item) => {
        
        const urls = [item.dxf_url, ...(item.bendupload_url || [])];
  
        return urls.map(async (url) => {
          if (!url) return; // Skip if URL is missing
  
          const response = await fetch(url);
          const blob = await response.blob();
  
          let fileName = url.split("/").pop(); // Extract file name from URL
          fileName = fileName.replace(/^\d+-/, "");
          // Check for duplicate file names
          if (fileNameCount[fileName]) {
            fileNameCount[fileName] += 1;
            const extensionIndex = fileName.lastIndexOf(".");
            if (extensionIndex !== -1) {
              const baseName = fileName.slice(0, extensionIndex);
              const extension = fileName.slice(extensionIndex);
              // console.log("${fileNameCount[fileName]}",`${fileNameCount[fileName]}`);
              fileName = `${baseName}(${fileNameCount[fileName]})${extension}`;
            } else {
              // console.log("fileName",`${fileName}`);
              fileName = `${fileName}(${fileNameCount[fileName]})`;
            }
          } else {
            fileNameCount[fileName] = 1;
          }
  
          zip.file(fileName, blob);
        });
      });
  
      await Promise.all(filePromises);
  
      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "WO#" + order?.newUpdatedData[0]?.search_quote + ".zip");
    } catch (error) {
      console.error("Error downloading or zipping files:", error);
    }
  };
  
  const onClickShipping = () => {
    setModalShow5(true);
  }

  const calculateRefresh = (index) => {
    const box = boxes[index];
    const updatedBoxesVal = boxes.map((box, i) =>
      i === index
        ? {
            ...box,
            length: "",
            width: "",
            height: "",
            weight: "",
            downloadLabel: "",
            shippingMethods: "",
          }
        : box
    );
    setBoxes(updatedBoxesVal);
  };
  const calculateRate = async (index) => {
    const box = boxes[index];
    if (!box.length || !box.width || !box.height || !box.weight) {
      alert("Please fill in all fields for dimensions and weight.");
      return;
    }

    // Example calculation logic (replace with actual API call if needed)
    const rate =
      parseFloat(box.length) +
      parseFloat(box.width) +
      parseFloat(box.height) +
      parseFloat(box.weight);
    const data = {
      length: box.length,
      width: box.width,
      height: box.height,
      weight: box.weight,
      id: id,
    };
    setloadingInfo(index);
    const res = await getShippingRates(data);
    setloadingInfo("");
    const serviceOrder = [
      'UPS Ground®',
      'UPS 2nd Day Air®',
      'UPS Next Day Air®'
    ];
    
    // sort the shipping methods based on service_type
    const sortedShippingMethods = Array.isArray(res.data)
      ? [...res.data].sort(
          (a, b) =>
            serviceOrder.indexOf(a.service_type) - serviceOrder.indexOf(b.service_type)
        )
      : [];
      console.log("sortedShippingMethods",sortedShippingMethods)
    const updatedBoxes = boxes.map((box, i) =>
      i === index
        ? {
            ...box,
            shippingMethods: sortedShippingMethods,
          }
        : box
    );
    setBoxes(updatedBoxes);
    // // Update the rate for the specific box
    // const updatedBoxes = boxes.map((box, i) =>
    //   i === index ? { ...box, rate: `$${rate.toFixed(2)}` } : box
    // );
    // setBoxes(updatedBoxes);
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

    const [submitComplete,setsubmitComplete] = useState(false);
  
    const submitCompleteAction = () => {
      setsubmitComplete(true);
    }
    
    const submitCompleteActionClose = () => {
      setsubmitComplete(false);
    }
  // Validate fields and submit the form
   const handleCompleteShipLocal = async () => {
      setLoadingWeight(true);
      try {
        const new_data = {
          id: order?.orderedQuote._id,
          move_status: 3,
          status: 3,
          service_code:'local_pickup'
        }; 
        await moveOrderToLocalPickup(new_data);
        setLoadingWeight(false);
        navigate("/employee/complete-orders");
      } catch (error) {
        console.error("Error submitting data:", error);
        setLoadingWeight(false);
      }
    }
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
      navigate("/employee/complete-orders");
    } catch (error) {
      console.error("Error submitting data:", error);
      setLoadingWeight(false);
    }
  };

  const handleSubmitData = async (index) => {
    
    const box = boxes[index];
    if (!box.length || !box.width || !box.height || !box.weight) {
      alert("Please fill in all fields for dimensions and weight.");
      return;
    }

    // Example calculation logic (replace with actual API call if needed)
    const rate =
      parseFloat(box.length) +
      parseFloat(box.width) +
      parseFloat(box.height) +
      parseFloat(box.weight);
    // // console.log(":Fdfdfdf=-==-=", orderInfo.length + parseInt(index) + 1);
    // return;
    const data = {
      length: box.length,
      width: box.width,
      height: box.height,
      weight: box.weight,
      box_id: "box_" + id + "_" + orderInfo?.length + parseInt(index) + 1+ "_" + Date.now(),
      id: id,
      service_code:selectedMethod

    };
    try {
      setloadingInfo(index);
      const res = await startPackaging(data);
      setloadingInfo("");
      shipping();
      loadEmp();
      const updatedBoxes = boxes.map((box, i) =>
        i === index
          ? {
              ...box,
              downloadLabel: res.data.box_details,
            }
          : box
      );
      setBoxes(updatedBoxes);
      const updatedBoxesVal = boxes.map((box, i) =>
        i === index
          ? {
              ...box,
              length: "",
              width: "",
              height: "",
              weight: "",
              downloadLabel: "",
              shippingMethods: "",
            }
          : box
      );
      setBoxes(updatedBoxesVal);
    } catch (error) {
      toast.error(error.response.data.error[0].message);
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
      // console.log("Submitting data:", shippingInfo);
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
        navigate("/employee/complete-orders");
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
      status: 2,
    };
    try {
      const res = await AdminmoveOrderStatus(data);
      toast.success("Order move sucessfully.");
      navigate("/employee/shipping-orders");
    } catch (error) {
      toast.error("Something wents wrong.");
    }
  };
  const TrackOrder = async () => {
    const data = {
      id: id,
    };
    const res = await orderAdminTrackingDetails(data);
    setordersTrack(res.data);
    // settrackNumber(res.data);
  };
  const ShippingInfoData = async (form) => {
    // console.log("Sdsdsdsdsds",form)
    var formData = new FormData();
    formData.append("file", form.file);
    formData.append("freight_carrier_name", form.freight_carrier_name);
    formData.append("freight_tracking", form.freight_tracking);
    formData.append("id", order?.orderedQuote._id);
    formData.append("move_status", 3);
    formData.append("status", 3);
    try {
      await moveOrderToComplete(formData);
      toast.success("Shipping information added sucessfully!")
      setLoadingWeight(false);
      navigate("/employee/complete-orders");
    } catch (error) {
      console.error("Error submitting data:", error);
      setLoadingWeight(false);
      return;
    }
      

  }

  const handleCheckboxChangeEvent = async () => {
    const event = eventId;
    const id = Ids;
    const type = typeId;

    const isChecked = event.target.checked;
    var checked = 0;
    // console.log("setevent", isChecked);
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
    // console.log(updatedMaterials);
    setOrders((prevOrders) => ({
      ...prevOrders,
      newUpdatedData: updatedMaterials, // Update the specific part of the state
    }));

    const data = {
      id: id,
      type:
        type === "isChecked_material"
          ? "isChecked_material"
          : type === "isChecked_SubPo"
          ? "isChecked_SubPo"
          : type === "isChecked_PO"
          ? "isChecked_PO"
          : checked,
      checked: checked,
      postOps_id: subPostId,
    };
    const res = await updateWorkStatus(data);
    await fetchOrder();
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

    return `${quoteName}`;
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
    return `${month}/${day}/${year}`; // Customize as needed (MM/DD/YYYY)
  };
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: `1px solid ${
        theme === "darks" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.15)"
      }`,
      background: theme == "darks" ? "#212121" : "#fff",
      boxShadow: "none",
      minHeight: "50px",
      borderRadius: "40px",
      fontSize: "14px",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: theme == "darks" ? "#bfbfbf" : "#6C6A72", // Text color change
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
  const handleBack = () => {
    navigate("/employee/orders",{ state: { message: "Hello from Home Page" } }); 
  };
  // <p>{formatDate(order.createdAt)}</p>;
  const [selectedEmp, setSelectedEmp] = useState("");
  const [Emp, setEmp] = useState([]);
  const [EmpLoad, setEmpLoad] = useState(false);
  const { theme, togglenewTheme } = useTheme();
  useEffect(() => {
    // console.log("order?.orderedQuote?.service_code",order?.orderedQuote?.service_code)
    setSelectedMethod(order?.orderedQuote?.service_code);
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

  const [selectedMethod, setSelectedMethod] = useState(null);
  const handleCheckboxChange = (service_code) => {
    setSelectedMethod(service_code);
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
  
  return (
    <div id="pdf-content">
      <React.Fragment>
        {!loading ? (
          <>
            <Card>
              <CardHeader className="d-flex align-items-center justify-content-between flex-wrap">
                <h5>
                  WO#
                  {order?.newUpdatedData[0]?.search_quote}
                </h5>
                <div className="d-flex">
                  {/* {order?.orderedQuote.move_status} ====== */}
                  {order?.serviceCode?.name == "Local Pickup" &&
                    order?.orderedQuote.status === 3 && order?.orderedQuote.move_status != 3 && (
                      <>
                        <div className="orders-shipping mb-2">
                          <Button
                            type="submit"
                            // className="my-3 ms-3"
                            onClick={handleCompleteShip}
                            disabled={loadingWeight}
                            className="me-2"
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
                  {/* <Button
                    as={Link}
                    to={'/employee/payment-history/view-payment/'+order.transactionDetails?._id}
                     target="_blank"
                      rel="noopener noreferrer"
                    className="d-inline-flex align-items-center justify-content-center me-2"
                  >
                    View Transaction
                  </Button> */}
                  <Button
                    onClick={handleBack}
                    className="d-inline-flex align-items-center justify-content-center"
                  >
                    Back
                  </Button>
                </div>
              </CardHeader>
              <CardBody>
                <Row>
                  {/* <Col md={6} lg={4} xl={3} className="mb-3">
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
                  </Col> */}
                  {/* <Col md={6} lg={4} xl={3} className="mb-3">
                    <div className="orders-card">
                      <div className="d-flex align-items-center mb-3">
                        <label>Order Date: </label>{" "}
                        <span>{formatDate(order?.orderedQuote.createdAt)}</span>
                      </div>
                     
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
                  </Col> */}
                  {/* <Col md={6} lg={4} xl={6} className="text-xl-end mb-3">
                   
                    <ReactBarcode
                      value={`WO# LB-${getMonthYear(
                        order?.orderedQuote.createdAt
                      )}-
                ${order?.orderedQuote.quote_number}`}
                      options={{
                        width: 0.6,
                        textAlign: "right",
                        text: " ",
                      
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

                      <div
                        className="text-center download-wo-allfiles"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDownloadAll(order.newUpdatedData)}
                      >
                        <Icon icon="bytesize:download" />
                        <p className="mb-0">Download All Files</p>
                      </div>
                    </div>
                  </Col> */}
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
                <AddressDetails
                  shipAddress={order?.orderedQuote?.billing_address}
                  billAdress={order?.orderedQuote}
                  addressDetail={order?.orderedQuote}
                  po_number={order?.orderedQuote?.po_number}
                  po_upload={order?.orderedQuote?.po_upload}
                  isShowDownload={true}
                  onClickDownloadWO={downloadPDF}
                  onClickDownloadAllFile={() =>
                    handleDownloadAll(order.newUpdatedData)
                  }
                  isShowTrack={true}
                  onClickTrack={handleShowTrack}
                  isShippingInfo={true}
                  onClickShipping={onClickShipping}
                />

                {order?.orderedQuote.status == 0 ? (
                  <>
                    {/* <div className="orders-shipping d-flex align-items-center justify-content-between flex-wrap my-2">
                      <div>
                        <span
                          className=" d-inline-flex align-items-center justify-content-center"
                          style={{ paddingRight: "20px" }}
                        >
                          Select Employee
                        </span>
                      </div>
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
                    </div> */}
                  </>
                ) : (
                  <>
                    {order?.orderedQuote.employee_name ? (
                      <div className="orders-shipping d-flex align-items-center justify-content-between flex-wrap my-2">
                        <span>
                          <b>
                            Order assigned : {order?.orderedQuote.employee_name}
                          </b>
                        </span>
                      </div>
                    ) : (
                      <span></span>
                      // <span>No Employee Selected</span>
                    )}
                  </>
                )}
                {order?.orderedQuote?.service_code != "custom_rates" && (
                order?.orderedQuote.move_status === 2 ? (
                  <div className="orders-shipping">
                    <div className="shipping-container">
                      {orderInfo?.map((Info, index) => (
                        <div className="ShippingPackageOrder_info d-flex">
                          <div className="d-flex gap_10">
                            <p>Height : {Info?.dimensions?.height} In</p>
                            <p>Width : {Info?.dimensions?.width} In</p>

                            <p>Length : {Info?.dimensions?.length} In</p>
                            <p>Weight : {Info?.weight} lb</p>
                            <a
                              href={Info?.label_url}
                              target="_blank"
                              className="downloadLabel_btn"
                            >
                              Download Label
                            </a>
                            <Link className="RefundLabel_btn" 
                                                         // to={"/"}
                                                         onClick={(e) =>
                                                           AddRefund(
                                                             e,
                                                             Info?._id,
                                                             Info?.label_id
                                                           )
                                                         }
                                                         >
                                                              {LoadRefund == Info?._id ? (
                                                         <span
                                                           className="spinner-border spinner-border-sm"
                                                           role="status"
                                                           aria-hidden="true"
                                                         ></span>
                                                       ) : (
                                                         "Refund Label"
                                                       )}
                                                          
                                                         </Link>
                          </div>
                        </div>
                      ))}
                      <div className="section packageDeminsionMain_div">
                        
                        {boxes?.map((box, index) => (
                          <Row
                            className="section DeminsionMain_div"
                          >
                            <Col lg={6} className="align-self-center">
                              <div className="d-flex align-items-center gap_20">
                                <div className="PachageField_div flex-grow-1">
                                  <div className="mb-4">
                                    <h4 className="PachageField_label">
                                      Dimensions
                                    </h4>
                                    <div className="DeminsionField_flex">
                                      <div className="PachageField_box">
                                        <span className="PachageField_Size">
                                          L
                                        </span>
                                        <input
                                          className="PachageField_number"
                                          type="number"
                                          placeholder=""
                                          value={box.length}
                                          onChange={(e) =>
                                            handleInputChangeBox(
                                              index,
                                              "length",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </div>
                                      X
                                      <div className="PachageField_box">
                                        <span className="PachageField_Size">
                                          W
                                        </span>
                                        <input
                                          className="PachageField_number"
                                          type="number"
                                          placeholder=""
                                          value={box.width}
                                          onChange={(e) =>
                                            handleInputChangeBox(
                                              index,
                                              "width",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </div>
                                      X
                                      <div className="PachageField_box">
                                        <span className="PachageField_Size">
                                          H
                                        </span>
                                        <input
                                          className="PachageField_number"
                                          type="number"
                                          placeholder=""
                                          value={box.height}
                                          onChange={(e) =>
                                            handleInputChangeBox(
                                              index,
                                              "height",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </div>
                                      <select
                                        className="PachageFieldSizeSelect"
                                        onChange={(e) =>
                                          handleInputChangeBox(
                                            index,
                                            "unit",
                                            e.target.value
                                          )
                                        }
                                      >
                                        <option value="in">in</option>
                                      </select>
                                    </div>
                                    <p className="PackageFieldSubtitle">
                                      Enter dimensions of package
                                    </p>
                                  </div>
                                  <div className="mb-4">
                                    <h4 className="PachageField_label">
                                      Package Weight
                                    </h4>
                                    <div className="d-flex justify-content-between">
                                      <div className="DeminsionField_flex max_250">
                                        <div className="PachageField_box">
                                          <input
                                            className="PachageField_number"
                                            type="number"
                                            placeholder=""
                                            value={box.weight}
                                            onChange={(e) =>
                                              handleInputChangeBox(
                                                index,
                                                "weight",
                                                e.target.value
                                              )
                                            }
                                          />
                                        </div>
                                        <select className="PachageFieldSizeSelect">
                                          <option value="lb">lb</option>
                                        </select>
                                      </div>
                                      {box.shippingMethods && (
                                        <div className="refresh_btn mt-1">
                                          <button
                                            className="btn PackageAddAnother_btn"
                                            onClick={() =>
                                              calculateRefresh(index)
                                            }
                                          >
                                            Refresh
                                          </button>
                                        </div>
                                      )}
                                    </div>
                                    {/* {box.shippingMethods && ( */}

                                    {/* )} */}
                                  </div>
                                </div>
                                <div className="flex-shrink-0">
                                  {!box.shippingMethods ? (
                                    <>
                                      <button
                                        className="btn getRate_btn"
                                        onClick={() => calculateRate(index)}
                                      >
                                        {loadingInfo === index ? (
                                          <span
                                            className="spinner-border spinner-border-sm"
                                            role="status"
                                            aria-hidden="true"
                                          ></span>
                                        ) : (
                                          "Get Rates"
                                        )}
                                      </button>
                                    </>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            </Col>
                            <Col lg={6} className="align-self-center">
                              <div className="dimensionShow_div">
                                <div className="flex-grow-1">
                                  {box.shippingMethods ? (
                                    <>
                                      <h4 className="ShippingMethodmain_title">
                                        Shipping Method
                                      </h4>
                                      <div className="dimensionShowCheckbox_div">
                                        <input
                                          type="checkbox"
                                          id="localPickup"
                                          checked={
                                            selectedMethod == "local_pickup" || selectedMethod ==
                                            "Local Pickup (FREE)"
                                              ? true
                                              : false
                                          }
                                          // disabled={true}
                                          onChange={() =>
                                            handleCheckboxChange(
                                              "local_pickup"
                                            )
                                          }
                                        />
                                        <label htmlFor="localPickup">
                                          Local Pickup (FREE)
                                        </label>
                                      </div>

                                      {box.shippingMethods?.map((method) => (
                                        <div
                                          className="dimensionShowCheckbox_div"
                                        >
                                          <input
                                            type="checkbox"
                                            id={method.service_code}
                                            // disabled
                                            checked={
                                              selectedMethod ==
                                              method.service_code
                                                ? true
                                                : false
                                            }
                                            onChange={() => handleCheckboxChange(method.service_code)}

                                          />
                                          <label htmlFor={method.service_code}>
                                          {method.service_type == 'UPS® Ground' ? 'UPS Ground®' : method.service_type} (
                                            <Amount
                                              amount={method.shipping_amount}
                                            />
                                            )
                                          </label>
                                        </div>
                                      ))}
                                    </>
                                  ) : (
                                    <p></p>
                                  )}
                                </div>
                                <div className="d-inline-flex align-items-center gap-2">
                                  {!box.shippingMethods ? (
                                    <>
                                      {index != 0 &&
                                        order?.serviceCode?.name !=
                                          "Local Pickup" && (
                                          <button
                                            className="btn PackageRemove_btn"
                                            onClick={() => removeBox(index)}
                                            disabled={boxes.length === 1} // Disable removing if there's only one box
                                          >
                                            <Icon icon="simple-line-icons:close" />
                                          </button>
                                        )}
                                    </>
                                  ) : (
                                    <>
                                      {selectedMethod == "local_pickup" ?
                                                                                   <Button
                                                                                                                           variant={null}
                                                                                                                           className="PackageCompleteOrder_btn me-2"
                                                                                                                           type="submit"
                                                                                                                           // className="my-3 ms-3"
                                                                                                                           onClick={submitCompleteAction}
                                                                                                                           disabled={loadingWeight}
                                                                                                                         >
                                                                                                                           Move To Complete
                                                                                                                         </Button> 
                                                                              :order?.serviceCode?.name !=
                                        "Local Pickup" &&
                                        (!box.downloadLabel ? (
                                          <button
                                            className="btn PackagePurchase_btn"
                                            onClick={() =>
                                              handleSubmitData(index)
                                            }
                                          >
                                            {loadingInfo === index ? (
                                              <span
                                                className="spinner-border spinner-border-sm"
                                                role="status"
                                                aria-hidden="true"
                                              ></span>
                                            ) : (
                                              "Purchase Label"
                                            )}
                                          </button>
                                        ) : (
                                          <a
                                            target="_blank"
                                            className="btn PackagePurchase_btn"
                                            href={box?.downloadLabel?.label_url}
                                          >
                                            Download Label
                                          </a>
                                        ))}
                                    </>
                                  )}
                                </div>
                              </div>
                            </Col>
                          </Row>
                        ))}

                        {order?.serviceCode?.name == "Local Pickup" && (
                          <Button
                            variant={null}
                            className="PackageCompleteOrder_btn me-2"
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
                        )}
                        {/* {order?.serviceCode?.name != "Local Pickup" && (
                                      <button
                                        className="btn remove-box"
                                        onClick={() => removeBox(index)}
                                        disabled={boxes.length === 1} // Disable removing if there's only one box
                                      >
                                        Remove Box
                                      </button>
                                    )} */}
                        {orderInfo?.length >= 1 && (
                          <Button
                            variant={null}
                            className="PackageCompleteOrder_btn me-2"
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
                        )}
                        {order?.serviceCode?.name != "Local Pickup" && (
                          <button
                            className="btn PackageAddAnother_btn"
                            onClick={addBox}
                          >
                            Add Another Box
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  // )
                  <div></div>
                )
              )}

                <div className="orders-shipping d-flex align-items-center justify-content-between flex-wrap mt-3">
                  <div className="d-inline-flex align-items-center gap-2 my-1">
                    <b>In this order:</b>
                    {[
                      ...new Map(
                        order.newUpdatedData?.map((wo) => [
                          wo.material_code,
                          wo,
                        ])
                      ).values(),
                    ]?.map((wo, index) => (
                      <span
                        className="badgestatus"
                        style={getMaterialColor(
                          wo?.material_name + " " + wo?.material_grade,wo?.color_code
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
                        <div className="list-left d-inline-flex w-40">
                          <div
                            className="list-img-outer"
                            style={{ width: "110px" }}
                          >
                            <div className="list-img img-quote mx-auto mx-md-0 position-relative"> 
                            <span className="bublenumber">
                                {String(index + 1).padStart(3, "0")}
                              </span>
                              <Image
                                src={encodeS3Url(wo.image_url)}
                                alt={wo.image_url}
                                className="img-fluid"
                                style={{
                                  objectFit: "contain", // use camelCase for CSS properties
                                  height: "160px", // specify values as strings
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
                                  handleDownload(encodeS3Url(wo?.dxf_url), wo.quote_name)
                                }
                              />
                            </h2>
                            <span
                              className="num-dim mb-2"
                              style={{ fontSize: "12px" }}
                            >
                              {getFormattedSubquote(wo, wo?.subquote_number)}
                            </span>
                            {/* {wo.pierce_count != 0 && (
                              <>
                                <br />
                                <span
                                  className="num-dim mb-2"
                                  style={{ fontSize: "12px" }}
                                >
                                  Pierce Count: {wo.pierce_count}
                                </span>
                              </>
                            )} */}
                            <div className="datamain mb-3">
                              <Link
                                className="btndata"
                                onClick={() => {
                                  handleShow4(wo._id);
                                }}
                                style={{ minWidth: 42 }}
                              >
                                {loadingOrderQuote == wo._id ? (
                                  <span
                                    className="spinner-border spinner-border-sm"
                                    role="status"
                                    aria-hidden="true"
                                  ></span>
                                ) : (
                                  "Data"
                                )}
                              </Link>
                            </div>
                            {/* <div className="list-qty d-flex align-items-center gap-3 mb-3 pt-3">
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
                            </div> */}
                            <Link
                              className="btnnote custom_expansion"
                              onClick={() => {
                                handleShow(wo.notes_text, wo.notes_admin);
                              }}
                            >
                              View Notes
                              {((wo.notes_text &&
                                wo.notes_text.trim() !== "") || // checks if notes_text is not an empty string
                                (Array.isArray(wo.notes_admin) &&
                                  wo.notes_admin.length > 0)) && (
                                <span className="expansion_tag">!</span>
                              )}
                            </Link>
                            {/* {wo.isDownloaded == 1 && wo.isCompleted == 0 && (
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
                            )} */}
                          </div>
                        </div>

                        <div className="list-checkboxes  d-inline-flex gap-3 w-40">
                          <div className="CuttingCheck_div custom-checkbox-container ">
                            <p>
                              {" "}
                              <span
                                className="custom-label-tag"
                                style={getMaterialColor(
                                  wo?.material_name + " " + wo?.material_grade,wo?.color_code
                                )}
                              >
                                Cutting
                              </span>
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
                                  setsubPostId(0);
                                  setevent(event);
                                  setType("isChecked_material");
                                  setModalShow2(true);
                                }}
                              />
                            </p>
                            <label
                              className="custom-label-tag"
                              htmlFor={`${wo.material_code}${wo._id}`}
                              style={getMaterialColor(
                                wo?.material_name + " " + wo?.material_grade,wo?.color_code
                              )}
                            >
                              {wo.material_code}
                            </label>
                          </div>
                          <div className="postOpsCheckbox_div custom-checkbox-container text-center">
                            <div className="d-flex postOpsCheckbox_box">
                              {" "}
                              <span>POST OPS </span>
                              <Form.Check
                                type="checkbox"
                                checked={wo.isChecked_PO == 1}
                                disabled={
                                  order?.orderedQuote.status == 3 ? true : false
                                }
                                onChange={(event) => {
                                  // handleCheckboxChangeEvent(
                                  //   event,
                                  //   wo._id,
                                  //   "isChecked_material"
                                  // )
                                  setsubPostId(0);
                                  setIds(wo._id);
                                  setevent(event);
                                  setType("isChecked_PO");
                                  setModalShow2(true);
                                }}
                              />
                            </div>
                            {wo.postops?.map((item, index) => (
                              <>
                                <div className="d-flex postOpsTagCheckbox_box justify-content-center">
                                  <span> {item.post_ops} </span>
                                  <Form.Check
                                    type="checkbox"
                                    checked={item.is_checked == 1}
                                    disabled={
                                      order?.orderedQuote.status == 3
                                        ? true
                                        : false
                                    }
                                    onChange={(event) => {
                                      // handleCheckboxChangeEvent(
                                      //   event,
                                      //   wo._id,
                                      //   "isChecked_material"
                                      // )
                                      setsubPostId(item._id);
                                      setIds(wo._id);
                                      setevent(event);
                                      setType("isChecked_SubPo");
                                      setModalShow2(true);
                                    }}
                                  />
                                </div>
                              </>
                            ))}
                          </div>
                          <div className="list-qty flex-column d-flex gap-3 mb-3">
                            <div className="d-flex align-items-center gap-3">
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

                            <div className="mark_complete_action">
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
                          {/* {wo.bend_count > 0 && (
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
                          </div> */}
                          {/* {wo.finishing_desc && (
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
                          )} */}
                        </div>
                        {wo.bend_count > 0 ? (
                          <div className="w-20 text-end"> 
                             {wo.step_file_bend != null &&
                              wo.step_file_bend != "null" &&
                              wo.step_file_bend != "" && (
                                <>
                                  <Link
                                    // href={`${url}`}
                                    // target="_blank"
                                    onClick={() => 
                                      downloadFile(wo.step_file_bend)
                                    }
                                    style={{ paddingRight: "15px" }}
                                  >
                                    <div className="list-attachment text-center d-inline-flex flex-column align-items-center w-20">
                                  <Image
                                    src={attachment}
                                    className="img-fluid"
                                    alt=""
                                  />
                                  <span>Step File</span>
                                </div>
                                  </Link>
                                </>
                              )}
                            {wo.drawing_file_bend != null &&
                              wo.drawing_file_bend != "null" &&
                              wo.drawing_file_bend != "" && (
                                <>
                                  <Link
                                    // href={`${url}`}
                                    // target="_blank"
                                    onClick={() =>
                                      downloadFile(wo.drawing_file_bend)
                                    }
                                    style={{ paddingRight: "5px" }}
                                  >
                                    <div className="list-attachment text-center d-inline-flex flex-column align-items-center">
                                  <Image
                                    src={attachment}
                                    className="img-fluid"
                                    alt=""
                                  />
                                  <span>Drawing File</span>
                                </div>
                                  </Link>
                                </>
                              )}
                            {wo.bendupload_url.map((url, index) => (
                                <Link
                                                                     // href={`${url}`}
                                                                     // target="_blank"
                                                                     onClick={() => downloadFile(url)}
                                                                     style={{ paddingRight: "5px" }}
                                                                   >
                                <div className="list-attachment text-center d-inline-flex flex-column align-items-center">
                                  <Image
                                    src={attachment}
                                    className="img-fluid"
                                    alt=""
                                  />
                                  <span>Attachment {String(index + 1)}</span>
                                </div>
                              </Link>
                            ))}
                          </div>
                        ) : (
                          <div className="list-attachment text-center d-inline-flex flex-column align-items-center w-20"></div>
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
        <ShippingStatus
          show={modalShowTrack}
          handleClose={handleCloseTrack}
          ordersTrack={ordersTrack}
          shipType={order?.serviceCode?.name}
        />

        <ModalOrderData
          QuoteData={subquote_number}
          modalShow4={modalShow4}
          handleClose4={handleClose4}
        />
         <ModalShippingInfo
          QuoteData={subquote_number}
          modalShow4={modalShow5}
          handleClose4={handleClose5}
          ShippingInfoData={ShippingInfoData}
        />
          <ConfirmationModal
        show={submitComplete}
        onHide={submitCompleteActionClose}
        title={"Are you sure?"}
        desc={"You want to change shipping priority?"}
        yesBtnText={"Yes"}
        noBtnText={"No"}
        onConfirm={handleCompleteShipLocal}
        loading={loadingWeight}
      />
           <ConfirmationModal
        show={modalShow6}
        onHide={handleClose6}
        title={"Are you sure?"}
        desc={"Do you want to refund this label?"}
        yesBtnText={"Yes"}
        noBtnText={"No"}
        onConfirm={handleRefundLabel}
        loading={loadingBtn6}
      />
      </React.Fragment>
    </div>
  );
};

export default OrdersDetail;
