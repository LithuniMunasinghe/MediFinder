package com.example.pharmacy.entity;

import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "medicines")
public class Medicine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @OneToMany(mappedBy = "medicine", cascade = CascadeType.ALL)
    private Set<PharmacyInventory> inventories;

    public Medicine() {}
    public Medicine(String name) { this.name = name; }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Set<PharmacyInventory> getInventories() { return inventories; }
    public void setInventories(Set<PharmacyInventory> inventories) { this.inventories = inventories; }
}
