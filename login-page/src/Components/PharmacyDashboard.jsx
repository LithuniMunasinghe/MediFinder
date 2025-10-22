import React, { useEffect, useState } from "react";
import "../css/pharmacyDashboard.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const PharmacyDashboard = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMedicine, setNewMedicine] = useState({
    medicineName: "",
    medicineDescription: "",
    quantity: "",
    price: "",
  });
  const [editMedicine, setEditMedicine] = useState(null);

  const navigate = useNavigate();
  const pharmacyId = localStorage.getItem("pharmacyId");
  const pharmacyName = localStorage.getItem("pharmacyName");

  useEffect(() => {
    if (!pharmacyId) {
      Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "Please log in first.",
      });
      navigate("/pharmacyLogin");
      return;
    }
    fetchMedicines();
  }, [pharmacyId, navigate]);

  // Fetch medicines
  const fetchMedicines = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8084/api/pharmacies/${pharmacyId}/medicines`
      );
      setMedicines(response.data);
    } catch (error) {
      console.error("Error fetching medicines:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load medicines.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.clear();
    Swal.fire({
      icon: "success",
      title: "Logged Out",
      timer: 1000,
      showConfirmButton: false,
    });
    navigate("/pharmacyLogin");
  };

  // Add medicine
  const handleAddMedicine = async (e) => {
    e.preventDefault();

    if (
      !newMedicine.medicineName ||
      !newMedicine.medicineDescription ||
      !newMedicine.quantity ||
      !newMedicine.price
    ) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill all fields.",
      });
      return;
    }

    try {
      await axios.post(
        `http://localhost:8084/api/pharmacies/${pharmacyId}/add-medicine`,
        newMedicine
      );

      Swal.fire({
        icon: "success",
        title: "Medicine Added!",
        timer: 1200,
        showConfirmButton: false,
      });

      setShowAddModal(false);
      setNewMedicine({
        medicineName: "",
        medicineDescription: "",
        quantity: "",
        price: "",
      });
      fetchMedicines();
    } catch (error) {
      console.error("Error adding medicine:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to Add",
        text: "Please try again.",
      });
    }
  };

  // Update medicine
  const handleUpdateMedicine = async (id) => {
    if (!editMedicine) return;

    try {
      await axios.put(
        `http://localhost:8084/api/pharmacies/${pharmacyId}/update-medicine/${id}`,
        editMedicine
      );

      Swal.fire({
        icon: "success",
        title: "Updated Successfully!",
        timer: 1200,
        showConfirmButton: false,
      });

      setEditMedicine(null);
      fetchMedicines();
    } catch (error) {
      console.error("Error updating medicine:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Please try again.",
      });
    }
  };

  // Delete medicine
  const handleDeleteMedicine = async (id) => {
    const confirm = await Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "This will permanently delete the medicine.",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(
          `http://localhost:8084/api/pharmacies/${pharmacyId}/delete-medicine/${id}`
        );

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          timer: 1000,
          showConfirmButton: false,
        });

        setMedicines(medicines.filter((med) => med.id !== id));
      } catch (error) {
        console.error("Error deleting medicine:", error);
        Swal.fire({
          icon: "error",
          title: "Delete Failed",
          text: "Please try again.",
        });
      }
    }
  };

  return (
    <div className="pharmacy-dashboard">
      <header className="dashboard-header">
        <h1>{pharmacyName} Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </header>

      <div className="dashboard-actions">
        <button onClick={() => setShowAddModal(true)}>➕ Add Medicine</button>
      </div>

      <div className="dashboard-table">
        <h2>Medicines Available</h2>
        {loading ? (
          <p className="loading">Loading...</p>
        ) : medicines.length === 0 ? (
          <p className="no-data">No medicines found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Medicine Name</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Price (Rs.)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map((med) =>
                editMedicine && editMedicine.id === med.id ? (
                  <tr key={med.id}>
                    <td>
                      <input
                        type="text"
                        value={editMedicine.medicineName}
                        onChange={(e) => setEditMedicine({ ...editMedicine, medicineName: e.target.value })}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={editMedicine.medicineDescription}
                        onChange={(e) => setEditMedicine({ ...editMedicine, medicineDescription: e.target.value })}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={editMedicine.quantity}
                        onChange={(e) => setEditMedicine({ ...editMedicine, quantity: e.target.value })}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={editMedicine.price}
                        onChange={(e) => setEditMedicine({ ...editMedicine, price: e.target.value })}
                      />
                    </td>
                    <td>
                      <button className="save-btn" onClick={() => handleUpdateMedicine(med.id)}>Save</button>
                      <button className="cancel-btn" onClick={() => setEditMedicine(null)}>Cancel</button>
                    </td>
                  </tr>
                ) : (
                  <tr key={med.id}>
                    <td>{med.medicineName}</td>
                    <td>{med.medicineDescription}</td>
                    <td>{med.quantity}</td>
                    <td>{med.price}</td>
                    <td>
                      <button className="edit-btn" onClick={() => setEditMedicine(med)}>✏️ Edit</button>
                      <button className="delete-btn" onClick={() => handleDeleteMedicine(med.id)}>🗑️ Delete</button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Medicine Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add Medicine</h3>
            <form onSubmit={handleAddMedicine}>
              <input
                type="text"
                placeholder="Medicine Name"
                value={newMedicine.medicineName}
                onChange={(e) => setNewMedicine({ ...newMedicine, medicineName: e.target.value })}
              />
              <input
                type="text"
                placeholder="Description"
                value={newMedicine.medicineDescription}
                onChange={(e) => setNewMedicine({ ...newMedicine, medicineDescription: e.target.value })}
              />
              <input
                type="number"
                placeholder="Quantity"
                value={newMedicine.quantity}
                onChange={(e) => setNewMedicine({ ...newMedicine, quantity: e.target.value })}
              />
              <input
                type="number"
                placeholder="Price (Rs)"
                value={newMedicine.price}
                onChange={(e) => setNewMedicine({ ...newMedicine, price: e.target.value })}
              />
              <div className="modal-buttons">
                <button type="submit" className="save-btn">Add</button>
                <button type="button" className="cancel-btn" onClick={() => setShowAddModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PharmacyDashboard;
