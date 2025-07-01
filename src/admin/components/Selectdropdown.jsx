import React, { useState } from "react";
import Select from "react-select";

const SelectDropdowns = ({
  options,
  value,
  placeholder,
  onOptionSelect,
  disabled,
  type,
  id,
  loading,
}) => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      height: "34px",
      minHeight: "34px",
      display: "flex",
      fontSize: 12,
      textAlign: "left",
      color: "rgba(0,0,0,0.50)",
      borderColor: "#E6E6E6!important",
      boxShadow: "none",
    }),
    singleValue: (provided, state) => {
      const color = state.data.value;
      return {
        ...provided,
        display: "flex",
        alignItems: "center",
        ":before": {
          content: '""',
          display: "inline-block",
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: color,
          marginRight: "5px",
        },
      };
    },
    indicatorSeparator: () => ({
      display: "none",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: 6,
    }),
    menu: (provided) => ({
      ...provided,
      fontSize: "12px",
    }),
    option: (provided, state) => {
      const color = state.data.value;
      return {
        ...provided,
        display: "flex",
        alignItems: "center",
        ":before": {
          content: '""',
          display: "inline-block",
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: color,
          marginRight: "5px",
        },
      };
    },
  };
  // const ColorSelect = () => {
  //   const [selectedColor, setSelectedColor] = useState(null);

  //   return (
  //     <Select
  //       options={colors}
  //       styles={customStyles}
  //       onChange={setSelectedColor}
  //       value={selectedColor}
  //       placeholder="Select a Finish"
  //       className="selectdropdown"
  //       isSearchable={false}
  //     />
  //   );
  // };
  const SimpleSelect = ({
    options,
    value,
    placeholder,
    disabled,
    onOptionSelect,
    id,
    loading,
  }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleChange = (selectedOption) => {
      setSelectedOption(selectedOption);
      if (onOptionSelect) {
        onOptionSelect(selectedOption, type, id); // Call the passed function
      }
    };

    return (
      <Select
        options={options}
        value={options.find((option) => option.value === value)}
        onChange={handleChange}
        isDisabled={disabled}
        // value={selectedOption}
        placeholder={placeholder}
        className="selectdropdown"
        styles={customStyles}
        isSearchable={false}
        isLoading={loading}
      />
    );
  };
  return (
    // <div className="quotes-dropdown flex-md-row d-flex align-item-center justify-content-md-start justify-content-center">
    <div className="quotes-dropdown">
      <SimpleSelect
        options={options}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onOptionSelect={onOptionSelect}
        type={type}
        id={id}
        loading={loading}
      />
      {/* <SimpleSelect options={thickness} placeholder="Select a Thickness" /> */}
      {/* <ColorSelect /> */}
    </div>
  );
};
export default SelectDropdowns;
