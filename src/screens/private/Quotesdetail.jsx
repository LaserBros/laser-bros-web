import React, { useEffect, useState } from "react";
import { Row, Col, Container, Image, Form } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import file1 from "../../assets/img/file1.jpg";
import QuantitySelector from "../../components/Quantityselector";
import SelectDropdowns from "../../components/Selectdropdown";
import QuotesSidebar from "../../components/Quotessidebar";
import RenamePart from "../../components/Renamepart";
import AddBend from "../../components/Addbend";
import AddNote from "../../components/Addnote";
import FileUpload from "../../components/FileUpload";
import { updateQuantity } from "../../api/api";
export default function QuotesDetail() {
  const [modalShow, setModalShow] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [selectedPartId, setSelectedPartId] = useState(null);

  const [modalShow2, setModalShow2] = useState(false);
  const [modalShow3, setModalShow3] = useState(false);
  const handleShow = (quote, id) => {
    setSelectedQuote(quote);
    setSelectedPartId(id);
    setModalShow(true);
  };

  const updateQuoteName = (partId, newName) => {
    setQuoteData((prevQuoteData) =>
      prevQuoteData.map((quote) =>
        quote.part_id === partId ? { ...quote, quote_name: newName } : quote
      )
    );
    handleClose();
  };

  const handleClose = () => setModalShow(false);
  const handleShow2 = () => setModalShow2(true);
  const handleClose2 = () => setModalShow2(false);
  const handleShow3 = () => setModalShow3(true);
  const handleClose3 = () => setModalShow3(false);
  const [quantities, setQuantities] = useState({
    item1: 1,
    item2: 1,
    item3: 1,
    item4: 1,
  });
  const [quoteData, setQuoteData] = useState(null);

  useEffect(() => {
    // Fetch data from localStorage
    const storedData = localStorage.getItem("setItempartsDBdata");

    if (storedData) {
      // Parse the JSON string into an object
      const parsedData = JSON.parse(storedData);
      console.log("---------");
      console.log(parsedData);
      setQuoteData(parsedData);
    }
  }, []);
  const uploadQuote = async (formData) => {
    // API call logic here, e.g., using fetch or axios
    try {
      await updateQuantity(formData);
    } catch (error) {
      console.error("API call failed:", error);
    }
  };

  const handleQuantityChange = (partId, increment = true) => {
    setQuoteData((prevQuoteData) => {
      const updatedQuoteData = prevQuoteData.map((quote) => {
        if (quote.part_id === partId) {
          const updatedQuantity = increment
            ? quote.quantity + 1
            : Math.max(0, quote.quantity - 1); // Prevent negative quantities
          const formData = { id: quote._id, quantity: updatedQuantity };
          uploadQuote(formData);
          return { ...quote, quantity: updatedQuantity };
        }

        return quote;
      });
      localStorage.setItem(
        "setItempartsDBdata",
        JSON.stringify(updatedQuoteData)
      );
    });
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
  const handleFileDrop = (acceptedFiles) => {
    console.log("Files dropped:", acceptedFiles);
    // Add any additional logic for handling the files
  };

  return (
    <React.Fragment>
      <section className="myaccount ptb-50">
        <Container>
          <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap">
            <h2 className="quotes-head">Quote # 24-05-8900</h2>
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
                acceptedFiles={[".step"]}
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
                          <span className="num-dim">
                            <span>Dimensions</span> H :{" "}
                            {formattedNumber(quote.dimensions.height)} in x W :{" "}
                            {formattedNumber(quote.dimensions.width)} in x L :{" "}
                            {formattedNumber(quote.dimensions.length)}
                          </span>
                        </p>
                        <SelectDropdowns />
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
                    <div className="d-flex align-items-center justify-content-between ps-lg-3 ps-0 mt-3 gap-2">
                      <QuantitySelector
                        quantity={quote.quantity}
                        onIncrement={() =>
                          handleQuantityChange(quote.part_id, true)
                        }
                        onDecrement={() =>
                          handleQuantityChange(quote.part_id, false)
                        }
                      />
                      <div className="rightbtns gap-2 d-inline-flex flex-wrap">
                        <Link className="btnshare" onClick={handleShow3}>
                          Add Note
                        </Link>
                        <Link
                          className="btnicon"
                          onClick={() =>
                            handleShow(quote.quote_name, quote.part_id)
                          }
                        >
                          <Icon icon="mynaui:edit" />
                        </Link>
                        <Link className="btnicon">
                          <Icon icon="heroicons:document-duplicate" />
                        </Link>
                        <Link className="btnicon">
                          <Icon icon="uiw:delete" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </Col>
            <Col lg={4} xl={3}>
              <QuotesSidebar />
            </Col>
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
      <AddNote show3={modalShow3} handleClose3={handleClose3} title="Notes" />
    </React.Fragment>
  );
}
