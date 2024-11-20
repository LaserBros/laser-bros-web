import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const MaterialBadge = ({ materialDetails }) => {
  const getMaterialColor = (materials) => {
    // console.log("materials", materials);
    switch (materials) {
      case "Aluminium 5052":
        return {
          backgroundColor: "rgb(79 140 202)",
        };
      case "Steel 1008":
        return {
          backgroundColor: "rgb(225 31 38)",
        };
      case "Steel A36":
        return {
          backgroundColor: "rgb(225 31 38)",
        };
      case "Aluminium 6061":
        return {
          backgroundColor: "rgb(160 197 233)",
        };
      case "Stainless Steel 304 (2b)":
        return {
          backgroundColor: "rgb(42 92 23)",
        };
      case "Stainless Steel 304 (#4)":
        return {
          backgroundColor: "rgb(42 92 23)",
        };
      case "Stainless Steel 316 (2b)":
        return {
          backgroundColor: "rgb(42 92 23)",
        };
      case "Brass 260":
        return {
          backgroundColor: "rgb(255 186 22)",
        };
      case "Custom i.e. Titanium, Incolnel, etc.":
        return {
          backgroundColor: "rgb(115 103 240)",
        };
      default:
        return {};
    }
  };
  const [showModal, setShowModal] = useState(false);

  // Show modal
  const handleShowModal = () => setShowModal(true);
  // Hide modal
  const handleCloseModal = () => setShowModal(false);

  // Determine the number of items to show initially
  const MAX_VISIBLE_ITEMS = 2;
  const details = materialDetails ?? [];
  const isMoreThanTwo = details.length > MAX_VISIBLE_ITEMS;
  const visibleItems = details.slice(0, MAX_VISIBLE_ITEMS);
  const remainingItemsCount = details.length - MAX_VISIBLE_ITEMS;

  return (
    <>
      {/* Render the first two items */}
      {visibleItems.map((item, index) => (
        <span
          className="badgestatus me-2"
          style={getMaterialColor(
            `${item?.material_name ?? ""} ${item?.material_grade ?? ""}`
          )}
        >
          {item?.material_code ?? ""}
        </span>
      ))}

      {/* Show the "+N" badge if there are more than two items */}
      {isMoreThanTwo && (
        <span
          className="badgestatus more-badge"
          style={{ cursor: "pointer", backgroundColor: "#ccc", color: "#000" }}
          onClick={handleShowModal}
        >
          +{remainingItemsCount}
        </span>
      )}

      {/* Modal for showing all badges */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        className="modal-custom max-width-574"
      >
        <Modal.Header closeButton className="border-0 text-center pt-4">
          <Modal.Title>All Material Tags</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {materialDetails.map((item, index) => (
            <span
              className="badgestatus-more mt-1 me-2"
              style={getMaterialColor(
                `${item?.material_name ?? ""} ${item?.material_grade ?? ""}`
              )}
            >
              {item?.material_code ?? ""}
            </span>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MaterialBadge;
