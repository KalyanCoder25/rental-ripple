package com.example.demo.service;

import com.example.demo.entity.Property;
import com.example.demo.entity.User;
import com.example.demo.repository.PropertyRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PropertyService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PropertyRepository propertyRepository;

    // Logic to Register a new User
    public User registerUser(User user) {
        if (user == null) {
            return null;
        }
        return userRepository.save(user);
    }

    // Logic to Add a new Property listing
    public Property addProperty(Property property, Long landlordId) {
        // First, find the landlord in the database
        if (landlordId == null) {
            return null;
        }
        User landlord = userRepository.findById(landlordId).orElse(null);
        
        // If landlord exists, link the property to them and save it
        if (landlord != null) {
            property.setLandlord(landlord);
            return propertyRepository.save(property);
        }
        return null; // Return nothing if landlord not found
    }

    // Logic to Get all properties
    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    public Property getPropertyById(@org.springframework.lang.NonNull Long id) {
        return propertyRepository.findById(id).orElse(null);
    }

    public Property updateProperty(Long id, Property update) {
        Property existing = propertyRepository.findById(id).orElse(null);
        if (existing == null) return null;
        existing.setTitle(update.getTitle());
        existing.setDescription(update.getDescription());
        existing.setLocation(update.getLocation());
        existing.setPrice(update.getPrice());
        existing.setStatus(update.getStatus());
        return propertyRepository.save(existing);
    }
}