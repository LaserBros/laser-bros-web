import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Container,
  Modal,
  Card,
  CardHeader,
  CardBody,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { DeleteFAQAdmin, FetchFAQAdmin } from "../../../api/api";
import DataTable from "react-data-table-component";
import { Icon } from "@iconify/react/dist/iconify.js";


const FaqList = () => {
  const [faqs, setFaqs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setloading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();
  const fetchFaq = async () => {
    setloading(true);
    const res = await FetchFAQAdmin();
    setFaqs(res.data);
    setloading(false);
  };
  useEffect(() => {
    fetchFaq();
  }, []);
  const handleDelete = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    const updatedFaqs = { ...faqs };
    const deleteData = await DeleteFAQAdmin(deleteId);
    fetchFaq();
    delete updatedFaqs[deleteId];
    setFaqs(updatedFaqs);
    setShowModal(false);
  }; 

  const columns = [
    {
      name: "Question",
      selector: (row) => row.question,
      sortable: true,
    },
    {
      name: "Answer",
      selector: (row) => {
        const answer = typeof row.answer === "string" ? row.answer : "";
        return answer.length > 100 ? answer.slice(0, 100) + "..." : answer;
      },
      width: "700px",
      sortable: true,
    },

    {
      name: "Actions",
      cell: (row) => (
        <>
          <Link className="btnview" to={`/admin/edit-faq/${row._id}`}>
            <Icon icon="tabler:eye"></Icon>
          </Link>
          <Link className="btnview" onClick={() => handleDelete(row._id)}>
            <Icon icon="tabler:trash"></Icon>
          </Link>
        </>
      ),
    },
  ];

  return (
    <Container className="mt-4">
      <Card>
        <CardHeader className="py-4 ">
          <h5>FAQ List</h5>
          <Button className="mb-3" onClick={() => navigate("/admin/add-faq")}>
        Add New FAQ
      </Button>
        </CardHeader>
        <CardBody>
          {!loading ? (
            <>
              <DataTable
                columns={columns}
                data={faqs}
                responsive
                pagination={false}
                className="custom-table"
              />
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

      {/* Delete confirmation modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this FAQ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default FaqList;
