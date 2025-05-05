import React, { useState, useEffect } from "react";
import { Form, Button, Col, Row, Image, CloseButton } from "react-bootstrap";
import { generalproductsAdmin } from "../../../api/api";
import { toast } from "react-toastify";

const ProductForm = ({ product, onSubmit, isEditMode }) => {
  const [form, setForm] = useState({
    product_title: "",
    product_description: "",
    product_price: "",
    product_dxf_url: "",
    product_image_url: null,
    product_image_hover_url: null,
    product_image_url_preview: "",
    product_image_hover_url_preview: "",
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState({
    product_image_url_preview: "",
    product_image_hover_url_preview: "",
  });

  // Track the DXF file
  const [dxfFile, setDxfFile] = useState(null);

  useEffect(() => {
    if (isEditMode && product) {
      setForm({
        product_title: product.product_title || "",
        product_description: product.product_description || "",
        product_price: product.product_price || "",
        product_dxf_url: product.product_dxf_url || "",
        product_image_url: product.product_image_url || "",
        product_image_hover_url: product.product_image_hover_url || "",
        product_image_url_preview: product.product_image_url || "",
        product_image_hover_url_preview: product.product_image_hover_url || "",
      });
      setImagePreview({
        product_image_url_preview: product.product_image_url || "",
        product_image_hover_url_preview: product.product_image_hover_url || "",
      });
      setDxfFile(product.product_dxf_url || null); // Assuming `product_dxf_url` is a file URL or file name
    }
  }, [isEditMode, product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e, field) => {
    const file = e.target.files[0];
    const previewField = `${field}_preview`;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, [field]: file });
        setImagePreview({ ...imagePreview, [previewField]: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDxfFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, product_dxf_url: file });
      setDxfFile(file); // Save the DXF file
    }
  };

  const handleRemoveImage = (field) => {
    const previewField = `${field}_preview`;
    setForm({ ...form, [field]: "" });
    setImagePreview({ ...imagePreview, [previewField]: "" });
  };

  const handleRemoveDxfFile = () => {
    setDxfFile(null);
    setForm({ ...form, product_dxf_url: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!form.product_title) {
      validationErrors.product_title = "Product title is required";
    }
    if (!form.product_description) {
      validationErrors.product_description = "Product description is required";
    }
    if (!form.product_price) {
      validationErrors.product_price = "Product price is required";
    }
    if (!form.product_dxf_url || form.product_dxf_url === "") {
      validationErrors.product_dxf_url = "DXF file is required";
    }
    if (!form.product_image_url || form.product_image_url === null) {
      validationErrors.product_image_url = "Product image is required";
    }
    if (!form.product_image_hover_url || form.product_image_hover_url === null) {
      validationErrors.product_image_hover_url = "Product hover image is required";
    }
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
        console.log(form,"3456789098765432")
        const formData = new FormData();
        formData.append("product_title",form.product_title);
        formData.append("product_description",form.product_description);
        formData.append("product_price",form.product_price);
        if(form.product_dxf_url) {
            formData.append("product_dxf_url",form.product_dxf_url);
        }
        if(form.product_image_url) {
            formData.append("product_image_url",form.product_image_url);
        }
        if(form.product_image_hover_url) {
            formData.append("product_image_hover_url",form.product_image_hover_url);
        }
      const res = await generalproductsAdmin(formData);
      toast.success("Product added successfully")
    }
  };

  return (
    <Form onSubmit={handleSubmit} noValidate>
      {/* Product Title */}
      <Form.Group className="mb-3" controlId="product_title">
        <Form.Label>Product Title</Form.Label>
        <Form.Control
          type="text"
          name="product_title"
          value={form.product_title}
          onChange={handleChange}
          isInvalid={!!errors.product_title}
        />
        <Form.Control.Feedback type="invalid">
          {errors.product_title}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Product Description */}
      <Form.Group className="mb-3" controlId="product_description">
        <Form.Label>Product Description</Form.Label>
        <Form.Control
          as="textarea"
          name="product_description"
          value={form.product_description}
          onChange={handleChange}
          isInvalid={!!errors.product_description}
        />
        <Form.Control.Feedback type="invalid">
          {errors.product_description}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Product Price */}
      <Form.Group className="mb-3" controlId="product_price">
        <Form.Label>Product Price</Form.Label>
        <Form.Control
          type="number"
          name="product_price"
          value={form.product_price}
          onChange={handleChange}
          isInvalid={!!errors.product_price}
        />
        <Form.Control.Feedback type="invalid">
          {errors.product_price}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Product DXF File */}
      <Form.Group className="mb-3" controlId="product_dxf_url">
        <Form.Label>Product DXF File</Form.Label>
        <Form.Control
          type="file"
          name="product_dxf_url"
          accept=".dxf"
          onChange={handleDxfFileChange}
          isInvalid={!!errors.product_dxf_url}
        />
        <Form.Control.Feedback type="invalid">
          {errors.product_dxf_url}
        </Form.Control.Feedback>
        {dxfFile && (
          <div className="d-flex align-items-center mt-2">
            <span>{dxfFile.name}</span>
            <CloseButton onClick={handleRemoveDxfFile} style={{ marginLeft: "10px" }} />
          </div>
        )}
      </Form.Group>

      {/* Product Image URL */}
      <Form.Group className="mb-3" controlId="product_image_url">
        <Form.Label>Product Image</Form.Label>
        <Form.Control
          type="file"
          name="product_image_url"
          accept="image/*"
          onChange={(e) => handleImageChange(e, "product_image_url")}
          isInvalid={!!errors.product_image_url}
        />
        <Form.Control.Feedback type="invalid">
          {errors.product_image_url}
        </Form.Control.Feedback>
        {imagePreview.product_image_url_preview && (
          <div className="d-flex align-items-center mt-2">
            <Image src={imagePreview.product_image_url_preview} alt="Product Image Preview" fluid style={{ maxHeight: "200px", marginRight: "10px" }} />
            <CloseButton onClick={() => handleRemoveImage("product_image_url")} />
          </div>
        )}
      </Form.Group>

      {/* Product Hover Image URL */}
      <Form.Group className="mb-3" controlId="product_image_hover_url">
        <Form.Label>Product Hover Image</Form.Label>
        <Form.Control
          type="file"
          name="product_image_hover_url"
          accept="image/*"
          onChange={(e) => handleImageChange(e, "product_image_hover_url")}
          isInvalid={!!errors.product_image_hover_url}
        />
        <Form.Control.Feedback type="invalid">
          {errors.product_image_hover_url}
        </Form.Control.Feedback>
        {imagePreview.product_image_hover_url_preview && (
          <div className="d-flex align-items-center mt-2">
            <Image src={imagePreview.product_image_hover_url_preview} alt="Product Hover Image Preview" fluid style={{ maxHeight: "200px", marginRight: "10px" }} />
            <CloseButton onClick={() => handleRemoveImage("product_image_hover_url")} />
          </div>
        )}
      </Form.Group>

      <Button variant="primary" type="submit">
        {isEditMode ? "Update Product" : "Add Product"}
      </Button>
    </Form>
  );
};

export default ProductForm;
