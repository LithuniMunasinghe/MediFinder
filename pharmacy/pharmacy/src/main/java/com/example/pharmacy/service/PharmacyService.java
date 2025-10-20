package com.example.pharmacy.service;

import com.example.pharmacy.dto.PharmacyDTO;
import com.example.pharmacy.entity.Pharmacy;
import com.example.pharmacy.entity.PharmacyInventory;
import com.example.pharmacy.repository.PharmacyInventoryRepository;
import com.example.pharmacy.repository.PharmacyRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PharmacyService {

    private final PharmacyRepository pharmacyRepository;
    private final PharmacyInventoryRepository inventoryRepository;

    public PharmacyService(PharmacyRepository pharmacyRepository,PharmacyInventoryRepository inventoryRepository) {
        this.pharmacyRepository = pharmacyRepository;
        this.inventoryRepository = inventoryRepository;
    }

    public List<PharmacyDTO> searchPharmaciesByMedicineNames(List<String> medicineNames) {
        List<Pharmacy> pharmacies = pharmacyRepository.findPharmaciesByMedicineNames(medicineNames);
        return pharmacies.stream()
                .map(p -> new PharmacyDTO(p.getId(), p.getName()))
                .collect(Collectors.toList());
    }

    // Test method to print all inventories
    public void printAllInventories() {
        List<PharmacyInventory> inventories = inventoryRepository.findAll();

        if (inventories.isEmpty()) {
            System.out.println("No inventories found in the database.");
            return;
        }

        System.out.println("=== Inventory List ===");
        for (PharmacyInventory pi : inventories) {
            String pharmacyName = pi.getPharmacy().getName();
            String medicineName = pi.getMedicine().getName();
            int quantity = pi.getQuantity();
            System.out.println("Pharmacy: " + pharmacyName + ", Medicine: " + medicineName + ", Quantity: " + quantity);
        }
        System.out.println("======================");
    }
}
