package com.demo.rbac.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.demo.rbac.model.Student;
import com.demo.rbac.model.Guide;
import com.demo.rbac.repository.StudentRepository;
import com.demo.rbac.repository.GuideRepository;

import java.io.InputStream;
import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private GuideRepository guideRepository;

    @Autowired
    private ExcelHelper excelHelper; // Inject ExcelHelper

    public List<Student> saveStudentsFromExcel(MultipartFile file) {
        try {
            if (!ExcelHelper.hasExcelFormat(file)) {
                throw new RuntimeException("Invalid Excel file format.");
            }

            InputStream inputStream = file.getInputStream();
            List<Student> students = excelHelper.excelToStudents(inputStream); // Use instance method

            for (Student student : students) {
                Guide tempGuide = student.getGuide();
                Optional<Guide> existingGuide = guideRepository.findByEmail(tempGuide.getEmail());

                Guide savedGuide = existingGuide.orElseGet(() -> {
                    Guide newGuide = new Guide();
                    newGuide.setName(tempGuide.getName());
                    newGuide.setEmail(tempGuide.getEmail());
                    return guideRepository.save(newGuide); // Save guide if new
                });

                student.setGuide(savedGuide); // Associate student with guide
            }

            return studentRepository.saveAll(students);  // Save students with correct guide
        } catch (Exception e) {
            throw new RuntimeException("Error saving students: " + e.getMessage());
        }
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }
}
