package com.example.pharmacy.controller;

import com.example.pharmacy.dto.InventoryDTO;
import com.example.pharmacy.dto.MedicineInventoryDTO;
import com.example.pharmacy.dto.PharmacyDTO;
import com.example.pharmacy.entity.Inventory;
import com.example.pharmacy.entity.Medicine;
import com.example.pharmacy.entity.Pharmacy;
import com.example.pharmacy.repository.InventoryRepository;
import com.example.pharmacy.repository.MedicineRepository;
import com.example.pharmacy.repository.PharmacyRepository;
import com.example.pharmacy.service.PharmacyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/pharmacies")
@CrossOrigin(origins = "*")
public class PharmacyController {

    private final PharmacyService pharmacyService;

    public PharmacyController(PharmacyService pharmacyService) {
        this.pharmacyService = pharmacyService;
    }

    //add pharmacies
    @PostMapping("/add")
    public Pharmacy addPharmacy(@RequestBody Pharmacy pharmacy) {
        return pharmacyService.addPharmacy(pharmacy);
    }

    //add medicine to pharmacy
    @PostMapping("/{pharmacyId}/add-medicine")
    public Inventory addMedicineToPharmacy(
            @PathVariable Long pharmacyId,
            @RequestBody InventoryDTO inventoryDTO) {
        return pharmacyService.addMedicineToPharmacy(pharmacyId, inventoryDTO);
    }

    // Get all medicines in a pharmacy
    @GetMapping("/{pharmacyId}/medicines")
    public List<MedicineInventoryDTO> getMedicinesInPharmacy(@PathVariable Long pharmacyId) {
        return pharmacyService.getMedicinesInPharmacy(pharmacyId);
    }

    // Search pharmacies by medicine names
    @GetMapping("/search")
    public List<PharmacyDTO> searchPharmacies(@RequestParam String medicines) {
        List<String> medicineList = Arrays.stream(medicines.split(","))
                .map(String::trim)
                .collect(Collectors.toList());
        return pharmacyService.searchPharmaciesByMedicineNames(medicineList);
    }

    // Update existing pharmacy
    @PutMapping("/{pharmacyId}")
    public Pharmacy updatePharmacy(@PathVariable Long pharmacyId, @RequestBody Pharmacy pharmacy) {
        return pharmacyService.updatePharmacy(pharmacyId, pharmacy);
    }

    // Delete a pharmacy
    @DeleteMapping("/{pharmacyId}")
    public void deletePharmacy(@PathVariable Long pharmacyId) {
        pharmacyService.deletePharmacy(pharmacyId);
    }

    // View all pharmacies
    @GetMapping("/all/pharmacies")
    public List<Pharmacy> getAllPharmacies() {
        return pharmacyService.getAllPharmacies();
    }

    // Update medicine in a pharmacy
    @PutMapping("/{pharmacyId}/update-medicine/{inventoryId}")
    public Inventory updateMedicine(@PathVariable Long pharmacyId,
                                    @PathVariable Long inventoryId,
                                    @RequestBody InventoryDTO dto) {
        return pharmacyService.updateMedicineInPharmacy(pharmacyId, inventoryId, dto);
    }

}

