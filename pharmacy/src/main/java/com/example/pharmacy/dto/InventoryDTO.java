package com.example.pharmacy.dto;

public class InventoryDTO {

    private Long medicineId;       // ID of the medicine to add
    private Integer quantity;      // Quantity of the medicine (wrapper)
    private Double price;          // Price per unit (wrapper)

    public InventoryDTO() {
    }

    public InventoryDTO(Long medicineId, Integer quantity, Double price) {
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

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}
