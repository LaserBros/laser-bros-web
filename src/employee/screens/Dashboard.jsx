import React from "react";
import { Row, Col, Image, Card, CardHeader, CardBody } from "react-bootstrap";
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
const data = [
  {
    date: "01-06-2024",
    quotes: 50,
    rfq: 25,
    orders: 30,
    queue: 50,
    cut: 30,
    finishing: 45,
    bending: 40,
    postOp: 30,
    shipping: 20,
    completed: 5,
  },
  {
    date: "02-06-2024",
    quotes: 12,
    rfq: 18,
    orders: 24,
    queue: 28,
    cut: 32,
    finishing: 36,
    bending: 40,
    postOp: 44,
    shipping: 48,
    completed: 5,
  },
  {
    date: "03-06-2024",
    quotes: 12,
    rfq: 18,
    orders: 24,
    queue: 28,
    cut: 32,
    finishing: 36,
    bending: 40,
    postOp: 15,
    shipping: 25,
    completed: 0,
  },
  {
    date: "04-06-2024",
    quotes: 12,
    rfq: 18,
    orders: 24,
    queue: 28,
    cut: 32,
    finishing: 36,
    bending: 40,
    postOp: 44,
    shipping: 30,
    completed: 5,
  },
  {
    date: "05-06-2024",
    quotes: 12,
    rfq: 18,
    orders: 24,
    queue: 28,
    cut: 32,
    finishing: 36,
    bending: 40,
    postOp: 44,
    shipping: 30,
    completed: 5,
  },
  {
    date: "06-06-2024",
    quotes: 40,
    rfq: 20,
    orders: 30,
    queue: 50,
    cut: 30,
    finishing: 40,
    bending: 30,
    postOp: 22,
    shipping: 20,
    completed: 2,
  },
  {
    date: "07-06-2024",
    quotes: 12,
    rfq: 18,
    orders: 24,
    queue: 28,
    cut: 32,
    finishing: 36,
    bending: 25,
    postOp: 10,
    shipping: 15,
    completed: 0,
  },
  {
    date: "08-06-2024",
    quotes: 12,
    rfq: 18,
    orders: 24,
    queue: 28,
    cut: 32,
    finishing: 36,
    bending: 10,
    postOp: 30,
    shipping: 25,
    completed: 7,
  },
];
const Dashboard = () => {
  return (
    <React.Fragment>
      <Row>
        <Col xl={3} lg={4} md={6} className="mb-4">
          <div className="stats d-flex align-items-center">
            <span className="statsicon">
              <Icon icon="tabler:shopping-cart" />
            </span>
            <div className="stats-cont">
              <p>500</p>
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
              <p>175</p>
              <h4>Orders in Queue</h4>
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
              <p>168</p>
              <h4>Orders in Cut</h4>
            </div>
          </div>
        </Col>
        <Col xl={3} lg={4} md={6} className="mb-4">
          <div className="stats d-flex align-items-center">
            <span className="statsicon statspurple">
              <Image src={icon1} className="img-fluid" alt="" />
            </span>
            <div className="stats-cont">
              <p>105</p>
              <h4>Orders in Finishing</h4>
            </div>
          </div>
        </Col>
        <Col xl={3} lg={4} md={6} className="mb-4">
          <div className="stats d-flex align-items-center">
            <span className="statsicon statsgreen">
              <Image src={icon2} className="img-fluid" alt="" />
            </span>
            <div className="stats-cont">
              <p>102</p>
              <h4>Orders In Bending</h4>
            </div>
          </div>
        </Col>
        <Col xl={3} lg={4} md={6} className="mb-4">
          <div className="stats d-flex align-items-center">
            <span className="statsicon statsdarkgreen">
              <Image src={icon3} className="img-fluid" alt="" />
            </span>
            <div className="stats-cont">
              <p>145</p>
              <h4>Orders in Post OP</h4>
            </div>
          </div>
        </Col>
        <Col xl={3} lg={4} md={6} className="mb-4">
          <div className="stats d-flex align-items-center">
            <span className="statsicon statsdarkblue">
              <Image src={icon4} className="img-fluid" alt="" />
            </span>
            <div className="stats-cont">
              <p>125</p>
              <h4>Orders in Shipping</h4>
            </div>
          </div>
        </Col>
        <Col xl={3} lg={4} md={6} className="mb-4">
          <div className="stats d-flex align-items-center">
            <span className="statsicon statspurple">
              <Image src={icon5} className="img-fluid" alt="" />
            </span>
            <div className="stats-cont">
              <p>321</p>
              <h4>Completed Orders</h4>
            </div>
          </div>
        </Col>
      </Row>
      <Card>
        <CardHeader className="py-4 ">
          <h5>Orders Workflow Stage Counts</h5>
        </CardHeader>
        <CardBody>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={data}
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
              <Legend layout="vertical" align="right" verticalAlign="middle" />
              <Bar
                dataKey="quotes"
                stackId="a"
                fill="#5ECFFF"
                style={{ opacity: 0.5 }}
                name="Number Of Quotes"
              />
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
              <Bar
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
              />
              <Bar
                dataKey="completed"
                stackId="a"
                fill="#F46920"
                style={{ opacity: 0.5 }}
                name="Completed Orders"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};
export default Dashboard;
