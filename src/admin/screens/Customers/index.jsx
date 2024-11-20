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

  const indexOfLastItem = currentPage * itemsPerPage;
  const onPageChange = (pageNumber) => {
    console.log(pageNumber, "response.data.");
    setCurrentPage(pageNumber);
    loadCustomer(pageNumber);
  };
  const loadCustomer = async (page) => {
    try {
      setLoading(true);
      setCustomer([]);
      settotalPage(1);
      const response = await getAllCustomers(page);
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
          <h5>Customers</h5>
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
                            <td className="text-nowrap">{row.phone_number}</td>
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
