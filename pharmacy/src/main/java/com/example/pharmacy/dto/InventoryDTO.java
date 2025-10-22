package com.example.pharmacy.dto;

public class InventoryDTO {

    private Long medicineId;  // ID of the medicine to add
    private int quantity;     // Quantity of the medicine
    private double price;     // Price per unit

    public InventoryDTO() {
    }

    public InventoryDTO(Long medicineId, int quantity, double price) {
        this.medicineId = medicineId;
        this.quantity = quantity;
        this.price = price;
    }

    // Getters and setters
    public Long getMedicineId() {
        return medicineId;
    }

    public void setMedicineId(Long medicineId) {
        this.medicineId = medicineId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
