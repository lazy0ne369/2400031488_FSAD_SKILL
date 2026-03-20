package com.klu.springdi.main;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.klu.springdi.model.Student;

public class AppXML {

    public static void main(String[] args) {

        ApplicationContext context =
                new ClassPathXmlApplicationContext("applicationContext.xml");

        Student s1 = (Student) context.getBean("student1");

        s1.display();

    }
}
