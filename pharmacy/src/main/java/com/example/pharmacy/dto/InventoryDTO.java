package com.example.pharmacy.dto;

public class InventoryDTO {

    private Long id;                 // Inventory ID
    private String medicineName;     // Medicine Name
    private String medicineDescription; // Medicine Description
    private Integer quantity;
    private Double price;

    public InventoryDTO() {
    }

    public InventoryDTO(Long id, String medicineName, String medicineDescription, Integer quantity, Double price) {
        this.id = id;
        this.medicineName = medicineName;
        this.medicineDescription = medicineDescription;
        this.quantity = quantity;
        this.price = price;
    }

    // Getters & setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getMedicineName() { return medicineName; }
    public void setMedicineName(String medicineName) { this.medicineName = medicineName; }

    public String getMedicineDescription() { return medicineDescription; }
    public void setMedicineDescription(String medicineDescription) { this.medicineDescription = medicineDescription; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
}
