import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Icon } from "@iconify/react";
import { fetchParts, uploadQuote } from "../api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const FileUpload = ({
  accept = ".dxf",
  label = "Browse Files",
  instructions = "We accept DXF files for instant quotes",
  onFileDrop,
  className,
}) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  const onDrop = async (acceptedFiles, fileRejections) => {
    setError("");

    if (fileRejections.length > 0) {
      setError(`Only ${accept.toUpperCase()} files are accepted.`);
      return;
    }
    console.log("SDssdsdsdsdsd");
    console.log(onFileDrop);
    if (onFileDrop) {
      onFileDrop(acceptedFiles);
      var nameWithoutExtension = acceptedFiles[0].name.replace(/\.dxf$/, "");
      console.log(acceptedFiles[0]);

      setProcessing(true);
      try {
        const formData = new FormData();
        formData.append("quote_image", acceptedFiles[0]);
        formData.append("documentName", "file_upload");
        formData.append("workspaceName", "file_upload");
        const quote_list = localStorage.getItem("setItemelementData");

        if (quote_list) {
          const quote_list_val = JSON.parse(quote_list);
          formData.append("id", quote_list_val._id);
          formData.append("type", 0);
        }
        const response = await uploadQuote(formData);
        console.log("response_api", response.data);
        localStorage.setItem(
          "setItemelementData",
          JSON.stringify(response.data.requestQuoteDB)
        );

        localStorage.setItem(
          "setItempartsDBdata",
          JSON.stringify(response.data.partsDBdata)
        );
        // if (onFileDrop) {
        onFileDrop({
          requestQuoteDB: response.data.requestQuoteDB,
          partsDBdata: response.data.partsDBdata,
        });
        // }
        setProcessing(false);
        navigate("/quotes/quotes-detail");
        // }, 25000);
      } catch (error) {
        toast.error(`${error.response.data.message || "Bad Request"}`);
      }
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/octet-stream": [accept], // Adjust MIME type as needed
    },
    onDrop,
  });

  return (
    <div>
      <div
        className={`banner-upload-file mb-2 text-center ${className} ${
          processing ? "processing-added" : ""
        }`}
        {...getRootProps()}
      >
        {processing && (
          <>
            <div className="loader-overlay"></div>
            <div className="loader">
              <Icon icon="tabler:loader-2" />
            </div>
          </>
        )}
        <Icon icon="mage:file-plus" />
        <p>
          <label>{label}</label>
          <input
            {...getInputProps()}
            type="file"
            id="uploadfile"
            name="uploadfile"
            className="d-none"
          />
          <span> or Drag or Drop</span>
        </p>
        <small>{instructions}</small>
      </div>
      {error && <div className="text-danger">{error}</div>}
    </div>
  );
};

export default FileUpload;
