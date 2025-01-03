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
  discount,
  getFinishAdmin,
  getMaterialsAndThickness,
} from "../../../api/api";
import Amount from "../../../components/Amount";
const DataBase = () => {
  const [Finishes, setFinishes] = useState([]);
  const [Quantities, setQuantities] = useState([]);
  const [Materials, setMaterials] = useState([]);
  const [LoadData, setLoadData] = useState(false);

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
                              <th>Edit</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.thickness.map((item, increment) => (
                              <tr>
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
                                <td>
                                  <Link
                                    className="btnedit"
                                    to={`/admin/database/edit-material/${item._id}`}
                                  >
                                    <Icon icon="tabler:edit" />
                                  </Link>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </Card.Body>
                    </Card>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          )}
        </Tab>
        <Tab eventKey="finishes" title="Finishes">
          <Card>
            <Card.Body>
              <Table className="tablecustom" responsive>
                <thead>
                  <tr>
                    <th>Finishing Code</th>
                    <th>Finishing Description</th>
                    <th>Minimum Size</th>
                    <th>Maximum Size</th>
                    <th>Notes</th>
                    <th>Price Per Part</th>
                    <th>Action</th>
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
                        <td>F{item?.finishing_code}</td>
                        <td>{item.finishing_desc}</td>
                        <td>{item.minimum_size}</td>
                        <td>{item.maximum_size}</td>
                        <td>{item.notes_text}</td>
                        <td>
                          <Amount amount={item.price} />
                        </td>
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
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Tab>
        <Tab eventKey="qty" title="Quantity Discount">
          <Card>
            <Card.Body>
              <Table className="tablecustom" responsive>
                <thead>
                  <tr>
                    <th>Part Quantity</th>
                    <th>% discount Applied</th>
                    <th>Action</th>
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
                        <td>{item?.quantity}</td>
                        <td>{item.discount}%</td>

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
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>
    </React.Fragment>
  );
};

export default DataBase;
