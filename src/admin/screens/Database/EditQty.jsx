import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  PutDiscount,
  fetchSelectedFinishesAdmin,
  getParticularDiscount,
  updateFinishDetails,
} from "../../../api/api";
import {
  Alert,
  Button,
  Form,
  Card,
  CardBody,
  CardHeader,
} from "react-bootstrap";
import { toast } from "react-toastify";

const EditQty = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    discount: 0,
    quantity: 0,
  });

  const [loading, setLoading] = useState(true);
  const [loadingVal, setLoadingVal] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch finish data by ID to populate the form
    const fetchFinish = async () => {
      try {
        const response = await getParticularDiscount(id);
        console.log(response.data, "SDdsdsdssdsds");
        setFormData((prevFormData) => ({
          ...response.data,
          id: response.data._id,
        }));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchFinish();
  }, [id]);

  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update form data
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear error on change
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    console.log("formData", formData.discount);
    if (
      formData.discount === "" ||
      formData.discount === null ||
      formData.discount === undefined
    ) {
      newErrors.discount = "Discount is required.";
    } else if (
      isNaN(formData.discount) ||
      formData.discount < 0 ||
      formData.discount > 100
    ) {
      newErrors.discount = "Discount must be a number between 0 and 100.";
    }

    // Quantity Validation
    if (!formData.quantity) {
      newErrors.quantity = "Quantity is required.";
    } else if (
      !/^\d+$/.test(formData.quantity) ||
      parseInt(formData.quantity, 10) <= 0
    ) {
      newErrors.quantity = "Quantity must be a positive integer.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submitting
    if (!validateForm()) {
      setShowAlert(true);
      return;
    }

    setLoadingVal(true);
    setShowAlert(false);
    try {
      const res = await PutDiscount(formData);
      toast.success("Discount updated successfully!!");
    } catch (error) {
    } finally {
      setLoadingVal(false);
    }
  };

  if (loading)
    return (
      <p className="text-center">
        {" "}
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
      </p>
    );
  if (error) return <p>{error}</p>;

  return (
    <Card>
      <CardHeader className="py-4">
        <h5>Edit Quantity</h5>
      </CardHeader>
      <CardBody>
        {showAlert && (
          <Alert
            variant="danger"
            onClose={() => setShowAlert(false)}
            dismissible
          >
            Please fix the validation errors before submitting.
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3 form-group" controlId="formFinishingCode">
            <Form.Label>Discount</Form.Label>
            <Form.Control
              type="text"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              isInvalid={!!errors.discount}
            />
            <Form.Control.Feedback type="invalid">
              {errors.discount}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3 form-group" controlId="formFinishingDesc">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="text"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              isInvalid={!!errors.quantity}
            />
            <Form.Control.Feedback type="invalid">
              {errors.quantity}
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit" disabled={loadingVal}>
            {loadingVal ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              "Save Changes"
            )}
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default EditQty;
