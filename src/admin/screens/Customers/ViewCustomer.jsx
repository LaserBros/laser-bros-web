import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import { Link, useParams } from "react-router-dom";
import { getAllCustomers, getParticularProfile } from "../../../api/api";
import ConfirmationModal from "../../../components/ConfirmationModal";
const ViewCustomer = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPage, settotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [name, searchName] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const indexOfLastItem = currentPage * itemsPerPage;
  const onPageChange = (pageNumber) => {
    console.log(pageNumber, "response.data.");
    setCurrentPage(pageNumber);
    loadCustomer(pageNumber);
  };
  const loadCustomer = async (page) => {
    try {
      const data = {
        id: id,
      };
      setLoading(true);
      setCustomer([]);
      const response = await getParticularProfile(data);
      setCustomer(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching cards:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomer(currentPage);
  }, []);

  return (
    <React.Fragment>
      <section className="myaccount ptb-50">
        <Container>
          <div className="QuoteBillMain_div">
            <Row>
              <Col lg={3} md={6}>
                <div className="QuoteBill_box">
                  <h4>Customer Details:</h4>
                  <p>
                    <b>Name :</b> {customer.full_name}
                  </p>
                  <p>
                    <b>Email :</b> {customer.email}
                  </p>
                  <p>
                    <b>Phone Number :</b> {customer.phone_number}
                  </p>
                  <p>
                    <b>Company Name :</b> {customer.company_name || "N/A"}
                  </p>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
        <Tabs onSelect={(index) => console.log("setTabIndex", index)}>
          <TabList>
            <Tab>Title 1</Tab>
            <Tab>Title 2</Tab>
          </TabList>

          <TabPanel>
            <h2>Any content 1</h2>
          </TabPanel>
          <TabPanel>
            <h2>Any content 2</h2>
          </TabPanel>
        </Tabs>
      </section>
    </React.Fragment>
  );
};

export default ViewCustomer;
