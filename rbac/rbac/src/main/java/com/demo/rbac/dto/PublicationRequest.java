package com.demo.rbac.dto;

<<<<<<< HEAD
import java.time.LocalDate;

=======
>>>>>>> main
import lombok.Data;

@Data
public class PublicationRequest {
    private String rollNo;
    private String title;
    private String journal;
    private String doi;
    private String publicationType;
    private String quartile;
    private String status;
    private boolean sendCopyToCoordinator;
<<<<<<< HEAD
     private LocalDate dateOfSubmission; 
=======
>>>>>>> main
}

