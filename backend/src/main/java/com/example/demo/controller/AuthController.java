package com.example.demo.controller;

import com.example.demo.dto.*;
import com.example.demo.model.Users;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.JwtService;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
//@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired private AuthenticationManager authManager;
    @Autowired private JwtService jwtService;
    @Autowired private UserService userService;
    @Autowired private UserRepository userRepository;


    @PostMapping("/signup")
    public ResponseEntity<Map<String, String>> register(@RequestBody RegisterRequest request) {
        userService.registerUser(request);
        Map<String, String> response = new HashMap<>();
        response.put("message", "User registered successfully");
        return ResponseEntity.ok(response);
    }
    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        // Load full user entity
        Users user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // Generate token (you can pass UserDetails if your jwtService requires it)
        String token = jwtService.generateToken(user.getEmail());

        // Return actual username and token
        return new AuthResponse(user.getUsername(), token, user.getRole());
    }

}

/*    @PostMapping("/signup")
    public String signup(@RequestBody RegisterRequest request) {
        Users user = Users.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(encoder.encode(request.getPassword()))
                .build();
        repo.save(user);
        return "User registered successfully";
    }*/