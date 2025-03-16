package com.demo.rbac.controller;

import com.demo.rbac.dto.StudentGuideDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.demo.rbac.model.Student;
import com.demo.rbac.service.student.StudentService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping("/upload")
    public ResponseEntity<List<Student>> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            List<Student> savedStudents = studentService.saveStudentsFromExcel(file);  // ✅ Get saved students
            return ResponseEntity.ok(savedStudents);  // ✅ Return the student list
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null); // Return an empty response in case of failure
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<StudentGuideDTO>> getAllStudents() {
        List<StudentGuideDTO> students = studentService.getAllStudentsWithGuides();  // Get students from DB
        return ResponseEntity.ok(students);  // Return students
    }

    @GetMapping("/{rollNumber}")
    public ResponseEntity<Student> getStudentByRollNumber(@PathVariable String rollNumber) {
        Optional<Student> student = studentService.getStudentByRollNumber(rollNumber);
        System.out.println("entering get?");
        if (student.isPresent()) {
            return ResponseEntity.ok(student.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

}
