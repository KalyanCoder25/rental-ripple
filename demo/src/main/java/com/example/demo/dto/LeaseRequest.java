package com.example.demo.dto;

import lombok.Data;

@Data
public class LeaseRequest {
    private Long propertyId;
    private Long tenantId;
    private String startDate; // ISO date
    private String endDate; // ISO date
    private Double price;
}
