package com.example.demo.service;

import com.example.demo.entity.Lease;
import com.example.demo.entity.Property;
import com.example.demo.entity.User;
import com.example.demo.repository.LeaseRepository;
import com.example.demo.repository.PropertyRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.time.LocalDate;

@Service
public class LeaseService {
    @Autowired
    private LeaseRepository leaseRepository;

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private UserRepository userRepository;

    public Lease createLease(Lease lease, Long propertyId, Long tenantId) {
        Property property = propertyRepository.findById(propertyId).orElse(null);
        User tenant = userRepository.findById(tenantId).orElse(null);
        if (property == null || tenant == null) return null;
        lease.setProperty(property);
        lease.setTenant(tenant);
        if (lease.getStartDate() == null) lease.setStartDate(LocalDate.now());
        if (lease.getStatus() == null) lease.setStatus("ACTIVE");
        return leaseRepository.save(lease);
    }

    public List<Lease> getLeasesForTenant(Long tenantId) {
        return leaseRepository.findByTenantId(tenantId);
    }

    public List<Lease> getLeasesForLandlord(Long landlordId) {
        return leaseRepository.findByPropertyLandlordId(landlordId);
    }
}
