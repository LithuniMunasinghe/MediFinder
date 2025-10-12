package com.examplefive.Health_Care_System.service;

import com.examplefive.Health_Care_System.entity.Appointment;
import com.examplefive.Health_Care_System.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {
    @Autowired
private AppointmentRepository appointmentRepository;
public List<Appointment> getAppointments()
{
  return appointmentRepository.findAll();
}
public Appointment getAppointmentById(int appointmentId)
{
    Optional <Appointment>appo=
            appointmentRepository.findById(appointmentId);
    if(appo.isPresent())

    {
        return appo.get();
    }
    return null;
       }

       public Appointment bookAppointment(Appointment appointment)
       {
           return appointmentRepository.save(appointment);
       }
       public List<Appointment> getAppointmentByDoctor(int doctorId)
       {
           return appointmentRepository.findByDoctorId(doctorId);
       }

       public Appointment deleteAppointmentById(int appointmentId)
       {
          appointmentRepository.deleteById(appointmentId);
          return null;
       }
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }




}


