import React, { useEffect, useState } from "react";
import Switch from "react-switch";

const DimensionsToggle = ({ dimensions, id, type, isEdit, APIDimension }) => {
  const [isInches, setIsInches] = useState(true);

  const inchesToMm = (mm) => mm;
  const handleToggle = () => {
    setIsInches(!isInches);
  };

  const [isChecked, setIsChecked] = useState(false);
  useEffect(() => {
    setIsChecked(type == 1 ? true : false);
  }, [type]);
  // Function to handle checkbox change
  const handleCheckboxChange = async (event) => {
    setIsChecked(event.target.checked);
    APIDimension(event.target.checked, id);
  };

  return (
    <div className="toggle-switch-container mt-2">
      <div>
        <p>
          Height :
          {isChecked
            ? `${parseFloat(dimensions.height).toFixed(2)} in`
            : `${inchesToMm(parseFloat(dimensions.height).toFixed(2))} mm`}{" "}
        </p>
        <p>
          Width :{" "}
          {isChecked
            ? `${parseFloat(dimensions.width).toFixed(2)} in`
            : `${inchesToMm(parseFloat(dimensions.width).toFixed(2))} mm`}
        </p>
        {isEdit && (
          <p className="d-flex align-items-center">
            Change Units:
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
          </p>
        )}
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
