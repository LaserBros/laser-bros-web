import React, { useEffect, useState } from "react";
import { Row, Col, Card, CardHeader, CardBody, Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { Link, useParams } from "react-router-dom";
import file from "../../assets/img/file1.jpg";
import { Icon } from "@iconify/react";
import { CancleRefund, getParticularTransaction } from "../../../api/empApi";
import RefundOrder from "../../components/RefundOrder";
import { toast } from "react-toastify";
import ConfirmationModal from "../../../components/ConfirmationModal";
import Amount from "../../../components/Amount";
const ViewPayment = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [Refundloading, setLoadingRefund] = useState(false);
  const [refund, serRefund] = useState(false);
  const [transaction, setTransaction] = useState([]);
  const [RefundData, setRefundData] = useState([]);
  const [modalShow2, setModalShow2] = useState(false);
  const handleClose = () => setModalShow(false);
  const handleCancle = () => setModalShow(true);
  const [modalShow, setModalShow] = useState(false);
  const [refundBtn, setrefundBtn] = useState(false);
  const handleClose2 = () => setModalShow2(false);
  const moveRefund = () => {
    setModalShow2(true);
  };
  const onRefund = async (type,reason, customReason, amount) => {
    setLoadingRefund(true);
    const data = {
      id: transaction?.transactions?.orderDetails?._id,
      reason: reason,
      type: type,
      amount: amount,
    };
    try {
      const res = await CancleRefund(data);
      setLoadingRefund(false);
      fetchOrder();
      setModalShow2(false);
      setModalShow(false);
      if(type == 'refund') {
        toast.success("Refund initiated Successfully");
      } else {
        toast.success("Order cancle Successfully");
      }
      
      return;
    } catch (error) {
      toast.error(error.response.data.error);
      setLoadingRefund(false);
      setModalShow(false);
      return;
    }
  };
  const fetchOrder = async () => {
    const data = {
      id: id,
    };
    try {
      const res = await getParticularTransaction(data);
      setRefundData(res.data.transactions?.refundDetails);
      setTransaction(res.data);
      setLoading(false);
    } catch (error) {
      setTransaction([]);
      setLoading(false);
    }
  };
  const totalRefundAmount = Array.isArray(RefundData)
  ? RefundData.reduce((sum, row) => sum + (row.refund_amount || 0), 0)
  : 0;
  useEffect(() => {
    fetchOrder();
  }, []);

  const formatReason = (reason) => {
    return reason
      ?.split("_") // Split by underscore
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(" "); // Join with space
  };
  const columns = [
    {
      name: "Image",
      selector: (row) => row.image,
      cell: (row) => (
        <div className="files-image">
          <img
            src={row.image_url}
            alt={row.image_url}
            className="img-fluid rounded-circle"
          />
        </div>
      ),
      sortable: false,
    },
    {
      name: "Name",
      selector: (row) => row.material_code + "-" + row.quote_name,
      sortable: true,
    },
    {
      name: "QTY",
      selector: (row) => row.quantity,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => {
        const formattedAmount = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(row.amount);

        return formattedAmount;
      },
      sortable: true,
    },
    // {
    //   name: "Dimension",
    //   selector: (row) => row.dimension,
    //   sortable: true,
    // },
  ];

  const getMonthYear = (dateStr) => {
    const date = new Date(dateStr);
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();
    return `${month}-${year}`; // Returns "MM/YYYY"
  };

  return (
    <React.Fragment>
      <Card>
        {!loading ? (
          transaction != "" ? (
            <>
              <CardHeader className="d-flex align-items-center justify-content-between flex-wrap">
                <h5>{transaction?.transactions?.transaction_id}</h5>
                <Button
                  as={Link}
                  to="/admin/payment-history"
                  className="d-inline-flex align-items-center justify-content-center"
                >
                  Back To Payments
                </Button>
              </CardHeader>

              <CardBody>
                <Row className="justify-content-between  mb-3">
                  <Col xl={4} lg={4} md={6}>
                    <div className="payment-card">
                      <div className="d-flex align-items-center mb-3">
                        <label>Name </label>{" "}
                        <span>{transaction?.transactions?.userDetails?.full_name}</span>
                      </div>
                      <div className="d-flex align-items-center mb-3">
                        <label>Email Address </label>{" "}
                        <span>{transaction?.transactions?.userDetails?.email}</span>
                      </div>
                      <div className="d-flex align-items-center">
                        <label>Phone No </label>{" "}
                        <span>{transaction?.transactions?.userDetails?.phone_number}</span>
                      </div>
                    </div>
                  </Col>
                  <Col xl={4} lg={4} md={6}>
                    <div className="payment-card">
                      <div className="d-flex align-items-center mb-3">
                        <label>Work Order </label>{" "}
                        <span>
                          WO#
                          {transaction?.search_quote}
                        </span>
                      </div>
                      <div className="d-flex align-items-center mb-3">
                        <label>Total Amount </label>{" "}
                        <span>
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD", // Change to your desired currency
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(transaction?.transactions?.orderDetails?.total_amount)}
                        </span>
                      </div>
                      <div className="d-flex align-items-center mb-3">
                        <label>Payment Mode </label> <span>Stripe</span>
                      </div>
                      <div className="d-flex align-items-center">
                        <label>Status </label>{" "}
                        {transaction?.transactions?.orderDetails?.status == 4 ?
                        <span className="statusactive" style={{backgroundColor:'red',color:'#fff'}}>Order Canceled</span>
                        :
                        <span className="statusactive">Paid</span>
                        }
                      </div>
                    </div>
                    {transaction?.transactions?.orderDetails?.status != 4 ?
                    <div className="d-flex align-items-center gap-2 mt-3 flex-wrap">
                    <Button
                      variant={null}
                      onClick={moveRefund}
                      className="btn-outline-primary flex-grow-1"
                    >
                      <Icon icon="lets-icons:refund-back" />
                      Refund
                    </Button>
                  {Array.isArray(RefundData) && RefundData.length >= 1 ? null :
                  <>
                  {(transaction?.transactions?.orderDetails?.status != 2 && transaction?.transactions?.orderDetails?.move_status != 2) &&
                  (transaction?.transactions?.orderDetails?.status != 3 && transaction?.transactions?.orderDetails?.move_status != 3) &&
                    <Button
                      variant={null}
                      onClick={handleCancle}
                      className="btn-outline-primary flex-grow-1"
                      disabled={refund}
                    >
                  
                          {/* <Icon icon="lets-icons:refund-back" /> */} 
                          Order Canceled
                  
                    </Button>
                  }
                    </>
                }
                    </div> 
                    : null }
                  </Col>
                </Row>
                <DataTable
                  columns={columns}
                  data={transaction?.transactions?.subQuote}
                  responsive
                  className="custom-table"
                />
                <Row className="justify-content-end viewpaymentdetail mt-3">
                  <Col xl={2} lg={4} md={6}>
                    <p>
                      Subtotal{" "}
                      <span>
                        {" "}
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD", // Change to your desired currency
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }).format(transaction?.transactions?.orderDetails?.total_amount)}
                      </span>
                    </p> 
                    {Array.isArray(RefundData) && RefundData.map((row, index) => (
                      <p>
                      <b>Refund {index + 1} {row?.reason &&
                      <>
                       ({formatReason(row?.reason)})
                       </>
                        }
                       </b>
                      <span>
                        {" -"}
                        <Amount amount={row?.refund_amount} />
                      </span>
                    </p>
                    ))}
                    
                    <p>
                      <b>Total Amount</b>{" "}
                      <b>
                        {" "}
                        <Amount amount={transaction?.transactions?.orderDetails?.total_amount - totalRefundAmount} />
                      </b>
                    </p>
                  </Col>
                </Row>
              </CardBody>
            </>
          ) : (
            <Col>
              <p className="text-center mt-4">No Transaction found..</p>{" "}
            </Col>
          )
        ) : (
          <Col>
            <span
              role="status"
              aria-hidden="true"
              className="spinner-border spinner-border-sm text-center"
              style={{
                margin: "0 auto",
                display: "block",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            ></span>
          </Col>
        )}
      </Card>
      <RefundOrder
        show2={modalShow2}
        handleClose2={handleClose2}
        onRefund={onRefund}
        amount={transaction?.transactions?.orderDetails?.total_amount - totalRefundAmount}
        refundBtn={refundBtn}
        RefundloadingLoad={Refundloading}
      />
       <ConfirmationModal
        show={modalShow}
        onHide={handleClose}
        title={"Are you sure?"}
        desc={"If you cancel this order, a full refund will be automatically issued to the user."}
        yesBtnText={"Yes"}
        noBtnText={"No"}
        onConfirm={() => onRefund("cancel","requested_by_customer")}
        loading={Refundloading}
      />
    </React.Fragment>
  );
};
export default ViewPayment;
