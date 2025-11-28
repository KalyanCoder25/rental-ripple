package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Data;
import jakarta.persistence.Transient;
import java.time.LocalDateTime;

@Entity
@Table(name = "messages")
@Data
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String conversationId; // e.g., prop-12

    @ManyToOne
    @JoinColumn(name = "from_user_id")
    private User fromUser;

    private String message;
    private LocalDateTime date;

    @Transient
    private String fromUserName;

    public String getFromUserName() {
        return fromUser != null ? fromUser.getUsername() : null;
    }
}
