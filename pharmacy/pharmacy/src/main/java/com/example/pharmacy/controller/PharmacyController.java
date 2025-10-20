package com.example.pharmacy.controller;

import com.example.pharmacy.dto.PharmacyDTO;
import com.example.pharmacy.service.PharmacyService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pharmacies")
public class PharmacyController {

    private final PharmacyService pharmacyService;

    public PharmacyController(PharmacyService pharmacyService) {
        this.pharmacyService = pharmacyService;
    }

    @GetMapping("/search")
    public List<PharmacyDTO> searchPharmacies(@RequestParam List<String> medicineNames) {
        return pharmacyService.searchPharmaciesByMedicineNames(medicineNames);
    }

}
