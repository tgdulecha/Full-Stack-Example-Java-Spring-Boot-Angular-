package com.example.demo.dto;

import lombok.*;

@Data
public class RegisterRequest {
    private String username;
    private String email;
    private String password;
}
