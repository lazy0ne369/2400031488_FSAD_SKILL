package com.klu.restcrud.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.klu.restcrud.model.Course;
import com.klu.restcrud.service.CourseService;

@RestController
@RequestMapping("/courses")
public class CourseController {

    @Autowired
    private CourseService service;

    @GetMapping
    public ResponseEntity<List<Course>> getCourses(){
        return new ResponseEntity<>(service.getAllCourses(),HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Course> addCourse(@RequestBody Course course){
        return new ResponseEntity<>(service.addCourse(course),HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCourse(@PathVariable int id,@RequestBody Course course){

        Course updated = service.updateCourse(id,course);

        if(updated!=null){
            return new ResponseEntity<>(updated,HttpStatus.OK);
        }

        return new ResponseEntity<>("Course not found",HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCourse(@PathVariable int id){

        boolean removed = service.deleteCourse(id);

        if(removed){
            return new ResponseEntity<>("Course deleted",HttpStatus.OK);
        }

        return new ResponseEntity<>("Course not found",HttpStatus.NOT_FOUND);
    }

    @GetMapping("/search/{title}")
    public ResponseEntity<List<Course>> search(@PathVariable String title){
        return new ResponseEntity<>(service.searchByTitle(title),HttpStatus.OK);
    }
}
