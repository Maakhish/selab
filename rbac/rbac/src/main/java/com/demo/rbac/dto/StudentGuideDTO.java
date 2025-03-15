package com.demo.rbac.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StudentGuideDTO {
    private String studentId;
    private String studentName;
    private String studentEmail;
    private String guideName;
    private String guideEmail;
}