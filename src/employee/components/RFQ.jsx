import { Link } from "react-router-dom";
import DateFormat from "./DateFormat";
import MaterialBadge from "./MaterialBadge";

const RFQTableRow = ({ row, onAccept, onReject, onEdit }) => {
  return (
    <tr>
      <td className="text-nowrap">
        <Link className="workorders" onClick={() => onAccept(row._id)}>
          <b>WO#{row.search_quote}</b>
        </Link>
      </td>
      <td>
        <DateFormat dateString={row.createdAt} />
      </td>
      <td className="text-nowrap">
        <MaterialBadge materialDetails={row.material_details} />
      </td>
      <td>{/* Add interactive buttons for status change */}</td>
      <td>
        {(row.status === 1 || row.status === 2) && (
          <button className="btn btn-primary" onClick={() => onEdit(row._id)}>
            Edit Quote
          </button>
        )}
      </td>
    </tr>
  );
};
