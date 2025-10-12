package com.example.my_cw_app.service;

import com.example.my_cw_app.entity.Doctor;
import com.example.my_cw_app.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    public List<Doctor> getDoctors() {
        return doctorRepository.findAll();
    }

    public Doctor getDoctorById(int doctorId) {
        Optional<Doctor> doc = doctorRepository.findById(doctorId);
        return doc.orElse(null);
    }

    public Doctor createDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    public void deleteById(int doctorId) {
        doctorRepository.deleteById(doctorId);
    }

    public Doctor updateDoctor(int doctorId, Doctor doctor) {
        Optional<Doctor> doc = doctorRepository.findById(doctorId);

        if (doc.isPresent()) {
            Doctor existingDoc = doc.get();
            existingDoc.setDoctorName(doctor.getDoctorName());
            existingDoc.setSpeciality(doctor.getSpeciality());
            existingDoc.setDoctorFee(doctor.getDoctorFee());
            existingDoc.setPhone(doctor.getPhone());
            existingDoc.setEmail(doctor.getEmail());
            return doctorRepository.save(existingDoc);
        }
        return null;
    }

    public List<Doctor> searchDoctors(String doctorName) {
        return doctorRepository.searchDoctors(doctorName);
    }

    public List<Doctor> searchDoctorsByNameSpeciality(String doctorName, String speciality) {
        return doctorRepository.searchDoctorsByNameSpeciality(doctorName, speciality);
    }
}
