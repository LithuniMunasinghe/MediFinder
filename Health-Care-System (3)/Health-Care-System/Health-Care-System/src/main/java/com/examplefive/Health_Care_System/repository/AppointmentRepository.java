package com.examplefive.Health_Care_System.repository;

import com.examplefive.Health_Care_System.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;



public interface AppointmentRepository extends JpaRepository<Appointment,Integer> {

    List<Appointment>findByDoctorId(Integer doctorId);

}
