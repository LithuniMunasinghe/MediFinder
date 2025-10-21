package com.example.pharmacy.repository;

import com.example.pharmacy.entity.Pharmacy;
import com.example.pharmacy.entity.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PharmacyInvetoryRepository extends JpaRepository<Pharmacy, Long> {
    List<Pharmacy> findDistinctByMedicinesIn(List<Medicine> medicines);
}
