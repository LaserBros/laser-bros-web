import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Icon } from "@iconify/react";
import { fetchParts, uploadQuote } from "../api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const FileUpload = ({
  accept = ".step",
  label = "Browse Files",
  instructions = "We accept STEP files for instant quotes",
  onFileDrop,
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

    if (onFileDrop) {
      onFileDrop(acceptedFiles);
      //   console.log("----", acceptedFiles[0].name);
      var nameWithoutExtension = acceptedFiles[0].name.replace(/\.step$/, "");
      console.log(acceptedFiles[0]);
      //   console.log(nameWithoutExtension);
      setProcessing(true);
      try {
        const formData = new FormData();
        formData.append("quote_image", acceptedFiles[0]);
        formData.append("documentName", nameWithoutExtension + "_document");
        formData.append("workspaceName", nameWithoutExtension + "_workspace");
        //   console.log(formData);
        const response = await uploadQuote(formData);
        var url = response.data.elementInfo;
        var wid = response.data.wid;
        var did = response.data.did;
        const data_api = {
          url: url.toString(),
          did: did.toString(),
          wid: wid.toString(),
          filename: nameWithoutExtension,
        };

        console.log(data_api);
        setTimeout(async () => {
          const response_api = await fetchParts(data_api);
          console.log("response_api", response_api.data);
          localStorage.setItem("setItem", JSON.stringify(response_api.data));
          setProcessing(false);
          navigate("/quotes/quotes-detail");
        }, 25000);
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
        className={`banner-upload-file mb-2 ${processing ? "processing" : ""}`}
        {...getRootProps()}
      >
        {processing && (
          <>
            <div className="loader-overlay"></div>
            <div className="loader">Processing...</div>
          </>
        )}
        <Icon icon="mage:file-plus" />
        <p>
          <label htmlFor="uploadfile">{label}</label>
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
