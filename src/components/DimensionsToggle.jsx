import React, { useState } from "react";
import Switch from "react-switch";

const DimensionsToggle = ({ dimensions, id }) => {
  const [isInches, setIsInches] = useState(true);

  // Conversion factor: 1 inch = 25.4 mm
  const inchesToMm = (inches) => (inches * 25.4).toFixed(2);

  const handleToggle = () => {
    setIsInches(!isInches);
  };

  const [isChecked, setIsChecked] = useState(false);

  // Function to handle checkbox change
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div className="toggle-switch-container">
      <div>
        Height :{" "}
        {isChecked
          ? `${dimensions.height} in`
          : `${inchesToMm(dimensions.height)} mm`}{" "}
        Width :{" "}
        {isChecked
          ? `${dimensions.width} in`
          : `${inchesToMm(dimensions.width)} mm`}
      </div>

      <div className="container">
        <div className="toggle-switch">
          <input
            type="checkbox"
            className="checkbox"
            name={id}
            id={id}
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <label className="label" htmlFor={id}>
            <span className="inner" />
            <span className="switch" />
          </label>
        </div>
      </div>
    </div>
  );
};

// Example usage
const quote = {
  dimensions: {
    height: 10,
    width: 20,
  },
};
export default DimensionsToggle;
