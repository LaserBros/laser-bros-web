import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const MultiSelectModal = ({
  selectedArea,
  show,
  id,
  onClose,
  options,
  onSave,
}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  useEffect(() => {
    if (Array.isArray(selectedArea) && selectedArea.length > 0) {
      setSelectedOptions(selectedArea);
    }
  }, [show]);
  const handleSelect = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleSave = () => {
    onSave(selectedOptions, id);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Select Options</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="ModalPostOPS_check">
          {options.map((option, index) => (
            <Form.Check
              key={index}
              type="checkbox"
              label={option}
              id={option}
              value={option}
              checked={selectedOptions.includes(option)}
              onChange={() => handleSelect(option)}
            />
          ))}
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-primary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MultiSelectModal;
