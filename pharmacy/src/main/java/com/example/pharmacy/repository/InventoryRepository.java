package com.example.pharmacy.repository;

import com.example.pharmacy.dto.MedicineInventoryDTO;
import com.example.pharmacy.dto.PharmacyDTO;
import com.example.pharmacy.entity.Inventory;
import com.example.pharmacy.entity.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {

    // For searching pharmacies by medicine names
    @Query("SELECT new com.example.pharmacy.dto.PharmacyDTO(p.name, m.name, i.quantity) " +
            "FROM Inventory i JOIN i.pharmacy p JOIN i.medicine m " +
            "WHERE LOWER(m.name) IN :medicineNames")
    List<PharmacyDTO> findPharmaciesByMedicineNames(@Param("medicineNames") List<String> medicineNames);

    // For viewing all medicines in a pharmacy
    @Query("SELECT i.medicine FROM Inventory i WHERE i.pharmacy.id = :pharmacyId")
    List<Medicine> findMedicinesByPharmacyId(@Param("pharmacyId") Long pharmacyId);

    @Query("SELECT new com.example.pharmacy.dto.MedicineInventoryDTO(" +
            "m.id, m.name, m.description, i.quantity, i.price) " +
            "FROM Inventory i " +
            "JOIN i.medicine m " +
            "WHERE i.pharmacy.id = :pharmacyId")
    List<MedicineInventoryDTO> findMedicinesWithInventoryByPharmacy(@Param("pharmacyId") Long pharmacyId);

}
