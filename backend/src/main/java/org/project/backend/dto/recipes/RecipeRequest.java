package org.project.backend.dto.recipes;

import jakarta.validation.constraints. Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecipeRequest {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Slug is required")
    @Pattern(regexp = "^[a-z0-9-]+$", message = "Slug must contain only lowercase letters, numbers, and hyphens")
    private String slug;

    private String description;

    private String imageUrl;

    @Min(value = 0, message = "Prep time must be positive")
    private Integer prepTime;

    @Min(value = 0, message = "Cook time must be positive")
    private Integer cookTime;

    @Min(value = 1, message = "Servings must be at least 1")
    private Integer servings;

    @NotNull(message = "Category ID is required")
    private Long categoryId;
}