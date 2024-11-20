import React, { useEffect, useState } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import { Icon } from "@iconify/react";
const QuantitySelector = ({
  quantity,
  onIncrement,
  onDecrement,
  onQuantityChange,
}) => {
  useEffect(() => {
    setInputQuantity(quantity);
  }, [quantity]);
  const [inputQuantity, setInputQuantity] = useState(quantity);
  const handleInputChange = (e) => {
    const newQuantity = e.target.value;
    if (newQuantity < 1) {
      setInputQuantity(1); // Set to minimum of 1 if invalid
      onQuantityChange(1); // Call the API with minimum quantity
    } else {
      setInputQuantity(newQuantity);
      onQuantityChange(newQuantity); // Call the API with the new quantity
    }
  };
  return (
    <div className="d-flex">
      <b className="mt-1">Qty.&nbsp;</b>
      <InputGroup>
        <Button variant={null} onClick={onDecrement}>
          <Icon icon="majesticons:minus-line" />
        </Button>
        <FormControl
          value={inputQuantity}
          style={{ textAlign: "center" }}
          onChange={handleInputChange}
          min={1}
        />
        <Button variant={null} onClick={onIncrement}>
          <Icon icon="ic:round-plus" />
        </Button>
      </InputGroup>
    </div>
  );
};
export default QuantitySelector;
