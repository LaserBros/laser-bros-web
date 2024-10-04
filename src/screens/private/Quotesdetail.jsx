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
  getFinish,
  getMaterials,
  getThickness,
  getThicknessMaterialFinish,
  updateQuantity,
  updateSubQuoteDetails,
} from "../../api/api";
export default function QuotesDetail() {
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
  const fetchOptions = async () => {
    try {
      const response = await getFinish(); // Your API call function
      const fetchedOptions = response.data.map((item) => ({
        value: item.finishing_code,
        label: item.finishing_desc,
      }));
      setcolors(fetchedOptions);
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };
  useEffect(() => {
    // fetchOptions();
  }, []);

  const getTotalAmount = () => {
    if (!Array.isArray(quoteData)) return 0;
    console.log(" ------- amount -------", quoteData);
    return quoteData.reduce((sum, quote) => {
      // Ensure quote.amount is a valid number
      const amount = parseFloat(quote.amount);

      return sum + (isNaN(amount) ? 0 : quote.quantity * amount);
    }, 0);
  };
  const [materials, setmaterials] = useState([]);

  useEffect(() => {
    // Fetch options from the API when the parent component mounts
    const fetchOptions_val = async () => {
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
      const response = await getThickness(data); // Your API call function

      const fetchedOptions = response.data.map((item) => ({
        value: item._id,
        label: item.material_thickness,
        materialCode: item.finishing_options,
      }));
      // const fetchedOptions_val_id = finishing_options.map((item) => ({
      //   item,
      // }));
      // console.log(fetchedOptions_val_id);
      // const filteredOptions_val = colors.filter((option) =>
      //   option.value.includes(fetchedOptions_val_id)
      // );

      // setcolors(filteredOptions_val);
      console.log("fetchedOptions ----", fetchedOptions);
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
  // fetchThickness();
  // }, []);

  // const thickness = [
  //   { label: '.040" / 1.02mm', value: "thickness1" },
  //   { label: '.040" / 1.02mm', value: "thickness2" },
  //   { label: '.040" / 1.02mm', value: "thickness3" },
  //   { label: '.040" / 1.02mm', value: "thickness4" },
  // ];

  const handleShow3 = (quote, id) => {
    console.log("notesss", quote);
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
  const handleShow2 = () => setModalShow2(true);
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
      // Parse the JSON string into an object
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
                // Ensure there's a material selected
                await fetchThickness(quote.material_id, quote._id);
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
    // API call logic here, e.g., using fetch or axios
    try {
      await updateQuantity(formData);
    } catch (error) {
      console.error("API call failed:", error);
    }
  };

  const handleQuantityChange = (Id, increment = true) => {
    setQuoteData((prevQuoteData) => {
      const updatedQuoteData = prevQuoteData.map((quote) => {
        if (quote._id === Id) {
          const updatedQuantity = increment
            ? quote.quantity + 1
            : Math.max(0, quote.quantity - 1); // Prevent negative quantities

          const formData = {
            id: quote._id,
            quantity: updatedQuantity,
            quote_id: quote.quote_id,
          };
          uploadQuote(formData); // Assuming this function handles the API call

          return {
            ...quote,
            quantity: updatedQuantity,
          };
        }
        return quote;
      });

      // Update localStorage with the new data
      localStorage.setItem(
        "setItempartsDBdata",
        JSON.stringify(updatedQuoteData)
      );

      // Return the updated quote data to update the state
      return updatedQuoteData;
    });
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
              type === "finish" ? selectedOption.value : quote.finishing_id,
          };

          response = await getThicknessMaterialFinish(data, type, params);
          break; // Stop after the matching quote is found and processed
        }
      }

      if (type == "material") {
        fetchThickness(selectedOption.value, id);
      }

      const updatedQuoteData = quoteData.map((quote) => {
        if (quote._id === id) {
          let updatedFields = {};
          const currentAmount = parseFloat(quote.amount) || 0;
          const newPrice = parseFloat(response.data.data.data.amount) || 0;

          console.log("newPrice", newPrice);
          if (type === "material") {
            updatedFields.material_id = selectedOption.value;
            updatedFields.thickness_id = null;
          } else if (type === "finish") {
            updatedFields.finishing_id = selectedOption.value;
          } else if (type === "thickness") {
            updatedFields.thickness_id = selectedOption.value;
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
        "setItempartsDBdata",
        JSON.stringify(updatedQuoteData)
      );

      // Update state with the new quoteData
      setQuoteData(updatedQuoteData);

      if (type === "thickness") {
        const responses = await getFinish();
        const colors = responses.data.map((item) => ({
          value: item.finishing_code,
          label: item.finishing_desc,
        }));
        const { value, materialCode } = selectedOption;

        // Ensure that fetchedOptions_val_id is always an array
        const fetchedOptions_val_id = Array.isArray(materialCode)
          ? materialCode
          : [materialCode];
        const filteredOptions_val = colors.filter((option) => {
          return fetchedOptions_val_id.includes(option.value);
        });

        console.log("Filtered Options:", filteredOptions_val, id);

        setQuoteData((prevQuoteData) =>
          prevQuoteData.map((quote) =>
            quote._id === id
              ? { ...quote, finishOptions: filteredOptions_val } // Update finishOptions
              : quote
          )
        );
      }
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
                <h2 className="quotes-head">
                  Quote # {currentMonth}-{yearLastTwoDigits}-
                  {quoteList.quote_number}
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
                      </div>
                      <div className="content-quotes text-center text-md-start mt-3 mt-md-0 ps-0 ps-md-3 pe-md-2 pe-0">
                        <h2>{quote.quote_name}</h2>
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
                          <h4>Services</h4>
                          <Form.Check
                            type="radio"
                            label="Bending"
                            name="options2"
                            value="option11"
                            id="option11"
                            className="d-inline-flex align-items-center me-2"
                            onClick={handleShow2}
                          />
                        </div>
                      </div>
                      <div className="right-quote flex-shrink-0 text-center text-md-end flex-grow-1 flex-md-grow-0">
                        {/* <p className="quotes-date">May 21, 2024 3:05 pm</p> */}
                        <p className=" text-md-end">${quote.amount} total</p>
                        <p className=" text-md-end">
                          <strong className="quotes-price">
                            ${quote.amount}
                          </strong>
                          /each
                        </p>
                        <span className="quote-off">0% Saved</span>
                        <p className="mb-0 text-md-end">
                          Typical Lead Time 2-3 days
                        </p>
                      </div>
                    </div>
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
        title="Specify Bend Details"
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
