package com.klu.globalexception.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.klu.globalexception.exception.StudentNotFoundException;
import com.klu.globalexception.model.Student;

@RestController
public class StudentController {

    List<Student> students = Arrays.asList(
            new Student(31488, "sohan", "CSE"),
            new Student(31489, "sohan", "AI")
    );

    @GetMapping("/student/{id}")
    public Student getStudent(@PathVariable int id) {

        return students.stream()
                .filter(s -> s.getId() == id)
                .findFirst()
                .orElseThrow(() ->
                        new StudentNotFoundException("Student with ID " + id + " not found"));
    }
}
