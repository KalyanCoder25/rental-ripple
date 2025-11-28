package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Data;
import jakarta.persistence.Transient;
import java.time.LocalDate;

@Entity
@Table(name = "leases")
@Data
public class Lease {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "property_id")
    private Property property;

    @ManyToOne
    @JoinColumn(name = "tenant_id")
    private User tenant;

    private LocalDate startDate;
    private LocalDate endDate;
    private Double price;
    private String status; // ACTIVE, CANCELLED, COMPLETED

    @Transient
    private String propertyTitle;

    public String getPropertyTitle() {
        return property != null ? property.getTitle() : null;
    }

    @Transient
    private String tenantName;

    public String getTenantName() {
        return tenant != null ? tenant.getUsername() : null;
    }
}
