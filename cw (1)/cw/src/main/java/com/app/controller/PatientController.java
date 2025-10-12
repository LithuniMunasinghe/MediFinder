package com.app.controller;

import com.app.entity.Patient;
import com.app.requests.Login;
import com.app.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")  // Corrected Cross-Origin URL

@RestController
public class PatientController {

    @Autowired
    private PatientService patientService;

    // View all patients' details
    @GetMapping(path = "/patients")
    public List<Patient> getAllPatient() {
        return patientService.getAllPatient();
    }

    // Create a new patient (sign up)
    @PostMapping(path = "/patients")
    public Patient createPatient(@RequestBody Patient patient) {
        return patientService.createPatient(patient);
    }

    // Login for a user
    @PostMapping("/loginUser")
    public Map<String, Boolean> loginUser(@RequestBody Login login) {
        // Call the loginUser method in the service
        Boolean loginSuccess = patientService.loginUser(login);

        // Prepare the response map
        Map<String, Boolean> response = new HashMap<>();
        response.put("success", loginSuccess);  // Store the result in the response map

        // Return the response map as JSON
        return response;
    }

    // Update patient details
    @PutMapping(path = "/patients/{id}")
    public Patient updatePatient(@PathVariable("id") int id, @RequestBody Patient patient) {
        return patientService.updatePatient(id, patient);
    }

    // Delete a patient
    @DeleteMapping(path = "/patients/{id}")
    public void deletePatient(@PathVariable("id") int id) {
        patientService.deletePatient(id);
    }
}
