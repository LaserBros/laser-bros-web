import React, { useEffect, useRef, useState } from "react";
import { Modal, Button, Row, Col,Form, Image } from "react-bootstrap";
import pdf_icon from "../../assets/img/pdf_icon.png";
import { Icon } from "@iconify/react";
const ModalShippingInfo = ({
  QuoteNumber,
  modalShow4,
  handleClose4,
  QuoteData,
  ShippingInfoData
}) => {
    const [loading,setLoading] = useState(false);
    const [formData, setFormData] = useState({
        freight_carrier_name: "",
        freight_tracking: "",
        file: null,
        bolFileURL: null,
      });

      useEffect(() => {
        setErrors({});
        setFormData({
            freight_carrier_name: "",
            freight_tracking: "",
            file: null,
        })
      },[modalShow4])
    
      const [errors, setErrors] = useState({});
      const fileInputRef = useRef(null); // Ref for file input

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === "application/pdf") {
          const fileURL = URL.createObjectURL(file);
          setFormData({ ...formData, file: file, bolFileURL: fileURL });
        } else {
          setErrors({ ...errors, file: "Only PDF files are allowed" });
        }
      };
    
      const removeFile = () => {
        setFormData({ ...formData, file: null, bolFileURL: null });
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
      };
    
      const validateForm = () => {
        let newErrors = {};
        if (!formData.freight_carrier_name.trim()) newErrors.freight_carrier_name = "Carrier Name is required";
        if (!formData.freight_tracking.trim()) newErrors.freight_tracking = "Tracking number is required";
        if (!formData.file) newErrors.file = "BOL file is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setLoading(true);  
          await ShippingInfoData(formData);
          setLoading(false);
        }
      };
  return (
    <React.Fragment>
      <Modal
        centered
        show={modalShow4}
        onHide={handleClose4}
        className="modal-custom datamodal"
      >
        <Modal.Header closeButton className="border-0 text-center pt-4">
          <Modal.Title className="mx-auto">
            {/* <b>Data For:</b> {QuoteData?.subquote_number || QuoteNumber} */}
            <b>Enter Shipping Info</b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {/* <div className="container mt-4 p-4 border rounded shadow-sm"> */}
      {/* <h5 className="mb-3">Enter Shipping Info:</h5> */}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Row className="gx-2 align-items-center">
            <Col xl={3}>
          <Form.Label className="mb-xl-0 mb-lg-1">Carrier Name:</Form.Label>
            </Col>
            <Col xl={9}>
            <Form.Control
            type="text"
            name="freight_carrier_name"
            value={formData.freight_carrier_name}
            onChange={handleChange}
            isInvalid={!!errors.freight_carrier_name}
          />
            </Col>
          </Row>
          <Form.Control.Feedback type="invalid">{errors.freight_carrier_name}</Form.Control.Feedback>
        
        </Form.Group>

        <Form.Group className="mb-3">
        <Row className="gx-2 align-items-center">
        <Col xl={3}>

          <Form.Label className="mb-xl-0 mb-lg-1">Tracking:</Form.Label>
        </Col>
        <Col xl={9}>
          <Form.Control
            type="text"
            name="freight_tracking"
            value={formData.freight_tracking}
            onChange={handleChange}
            isInvalid={!!errors.freight_tracking}
          />

        </Col>
        </Row>
          <Form.Control.Feedback type="invalid">{errors.freight_tracking}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
        <Row className="gx-2 align-items-center">
        <Col xl={3}>
          <Form.Label className="mb-xl-0 mb-lg-1">Upload BOL:</Form.Label>

        </Col>
        <Col xl={9}>
          <Form.Control
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            isInvalid={!!errors.file}
            ref={fileInputRef}
          />
        </Col>
        </Row>
          
          <Form.Control.Feedback type="invalid">{errors.file}</Form.Control.Feedback>
        </Form.Group>
        {formData.bolFileURL && (
          <div className="mb-3 position-relative d-inline-flex">
            <Image src={pdf_icon} style={{width:'100px',height:'100px'}} />
            <Button variant="danger" className="p-0 removefileimg" onClick={removeFile}>
              <Icon icon="si:close-fill" width={18} height={18}/>
            </Button> 
          </div>
        )}

        <div className="d-flex gap-3">
          <Button type="submit" variant="primary" className="fw-bold"disabled={loading}
                  >
                    {loading ? (
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    ) : ( 
            "Save & Move to Complete"
                    )}
          </Button>
          <Button variant="lt-primary" onClick={handleClose4}>Cancel</Button>
        </div>
      </Form>
    {/* </div> */}
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default ModalShippingInfo;
