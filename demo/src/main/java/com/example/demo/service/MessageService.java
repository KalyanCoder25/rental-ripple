package com.example.demo.service;

import com.example.demo.entity.Message;
import com.example.demo.entity.User;
import com.example.demo.repository.MessageRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    public Message sendMessage(Message message, Long fromUserId) {
        User from = userRepository.findById(fromUserId).orElse(null);
        if (from == null) return null;
        message.setFromUser(from);
        if (message.getDate() == null) message.setDate(LocalDateTime.now());
        return messageRepository.save(message);
    }

    public List<Message> getMessages(String conversationId) {
        return messageRepository.findByConversationIdOrderByDateAsc(conversationId);
    }
}
