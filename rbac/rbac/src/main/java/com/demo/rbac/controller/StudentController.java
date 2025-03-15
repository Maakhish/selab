package com.demo.rbac.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.demo.rbac.model.Student;
import com.demo.rbac.service.StudentService;

import java.util.List;

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
    public ResponseEntity<List<Student>> getAllStudents() {
        List<Student> students = studentService.getAllStudents();  // ✅ Get students from DB
        return ResponseEntity.ok(students);  // ✅ Return students
    }
}
