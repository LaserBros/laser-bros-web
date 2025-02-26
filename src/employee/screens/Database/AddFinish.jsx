import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { addNewFinish
import { Alert, Button, Form, Card, CardBody, CardHeader } from "react-bootstrap";
import { toast } from "react-toastify";
import { addFinish } from "../../../api/empApi";

const AddFinish = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    finishing_code: "",
    finishing_desc: "",
    minimum_size_length: "",
    minimum_size_width: "",
    maximum_size_length: "",
    maximum_size_width: "",
    notes_text: "",
    price: "",
  });

  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [loadingVal, setLoadingVal] = useState(false);

  const handleChangeDropDown = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: parseInt(value, 10) || "", // Ensure integer conversion
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle price validation
    if (name === "price") {
      if (value === "" || value === "." || value.match(/^\d*\.?\d*$/)) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
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
    if (!formData.minimum_size_length || !formData.minimum_size_width) {
      newErrors.minimum_size = "Minimum size (length and width) is required.";
    }
    if (!formData.maximum_size_length || !formData.maximum_size_width) {
      newErrors.maximum_size = "Maximum size (length and width) is required.";
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

      try {
        await addFinish(formData); 
        toast.success("Finish added successfully.");
        setLoadingVal(false);
      } catch (error) {
        toast.error("Failed to add finish. Please try again.");
        setLoadingVal(false);
      }
    }
  };

  return (
    <Card>
      <CardHeader className="py-4">
        <h5>Add Finishing</h5>
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
         
            <div className="d-flex align-items-center gap-2">
            <Form.Group className="mb-3 form-group" controlId="formMinimumSize">
              <Form.Select
                name="minimum_size_length"
                value={formData.minimum_size_length}
                onChange={handleChangeDropDown}
                isInvalid={!!errors.minimum_size}
                style={{minWidth:150}}
              >
                <option value="" disabled>
                  Select Length
                </option>
                {Array.from({ length: 251 }, (_, i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.minimum_size}
              </Form.Control.Feedback>
            </Form.Group>
            <div className="mb-3">X</div>
            <Form.Group className="mb-3 form-group">
              <Form.Select
                name="minimum_size_width"
                value={formData.minimum_size_width}
                onChange={handleChangeDropDown}
                isInvalid={!!errors.minimum_size}
                style={{minWidth:150}}
              >
                <option value="" disabled>
                  Select Width
                </option>
                {Array.from({ length: 251 }, (_, i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.minimum_size}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          </Form.Group>
          <Form.Group className="mb-3 form-group" controlId="formMaximumSize">
              <Form.Label>Maximum Size</Form.Label>
        
          <div className="d-flex align-items-center gap-2">
         
            <Form.Group className="mb-3 form-group" controlId="formMaximumSize">
              <Form.Select
                name="maximum_size_length"
                value={formData.maximum_size_length}
                onChange={handleChangeDropDown}
                isInvalid={!!errors.maximum_size}
                style={{minWidth:150}}
              >
                <option value="" disabled>
                  Select Length
                </option>
                {Array.from({ length: 251 }, (_, i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.maximum_size}
              </Form.Control.Feedback>
            </Form.Group>
            <div className="mb-3">X</div>
            <Form.Group className="mb-3 form-group">
              <Form.Select
                name="maximum_size_width"
                value={formData.maximum_size_width}
                onChange={handleChangeDropDown}
                isInvalid={!!errors.maximum_size}
                style={{minWidth:150}}
              >
                <option value="" disabled>
                  Select Width
                </option>
                {Array.from({ length: 251 }, (_, i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.maximum_size}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
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
              "Add Finish"
            )}
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default AddFinish;
