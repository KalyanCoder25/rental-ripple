package com.example.demo.repository;

import com.example.demo.entity.Lease;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LeaseRepository extends JpaRepository<Lease, Long> {
    List<Lease> findByTenantId(Long tenantId);
    List<Lease> findByPropertyLandlordId(Long landlordId);
}
