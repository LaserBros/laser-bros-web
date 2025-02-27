import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Form,
  Button,
} from "react-bootstrap";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { empSignup, getEmpDetails, updateEmpDetails } from "../../../api/api";

const AddEmp = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [cname, setCName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [selectedPermissions, setSelectedPermissions] = useState({
    dashboard_permission: 0,
    quotes_permission: 0,
    rfq_permission: 0,
    orders_permission: 0,
    queue_permission: 0,
    archive_permission: 0,
    shipping_order_permission: 0,
    complete_order_permission: 0,
    customer_permission: 0,
    payment_permission: 0,
    database_permission: 0,
  });

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      fetchEmployeeDetails(id);
    }
  }, [id]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const fetchEmployeeDetails = async (empId) => {
    try {
      const data = {
        id: empId,
      };
      const response = await getEmpDetails(data);
      const empData = response.data;

      setName(empData.full_name);
      setCName(empData.company_name);
      setEmail(empData.email);
      setPhone(empData.phone_number);

      // Merge fetched permissions with default permissions
      setSelectedPermissions((prev) => ({
        ...prev,
        ...(empData.employee_permissions || {}),
      }));
    } catch (error) {
      toast.error("Error fetching employee details");
    }
  };

  const handleCheckboxChange = (key) => {
    setSelectedPermissions((prev) => ({
      ...prev,
      [key]: prev[key] === 1 ? 0 : 1,
    }));
  };

  const permissionsList = [
    { key: "dashboard_permission", label: "Dashboard" },
    { key: "quotes_permission", label: "Quotes" },
    { key: "rfq_permission", label: "RFQ’s" },
    { key: "orders_permission", label: "Orders" },
    { key: "queue_permission", label: "Queue" },
    { key: "archive_permission", label: "Archive" },
    { key: "shipping_order_permission", label: "Shipping Orders" },
    { key: "complete_order_permission", label: "Complete Orders" },
    { key: "customer_permission", label: "Customers" },
    { key: "payment_permission", label: "Payment History" },
    { key: "database_permission", label: "Database" },
  ];

  const validate = () => {
    let errors = {};
    if (!name.trim()) errors.name = "Full name is required";
    if (!cname.trim()) errors.cname = "Company name is required";
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid";
    }
    if (!phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (phone.length < 6 || phone.length > 15) {
      errors.phone = "Phone number must be between 6 to 15 digits";
    }
    if (!password.trim() && !isEditMode)
      errors.password = "Password is required";
    else if (password.trim() !== "") {
      if (password.length < 6 || password.length > 15) {
        errors.password = "Password must be between 6 to 15 digits";
      }
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      const employeeData = {
        full_name: name,
        company_name: cname,
        email: email,
        phone_number: phone,
        ...(password && { password }),
        ...(id && { id }),
        ...selectedPermissions, // Include selected permissions
      };

      try {
        setLoading(true);
        if (isEditMode) {
          await updateEmpDetails(employeeData);
          toast.success("Employee updated successfully");
        } else {
          await empSignup(employeeData);
          toast.success("Employee added successfully");
        }
        setLoading(false);
        navigate("/admin/employes");
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <React.Fragment>
      <Card>
        <CardHeader className="py-4">
          <h5>{isEditMode ? "Edit Employee" : "Add Employee"}</h5>
        </CardHeader>
        <CardBody>
          <Row>
            <Col xl={12} lg={12}>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col lg={6}>
                    <Form.Group className="mb-3 form-group">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      {errors.name && (
                        <div className="text-danger">{errors.name}</div>
                      )}
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group className="mb-3 form-group">
                      <Form.Label>Company Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter company name"
                        value={cname}
                        onChange={(e) => setCName(e.target.value)}
                      />
                      {errors.cname && (
                        <div className="text-danger">{errors.cname}</div>
                      )}
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group className="mb-3 form-group">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {errors.email && (
                        <div className="text-danger">{errors.email}</div>
                      )}
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group className="mb-3 form-group">
                      <Form.Label>Phone No</Form.Label>
                      <Form.Control
                        type="tel"
                        placeholder="Enter phone no"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                      {errors.phone && (
                        <div className="text-danger">{errors.phone}</div>
                      )}
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group className="mb-3 form-group">
                      <Form.Label>Password</Form.Label>
                      <div className="password-input-group position-relative">
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <Icon
                          icon={showPassword ? "lucide:eye-off" : "lucide:eye"}
                          onClick={togglePasswordVisibility}
                          className="password-toggle-icon"
                        />
                      </div>
                      {errors.password && (
                        <div className="text-danger">{errors.password}</div>
                      )}
                    </Form.Group>
                  </Col>
                </Row>

                <table className="table formtable">
                  <thead>
                    <tr>
                      <th width="30%">Permissions</th>
                      <th>Access</th>
                    </tr>
                  </thead>
                  <tbody>
                    {permissionsList.map(({ key, label }) => (
                      <tr key={key}>
                        <td>{label}</td>
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedPermissions[key] === 1}
                            onChange={() => handleCheckboxChange(key)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <Button
                  type="submit"
                  className="btn btn-primary mt-2"
                  disabled={loading}
                >
                  {loading ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : isEditMode ? (
                    "Update Employee"
                  ) : (
                    "Add Employee"
                  )}
                </Button>
              </Form>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default AddEmp;