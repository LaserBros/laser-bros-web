import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Image, Spinner, Alert, Button, Card, CardHeader, CardBody } from "react-bootstrap";
import { DeleteproductsAdmin, FetchproductsAdmin, PostproductsAdmin } from "../../../api/api";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationModal from "../../../components/ConfirmationModal";
import { toast } from "react-toastify";
import DataTable from "react-data-table-component";
import { Icon } from "@iconify/react/dist/iconify.js";

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
      setProducts(res.data);
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

   const columns = [
        {
          name: "Title",
          selector: (row) => row.product_title,
          sortable: true,
        },
        {
          name: "Description",
          selector: (row) => {
            const desc = typeof row.product_description === "string" ? stripHtmlTags(row.product_description) : "";
            return desc.length > 100 ? desc.slice(0, 100) + "..." : desc;
          },
         
          sortable: true,
        },
        {
          name: "Price",
          selector: (row) => '$'+row.product_price,
          
          sortable: true,
        },
        {
          name: "DXF File",
          selector: (row) => { 
            return row.product_dxf_url ? (
              <a href={row.product_dxf_url} target="_blank" rel="noopener noreferrer">
                Download
              </a>
            ) : (
              "N/A"
            )
           },
          sortable: true,
        },
        {
          name: "Main File",
          selector: (row) => { 
            return row.product_image_url ? (
              <Image src={row.product_image_url} width="80" thumbnail />
            ) : (
              "No Image"
            )
           },
         
          sortable: true,
        },
        {
          name: "Hover Image",
          selector: (row) => { 
            return row.product_image_hover_url ? (
              <Image src={row.product_image_hover_url} width="80" thumbnail />
            ) : (
              "No Hover Image"
            )
           },
         
          sortable: true,
        },
    
        {
          name: "Actions",
          cell: (row) => (
            <>
              <Link className="btnview" to={`/admin/edit-product/${row._id}`}>
                <Icon icon="tabler:eye"></Icon>
              </Link>
              <Link className="btnview"  onClick={() => handleDelete(row._id)}>
                <Icon icon="tabler:trash"></Icon>
              </Link>
            </>
          ),
        },
      ];
  return (
    <div className="container mt-4">
         <Card>
        <CardHeader className="py-4 ">
          <h5>Products</h5>
          <Button className="mb-3" onClick={() => navigate("/admin/add-product")}>
        Add New Product
      </Button>
        </CardHeader>
        <CardBody>
          {!loading ? (
            <>
              <DataTable
                columns={columns}
                data={products}
                responsive
                pagination={false}
                className="custom-table"
              />
            </>
          ) : (
            <>
              <span
                role="status"
                aria-hidden="true"
                className="spinner-border spinner-border-sm text-center"
                style={{
                  margin: "0 auto",
                  display: "block",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              ></span>
            </>
          )}
        </CardBody>
      </Card>


     
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
