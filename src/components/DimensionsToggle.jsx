import React, { useState } from "react";
import Switch from "react-switch";

const DimensionsToggle = ({ dimensions }) => {
  const [isInches, setIsInches] = useState(true);

  // Conversion factor: 1 inch = 25.4 mm
  const inchesToMm = (inches) => (inches * 25.4).toFixed(2);

  const handleToggle = () => {
    setIsInches(!isInches);
  };

  return (
    <div>
      <div>
        H :{" "}
        {isInches
          ? `${dimensions.height} in`
          : `${inchesToMm(dimensions.height)} mm`}{" "}
        x W :{" "}
        {isInches
          ? `${dimensions.width} in`
          : `${inchesToMm(dimensions.width)} mm`}
      </div>
      <label htmlFor="toggleSwitch" style={{ marginRight: "10px" }}>
        Convert to {isInches ? "Millimeters (mm)" : "Inches (in)"}
      </label>
      <Switch
        checked={isInches}
        onChange={handleToggle}
        onColor="#00d084"
        offColor="#888"
        uncheckedIcon={false}
        checkedIcon={false}
        height={20}
        width={48}
      />
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
