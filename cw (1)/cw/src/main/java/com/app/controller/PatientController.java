package com.app.controller;

import com.app.entity.Patient;
import com.app.requests.Login;
import com.app.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class PatientController {

    @Autowired
    private PatientService patientService;

    // View all patients' details
    @GetMapping("/patients")
    public List<Patient> getAllPatient() {
        return patientService.getAllPatient();
    }

    // Create a new patient (sign up)
    @PostMapping("/patients")
    public Patient createPatient(@RequestBody Patient patient) {
        return patientService.createPatient(patient);
    }

    // Login for a user
    @PostMapping("/loginUser")
    public Map<String, Boolean> loginUser(@RequestBody Login login) {
        Boolean loginSuccess = patientService.loginUser(login);
        Map<String, Boolean> response = new HashMap<>();
        response.put("success", loginSuccess);
        return response;
    }

    // Update patient details
    @PutMapping("/patients/{id}")
    public Patient updatePatient(@PathVariable("id") int id, @RequestBody Patient patient) {
        return patientService.updatePatient(id, patient);
    }

    // Delete a patient
    @DeleteMapping("/patients/{id}")
    public void deletePatient(@PathVariable("id") int id) {
        patientService.deletePatient(id);
    }

    // Verify if a user exists by username and email
    @PostMapping("/my-app/verifyUser")
    public ResponseEntity<?> verifyUser(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String email = request.get("email");

        Patient patient = patientService.findByUserNameAndEmail(username, email);

        if (patient == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("exists", false));
        }

        return ResponseEntity.ok(Map.of("exists", true));
    }

    // Reset password if user verified
    @PutMapping("/my-app/resetPassword")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String email = request.get("email");
        String newPassword = request.get("newPassword");

        Patient patient = patientService.findByUserNameAndEmail(username, email);

        if (patient == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "User not found with given username and email"));
        }

        patient.setPassword(newPassword);
        patientService.savePatient(patient);

        return ResponseEntity.ok(Map.of("message", "Password reset successful"));
    }
}
