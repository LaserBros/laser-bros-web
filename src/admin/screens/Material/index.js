import React, { useState, useEffect } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BendingDataAdmin, editMaterialAdmin, updateMaterialAdmin } from "../../../api/api";
import { toast } from "react-toastify";

const initialForm = {
  material_grade: "",
  background_color: "#000", 
  material_thickness: "",
  min_flange_length: "",
  distortion_zone: "",
  bend_radius: "",
  bend_deduction: "",
  k_factor: "",
  max_length_part: "",
};

const MaterialForm = () => {
  const { id } = useParams(); // for edit
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  // Fetch data if editing
  useEffect(() => {
    if (id) {
        dataAdmin();
    }
  }, [id]);
  const dataAdmin = async () => {
    try {
      const res = await editMaterialAdmin(id);
    setFormData(res.data)  
    } catch (error) {
      
    }
    
  }
  const validate = () => {
    const newErrors = {};

    if (!formData.material_grade) newErrors.material_grade = "Material Name is required!";
    // if (!formData.background_color) newErrors.background_color = "Background color is required!";
    if (!formData.material_thickness) newErrors.material_thickness = "Material Thickness is required!";
    if (!formData.min_flange_length) newErrors.min_flange_length = "Minimum Flange Length is required!";
    if (!formData.distortion_zone) newErrors.distortion_zone = "Distortion Zone is required!";
    if (!formData.bend_radius) newErrors.bend_radius = "Bend Radius is required!";
    if (!formData.bend_deduction) newErrors.bend_deduction = "Bend Deduction is required!";
    if (!formData.k_factor) newErrors.k_factor = "K factor is required!";
    if (!formData.max_length_part) newErrors.max_length_part = "Max Length of part is required!";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      if (id) {
        const updatedData = {
            ...formData,
            id: id,
          };
        await updateMaterialAdmin(updatedData)
        toast.success("Material updated successfully.");
      } else {
        console.log(formData);
        const res = await BendingDataAdmin(formData);
        toast.success("Material created successfully.");
        setFormData(initialForm);
      }
      setErrors({});
    } catch (err) {
      setMessage("Something went wrong.");
    }
  };

  return (
    <Container className="mt-4">
      <h2>{id ? "Edit Material" : "Create Material"}</h2>
      {message && <Alert variant="info">{message}</Alert>}
      <Form onSubmit={handleSubmit} noValidate>
        <Form.Group className="mb-3">
          <Form.Label>Material Grade</Form.Label>
          <Form.Select
            name="material_grade"
            value={formData.material_grade}
            onChange={handleChange}
            isInvalid={!!errors.material_grade}
          >
            <option value="">Select Material</option>
            <option value="Aluminium">Aluminium</option>
            <option value="Steel">Steel</option>
            <option value="Stainless Steel">Stainless Steel</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">{errors.material_grade}</Form.Control.Feedback>
        </Form.Group>
        {/* <Form.Group controlId="background_color">
            <Form.Label>Background Color</Form.Label>
            <div className="d-flex align-items-center">
            <input
                type="color"
                className="form-control form-control-color"
                name="background_color"
                value={formData.background_color}
                onChange={handleChange}
                title="Choose your color"
            />
            <span className="ms-2">{formData.background_color}</span>
            </div>
        </Form.Group> */}
        {[
          "material_thickness",
          "min_flange_length",
          "distortion_zone",
          "bend_radius",
          "bend_deduction",
          "k_factor",
          "max_length_part",
        ].map((field) => (
          <Form.Group key={field} className="mb-3">
            <Form.Label>{field.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}</Form.Label>
            <Form.Control
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              isInvalid={!!errors[field]}
            />
            <Form.Control.Feedback type="invalid">{errors[field]}</Form.Control.Feedback>
          </Form.Group>
        ))}

        <Button variant="primary" type="submit">
          {id ? "Update" : "Create"}
        </Button>
      </Form>
    </Container>
  );
};

export default MaterialForm;
