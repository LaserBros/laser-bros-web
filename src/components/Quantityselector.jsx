import React from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import { Icon } from '@iconify/react';
const QuantitySelector = ({ quantity, onIncrement, onDecrement }) => (
  <InputGroup>
    <Button variant={null} onClick={onDecrement}>
    <Icon icon="majesticons:minus-line"/>
    </Button>
    <FormControl
      value={quantity}
      readOnly
      style={{ textAlign: 'center' }}
    />
    <Button variant={null} onClick={onIncrement}>
      <Icon icon="ic:round-plus"/>
    </Button>
  </InputGroup>
);

export default QuantitySelector;
