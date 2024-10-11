import React, { useState } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import { Icon } from "@iconify/react";
const QuantitySelector = ({
  quantity,
  onIncrement,
  onDecrement,
  updateQuantityAPI,
}) => {
  const [inputValue, setInputValue] = useState(quantity);

  const handleInputChange = (e) => {
    const value = e.target.value;
    console.log("Sdsddsd", value);
    if (/^\d*$/.test(value)) {
      setInputValue(value);
      if (value !== "") {
        updateQuantityAPI(parseInt(value));
      }
    }
  };
  return (
    <InputGroup>
      <Button variant={null} onClick={onDecrement}>
        <Icon icon="majesticons:minus-line" />
      </Button>
      <FormControl
        value={inputValue}
        style={{ textAlign: "center" }}
        onChange={handleInputChange}
      />
      <Button variant={null} onClick={onIncrement}>
        <Icon icon="ic:round-plus" />
      </Button>
    </InputGroup>
  );
};

export default QuantitySelector;
