package com.example.demo.service;

import com.example.demo.entity.Payment;
import com.example.demo.entity.Lease;
import com.example.demo.repository.PaymentRepository;
import com.example.demo.repository.LeaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PaymentService {
    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private LeaseRepository leaseRepository;

    public Payment createPayment(Payment payment, Long leaseId) {
        Lease lease = leaseRepository.findById(leaseId).orElse(null);
        if (lease == null) return null;
        payment.setLease(lease);
        if (payment.getDate() == null) payment.setDate(LocalDateTime.now());
        if (payment.getStatus() == null) payment.setStatus("PENDING");
        return paymentRepository.save(payment);
    }

    public List<Payment> getPaymentsForTenant(Long tenantId) {
        return paymentRepository.findByLeaseTenantId(tenantId);
    }
}
