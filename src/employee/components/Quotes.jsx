import { Link } from "react-router-dom";
import Amount from "../../components/Amount";
import DateFormat from "./DateFormat";
import { Icon } from "@iconify/react";
import MaterialBadge from "./MaterialBadge";

const QuoteRow = ({ row, EditQuote }) => {
  return (
    <tr>
      <td className="text-nowrap">
        <Link to="" onClick={() => EditQuote(row._id)} className="workorders">
          <b>
            WO#
            {row.search_quote}
          </b>
        </Link>
      </td>
      <td>
        <DateFormat dateString={row.createdAt} />
      </td>
      <td className="text-nowrap">
        <MaterialBadge materialDetails={row?.material_details} />
      </td>
      <td>
        <Amount
          amount={
            parseFloat(row.total_amount || 0) +
            parseFloat(row.total_bend_price || 0)
          }
        />
      </td>
      <td>{row.customer_name}</td>
      <td className="text-end">
        <div className="d-inline-flex align-items-center gap-3">
          <Link className="btnedit" onClick={() => EditQuote(row._id)}>
            <Icon icon="teenyicons:eye-outline" />
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default QuoteRow;
