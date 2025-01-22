import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
const CTA = () => {
  const [error, setError] = useState(null);
  const handleRemove = () => {
    localStorage.removeItem("setItemelementData");
    localStorage.removeItem("setItempartsDBdata");
  };
 
  return (
    <section className="cta">
    <Container>
      <div className="heading text-center mb-5">
        <h2 className="text-capitalize">
          Are you ready to try Laser Bros?
        </h2>
      </div>
      <div className="max-width-810 mx-auto text-center">
        <Button
          as={Link}
          to="/quotes/quotes-detail"
          onClick={handleRemove}
          className="d-inline-flex align-items-center justify-content-center px-4"
        >
          {" "}
          <Icon icon="icon-park-outline:add" /> Get a Quote
        </Button>
      </div>
    </Container>
  </section>
  );
};
export default CTA;
