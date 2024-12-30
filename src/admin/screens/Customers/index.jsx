import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  Button,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { getAllCustomers } from "../../../api/api";
import { toast } from "react-toastify";
import Pagination from "../../components/Pagination";
import ConfirmationModal from "../../../components/ConfirmationModal";
const Customers = () => {
  const [customer, setCustomer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPage, settotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [name, searchName] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  function formatPhoneNumber(input) {
    const cleanInput = input.replace(/\D/g, "");

    // Dynamically add "-" based on input length
    if (cleanInput.length <= 3) {
      return cleanInput; // No formatting for 1-3 digits
    } else if (cleanInput.length <= 6) {
      return `${cleanInput.slice(0, 3)}-${cleanInput.slice(3)}`; // Format as XXX-XXX
    } else {
      return `${cleanInput.slice(0, 3)}-${cleanInput.slice(
        3,
        6
      )}-${cleanInput.slice(6)}`; // Format as XXX-XXX-XXXX
    }
  }
  const indexOfLastItem = currentPage * itemsPerPage;
  const onPageChange = (pageNumber) => {
    console.log(pageNumber, "response.data.");
    setCurrentPage(pageNumber);
    loadCustomer(pageNumber, name);
  };
  const loadCustomer = async (page, search_name) => {
    try {
      setLoading(true);
      setCustomer([]);
      settotalPage(1);
      const response = await getAllCustomers(page, search_name);
      //   console.log("sdsddsdds", response.data.employees);
      setCustomer(response.data.customers);
      settotalPage(response.data.total);
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
      <Card>
        <CardHeader className="py-4">
          <div className="d-flex align-items-center gap-3">
            <h5>Customers</h5>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <Form.Group className="form-group mb-0 searchfield">
                <div className=" position-relative">
                  <Icon
                    icon="flowbite:search-solid"
                    className="position-absolute postion_take"
                  />
                  <Form.Control
                    type="text"
                    placeholder="Search WO"
                    value={name}
                    className="rounded-5"
                    onChange={(e) => {
                      setCurrentPage(1);
                      searchName(e.target.value);
                      loadCustomer(1, e.target.value);
                    }}
                  />
                </div>
              </Form.Group>
            </Form>
          </div>
        </CardHeader>
        <CardBody>
          <Form>
            {/* <Row className="px-2 gx-3">
              <Col lg={12} xxl={12} className="text-lg-end">
                <Link
                  variant={null}
                  className="btn btn-primary d-inline-flex align-items-center justify-content-center"
                  to={"/admin/add"}
                  //   onClick={handleDownloadAll}
                >
                  Add Employee
                </Link>
              </Col>
            </Row> */}
          </Form>
          <div className="table-responsive">
            <Table className="tablecustom pt-0">
              <thead>
                <tr>
                  {/* <th>Image</th> */}
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Company</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <>
                    <tr className="text-center mt-2">
                      <td colSpan={5}>
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
                      </td>
                    </tr>
                  </>
                ) : (
                  <>
                    {customer && customer.length > 0 ? (
                      customer.map((row) => (
                        <React.Fragment>
                          <tr>
                            <td className="text-nowrap">{row.full_name}</td>
                            <td className="text-nowrap">{row.email}</td>
                            <td className="text-nowrap">
                              {formatPhoneNumber(row.phone_number)}
                            </td>
                            <td className="text-nowrap">{row?.company_name}</td>
                            <td className="text-nowrap">
                              <Link
                                className="btnedit"
                                // onClick={() => EditQuote(row._id)}
                                to={`/admin/customers/${row._id}`}
                              >
                                <Icon icon="hugeicons:view" />
                              </Link>
                            </td>
                          </tr>
                        </React.Fragment>
                      ))
                    ) : (
                      <tr className="text-center mt-2">
                        <td colSpan={5}> No Customers Found. </td>
                      </tr>
                    )}
                  </>
                )}
              </tbody>
            </Table>
          </div>
          {!loading && totalPage > 10 && (
            <Pagination
              totalItems={totalPage}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
          )}
        </CardBody>
      </Card>
      {/* <ConfirmationModal
        show={DeletemodalShow}
        onHide={handleCloseModal}
        title={"Are you sure?"}
        desc={"You want to delete this employee"}
        yesBtnText={"Yes"}
        noBtnText={"No"}
        onConfirm={deleteCardHandler}
        loading={Deleteloading}
        message="Do you want to delete this employee?"
      /> */}
    </React.Fragment>
  );
};

export default Customers;
