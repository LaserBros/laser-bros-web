import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { Form, Row, Col, Button, Modal } from "react-bootstrap";
import { updatepassword } from "../api/api";
import { toast } from "react-toastify";
// import { Eye, EyeSlash } from "react-bootstrap-icons"; // Assuming you're using react-bootstrap-icons

const ChangePassword = ({ show, handleClose, title }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const resetForm = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setErrors({});
  };
  const handleModalClose = () => {
    resetForm();
    handleClose();
  };
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const isStrongPassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    // Allow a wider range of special characters
    const hasSpecialChar = /[\p{P}\p{S}]/u.test(password);

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let valid = true;
    const newErrors = {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    };

    if (!currentPassword) {
      newErrors.currentPassword = "Current password is required.";
      valid = false;
    }
    if (!newPassword) {
      newErrors.newPassword = "New password is required.";
      valid = false;
    } else if (!isStrongPassword(newPassword)) {
      newErrors.newPassword =
        "New password must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, one number, and one special character.";
      valid = false;
    }
    if (newPassword !== confirmNewPassword) {
      newErrors.confirmNewPassword = "Passwords do not match.";
      valid = false;
    }
    if (!confirmNewPassword) {
      newErrors.confirmNewPassword = "Please confirm your new password.";
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }
    setErrors("");
    // Call API to update password
    try {
      setLoading(true);
      try {
        const response = await updatepassword(newPassword, currentPassword); // Fetch the address using the id
        toast.success("Password updated successfully!!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        handleModalClose();
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      // Handle error (e.g., show an error message)
      console.error("Error updating password:", error);
    }
  };

  return (
    <React.Fragment>
      <Modal
        centered
        show={show}
        onHide={handleModalClose}
        className="modal-custom max-width-574"
      >
        <Modal.Header closeButton className="border-0 text-center pt-4">
          <Modal.Title className="mx-auto">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-lg-5 px-4 pb-4">
          <Form onSubmit={handleSubmit} className="accountform">
            <Row>
              <Col md={12}>
                <Form.Group className="mb-3 form-group position-relative">
                  <Form.Label>Current Password</Form.Label>
                  <div className="password-input-group position-relative">
                    <Form.Control
                      type={showCurrentPassword ? "text" : "password"}
                      placeholder="Enter current password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      //   isInvalid={!!errors.currentPassword}
                    />
                    {/* <div
                    className="position-absolute end-0 top-50 translate-middle-y pe-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  > */}
                    <Icon
                      icon={
                        showCurrentPassword ? "lucide:eye-off" : "lucide:eye"
                      }
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                      className="password-toggle-icon"
                    />
                  </div>
                  {/* </div> */}
                  <Form.Control.Feedback type="error">
                    {errors.currentPassword}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3 form-group position-relative">
                  <Form.Label>New Password</Form.Label>
                  <div className="password-input-group position-relative">
                    <Form.Control
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      //   isInvalid={!!errors.newPassword}
                    />
                    {/* <div
                    className="position-absolute end-0 top-50 translate-middle-y pe-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  > */}
                    <Icon
                      icon={showNewPassword ? "lucide:eye-off" : "lucide:eye"}
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="password-toggle-icon"
                    />
                  </div>
                  {/* </div> */}
                  <Form.Control.Feedback type="error">
                    {errors.newPassword}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3 form-group position-relative">
                  <Form.Label>Confirm New Password</Form.Label>
                  <div className="password-input-group position-relative">
                    <Form.Control
                      type={showConfirmNewPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      //   isInvalid={!!errors.confirmNewPassword}
                    />
                    {/* <div
                      className="position-absolute end-0 top-50 translate-middle-y pe-2"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        setShowConfirmNewPassword(!showConfirmNewPassword)
                      }
                    > */}
                    <Icon
                      icon={
                        showConfirmNewPassword ? "lucide:eye-off" : "lucide:eye"
                      }
                      onClick={() =>
                        setShowConfirmNewPassword(!showConfirmNewPassword)
                      }
                      className="password-toggle-icon"
                    />
                    {/* </div> */}
                  </div>
                  <Form.Control.Feedback type="error">
                    {errors.confirmNewPassword}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <div className="text-center mt-3">
              <Button
                type="button"
                onClick={handleModalClose}
                className="btn-outline-primary min-width-159 mx-2 mb-2"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="btn-primary min-width-159 mx-2 mb-2"
                disabled={loading}
              >
                {loading ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : (
                  "Update"
                )}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default ChangePassword;
