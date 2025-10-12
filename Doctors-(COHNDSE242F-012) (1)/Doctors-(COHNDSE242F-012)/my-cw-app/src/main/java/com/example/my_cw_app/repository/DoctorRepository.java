package com.example.my_cw_app.repository;

import com.example.my_cw_app.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Integer> {

    @Query("select d from Doctor d where d.doctorName=?1")
     List<Doctor> searchDoctors(String doctorName);

    @Query("select d from Doctor d where d.doctorName=?1 AND d.speciality=?2")
     List<Doctor> searchDoctorsByNameSpeciality(String doctorName,String speciality);

}
