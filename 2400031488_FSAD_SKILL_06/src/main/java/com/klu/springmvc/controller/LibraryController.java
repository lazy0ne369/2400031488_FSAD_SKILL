package com.klu.springmvc.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.klu.springmvc.model.Book;

@RestController
public class LibraryController {

    List<Book> books = new ArrayList<>();

    // 1 Welcome
    @GetMapping("/welcome")
    public String welcome() {
        return "Welcome to Online Library";
    }

    // 2 Count
    @GetMapping("/count")
    public int totalBooks() {
        return 5;
    }

    // 3 Price
    @GetMapping("/price")
    public double bookPrice() {
        return 499.99;
    }

    // 4 Books list
    @GetMapping("/books")
    public List<String> getBooks() {
        return Arrays.asList("Java", "Spring", "Python", "Data Science");
    }

    // 5 Book by ID
    @GetMapping("/books/{id}")
    public String getBookById(@PathVariable int id) {
        return "Details of Book ID: " + id;
    }

    // 6 Search by request parameter
    @GetMapping("/search")
    public String searchBook(@RequestParam String title) {
        return "Searching for book: " + title;
    }

    // 7 Author path variable
    @GetMapping("/author/{name}")
    public String authorName(@PathVariable String name) {
        return "Books written by: " + name;
    }

    // 8 Add book (POST)
    @PostMapping("/addbook")
    public String addBook(@RequestBody Book book) {
        books.add(book);
        return "Book added successfully";
    }

    // 9 View added books
    @GetMapping("/viewbooks")
    public List<Book> viewBooks() {
        return books;
    }
}
