package com.example.pharmacy.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name = "inventories")
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int quantity;
    private double price;

    @ManyToOne
    @JoinColumn(name = "pharmacy_id")
    @JsonBackReference("pharmacy-inventory")
    @JsonIgnoreProperties("inventories")
    private Pharmacy pharmacy;

    @ManyToOne
    @JoinColumn(name = "medicine_id")
    @JsonBackReference("medicine-inventory")
    @JsonIgnoreProperties("inventories")
    private Medicine medicine;

    // Getters and setters
    public Long getId() { return id; }
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
    public Pharmacy getPharmacy() { return pharmacy; }
    public void setPharmacy(Pharmacy pharmacy) { this.pharmacy = pharmacy; }
    public Medicine getMedicine() { return medicine; }
    public void setMedicine(Medicine medicine) { this.medicine = medicine; }
}
