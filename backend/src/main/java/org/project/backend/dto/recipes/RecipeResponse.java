package org.project.backend.dto.recipes;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.project.backend.dto.categories.CategoryResponse;
import org.project.backend.dto.users.UserResponse;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecipeResponse {

    private Long id;
    private String title;
    private String slug;
    private String description;
    private String imageUrl;
    private Integer prepTime;
    private Integer cookTime;
    private Integer servings;
    private CategoryResponse category;
    private UserResponse author;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}