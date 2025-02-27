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
import {
  deleteEmployeeDetails,
  fetchOrdersInComplete,
  getAllEmployees,
  getOrdersAdmin,
  moveOrderToQueue,
} from "../../../api/empApi";
import { toast } from "react-toastify";
import Pagination from "../../components/Pagination";
import ConfirmationModal from "../../../components/ConfirmationModal";
const Employe = () => {
  const [emp, setEmp] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPage, settotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [name, searchName] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const indexOfLastItem = currentPage * itemsPerPage;
  const handleSortChange = (e) => {
    const selectedValue = e.target.value;
    setSortOrder(selectedValue);
    loadEmp(1, name, selectedValue);
  };
  const [DeletemodalShow, setDeleteModalShow] = useState(false);
  const [emp_id, setEmp_id] = useState("");
  const handleCloseModal = (shouldReload = false) => {
    setDeleteModalShow(false);
    if (shouldReload) {
      //   loadCards();
    }
  };
  const [Deleteloading, setDeleteLoading] = useState(false);
  const deleteCardHandler = async () => {
    try {
      setDeleteLoading(true);
      if (emp_id) {
        await deleteEmployeeDetails(emp_id);
        toast.success("Employee deleted successfully");
        await loadEmp();
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error employee delete");
      }
    } finally {
      setDeleteLoading(false);
      setDeleteModalShow(false);
      setEmp_id(null);
    }
  };
  const deleteEmp = (id) => {
    setDeleteModalShow(true);
    setEmp_id(id);
  };
  const loadEmp = async (page, search = "", sortOrder = "") => {
    try {
      setLoading(true);
      setEmp([]);
      settotalPage(1);
      const response = await getAllEmployees(page, search, sortOrder);
      //   // console.log("sdsddsdds", response.data.employees);
      setEmp(response.data.employees);
      settotalPage(response.data.total);
    } catch (error) {
      console.error("Error fetching cards:", error);
    } finally {
      setLoading(false);
    }
  };

  const onPageChange = (pageNumber) => {
    // console.log(pageNumber, "response.data.");
    setCurrentPage(pageNumber);
    loadEmp(pageNumber);
  };
  useEffect(() => {
    loadEmp(currentPage);
  }, []);

  return (
    <React.Fragment>
      <Card>
        <CardHeader className="py-4">
          <h5>Employees</h5>
        </CardHeader>
        <CardBody>
          <Form>
            <Row className="px-2 gx-3">
              <Col lg={12} xxl={12} className="text-lg-end">
                <Link
                  variant={null}
                  className="btn btn-primary d-inline-flex align-items-center justify-content-center"
                  to={"/employee/add"}
                  //   onClick={handleDownloadAll}
                >
                  Add Employee
                </Link>
              </Col>
            </Row>
          </Form>
          <div className="table-responsive">
            <Table className="tablecustom pt-0">
              <thead>
                <tr>
                  {/* <th>Image</th> */}
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <>
                    <tr className="text-center mt-2">
                      <td colSpan={4}>
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
                    {emp && emp.length > 0 ? (
                      emp.map((row) => (
                        <React.Fragment>
                          <tr>
                            <td className="text-nowrap">{row.full_name}</td>

                            <td className="text-nowrap">{row.email}</td>
                            <td className="text-nowrap">{row.phone_number}</td>
                            <td className="text-nowrap">
                              <div className="d-inline-flex align-items-center gap-1">
                                <Link
                                  className="btnedit"
                                  // onClick={() => EditQuote(row._id)}
                                  to={`/employee/add/${row._id}`}
                                >
                                  <Icon icon="teenyicons:edit-outline" />
                                </Link>
                                <Link
                                  className="btnedit"
                                  to={``}
                                  onClick={() => {
                                    deleteEmp(row._id);
                                  }}
                                >
                                  <Icon icon="tabler:trash" />
                                </Link>
                              </div>
                            </td>
                          </tr>
                        </React.Fragment>
                      ))
                    ) : (
                      <tr className="text-center mt-2">
                        <td colSpan={4}> No Employe Found. </td>
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
      <ConfirmationModal
        show={DeletemodalShow}
        onHide={handleCloseModal}
        title={"Are you sure?"}
        desc={"You want to delete this employee"}
        yesBtnText={"Yes"}
        noBtnText={"No"}
        onConfirm={deleteCardHandler}
        loading={Deleteloading}
        message="Do you want to delete this employee?"
      />
    </React.Fragment>
  );
};

export default Employe;
