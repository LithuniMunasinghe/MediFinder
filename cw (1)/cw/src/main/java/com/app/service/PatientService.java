package com.app.service;

import com.app.entity.Patient;
import com.app.repository.PatientRepository;
import com.app.requests.Login;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    // For getting all patient details
    public List<Patient> getAllPatient() {
        return patientRepository.findAll();
    }

    // For patient signup (creating a new patient)
    public Patient createPatient(Patient patient) {
        return patientRepository.save(patient);
    }

    // Login method for user authentication
    public Boolean loginUser(Login login) {
        // Fetch patient by username
        Patient patient = patientRepository.findByUserName(login.getUserName());

        // If patient is not found, return false
        if (patient == null) {
            return false;
        }

        // Retrieve stored password & compare with user input
        return patient.getPassword().equals(login.getPassword());
    }

    // Method to update patient details
    public Patient updatePatient(int id, Patient patient) {
        Optional<Patient> existingPatient = patientRepository.findById(id);
        if (existingPatient.isPresent()) {
            Patient updatedPatient = existingPatient.get();
            updatedPatient.setName(patient.getName());
            updatedPatient.setAge(patient.getAge());
            updatedPatient.setAddress(patient.getAddress());
            updatedPatient.setNumber(patient.getNumber());
            updatedPatient.setEmail(patient.getEmail());
            updatedPatient.setUserName(patient.getUserName());
            updatedPatient.setPassword(patient.getPassword());
            return patientRepository.save(updatedPatient);
        }

        return null;  // If the patient doesn't exist
    }

    // Method to delete a patient
    public void deletePatient(int id) {
        patientRepository.deleteById(id);
    }
}
