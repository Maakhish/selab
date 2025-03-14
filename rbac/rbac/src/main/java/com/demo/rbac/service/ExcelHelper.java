package com.demo.rbac.service;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;
import com.demo.rbac.model.Student;

import java.io.*;
import java.util.*;

public class ExcelHelper {

    private static final List<String> ACCEPTED_TYPES = Arrays.asList(
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // XLSX
        "application/vnd.ms-excel" // XLS
    );

    public static boolean hasExcelFormat(MultipartFile file) {
        return ACCEPTED_TYPES.contains(file.getContentType());
    }

    public static List<Student> excelToStudents(InputStream inputStream) {
        List<Student> students = new ArrayList<>();
        DataFormatter formatter = new DataFormatter(); // ✅ Handles different data types

        try (Workbook workbook = new XSSFWorkbook(inputStream)) {
            Sheet sheet = workbook.getSheetAt(0);
            Iterator<Row> rows = sheet.iterator();
            boolean firstRow = true;

            while (rows.hasNext()) {
                Row row = rows.next();
                if (firstRow) { // ✅ Skip header row
                    firstRow = false;
                    continue;
                }

                Student student = new Student();

                // ✅ Handle potential null values safely
                student.setId(formatter.formatCellValue(row.getCell(0)).trim());
                student.setName(formatter.formatCellValue(row.getCell(1)).trim());
                student.setGuide(formatter.formatCellValue(row.getCell(2)).trim());
                student.setEmail(formatter.formatCellValue(row.getCell(3)).trim());

                students.add(student);
            }
        } catch (IOException e) {
            throw new RuntimeException("Error processing Excel file: " + e.getMessage());
        }

        return students;
    }
}
