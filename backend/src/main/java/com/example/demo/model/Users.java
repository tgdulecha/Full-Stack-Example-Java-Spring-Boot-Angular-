package com.example.demo.model;

import com.example.demo.enums.UserRole;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Table(name="Users")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Users {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    @Column(unique = true)
    private String email;
    private String password;

    @Enumerated(EnumType.STRING)
    private UserRole role;
}
