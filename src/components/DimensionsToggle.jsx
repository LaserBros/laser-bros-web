import React, { useEffect, useState } from "react";
import Switch from "react-switch";
import { updateDimensionType } from "../api/api";

const DimensionsToggle = ({ dimensions, id, type, isEdit }) => {
  const [isInches, setIsInches] = useState(true);

  // Conversion factor: 1 inch = 25.4 mm
  const inchesToMm = (mm) => (mm * 25.4).toFixed(2);

  const handleToggle = () => {
    setIsInches(!isInches);
  };

  const [isChecked, setIsChecked] = useState(false);
  useEffect(() => {
    setIsChecked(type == 1 ? true : false);
    console.log("typetypetypetypetype", type);
  }, [type]);
  // Function to handle checkbox change
  const handleCheckboxChange = async (event) => {
    setIsChecked(event.target.checked);
    try {
      const data = {
        id: id,
        dimension_type: event.target.checked ? 1 : 0,
      };
      const res = await updateDimensionType(data);
      console.log("updateDimensionType", res.data);
    } catch (error) {}
  };

  return (
    <div className="toggle-switch-container mt-2">
      <div>
        <p>
          Height :
          {isChecked
            ? `${dimensions.height} in`
            : `${inchesToMm(dimensions.height)} mm`}{" "}
        </p>
        <p>
          Width :{" "}
          {isChecked
            ? `${dimensions.width} in`
            : `${inchesToMm(dimensions.width)} mm`}
        </p>
        {isEdit && (
          <p className="d-flex align-items-center">
            Units:
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
