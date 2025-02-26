import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import { Image, Modal, Button, Form } from "react-bootstrap";

const RefundOrder = ({
  show2,
  handleClose2,
  onRefund,
  refundBtn,
  amount,
  RefundloadingLoad,
}) => {
  const [refundAmount, setRefundAmount] = useState(1);
  const [reason, setReason] = useState("");
  const [Refundloading, setLoadingRefund] = useState(false);
  const [customReason, setCustomReason] = useState("");
  const [errors, setErrors] = useState({});
  useEffect(() => {
    setLoadingRefund(RefundloadingLoad);
  },[RefundloadingLoad])
  const handleAmountChange = (e) => {
    let value = Number(e.target.value);
  
    if (value < 1) value = 1;
  
    if (value > amount) {
      value = amount.toFixed(2);
    }
    setRefundAmount(value);
  };
  
  useEffect(() => {
    setRefundAmount(1);
  },[])
  const handleReasonChange = (e) => {
    setReason(e.target.value);
    if (e.target.value !== "other") {
      setCustomReason(""); 
    }
  };
  const validateForm = () => {
    let newErrors = {};
    // if(refundAmount == "" || refundAmount ==)
    if (!reason) {
      newErrors.reason = "Please select a reason";
    }
    if (reason === "other" && !customReason.trim()) {
      newErrors.customReason = "Specify reason is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  
  const handleSubmit = async () => {
    if (validateForm()) {
    setLoadingRefund(true);
    await onRefund("refund",reason, customReason, refundAmount);
    setRefundAmount(1);
    setReason("")
    setLoadingRefund(false);
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
            <div className="refund-content text-center px-3 s">
                <p className="mb-0">
                  Refunds take 5-10 days to appear on a customer's statement.
                  Stripe's fees for the original payment won't be returned, but
                  there are no additional fees for the refund.{" "}
                  <a
                    href="https://support.stripe.com/questions/understanding-fees-for-refunded-payments"
                    target="_blank"
                  >
                    Learn more
                  </a>
                  .
                </p>
            </div>
          </div>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Refund</Form.Label>
              <div className="d-flex gap-2">
              <Form.Control
                type="number"
                onChange={handleAmountChange}
                min="1"
                step="0.01"
                value={refundAmount}
                max={refundAmount}
              />
                <span className="input-group-text orderusd">USD</span>
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Reason</Form.Label>
              <Form.Select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                isInvalid={!!errors.reason}
              >
                <option value="">Select a reason</option>
                <option value="duplicate">Duplicate</option>
                <option value="fraudulent">Fraudulent Error</option>
                <option value="requested_by_customer">
                  Requested by customer
                </option>
                {/* <option value="other">Other</option> */}
              </Form.Select>
              {errors.reason && (
                <Form.Control.Feedback type="invalid">
                  {errors.reason}
                </Form.Control.Feedback>
              )}
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
                {errors.customReason && (
                  <Form.Control.Feedback type="invalid">
                    {errors.customReason}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            )}

            <div className="text-center mt-3">
              <Button
                className="btn-primary mx-2 my-1"
                onClick={handleSubmit}
                disabled={Refundloading}
              >
                {Refundloading ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : (
                  <>
                    <Icon icon="lets-icons:refund-back" />
                    Refund
                  </>
                )}
              </Button>
              <Button
                variant={null}
                onClick={handleClose2}
                className="btn-outline-primary min-width-147 mx-2 my-1"
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default RefundOrder;
