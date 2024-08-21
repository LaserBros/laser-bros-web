import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Image,
  Form,
  Button,
} from "react-bootstrap";
import { Icon } from "@iconify/react";
import User from "../../assets/img/user-3.jpg"; // Default image
import {
  fetchProfile,
  updateProfile,
  uploadImage,
  uploadimage,
} from "../../api/api";
import { toast } from "react-toastify";
import { UserContext } from "../../localstorage/UserProfileContext";

export default function MyProfile() {
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
        const response = await fetchProfile();
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

        await updateProfile(data);
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
        const updated_image = await uploadImage(formData);
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

  return (
    <React.Fragment>
      <section className="myaccount ptb-50">
        <Container>
          <Card>
            <Card.Header>
              <h5>My Profile</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col xl={4} md={5}>
                  <div className="profile_user_main text-center mb-3">
                    <div className="user_info position-relative">
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
                        className="img-fluid rounded-circle"
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
                        onChange={handleImageChange}
                        accept="image/*"
                      />
                    </div>
                    <h4>{showName}</h4>
                    <p>{email}</p>
                  </div>
                </Col>
                <Col xl={8} md={7}>
                  <Form className="accountform" onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3 form-group">
                          <Form.Label>Full Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            isInvalid={!!errors.name}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.name}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3 form-group">
                          <Form.Label>Company Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter company name"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            // isInvalid={!!errors.companyName}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
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
                      <Col md={6}>
                        <Form.Group className="mb-3 form-group">
                          <Form.Label>Phone No</Form.Label>
                          <Form.Control
                            type="tel"
                            placeholder="Enter phone number"
                            value={phoneNo}
                            onChange={(e) => setPhoneNo(e.target.value)}
                            isInvalid={!!errors.phoneNo}
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
            </Card.Body>
          </Card>
        </Container>
      </section>
    </React.Fragment>
  );
}
