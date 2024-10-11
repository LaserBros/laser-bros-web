import React, { useState } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import { Icon } from "@iconify/react";
const Amount = ({ amount }) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD", // Change to your desired currency
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export default Amount;
