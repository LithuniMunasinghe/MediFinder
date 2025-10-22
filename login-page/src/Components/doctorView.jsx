import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/doctorView.css";
import axios from "axios";
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
      }
    };

    fetchDoctors();
  }, []);

  const handleBookAppointment = (doctor) => {
    navigate("/appointment", {
      state: {
        doctorId: doctor.id,
        doctorName: doctor.name,
        speciality: doctor.speciality,
        doctorCharge: doctor.charge,
      },
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
              <button className="appointment-btn" onClick={() => handleBookAppointment(doctor)}>
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
