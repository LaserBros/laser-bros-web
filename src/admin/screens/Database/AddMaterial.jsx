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
    AddMaterialAdmin,
  AdmingetThickness,
  discount,
  getFinishAdmin,
  getFinishingFilter,
  getMaterialsAndThickness,
  getParticularThickness,
  updateThicknessDetails,
} from "../../../api/api";
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
const AddMaterial = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange2 = (selected) => {
    setSelectedOptions(selected);
  };
  const { id } = useParams();
  const [material, setMaterial] = useState({
    material_name: "",
    material_grade: "",
    customer_visible:1,
    bending: "yes",
  });

  const [errors, setErrors] = useState({
    material_grade:"",
    material_name: "",
  });

  const validate = () => {
    let valid = true;
    let errors = {};

    // Check if fields are filled correctly
    if (!material.material_grade) {
      errors.material_grade = "Material grade is required";
      valid = false;
    }
    if (!material.material_name) {
        errors.material_name = "Material name is required";
        valid = false;
      }
   
    setErrors(errors);
    return valid;
  };
  const [loading, setLoading] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const [dropdownOptions, setDropdownOptions] = useState([]);

 

  

  const handleChange = (e, field) => {
    const value = e.target.value;
    if (field === "finishing_options") {
      // console.log("value value value value", value);
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
        const res = await AddMaterialAdmin(material);
        toast.success("Material added successfully!");
        setLoadingBtn(false);
      } catch (error) {
        toast.error("Something wents wrong!");
      }

      // Handle form submission logic here (API call, etc.)
    }
  };

  const handleDropdownChange = (e) => {
    const selectedValue = e.target.value;
    // console.log(selectedValue, "sdsdsdsdsd-0--0");
    setSelectedOption(selectedValue);
    const selectedMaterial = dropdownOptions.find(
      (material) => material.material_thickness === selectedValue
    );
    // console.log(
      // "selectedMaterial =-=-=- selectedMaterial",
      // selectedMaterial?.material_code
    // );
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
    // console.log("transformedOptions",transformedOptions,"res.data",res.data)
    setgetFinishes(transformedOptions);
  };
  useEffect(() => {
    const initialize = async () => {
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
              <td>Material Name</td>
              <td>
              <input
                  type="text"
                  onChange={(e) => handleChange(e, "material_name")}
                  className={`form-control ${
                    errors.material_name ? "is-invalid" : ""
                  }`}
                  placeholder="Steel"
                />
                {errors.material_name && (
                  <div className="invalid-feedback">{errors.material_name}</div>
                )}
              </td>
            </tr>
            <tr>
              <td>Material Grade</td>
              <td>
                <input
                  type="text"
                  onChange={(e) => handleChange(e, "material_grade")}
                  className={`form-control ${
                    errors.material_grade ? "is-invalid" : ""
                  }`}
                  placeholder="1008"
                />
                {errors.material_grade && (
                  <div className="invalid-feedback">{errors.material_grade}</div>
                )}
              </td>
            </tr>
            <tr>
              <td>Customer Visible</td>
              <td>
              <select
                  className="form-control form-select"
                  onChange={(e) => handleChange(e, "customer_visible")}
                >
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>
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

export default AddMaterial;
