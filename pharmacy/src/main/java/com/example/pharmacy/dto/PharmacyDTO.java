package com.example.pharmacy.dto;

public class PharmacyDTO {

    private String pharmacyName;
    private String medicineName;
    private int quantity;

    // ✅ Default constructor (required by JPA / Jackson)
    public PharmacyDTO() {
    }

    // ✅ Constructor used in JPQL queries like:
    // SELECT new com.example.pharmacy.dto.PharmacyDTO(p.name, m.name, i.quantity)
    public PharmacyDTO(String pharmacyName, String medicineName, int quantity) {
        this.pharmacyName = pharmacyName;
        this.medicineName = medicineName;
        this.quantity = quantity;
    }

    // ✅ Getters and setters
    public String getPharmacyName() {
        return pharmacyName;
    }

    public void setPharmacyName(String pharmacyName) {
        this.pharmacyName = pharmacyName;
    }

    public String getMedicineName() {
        return medicineName;
    }

    public void setMedicineName(String medicineName) {
        this.medicineName = medicineName;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    // ✅ Optional: toString() method for easy debugging/logging
    @Override
    public String toString() {
        return "PharmacyDTO{" +
                "pharmacyName='" + pharmacyName + '\'' +
                ", medicineName='" + medicineName + '\'' +
                ", quantity=" + quantity +
                '}';
    }
}
