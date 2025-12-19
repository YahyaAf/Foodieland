package org.project.backend. dto.users;

import lombok. AllArgsConstructor;
import lombok.Data;
import lombok. NoArgsConstructor;
import org.project.backend.enums.Role;

import java. time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {

    private Long id;
    private String name;
    private String email;
    private Role role;
    private LocalDateTime createdAt;
}