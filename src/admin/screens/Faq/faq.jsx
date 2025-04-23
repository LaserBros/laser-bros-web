import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody } from "react-bootstrap";
import { Icon } from "@iconify/react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import {
  generalDeleteFAQ,
  generalFAQ,
  getAllTransactions,
} from "../../../api/api";
import Pagination from "../../components/Pagination";
import ConfirmationModal from "../../../components/ConfirmationModal";
import { toast } from "react-toastify";
const AdminFaq = () => {
  const [loading, setLoading] = useState(true);
  const [Faq, setFaq] = useState([]);
  const [totalPage, settotalPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(100);
  const [modalShow, setModalShow] = useState(false);
  const [title, setTitle] = useState("");
  const [ParamId, setId] = useState("");
  const handleClose = () => setModalShow(false);
  const [loadingBtn, setloadingBtn] = useState(false);
  const changeStatus = async () => {
    setloadingBtn(true);
    try {
      const res = await generalDeleteFAQ(ParamId);
      toast.success("FAQ deleted successfully!")
      setloadingBtn(false);
      setFaq([])
    } catch (error) {
      toast.error("Something wents wrong!");
      setloadingBtn(false);
    }
    setModalShow(false);
    fetchData();
  };
  const fetchData = async (page) => {
    try {
      const res = await generalFAQ();
      // console.log(res.data.data);
      setFaq(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchData(pageNumber);
  };
  useEffect(() => {
    fetchData(currentPage);
  }, []);

  const columns = [
    {
      name: "Sr. No.",
      selector: (row, index) => <>{index + 1}</>,
      width: "120px",
      sortable: true,
    },
    {
      name: "Question",
      selector: (row) =>
        row.question.length > 50
          ? `${row.question.substring(0, 50)}...`
          : row.question,
      sortable: true,
    },
    {
      name: "Answer",
      selector: (row) =>
        row.answer?.length > 80
          ? `${row.answer.substring(0, 80)}...`
          : row.answer || "",
      width: "620px",    
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <Link
            className="btnview"
            to={`/admin/edit-faq/${row._id}`}
            state={{ faqList: row }}
          >
            <Icon icon="mynaui:pencil" />
          </Link>
          <Link
            className="btntrash"
            onClick={(e) => {
              e.stopPropagation();
              setTitle("Are you sure you want to delete this faq?");
              setId(row._id);
              setModalShow(true);
            }}
          >
            <Icon icon="tabler:trash" />
          </Link>
        </>
      ),
    },
  ];
  
  return (
    <React.Fragment>
      <Card>
        <CardHeader className="py-4 d-flex justify-content-between align-items-center">
          <h5>All FAQ's</h5>
          <Link
            variant={null}
            className="btn btn-primary d-inline-flex align-items-center justify-content-center"
            to={"/admin/add-faq"}
          >
            Add FAQ's
          </Link>
        </CardHeader>
        <CardBody>
          {!loading ? (
            <>
              <DataTable
                columns={columns}
                data={Faq}
                responsive
                className="custom-table"
              />

              {totalPage > 10 ? (
                <Pagination
                  totalItems={totalPage}
                  itemsPerPage={itemsPerPage}
                  currentPage={currentPage}
                  onPageChange={onPageChange}
                />
              ) : (
                ""
              )}
            </>
          ) : (
            <>
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
            </>
          )}
        </CardBody>
      </Card>
      <ConfirmationModal
        show={modalShow}
        onHide={handleClose}
        title={"Are you sure?"}
        desc={title}
        yesBtnText={"Yes"}
        noBtnText={"No"}
        onConfirm={changeStatus}
        loading={loadingBtn}
      />
    </React.Fragment>
  );
};
export default AdminFaq;
