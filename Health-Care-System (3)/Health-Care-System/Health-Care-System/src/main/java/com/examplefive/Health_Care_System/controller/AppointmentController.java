package com.examplefive.Health_Care_System.controller;

import com.examplefive.Health_Care_System.entity.Appointment;
import com.examplefive.Health_Care_System.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173/") // Make sure this is allowed
@RestController
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @GetMapping(path = "/appointments")
    public List<Appointment> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }

    @GetMapping(path = "/appointments/{appointmentId}")
    public Appointment getAppointmentById(@PathVariable int appointmentId) {
        return appointmentService.getAppointmentById(appointmentId);
    }

    @PostMapping(path = "/add")
    public Appointment bookAppointment(@RequestBody Appointment appointment) {
        return appointmentService.bookAppointment(appointment);
    }

    @DeleteMapping(path = "/appointments/{appointmentId}")
    public void deleteAppointmentById(@PathVariable int appointmentId) {
        appointmentService.deleteAppointmentById(appointmentId);
    }

    @GetMapping(path = "/appointments/doctor/{doctorId}")
    public List<Appointment> getAppointmentByDoctor(@PathVariable int doctorId) {
        return appointmentService.getAppointmentByDoctor(doctorId);
    }
}
