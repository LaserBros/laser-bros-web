import React, { useEffect, useState } from "react";
import { Table, Button, Container, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { DeleteFAQAdmin, FetchFAQAdmin } from "../../../api/api";

// Mock store (simulate API store)


const FaqList = () => {
  const [faqs, setFaqs] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();
  const fetchFaq = async () => {
    const res = await FetchFAQAdmin();
    setFaqs(res.data)
  }
  useEffect ( () => {
    fetchFaq();
  },[])
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

  const faqArray = Object.entries(faqs); // convert object to array of [id, data]

  return (
    <Container className="mt-4">
      <h3>FAQ List</h3>
      <Button className="mb-3" onClick={() => navigate("/faq/add")}>
        Add New FAQ
      </Button>
      {faqArray.length === 0 ? (
        <p>No FAQs available.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Question</th>
              <th>Answer</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {faqArray.map(([id, faq], index) => (
              <tr key={faq._id}>
                <td>{index + 1}</td>
                <td>{faq.question}</td>
                <td>{faq.answer}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => navigate(`/admin/edit-faq/${faq._id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(faq._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

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
