import React, { useContext, useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Image,
  Button,
  Tab,
  Tabs,
  Form,
} from "react-bootstrap";
import { Icon } from "@iconify/react";
import Avatar from "../assets/img/Avatar.jpg";
import { toast } from "react-toastify";
import { UserContext } from "../../localstorage/UserProfileContext";
import User from "../../assets/img/user-3.jpg"; // Default image
import {
  AdminfetchProfile,
  AdminupdateProfile,
  Adminupdatepassword,
  AdminuploadImage,
} from "../../api/api";
const EditProfile = () => {
  const [key, setKey] = useState("basicinfo");

  const { nameLocal, updateName } = useContext(UserContext);
  const { image, updateImage } = useContext(UserContext);
  const [name, setName] = useState("");
  const [showName, setshowName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  // const [profileImage, setprofileImage] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [profileImage, setProfileImage] = useState(User); // Default image
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Fetch user info when component mounts
  useEffect(() => {
    // Simulate an API call to fetch user info
    const fetchUserInfo = async () => {
      try {
        const response = await AdminfetchProfile();
        console.log(response, "sdsssdsdds");
        setName(response.data.full_name);
        setshowName(response.data.full_name);
        setCompanyName(response.data.company_name);
        setEmail(response.data.email);
        setPhoneNo(response.data.phone_number);
        setProfileImage(response.data.profile_image);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    let valid = true;

    if (!name) {
      newErrors.name = "Full name is required.";
      valid = false;
    }
    if (!email) {
      newErrors.email = "Email address is required.";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email address.";
      valid = false;
    }
    if (!phoneNo) {
      newErrors.phoneNo = "Phone number is required.";
      valid = false;
    } else if (!/^\d{6,15}$/.test(phoneNo)) {
      newErrors.phoneNo = "Phone number must be 10 digits.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };
  const isStrongPassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar
    );
  };
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    let validationErrors = {};

    // Validate Current Password
    if (!currentPassword) {
      validationErrors.currentPassword = "Current password is required";
    }

    // Validate New Password
    if (!newPassword) {
      validationErrors.newPassword = "New password is required";
    } else if (!isStrongPassword(newPassword)) {
      validationErrors.newPassword =
        "New password must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, one number, and one special character.";
    }

    // Validate Confirm Password
    if (!confirmNewPassword) {
      validationErrors.confirmNewPassword = "Confirm password is required";
    } else if (newPassword !== confirmNewPassword) {
      validationErrors.confirmNewPassword = "Passwords do not match";
    }

    // Set errors if there are any, else submit the form
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors("");
      try {
        setLoading(true);
        try {
          const response = await Adminupdatepassword(
            newPassword,
            currentPassword
          ); // Fetch the address using the id
          toast.success("Password updated successfully!!");
          setCurrentPassword("");
          setNewPassword("");
          setConfirmNewPassword("");
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
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setLoading(true);
        const data = {
          full_name: name,
          company_name: companyName,
          phone_number: phoneNo,
        };

        await AdminupdateProfile(data);
        updateName(name);

        setshowName(name);
        toast.success("Profile Updated!!");
        setLoading(false);
      } catch (error) {
        toast.error(
          error.response?.message ||
            "An error occurred while updating the profile."
        );
        setLoading(false);
      }
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if the file size exceeds 5MB
      const maxSizeInMB = 5;
      const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

      if (file.size > maxSizeInBytes) {
        // If file is too large, show an error message and return
        toast.error(
          `File size exceeds ${maxSizeInMB}MB. Please upload a smaller file.`
        );
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);

      try {
        const formData = new FormData();
        formData.append("profile", file);
        const updated_image = await AdminuploadImage(formData);
        updateImage(updated_image.data.path);
        toast.success("Profile Image Changed!!");
      } catch (error) {
        toast.error(
          error.response?.message ||
            "An error occurred while uploading the image."
        );
      }
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };
  // const handleSubmit = (e) => {
  //     e.preventDefault();
  // };
  return (
    <React.Fragment>
      <Card>
        <CardHeader className="py-4">
          <h5>Edit Profile</h5>
        </CardHeader>
        <CardBody>
          <Tabs
            defaultActiveKey="basicinfo"
            id="uncontrolled-tab-example"
            className="customtabs mb-2"
            activeKey={key}
            onSelect={(k) => setKey(k)}
          >
            <Tab eventKey="basicinfo" title="Basic Info">
              <Row>
                <Col xl={3} lg={4}>
                  <div className="profileuser  text-center">
                    <div className="userinfo mx-auto">
                      <Image
                        src={
                          image != null || image != "" || image != undefined
                            ? image
                            : profileImage == "" ||
                              profileImage == undefined ||
                              profileImage == "null"
                            ? "https://s3.us-east-1.amazonaws.com/laserbros-image-upload/1724131072668-default.png"
                            : process.env.REACT_APP_BUCKET + "/" + profileImage
                        }
                        className="img-fluid"
                        alt="Profile"
                      />
                      <Form.Label htmlFor="uploadimg">
                        <Icon icon="teenyicons:edit-outline" />
                      </Form.Label>
                      <Form.Control
                        type="file"
                        id="uploadimg"
                        name="uploadimg"
                        className="d-none"
                        onChange={handleImageChange} // This function should handle the image selection
                        accept="image/*" // Ensure only image files are accepted
                      />
                    </div>
                    <h4>{showName}</h4>
                    <p>{email}</p>
                  </div>
                </Col>
                <Col xl={9} lg={8}>
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
                            isInvalid={!!errors.name}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.name}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col lg={6}>
                        <Form.Group className="mb-3 form-group">
                          <Form.Label>Company Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter company name"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                      <Col lg={6}>
                        <Form.Group className="mb-3 form-group">
                          <Form.Label>Email Address</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Enter email address"
                            value={email}
                            readOnly
                            onChange={(e) => setEmail(e.target.value)}
                            isInvalid={!!errors.email}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.email}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col lg={6}>
                        <Form.Group className="mb-3 form-group">
                          <Form.Label>Phone No.</Form.Label>
                          <Form.Control
                            type="tel"
                            placeholder="Enter phone no."
                            value={phoneNo}
                            isInvalid={!!errors.phoneNo}
                            onChange={(e) => setPhoneNo(e.target.value)}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.phoneNo}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button
                      type="submit"
                      className="min-width-159 mt-2"
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
                  </Form>
                </Col>
              </Row>
            </Tab>
            <Tab eventKey="changepassword" title="Change Password">
              <Form onSubmit={handlePasswordSubmit}>
                <Row>
                  <Col lg={6}>
                    <Form.Group className="mb-3 form-group">
                      <Form.Label>Current Password</Form.Label>
                      <div className="password-input-group position-relative">
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter current password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                        <Icon
                          icon={showPassword ? "lucide:eye-off" : "lucide:eye"}
                          onClick={togglePasswordVisibility}
                          className="password-toggle-icon"
                        />
                      </div>
                      {errors.currentPassword && (
                        <p className="text-danger">{errors.currentPassword}</p>
                      )}
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group className="mb-3 form-group">
                      <Form.Label>New Password</Form.Label>
                      <div className="password-input-group position-relative">
                        <Form.Control
                          type={showPassword1 ? "text" : "password"}
                          placeholder="Enter new password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <Icon
                          icon={showPassword1 ? "lucide:eye-off" : "lucide:eye"}
                          onClick={togglePasswordVisibility1}
                          className="password-toggle-icon"
                        />
                      </div>
                      {errors.newPassword && (
                        <p className="text-danger">{errors.newPassword}</p>
                      )}
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group className="mb-3 form-group">
                      <Form.Label>Confirm New Password</Form.Label>
                      <div className="password-input-group position-relative">
                        <Form.Control
                          type={showPassword2 ? "text" : "password"}
                          placeholder="Enter confirm new password"
                          value={confirmNewPassword}
                          onChange={(e) =>
                            setConfirmNewPassword(e.target.value)
                          }
                        />
                        <Icon
                          icon={showPassword2 ? "lucide:eye-off" : "lucide:eye"}
                          onClick={togglePasswordVisibility2}
                          className="password-toggle-icon"
                        />
                      </div>
                      {errors.confirmNewPassword && (
                        <p className="text-danger">
                          {errors.confirmNewPassword}
                        </p>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <Button
                  type="submit"
                  className="btn btn-primary min-width-159 mt-2 mb-3"
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
              </Form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};
export default EditProfile;
