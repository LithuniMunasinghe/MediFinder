package com.example.pharmacy.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "pharmacies")
public class Pharmacy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @OneToMany(mappedBy = "pharmacy", cascade = CascadeType.ALL)
    @JsonManagedReference
    private Set<PharmacyInventory> inventories;

    public Pharmacy() {}

    public Pharmacy(String name) {
        this.name = name;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Set<PharmacyInventory> getInventories() { return inventories; }
    public void setInventories(Set<PharmacyInventory> inventories) { this.inventories = inventories; }
}
