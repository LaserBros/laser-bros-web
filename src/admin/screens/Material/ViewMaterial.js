import React, { useEffect, useState } from "react";
import { Table, Button, Spinner, Alert, Card, CardHeader, CardBody } from "react-bootstrap";
import axios from "axios";
import { deleteMaterialAdmin, ViewMaterialAdmin } from "../../../api/api";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationModal from "../../../components/ConfirmationModal";
import { toast } from "react-toastify";
import DataTable from "react-data-table-component";
import { Icon } from "@iconify/react/dist/iconify.js";

const ViewMaterialPage = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
    const [id,setId] = useState();
      const handleClose = () => setModalShow(false);
      const [modalShow, setModalShow] = useState(false);
      const [loadingBtn, setLoadingBtn] = useState(false);
  const fetchMaterials = async () => {
    try {
      const res = await ViewMaterialAdmin();
      setMaterials(res.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch materials.");
      setLoading(false);
    }
  };
  const changeStatus = async () => {
    try {
        setLoadingBtn(true);
        const res = await deleteMaterialAdmin(id);
        fetchMaterials();
        setLoadingBtn(false);
        setModalShow(false)
    } catch (error) {
        setLoadingBtn(false);
        setModalShow(false)
        toast.error("Something wents wrong!")
    }
  }
  const handleDelete = async (id) => {
    setId(id);
    setModalShow(true); 
  };
  const navigate = useNavigate();

//   const handleView = (material) => {
//     alert(`Viewing Material:\n\n${JSON.stringify(material, null, 2)}`);
//   };

  useEffect(() => {
    fetchMaterials();
  }, []);
  const columns = [
      {
        name: "Material Grade",
        selector: (row) => row.material_grade,
        sortable: true,
      },
      {
        name: "Thickness",
        selector: (row) => row.material_thickness,
        width: "700px",
        sortable: true,
      },
  
      {
        name: "Actions",
        cell: (row) => (
          <>
            <Link className="btnview" to={`/admin/view-material/`+row._id}>
              <Icon icon="tabler:edit"></Icon>
            </Link>
            <Link className="btndelete" onClick={() => handleDelete(row._id)}>
              <Icon icon="tabler:trash"></Icon>
            </Link>
          </>
        ),
      },
    ];

  return (
<React.Fragment>
      <Card>
      <CardHeader className="d-flex align-items-center justify-content-between">
          <h5>Material List</h5>
            <Button onClick={() => navigate("/admin/view-material/material-form")}>Add Material</Button>
        </CardHeader>
        <CardBody>
          {!loading ? (
            <>
              <DataTable
                columns={columns}
                data={materials}
                responsive
                pagination={false}
                className="custom-table"
              />
            </>
          ) : (
            <>
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
            </>
          )}
        </CardBody>
      </Card>

      <ConfirmationModal
        show={modalShow}
        onHide={handleClose}
        title={"Are you sure?"}
        desc={"Do you want to delete this material?"}
        yesBtnText={"Yes"}
        noBtnText={"No"}
        onConfirm={changeStatus}
        loading={loadingBtn}
      />
   </React.Fragment>
  );
};

export default ViewMaterialPage;
