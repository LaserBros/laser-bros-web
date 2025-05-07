import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, Button, Modal } from "react-bootstrap";

import { Link } from "react-router-dom";
import { Fetchproducts } from "../../../api/api";
export default function Products() {
  const [show, setShow] = useState(false);
  const [modal, setModalData] = useState("");
  const ProductToggle = (product) => {
    setModalData(product);
    setShow(true);
  };
  const [products,setProducts] = useState({});
  const fetchProducts = async () => {
    const res = await Fetchproducts();
    setProducts(res.data)
  }
  const DownloadDxf = async (fileName, fileUrl) => {
    try {
      const response = await fetch(fileUrl, {
        mode: 'cors', // Ensure CORS is allowed by the server
      });
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
  
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${fileName}.dxf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
      // Clean up the object URL
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
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
            {products.length > 0 && products.map((product,index) => (
            <Col xl={3} lg={4} md={6} sm={6}>
              <div className="Productmain_box">
                <div className="Product_img">
                  <Image className="img_hover" src={product.product_image_hover_url} alt="" />
                  <Image className="img_default" src={product.product_image_url} alt="" />
                </div>
                <h4><Link>{product.product_title}</Link></h4>
                <p> <Button onClick={() => DownloadDxf(product.product_title, product.product_dxf_url)}>
                Download Free Files</Button></p>
                <Button variant="lt-primary" onClick={ () => ProductToggle(product)} className="btn-sm">Learn More</Button>
              </div>
            </Col>
            ))}
          </Row>
        </Container>
      </section>
      <Modal centered show={show} onHide= {() =>setShow(false)} className="product_modal modal-custom max-width-574">
        <Button className="btn-close z-1" variant={null} onClick= {() =>setShow(false)}></Button>
        <Modal.Body>
          <h3 className="main_heading">{modal.product_title}</h3>
          <div dangerouslySetInnerHTML={{ __html: modal.product_description }} />
          
          <Button className="mt-3" onClick={() => DownloadDxf(modal.product_title, modal.product_dxf_url)}>Download Free Files</Button>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}
