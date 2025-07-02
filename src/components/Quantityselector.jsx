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
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
		<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14" />
	</svg>
        </Button>
        <FormControl
          value={inputQuantity}
          style={{ textAlign: "center" }}
          onChange={handleInputChange}
          min={1}
        />
        <Button variant={null} onClick={onIncrement}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
          <path fill="currentColor" d="M18 12.998h-5v5a1 1 0 0 1-2 0v-5H6a1 1 0 0 1 0-2h5v-5a1 1 0 0 1 2 0v5h5a1 1 0 0 1 0 2" />
        </svg>
        </Button>
      </InputGroup>
    </div>
  );
};
export default QuantitySelector;
