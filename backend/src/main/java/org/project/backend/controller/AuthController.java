package org.project.backend.controller;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.project.backend. dto.users.AuthResponse;
import org.project.backend.dto.users.LoginRequest;
import org.project.backend.dto. users.RegisterRequest;
import org.project.backend.dto.users.UserResponse;
import org.project.backend.service. AuthService;
import org.springframework.http.HttpStatus;
import org.springframework. http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @Valid @RequestBody LoginRequest request,
            HttpSession session
    ) {
        AuthResponse response = authService.login(request, session);
        return ResponseEntity. ok(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        String message = authService.logout(session);
        return ResponseEntity.ok(message);
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> me(HttpSession session) {
        UserResponse user = authService.me(session);
        return ResponseEntity.ok(user);
    }
}