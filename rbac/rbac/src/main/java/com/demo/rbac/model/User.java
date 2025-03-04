package com.demo.rbac.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(unique = true)
    private String email;

    @Enumerated(EnumType.STRING)
    private UserRole userRole;

    private boolean enabled = true;

    // For student-supervisor mapping
    @ManyToOne
    @JoinColumn(name = "supervisor_id")
    private User supervisor;

    public User(String email, UserRole role) {
        this.email = email;
        this.userRole = role;
    }

    public UserRole getUserRole() {
        return userRole;
    }
}
