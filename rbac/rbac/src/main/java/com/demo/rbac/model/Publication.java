package com.demo.rbac.model;

import jakarta.persistence.*;
import lombok.*;
<<<<<<< HEAD
import java.time.LocalDate;
=======
>>>>>>> main

@Entity
@Table(name = "publications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Publication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String journal;
    private String doi;
    private String publicationType;
    private String status;
    private boolean sendCopyToCoordinator;
    private String quartile;
<<<<<<< HEAD

    @Column(name = "roll_no", nullable = false) // ✅ Store only a single roll number
    private String rollNo;

    @Column(name = "date_of_submission")
    private LocalDate dateOfSubmission; // ✅ New field for submission date
=======
    
    @Column(name = "roll_no", nullable = false) // ✅ Store only a single roll number
    private String rollNo;  
>>>>>>> main
}
