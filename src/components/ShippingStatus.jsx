import React, { useEffect, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";

const ShippingStatus = ({ show, handleClose, data }) => {
  return (
    <React.Fragment>
      <Modal
        centered
        show={show}
        onHide={handleClose}
        className="modal-custom max-width-574"
      >
        <Modal.Header closeButton className="border-0 text-center pt-4">
          <Modal.Title className="mx-auto">Track Order</Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-lg-5 px-4 pb-4">
          <div className="tracking-info">
            <h5>Tracking Number: {data?.tracking_number}</h5>
            <p>
              Status:{" "}
              {data?.status_description == null
                ? "In Progress"
                : data?.status_description}
            </p>
            <a
              href={data?.tracking_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Track on Carrier Website
            </a>
          </div>

          <h6 className="mt-4">Shipping Events:</h6>
          <div className="events-list">
            <div className="events-list">
              {data?.events?.length > 0 ? (
                data.events.map((event, index) => (
                  <div key={index} className="event-item mb-3">
                    <p>
                      <strong>
                        {new Date(event.occurred_at).toLocaleString()}
                      </strong>
                    </p>
                    <p>{event.description}</p>
                    <p>
                      {event.city_locality}, {event.state_province}{" "}
                      {event.postal_code}
                    </p>
                    <p>{event.carrier_status_description}</p>
                  </div>
                ))
              ) : (
                <p className="no-status-message">Status not updated</p>
              )}
            </div>
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>
    </React.Fragment>
  );
};

export default ShippingStatus;
