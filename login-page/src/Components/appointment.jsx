import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/appointment.css";
import axios from "axios";
import Swal from "sweetalert2";

const AppointmentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { doctorId, doctorName, speciality, doctorCharge } = location.state || {};

  const [patientName, setPatientName] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [contact, setContact] = useState("");

  useEffect(() => {
    console.log("Received doctor details:", location.state);
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!doctorId || !doctorName || !speciality || !doctorCharge) {
      Swal.fire({
        icon: "error",
        title: "Missing Details",
        text: "Doctor details are not available.",
      });
      return;
    }

    const appointmentData = {
      doctorId,
      doctorName,
      speciality,
      patientName,
      contact,
      doctorFee: doctorCharge,
      appointmentDate,
    };

    try {
      await axios.post("http://localhost:8082/rest-app/add", appointmentData);
      
      Swal.fire({
        icon: "success",
        title: "Appointment Booked!",
        text: `Your appointment with Dr. ${doctorName} on ${appointmentDate} has been successfully booked.`,
        timer: 2500,
        showConfirmButton: false,
      });

      setPatientName("");
      setAppointmentDate("");
      setContact("");

    } catch (error) {
      console.error("Error booking appointment:", error);
      Swal.fire({
        icon: "error",
        title: "Booking Failed",
        text: "There was an error booking your appointment. Please try again.",
      });
    }
  };

  return (
    <>
      <button className="back-btn" onClick={() => navigate("/doctorView")}>
        &larr; Go Back
      </button>

      <div className="appointment-wrapper">
        <form onSubmit={handleSubmit} className="appointment-form">
          <div className="form-group">
            <label htmlFor="doctorId">Doctor ID:</label>
            <input type="text" id="doctorId" value={doctorId || ""} disabled />
          </div>
          <div className="form-group">
            <label htmlFor="doctorName">Doctor Name:</label>
            <input type="text" id="doctorName" value={doctorName || ""} disabled />
          </div>
          <div className="form-group">
            <label htmlFor="speciality">Speciality:</label>
            <input type="text" id="speciality" value={speciality || ""} disabled />
          </div>
          <div className="form-group">
            <label htmlFor="patientName">Patient Name:</label>
            <input
              type="text"
              id="patientName"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contact">Contact Number:</label>
            <input
              type="text"
              id="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="doctorCharge">Doctor's Charge (LKR):</label>
            <input type="number" id="doctorCharge" value={doctorCharge || ""} disabled />
          </div>
          <div className="form-group">
            <label htmlFor="appointmentDate">Appointment Date:</label>
            <input
              type="date"
              id="appointmentDate"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            Book Appointment
          </button>
        </form>
      </div>
    </>
  );
};

export default AppointmentPage;
