import React, { useEffect, useState, useRef } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import { Icon } from "@iconify/react";

const QuantitySelector = ({
  quantity,
  onIncrement,
  onDecrement,
  onQuantityChange,
}) => {
  const [inputQuantity, setInputQuantity] = useState(quantity);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);
  
  useEffect(() => {
    if (!isEditing) {
      setInputQuantity(quantity);
    }
  }, [quantity, isEditing]);

  const handleInputChange = (e) => {
    const newQuantity = e.target.value;
    setInputQuantity(newQuantity);
    setIsEditing(true);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
    const newQuantity = parseInt(inputQuantity) || 1;
    const finalQuantity = newQuantity < 1 ? 1 : newQuantity;
    setInputQuantity(finalQuantity);
    onQuantityChange(finalQuantity);
  };

  const handleInputFocus = () => {
    setIsEditing(true);
  };

  const handleIncrement = () => {
    const currentQty = parseInt(inputQuantity) || 1;
    const newQty = currentQty + 1;
    setInputQuantity(newQty);
    setIsEditing(false);
    onQuantityChange(newQty);
  };

  const handleDecrement = () => {
    const currentQty = parseInt(inputQuantity) || 1;
    if (currentQty > 1) {
      const newQty = currentQty - 1;
      setInputQuantity(newQty);
      setIsEditing(false);
      onQuantityChange(newQty);
    }
  };

  // Restore focus after re-render if user was editing
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      // Restore cursor position to end of input
      const length = inputRef.current.value.length;
      inputRef.current.setSelectionRange(length, length);
    }
  }, [isEditing]);

  return (
    <div className="d-flex">
      <b className="mt-1">Qty.&nbsp;</b> 
      <InputGroup>
        <Button variant={null} onClick={handleDecrement}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
		<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14" />
	</svg>
        </Button>
        <FormControl
          ref={inputRef}
          value={inputQuantity}
          style={{ textAlign: "center" }}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onFocus={handleInputFocus}
          min={1}
        />
        <Button variant={null} onClick={handleIncrement}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
          <path fill="currentColor" d="M18 12.998h-5v5a1 1 0 0 1-2 0v-5H6a1 1 0 0 1 0-2h5v-5a1 1 0 0 1 2 0v5h5a1 1 0 0 1 0 2" />
        </svg>
        </Button>
      </InputGroup>
    </div>
  );
};

export default QuantitySelector;
