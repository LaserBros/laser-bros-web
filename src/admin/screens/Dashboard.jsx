import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  addDays,
  startOfWeek,
  endOfWeek,
  format,
  addWeeks,
  subWeeks,
} from "date-fns";

import {
  Row,
  Col,
  Image,
  Card,
  CardHeader,
  CardBody,
  Button,
} from "react-bootstrap";
import { Icon } from "@iconify/react";
import icon1 from "../assets/img/icon-1.svg";
import icon2 from "../assets/img/icon-2.svg";
import icon3 from "../assets/img/icon-3.svg";
import icon4 from "../assets/img/icon-4.svg";
import icon5 from "../assets/img/icon-5.svg";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getDashboardDetails } from "../../api/api";
import { Link } from "react-router-dom";

// const data = [
//   {
//     date: "01-06-2024",
//     quotes: 50,
//     rfq: 25,
//     orders: 30,
//     queue: 50,
//     cut: 30,
//     finishing: 45,
//     bending: 40,
//     postOp: 30,
//     shipping: 20,
//     completed: 5,
//   },
//   {
//     date: "02-06-2024",
//     quotes: 12,
//     rfq: 18,
//     orders: 24,
//     queue: 28,
//     cut: 32,
//     finishing: 36,
//     bending: 40,
//     postOp: 44,
//     shipping: 48,
//     completed: 5,
//   },
//   {
//     date: "03-06-2024",
//     quotes: 12,
//     rfq: 18,
//     orders: 24,
//     queue: 28,
//     cut: 32,
//     finishing: 36,
//     bending: 40,
//     postOp: 15,
//     shipping: 25,
//     completed: 0,
//   },
//   {
//     date: "04-06-2024",
//     quotes: 12,
//     rfq: 18,
//     orders: 24,
//     queue: 28,
//     cut: 32,
//     finishing: 36,
//     bending: 40,
//     postOp: 44,
//     shipping: 30,
//     completed: 5,
//   },
//   {
//     date: "05-06-2024",
//     quotes: 12,
//     rfq: 18,
//     orders: 24,
//     queue: 28,
//     cut: 32,
//     finishing: 36,
//     bending: 40,
//     postOp: 44,
//     shipping: 30,
//     completed: 5,
//   },
//   {
//     date: "06-06-2024",
//     quotes: 40,
//     rfq: 20,
//     orders: 30,
//     queue: 50,
//     cut: 30,
//     finishing: 40,
//     bending: 30,
//     postOp: 22,
//     shipping: 20,
//     completed: 2,
//   },
//   {
//     date: "07-06-2024",
//     quotes: 12,
//     rfq: 18,
//     orders: 24,
//     queue: 28,
//     cut: 32,
//     finishing: 36,
//     bending: 25,
//     postOp: 10,
//     shipping: 15,
//     completed: 0,
//   },
//   {
//     date: "08-06-2024",
//     quotes: 12,
//     rfq: 18,
//     orders: 24,
//     queue: 28,
//     cut: 32,
//     finishing: 36,
//     bending: 10,
//     postOp: 30,
//     shipping: 25,
//     completed: 7,
//   },
// ];
const Dashboard = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [fromDate, setFromDate] = useState(
    format(startOfWeek(new Date()), "yyyy-MM-dd")
  );
  const [toDate, setToDate] = useState(
    format(endOfWeek(new Date()), "yyyy-MM-dd")
  );

  const handleWeekChange = (date) => {
    const startOfWeekDate = startOfWeek(date);
    const endOfWeekDate = endOfWeek(date);
    setStartDate(date);
    // console.log(startOfWeekDate, endOfWeekDate);
    setFromDate(format(startOfWeekDate, "yyyy-MM-dd"));
    setToDate(format(endOfWeekDate, "yyyy-MM-dd"));
  };
  const goToPreviousWeek = () => {
    const newDate = subWeeks(startDate, 1); // Go to the previous week
    handleWeekChange(newDate);
  };

  const goToNextWeek = () => {
    const newDate = addWeeks(startDate, 1); // Go to the next week
    handleWeekChange(newDate);
  };
  const [dataArr, setdataArr] = useState();
  const [ordersCount, setordersCount] = useState(0);
  const [completedOrderCount, setcompletedOrderCount] = useState(0);
  const [orderInProcess, setorderInProcess] = useState(0);
  const [ordersInRFQ, setordersInRFQ] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const res = await getDashboardDetails(fromDate, toDate);

    const data_array = res.data.result;
    setordersCount(res.data.ordersCount);
    setcompletedOrderCount(res.data.completedOrderCount);
    setorderInProcess(res.data.orderInProcess);
    setordersInRFQ(res.data.ordersInRFQ);
    const convertedData = data_array?.map((item, index) => {
      return {
        date: item._id,
        orders: item.orderDetailsPartDate > 0 ? 1 : 0,
        rfq: item.rfqQuotePartDate > 0 ? 1 : 0,
        completed: item.orderCompletedPartDate > 0 ? 1 : 0,
        queue: item.orderProcessPartDate > 0 ? 1 : 0,
      };
    });
    setLoading(false);
    // console.log("convertedData", convertedData);
    setdataArr(convertedData);
  };

  useEffect(() => {
    loadData();
  }, [fromDate, toDate]);

  return (
    <React.Fragment>
      <Row>
        <Col xl={3} lg={4} md={6} className="mb-4">
          <div className="stats d-flex align-items-center">
            <span className="statsicon">
              <Icon icon="tabler:shopping-cart" />
            </span>
            <div className="stats-cont">
              <p>{ordersCount}</p>
              <h4>No Of Orders</h4>
            </div>
          </div>
        </Col>
        <Col xl={3} lg={4} md={6} className="mb-4">
          <div className="stats d-flex align-items-center">
            <span className="statsicon statsdarkpurple">
              <Icon icon="hugeicons:queue-02" />
            </span>
            <div className="stats-cont">
              <p>{orderInProcess}</p>
              <h4>Orders in Process</h4>
            </div>
          </div>
        </Col>
        <Col xl={3} lg={4} md={6} className="mb-4">
          <div className="stats d-flex align-items-center">
            <span className="statsicon statsred">
              {" "}
              <Icon icon="fluent:laser-tool-20-regular" />
            </span>
            <div className="stats-cont">
              <p>{ordersInRFQ}</p>
              <h4>Orders in RFQ's</h4>
            </div>
          </div>
        </Col>

        <Col xl={3} lg={4} md={6} className="mb-4">
          <div className="stats d-flex align-items-center">
            <span className="statsicon statspurple">
              <Image src={icon5} className="img-fluid" alt="" />
            </span>
            <div className="stats-cont">
              <p>{completedOrderCount}</p>
              <h4>Completed Orders</h4>
            </div>
          </div>
        </Col>
      </Row>
      <Card>
        <CardHeader className="py-4 ">
          <Row className="align-items-center">
            <Col md={8}>
              <h5>Orders Workflow Stage Counts</h5>
            </Col>
            <Col md={4} className=" text-md-end">
            <div className="d-flex align-items-center">
              <Link
                className="btnedit me-1"
                to={``}
                onClick={goToPreviousWeek}
                width="24"
                height="24"
              >
                <Icon icon="icon-park-solid:left-c" width="20" height="20" />
              </Link>
              <p className="OrderCount_Date">{format(fromDate, "dd MMMM")} - {format(toDate, "dd MMMM")}</p>
              <Link className="btnedit ms-1" to={``} onClick={goToNextWeek}>
                <Icon icon="icon-park-solid:right-c" width="20" height="20" />
              </Link>
              </div>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <ResponsiveContainer width="100%" height={400}>
            {loading ? (
              // Show a loading spinner or bar when loading
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              </div>
            ) : (
              <BarChart
                data={dataArr}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
                barSize={50}
              >
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis
                  dataKey="date"
                  height={70}
                  tick={{
                    fill: "#000",
                    fontSize: 12,
                    transform: "translateY(20px)",
                    angle: -50,
                    dx: -40,
                    dy: 50,
                    textAnchor: "start",
                  }}
                  stroke="rgba(0,0,0,0.20)"
                  strokeWidth="1"
                />
                <YAxis
                  label={{
                    fill: "#000",
                    fontWeight: 700,
                    value: "Count",
                    angle: -90,
                    position: "insideLeft",
                  }}
                  tick={{ fill: "#000", fontSize: 12 }}
                  stroke="rgba(0,0,0,0.20)"
                  strokeWidth="1"
                  tickCount={12}
                  interval={0}
                />
                <Tooltip />
                <Legend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                />
                {/* <Bar
                dataKey="quotes"
                stackId="a"
                fill="#5ECFFF"
                style={{ opacity: 0.5 }}
                name="Number Of Quotes"
              /> */}
                <Bar
                  dataKey="rfq"
                  stackId="a"
                  fill="#F46920"
                  style={{ opacity: 0.5 }}
                  name="Request For Quote’s"
                />
                <Bar
                  dataKey="orders"
                  stackId="a"
                  fill="#E11F26"
                  style={{ opacity: 0.5 }}
                  name="Number Of Orders"
                />
                <Bar
                  dataKey="queue"
                  stackId="a"
                  fill="#F857C1"
                  style={{ opacity: 0.5 }}
                  name="Orders In Queue"
                />
                {/* <Bar
                dataKey="cut"
                stackId="a"
                fill="#4F8CCA"
                style={{ opacity: 0.5 }}
                name="Orders In Cut"
              />
              <Bar
                dataKey="finishing"
                stackId="a"
                fill="#00CBBF"
                style={{ opacity: 0.5 }}
                name="Orders In Finishing"
              />
              <Bar
                dataKey="bending"
                stackId="a"
                fill="#01943C"
                style={{ opacity: 0.5 }}
                name="Orders In Bending"
              />
              <Bar
                dataKey="postOp"
                stackId="a"
                fill="#9DCA1C"
                style={{ opacity: 0.5 }}
                name="Orders In Post OP"
              />
              <Bar
                dataKey="shipping"
                stackId="a"
                fill="#FFAF00"
                style={{ opacity: 0.5 }}
                name="Orders In Shipping"
              /> */}
                <Bar
                  dataKey="completed"
                  stackId="a"
                  fill="#01943C"
                  style={{ opacity: 0.5 }}
                  name="Completed Orders"
                />
              </BarChart>
            )}
          </ResponsiveContainer>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};
export default Dashboard;
