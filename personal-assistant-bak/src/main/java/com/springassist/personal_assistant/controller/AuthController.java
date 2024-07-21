package com.springassist.personal_assistant.controller;

import com.springassist.personal_assistant.model.User;
import com.springassist.personal_assistant.service.EmailService;
import com.springassist.personal_assistant.service.UserService;
import com.springassist.personal_assistant.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private EmailService emailService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userService.findByUsername(user.getUsername()) != null) {
            return ResponseEntity.badRequest().body("Username is already taken");
        }
        if (userService.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.badRequest().body("Email is already registered");
        }
        user.setRole("ROLE_USER");
        userService.register(user);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        User existingUser = userService.findByUsername(user.getUsername());
        if (existingUser == null || !passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
        String token = jwtUtil.generateToken(user.getUsername());
        return ResponseEntity.ok(token);
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> emailMap) {
        String email = emailMap.get("email");
        User user = userService.findByEmail(email);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email not found");
        }
        // Generate reset token
        String token = jwtUtil.generateToken(email);
        // Send reset email
        String resetLink = "http://localhost:3000/reset-password?token=" + token;
        emailService.sendSimpleMessage(email, "Password Reset Request", "To reset your password, click the link below:\n" + resetLink);
        return ResponseEntity.ok("Reset link sent to your email");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> resetRequest) {
        String token = resetRequest.get("token");
        String newPassword = resetRequest.get("password");

        String email = jwtUtil.extractUsername(token);
        if (email == null || jwtUtil.isTokenExpired(token)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid or expired reset token");
        }

        User user = userService.findByEmail(email);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userService.save(user);
        return ResponseEntity.ok("Password reset successfully");
    }

    @PutMapping("/update-profile")
    public ResponseEntity<?> updateProfile(@RequestBody Map<String, String> profileMap, @RequestHeader("Authorization") String token) {
        logger.info("Received profile update request with token: {}", token);
        logger.info("Profile data: {}", profileMap);

        String username = profileMap.get("username");
        String email = profileMap.get("email");
        String currentUsername = jwtUtil.extractUsername(token.substring(7));

        logger.info("Extracted username from token: {}", currentUsername);

        User user = userService.findByUsername(currentUsername);
        if (user == null) {
            logger.error("User not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        user.setUsername(username);
        user.setEmail(email);
        userService.save(user);

        logger.info("Profile updated successfully for user: {}", currentUsername);
        return ResponseEntity.ok("Profile updated successfully");
    }

    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> passwordMap, @RequestHeader("Authorization") String token) {
        logger.info("Received change password request with token: {}", token);
        logger.info("Password data: {}", passwordMap);

        String currentPassword = passwordMap.get("currentPassword");
        String newPassword = passwordMap.get("newPassword");
        String username = jwtUtil.extractUsername(token.substring(7));

        logger.info("Extracted username from token: {}", username);

        User user = userService.findByUsername(username);
        if (user == null) {
            logger.error("User not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            logger.error("Invalid current password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid current password");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userService.save(user);

        logger.info("Password changed successfully for user: {}", username);
        return ResponseEntity.ok("Password changed successfully");
    }
}
