package com.example.demo.dto;

import lombok.Data;

@Data
public class MessageRequest {
    private String conversationId;
    private Long fromUserId;
    private String message;
}
