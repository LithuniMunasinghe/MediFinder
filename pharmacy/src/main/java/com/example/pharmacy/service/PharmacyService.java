package com.example.pharmacy.service;

import com.example.pharmacy.dto.InventoryDTO;
import com.example.pharmacy.dto.MedicineInventoryDTO;
import com.example.pharmacy.dto.PharmacyDTO;
import com.example.pharmacy.entity.Inventory;
import com.example.pharmacy.entity.Medicine;
import com.example.pharmacy.entity.Pharmacy;
import com.example.pharmacy.repository.InventoryRepository;
import com.example.pharmacy.repository.MedicineRepository;
import com.example.pharmacy.repository.PharmacyRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PharmacyService {

    private final InventoryRepository inventoryRepository;
    private final PharmacyRepository pharmacyRepository;
    private final MedicineRepository medicineRepository;

    public PharmacyService(InventoryRepository inventoryRepository,
                           PharmacyRepository pharmacyRepository,
                           MedicineRepository medicineRepository) {
        this.inventoryRepository = inventoryRepository;
        this.pharmacyRepository = pharmacyRepository;
        this.medicineRepository = medicineRepository;
    }

    //  Search pharmacies by medicine names
    public List<PharmacyDTO> searchPharmaciesByMedicineNames(List<String> medicineNames) {
        List<String> lowerNames = medicineNames.stream()
                .map(String::toLowerCase)
                .collect(Collectors.toList());
        return inventoryRepository.findPharmaciesByMedicineNames(lowerNames);
    }

    //  Add a new pharmacy
    public Pharmacy addPharmacy(Pharmacy pharmacy) {
        return pharmacyRepository.save(pharmacy);
    }

    public Inventory addMedicineToPharmacy(Long pharmacyId, InventoryDTO dto) {
        Pharmacy pharmacy = pharmacyRepository.findById(pharmacyId)
                .orElseThrow(() -> new RuntimeException("Pharmacy not found"));

        Medicine medicine = medicineRepository.findById(dto.getMedicineId())
                .orElseThrow(() -> new RuntimeException("Medicine not found"));

        Inventory inventory = new Inventory();
        inventory.setPharmacy(pharmacy);
        inventory.setMedicine(medicine);
        inventory.setQuantity(dto.getQuantity());
        inventory.setPrice(dto.getPrice());

        return inventoryRepository.save(inventory);
    }

    //  Get all medicines in a pharmacy
    public List<MedicineInventoryDTO> getMedicinesInPharmacy(Long pharmacyId) {
        return inventoryRepository.findMedicinesWithInventoryByPharmacy(pharmacyId);
    }

}

