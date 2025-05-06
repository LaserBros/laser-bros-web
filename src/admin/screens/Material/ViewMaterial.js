import React, { useEffect, useState } from "react";
import { Table, Button, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import { deleteMaterialAdmin, ViewMaterialAdmin } from "../../../api/api";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationModal from "../../../components/ConfirmationModal";
import { toast } from "react-toastify";

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

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="container mt-4">
      <h2>Material List</h2>
      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Material Grade</th>
            {/* <th>Background Color</th> */}
            <th>Thickness</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {materials.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                No materials found.
              </td>
            </tr>
          ) : (
            materials.map((material, index) => (
              <tr key={material._id}>
                <td>{index + 1}</td>
                <td>{material.material_grade}</td>
                {/* <td>
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      backgroundColor: material.background_color,
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  ></div>
                </td> */}
                <td>{material.material_thickness}</td>
                <td>
                  <Link
                    variant="info"
                    size="sm"
                    className="me-2"
                    to={`/admin/view-material/`+material._id}
                  >
                    View
                  </Link>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(material._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
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
    </div>
  );
};

export default ViewMaterialPage;
