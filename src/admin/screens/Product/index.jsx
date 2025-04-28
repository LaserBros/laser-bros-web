import React, { useEffect, useState } from "react";
import { Form, Button, Col, Row, Alert, Image } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import {
  AdminAddProducts,
  AdminAllProducts,
  AdminEditProducts,
} from "../../../api/api";
import { useNavigate, useParams } from "react-router-dom";

const AddEditProduct = () => {
  const { id } = useParams(); // if present, we're editing
  const navigate = useNavigate();

  const [form, setForm] = useState({
    product_title: "",
    product_description: "",
    product_price: "",
    product_dxf_url: null,
    product_image_url: null,
    product_image_hover_url: null,
  });

  const [preview, setPreview] = useState({
    dxf: null,
    image: null,
    hover: null,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const res = await AdminAllProducts(id);
          const data = res.data;

          setForm({
            product_title: data.product_title,
            product_description: data.product_description,
            product_price: data.product_price,
            product_dxf_url: null,
            product_image_url: null,
            product_image_hover_url: null,
          });

          setPreview({
            dxf: data.product_dxf_url,
            image: data.product_image_url,
            hover: data.product_image_hover_url,
          });
        } catch (err) {
          toast.error("Failed to fetch product details");
        }
      })();
    }
  }, [id]);

  const validate = () => {
    console.log("form.product_price",form.product_price)
    const errs = {};
    if (!form.product_title.trim()) errs.product_title = "Title is required";
    if (!form.product_description.trim())
      errs.product_description = "Description is required";
    if (!form.product_price || isNaN(form.product_price))
      errs.product_price = "Valid price is required";
    if (!id && !form.product_dxf_url)
      errs.product_dxf_url = "DXF file is required";
    if (!id && !form.product_image_url)
      errs.product_image_url = "Image is required";
    if (!id && !form.product_image_hover_url)
      errs.product_image_hover_url = "Hover image is required";
    return errs;
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = {
      dxf: [".dxf"],
      image: ["image/png", "image/jpeg", "image/jpg", "image/webp"],
    };

    if (type === "product_dxf_url") {
      if (!file.name.toLowerCase().endsWith(".dxf")) {
        alert("Only .dxf files are allowed.");
        return;
      }
      setPreview((prev) => ({ ...prev, dxf: file.name }));
    } else {
      if (!validTypes.image.includes(file.type)) {
        alert("Only image files are allowed.");
        return;
      }
      const imgPreview = URL.createObjectURL(file);
      setPreview((prev) => ({
        ...prev,
        [type === "product_image_url" ? "image" : "hover"]: imgPreview,
      }));
    }

    setForm({ ...form, [type]: file });
  };

  const removeFile = (type) => {
    setForm({ ...form, [type]: null });
    setPreview((prev) => ({
      ...prev,
      [type === "product_dxf_url"
        ? "dxf"
        : type === "product_image_url"
        ? "image"
        : "hover"]: null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
      try {
        const formData = new FormData();
        formData.append("product_title", form.product_title);
        formData.append("product_description", form.product_description);
        formData.append("product_price", form.product_price);

        if (form.product_dxf_url)
          formData.append("product_dxf_url", form.product_dxf_url);
        if (form.product_image_url)
          formData.append("product_image_url", form.product_image_url);
        if (form.product_image_hover_url)
          formData.append(
            "product_image_hover_url",
            form.product_image_hover_url
          );
        if(id) {
            formData.append("id", id);
        }
        const response = id
          ? await AdminEditProducts(formData)
          : await AdminAddProducts(formData);

        toast.success(
          id ? "Product updated successfully" : "Product added successfully"
        );
        navigate("/admin/products"); // redirect after success
      } catch (error) {
        toast.error("An error occurred");
      } finally {
        setSubmitted(false);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h3>{id ? "Edit" : "Add"} Product</h3>

      <Form.Group className="mb-3">
        <Form.Label>Product Title</Form.Label>
        <Form.Control
          type="text"
          value={form.product_title}
          onChange={(e) => setForm({ ...form, product_title: e.target.value })}
          isInvalid={!!errors.product_title}
        />
        <Form.Control.Feedback type="invalid">
          {errors.product_title}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Product Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={form.product_description}
          onChange={(e) =>
            setForm({ ...form, product_description: e.target.value })
          }
          isInvalid={!!errors.product_description}
        />
        <Form.Control.Feedback type="invalid">
          {errors.product_description}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Product Price</Form.Label>
        <Form.Control
          type="number"
          value={form.product_price}
          onChange={(e) => setForm({ ...form, product_price: e.target.value })}
          isInvalid={!!errors.product_price}
        />
        <Form.Control.Feedback type="invalid">
          {errors.product_price}
        </Form.Control.Feedback>
      </Form.Group>

      {/* DXF File Upload */}
      <Form.Group className="mb-3">
        <Form.Label>Product DXF File</Form.Label>
        <div className="d-flex align-items-center gap-2">
          <Form.Control
            type="file"
            accept=".dxf"
            onChange={(e) => handleFileChange(e, "product_dxf_url")}
            isInvalid={!!errors.product_dxf_url}
          />
          {preview.dxf && (
            <span className="d-flex align-items-center">
              <strong>{preview.dxf}</strong>
              <Icon
                icon="mdi:close-circle"
                className="ms-2 text-danger"
                style={{ cursor: "pointer" }}
                onClick={() => removeFile("product_dxf_url")}
              />
            </span>
          )}
        </div>
        <Form.Control.Feedback type="invalid">
          {errors.product_dxf_url}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Image Upload */}
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Product Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "product_image_url")}
              isInvalid={!!errors.product_image_url}
            />
            {preview.image && (
              <div className="mt-2 d-flex align-items-center">
                <Image src={preview.image} thumbnail height={100} />
                <Icon
                  icon="mdi:close-circle"
                  className="ms-2 text-danger"
                  style={{ cursor: "pointer" }}
                  onClick={() => removeFile("product_image_url")}
                />
              </div>
            )}
            <Form.Control.Feedback type="invalid">
              {errors.product_image_url}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Product Hover Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "product_image_hover_url")}
              isInvalid={!!errors.product_image_hover_url}
            />
            {preview.hover && (
              <div className="mt-2 d-flex align-items-center">
                <Image src={preview.hover} thumbnail height={100} />
                <Icon
                  icon="mdi:close-circle"
                  className="ms-2 text-danger"
                  style={{ cursor: "pointer" }}
                  onClick={() => removeFile("product_image_hover_url")}
                />
              </div>
            )}
            <Form.Control.Feedback type="invalid">
              {errors.product_image_hover_url}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Button variant="primary" type="submit" disabled={submitted}>
        {submitted ? (
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
        ) : (
          "Submit Product"
        )}
      </Button>
    </Form>
  );
};

export default AddEditProduct;
