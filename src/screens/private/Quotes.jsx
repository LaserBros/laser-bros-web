import React, { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import { Icon } from "@iconify/react";
import file1 from "../../assets/img/file1.jpg";
import { Link } from "react-router-dom";
import { getAllLoggedInRequestedQuote } from "../../api/api";

const Quotes = () => {
  const [quoteData, setQuotes] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllLoggedInRequestedQuote();
        setQuotes(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  function formatDate(dateString) {
    const date = new Date(dateString);

    // Extract day, month, and year
    const day = String(date.getUTCDate()).padStart(2, "0");
    const monthName = date.toLocaleString("default", { month: "long" }); // Full month name
    const year = date.getUTCFullYear();

    // Format as dd-mm-yyyy
    return `${day} ${monthName} ${year}`;
  }
  return (
    <React.Fragment>
      <section className="myaccount ptb-50">
        <Container>
          <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap">
            <h2 className="quotes-head">Quotes</h2>
            <Link
              to="/quotes/quotes-detail"
              className="btn btn-primary d-inline-flex align-items-center  justify-content-center min-width-159"
            >
              Add New Quote
            </Link>
          </div>
          {quoteData &&
            quoteData.length > 0 &&
            quoteData.map((quote, index) => {
              // Convert the 'createdAt' field to a Date object
              const dateObj = new Date(quote.createdAt);
              const day = String(dateObj.getDate()).padStart(2, "0");
              const month = String(dateObj.getMonth() + 1).padStart(2, "0");

              return (
                <div className="quotes-list flex-column flex-md-row">
                  <div className="quotes-img">
                    <Image src={quote.image_url} className="img-fluid" alt="" />
                  </div>
                  <div className="quotes-content text-center text-md-start mt-3 mt-md-0 ps-0 ps-md-4">
                    <div className="d-flex align-items-center justify-content-center  justify-content-md-between mb-3 flex-wrap">
                      <h2 className="mb-0">
                        Quote # {day}-{month}-{quote.quote_number}
                      </h2>
                      <span className="quotes-date">
                        {formatDate(quote.createdAt)}
                      </span>
                    </div>
                    <p>
                      Quantity <span>{quote.total_quantity}</span>
                    </p>
                    <Link
                      to="/quotes/quotes-detail"
                      className="btn btn-outline-primary min-width-159 d-inline-flex align-items-center justify-content-center"
                    >
                      <Icon icon="tabler:edit" /> Edit Quote
                    </Link>
                  </div>
                </div>
              );
            })}
        </Container>
      </section>
    </React.Fragment>
  );
};
export default Quotes;
