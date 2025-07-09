package com.example.demo.service;

import com.example.demo.dto.RegisterRequest;
import com.example.demo.enums.UserRole;
import com.example.demo.model.Users;
import com.example.demo.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository repo;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);


    public void registerUser(RegisterRequest request) {

        Users user = new Users();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setRole(UserRole.Customer);
        user.setPassword(encoder.encode(request.getPassword()));
        repo.save(user);
    }

    @PostConstruct
    public void createAdmin() {
        Users adminAccount = repo.findByRole(UserRole.ADMIN);
        if (null == adminAccount) {
            Users user = new Users();
            user.setEmail("admin@test.com");
            user.setUsername("Admin");
            user.setPassword(encoder.encode("admin"));
            user.setRole(UserRole.ADMIN);
            repo.save(user);
        }

    }
}
