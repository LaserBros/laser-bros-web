import React, { useState } from "react";
import {
    Image,
    Modal,
    Button,
} from 'react-bootstrap';
import file1 from "../assets/img/file1.jpg"
import { Icon } from '@iconify/react';
import QuantitySelector from './Quantityselector';
const AddBend = ({ show2, handleClose2, title }) => {
    const [quantities, setQuantities] = useState({
        item1: 1,
    });

    const incrementQuantity = (item) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [item]: prevQuantities[item] + 1,
        }));
    };

    const decrementQuantity = (item) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [item]: Math.max(prevQuantities[item] - 1, 0), // Prevent negative quantities
        }));
    };
    return (
        <React.Fragment>
            <Modal centered show={show2} onHide={handleClose2} className="modal-custom benddetailsmodal">
                <Modal.Body>
                    <div className="flex-column flex-md-row d-flex flex-wrap flex-md-nowrap">
                        <div className="bend-img-main flex-shrink-0">
                            <div className="bend-img">
                                <Image src={file1} className="img-fluid" alt="" />
                            </div>
                            <p>Dimensions <span>1.00 in x 1.00 in</span></p>
                            <h2>Cube</h2>
                        </div>
                        <div className="bend-content text-center text-md-start mt-3 mt-md-0 ps-0 ps-md-4 flex-grow-1">
                            <div className="bend-title mb-3">
                               <h2 className="mb-0"> {title} </h2>
                               <Button className="btn-outline-primary" variant={null} onClick={handleClose2}>
                                   Done
                               </Button>
                               <button className="btn-close" onClick={handleClose2}></button>
                            </div>
                            <div className="bend-quantity mb-3">
                                <h5 className="mb-0 me-4">Number of bends: </h5>
                                <QuantitySelector
                                    quantity={quantities.item1}
                                    onIncrement={() => incrementQuantity('item1')}
                                    onDecrement={() => decrementQuantity('item1')}
                                />
                            </div>
                        <div className="bends-upload-file mb-2">
                            <Icon icon="mage:file-plus" />
                            <p><label htmlFor="uploadfile">Browse Files</label><input type="file" id="uploadfile" name="uploadfile" className="d-none" /><span> or Drag or Drop</span></p>
                            <small>Please upload your step file for bending review. PDF drawings are also welcome, but might require more time for review.</small>
                        </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
}
export default AddBend;