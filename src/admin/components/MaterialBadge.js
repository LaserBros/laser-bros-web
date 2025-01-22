import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import getMaterialColor from "./ColorCode";

const MaterialBadge = ({ materialDetails }) => {

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const MAX_VISIBLE_ITEMS = 2;

  // Remove duplicates by material_code
  const uniqueDetails = Array.isArray(materialDetails)
    ? materialDetails.filter(
        (item, index, self) =>
          index ===
          self.findIndex((t) => t?.material_code === item?.material_code)
      )
    : [];

  const isMoreThanTwo = uniqueDetails.length > MAX_VISIBLE_ITEMS;
  const visibleItems = uniqueDetails.slice(0, MAX_VISIBLE_ITEMS);
  const remainingItemsCount = uniqueDetails.length - MAX_VISIBLE_ITEMS;

  return (
    <>
      {visibleItems.map(
        (item, index) =>
          item?.material_code && (
            <span
              key={`visible-${index}`} // Add unique key
              className="badgestatus me-2"
              style={getMaterialColor(
                `${item?.material_name ?? ""} ${item?.material_grade ?? ""}`,item?.color_code
              )}
            >
              {item?.material_code ?? ""}
            </span>
          )
      )}

      {isMoreThanTwo && (
        <span
          className="badgestatus more-badge"
          style={{ cursor: "pointer", backgroundColor: "#ccc", color: "#000" }}
          onClick={handleShowModal}
        >
          +{remainingItemsCount}
        </span>
      )}

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        className="modal-custom max-width-574"
      >
        <Modal.Header closeButton className="border-0 text-center pt-4">
          <Modal.Title>All Material Tags</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {uniqueDetails.map(
            (item, index) =>
              item?.material_code && (
                <span
                  key={`modal-${index}`} // Add unique key
                  className="badgestatus-more mt-1 me-2"
                  style={getMaterialColor(
                    `${item?.material_name ?? ""} ${item?.material_grade ?? ""}`,item?.color_code
                  )}
                >
                  {item?.material_code ?? ""}
                </span>
              )
          )}
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
