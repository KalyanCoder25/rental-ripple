package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "properties")
public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private Double price;
    private String location;
    private String status; // e.g., "AVAILABLE"

    @ManyToOne
    @JoinColumn(name = "landlord_id")
    private User landlord;
}