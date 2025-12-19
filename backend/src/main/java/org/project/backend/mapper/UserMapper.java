package org.project.backend.mapper;

import org.project.backend.dto.users.UserResponse;
import org.project.backend.model. User;
import org.springframework. stereotype.Component;

@Component
public class UserMapper {

    public UserResponse toUserResponse(User user) {
        if (user == null) {
            return null;
        }

        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setName(user.getName());
        response.setEmail(user. getEmail());
        response.setRole(user.getRole());
        response.setCreatedAt(user.getCreatedAt());

        return response;
    }

    public User toUser(UserResponse userResponse) {
        if (userResponse == null) {
            return null;
        }

        User user = new User();
        user.setId(userResponse.getId());
        user.setName(userResponse.getName());
        user.setEmail(userResponse.getEmail());
        user.setRole(userResponse.getRole());
        user.setCreatedAt(userResponse.getCreatedAt());

        return user;
    }
}