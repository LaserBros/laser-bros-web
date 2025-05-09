import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, Button, Modal, Spinner } from "react-bootstrap";

import { Link } from "react-router-dom";
import { Fetchproducts } from "../../../api/api";
import { toast } from "react-toastify";
export default function Products() {
  const [show, setShow] = useState(false);
  const [modal, setModalData] = useState("");
  const ProductToggle = (product) => {
    setModalData(product);
    setShow(true);
  };
  const [loadingbtn , setloadingbtn] = useState("");
  const [loading , setloading] = useState(false);
  const [products,setProducts] = useState([]);
  const fetchProducts = async () => {
    setloading(true);
    try {
      const res = await Fetchproducts();
      if(res.status == 'failure') {
        setProducts([])  
        setloading(false)
      } else{
        
        setProducts(res.data)  
        setloading(false)
      }
    } catch (error) {
      setloading(false)
    }
    
  }
  const DownloadDxf = async (fileName, fileUrl,id) => {
    console.log("234567876543212345678",id)
    setloadingbtn(id);
    try {
      const response = await fetch(fileUrl, {
        mode: 'cors', // Ensure CORS is allowed by the server
      });
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
  
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${fileName}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
      // Clean up the object URL
      window.URL.revokeObjectURL(blobUrl);
      setloadingbtn("");
    } catch (error) {
      setloadingbtn("");
      toast.error("Download failed");
    }
  };
  
  useEffect(()=> {
    fetchProducts();
  },[])
  return (
    <React.Fragment>
      <section className="laserProduct_sec">
        <Container>
          <Row className="g-3">
          {loading ?
          <div className="text-center">
        <Spinner animation="border" /> 
        </div> 
          :
          <>
            {products?.length === 0 ? (
  <div className="text-center p-3">
    <b className="text-center">No Products available.</b>
  </div>
) : (
  <>
    {products?.map((product, index) => (
      <Col key={index} xl={3} lg={4} md={6} sm={6}>
        <div className="Productmain_box">
          <div className="Product_img">
            <Image className="img_hover" src={product.product_image_hover_url} alt="" />
            <Image className="img_default" src={product.product_image_url} alt="" />
          </div>
          <h4><Link to="#">{product.product_title}</Link></h4>
          <p>
            <Button onClick={() => DownloadDxf(product.product_title, product.product_dxf_url,product._id)}>
              {loadingbtn == product._id ?
               <span
               className="spinner-border spinner-border-sm"
               role="status"
               aria-hidden="true"
             ></span>
             :
              "Download Free Files" }
            </Button>
          </p>
          <Button variant="lt-primary" onClick={() => ProductToggle(product)} className="btn-sm">
            Learn More
          </Button>
        </div>
      </Col>
    ))}
  </>
)}
</>
}


          </Row>
        </Container>
      </section>
      <Modal centered show={show} onHide= {() =>setShow(false)} className="product_modal modal-custom max-width-574">
        <Button className="btn-close z-1" variant={null} onClick= {() =>setShow(false)}></Button>
        <Modal.Body>
          <h3 className="main_heading">{modal.product_title}</h3>
          <div dangerouslySetInnerHTML={{ __html: modal.product_description }} />
          
          <Button className="mt-3" onClick={() => DownloadDxf(modal.product_title, modal.product_dxf_url,modal._id)}>
          {loadingbtn == modal._id ?
               <span
               className="spinner-border spinner-border-sm"
               role="status"
               aria-hidden="true"
             ></span>
             :
            "Download Free Files" }
            </Button>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}
