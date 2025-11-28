package com.example.demo.dto;

import lombok.Data;

@Data
public class PaymentRequest {
    private Long leaseId;
    private Double amount;
    private String date; // ISO date-time
    private String description;
}
