import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserMd, FaUsers, FaCalendarCheck, FaClinicMedical } from "react-icons/fa";
import "../css/admin.css";

const AdminHomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-container">
      <div className="admin-card">
        <header className="admin-header">
          <h1>Admin Dashboard</h1>
        </header>

        <section className="admin-content">
          <h2>Welcome, Admin!</h2>
          <p>Manage Users, Doctors, Appointments</p>

          <div className="management-section">
            {/* Manage Doctors */}
            <div className="manage-box" onClick={() => navigate("/manageDoctor")}>
              <FaUserMd size={40} className="icon doctor" />
              <h3>Manage Doctors</h3>
            </div>

            {/* Manage Users */}
            <div className="manage-box" onClick={() => navigate("/manageUsers")}>
              <FaUsers size={40} className="icon users" />
              <h3>Manage Users</h3>
            </div>

            {/* Manage Appointments */}
            <div className="manage-box" onClick={() => navigate("/manageAppointments")}>
              <FaCalendarCheck size={40} className="icon appointments" />
              <h3>Manage Appointments</h3>
            </div>
          </div>
          
            {/* Manage Pharmacies */}
            <div className="manage-box" onClick={() => navigate("/AdminPharmacyManage")}>
              <FaClinicMedical size={40} className="icon pharmacy" />
              <h3>Manage Pharmacy</h3>
            </div>

          <button className="logout-btn" onClick={() => navigate("/loginRegister")}>Logout</button>
        </section>
      </div>
    </div>
  );
};

export default AdminHomePage;
