package com.klu.autowired.model;

import org.springframework.stereotype.Component;

@Component
public class Certification {

    private int id = 31488;
    private String name = "sohan";
    private String dateOfCompletion = "10-03-2026";

    public void display() {
        System.out.println("Certification ID: " + id);
        System.out.println("Certification Name: " + name);
        System.out.println("Completion Date: " + dateOfCompletion);
    }
}
