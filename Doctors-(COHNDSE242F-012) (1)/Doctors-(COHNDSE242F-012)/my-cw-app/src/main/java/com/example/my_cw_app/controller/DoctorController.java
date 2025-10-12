package com.example.my_cw_app.controller;

import com.example.my_cw_app.entity.Doctor;
import com.example.my_cw_app.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @GetMapping(path = "/doctors")
    public List<Doctor> getDoctors() {
        return doctorService.getDoctors();
    }

    @GetMapping(path = "/doctors/{doctorId}")
    public Doctor getDoctorById(@PathVariable int doctorId) {
        return doctorService.getDoctorById(doctorId);
    }

    @PostMapping(path = "/doctors")
    public Doctor createDoctor(@RequestBody Doctor doctor) {
        return doctorService.createDoctor(doctor);
    }

    @PutMapping(path = "/doctors/{doctorId}")
    public Doctor updateDoctor(@PathVariable int doctorId, @RequestBody Doctor doctor) {
        return doctorService.updateDoctor(doctorId, doctor);
    }

    @DeleteMapping(path = "/doctors/{doctorId}")
    public void deleteDoctorById(@PathVariable int doctorId) {
        doctorService.deleteById(doctorId);
    }

    @GetMapping(path = "/doctors", params = "doctorName")
    public List<Doctor> searchDoctors(@RequestParam String doctorName) {
        return doctorService.searchDoctors(doctorName);
    }

    @GetMapping(path = "/doctors", params = {"doctorName", "speciality"})
    public List<Doctor> searchDoctorsByNameSpeciality(@RequestParam String doctorName, @RequestParam String speciality) {
        return doctorService.searchDoctorsByNameSpeciality(doctorName, speciality);
    }
}
