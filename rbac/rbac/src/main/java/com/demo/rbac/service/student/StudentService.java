package com.demo.rbac.service.student;

import com.demo.rbac.dto.StudentGuideDTO;
<<<<<<< HEAD

import com.demo.rbac.dto.StudentUnderGuideDTO;
=======
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
>>>>>>> main
import com.demo.rbac.model.Student;
import com.demo.rbac.model.Guide;
import com.demo.rbac.repository.StudentRepository;
import com.demo.rbac.repository.GuideRepository;
<<<<<<< HEAD
import com.demo.rbac.repository.PublicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
=======

import java.io.InputStream;
import java.util.List;
import java.util.Optional;
>>>>>>> main

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private GuideRepository guideRepository;

    @Autowired
<<<<<<< HEAD
    private PublicationRepository publicationRepository;

    @Autowired
    private ExcelHelper excelHelper; 

    /**
     * Uploads student data from an Excel file and associates them with guides if available.
     */
    public List<Student> saveStudentsFromExcel(MultipartFile file) {
        try {
            if (!ExcelHelper.hasExcelFormat(file)) {
                throw new IllegalArgumentException("Invalid Excel file format.");
            }

            InputStream inputStream = file.getInputStream();
            List<Student> students = excelHelper.excelToStudents(inputStream);

            for (Student student : students) {
                if (student.getGuide() != null && student.getGuide().getEmail() != null) {
                    Optional<Guide> existingGuideOpt = guideRepository.findByEmail(student.getGuide().getEmail());

                    Guide guide = existingGuideOpt.orElseGet(() -> {
                        Guide newGuide = new Guide();
                        newGuide.setName(student.getGuide().getName());
                        newGuide.setEmail(student.getGuide().getEmail());
                        return guideRepository.save(newGuide);
                    });

                    // Update guide name only if it has changed
                    if (existingGuideOpt.isPresent() && student.getGuide().getName() != null &&
                        !student.getGuide().getName().equals(guide.getName())) {
                        guide.setName(student.getGuide().getName());
                        guideRepository.save(guide);
                    }

                    student.setGuide(guide);
                }
            }

            return studentRepository.saveAll(students);
        } catch (Exception e) {
            throw new RuntimeException("Error saving students: " + e.getMessage(), e);
        }
    }

    /**
     * Fetches all students.
     */
=======
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

                // Check if guide info is provided
                if (tempGuide != null && tempGuide.getEmail() != null) {
                    Optional<Guide> existingGuide = guideRepository.findByEmail(tempGuide.getEmail());

                    Guide savedGuide = existingGuide.orElseGet(() -> {
                        Guide newGuide = new Guide();
                        newGuide.setName(tempGuide.getName());
                        newGuide.setEmail(tempGuide.getEmail());
                        return guideRepository.save(newGuide); // Save new guide
                    });

                    // Ensure the name is always updated
                    if (existingGuide.isPresent() && tempGuide.getName() != null) {
                        savedGuide.setName(tempGuide.getName());
                        guideRepository.save(savedGuide);
                    }

                    student.setGuide(savedGuide); // Associate student with guide
                } else {
                    student.setGuide(null); // Handle students with no guide
                }
            }

            return studentRepository.saveAll(students);  // Save students with correct guide
        } catch (Exception e) {
            throw new RuntimeException("Error saving students: " + e.getMessage());
        }
    }

>>>>>>> main
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

<<<<<<< HEAD
    /**
     * Fetches all students along with their assigned guides.
     */
    public List<StudentGuideDTO> getAllStudentsWithGuides() {
        return studentRepository.findAllWithGuides();
    }

    /**
     * Fetches student by email.
     */
=======
    public List<StudentGuideDTO> getAllStudentsWithGuides() {
        return studentRepository.findAllWithGuides(); // Fetch students along with guides
    }

>>>>>>> main
    public Optional<Student> findByEmail(String email) {
        return studentRepository.findByEmail(email);
    }

<<<<<<< HEAD
    /**
     * Saves or updates a student.
     */
=======
>>>>>>> main
    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }

<<<<<<< HEAD
    /**
     * Fetches student by roll number.
     */
=======
>>>>>>> main
    public Optional<Student> getStudentByRollNumber(String rollNumber) {
        return studentRepository.findById(rollNumber);
    }

<<<<<<< HEAD
    /**
     * Updates student details.
     */
    public Student updateStudent(Student student) {
        return studentRepository.save(student);
    }

    /**
     * Retrieves a list of students along with their publication count under a specific guide.
     */
    public List<StudentUnderGuideDTO> getStudentsUnderGuide(Long guideId) {
        return studentRepository.findStudentsByGuideWithPublicationCount(guideId)
                .stream()
                .map(obj -> new StudentUnderGuideDTO(
                        (String) obj[0],  // Roll Number
                        (String) obj[1],  // Name
                        (String) obj[2],  // ORCID
                        ((Number) obj[3]).intValue() // Publication Count
                ))
                .collect(Collectors.toList());
    }

    /**
     * Retrieves publication count for a specific student by roll number.
     */
    public int getPublicationCountForStudent(String rollNo) {
        return publicationRepository.countByRollNo(rollNo);
=======
    // ✅ NEW METHOD: Fetch student by username
    // public Optional<Student> getStudentByUsername(String username) {
    //     return studentRepository.findByUsername(username);
    // }

    public Student updateStudent(Student student) {
        return studentRepository.save(student); // Save updated student details
>>>>>>> main
    }
}
