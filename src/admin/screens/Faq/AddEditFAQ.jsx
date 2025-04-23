import React, { useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { generalEditFAQ, generalPostFAQ } from "../../../api/api";

const AddEditFaq = () => {
  const { id } = useParams();
  const location = useLocation();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    question: "",
    answer: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Pre-fill form if editing
  useEffect(() => {
    if (id) {
      const faqToEdit = location.state?.faqList;
      if (faqToEdit) {
        setFormData({
          id: id,
          question: faqToEdit.question,
          answer: faqToEdit.answer,
        });
      }
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    let err = {};
    if (!formData.question.trim()) {
      err.question = "Question is required";
    }
    if (!formData.answer.trim()) {
      err.answer = "Answer is required";
    } else if (formData.answer.length < 20) {
      err.answer = "Answer must be at least 20 characters";
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (validate()) {
      if (id) {
        const res = await generalEditFAQ(formData);
      } else {
        const res = await generalPostFAQ(formData);
      }
      navigate("/admin/faq");
    }
  };

  return (
    <Card className="p-4">
      <h4>{id ? "Edit" : "Add"} FAQ</h4>
      {submitted && Object.keys(errors).length > 0 && (
        <Alert variant="danger">Please fix the errors below.</Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="question">
          <Form.Label>Question</Form.Label>
          <Form.Control
            type="text"
            name="question"
            value={formData.question}
            onChange={handleChange}
            isInvalid={!!errors.question}
            placeholder="Enter question"
          />
          <Form.Control.Feedback type="invalid">
            {errors.question}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="answer">
          <Form.Label>Answer</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="answer"
            value={formData.answer}
            onChange={handleChange}
            isInvalid={!!errors.answer}
            placeholder="Enter answer (min 20 characters)"
          />
          <Form.Control.Feedback type="invalid">
            {errors.answer}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          {id ? "Update" : "Add"} FAQ
        </Button>
      </Form>
    </Card>
  );
};

export default AddEditFaq;
