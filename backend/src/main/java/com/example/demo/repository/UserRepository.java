package com.example.demo.repository;
import com.example.demo.enums.UserRole;
import com.example.demo.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<Users, Long> {
    Optional<Users> findByEmail(String email);
    Users findByRole(UserRole userRole);
}
