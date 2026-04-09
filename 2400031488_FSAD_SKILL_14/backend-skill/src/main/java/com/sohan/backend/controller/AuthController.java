package com.sohan.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sohan.backend.model.User;
import com.sohan.backend.service.UserService;

@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:5173" })
@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        String result = userService.register(user);

        if ("User registered".equals(result)) {
            return ResponseEntity.status(HttpStatus.CREATED).body(result);
        }

        if ("Username already exists".equals(result)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(result);
        }

        return ResponseEntity.badRequest().body(result);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        User loggedInUser = userService.login(user);

        if (loggedInUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }

        return ResponseEntity.ok(loggedInUser);
    }

    @GetMapping("/profile/{username}")
    public ResponseEntity<?> profile(@PathVariable String username) {
        User profile = userService.getProfile(username);

        if (profile == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        return ResponseEntity.ok(profile);
    }
}
