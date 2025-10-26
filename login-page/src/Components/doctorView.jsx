import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/doctorView.css";
import axios from "axios";
import Swal from "sweetalert2";
import logo from "../images/logo.png";
import { FaUserMd, FaStethoscope, FaMoneyBillWave } from "react-icons/fa"; // Icons

const DoctorTable = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:8083/cw-app/doctors");
        const filteredDoctors = response.data.map(doctor => ({
          id: doctor.doctorId,
          name: doctor.doctorName,
          speciality: doctor.speciality,
          charge: doctor.doctorFee
        }));
        setDoctors(filteredDoctors);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to load doctor data!",
        });
      }
    };

    fetchDoctors();
  }, []);

  const handleBookAppointment = (doctor) => {
    Swal.fire({
      title: `Book Appointment with Dr. ${doctor.name}?`,
      text: `Speciality: ${doctor.speciality}\nFee: LKR ${doctor.charge}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, book now!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/appointment", {
          state: {
            doctorId: doctor.id,
            doctorName: doctor.name,
            speciality: doctor.speciality,
            doctorCharge: doctor.charge,
          },
        });
        Swal.fire({
          icon: "success",
          title: "Redirecting...",
          text: `Booking page for Dr. ${doctor.name}`,
          timer: 1200,
          showConfirmButton: false
        });
      }
    });
  };

  return (
    <div className="wrapper">
      {/* Navbar */}
      <header className="navbar">
        <div className="logo-container">
          <img src={logo} alt="Medicure Logo" className="logo-img" />
        </div>
        <ul className="nav-links">
          <li><a href="/home">Home</a></li>
          <li><a href="/about">About us</a></li>
          <li><a href="/doctorView" className="active">Doctors</a></li>
          <li><a href="/feedback">Feedback</a></li>
          <li><a href="/location">Location</a></li>
          <li><a href="/med">MediFinder</a></li>
          <li><a href="/medicineSearch">Medicine Search</a></li>
          <li><a href="/loginRegister">Logout</a></li>
        </ul>
      </header>

      <div className="doctor-table-container">
        <h2>Our Doctors</h2>
        <div className="cards-container">
          {doctors.map((doctor) => (
            <div className="doctor-card" key={doctor.id}>
              <FaUserMd className="doctor-icon" />
              <h3>{doctor.name}</h3>
              <p><FaStethoscope className="card-icon" /> {doctor.speciality}</p>
              <p><FaMoneyBillWave className="card-icon" /> LKR {doctor.charge}</p>
              <button
                className="appointment-btn"
                onClick={() => handleBookAppointment(doctor)}
              >
                Book Appointment
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorTable;
