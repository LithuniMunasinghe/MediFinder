package com.example.pharmacy.dto;

public class PharmacyDTO {
    private Long id;
    private String name;

    public PharmacyDTO(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
}

