package com.demo.rbac.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "students")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Student extends User{
    @Id
    private String roll; // Example: P202300CS
    private String name;
    @ManyToOne
    @JoinColumn(name = "guide_id") // Foreign key column in the "students" table
    private Guide guide;
    private String email;

    @Enumerated(EnumType.STRING)
    private UserRole userRole = UserRole.STUDENT;
}
