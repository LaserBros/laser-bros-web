import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Modal, Button } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import {
  deleteAddress,
  fetchAddress,
  setAddressAsDefault,
} from "../../api/api";
import { toast } from "react-toastify";
import ConfirmationModal from "../../components/ConfirmationModal";
import Loader from "../../layouts/Loader";

export default function Addresses() {
  const [address, setAddresss] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [addressIdToDelete, setAddressIdToDelete] = useState(null);
  const handleClose = (shouldReload = false) => {
    setShow(false);
    if (shouldReload) {
      loadData();
    }
  };
  const handleShow = (addressId) => {
    setAddressIdToDelete(addressId);
    setShow(true);
  };

  const deleteAddressHandler = async () => {
    try {
      if (addressIdToDelete) {
        await deleteAddress(addressIdToDelete);
        toast.success("Address deleted successfully");
        await loadData();
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error(
          "Error setting address as default. Please try again later."
        );
      }
    } finally {
      setShow(false);
      setAddressIdToDelete(null);
    }
  };
  const handleSetAsDefault = async (addressId) => {
    try {
      await setAddressAsDefault(addressId);
      toast.success("Default address changed successfully");
      await loadData();
    } catch (error) {
      toast.success("Error setting address as default:", error);
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [response] = await Promise.all([fetchAddress()]);
      // console.log(response.data.data);
      setAddresss(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatPhoneNumber = (number) => {
    // Convert the input to a string
    const numberStr = String(number);

    // Remove non-numeric characters
    const cleaned = numberStr.replace(/\D/g, "");

    // Format based on length
    if (cleaned.length === 10) {
      // Format for a standard 10-digit phone number
      return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
    } else if (cleaned.length === 11 && cleaned.startsWith("1")) {
      // Format for US-style 11-digit numbers with country code "1"
      return cleaned.replace(/(\d)(\d{3})(\d{3})(\d{4})/, "$1-$2-$3-$4");
    } else {
      // Generic fallback for other formats
      return cleaned;
    }
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <React.Fragment>
      <section className="myaccount ptb-50">
        <Container>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center flex-wrap gap-2">
              <h5>My Addresses</h5>{" "}
              <Link
                to="/my-address/add-address"
                className="btn btn-primary d-inline-flex align-items-center  justify-content-center min-width-159"
              >
                Add New
              </Link>
            </Card.Header>
            <Card.Body>
              <Row>
                {loading ? (
                  <Col className="text-center mt-5 mb-5">
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  </Col>
                ) : address.length === 0 ? (
                  <div className="sc-gLXSEc gpwTNyClass">
                    <div style={{ textAlign: "center", padding: "24px" }}>
                      <span>No Addresses to Display </span>
                    </div>
                  </div>
                ) : (
                  address.map((addr) => (
                    <Col xl={4} lg={4} md={6} className="mb-2">
                      <div className="addresses-grid">
                        <div className="d-flex align-items-center justify-content-between mb-1">
                          <h2 className="mb-0">{addr.full_name}</h2>
                          {addr.is_default === 1 && (
                            <span className="statusdefault">Default</span>
                          )}
                        </div>
                        <p className="mb-2">{addr.nickname}</p>
                        <p className="mb-2">
                          {formatPhoneNumber(addr.phone_number)}
                        </p>
                        <p className="mb-3">
                          {addr.address_line_1}, {addr.city} {addr.state_code},{" "}
                          {addr.pincode}, {addr.country}
                        </p>
                        {addr.permanent != 1 &&
                        <div className="btn-bottom">
                          <Link
                            className="btn-address"
                            to={`/my-address/edit-address/${addr._id}`}
                          >
                            <Icon icon="mynaui:edit" />
                          </Link>
                          <Link
                            className="btn-address"
                            onClick={() => handleShow(addr._id)}
                          >
                            <Icon icon="uiw:delete" />
                          </Link>
                          {addr.is_default === 0 && (
                            <Link
                              className="btn-set-default"
                              onClick={() => handleSetAsDefault(addr._id)}
                            >
                              Set as Default
                            </Link>
                          )}
                        </div>
                      }
                      </div>
                    </Col>
                  ))
                )}
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </section>
      <ConfirmationModal
        show={show}
        onHide={handleClose}
        title={"Are you sure?"}
        desc={"You want to delete this address"}
        yesBtnText={"Yes"}
        noBtnText={"No"}
        onConfirm={deleteAddressHandler}
        message="Do you want to delete this address?"
      />
    </React.Fragment>
  );
}
