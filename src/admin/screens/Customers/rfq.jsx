import { useLocation } from "react-router-dom";

const AdminCustomerRFQ = () => {
    const location = useLocation();
    const { name, email } = location.state || {};
    return (
        <div>
      <h1>Create RFQ</h1>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
    </div>
    );
}
export default AdminCustomerRFQ;