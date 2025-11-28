package com.example.demo.repository;

import com.example.demo.entity.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PropertyRepository extends JpaRepository<Property, Long> {

    // This helps us search for properties by location (e.g., "Find all houses in Vijayawada")
    List<Property> findByLocationContaining(String location);
}