package com.example.pharmacy.repository;

import com.example.pharmacy.entity.Medicine;
import com.example.pharmacy.entity.Pharmacy;
import com.example.pharmacy.entity.PharmacyInventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PharmacyInventoryRepository extends JpaRepository<PharmacyInventory, Long> {

    @Query("SELECT DISTINCT pi.pharmacy FROM PharmacyInventory pi WHERE pi.medicine IN :medicines AND pi.quantity > 0")
    List<Pharmacy> findPharmaciesWithMedicines(@Param("medicines") List<Medicine> medicines);
}
