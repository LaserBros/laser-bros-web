import React, { useEffect, useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { generalFAQAdmin, GetFAQAdmin, PostFAQAdmin } from "../../../api/api";

// Mock API data store
const mockFaqStore = {
  1: { question: "What is React?", answer: "React is a JS library." },
  2: { question: "What is Bootstrap?", answer: "A CSS framework." },
};

const FaqForm = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const editFaq = async () => {
    const res = await GetFAQAdmin(id);
    const data = res.data;

    // Convert _id to id
    const updatedData = {
      id: data._id,
      question: data.question,
      answer: data.answer,
      show_check:data.show_check,
      category:data.category
    };
    setForm(updatedData);
  }
  const handleCheckboxChange = (e) => {
    setForm({
      ...form,
      show_check: e.target.checked ? 1 : 0, // Set to 1 if checked, 0 if unchecked
    });
  };

  // Handle category change
  const handleCategoryChange = (e) => {
    setForm({
      ...form,
      category: e.target.value,
    });
  };
  useEffect(() => {
    if (isEditMode) {
      editFaq();
    }
  }, [id, isEditMode]);

  const validate = () => {
    const newErrors = {};
    if (!String(form.question || '').trim()) {
      newErrors.question = "Question is required";
    }
    
    if (!String(form.answer || '').trim()) {
      newErrors.answer = "Answer is required";
    }
    
    if (form.category === undefined || form.category === null || form.category === '') {
      newErrors.category = "Category is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (isEditMode) {
        const res = await PostFAQAdmin(form);
    } else {
      // Create logic - normally you'd POST to an API
      const newId = Date.now().toString();
      mockFaqStore[newId] = { ...form };
      const res = await generalFAQAdmin(form);
    }

    setShowSuccess(true);
    setTimeout(() => navigate("/admin/faq"), 1000); // redirect after success
  };

  return (
    <Container className="mt-4">
      <h3>{isEditMode ? "Edit FAQ" : "Add FAQ"}</h3>
      {showSuccess && <Alert variant="success">FAQ saved successfully!</Alert>}
      <Form onSubmit={handleSubmit} noValidate>
      <Form.Group className="mb-3" controlId="question">
        <Form.Label>Question</Form.Label>
        <Form.Control
          type="text"
          name="question"
          value={form.question}
          onChange={handleChange}
          isInvalid={!!errors.question}
        />
        <Form.Control.Feedback type="invalid">
          {errors.question}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Answer Input */}
      <Form.Group className="mb-3" controlId="answer">
        <Form.Label>Answer</Form.Label>
        <Form.Control
          as="textarea"
          name="answer"
          value={form.answer}
          onChange={handleChange}
          isInvalid={!!errors.answer}
        />
        <Form.Control.Feedback type="invalid">
          {errors.answer}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Show on Home Page Checkbox */}
      <Form.Group className="mb-3" controlId="show_check">
        <Form.Check
          type="checkbox"
          label="Show on Home Page"
          checked={form.show_check === 1}
          onChange={handleCheckboxChange}
        />
      </Form.Group>

      {/* Category Select */}
      <Form.Group className="mb-3" controlId="category">
        <Form.Label>Category</Form.Label>
        <Form.Control
          as="select"
          name="category"
          value={form.category || ''}
          isInvalid={!!errors.category}
          onChange={handleCategoryChange}
        >
          <option value="">Select a Category</option>
          <option value="0">Most Asked Questions</option>
          <option value="1">Laser Cutting</option>
          <option value="2">Bending</option>
          <option value="3">Shipping</option>
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          {errors.category}
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit">
        {isEditMode ? "Update" : "Add"} FAQ
      </Button>
      </Form>
    </Container>
  );
};

export default FaqForm;
