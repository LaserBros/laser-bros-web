const OrderStatus = ({ status }) => {
  return status == 0
    ? "Order Received"
    : status == 1
    ? "In Progress"
    : status == 3
    ? "Order Completed"
    : status == 2
    ? "Ready For Shipping"
    : status == 3
    ? "Delivered"
    : ""; 
};
export default OrderStatus;
