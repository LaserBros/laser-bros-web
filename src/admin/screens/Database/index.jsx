import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Row,
  Col,
  Image,
  Form,
  Table,
  Tabs,
  Tab,
  Accordion,
} from "react-bootstrap";
import { Icon } from "@iconify/react";
import barcode from "../../assets/img/barcode.jpg";
import { Link, useNavigate } from "react-router-dom";
import file from "../../assets/img/file1.jpg";
import attachment from "../../assets/img/attachment.svg";
import AddNote from "../../components/AddNote";
import {
  deleteThicknessDetails,
  discount,
  getFinishAdmin,
  getMaterialsAndThickness,
} from "../../../api/api";
import Amount from "../../../components/Amount";
import ConfirmationModal from "../../../components/ConfirmationModal";
const DataBase = () => {
  const [Finishes, setFinishes] = useState([]);
  const [Quantities, setQuantities] = useState([]);
  const [Materials, setMaterials] = useState([]);
  const [LoadData, setLoadData] = useState(false);
const handleClose = () => setModalShow(false);
  const [modalShow, setModalShow] = useState(false);
  const [title, setTitle] = useState("");
  const [thickId, setThickId] = useState("");
  const [loadingBtn,setloadingBtn] = useState(false);
  const changeStatus = async () => {
      setloadingBtn(true);
      try {
        const data = {
          id:thickId
        }
        const res = await deleteThicknessDetails(data);
        handleTabSelect("finishes");
        setModalShow(false);
        setloadingBtn(false);
      } catch (error) {
        
      }
  }
  const handleTabSelect = async (tabKey) => {
    setLoadData(true);
    console.log("tabKey", tabKey);
    if (tabKey == "finishes") {
      const res = await getFinishAdmin();
      setFinishes(res.data);
      setLoadData(false);
    }
    if (tabKey == "qty") {
      const res = await discount();

      setQuantities(res.data);
      setLoadData(false);
    }
    if (tabKey == "materials") {
      setLoadData(true);
      const res = await getMaterialsAndThickness();
      setMaterials(res.data);
      setLoadData(false);
    }
  };
  useEffect(() => {
    const fetchdata = async () => {
      setLoadData(true);
      const res = await getMaterialsAndThickness();
      setMaterials(res.data);
      setLoadData(false);
    };
    fetchdata();
  }, []);
  return (
    <React.Fragment>
      <Tabs
        // defaultActiveKey="quotes"
        onSelect={handleTabSelect}
        // activeKey={currentTab}
        id="uncontrolled-tab-example"
        className="viewCustomerTabs_div"
      >
        <Tab eventKey="materials" title="Materials">
          {LoadData ? (
            <div className="text-center">
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            </div>
          ) : (
            <Accordion defaultActiveKey={0} className="accordionmaterial">
              {Materials.map((data, index) => (
                <Accordion.Item eventKey={index} className="mb-3">
                  <Accordion.Header>
                    {data.material_name} {data.material_grade}
                  </Accordion.Header>
                  <Accordion.Body>
                    <Card>
                      <Card.Body>
                        <Table className="tablecustom" responsive>
                          <thead>
                            <tr>
                            <th>Edit</th>
                              <th style={{ minWidth: 150 }}>Grade</th>
                              <th>Thickness</th>
                              <th>Stocked?</th>
                              <th>Bending?</th>
                              <th>Material Code</th>
                              <th style={{ minWidth: 150 }}>
                                Material Density
                              </th>
                              <th style={{ minWidth: 150 }}>
                                Price per Pound $
                              </th>
                              <th style={{ minWidth: 200 }}>
                                Cutting Speed (inches per minute)
                              </th>
                              <th style={{ minWidth: 200 }}>
                                Cutting Cost Per Minute $
                              </th>
                              <th style={{ minWidth: 150 }}>
                                Material Markup %
                              </th>
                              <th style={{ minWidth: 150 }}>
                                Price Per Pierce
                              </th>
                              <th style={{ minWidth: 150 }}>
                                Finishing Options
                              </th>
                              <th style={{ minWidth: 150 }}>
                                Estimated Lead Time
                              </th>
                              <th style={{ minWidth: 150 }}>
                                RFQ Dimension Shift
                              </th>
                              <th style={{ minWidth: 150 }}>
                                RFQ Weight Shift
                              </th>
                              
                            </tr>
                          </thead>
                          <tbody>
                            {data.thickness.map((item, increment) => (
                              <tr>
                                <td>
                                  <div className="d-flex gap-2">
                                  <Link
                                    className="btnedit"
                                    to={`/admin/database/edit-material/${item._id}`}
                                  >
                                    <Icon icon="tabler:edit" />
                                  </Link>
                                  {/* <Link
                                    className="btnedit"
                                    onClick={() =>{
                                      setTitle(
                                        "Are you sure you want to delete this thickness?"
                                      );
                                      setThickId(item._id);
                                      setModalShow(true);
                                    }}
                                  > 
                                    <Icon icon="tabler:trash" />
                                  </Link> */}
                                  </div>
                                </td>
                                <td>
                                  {data.material_name} {data.material_grade}
                                </td>
                                <td>{item.material_thickness}</td>
                                <td>{item.stocked}</td>
                                <td>{item.bending}</td>
                                <td>{item.material_code}</td>
                                <td>{item.material_density}</td>
                                <td>{item.price}</td>
                                <td>{item.cutting_speed}</td>
                                <td>{item.cutting_cost}</td>
                                <td>{item.material_markup}</td>
                                <td>{item.pierce_price}</td>
                                <td>
                                  {item.finishing_options?.map((finishType) => (
                                    <span className="me-2">F{finishType}</span>
                                  ))}
                                </td>
                                <td>{item.estimated_lead_time}</td>
                                <td>{item.rfq_dimension_shift}</td>
                                <td>{item.rfq_weight_shift}</td>
                                
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </Card.Body>
                    </Card>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
              <div>
              <Link to={'/admin/database/add-material'} className=" gap-2 btn btn-primary d-inline-flex align-items-center justify-content-center">Add Material</Link>
              <Link style={{marginLeft:'15px'}} to={'/admin/database/add-thickness'} className="btn btn-primary d-inline-flex align-items-center justify-content-center">Add Thickness</Link>
              </div>
            </Accordion>
          )}
        </Tab>
        <Tab eventKey="finishes" title="Finishes">
          <Card>
            <Card.Body>
              <Table className="tablecustom" responsive>
                <thead>
                  <tr>
                  <th>Action</th>
                    <th>Finishing Code</th>
                    <th>Finishing Description</th>
                    <th>Minimum Size</th>
                    <th>Maximum Size</th>
                    <th>Notes</th>
                    <th>Price Per Part</th>
                   
                  </tr>
                </thead>
                <tbody>
                  {LoadData ? (
                    <tr>
                      <td colSpan={7}>
                        <div className="text-center">
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    Finishes.map((item, index) => (
                      <tr>
                        <td>
                          <div className="d-inline-flex align-items-center gap-1">
                            <Link
                              className="btnedit"
                              to={`/admin/database/edit-finish/${item._id}`}
                            >
                              <Icon icon="tabler:edit" />
                            </Link>
                            {/* <Link className="btnedit">
                                <Icon icon="uiw:delete" />
                              </Link> */}
                          </div>
                        </td>
                        <td>
                          <Amount amount={item.price} />
                        </td>
                        
                        <td>F{item?.finishing_code}</td>
                        <td>{item.finishing_desc}</td>
                        <td>{item.minimum_size}</td>
                        <td>{item.maximum_size}</td>
                        <td>{item.notes_text}</td>
                        
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
              <Link to={'/admin/database/add-finish'}  className="btn btn-primary d-inline-flex align-items-center justify-content-center">Add Finish</Link>
            </Card.Body>
          </Card>
        </Tab>
        <Tab eventKey="qty" title="Quantity Discount">
          <Card>
            <Card.Body>
              <Table className="tablecustom" responsive>
                <thead>
                  <tr>
                  <th>Action</th>
                    <th>Part Quantity</th>
                    <th>% discount Applied</th>
                   
                  </tr>
                </thead>
                <tbody>
                  {LoadData ? (
                    <tr>
                      <td colSpan={3}>
                        <div className="text-center">
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    Quantities.map((item, index) => (
                      <tr>
                         <td>
                          <div className="d-inline-flex align-items-center gap-1">
                            <Link
                              className="btnedit"
                              to={`/admin/database/edit-quantity/${item._id}`}
                            >
                              <Icon icon="tabler:edit" />
                            </Link>
                            {/* <Link className="btnedit">
                                <Icon icon="uiw:delete" />
                              </Link> */}
                          </div>
                        </td>
                        <td>{item?.quantity}</td>
                        <td>{item.discount}%</td>

                       
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
              <Link to={'/admin/database/add-quantity'} className="btn btn-primary d-inline-flex align-items-center justify-content-center">Add Quantity</Link>
            </Card.Body>
           
          </Card>
        </Tab>
      </Tabs>
      <ConfirmationModal
        show={modalShow}
        onHide={handleClose}
        title={"Are you sure?"}
        desc={title}
        yesBtnText={"Yes"}
        noBtnText={"No"}
        onConfirm={changeStatus}
        loading={loadingBtn}
      />
    </React.Fragment>
  );
};

export default DataBase;
