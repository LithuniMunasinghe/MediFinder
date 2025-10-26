import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "../css/book.css";
import { Button } from "react-bootstrap";

const AppointmentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { doctorName } = location.state || {};

  const [appointments, setAppointments] = useState([]);

  // Fetch all appointments
  useEffect(() => {
    axios
      .get("http://localhost:8082/rest-app/appointments")
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error fetching appointments. Please try again.",
        });
      });
  }, []);

  // Cancel appointment
  const handleCancelAppointment = async (appointmentId) => {
    try {
      await axios.delete(
        `http://localhost:8082/rest-app/appointments/${appointmentId}`
      );
      setAppointments(
        appointments.filter(
          (appointment) => appointment.appointmentId !== appointmentId
        )
      );
      Swal.fire({
        icon: "success",
        title: "Cancelled!",
        text: "Appointment cancelled successfully!",
      });
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error cancelling appointment. Please try again.",
      });
    }
  };

  return (
    <div className="appointment-wrapper">
      <div className="appointment-card">
        <div className="appointment-header">
          <h2>
            Appointments for Dr.{" "}
            {doctorName || (appointments[0] && appointments[0].doctorName)}
          </h2>
        </div>

        <div className="button-container">
          <Button
            variant="outline-primary"
            onClick={() => navigate("/DoctorView")}
          >
            Book Appointments
          </Button>
        </div>

        <h3 className="table-title">All Appointments</h3>
        <table className="appointment-table">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Doctor Name</th>
              <th>Speciality</th>
              <th>Contact Number</th>
              <th>Appointment Date</th>
              <th>Doctor Charge (LKR)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.appointmentId}>
                <td>{appointment.patientName}</td>
                <td>{appointment.doctorName}</td>
                <td>{appointment.speciality}</td>
                <td>{appointment.contact}</td>
                <td>{appointment.appointmentDate}</td>
                <td>{appointment.doctorFee}</td>
                <td>
                  <Button
                    variant="outline-danger"
                    className="cancel-btn"
                    onClick={() =>
                      Swal.fire({
                        title: "Are you sure?",
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#d33",
                        cancelButtonColor: "#3085d6",
                        confirmButtonText: "Yes, cancel it!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          handleCancelAppointment(appointment.appointmentId);
                        }
                      })
                    }
                    size="sm"
                  >
                    Cancel
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentPage;
