const OrderStatus = ({ status }) => {
  return status == 0
    ? "New"
    : status == 1
    ? "In Progress"
    : status == 3
    ? "Order Completed"
    : status == 2
    ? "Under Shipping Process"
    : status == 3
    ? "Delivered"
    : "";
};
export default OrderStatus;
