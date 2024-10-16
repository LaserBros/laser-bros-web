import React, { useEffect, useState } from "react";
import { Row, Col, Container, Image, Form } from "react-bootstrap";
import { Icon } from "@iconify/react";
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
  addNotes,
  copySubQuote,
  deleteSubQuote,
  fetchSelectedFinishes,
  getFinish,
  bendQuotes,
  getMaterials,
  getThickness,
  getThicknessMaterialFinish,
  updateQuantity,
  updateSubQuoteDetails,
} from "../../api/api";
import Amount from "../../components/Amount";
import DimensionsToggle from "../../components/DimensionsToggle";
export default function QuotesDetail() {
  const currentDate = new Date();
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
  const currentDay = String(currentDate.getDate()).padStart(2, "0");
  const yearLastTwoDigits = String(currentDate.getFullYear()).slice(-2);
  const [modalShow, setModalShow] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [addLoading, setaddLoading] = useState(false);

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
  useEffect(() => {
    // fetchOptions();
  }, []);

  const handleUpload = async (file, id, quantities, pdf_url) => {
    console.log(file, id, quantities, pdf_url, "pdf_urlpdf_urlpdf_urlpdf_url");
    if (!pdf_url) {
      alert("Please upload a PDF file before saving.");
      return;
    }

    const formData = new FormData();
    formData.append("quote_image", file);
    formData.append("id", id);
    formData.append("bend_count", quantities);
    try {
      setaddLoading(true);
      const response = await bendQuotes(formData);
      setQuoteData(response.data.data);
      setquoteDataCon(true);
      localStorage.setItem(
        "setItempartsDBdata",
        JSON.stringify(response.data.data)
      );
      setaddLoading(false);
      setModalShow2(false);
    } catch (error) {
      setaddLoading(false);
      console.log("errororoor ----", error);
    }
  };
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
        const response = await getMaterials();
        const fetchedOptions = response.data.map((item) => ({
          value: item._id,
          label: item.material_name + " " + item.material_grade,
          // selectedValue : item.
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
      const response = await getThickness(data);

      const fetchedOptions = response.data.map((item) => ({
        value: item._id,
        label: item.material_thickness,
        selectedValue: item.material_code,
      }));

      setQuoteData((prevQuoteData) =>
        prevQuoteData.map((quote) =>
          quote._id === quoteId
            ? { ...quote, thicknessOptions: fetchedOptions }
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
      const response = await fetchSelectedFinishes(data); // Your API call function
      const res_status = response.data;
      const fetchedOptions = res_status.map((item) => ({
        value: item._id,
        label: item.finishing_desc,
      }));

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

  const handleShow3 = (quote, id) => {
    setSelectedNote(quote);
    setSelectedPartId(id);
    setModalShow3(true);
  };
  const updateQuoteNote = async (partId, newNote) => {
    setQuoteData((prevQuoteData) =>
      prevQuoteData.map((quote) =>
        quote._id === partId ? { ...quote, notes_text: newNote } : quote
      )
    );

    // Update localStorage
    const updatedQuoteData = quoteData.map((quote) =>
      quote._id === partId ? { ...quote, notes_text: newNote } : quote
    );
    try {
      await addNotes(partId, newNote);
    } catch (error) {}
    localStorage.setItem(
      "setItempartsDBdata",
      JSON.stringify(updatedQuoteData)
    );
  };
  const handleDeleteQuote = (quoteId) => {
    setQuoteData((prevQuoteData) => {
      const updatedQuoteData = prevQuoteData.filter(
        (quote) => quote._id !== quoteId
      );
      const data = {
        id: quoteId,
      };
      try {
        deleteSubQuote(data);
        // Update localStorage with the new data
        localStorage.setItem(
          "setItempartsDBdata",
          JSON.stringify(updatedQuoteData)
        );
      } catch (error) {}

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
    updateSubQuoteDetails(data);
    const updatedQuoteData = quoteData.map((quote) =>
      quote._id === Id ? { ...quote, quote_name: newName } : quote
    );
    localStorage.setItem(
      "setItempartsDBdata",
      JSON.stringify(updatedQuoteData)
    );
    // setQuoteData(updatedQuoteData);
  };
  const handleClose = () => setModalShow(false);
  const [image_url, setimage_url] = useState(null);
  const [quote_name, setquote_name] = useState(null);
  const [bend_count, setbend_count] = useState(null);
  const [bendupload_url, setbendupload_url] = useState(null);
  const [id_quote, setid_quote] = useState(null);
  const handleShow2 = async (
    image_url,
    quote_name,
    bend_count,
    bendupload_url,
    id,
    checked
  ) => {
    if (checked) {
      setimage_url(image_url);
      setquote_name(quote_name);
      setbend_count(bend_count);
      setbendupload_url(bendupload_url);
      setid_quote(id);
      setModalShow2(true);
    } else {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("bend_count", 0);
      formData.append("quote_image", "");
      try {
        const response = bendQuotes(formData);
        setQuoteData((prevState) =>
          prevState.map((quote) =>
            quote._id === id
              ? {
                  ...quote,
                  bend_count: 0,
                  bendupload_url: "",
                }
              : quote
          )
        );
      } catch {}
    }
  };
  const handleClose2 = () => setModalShow2(false);

  const handleClose3 = () => setModalShow3(false);
  const [quantities, setQuantities] = useState({
    item1: 1,
    item2: 1,
    item3: 1,
    item4: 1,
  });
  const [quoteData, setQuoteData] = useState(null);
  const [quoteList, setQuoteList] = useState(null);

  useEffect(() => {
    const handleStorageChange = () => {
      setQuoteData(localStorage.getItem("setItempartsDBdata"));
    };

    // Optionally listen for `localStorage` changes (if updated by another tab)
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const storedData = localStorage.getItem("setItempartsDBdata");
    const quote_list = localStorage.getItem("setItemelementData");

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const quote_list_val = JSON.parse(quote_list);
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
  const uploadQuote = async (formData) => {
    try {
      return await updateQuantity(formData);
    } catch (error) {
      console.error("API call failed:", error);
    }
  };
  const handleQuantityChangeAPI = async (Id, qty) => {
    let formData = "";
    console.log(qty);
    formData = {
      id: Id,
      quantity: qty,
      quote_id: Id,
    };

    const response = await uploadQuote(formData);
    if (response && response.data) {
      const discount = response.data.updateQuantity.discount;
      const price = response.data.updatedPrice.total_amount;
      //   console.log("response.data.discount;", response.data.data.updateData.discount);

      const finalQuoteData = quoteData.map((quote) =>
        quote._id === Id
          ? {
              ...quote,
              quantity: qty,
              discount: discount,
              amount: price,
            }
          : quote
      );

      setQuoteData(finalQuoteData);
      localStorage.setItem(
        "setItempartsDBdata",
        JSON.stringify(finalQuoteData)
      );
    } else {
      console.error("Error updating quote:", response);
    }
  };

  const handleQuantityChange = async (Id, increment = true) => {
    let formData = "";

    const updatedQuoteData = quoteData.map((quote) => {
      if (quote._id === Id) {
        const updatedQuantity = increment
          ? parseInt(quote.quantity) + 1
          : Math.max(0, parseInt(quote.quantity) - 1); // Prevent negative quantities

        formData = {
          id: quote._id,
          quantity: updatedQuantity,
          quote_id: quote.quote_id,
        };

        return {
          ...quote,
          amount: quote.amount,
          quantity: updatedQuantity,
        };
      }
      return quote;
    });
    setQuoteData(updatedQuoteData);
    localStorage.setItem(
      "setItempartsDBdata",
      JSON.stringify(updatedQuoteData)
    );

    const response = await uploadQuote(formData);
    console.log(response, "Sdsdsdsdds= response,", formData);
    if (response && response.data) {
      const discount = response.data.updateQuantity.discount;
      const price = response.data.updatedPrice.total_amount;
      //   console.log("response.data.discount;", response.data.data.updateData.discount);

      const finalQuoteData = updatedQuoteData.map((quote) =>
        quote._id === Id
          ? {
              ...quote,
              discount: discount,

              amount: price,
            }
          : quote
      );

      setQuoteData(finalQuoteData);
      localStorage.setItem(
        "setItempartsDBdata",
        JSON.stringify(finalQuoteData)
      );
    } else {
      console.error("Error updating quote:", response);
    }
    // });
  };

  const handleDuplicateQuote = async (quote, id) => {
    try {
      const data = {
        id: id,
      };

      const response = await copySubQuote(data);

      const duplicatedQuote = {
        ...quote,
        _id: response.data._id, // Assuming the API returns the new ID
      };

      // Update the quoteData state to include the duplicated quote
      setQuoteData((prevQuoteData) => {
        const updatedQuoteData = [...prevQuoteData, duplicatedQuote];

        // Update localStorage
        localStorage.setItem(
          "setItempartsDBdata",
          JSON.stringify(updatedQuoteData)
        );

        return updatedQuoteData;
      });
    } catch (error) {
      console.error("Error duplicating quote:", error);
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
          };

          response = await getThicknessMaterialFinish(data, type, params);
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
          const newPrice = parseFloat(response.data.data.data.amount) || 0;

          if (type === "material") {
            updatedFields.material_id = selectedOption.value;
            updatedFields.thickness_id = null;
            updatedFields.finishing_id = null;
            updatedFields.binding_option = "no";
          } else if (type === "finish") {
            updatedFields.finishing_id = selectedOption.value;
          } else if (type === "thickness") {
            updatedFields.type_options = selectedOption.selectedValue;
            updatedFields.thickness_id = selectedOption.value;
            updatedFields.finishing_id = null;
          }

          return {
            ...quote,
            ...updatedFields,
            discount: response.data.data.data.discount,
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
        "setItempartsDBdata",
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
              <Link className="btnshare">Share Quote</Link>
              <Link className="btnsavelater">Save For Later</Link>
              {/* <Link className="btnicon">
                <Icon icon="bytesize:upload" />
              </Link> */}
            </div>
          </div>
          <Row>
            <Col lg={8} xl={9}>
              <FileUpload
                acceptedFiles={[".dxf"]}
                onFileDrop={handleFileDrop}
                error={error}
                className={"mb-4"}
              />
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
                        <div></div>
                      </div>

                      <div className="content-quotes text-center text-md-start mt-3 mt-md-0 ps-0 ps-md-3 pe-md-2 pe-0">
                        <h2>{quote.quote_name}</h2>
                        {quote.type_options != "" &&
                        quote.type_options != null ? (
                          <p className="num-dim-main">
                            <span className="num-dim">
                              {quote.type_options}-{quote.quantity}-
                              {currentMonth}-{yearLastTwoDigits}-
                              {quoteList.quote_number}-{" "}
                              {String(index + 1).padStart(3, "0")}
                            </span>
                          </p>
                        ) : (
                          quote.type_option != "" &&
                          quote.type_option != null && (
                            <p className="num-dim-main">
                              <span className="num-dim">
                                {quote.type_option[0].material_code}-
                                {quote.quantity}-{currentMonth}-
                                {yearLastTwoDigits}-{quoteList.quote_number}-
                                {String(index + 1).padStart(3, "0")}
                              </span>
                            </p>
                          )
                        )}
                        <div className="quotes-dropdown flex-md-row d-flex align-item-center justify-content-md-start justify-content-center">
                          <SelectDropdowns
                            options={materials}
                            value={quote.material_id}
                            placeholder={"Select a Material"}
                            type="material"
                            id={quote._id}
                            onOptionSelect={handleOptionSelect}
                          />
                          <SelectDropdowns
                            options={quote.thicknessOptions || []}
                            value={quote.thickness_id}
                            type="thickness"
                            id={quote._id}
                            placeholder={"Select a Thickness"}
                            onOptionSelect={handleOptionSelect}
                          />
                          <SelectDropdowns
                            options={quote.finishOptions || []}
                            value={quote.finishing_id}
                            type="finish"
                            id={quote._id}
                            placeholder={"Select a Finish"}
                            onOptionSelect={handleOptionSelect}
                          />
                        </div>
                        <div className="quotes-services mt-3">
                          {quote.binding_option == "no" ? (
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
                                    onChange={(e) =>
                                      handleShow2(
                                        quote.image_url,
                                        quote.quote_name,
                                        quote.bend_count,
                                        quote.bendupload_url,
                                        quote._id,
                                        e.target.checked
                                      )
                                    }
                                    checked={quote.bend_count >= 1}
                                  />
                                </>
                              )}
                            </>
                          )}
                          {/* </> */}
                          {/* )} */}
                        </div>
                      </div>
                      <div className="right-quote flex-shrink-0 text-center text-md-end flex-grow-1 flex-md-grow-0">
                        {/* <p className="quotes-date">May 21, 2024 3:05 pm</p> */}
                        <p className=" text-md-end">
                          {" "}
                          <Amount amount={quote.amount} /> total
                        </p>
                        <p className=" text-md-end">
                          <strong className="quotes-price">
                            <Amount amount={quote.amount / quote.quantity} />
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
                      />
                    </span>
                    <div className="d-flex align-items-center justify-content-between ps-lg-3 ps-0 mt-3 gap-2">
                      <QuantitySelector
                        quantity={quote.quantity}
                        onIncrement={() =>
                          handleQuantityChange(quote._id, true)
                        }
                        onDecrement={() =>
                          quote.quantity === 1
                            ? null
                            : handleQuantityChange(quote._id, false)
                        }
                        onQuantityChange={(newQuantity) =>
                          handleQuantityChangeAPI(quote._id, newQuantity)
                        }
                      />
                      <div className="rightbtns gap-2 d-inline-flex flex-wrap">
                        <Link
                          className="btnshare"
                          onClick={() =>
                            handleShow3(quote.notes_text, quote._id)
                          }
                        >
                          Add Note
                        </Link>
                        <Link
                          className="btnicon"
                          onClick={() =>
                            handleShow(quote.quote_name, quote._id)
                          }
                        >
                          <Icon icon="mynaui:edit" />
                        </Link>
                        <Link
                          className="btnicon"
                          onClick={() => handleDuplicateQuote(quote, quote._id)} // Pass the quote to be duplicated
                        >
                          <Icon icon="heroicons:document-duplicate" />
                        </Link>
                        <Link
                          className="btnicon"
                          onClick={() => handleDeleteQuote(quote._id)}
                        >
                          <Icon icon="uiw:delete" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </Col>
            {quoteData && quoteData.length > 0 && (
              <Col lg={4} xl={3}>
                <QuotesSidebar amount={getTotalAmount().toFixed(2)} />
              </Col>
            )}
          </Row>
        </Container>
      </section>
      <RenamePart
        show={modalShow}
        handleClose={handleClose}
        quote={selectedQuote}
        onSave={(newName) => updateQuoteName(selectedPartId, newName)}
        title="Rename Part 24-05-771-224"
      />
      <AddBend
        show2={modalShow2}
        handleClose2={handleClose2}
        image={image_url}
        name={quote_name}
        count={bend_count}
        pdf_url={bendupload_url}
        title="Specify Bend Details"
        id={id_quote}
        onUpload={handleUpload}
        loading={addLoading}
      />
      <AddNote
        show3={modalShow3}
        name={selectedNote}
        handleClose3={handleClose3}
        onSave={(newNote) => updateQuoteNote(selectedPartId, newNote)}
        title="Notes"
      />
    </React.Fragment>
  );
}
