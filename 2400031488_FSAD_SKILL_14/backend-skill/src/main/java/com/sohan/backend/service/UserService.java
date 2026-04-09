package com.sohan.backend.service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Service;

import com.sohan.backend.model.User;

@Service
public class UserService {

    private final Map<String, User> users = new ConcurrentHashMap<>();

    public String register(User user) {
        if (user == null || isBlank(user.getUsername()) || isBlank(user.getPassword())) {
            return "Username and password are required";
        }

        if (users.containsKey(user.getUsername())) {
            return "Username already exists";
        }

        users.put(user.getUsername(), user);
        return "User registered";
    }

    public User login(User user) {
        if (user == null || isBlank(user.getUsername()) || isBlank(user.getPassword())) {
            return null;
        }

        User existingUser = users.get(user.getUsername());

        if (existingUser != null && existingUser.getPassword().equals(user.getPassword())) {
            return sanitize(existingUser);
        }
        return null;
    }

    public User getProfile(String username) {
        User user = users.get(username);
        if (user == null) {
            return null;
        }

        return sanitize(user);
    }

    private User sanitize(User user) {
        User safeUser = new User();
        safeUser.setUsername(user.getUsername());
        return safeUser;
    }

    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }
}
