import React, { useEffect, useState } from "react";
import { Image, Modal, Button } from "react-bootstrap";
import { Icon } from "@iconify/react";
import QuantitySelector from "./Quantityselector";
import pdfIcon from "../assets/img/file.png";
import Amount from "./Amount";
import { deleteBendQuoteImage } from "../api/api";

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
  loading,
}) => {
  const [quantities, setQuantities] = useState(
    count === 0 || count === null ? 1 : count
  );
  const [filePreviews, setFilePreviews] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (pdf_url && Array.isArray(pdf_url)) {
      // Map over pdf_url and create the required structure
      const mappedPreviews = pdf_url.map((url) => ({
        file: { name: url },
        previewUrl: url, // each URL will be set as a previewUrl
      }));

      // Append new mapped previews to existing file previews, if necessary
      setFilePreviews(mappedPreviews);
    }
    setQuantities(count);
    setErrorMessage("");
  }, [show2, pdf_url]);

  useEffect(() => {
    setQuantities(count === 0 || count === null ? 1 : count);
  }, [count]);

  const getFileExtension = (filename) => {
    const parts = filename.split(".");
    return parts.length > 1 ? parts.pop() : "No extension";
  };

  const handleFileChange = (e) => {
    const newFile = e.target.files[0];
    const validFileTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "application/octet-stream",
    ];
    const validExtensions = [".pdf", ".jpg", ".jpeg", ".png", ".step"];

    if (newFile) {
      const fileType = newFile.type;
      const fileName = newFile.name;
      const isValidType = validFileTypes.includes(fileType);
      const isValidExtension = validExtensions.some((ext) =>
        fileName.endsWith(ext)
      );

      if (isValidType || isValidExtension) {
        setErrorMessage("");
        const newPreview = {
          file: newFile,
          previewUrl: URL.createObjectURL(newFile),
        };
        setFilePreviews((prevPreviews) => [...prevPreviews, newPreview]);
      } else {
        setErrorMessage("Please upload a valid PDF, STEP, JPG, or PNG file.");
      }
    }
  };

  const handleSave = () => {
    const files = filePreviews.map((preview) => preview.file);
    onUpload(files, id, quantities);
  };

  const removePreview = (index, url) => {
    const data = {
      id: id,
      bendimageurl: url,
    };
    try {
      const res = deleteBendQuoteImage(data);
    } catch (error) {}
    setFilePreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
  };

  return (
    <React.Fragment>
      <Modal
        centered
        show={show2}
        onHide={handleClose2}
        className="modal-custom benddetailsmodal"
      >
        <Modal.Body>
          <h2 className="mb-3 text-center custom_h2"> {title} </h2>
          <div className="flex-column flex-md-row d-flex flex-wrap flex-md-nowrap">
            <div className="bend-img-main flex-shrink-0">
              <div className="bend-img">
                <Image src={image} className="img-fluid" alt="" />
              </div>
              <h2 className="mt-2">{name}</h2>
            </div>
            <div className="bend-content text-center text-md-start mt-3 mt-md-0 ps-0 ps-md-4 flex-grow-1">
              <div className="bend-quantity mb-3">
                <h5 className="mb-0 me-4">Number of bends: </h5>
                <QuantitySelector
                  quantity={quantities}
                  onIncrement={() => setQuantities((prev) => prev + 1)}
                  onDecrement={() =>
                    setQuantities((prev) => Math.max(1, prev - 1))
                  }
                  onQuantityChange={(newQuantity) => setQuantities(newQuantity)}
                />
              </div>

              <div className="file-previews">
                <h2 className="custom_h2_clr">Price Per Bend : $5.00</h2>
                <h2 className="custom_h2_clr">
                  Total: <Amount amount={quantities * 5} />
                </h2>
                <div className="bends-upload-file mb-2 mt-3">
                  <small>
                    Price per bend & total are estimated. Once your RFQ has been
                    submitted we will adjust the pricing accordingly.{" "}
                    <a
                      href={`${window.location.origin}/laser-bros/resources/bending`}
                      target="_blank"
                    >
                      Learn More
                    </a>
                  </small>
                </div>

                {/* Display file previews */}
                {filePreviews?.map((preview, index) => {
                  // Check if previewUrl is an array and contains any PDF URLs
                  const isPdf =
                    Array.isArray(preview.previewUrl) &&
                    preview.previewUrl.some((url) =>
                      url.toLowerCase().includes(".pdf")
                    );

                  console.log(
                    "filePreviews",
                    filePreviews,
                    typeof preview.previewUrl
                  );

                  return (
                    <div
                      key={index}
                      style={{
                        position: "relative",
                        display: "inline-block",
                        marginRight: 10,
                        width: "auto",
                        height: "auto",
                      }}
                    >
                      {isPdf ? (
                        <Image
                          src={pdfIcon}
                          className="img-fluid"
                          alt="Preview"
                          height={60}
                          width={60}
                        />
                      ) : (
                        <Image
                          src={pdfIcon}
                          className="img-fluid"
                          alt="Preview"
                          height={60}
                          width={60}
                        />
                      )}
                      <h2
                        style={{
                          marginTop: 5,
                          fontSize: "12px",
                          wordBreak: "break-word",
                          textAlign: "center",
                        }}
                      >
                        {getFileExtension(preview.file.name)}
                      </h2>
                      <button
                        onClick={() => removePreview(index, preview.previewUrl)}
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
                  );
                })}
              </div>
            </div>
          </div>
          <div className="bend-content">
            {filePreviews.length < 2 && (
              <div className="bends-upload-file mb-2 mt-3">
                <Icon icon="mage:file-plus" />
                <p>
                  <label htmlFor="uploadfileBend">Browse Files</label>
                  <input
                    type="file"
                    id="uploadfileBend"
                    name="uploadfileBend"
                    className="d-none"
                    accept=".pdf,.jpg,.jpeg,.png,.step"
                    onChange={handleFileChange}
                  />
                  <span> or Drag or Drop</span>
                </p>
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                <small>
                  Please upload your step file for bending review. PDF, PNG
                  drawings are also welcome, but might require more time for
                  review.
                </small>
              </div>
            )}
          </div>
          <div className="bend-title mb-3 text-center mt-3">
            <Button
              className="btn-primary"
              variant={null}
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                "Done"
              )}
            </Button>
            <button className="btn-outline-primary ms-3" onClick={handleClose2}>
              Cancel
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default AddBend;
