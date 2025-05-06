import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Image, Spinner, Alert, Button } from "react-bootstrap";
import { DeleteproductsAdmin, FetchproductsAdmin, PostproductsAdmin } from "../../../api/api";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../../components/ConfirmationModal";
import { toast } from "react-toastify";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [loading, setLoading] = useState(true);
    const handleClose = () => setModalShow(false);
    const [modalShow, setModalShow] = useState(false);
  const [error, setError] = useState("");
  const [Ids, setIds] = useState("");
  const navigate = useNavigate();
  const handleDelete = (id) => {
    setIds(id);
    setModalShow(true);
  }
  const fetchProducts = async () => {
    try {
      const res = await FetchproductsAdmin();
      setProducts(res.data.products);
      setLoading(false);
    } catch (err) {
      setError("Failed to load products.");
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const changeStatus = async () => {
      const id = Ids;
      try {
        setLoadingBtn(true);
        const res = await DeleteproductsAdmin(id);
        toast.success("Product deleted successfully!")
      } catch (error) {
        console.error("Error updating status", error);
      } finally {
        setLoadingBtn(false);
        setModalShow(false);
        fetchProducts();
      }
    };
  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  const stripHtmlTags = (htmlString) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;
    return tempDiv.textContent || tempDiv.innerText || "";
  };
  return (
    <div className="container mt-4">
      <h2>All Products</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>DXF File</th>
            <th>Main Image</th>
            <th>Hover Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id || product._id}>
              <td>{product.product_title}</td>
              <td>{stripHtmlTags(product.product_description)}</td>
              <td>${product.product_price}</td>
              <td>
                {product.product_dxf_url ? (
                  <a href={product.product_dxf_url} target="_blank" rel="noopener noreferrer">
                    Download
                  </a>
                ) : (
                  "N/A"
                )}
              </td>
              <td>
                {product.product_image_url ? (
                  <Image src={product.product_image_url} width="80" thumbnail />
                ) : (
                  "No Image"
                )}
              </td>
              <td>
                {product.product_image_hover_url ? (
                  <Image src={product.product_image_hover_url} width="80" thumbnail />
                ) : (
                  "No Hover Image"
                )}
              </td>
              <td>
              <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => navigate(`/admin/edit-product/${product._id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ConfirmationModal
        show={modalShow}
        onHide={handleClose}
        title={"Are you sure?"}
        desc={"Are you sure you want to delete this product?"}
        yesBtnText={"Yes"}
        noBtnText={"No"}
        onConfirm={changeStatus}
        loading={loadingBtn}
      />
    </div>
  );
};

export default ProductList;
