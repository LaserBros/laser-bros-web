import React, { useEffect, useState } from "react";
import { Form, Button, Modal,Image } from "react-bootstrap";
import pdf_icon from "../assets/img/preview_pdf.png";

const ShippingStatus = ({ show, handleClose, ordersTrack,shipType }) => {
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
        <Modal.Body className="px-lg-5 px-4 pb-4 add_custom_color_track">
          {ordersTrack.service_code == 'custom_rates' ?
             <div className="tracking-info custom_rate">
             <div className="events-list">
                   <div className="event-item mb-3">
                     <p className="mb-1"><b>Your Order has been Shipped!</b></p>
                    <p className="mb-1"><b className="maxwidth130">Carrier Name:</b>{ordersTrack?.freight_carrier_name}</p>
                    <p className="mb-1"><b className="maxwidth130">Tracking:</b>{ordersTrack?.freight_tracking}</p>
                    <p className="mb-1"><b className="maxwidth130">Download BOL:</b><a href={ordersTrack?.freight_bol_file} target="_blank"><Image src={pdf_icon} style={{width:'100px',height:'100px'}} /></a></p>
                  
                    </div>   
                    </div>
                    </div>
          : 
          shipType == "Local Pickup" || shipType == "local_pickup"  ?
            <div className="events-list">
            <div className="events-list">
                  <div className="event-item mb-3">
                    <p><b>Your order is ready for local pickup!</b></p>
                    <p><b>Pickup Address:</b><br/>
                      909 E. Elm St.<br/>
                      Suite 102<br/>
                      Graham, NC 27253</p>
                   </div>   
                   </div>
                   </div>
          :
          Array.isArray(ordersTrack) && ordersTrack?.map((data) => (
            <>
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
            </>
          ))
          }
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
