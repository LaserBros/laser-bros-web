import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import { uploadQuoteCustomer } from "../../api/api";


const AdminFileUpload = ({
  accept = ".dxf",
  label = "Browse Files",
  instructions = "We accept DXF files for instant quotes",
  onFileDrop,
  className,
  user_id
}) => {
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]); // Track uploaded files

  const onDrop = async (acceptedFiles, fileRejections) => {
    setError("");

    // Check if the current file count exceeds 5
    if (uploadedFiles.length + acceptedFiles.length > 150) {
      setError("You can only upload a maximum of 150 files.");
      return;
    }

    if (fileRejections.length > 0) {
      setError(`Only ${accept.toUpperCase()} files are accepted.`);
      return;
    }

    if (onFileDrop) {
      // Add the new files to the state
      setUploadedFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);

      const formData = new FormData();
      // console.log("SAasasas", acceptedFiles);
      for (let i = 0; i < acceptedFiles.length; i++) {
        formData.append("quote_image", acceptedFiles[i]);
      }

      formData.append("documentName", "file_upload");
      formData.append("workspaceName", "file_upload");
      formData.append("user_id", user_id);

      const quote_list = localStorage.getItem("CustomersetItemelementData");

      if (quote_list) {
        const quote_list_val = JSON.parse(quote_list);
        formData.append("id", quote_list_val._id);
        formData.append("type", 0);
      }

      setProcessing(true);

    //   try {
        const response = await uploadQuoteCustomer(formData);
        console.log("response_api", response.data);
        localStorage.setItem(
          "CustomersetItemelementData",
          JSON.stringify(response.data.requestQuoteDB)
        );

        // localStorage.setItem(
        //   "setItempartsDBdata",
        //   JSON.stringify(response.data.partsDBdata)
        // );

        localStorage.setItem(
          "CustomersetItempartsDBdata",
          JSON.stringify([
            ...(JSON.parse(localStorage.getItem("CustomersetItempartsDBdata")) || []),
            ...response.data.partsDBdata
          ])
        );

        onFileDrop({
          requestQuoteDB: response.data.requestQuoteDB,
          partsDBdata: response.data.partsDBdata,
        });

        setProcessing(false);
    //   } catch (error) {
    //     toast.error(`${error.response.data.message || "Bad Request"}`);
    //   }
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
      {error && <div className="text-danger mb-4">{error}</div>}
      <div className="uploaded-files">
        {/* Display uploaded file names */}
        {/* <ul>
          {uploadedFiles.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul> */}
      </div>
    </div>
  );
};

export default AdminFileUpload;
