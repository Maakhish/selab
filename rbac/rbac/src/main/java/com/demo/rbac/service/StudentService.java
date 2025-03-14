package com.demo.rbac.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.demo.rbac.model.Student;
import com.demo.rbac.repository.StudentRepository;

import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public List<Student> saveStudentsFromExcel(MultipartFile file) {
        try {
            if (!ExcelHelper.hasExcelFormat(file)) {
                throw new RuntimeException("Invalid Excel file format.");
            }
    
            List<Student> students = ExcelHelper.excelToStudents(file.getInputStream());
            return studentRepository.saveAll(students);  // ✅ Save and return the list
        } catch (Exception e) {
            throw new RuntimeException("Error saving students: " + e.getMessage());
        }
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }
}
