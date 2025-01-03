import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchSelectedFinishesAdmin,
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

const EditFinishing = () => {
  const { id } = useParams(); // Get the ID from URL parameters
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    finishing_code: "",
    finishing_desc: "",
    minimum_size: "",
    maximum_size: "",
    notes_text: "",
    price: "",
  });

  const [loading, setLoading] = useState(true);
  const [loadingVal, setLoadingVal] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch finish data by ID to populate the form
    const fetchFinish = async () => {
      try {
        const data_param = {
          id: id,
        };
        const response = await fetchSelectedFinishesAdmin(data_param);
        // console.log(response.data, "SDdsdsdssdsds");
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

    // Specific handling for price to allow only positive numbers and decimals
    if (name === "price") {
      if (value === "" || value === "." || value.match(/^\d*\.?\d*$/)) {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!String(formData.finishing_code || "").trim()) {
      newErrors.finishing_code = "Finishing code is required.";
    }
    if (!String(formData.finishing_desc || "").trim()) {
      newErrors.finishing_desc = "Finishing description is required.";
    }
    if (!String(formData.minimum_size || "").trim()) {
      newErrors.minimum_size = "Minimum size is required.";
    }
    if (!String(formData.maximum_size || "").trim()) {
      newErrors.maximum_size = "Maximum size is required.";
    }
    const priceValue = parseFloat(formData.price);
    if (isNaN(priceValue) || priceValue < 0) {
      newErrors.price = "Price must be a non-negative number.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setShowAlert(true);
    } else {
      setErrors({});
      setShowAlert(false);
      setLoadingVal(true);
      const res = await updateFinishDetails(formData);
      toast.success("Finish update successfully.");
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
        <h5>Edit Finishing Details</h5>
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
            <Form.Label>Finishing Code</Form.Label>
            <Form.Control
              type="text"
              name="finishing_code"
              value={formData.finishing_code}
              onChange={handleChange}
              isInvalid={!!errors.finishing_code}
            />
            <Form.Control.Feedback type="invalid">
              {errors.finishing_code}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3 form-group" controlId="formFinishingDesc">
            <Form.Label>Finishing Description</Form.Label>
            <Form.Control
              type="text"
              name="finishing_desc"
              value={formData.finishing_desc}
              onChange={handleChange}
              isInvalid={!!errors.finishing_desc}
            />
            <Form.Control.Feedback type="invalid">
              {errors.finishing_desc}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3 form-group" controlId="formMinimumSize">
            <Form.Label>Minimum Size</Form.Label>
            <Form.Control
              type="text"
              name="minimum_size"
              value={formData.minimum_size}
              onChange={handleChange}
              isInvalid={!!errors.minimum_size}
            />
            <Form.Control.Feedback type="invalid">
              {errors.minimum_size}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3 form-group" controlId="formMaximumSize">
            <Form.Label>Maximum Size</Form.Label>
            <Form.Control
              type="text"
              name="maximum_size"
              value={formData.maximum_size}
              onChange={handleChange}
              isInvalid={!!errors.maximum_size}
            />
            <Form.Control.Feedback type="invalid">
              {errors.maximum_size}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3 form-group" controlId="formNotes">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              name="notes_text"
              value={formData.notes_text}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3 form-group" controlId="formPrice">
            <Form.Label>Price Per Part</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              isInvalid={!!errors.price}
              min="0.01"
              step="0.01"
            />
            <Form.Control.Feedback type="invalid">
              {errors.price}
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

export default EditFinishing;
