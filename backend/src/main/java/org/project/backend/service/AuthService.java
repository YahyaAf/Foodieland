package org.project.backend.service;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.project.backend.dto.users.AuthResponse;
import org. project.backend.dto.users. LoginRequest;
import org.project.backend.dto.users.RegisterRequest;
import org.project. backend.dto.users.UserResponse;
import org.project.backend.enums.Role;
import org. project.backend.exception.EmailAlreadyExistsException;
import org.project.backend. exception.InvalidCredentialsException;
import org.project.backend. exception.UnauthorizedException;
import org. project.backend.exception.UserNotFoundException;
import org. project.backend.mapper.UserMapper;
import org.project.backend.model.User;
import org.project.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new EmailAlreadyExistsException("Email already exists");
        }
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.ADMIN);

        User savedUser = userRepository.save(user);

        UserResponse userResponse = userMapper.toUserResponse(savedUser);
        return new AuthResponse("Registration successful", userResponse);
    }

    public AuthResponse login(LoginRequest request, HttpSession session) {
        User user = userRepository.findByEmail(request. getEmail())
                .orElseThrow(() -> new InvalidCredentialsException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Invalid email or password");
        }

        session.setAttribute("userId", user.getId());
        session.setAttribute("userRole", user.getRole().name());

        UserResponse userResponse = userMapper.toUserResponse(user);
        return new AuthResponse("Login successful", userResponse);
    }

    public String logout(HttpSession session) {
        session.invalidate();
        return "Logout successful";
    }

    public UserResponse me(HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");

        if (userId == null) {
            throw new UnauthorizedException("Not authenticated");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        return userMapper.toUserResponse(user);
    }
}