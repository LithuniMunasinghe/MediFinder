package com.example.pharmacy.dto;

public class MedicineInventoryDTO {

    private Long medicineId;
    private String name;
    private String description;
    private int quantity;
    private double price;

    public MedicineInventoryDTO(Long medicineId, String name, String description, int quantity, double price) {
        this.medicineId = medicineId;
        this.name = name;
        this.description = description;
        this.quantity = quantity;
        this.price = price;
    }

    // Getters & setters
    public Long getMedicineId() { return medicineId; }
    public void setMedicineId(Long medicineId) { this.medicineId = medicineId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
}
