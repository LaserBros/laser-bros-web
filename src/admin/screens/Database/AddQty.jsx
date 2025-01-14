import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AddDiscount, PutDiscount, getParticularDiscount } from "../../../api/api";
import { Alert, Button, Form, Card, CardBody, CardHeader } from "react-bootstrap";
import { toast } from "react-toastify";

const AddQtyDatabase = () => {
  const { id } = useParams(); // Extract id from URL
  const [formData, setFormData] = useState({ discount: 0, quantity: 0 });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.discount || isNaN(formData.discount) || formData.discount < 0 || formData.discount > 100) {
      newErrors.discount = "Discount must be a number between 0 and 100.";
    }
    if (!formData.quantity || !/^\d+$/.test(formData.quantity) || parseInt(formData.quantity, 10) <= 0) {
      newErrors.quantity = "Quantity must be a positive integer.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setShowAlert(true);
      return;
    }
    setSaving(true);
    try {
      await AddDiscount(formData);
      toast.success("Quantity added successfully!");
      setShowAlert(false);
    } catch {
      toast.error("An error occurred while saving.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <p className="text-center">
        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Loading...
      </p>
    );
  }

  if (errorMessage) {
    return <p className="text-danger text-center">{errorMessage}</p>;
  }

  return (
    <Card>
      <CardHeader className="py-4">
        <h5>Add Quantity</h5>
      </CardHeader>
      <CardBody>
        {showAlert && (
          <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
            Please fix the validation errors before submitting.
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formDiscount">
            <Form.Label>Discount (%)</Form.Label>
            <Form.Control
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              isInvalid={!!errors.discount}
            />
            <Form.Control.Feedback type="invalid">{errors.discount}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formQuantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              isInvalid={!!errors.quantity}
            />
            <Form.Control.Feedback type="invalid">{errors.quantity}</Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit" disabled={saving}>
            {saving ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "Save Changes"}
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default AddQtyDatabase;
