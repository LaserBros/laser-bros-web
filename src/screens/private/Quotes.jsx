import React, { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import { Icon } from "@iconify/react";
import file1 from "../../assets/img/file1.jpg";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchRFQ,
  getAllLoggedInRequestedQuote,
  getEditQuote,
} from "../../api/api";
import Pagination from "../../admin/components/Pagination";
// Add loading state

const Quotes = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [quoteData, setQuotes] = useState(null);
  const [totalPage, settotalPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const fetchData = async (page = 1) => {
    try {
      setLoading(true);
      setQuotes([]);
      const res = await getAllLoggedInRequestedQuote(page);
      setQuotes(res.data.data);
      settotalPage(res.data.total);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchData(pageNumber);
  };
  const RequestQuote = async (id) => {
    const data = {
      id: id,
    };
    const response = await getEditQuote(data);
    console.log("resss-----", response.data);
    localStorage.setItem(
      "setItemelementData",
      JSON.stringify(response.data.requestQuoteDB)
    );

    localStorage.setItem(
      "setItempartsDBdata",
      JSON.stringify(response.data.partsDBdata)
    );
    navigate("/quotes/quotes-detail");
  };

  function formatDate(dateString) {
    const date = new Date(dateString);

    // Extract day, month, and year
    const day = String(date.getUTCDate()).padStart(2, "0");
    const monthName = date.toLocaleString("default", { month: "long" }); // Full month name
    const year = date.getUTCFullYear();

    // Format as dd-mm-yyyy
    return `${day} ${monthName} ${year}`;
  }
  const handleClick = () => {
    localStorage.removeItem("setItemelementData");
    localStorage.removeItem("setItempartsDBdata");
    localStorage.removeItem("setItempartsDBdataPay");
    localStorage.removeItem("setItemelementDataPay");
  };
  return (
    <React.Fragment>
      <section className="myaccount ptb-50">
        <Container>
          <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap">
            <h2 className="quotes-head">Quotes</h2>
            <Link
              // to=""
              to="/quotes/quotes-detail"
              className="btn btn-primary d-inline-flex align-items-center  justify-content-center min-width-259"
              onClick={handleClick}
            >
              Add New Quote
            </Link>
          </div>
          {loading ? (
            <span
              role="status"
              aria-hidden="true"
              className="spinner-border spinner-border-sm text-center"
              style={{
                margin: "0 auto",
                display: "block",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            ></span>
          ) : quoteData && quoteData.length > 0 ? (
            quoteData.map((quote, index) => {
              // Convert the 'createdAt' field to a Date object
              const dateObj = new Date(quote.createdAt);
              const day = String(dateObj.getDate()).padStart(2, "0");
              const month = String(dateObj.getMonth() + 1).padStart(2, "0");
              const yearLastTwoDigits = String(dateObj.getFullYear()).slice(-2);
              return (
                <div className="quotes-list flex-column flex-md-row">
                  <div className="quotes-img">
                    <Image src={quote.image_url} className="img-fluid" alt="" />
                  </div>
                  <div className="quotes-content text-center text-md-start mt-3 mt-md-0 ps-0 ps-md-4">
                    <div className="d-flex align-items-center justify-content-center  justify-content-md-between mb-3 flex-wrap">
                      <h2 className="mb-0">Quote # {quote.search_quote}</h2>
                      <span className="quotes-date">
                        {formatDate(quote.createdAt)}
                      </span>
                    </div>
                    <p>
                      Quantity <span>{quote.total_quantity}</span>
                    </p>
                    <Link
                      // to="/quotes/quotes-detail"
                      onClick={() => RequestQuote(quote._id)}
                      className="btn btn-outline-primary min-width-159 d-inline-flex align-items-center justify-content-center"
                    >
                      <Icon icon="tabler:edit" /> Edit Quote
                    </Link>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center mt-4">
              <i className="noQuotesFound_text">No quotes found.</i>
            </div>
          )}
        </Container>
        {!loading && totalPage > 10 && (
          <Pagination
            totalItems={totalPage}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        )}
      </section>
    </React.Fragment>
  );
};
export default Quotes;
