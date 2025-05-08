import React, { useEffect, useState } from "react";
import { Form, Button, Spinner, Alert,Card,CardHeader,CardBody } from "react-bootstrap";
import { OfferAdmin, UpdateOfferAdmin } from "../../../api/api";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Offer = () => {
  const [banner, setBanner] = useState({
    offer_description: "",
    offer_text: "",
    offer_percentage: 0,
    button_text: "",
    button_link: "",
    button_description: "",
    offer_code: "",
    is_active: false,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams();

  const fetchBanner = async () => {
    try {
      const res = await OfferAdmin(id);
      setBanner({ ...res.data, id: res.data._id });
      setLoading(false);
    } catch (err) {
      setError("Failed to load offer.");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBanner((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await UpdateOfferAdmin(banner);
      toast.success("Banner updated successfully!");
    } catch (err) {
      toast.error("Failed to update banner.");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);


  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <React.Fragment>
       <Card>
        {loading ?
        <div className="text-center" style={{padding:'30px'}}>
          <Spinner animation="border" />  
          </div>
      :
      <>
          <CardHeader className="py-3">
              <h5>Edit Banner</h5>
          </CardHeader>
          <CardBody>
          <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3 form-group">
          <Form.Label>Offer Description</Form.Label>
          <Form.Control
            type="text"
            name="offer_description"
            value={banner.offer_description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3 form-group">
          <Form.Label>Offer Text</Form.Label>
          <Form.Control
            type="text"
            name="offer_text"
            value={banner.offer_text}
            onChange={handleChange}
          />
        </Form.Group>

        {/* <Form.Group className="mb-3 form-group">
          <Form.Label>Offer Percentage</Form.Label>
          <Form.Control
            type="number"
            name="offer_percentage"
            value={banner.offer_percentage}
            onChange={handleChange}
          />
        </Form.Group> */}

        <Form.Group className="mb-3 form-group">
          <Form.Label>Button Text</Form.Label>
          <Form.Control
            type="text"
            name="button_text"
            value={banner.button_text}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3 form-group">
          <Form.Label>Button Link</Form.Label>
          <Form.Control
            type="text"
            name="button_link"
            value={banner.button_link}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3 form-group">
          <Form.Label>Button Description</Form.Label>
          <Form.Control
            type="text"
            name="button_description"
            value={banner.button_description}
            onChange={handleChange}
          />
        </Form.Group>

        {/* <Form.Group className="mb-3">
          <Form.Label>Offer Code</Form.Label>
          <Form.Control
            type="text"
            name="offer_code"
            value={banner.offer_code}
            onChange={handleChange}
          />
        </Form.Group> */}

        <Form.Group className="mb-4 form-group">
          <Form.Check
            type="switch"
            id="check"
            label="Active"
            name="check"
            checked={banner.check}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </Form>
            </CardBody>
            </>
            
        }
            </Card>
      
      </React.Fragment>
  );
};

export default Offer;
