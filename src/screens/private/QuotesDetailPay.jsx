import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Container,
  Image,
  Form,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { Icon } from "@iconify/react";
import attachment from "../../employee/assets/img/attachment.svg";
import { Link, json } from "react-router-dom";
import file1 from "../../assets/img/file1.jpg";
import QuantitySelector from "../../components/Quantityselector";
import SelectDropdowns from "../../components/Selectdropdown";
import QuotesSidebar from "../../components/Quotessidebar";
import RenamePart from "../../components/Renamepart";
import AddBend from "../../components/Addbend";
import AddNote from "../../components/Addnote";
import FileUpload from "../../components/FileUpload";
import {
  copySubQuote,
  deleteSubQuote,
  fetchSelectedFinishes,
  getFinish,
  getMaterials,
  getThickness,
  getThicknessMaterialFinish,
  updateQuantity,
  updateSubQuoteDetails,
} from "../../api/api";
import AdminAddNote from "../../admin/components/AddNote";
import DimensionsToggle from "../../components/DimensionsToggle";
export default function QuotesDetailPay() {
  const currentDate = new Date();
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
  const currentDay = String(currentDate.getDate()).padStart(2, "0");
  const yearLastTwoDigits = String(currentDate.getFullYear()).slice(-2);
  const [modalShow, setModalShow] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);

  const [selectedPartId, setSelectedPartId] = useState(null);

  const [modalShow2, setModalShow2] = useState(false);
  const [modalShow3, setModalShow3] = useState(false);
  const handleShow = (quote, id) => {
    setSelectedQuote(quote);
    setSelectedPartId(id);
    setModalShow(true);
  };

  // const colors = [
  //   { label: "Gloss Red P.C.", value: "#E11F26" },
  //   { label: "Gloss Yellow P.C.", value: "#facc15" },
  //   { label: "Gloss Blue P.C.", value: "#1F2E60" },
  //   { label: "Gloss Green P.C.", value: "#2A5C17" },
  //   { label: "Gloss Orange P.C.", value: "#f37520" },
  // ];
  const [colors, setcolors] = useState([]);
  const handleClose3 = () => setModalShow3(false);
  useEffect(() => {
    // Fetch options from the API when the parent component mounts
    const fetchOptions = async () => {
      try {
        const response = await getFinish(); // Your API call function
        const fetchedOptions = response.data.map((item) => ({
          value: item._id, // Adjust according to the structure of your API response
          label: item.material_finishing, // Adjust according to the structure of your API response
        }));
        setcolors(fetchedOptions);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchOptions();
  }, []);

  const getTotalAmount = () => {
    if (!Array.isArray(quoteData)) return 0;
    return quoteData.reduce((sum, quote) => {
      const amount = parseFloat(quote.amount);
      return sum + (isNaN(amount) ? 0 : amount);
    }, 0);
  };
  const [materials, setmaterials] = useState([]);
  const getDimension = [
    { value: "0", label: "Millimeters (mm)" },
    { value: "1", label: "Inches" },
  ];
  
  useEffect(() => {
    // Fetch options from the API when the parent component mounts
    const fetchOptions = async () => {
      try {
        const response = await getMaterials(); // Your API call function
        const fetchedOptions = response.data.map((item) => ({
          value: item._id, // Adjust according to the structure of your API response
          label: item.material_name + " " + item.material_grade, // Adjust according to the structure of your API response
        }));
        setmaterials(fetchedOptions);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchOptions();
  }, []);

  const [thickness, setthickness] = useState([]);

  // useEffect(() => {
  // Fetch options from the API when the parent component mounts
  const fetchThickness = async (materialId, quoteId) => {
    try {
      const data = {
        id: materialId,
      };
      const response = await getThickness(data); // Your API call function

      // Map the response data to the format needed for the dropdown
      const fetchedOptions = response.data.map((item) => ({
        value: item._id,
        label: item.material_thickness,
      }));

      // Update only the thickness options for the specific quote
      setQuoteData((prevQuoteData) =>
        prevQuoteData.map((quote) =>
          quote._id === quoteId
            ? { ...quote, thicknessOptions: fetchedOptions } // Store the thickness options in the quote
            : quote
        )
      );
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };
  const [selectedAdminNote, setSelectedAdminNote] = useState(null);
  const handleShow3 = (quote, notes_admin, id) => {
    setSelectedNote(quote);
    setSelectedAdminNote(notes_admin);
    setSelectedPartId(id);
    setModalShow3(true);
  };

  const fetchFinish = async (materialId, quoteId) => {
    try {
      const data = {
        thickness_id: materialId,
        id: quoteId,
      };
      const response = await fetchSelectedFinishes(data); // Your API call function

      const fetchedOptions = response.data.data.map((item) => ({
        value: item._id,
        label: item.finishing_desc,
      }));

      setQuoteData((prevQuoteData) =>
        prevQuoteData.map((quote) =>
          quote._id === quoteId
            ? { ...quote, finishOptions: fetchedOptions } // Store the thickness options in the quote
            : quote
        )
      );
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };
  // fetchThickness();
  // }, []);

  // const thickness = [
  //   { label: '.040" / 1.02mm', value: "thickness1" },
  //   { label: '.040" / 1.02mm', value: "thickness2" },
  //   { label: '.040" / 1.02mm', value: "thickness3" },
  //   { label: '.040" / 1.02mm', value: "thickness4" },
  // ];

  const [quantities, setQuantities] = useState({
    item1: 1,
    item2: 1,
    item3: 1,
    item4: 1,
  });
  const [quoteData, setQuoteData] = useState(null);
  const [quoteList, setQuoteList] = useState(null);
  const [ShippingDBdataPay, setShippingDBdataPay] = useState(null);
  const [divideWeight, setdivideWeight] = useState(null);

  useEffect(() => {
    const handleStorageChange = () => {
      setQuoteData(localStorage.getItem("setItempartsDBdataPay"));
    };

    // Optionally listen for `localStorage` changes (if updated by another tab)
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const storedData = localStorage.getItem("setItempartsDBdataPay");
    const quote_list = localStorage.getItem("setItemelementDataPay");
    const ShippingDBdataPay = localStorage.getItem("ShippingDBdataPay");
    const divideWeight = localStorage.getItem("divideWeight");

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const quote_list_val = JSON.parse(quote_list);
      const ShippingDBdataPays = JSON.parse(ShippingDBdataPay);
      const divideWeights = JSON.parse(divideWeight);
      setShippingDBdataPay(ShippingDBdataPays);
      setdivideWeight(divideWeights);
      setQuoteList(quote_list_val);

      setQuoteData(parsedData);
    }
  }, []);
  const [quoteDataCon, setquoteDataCon] = useState(true);
  useEffect(() => {
    setTimeout(async () => {
      if (quoteDataCon) {
        if (Array.isArray(quoteData) && quoteData.length > 0) {
          const fetchAllThicknessOptions = async () => {
            for (const quote of quoteData) {
              if (quote.material_id) {
                await fetchThickness(quote.material_id, quote._id);
              }
              if (quote.thickness_id) {
                await fetchFinish(quote.thickness_id, quote._id);
              }
            }
          };
          fetchAllThicknessOptions();
        }
        setquoteDataCon(false);
      }
    }, 1000);
  }, [quoteData]);

  const [error, setError] = useState(null);
  const [hovered, setHovered] = useState(null);
  const handleFileDrop = (data) => {
    // console.log("Files dropped: ---------", data);

    // Check if data is defined and has the expected structure
    if (data && data.partsDBdata && data.requestQuoteDB) {
      const storedData = data.partsDBdata;
      const quote_list = data.requestQuoteDB;

      // Since storedData and quote_list should already be objects, no need to parse again
      setQuoteList(quote_list); // Assuming quote_list is already an object/array
      setQuoteData(storedData); // Assuming storedData is already an object

      // Add any additional logic for handling the files
    } else {
      console.error("Data structure is not as expected:", data);
      // Handle the error case as necessary
    }
  };


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
      <section className="myaccount ptb-50">
        <Container>
          <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap">
            {quoteData && quoteData.length > 0 ? (
              <>
                <h2 className="quotes-head">
                  Quote #{quoteList?.search_quote}
                </h2>
              </>
            ) : (
              <>
                <h2 className="quotes-head">
                  Quote # {currentMonth}-{yearLastTwoDigits}-0001
                </h2>
              </>
            )}
            <div className="d-inline-flex gap-2">
              {/* <Link className="btnshare">Share Quote</Link>
              <Link className="btnsavelater">Save For Later</Link> */}
              {/* <Link className="btnicon">
                <Icon icon="bytesize:upload" />
              </Link> */}
            </div>
          </div>
          <Row>
            <Col lg={8} xl={9}>
              {quoteData &&
                quoteData.length > 0 &&
                Array.isArray(quoteData) &&
                quoteData.map((quote, index) => (
                  <div className="list-quotes-main">
                    <div className="list-quotes flex-column flex-md-row d-flex flex-wrap flex-md-nowrap">
                      <div className="img-quote mx-auto mx-md-0">
                        <Image
                          src={quote.image_url}
                          className="img-fluid"
                          alt=""
                        />
                      </div>
                      <div className="content-quotes text-center text-md-start mt-3 mt-md-0 ps-0 ps-md-3 pe-md-2 pe-0">
                        <h2>{quote.quote_name}</h2>

                        {quote.type_option != "" &&
                          quote.type_option != null && (
                            <p className="num-dim-main">
                              <span className="num-dim">
                                {quote.type_option[0].material_code}-
                                {quote.quantity}-{quoteList.search_quote}
                              </span>
                            </p>
                          )}
                        <p className="num-dim-main">
                          {/* <span className="num-dim"><span>Number</span>24-05-626-983</span> <span className="px-2 num-dim-indicator">/</span> */}
                          {/* <span className="num-dim">
                            <span>Dimensions</span> H :{" "}
                            {formattedNumber(quote.dimensions.height)} in x W :{" "}
                            {formattedNumber(quote.dimensions.width)} in x L :{" "}
                            {formattedNumber(quote.dimensions.length)}
                          </span> */}
                        </p>
                        <div className="quotes-dropdown flex-md-row d-flex align-item-center justify-content-md-start justify-content-center">
                        <SelectDropdowns
                            options={getDimension}
                            value={quote.dimensions}
                            placeholder={"Select Units"}
                            type="dimensions" 
                            disabled={true}
                            id={quote._id}
                            // onOptionSelect={handleOptionSelect}
                          />
                          
                          <SelectDropdowns
                            options={materials}
                            value={quote.material_id}
                            placeholder={"Select a Material"}
                            type="material"
                            disabled={true}
                            id={quote._id}
                            // onOptionSelect={handleOptionSelect}
                          />
                          <SelectDropdowns
                            options={quote.thicknessOptions || []}
                            value={quote.thickness_id}
                            type="thickness"
                            id={quote._id}
                            disabled={true}
                            placeholder={"Select a Thickness"}
                            // onOptionSelect={handleOptionSelect}
                          />
                          <SelectDropdowns
                            options={quote.finishOptions || []}
                            value={quote.finishing_id}
                            type="finish"
                            disabled={true}
                            id={quote._id}
                            placeholder={"Select a Finish"}
                            // onOptionSelect={handleOptionSelect}
                          />
                        </div>
                        {Array.isArray(quote.bendupload_url) && (
                          <div className="quotes-services mt-3">
                            <h4>Services</h4>
                            <label>
                              Bending :{" "}
                              {Array.isArray(quote.bendupload_url) &&
                              quote.bendupload_url.length > 0
                                ? quote.bendupload_url.map((url, index) => (
                                    <Link
                                                                                                        // href={`${url}`}
                                                                                                        // target="_blank"
                                                                                                        onClick={() => downloadFile(url)}
                                                                                                        style={{ paddingRight: "5px" }}
                                                                                                      >
                                      Attachment {String(index + 1)}
                                    </Link>
                                  ))
                                : ""}
                            </label>
                          </div>
                        )}
                        <div className="quotes-services mt-3">
                          <Link
                            className="btnshare"
                            onClick={() =>
                              handleShow3(
                                quote.notes_text,
                                quote.notes_admin,
                                quote._id
                              )
                            }
                          >
                            View Note
                          </Link>
                        </div>
                      </div>
                      <div className="right-quote flex-shrink-0 text-center text-md-end flex-grow-1 flex-md-grow-0">
                        {/* <p className="quotes-date">May 21, 2024 3:05 pm</p> */}
                        <p className=" text-md-end">
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD", // Change to your desired currency
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(quote.amount)}{" "}
                          total
                        </p>
                        <p className=" text-md-end">
                          <strong className="quotes-price">
                            {new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "USD", // Change to your desired currency
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }).format(quote.amount)}
                          </strong>
                          /each
                        </p>
                        <span className="quote-off">
                          {quote.discount}% Saved
                        </span>
                        <p className="mb-0 text-md-end">
                          Typical Lead Time 2-3 days
                        </p>
                      </div>
                    </div>
                    <span className="num-dim">
                      <DimensionsToggle
                        dimensions={quote.dimensions}
                        id={quote._id}
                        type={quote.dimension_type}
                        // isEdit={true}
                      />
                    </span>
                    <div className="d-flex align-items-center justify-content-between ps-lg-3 ps-0 mt-3 gap-2">
                      <InputGroup>
                        Quantity :{" "}
                        <p style={{ marginTop: "1px", marginLeft: "2px" }}>
                          <b> {quote.quantity}</b>
                        </p>
                        {/* <FormControl
                          value={quote.quantity}
                          readOnly
                          style={{ textAlign: "center" }}
                        /> */}
                      </InputGroup>
                      {/* <QuantitySelector
                        quantity={quote.quantity}
                        // onIncrement={() =>
                        //   handleQuantityChange(quote._id, true)
                        // }
                        // onDecrement={() =>
                        //   quote.quantity === 1
                        //     ? null
                        //     : handleQuantityChange(quote._id, false)
                        // }
                      /> */}
                    </div>
                  </div>
                ))}
            </Col>
            {quoteData && quoteData.length > 0 && (
              <Col lg={4} xl={3}>
                <QuotesSidebar
                  showDiv={true}
                  amount={getTotalAmount().toFixed(2)}
                  ShippingDBdataPay={ShippingDBdataPay}
                  divideWeight={divideWeight}
                  quoteData={quoteList}
                />
              </Col>
            )}
          </Row>
        </Container>
      </section>
      <AdminAddNote
        show={modalShow3}
        // isEditAdmin={true}
        onSave={""}
        handleDeleteNote={"dd"}
        customer_note={selectedNote}
        admin_note={selectedAdminNote}
        id={selectedPartId}
        handleClose={handleClose3}
        title="Notes"
      />
    </React.Fragment>
  );
}
