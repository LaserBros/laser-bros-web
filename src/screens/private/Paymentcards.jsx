import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col, Button, Image } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import AddCard from "../../components/Addcard";
import { deleteCard, getCard, setCardAsDefault } from "../../api/api"; // Import your API function
import visa from "../../assets/img/visa.png"; // Example image for cards
import ConfirmationModal from "../../components/ConfirmationModal";
import { toast } from "react-toastify";

export default function PaymentCards() {
  const [modalShow, setModalShow] = useState(false);
  const [DeletemodalShow, setDeleteModalShow] = useState(false);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Deleteloading, setDeleteLoading] = useState(false);
  const [cardIdToDelete, setCardIdToDelete] = useState(null);

  const handleCloseModal = (shouldReload = false) => {
    setDeleteModalShow(false);
    if (shouldReload) {
      loadCards();
    }
  };

  const handleCardSetAsDefault = async (cardId) => {
    try {
      await setCardAsDefault(cardId);
      toast.success("Default card changed successfully");
      await loadCards();
    } catch (error) {
      toast.success("Error setting card as default:", error);
    }
  };

  const handleShowModal = (cardId) => {
    setCardIdToDelete(cardId);
    setDeleteModalShow(true);
  };

  const deleteCardHandler = async () => {
    try {
      setDeleteLoading(true);
      if (cardIdToDelete) {
        await deleteCard(cardIdToDelete);
        toast.success("Card deleted successfully");
        await loadCards();
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error card delete");
      }
    } finally {
      setDeleteLoading(false);
      setDeleteModalShow(false);
      setCardIdToDelete(null);
    }
  };

  const handleShow = () => setModalShow(true);
  const handleClose = () => setModalShow(false);

  const loadCards = async () => {
    try {
      setLoading(true);
      const response = await getCard(); // Call your API function
      setCards(response.data); // Assuming the data is in response.data
    } catch (error) {
      console.error("Error fetching cards:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadCards();
  }, []);

  return (
    <React.Fragment>
      <section className="myaccount ptb-50">
        <Container>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center flex-wrap gap-2">
              <h5>Payment Cards</h5>
              <Button
                onClick={handleShow}
                className="btn btn-primary min-width-159"
              >
                Add New
              </Button>
            </Card.Header>
            <Card.Body>
              <Row>
                {cards.length === 0 ? (
                  <Col>
                    <p>No cards found</p>
                  </Col>
                ) : (
                  cards.map((card) => (
                    <Col xl={4} lg={4} md={6} className="mb-4" key={card.id}>
                      <div className="addresses-grid payment-grids">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <Image src={visa} className="img-fluid mb-3" alt="" />
                          {card.is_default === 1 && (
                            <span className="statusdefault">Default</span>
                          )}
                        </div>
                        <p className="mb-2 card-no">
                          **** **** **** {card.last4}
                        </p>

                        <div className="card-actions">
                          <div className="card-info">
                            <strong>Expiry Date</strong> {card.exp_month}/
                            {card.exp_year}
                          </div>
                          <div className="card-info">
                            <strong>Name</strong> {card.full_name.toUpperCase()}
                          </div>
                        </div>
                        <div className="btn-bottom">
                          {card.is_default === 0 && (
                            <Link
                              className="btn-address"
                              onClick={() => handleShowModal(card._id)}
                            >
                              <Icon icon="uiw:delete" />
                            </Link>
                          )}
                          {card.is_default === 0 && (
                            <Link
                              className="btn-set-default"
                              onClick={() => handleCardSetAsDefault(card._id)}
                            >
                              Set as Default
                            </Link>
                          )}
                        </div>
                      </div>
                    </Col>
                  ))
                )}
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </section>
      <AddCard
        show={modalShow}
        handleClose={handleClose}
        onCardAdded={loadCards}
        title="Add Card"
      />

      <ConfirmationModal
        show={DeletemodalShow}
        onHide={handleCloseModal}
        title={"Are you sure?"}
        desc={"You want to delete this address"}
        yesBtnText={"Yes"}
        noBtnText={"No"}
        onConfirm={deleteCardHandler}
        loading={Deleteloading}
        message="Do you want to delete this address?"
      />
    </React.Fragment>
  );
}
