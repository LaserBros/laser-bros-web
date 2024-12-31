import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Row,
  Col,
  Image,
  Form,
  Tabs,
  Tab,
} from "react-bootstrap";
import { Icon } from "@iconify/react";
import barcode from "../../assets/img/barcode.jpg";
import { Link, useNavigate } from "react-router-dom";
import file from "../../assets/img/file1.jpg";
import attachment from "../../assets/img/attachment.svg";
import AddNote from "../../components/AddNote";
import { getFinishAdmin } from "../../../api/api";
import Amount from "../../../components/Amount";
const DataBase = () => {
  const [Finishes, setFinishes] = useState([]);

  const handleTabSelect = async (tabKey) => {
    if (tabKey == "finishes") {
      const res = await getFinishAdmin();
      setFinishes(res.data);
    }
  };
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
          <div className="wrapper">
            <div className="maincontent_diva">
              <div className="card ">
                <div className="card-body">
                  <table className="tablecustom table">
                    <thead>
                      <tr>
                        <th>Grade</th>
                        <th>Thickness</th>
                        <th>Stocked?</th>
                        <th>Bending?</th>
                        <th>Material Code</th>
                        <th>Material Density</th>
                        <th>Price per Pound $</th>
                        <th>Cutting Speed (inches per minute)</th>
                        <th>Cutting Cost Per Minute $</th>
                        <th>Material Markup %</th>
                        <th>Price Per Pierce</th>
                        <th>Finishing Options</th>
                        <th>Estimated Lead Time</th>
                        <th>RFQ Dimension Shift</th>
                        <th>RFQ Weight Shift</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>RFQ Weight Shift</td>
                        <td>RFQ Weight Shift</td>
                        <td>RFQ Weight Shift</td>
                        <td>RFQ Weight Shift</td>
                        <td>RFQ Weight Shift</td>
                        <td>RFQ Weight Shift</td>
                        <td>RFQ Weight Shift</td>
                        <td>RFQ Weight Shift</td>
                        <td>RFQ Weight Shift</td>
                        <td>RFQ Weight Shift</td>
                        <td>RFQ Weight Shift</td>
                        <td>RFQ Weight Shift</td>
                        <td>RFQ Weight Shift</td>
                        <td>RFQ Weight Shift</td>
                        <td>RFQ Weight Shift</td>
                        <td>RFQ Weight Shift</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </Tab>
        <Tab eventKey="finishes" title="Finishes">
          <div className="wrapper">
            <div className="maincontent_diva">
              <div className="card ">
                <div className="card-body">
                  <table className="tablecustom table">
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
                      {Finishes.map((item, index) => (
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
                              <Link className="btnedit">
                                <Icon icon="uiw:delete" />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </Tab>
        <Tab eventKey="qty" title="Quantity Discount">
          Quantity Discount
        </Tab>
      </Tabs>
    </React.Fragment>
  );
};

export default DataBase;
