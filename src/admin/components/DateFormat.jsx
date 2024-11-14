import React from "react";

const DateFormat = ({ dateString }) => {
  if (!dateString) return null; // Handle undefined or null date strings

  const date = new Date(dateString);

  // Format the date as MM/DD/YYYY
  const formattedDate = `${String(date.getDate()).padStart(2, "0")}/${String(
    date.getMonth() + 1
  ).padStart(2, "0")}/${date.getFullYear()}`;

  return <span>{formattedDate}</span>;
};

export default DateFormat;
