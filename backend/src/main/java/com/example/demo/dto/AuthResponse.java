package com.example.demo.dto;

import com.example.demo.enums.UserRole;
import lombok.*;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String username;
    private String token;
    private UserRole role;
}
