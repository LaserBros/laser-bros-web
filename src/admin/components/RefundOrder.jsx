import React, { useEffect, useState } from "react";
import { Image, Modal, Button, Form } from "react-bootstrap";


const RefundOrder = ({
  show2,
  handleClose2,
  onRefund,
  refundBtn
}) => {
    const [refundAmount, setRefundAmount] = useState("119.99");
    const [reason, setReason] = useState("");
    const [customReason, setCustomReason] = useState("");
    const [errors, setErrors] = useState({});
  
    const handleReasonChange = (e) => {
      setReason(e.target.value);
      if (e.target.value !== "other") {
        setCustomReason(""); // Reset custom reason if another option is selected
      }
    };


    const validateForm = () => {
        let newErrors = {};
    
        if (!reason) {
          newErrors.reason = "Please select a reason";
        }
        if (reason === "other" && !customReason.trim()) {
          newErrors.customReason = "Specify reason is required";
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Returns true if no errors
      };
    
      const handleSubmit = () => {
        if (validateForm()) {
          onRefund(reason,customReason);
        }
      };

  return (
    <React.Fragment>
      <Modal
        centered
        show={show2}
        onHide={handleClose2}
        className="modal-custom benddetailsmodal"
      >
        <Modal.Body>
         <h2 className="mb-3 text-center custom_h2">Refund Order</h2>
          <div className="flex-column flex-md-row d-flex flex-wrap flex-md-nowrap">
            <div className="bend-content text-center text-md-start mt-3 mt-md-0 ps-0 ps-md-4">
              <div className="bend-quantity mb-3">
                <p className="mb-0 me-4">
                Refunds take 5-10 days to appear on a customer's statement. Stripe's fees for the original payment won't be returned, but there are no additional fees for the refund. <a href="https://support.stripe.com/questions/understanding-fees-for-refunded-payments" target="_blank">Learn more</a>.     
                </p>
                
              </div>
            </div>
             </div> 
             <Form>
      <Form.Group className="mb-3">
        <Form.Label>Refund</Form.Label>
        <div className="d-flex">
          <Form.Control type="text" value={refundAmount} readOnly={true} />
          <span className="input-group-text">USD</span>
        </div>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Reason</Form.Label>
        <Form.Select
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          isInvalid={!!errors.reason}
        >
          <option value="">Select a reason</option>
          <option value="Duplicate">Duplicate</option>
          <option value="Fraudulent">Fraudulent Error</option>
          <option value="Requested by customer">Requested by customer</option>
          <option value="other">Other</option>
        </Form.Select>
        {errors.reason && <Form.Control.Feedback type="invalid">{errors.reason}</Form.Control.Feedback>}
      </Form.Group>

      {reason === "other" && (
        <Form.Group className="mb-3">
          <Form.Label>Specify Reason</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your reason"
            value={customReason}
            onChange={(e) => setCustomReason(e.target.value)}
            isInvalid={!!errors.customReason}
          />
          {errors.customReason && <Form.Control.Feedback type="invalid">{errors.customReason}</Form.Control.Feedback>}
        </Form.Group>
      )}

      <div className="text-center mt-3">
        <Button className="btn-primary" onClick={handleSubmit}>
            
          Done
        </Button>
        <button className="btn-outline-primary ms-3" onClick={handleClose2}>
              Cancel
            </button>
      </div>
    </Form>
   
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default RefundOrder;
