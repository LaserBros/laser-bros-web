import React from "react";

const Amount = ({ amount }) => {
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  return <span>{formattedAmount}</span>;
};

export default Amount;
