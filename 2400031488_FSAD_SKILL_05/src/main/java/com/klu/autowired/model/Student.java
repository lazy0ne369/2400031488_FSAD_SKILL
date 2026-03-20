package com.klu.autowired.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Student {

    private int id = 31488;
    private String name = "sohan";
    private String gender = "Male";

    @Autowired
    private Certification certification;

    public void display() {

        System.out.println("Student ID: " + id);
        System.out.println("Student Name: " + name);
        System.out.println("Gender: " + gender);

        System.out.println("----- Certification Details -----");
        certification.display();
    }
}
