import React, { useState, useEffect } from "react";
import { Table, Button, Alert, Spinner, Modal, Form } from "react-bootstrap";
import { FaStore, FaTrash, FaEdit, FaArrowLeft, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "../css/adminPharmacy.css";

const PharmacyManagement = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);

  const [newPharmacy, setNewPharmacy] = useState({
    name: "",
    address: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();

  // Fetch pharmacies
  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8084/api/pharmacies");
        setPharmacies(response.data);
      } catch (error) {
        console.error("Error fetching pharmacies:", error);
        setError("There was an error fetching the pharmacies data.");
      } finally {
        setLoading(false);
      }
    };
    fetchPharmacies();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPharmacy((prev) => ({ ...prev, [name]: value }));
  };

  // Add Pharmacy
  const handleAddPharmacy = async () => {
    if (!newPharmacy.name || !newPharmacy.address || !newPharmacy.phone || !newPharmacy.password) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "All fields are required!",
      });
      return;
    }
    try {
      const response = await axios.post("http://localhost:8084/api/pharmacies/add", newPharmacy);
      setPharmacies([...pharmacies, response.data]);
      setShowAddModal(false);
      setNewPharmacy({ name: "", address: "", phone: "", password: "" });
      Swal.fire({
        icon: "success",
        title: "Added!",
        text: "Pharmacy added successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error adding pharmacy:", error);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Could not add pharmacy. Check console for details.",
      });
    }
  };

  // Open Edit Modal
  const openEditModal = (pharmacy) => {
    setSelectedPharmacy(pharmacy);
    setNewPharmacy({
      name: pharmacy.name,
      address: pharmacy.address,
      phone: pharmacy.phone,
      password: pharmacy.password || "",
    });
    setShowEditModal(true);
  };

  // Update Pharmacy
  const handleUpdatePharmacy = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8084/api/pharmacies/${selectedPharmacy.id}`,
        newPharmacy
      );
      setPharmacies((prev) =>
        prev.map((ph) => (ph.id === selectedPharmacy.id ? response.data : ph))
      );
      setShowEditModal(false);
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Pharmacy updated successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error updating pharmacy:", error);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Could not update pharmacy. Check console for details.",
      });
    }
  };

  // Delete Pharmacy
  const handleDeletePharmacy = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the pharmacy.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8084/api/pharmacies/${id}`);
        setPharmacies(pharmacies.filter((ph) => ph.id !== id));
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Pharmacy deleted successfully.",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Error deleting pharmacy:", error);
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Could not delete pharmacy. Check console for details.",
        });
      }
    }
  };

  return (
    <div className="pharmacy-wrapper">
      <div className="header-buttons d-flex justify-content-between align-items-center mb-3">
        <Button variant="outline-secondary" onClick={() => navigate("/Admin")}>
          <FaArrowLeft /> Back to Home
        </Button>
        <Button variant="success" onClick={() => setShowAddModal(true)}>
          <FaPlus /> Add Pharmacy
        </Button>
      </div>

      <h2 className="mb-3">Pharmacy List</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : pharmacies.length === 0 ? (
        <Alert variant="info">No pharmacies available at the moment.</Alert>
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Pharmacy</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pharmacies.map((pharmacy, index) => (
                <tr key={pharmacy.id}>
                  <td><FaStore className="text-success me-2" /> {pharmacy.name}</td>
                  <td>{pharmacy.address}</td>
                  <td>{pharmacy.phone}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => openEditModal(pharmacy)}
                    ><FaEdit /></Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDeletePharmacy(pharmacy.id)}
                    ><FaTrash /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {/* Add Pharmacy Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Pharmacy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {["name", "address", "phone", "password"].map((field) => (
              <Form.Group className="mb-3" key={field}>
                <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
                <Form.Control
                  type={field === "password" ? "password" : "text"}
                  name={field}
                  value={newPharmacy[field]}
                  onChange={handleInputChange}
                />
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleAddPharmacy}>Add Pharmacy</Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Pharmacy Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Pharmacy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {["name", "address", "phone", "password"].map((field) => (
              <Form.Group className="mb-3" key={field}>
                <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
                <Form.Control
                  type={field === "password" ? "password" : "text"}
                  name={field}
                  value={newPharmacy[field]}
                  onChange={handleInputChange}
                />
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleUpdatePharmacy}>Update Pharmacy</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PharmacyManagement;
