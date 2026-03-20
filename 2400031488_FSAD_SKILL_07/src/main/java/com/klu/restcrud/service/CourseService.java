package com.klu.restcrud.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.klu.restcrud.model.Course;

@Service
public class CourseService {

    private List<Course> courses = new ArrayList<>();

    public List<Course> getAllCourses(){
        return courses;
    }

    public Course addCourse(Course course){
        courses.add(course);
        return course;
    }

    public Course updateCourse(int id,Course updatedCourse){

        for(Course c:courses){
            if(c.getCourseId()==id){
                c.setTitle(updatedCourse.getTitle());
                c.setDuration(updatedCourse.getDuration());
                c.setFee(updatedCourse.getFee());
                return c;
            }
        }
        return null;
    }

    public boolean deleteCourse(int id){
        return courses.removeIf(c -> c.getCourseId()==id);
    }

    public List<Course> searchByTitle(String title){

        List<Course> result = new ArrayList<>();

        for(Course c:courses){
            if(c.getTitle().toLowerCase().contains(title.toLowerCase())){
                result.add(c);
            }
        }

        return result;
    }
}
