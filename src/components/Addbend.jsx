import React, { useEffect, useState } from "react";
import { Image, Modal, Button } from "react-bootstrap";
import file1 from "../assets/img/file1.jpg";
import { Icon } from "@iconify/react";
import QuantitySelector from "./Quantityselector";
import pdf from "../assets/img/PDF_file_icon.png";
const AddBend = ({
  show2,
  handleClose2,
  title,
  image,
  name,
  count,
  pdf_url,
  id,
  onUpload,
}) => {
  const [quantities, setQuantities] = useState(
    count == 0 || count == null ? 1 : count
  );
  const [quantitiesVal, setQuantitiesVal] = useState(
    count == 0 || count == null ? 1 : count
  );

  const handleSave = () => {
    onUpload(file1, id, quantities, pdfPreviewUrl);
  };
  useEffect(() => {
    setQuantities(count == 0 || count == null ? 1 : count);
    setQuantitiesVal(count == 0 || count == null ? 1 : count);
    setPdfPreviewUrl(pdf_url);
    console.log(image, name, count, pdf_url, "image, name, count, pdf_url");
  }, [image, name, count, pdf_url]);

  const incrementQuantity = () => {
    setQuantities((prevQuantities) => prevQuantities + 1);
    setQuantitiesVal((prevQuantities) => prevQuantities + 1);
  };

  // Decrement quantity (make sure it doesn't go below 1)
  const decrementQuantity = () => {
    setQuantities((prevQuantities) => {
      return prevQuantities > 1 ? prevQuantities - 1 : prevQuantities;
    });
    setQuantitiesVal((prevQuantities) => {
      return prevQuantities > 1 ? prevQuantities - 1 : prevQuantities;
    });
  };

  const [file1, setFile1] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setErrorMessage("");
      setFile1(file);
      setPdfPreviewUrl(URL.createObjectURL(file)); // Create PDF preview URL
    } else {
      setErrorMessage("Please upload a valid PDF file.");
    }
  };

  // console.log(, "kddd");
  return (
    <React.Fragment>
      <Modal
        centered
        show={show2}
        onHide={handleClose2}
        className="modal-custom benddetailsmodal"
      >
        <Modal.Body>
          <div className="flex-column flex-md-row d-flex flex-wrap flex-md-nowrap">
            <div className="bend-img-main flex-shrink-0">
              <div className="bend-img">
                <Image src={image} className="img-fluid" alt="" />
              </div>
              {/* <p>
                Dimensions <span>1.00 in x 1.00 in</span>
              </p> */}
              <p></p>
              <h2>{name}</h2>
            </div>
            <div className="bend-content text-center text-md-start mt-3 mt-md-0 ps-0 ps-md-4 flex-grow-1">
              <div className="bend-title mb-3">
                <h2 className="mb-0"> {title} </h2>
                <Button
                  className="btn-outline-primary"
                  variant={null}
                  onClick={handleSave}
                >
                  Done
                </Button>
                <button className="btn-close" onClick={handleClose2}></button>
              </div>
              <div className="bend-quantity mb-3">
                <h5 className="mb-0 me-4">Number of bends: </h5>

                <QuantitySelector
                  quantity={quantities}
                  onIncrement={() => incrementQuantity("item1")}
                  onDecrement={() => decrementQuantity("item1")}
                />
              </div>
              {pdfPreviewUrl ? (
                <div style={{ position: "relative", display: "inline-block" }}>
                  <Image
                    src={pdf}
                    className="img-fluid"
                    alt="PDF Preview"
                    height={60}
                    width={60}
                  />

                  <button
                    onClick={() => setPdfPreviewUrl(null)}
                    style={{
                      position: "absolute",
                      top: -13,
                      right: -6,
                      background: "transparent",
                      border: "none",
                      fontSize: "18px",
                      cursor: "pointer",
                    }}
                  >
                    &times;
                  </button>
                </div>
              ) : (
                <div className="bends-upload-file mb-2">
                  <Icon icon="mage:file-plus" />
                  <p>
                    <label htmlFor="uploadfileBend">Browse Files</label>
                    <input
                      type="file"
                      id="uploadfileBend"
                      name="uploadfileBend"
                      className="d-none"
                      accept="application/pdf" // Accept only PDFs
                      onChange={handleFileChange}
                    />
                    <span> or Drag or Drop</span>
                  </p>
                  {errorMessage && (
                    <p style={{ color: "red" }}>{errorMessage}</p>
                  )}
                  <small>
                    Please upload your step file for bending review. PDF
                    drawings are also welcome, but might require more time for
                    review.
                  </small>
                </div>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};
export default AddBend;
