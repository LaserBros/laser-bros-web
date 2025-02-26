import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Select,
  Row,
  Col,
  Image,
  Form,
  Tabs,
  Tab,
  Accordion,
  Table,
} from "react-bootstrap";
import { Icon } from "@iconify/react";
import barcode from "../../assets/img/barcode.jpg";
import { Link, useNavigate, useParams } from "react-router-dom";
import file from "../../assets/img/file1.jpg";
import attachment from "../../assets/img/attachment.svg";
import AddNote from "../../components/AddNote";
import MultiSelect from "react-select";
import {
  AdmingetThickness,
  discount,
  getFinishAdmin,
  getFinishingFilter,
  getMaterialsAndThickness,
  getParticularThickness,
  updateThicknessDetails,
} from "../../../api/empApi";
import Amount from "../../../components/Amount";
import { toast } from "react-toastify";
const customStyles = {
  menu: (provided) => ({
    ...provided,
    maxHeight: "250px", // Maximum visible height
    overflowY: "auto", // Enable vertical scrolling
    zIndex: 9999, // Ensure the dropdown appears above other elements
  }),
  menuList: (provided) => ({
    ...provided,
    maxHeight: "250px", // Limit height for dropdown content
    overflowY: "auto", // Enable scroll inside the dropdown
    padding: 0, // Remove extra padding
  }),
};

const options = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
];
const EditMaterial = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange2 = (selected) => {
    setSelectedOptions(selected);
  };
  const { id } = useParams();
  const [material, setMaterial] = useState({
    material_name: "",
    material_grade: "",
    material_code: "",
    material_density: "",
    price: "",
    cutting_speed: "",
    cutting_cost: "",
    material_markup: "",
    pierce_price: "",
    finishing_options: [],
    estimated_lead_time: "",
    rfq_dimension_shift: "",
    rfq_weight_shift: "",
    stocked: "yes",
    bending: "yes",
  });

  const [errors, setErrors] = useState({
    material_code: "",
    material_density: "",
    price: "",
    cutting_speed: "",
    cutting_cost: "",
    material_markup: "",
    pierce_price: "",
  });

  const validate = () => {
    let valid = true;
    let errors = {};

    // Check if fields are filled correctly
    if (!material.material_code) {
      errors.material_code = "Material code is required";
      valid = false;
    }
    if (!material.material_density || material.material_density <= 0) {
      errors.material_density = "Material density must be greater than 0";
      valid = false;
    }
    if (!material.price || material.price <= 0) {
      errors.price = "Price must be greater than 0";
      valid = false;
    }
    if (!material.cutting_speed || material.cutting_speed <= 0) {
      errors.cutting_speed = "Cutting speed must be greater than 0";
      valid = false;
    }
    if (!material.cutting_cost || material.cutting_cost <= 0) {
      errors.cutting_cost = "Cutting cost must be greater than 0";
      valid = false;
    }
    if (!material.material_markup || material.material_markup <= 0) {
      errors.material_markup = "Material markup must be greater than 0";
      valid = false;
    }
    if (!material.pierce_price || material.pierce_price <= 0) {
      errors.pierce_price = "Pierce price must be greater than 0";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const fetchThickness = async () => {
    const data = {
      id: id,
    };
    const res = await getParticularThickness(data);
    console.log("fddfdfdf", res.data);
    setMaterial((prevMaterial) => ({
      ...res.data,
      id: res.data._id,
    }));

    setSelectedOption(res.data.material_thickness);
    getThickness(res.data.material_id);
    setLoading(false);
  };
  const [dropdownOptions, setDropdownOptions] = useState([]);

  const getThickness = async (id) => {
    const data = {
      id: id,
    };
    const getThickness = await AdmingetThickness(data);
    setDropdownOptions(getThickness.data);
  };

  const handleChangeFinish = (selectedOptions, field) => {
    if (field === "finishing_options") {
      // Check if selectedOptions is null
      const options = selectedOptions
        ? selectedOptions.map((option) => option.value)
        : [];
      setMaterial((prevState) => ({
        ...prevState,
        [field]: options, // Update with the selected option values or an empty array
      }));
    } else {
      // Handle other fields if necessary
    }
  };

  const handleChange = (e, field) => {
    const value = e.target.value;
    if (field === "finishing_options") {
      console.log("value value value value", value);
      const options = getFinishes
        ? getFinishes.map((option) => option.value)
        : [];
      setMaterial((prevState) => ({
        ...prevState,
        [field]: options, // Update with the selected option values or an empty array
      }));
    } else {
      setMaterial((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate before submitting
    if (validate()) {
      try {
        setLoadingBtn(true);
        const res = await updateThicknessDetails(material);
        toast.success("Material updated successfully!");
        setLoadingBtn(false);
      } catch (error) {
        toast.error("Something wents wrong!");
      }

      // Handle form submission logic here (API call, etc.)
    }
  };

  const handleDropdownChange = (e) => {
    const selectedValue = e.target.value;
    console.log(selectedValue, "sdsdsdsdsd-0--0");
    setSelectedOption(selectedValue);
    const selectedMaterial = dropdownOptions.find(
      (material) => material.material_thickness === selectedValue
    );
    console.log(
      "selectedMaterial =-=-=- selectedMaterial",
      selectedMaterial?.material_code
    );
    setMaterial((prevMaterial) => ({
      ...prevMaterial,
      material_id: selectedMaterial.material_id,
      material_thickness: selectedMaterial.material_thickness,
      material_code: selectedMaterial.material_code,
      finishing_options: selectedMaterial.finishing_options,
    }));
  };
  const [getFinishes, setgetFinishes] = useState([]);
  const getFinish = async () => {
    const res = await getFinishAdmin();
    const transformedOptions = res.data.map((finish) => ({
      value: finish.finishing_code,
      label: "F" + finish.finishing_code,
    }));
    console.log("transformedOptions",transformedOptions,"res.data",res.data)
    setgetFinishes(transformedOptions);
  };
  useEffect(() => {
    const initialize = async () => {
      await fetchThickness();
      //   setTimeout(() => {
      //     // if (material?.material?._id) {

      //     // }
      //   }, 5000);
      getFinish();
    };
    initialize();
  }, []);

  if (loading)
    return (
      <p className="text-center">
        {" "}
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
      </p>
    );
  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <Table bordered responsive className="editmaterialtable">
          <tbody>
            <tr>
              <td>Grade</td>
              <td>
                <input
                  type="text"
                  value={
                    material?.material.material_name +
                    " " +
                    material?.material.material_grade
                  }
                  readOnly
                  className="form-control"
                />
              </td>
            </tr>
            <tr>
              <td>Thickness</td>
              <td>
                <select
                  id="materialDropdown"
                  value={selectedOption}
                  onChange={handleDropdownChange}
                  className="form-control"
                >
                  <option value="">Select an Option</option>
                  {dropdownOptions.map((option) => (
                    <option
                      key={option.material_thickness}
                      value={option.material_thickness}
                    >
                      {option.material_thickness}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td>Stocked?</td>
              <td>
                <select
                  value={material.stocked}
                  onChange={(e) => handleChange(e, "stocked")}
                  className="form-control"
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Bending?</td>
              <td>
                <select
                  value={material.bending}
                  onChange={(e) => handleChange(e, "bending")}
                  className="form-control"
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Material Code</td>
              <td>
                <input
                  type="text"
                  value={material.material_code}
                  onChange={(e) => handleChange(e, "material_code")}
                  className={`form-control ${
                    errors.material_code ? "is-invalid" : ""
                  }`}
                />
                {errors.material_code && (
                  <div className="invalid-feedback">{errors.material_code}</div>
                )}
              </td>
            </tr>
            <tr>
              <td>Material Density</td>
              <td>
                <input
                  type="number"
                  value={material.material_density}
                  onChange={(e) => handleChange(e, "material_density")}
                  className={`form-control ${
                    errors.material_density ? "is-invalid" : ""
                  }`}
                />
                {errors.material_density && (
                  <div className="invalid-feedback">
                    {errors.material_density}
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <td>Price per Pound $</td>
              <td>
                <input
                  type="number"
                  value={material.price}
                  onChange={(e) => handleChange(e, "price")}
                  className={`form-control ${errors.price ? "is-invalid" : ""}`}
                />
                {errors.price && (
                  <div className="invalid-feedback">{errors.price}</div>
                )}
              </td>
            </tr>
            <tr>
              <td>Cutting Speed (inches per minute)</td>
              <td>
                <input
                  type="number"
                  value={material.cutting_speed}
                  onChange={(e) => handleChange(e, "cutting_speed")}
                  className={`form-control ${
                    errors.cutting_speed ? "is-invalid" : ""
                  }`}
                />
                {errors.cutting_speed && (
                  <div className="invalid-feedback">{errors.cutting_speed}</div>
                )}
              </td>
            </tr>
            <tr>
              <td>Cutting Cost Per Minute $</td>
              <td>
                <input
                  type="number"
                  value={material.cutting_cost}
                  onChange={(e) => handleChange(e, "cutting_cost")}
                  className={`form-control ${
                    errors.cutting_cost ? "is-invalid" : ""
                  }`}
                />
                {errors.cutting_cost && (
                  <div className="invalid-feedback">{errors.cutting_cost}</div>
                )}
              </td>
            </tr>
            <tr>
              <td>Material Markup %</td>
              <td>
                <input
                  type="number"
                  value={material.material_markup}
                  onChange={(e) => handleChange(e, "material_markup")}
                  className={`form-control ${
                    errors.material_markup ? "is-invalid" : ""
                  }`}
                />
                {errors.material_markup && (
                  <div className="invalid-feedback">
                    {errors.material_markup}
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <td>Price Per Pierce</td>
              <td>
                <input
                  type="number"
                  value={material.pierce_price}
                  onChange={(e) => handleChange(e, "pierce_price")}
                  className={`form-control ${
                    errors.pierce_price ? "is-invalid" : ""
                  }`}
                />
                {errors.pierce_price && (
                  <div className="invalid-feedback">{errors.pierce_price}</div>
                )}
              </td>
            </tr>
            <tr>
              <td>Finishing Options</td>
              <td>
                
                <MultiSelect
  isMulti
  name="frameworks"
  options={getFinishes} // Ensure this contains the { value: 55, label: "F55" }
  value={getFinishes.filter((option) =>
    material.finishing_options.includes(option.value)
  )} // Filters selected options based on finishing_options
  onChange={(selectedOptions) =>
    handleChangeFinish(selectedOptions, "finishing_options")
  }
  styles={customStyles} // Apply any custom styling you have defined
  placeholder="Select"
/>
                {/* <select
                  className="form-control selectpicker"
                  multiple
                  value={material.finishing_options}
                  onChange={(e) => handleChange(e, "finishing_options")}
                >
                  {getFinishes.map((option) => (
                    <option
                      key={option.finishing_code}
                      value={option.finishing_code}
                    >
                      F{option.finishing_code}
                    </option>
                  ))}
                </select> */}
              </td>
            </tr>
            <tr>
              <td>Estimated Lead Time</td>
              <td>
                <input
                  type="text"
                  value={material.estimated_lead_time}
                  onChange={(e) => handleChange(e, "estimated_lead_time")}
                  className="form-control"
                />
              </td>
            </tr>
            <tr>
              <td>RFQ Dimension Shift</td>
              <td>
                <input
                  type="number"
                  value={material.rfq_dimension_shift}
                  onChange={(e) => handleChange(e, "rfq_dimension_shift")}
                  className="form-control"
                />
              </td>
            </tr>
            <tr>
              <td>RFQ Weight Shift</td>
              <td>
                <input
                  type="number"
                  value={material.rfq_weight_shift}
                  onChange={(e) => handleChange(e, "rfq_weight_shift")}
                  className="form-control"
                />
              </td>
            </tr>
          </tbody>
        </Table>
        <button type="submit" className="btn btn-primary">
          {loadingBtn ? (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          ) : (
            "Save Changes"
          )}
        </button>
      </form>
    </React.Fragment>
  );
};

export default EditMaterial;
