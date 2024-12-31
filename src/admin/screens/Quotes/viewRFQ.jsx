import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  Image,
  Container,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import file1 from "../../assets/img/file1.jpg";
import {
  AdminaddNotes,
  AdminfetchSelectedFinishes,
  AdminbendQuotes,
  AdmingetMaterials,
  AdmingetThickness,
  AdmingetThicknessMaterialFinish,
  AdminupdateQuantity,
  AdminupdateSubQuoteDetails,
  getSubQuote,
} from "../../../api/api";
import QuantitySelector from "../../components/Quantityselector";
import SelectDropdowns from "../../components/Selectdropdown";
import QuotesSidebar from "../../components/Quotessidebar";
import RenamePart from "../../components/Renamepart";
import AddBend from "../../components/Addbend";
import AdminAddNote from "../../components/AddNote";
import AddPrice from "../../components/AddPrice";
import AddQty from "../../components/AddQty";
import DimensionsToggle from "../../../components/DimensionsToggle";
import ModalOrderData from "../../components/OrderData";
const ViewRFQS = () => {
  const [quoteData, setQuoteData] = useState(null);
  const [quoteList, setQuoteList] = useState(null);
  var currentDate = new Date();
  var currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
  var currentDay = String(currentDate.getDate()).padStart(2, "0");
  var yearLastTwoDigits = String(currentDate.getFullYear()).slice(-2);
  const [modalShow, setModalShow] = useState(false);
  const [modalShowQty, setModalShowQty] = useState(false);
  const [modalShowPrice, setModalShowPrice] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [selectedQty, setSelectedQty] = useState(null);
  const [price, setPrice] = useState(0);
  const [selectedNote, setSelectedNote] = useState(null);
  const [selectedAdminNote, setSelectedAdminNote] = useState(null);

  const [selectedPartId, setSelectedPartId] = useState(null);

  const [modalShow2, setModalShow2] = useState(false);
  const [modalShow3, setModalShow3] = useState(false);
  const handleShow = (quote, id) => {
    setSelectedQuote(quote);
    setSelectedPartId(id);
    setModalShow(true);
  };
  const handleShowQty = (qty, id) => {
    setSelectedQty(qty);
    setSelectedPartId(id);
    setModalShowQty(true);
  };

  const handleShowPrice = (quote, id, price) => {
    setSelectedQuote(quote);
    setSelectedPartId(id);
    setPrice(price);
    setModalShowPrice(true);
  };
  // const colors = [
  //   { label: "Gloss Red P.C.", value: "#E11F26" },
  //   { label: "Gloss Yellow P.C.", value: "#facc15" },
  //   { label: "Gloss Blue P.C.", value: "#1F2E60" },
  //   { label: "Gloss Green P.C.", value: "#2A5C17" },
  //   { label: "Gloss Orange P.C.", value: "#f37520" },
  // ];
  const [colors, setcolors] = useState([]);
  useEffect(() => {
    // fetchOptions();
  }, []);

  const getTotalAmount = () => {
    if (!Array.isArray(quoteData)) return 0;
    return quoteData.reduce((sum, quote) => {
      // Ensure quote.amount is a valid number
      const amount = parseFloat(quote.amount);

      return sum + (isNaN(amount) ? 0 : amount);
    }, 0);
  };
  const [materials, setmaterials] = useState([]);

  useEffect(() => {
    const fetchOptions_val = async () => {
      try {
        const response = await AdmingetMaterials();
        const fetchedOptions = response.data.map((item) => ({
          value: item._id,
          label: item.material_name + " " + item.material_grade,
        }));
        setmaterials(fetchedOptions);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchOptions_val();
  }, []);

  const [thickness, setthickness] = useState([]);

  // useEffect(() => {
  // Fetch options from the API when the parent component mounts
  const fetchThickness = async (materialId, quoteId) => {
    try {
      const data = {
        id: materialId,
      };
      const response = await AdmingetThickness(data);

      const fetchedOptions = response.data.map((item) => ({
        value: item._id,
        label: item.material_thickness,
        selectedValue: item.material_code,
      }));

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
  const fetchFinish = async (materialId, quoteId) => {
    try {
      const data = {
        id: materialId,
      };
      const response = await AdminfetchSelectedFinishes(data); // Your API call function
      const res_status = response.data;
      const fetchedOptions = res_status.map((item) => ({
        value: item._id,
        label: item.finishing_desc,
      }));
      //   console.log("fetchedOptions ,fetchedOptions", response.bending);
      setQuoteData((prevQuoteData) =>
        prevQuoteData.map((quote) =>
          quote._id === quoteId
            ? {
                ...quote,
                finishOptions: fetchedOptions,
                binding_option: response.bending,
              }
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

  const handleShow3 = (quote, notes_admin, id) => {
    // console.log("Sdsd notes");
    setSelectedNote(quote);
    setSelectedAdminNote(notes_admin);
    setSelectedPartId(id);
    setModalShow3(true);
  };
  const updateQuoteNote = (partId, newNote) => {
    if (!newNote || newNote.trim() === "") {
      console.warn("New note is empty. No update performed.");
      return; // Exit the function if newNote is empty
    }

    const updatedQuoteData = quoteData.map((quote) => {
      if (quote._id === partId) {
        const updatedNotes = Array.isArray(quote.notes_admin)
          ? [...quote.notes_admin, newNote]
          : [newNote];

        return { ...quote, notes_admin: updatedNotes };
      }
      return quote;
    });

    // Update localStorage with the new data
    localStorage.setItem(
      "setItempartsDBdataAdmin",
      JSON.stringify(updatedQuoteData)
    );

    // Update the state with the new data
    setQuoteData(updatedQuoteData);
  };

  const handleDeleteNote = (indexToDelete, partId) => {
    // console.log("indexToDelete, partId", indexToDelete, partId);
    setQuoteData((prevQuoteData) => {
      const updatedQuoteData = prevQuoteData.map((quote) => {
        if (quote._id === partId) {
          const updatedAdminNote = quote.notes_admin.filter(
            (note, index) => index !== indexToDelete
          );
          return { ...quote, notes_admin: updatedAdminNote };
        }
        return quote;
      });

      localStorage.setItem(
        "setItempartsDBdataAdmin",
        JSON.stringify(updatedQuoteData)
      );

      return updatedQuoteData;
    });
  };

  const updateQuoteName = (Id, newName) => {
    setQuoteData((prevQuoteData) =>
      prevQuoteData.map((quote) =>
        quote._id === Id ? { ...quote, quote_name: newName } : quote
      )
    );
    const data = {
      id: Id,
      quote_name: newName,
    };

    const updatedQuoteData = quoteData.map((quote) =>
      quote._id === Id ? { ...quote, quote_name: newName } : quote
    );
    localStorage.setItem(
      "setItempartsDBdataAdmin",
      JSON.stringify(updatedQuoteData)
    );
    // setQuoteData(updatedQuoteData);
  };
  const updatePrice = (Id, price) => {
    setQuoteData((prevQuoteData) =>
      prevQuoteData.map((quote) =>
        quote._id === Id
          ? { ...quote, amount: price.toFixed(2) * quote.quantity }
          : quote
      )
    );

    const updatedQuoteData = quoteData.map((quote) =>
      quote._id === Id
        ? { ...quote, amount: price.toFixed(2) * quote.quantity }
        : quote
    );
    localStorage.setItem(
      "setItempartsDBdataAdmin",
      JSON.stringify(updatedQuoteData)
    );
  };
  const handleClosePrice = () => setModalShowPrice(false);
  const handleCloseQty = () => setModalShowQty(false);
  const handleClose = () => setModalShow(false);
  const navigate = useNavigate();
  const [image_url, setimage_url] = useState(null);
  const [quote_name, setquote_name] = useState(null);
  const [bend_count, setbend_count] = useState(null);
  const [bendupload_url, setbendupload_url] = useState(null);
  const [id_quote, setid_quote] = useState(null);

  const handleShow2 = (
    image_url,
    quote_name,
    bend_count,
    bendupload_url,
    id
  ) => {
    setimage_url(image_url);
    setquote_name(quote_name);
    setbend_count(bend_count);
    setbendupload_url(bendupload_url);
    setid_quote(id);
    setModalShow2(true);
  };
  const handleClose2 = () => setModalShow2(false);

  const handleClose3 = () => setModalShow3(false);
  const [quantities, setQuantities] = useState({
    item1: 1,
    item2: 1,
    item3: 1,
    item4: 1,
  });

  useEffect(() => {
    const handleStorageChange = () => {
      setQuoteData(localStorage.getItem("setItempartsDBdataAdmin"));
    };

    // Optionally listen for `localStorage` changes (if updated by another tab)
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  const [UserDataAdmin, setUserDataAdmin] = useState("");
  useEffect(() => {
    const storedData = localStorage.getItem("setItempartsDBdataAdmin");
    const quote_list = localStorage.getItem("setItemelementDataAdmin");
    const userData = localStorage.getItem("UserDataAdmin");

    if (storedData) {
      // Parse the JSON string into an object
      const parsedData = JSON.parse(storedData);
      const quote_list_val = JSON.parse(quote_list);
      setQuoteList(quote_list_val);
      setUserDataAdmin(JSON.parse(userData));
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

  const [modalShow4, setModalShow4] = useState(false);
  const [subquote_number, setsubquote_number] = useState("");
  const [loadingOrderQuote, setLoadingOrderQuote] = useState(false);
  const [subquote_piece, setsubquote_piece] = useState("");
  const handleShow4 = async (id, number) => {
    try {
      setsubquote_piece(number);
      setLoadingOrderQuote(id);
      const res = await getSubQuote(id);
      setsubquote_number(res.data);
      setLoadingOrderQuote("");
      setModalShow4(true);
    } catch (error) {
      setLoadingOrderQuote("");
    }
  };
  const handleClose4 = () => setModalShow4(false);

  const uploadQuote = async (formData) => {
    try {
      await AdminupdateQuantity(formData);
    } catch (error) {
      console.error("API call failed:", error);
    }
  };
  const updateQuantityAPI = async (quantity, id) => {
    console.log("Dssdsdsdsd", quantity);
    let data = "";
    let type = "";
    let params = "";

    const updatedQuoteData = quoteData.map((quote) => {
      if (quote._id === id) {
        const updatedQuantity = quantity;
        params = {
          id: quote._id,
          quantity: updatedQuantity,
          material_id: quote.material_id,
          thickness_id: quote.thickness_id,
          finishing_id: quote.finishing_id,
        };

        return {
          ...quote,
          quantity: updatedQuantity,
        };
      }
      return quote;
    });
    setQuoteData(updatedQuoteData);
    localStorage.setItem(
      "setItempartsDBdataAdmin",
      JSON.stringify(updatedQuoteData)
    );
    const response = await AdmingetThicknessMaterialFinish(data, type, params);

    if (response && response.data) {
      const discount = response.data.data.updateData.discount;
      const price = response.data.data.updateData.price;
      //   console.log("response.data.discount;", response.data.data.updateData.discount);

      const finalQuoteData = updatedQuoteData.map((quote) => {
        if (quote._id === id) {
          let part_number = quote.subquote_number.toString();

          let parts = part_number.split("-");
          parts[1] = quantity;

          let total_parts = parts.join("-");
          return {
            ...quote,
            quantity: quote.quantity,
            subquote_number: total_parts,
            discount: discount,
            amount: price,
          };
        } else return quote;
      });

      setQuoteData(finalQuoteData);
      localStorage.setItem(
        "setItempartsDBdataAdmin",
        JSON.stringify(finalQuoteData)
      );
    } else {
      console.error("Error updating quote:", response);
    }
  };

  const handleQuantityChange = async (Id, increment = true) => {
    let data = "";
    let type = "";
    let params = "";

    const updatedQuoteData = quoteData.map((quote) => {
      if (quote._id === Id) {
        const updatedQuantity = increment
          ? quote.quantity + 1
          : Math.max(0, quote.quantity - 1);
        params = {
          id: quote._id,
          quantity: updatedQuantity,
          material_id: quote.material_id,
          thickness_id: quote.thickness_id,
          finishing_id: quote.finishing_id,
        };

        return {
          ...quote,
          quantity: updatedQuantity,
        };
      }
      return quote;
    });

    setQuoteData(updatedQuoteData);
    localStorage.setItem(
      "setItempartsDBdataAdmin",
      JSON.stringify(updatedQuoteData)
    );
    const response = await AdmingetThicknessMaterialFinish(data, type, params);

    if (response && response.data) {
      const discount = response.data.data.updateData.discount;
      const price = response.data.data.updateData.price;
      //   console.log("response.data.discount;", response.data.data.updateData.discount);

      const finalQuoteData = updatedQuoteData.map((quote) =>
        quote._id === Id
          ? {
              ...quote,
              quantity: quote.quantity,
              discount: discount,
              amount: price,
            }
          : quote
      );

      setQuoteData(finalQuoteData);
      localStorage.setItem(
        "setItempartsDBdataAdmin",
        JSON.stringify(finalQuoteData)
      );
    } else {
      console.error("Error updating quote:", response);
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
  const handleOptionSelect = async (selectedOption, type, id) => {
    try {
      const data = {
        id: selectedOption.value,
      };

      let response = "";

      for (const quote of quoteData) {
        if (quote._id === id) {
          const params = {
            id: id,
            material_id:
              type === "material" ? selectedOption.value : quote.material_id,
            thickness_id:
              type === "material"
                ? null
                : type === "thickness"
                ? selectedOption.value
                : quote.thickness_id,

            finishing_id:
              type === "material" || type === "thickness"
                ? null
                : type === "finish"
                ? selectedOption.value
                : quote.finishing_id,
            quantity: quote.quantity,
          };

          response = await AdmingetThicknessMaterialFinish(data, type, params);
          break;
        }
      }
      if (type == "material") {
        fetchThickness(selectedOption.value, id);
      }
      if (type == "thickness") {
        fetchFinish(selectedOption.value, id);
      }

      const updatedQuoteData = quoteData.map((quote) => {
        if (quote._id === id) {
          let updatedFields = {};
          const currentAmount = parseFloat(quote.amount) || 0;
          const newPrice = parseFloat(response.data.data.updateData.price) || 0;

          if (type === "material") {
            updatedFields.material_id = selectedOption.value;
            updatedFields.thickness_id = null;
            updatedFields.finishing_id = null;
            updatedFields.binding_option = "no";
          } else if (type === "finish") {
            updatedFields.finishing_id = selectedOption.value;
          } else if (type === "thickness") {
            updatedFields.thickness_id = selectedOption.value;
            updatedFields.finishing_id = null;
            let part_number = quote.subquote_number.toString();

            let parts = part_number.split("-");
            parts[0] = selectedOption.selectedValue;

            let total_parts = parts.join("-");
            updatedFields.subquote_number = total_parts;
          }

          return {
            ...quote,
            ...updatedFields,
            amount: newPrice,
          };
        }
        return quote;
      });

      // Sum the total amount of all quotes
      const totalAmount = updatedQuoteData.reduce(
        (sum, quote) => sum + quote.amount,
        0
      );

      // Update localStorage with the new quoteData
      localStorage.setItem(
        "setItempartsDBdataAdmin",
        JSON.stringify(updatedQuoteData)
      );

      // Update state with the new quoteData
      setQuoteData(updatedQuoteData);
      console.log("Total sum of prices:", totalAmount);
    } catch (error) {
      console.error("Error fetching price:", error);
    }
  };

  const formattedNumber = (num) => {
    return parseFloat(
      num.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  };

  const decrementQuantity = (item) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [item]: Math.max(prevQuantities[item] - 1, 0), // Prevent negative quantities
    }));
  };

  const [error, setError] = useState(null);
  const [hovered, setHovered] = useState(null);
  const handleFileDrop = (data) => {
    console.log("Files dropped: ---------", data);

    // Check if data is defined and has the expected structure
    if (data && data.partsDBdata && data.requestQuoteDB) {
      const storedData = data.partsDBdata;
      const quote_list = data.requestQuoteDB;

      // Since storedData and quote_list should already be objects, no need to parse again
      setQuoteList(quote_list); // Assuming quote_list is already an object/array
      setQuoteData(storedData); // Assuming storedData is already an object
      setquoteDataCon(true);
      // Add any additional logic for handling the files
    } else {
      console.error("Data structure is not as expected:", data);
      // Handle the error case as necessary
    }
  };

  return (
    <React.Fragment>
      <section className="myaccount ptb-50">
        <Container>
          <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap">
            {quoteData && quoteData.length > 0 ? (
              <>
                <h2 className="quotes-head">Quote #{quoteList.search_quote}</h2>
              </>
            ) : (
              <>
                <h2 className="quotes-head">
                  Quote # {currentMonth}-{yearLastTwoDigits}-0001
                </h2>
              </>
            )}
            <div className="d-inline-flex gap-2">
              <Link className="btnshare" to={"/admin/quotes"}>
                Back Quotes
              </Link>
              {/* <Link className="btnicon">
                <Icon icon="bytesize:upload" />
              </Link> */}
            </div>
          </div>
          <Row>
            <div className="QuoteBillMain_div">
              <Row>
                <Col lg={3} md={6}>
                  <div className="QuoteBill_box">
                    <p>
                      <b>Customer Name:</b>
                      &nbsp;&nbsp;&nbsp;{UserDataAdmin?.full_name}
                    </p>
                    {UserDataAdmin?.email && (
                      <p>
                        <b>Email:</b>
                        &nbsp;&nbsp;&nbsp;{UserDataAdmin?.email}
                      </p>
                    )}
                    {UserDataAdmin?.phone_number && (
                      <p>
                        <b>Phone Number:</b>
                        &nbsp;&nbsp;&nbsp;{UserDataAdmin?.phone_number}
                      </p>
                    )}
                  </div>
                </Col>
              </Row>
            </div>
            <Col lg={12} xl={12}>
              {quoteData &&
                quoteData.length > 0 &&
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
                        <h2>
                          {quote.quote_name}{" "}
                          <Icon
                            icon="material-symbols-light:download-sharp"
                            onClick={() =>
                              handleDownload(quote?.dxf_url, quote.quote_name)
                            }
                          />
                        </h2>
                        <p className="num-dim-main">
                          <span className="num-dim">
                            {quote.type_option[0]?.material_code}-
                            {quoteList.search_quote}-
                            {String(index + 1).padStart(3, "0")}
                          </span>
                        </p>
                        {quote.material_id && quote.thickness_id && (
                          <div className="datamain mb-2">
                            <Link
                              className="btndata"
                              onClick={() => {
                                handleShow4(
                                  quote._id,
                                  quote.type_option[0]?.material_code +
                                    "-" +
                                    quoteList.search_quote +
                                    "-" +
                                    String(index + 1).padStart(3, "0")
                                );
                              }}
                              style={{ minWidth: 42 }}
                            >
                              {loadingOrderQuote == quote._id ? (
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
                        )}
                        <div className="quotes-dropdown flex-md-row d-flex align-item-center justify-content-md-start justify-content-center">
                          <SelectDropdowns
                            options={materials}
                            value={quote.material_id}
                            placeholder={"Select a Material"}
                            type="material"
                            disabled={true}
                            id={quote._id}
                            onOptionSelect={handleOptionSelect}
                          />
                          <SelectDropdowns
                            options={quote.thicknessOptions || []}
                            value={quote.thickness_id}
                            type="thickness"
                            disabled={true}
                            id={quote._id}
                            placeholder={"Select a Thickness"}
                            onOptionSelect={handleOptionSelect}
                          />
                          <SelectDropdowns
                            options={quote.finishOptions || []}
                            value={quote.finishing_id}
                            type="finish"
                            disabled={true}
                            id={quote._id}
                            placeholder={"Select a Finish"}
                            onOptionSelect={handleOptionSelect}
                          />
                        </div>
                        <div className="quotes-services mt-3">
                          <p style={{ fontSize: "12px", color: "#00000080" }}>
                            Bending : {quote.bend_count >= 1 ? "Yes" : "No"}
                            {"   "}
                            {quote.bend_count >= 1 && (
                              <a href={`${quote.bendupload_url}`}>Attachment</a>
                            )}
                          </p>
                          {/* {quote.binding_option == "no" ? (
                            <p></p>
                          ) : (
                            <>
                              {quote.thickness_id && (
                                <>
                                  <h4>Services</h4>

                                  <Form.Check
                                    type="checkbox"
                                    label="Bending"
                                    name={`options-${quote._id}`}
                                    value={`options-${quote._id}`}
                                    id={`options-${quote._id}`}
                                    className="d-inline-flex align-items-center me-2"
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        // Call your function to handle when the checkbox is checked
                                        handleShow2(
                                          quote.image_url,
                                          quote.quote_name,
                                          quote.bend_count,
                                          quote.bendupload_url,
                                          quote._id
                                        );
                                      }
                                    }}
                                    checked={quote.bend_count >= 1}
                                  />
                                </>
                              )}
                            </>
                          )} */}
                          {/* </> */}
                          {/* )} */}
                        </div>
                      </div>
                      <div className="right-quote flex-shrink-0 text-center text-md-end flex-grow-1 flex-md-grow-0">
                        <p className=" text-md-end">
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(quote.amount)}{" "}
                          total
                        </p>
                        <p className=" text-md-end">
                          <strong className="quotes-price">
                            {new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "USD",
                            }).format(quote.amount / quote.quantity)}
                            {/* ${.toFixed(2)} */}
                          </strong>
                          /each{" "}
                          <Link
                            className="btnicons"
                            onClick={() =>
                              handleShowPrice(
                                quote.quote_name,
                                quote._id,
                                (quote.amount / quote.quantity).toFixed(2)
                              )
                            }
                          >
                            {/* <Icon icon="mynaui:edit" /> */}
                          </Link>
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
                      <p>
                        Qty : {quote.quantity}{" "}
                        <Link
                          className="btnicons"
                          onClick={() =>
                            handleShowQty(quote.quantity, quote._id)
                          }
                        >
                          {/* <Icon icon="mynaui:edit" /> */}
                        </Link>
                      </p>
                      {/* <QuantitySelector
                        quantity={quote.quantity}
                        onIncrement={() =>
                          handleQuantityChange(quote._id, true)
                        }
                        onDecrement={() =>
                          quote.quantity === 1
                            ? null
                            : handleQuantityChange(quote._id, false)
                        }
                        updateQuantityAPI={(price) => {
                          updateQuantityAPI(price, quote._id);
                        }}
                      /> */}
                      <div className="rightbtns gap-2 d-inline-flex flex-wrap">
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
                        {/* <Link
                          className="btnicon"
                          onClick={() =>
                            handleShow(quote.quote_name, quote._id)
                          }
                        >
                          <Icon icon="mynaui:edit" />
                        </Link> */}
                      </div>
                    </div>
                  </div>
                ))}
            </Col>
            {/* {quoteData && quoteData.length > 0 && (
              <Col lg={4} xl={3}>
                <QuotesSidebar amount={getTotalAmount().toFixed(2)} />
              </Col>
            )} */}
          </Row>
        </Container>
      </section>
      <RenamePart
        show3={modalShow}
        handleClose3={handleClose}
        quote={selectedQuote}
        onSave={(newName) => updateQuoteName(selectedPartId, newName)}
        title={
          quoteData && quoteData.length > 0
            ? "Rename Part " +
              currentMonth +
              "-" +
              yearLastTwoDigits +
              "-" +
              quoteList.quote_number
            : "Rename Part # " +
              currentMonth +
              "-" +
              yearLastTwoDigits +
              "-0001"
        }
      />

      <AddPrice
        show3={modalShowPrice}
        handleClose3={handleClosePrice}
        quote={selectedQuote}
        price={price}
        onSave={(price) => updatePrice(selectedPartId, price)}
        title={selectedQuote}
      />
      <AddQty
        show3={modalShowQty}
        handleClose3={handleCloseQty}
        quote={selectedQuote}
        price={selectedQty}
        onSave={(qty) => updateQuantityAPI(qty, selectedPartId)}
        title={"Change Quantity"}
      />
      <AdminAddNote
        show={modalShow3}
        isEditAdmin={true}
        onSave={(newNote) => updateQuoteNote(selectedPartId, newNote)}
        handleDeleteNote={(index) => handleDeleteNote(index, selectedPartId)}
        customer_note={selectedNote}
        admin_note={selectedAdminNote}
        id={selectedPartId}
        handleClose={handleClose3}
        title="Notes"
      />
      <ModalOrderData
        QuoteNumber={subquote_piece}
        QuoteData={subquote_number}
        modalShow4={modalShow4}
        handleClose4={handleClose4}
      />
    </React.Fragment>
  );
};

export default ViewRFQS;
