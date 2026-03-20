package com.klu.springdi.model;

import org.springframework.stereotype.Component;

@Component
public class Student {

    private int studentId = 31488;
    private String name = "sohan";
    private String course = "AI";
    private int year = 2;

    public Student() {}

    public Student(int studentId, String name, String course, int year) {
        this.studentId = studentId;
        this.name = name;
        this.course = course;
        this.year = year;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public void display() {
        System.out.println("ID: " + studentId);
        System.out.println("Name: " + name);
        System.out.println("Course: " + course);
        System.out.println("Year: " + year);
    }
}

