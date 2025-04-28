import React, { useEffect, useState } from "react";
import { Table, Button, Image, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { Icon } from "@iconify/react";
import { AdminAllProducts } from "../../../api/api";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const res = await AdminAllProducts()
      setProducts(res?.data?.products || []);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure to delete this product?")) return;
    try {
      await axios.delete(`/api/products/${id}`);
      setProducts((prev) => prev.filter((product) => product._id !== id));
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Container className="mt-5">
      <Row className="mb-3">
        <Col><h3>All Products</h3></Col>
        <Col className="text-end">
          <Button variant="success" href="/add-product">
            <Icon icon="mdi:plus-circle" className="me-2" />
            Add New Product
          </Button>
        </Col>
      </Row>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Image</th>
            <th>Hover Image</th>
            <th>DXF</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr><td colSpan="8" className="text-center">No Products Found</td></tr>
          ) : (
            products.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>{product.product_title}</td>
                <td>{product.product_description}</td>
                <td>${product.product_price}</td>
                <td>
                  {product.product_image_url && (
                    <Image src={`${product.product_image_url}`} height="50" width="50" thumbnail />
                  )}
                </td>
                <td>
                  {product.product_image_hover_url && (
                    <Image src={`${product.product_image_hover_url}`} height="50" width="50" thumbnail />
                  )}
                </td>
                <td>
                  {product.product_dxf_url && (
                    <a href={`${product.product_dxf_url}`} target="_blank" rel="noopener noreferrer">
                      View DXF
                    </a>
                  )}
                </td>
                <td>
                  <Icon
                    icon="mdi:eye"
                    style={{ cursor: "pointer", color: "blue", marginRight: "10px" }}
                    onClick={() => alert("View not implemented")}
                  />
                  <Link to={`/admin/edit-product/${product._id}`}>
                  <Icon
                    icon="mdi:pencil"
                    style={{ cursor: "pointer", color: "orange", marginRight: "10px" }}
                  /></Link>
                  <Icon
                    icon="mdi:delete"
                    style={{ cursor: "pointer", color: "red" }}
                    onClick={() => deleteProduct(product._id)}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default AllProducts;
