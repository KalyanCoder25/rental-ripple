package com.example.demo.controller;

import com.example.demo.entity.Property;
import com.example.demo.entity.User;
import com.example.demo.entity.Lease;
import com.example.demo.entity.Payment;
import com.example.demo.entity.Message;
import com.example.demo.service.PropertyService;
import com.example.demo.service.LeaseService;
import com.example.demo.service.PaymentService;
import com.example.demo.service.MessageService;
import com.example.demo.repository.UserRepository; // <--- 1. Added Import
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class MainController {

    @Autowired
    private PropertyService propertyService;

    @Autowired // <--- 2. Connected the Repository
    private UserRepository userRepository;

    @Autowired
    private LeaseService leaseService;

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private MessageService messageService;

    // Endpoint: POST http://localhost:8082/api/register
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return propertyService.registerUser(user);
    }

    // Endpoint: POST http://localhost:8082/api/add-property?landlordId=1
    @PostMapping("/add-property")
    public Property addProperty(@RequestBody Property property, @RequestParam Long landlordId) {
        return propertyService.addProperty(property, landlordId);
    }

    // Endpoint: GET http://localhost:8082/api/properties
    @GetMapping("/properties")
    public List<Property> getAllProperties() {
        return propertyService.getAllProperties();
    }

    // Endpoint: GET http://localhost:8082/api/properties/{id}
    @GetMapping("/properties/{id}")
    public Property getProperty(@PathVariable Long id) {
        return propertyService.getPropertyById(id);
    }

    // Endpoint: PUT http://localhost:8082/api/properties/{id}
    @PutMapping("/properties/{id}")
    public Property updateProperty(@PathVariable Long id, @RequestBody Property property) {
        return propertyService.updateProperty(id, property);
    }

    // Endpoint: POST http://localhost:8082/api/login
    @PostMapping("/login")
    public User login(@RequestBody User loginData) {
        User user = userRepository.findByEmail(loginData.getEmail());
        
        // Simple password check
        if (user != null && user.getPassword().equals(loginData.getPassword())) {
            return user;
        }
        return null; // Return nothing if login fails
    }

    // Leases endpoints
    @GetMapping("/leases")
    public List<Lease> getLeases(@RequestParam(required = false) Long userId) {
        if (userId == null) return List.of();
        return leaseService.getLeasesForTenant(userId);
    }

    @PostMapping("/leases")
    public Lease createLease(@RequestBody com.example.demo.dto.LeaseRequest req) {
        if (req.getPropertyId() == null || req.getTenantId() == null) return null;
        Lease lease = new Lease();
        lease.setStartDate(req.getStartDate() != null ? java.time.LocalDate.parse(req.getStartDate()) : null);
        lease.setEndDate(req.getEndDate() != null ? java.time.LocalDate.parse(req.getEndDate()) : null);
        lease.setPrice(req.getPrice());
        lease.setStatus("ACTIVE");
        return leaseService.createLease(lease, req.getPropertyId(), req.getTenantId());
    }

    // Payments endpoints
    @GetMapping("/payments")
    public List<Payment> getPayments(@RequestParam(required = false) Long userId) {
        if (userId == null) return List.of();
        return paymentService.getPaymentsForTenant(userId);
    }

    @PostMapping("/payments")
    public Payment createPayment(@RequestBody com.example.demo.dto.PaymentRequest req) {
        if (req.getLeaseId() == null) return null;
        Payment p = new Payment();
        p.setAmount(req.getAmount());
        p.setDate(req.getDate() != null ? java.time.LocalDateTime.parse(req.getDate()) : java.time.LocalDateTime.now());
        p.setDescription(req.getDescription());
        p.setStatus("PENDING");
        return paymentService.createPayment(p, req.getLeaseId());
    }

    // Messaging endpoints
    @GetMapping("/messages")
    public List<Message> getMessages(@RequestParam String conversationId) {
        return messageService.getMessages(conversationId);
    }

    @PostMapping("/messages")
    public Message sendMessage(@RequestBody com.example.demo.dto.MessageRequest req) {
        if (req.getFromUserId() == null) return null;
        Message m = new Message();
        m.setConversationId(req.getConversationId());
        m.setMessage(req.getMessage());
        return messageService.sendMessage(m, req.getFromUserId());
    }
}