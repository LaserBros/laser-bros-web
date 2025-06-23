import React, { useState } from "react";
import { Form, Row, Col, Button, Modal } from "react-bootstrap";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import { addCard, setCardAsDefault } from "../api/api";
import { toast } from "react-toastify";
import { useTheme } from "./Themecontext";

// Your Stripe public key
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const AddCardForm = ({ 
  show,
  handleClose,
  title,
  onCardAdded,
  isSetDefault,
  clickByUser,
  onselectDefault,
  onSelectCard
}) => {
  const { theme, togglenewTheme } = useTheme();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [cardHolderName, setCardHolderName] = useState("");
  const [nameError, setNameError] = useState(null);
  const [generalError, setGeneralError] = useState(null);
  const [saveCard, setSaveCard] = useState(onselectDefault);

  const validateName = (name) => {
    if (!name.trim()) {
      return "Card holder name is required.";
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
      return "Card holder name must only contain letters and spaces.";
    }
    return null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setGeneralError(null);

    // Validate cardholder name
    const nameValidationError = validateName(cardHolderName);
    if (nameValidationError) {
      setNameError(nameValidationError);
      return;
    }
    setNameError(null);

    if (!stripe || !elements) {
      return;
    }

    // Create token
    const { token, error } = await stripe.createToken(
      elements.getElement(CardElement),
      {
        name: cardHolderName,
      }
    );
    // // console.log(token);
    // return;
    if (error) {
      setGeneralError(error.message);
    } else {
      const formData = {
        last4: token.card.last4,
        exp_month: token.card.exp_month,
        exp_year: token.card.exp_year,
        full_name: cardHolderName,
        card_id: saveCard ? token.card.id : token.id,
        card_token: token.id,
      };

      // console.log("Save card for future orders:", saveCard,formData);
      setLoading(true); 
      if(saveCard) {

        try {
          const res = await addCard(formData);
          if (isSetDefault) {
            await setCardAsDefault(res.data._id);
          }
          toast.success("Card added successfully!");
          setLoading(false);
          setCardHolderName("");
          handleClose();
        } catch (error) {
          setLoading(false);
          toast.error("Error setting address as default:", error);
        }
        setGeneralError(null);
        setLoading(false); 
        onCardAdded();
        handleClose();
      }
      else {
        setLoading(false);
        onSelectCard(formData)
        setGeneralError(null);
        handleClose();
      }
    } 
      
  };

  return (
    <React.Fragment>
      <Modal
        centered
        show={show}
        onHide={handleClose}
        className="modal-custom max-width-574"
      >
        <Modal.Header closeButton className="border-0 text-center pt-4">
          <Modal.Title className="mx-auto">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-lg-5 px-4 pb-4">
          <Form onSubmit={handleSubmit} className="accountform">
            <Row>
              <Col md={12}>
                <Form.Group className="mb-3 form-group">
                  <Form.Label>Card Holder Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    value={cardHolderName}
                    onChange={(e) => setCardHolderName(e.target.value)}
                    required
                    isInvalid={!!nameError}
                  />
                  {nameError && (
                    <Form.Control.Feedback type="invalid">
                      {nameError}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group className="mb-3 form-group">
                  <Form.Label>Card Details</Form.Label>
                  <div className="paymentCard_border">
                    <CardElement
                      options={{
                        style: {
                          base: {
                            color: theme == "darks" ? "#fff" : "#000",
                            "::placeholder": {
                              color:
                                theme === "darks"
                                  ? "#bfbfbf"
                                  : "rgba(0,0,0,0.5)", // adjust color as needed
                            },
                            fontSize: "16px",
                          },
                        },
                      }}
                    />
                  </div>
                </Form.Group>
              </Col>
              {clickByUser &&
              <Col md={12}>
                <Form.Check
                  type="checkbox"
                  id="saveCardCheckbox"
                  label="Save card for future orders"
                  checked={saveCard}
                  onChange={(e) => setSaveCard(e.target.checked)}
                />
                {/* <label htmlFor="saveCardCheckbox">
                  Save card for future orders
                </label> */}
              </Col>
              }
            </Row>
            {generalError && <div style={{ color: "red" }}>{generalError}</div>}
            <div className="text-center mt-3">
              <Button
                type="button"
                value="Cancel"
                onClick={handleClose}
                className="btn-lt-primary min-width-159 mx-2 mb-2"
                variant={null}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                value="Save"
                className="btn-primary min-width-159 mx-2 mb-2"
                variant={null}
                disabled={loading}
              >
                {loading ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

const AddCard = (props) => (
  <Elements stripe={stripePromise}>
    <AddCardForm {...props} />
  </Elements>
);

export default AddCard;
