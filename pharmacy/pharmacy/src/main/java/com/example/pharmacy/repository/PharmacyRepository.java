package com.example.pharmacy.repository;

import com.example.pharmacy.entity.Pharmacy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PharmacyRepository extends JpaRepository<Pharmacy, Long> {

    @Query("SELECT DISTINCT pi.pharmacy FROM PharmacyInventory pi WHERE pi.medicine.name IN :names")
    List<Pharmacy> findPharmaciesByMedicineNames(@Param("names") List<String> names);

}
