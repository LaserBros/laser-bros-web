import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Icon } from "@iconify/react";
import FileUpload from "./FileUpload";
const CTA = () => {
  const [error, setError] = useState(null);

  const handleFileChange = (files) => {
    if (files.length === 0) {
      setError("Please upload a valid STEP file.");
    } else {
      setError(null);
      // Handle the files (e.g., upload to server)
    }
  };
  return (
    <section className="cta">
      <Container>
        <div className="heading text-center mb-5">
          <h2 className="text-capitalize">Are you ready to try Laser Bros?</h2>
        </div>
        <div className="max-width-810 mx-auto text-center">
          <FileUpload
            acceptedFiles={[".step"]}
            onFileChange={handleFileChange}
            error={error}
          />
        </div>
      </Container>
    </section>
  );
};
export default CTA;
