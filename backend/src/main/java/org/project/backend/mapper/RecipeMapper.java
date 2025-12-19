package org.project.backend.mapper;

import lombok.RequiredArgsConstructor;
import org.project.backend. dto.recipes.RecipeRequest;
import org.project.backend. dto.recipes.RecipeResponse;
import org.project.backend. model.Recipe;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RecipeMapper {

    private final CategoryMapper categoryMapper;
    private final UserMapper userMapper;

    public RecipeResponse toRecipeResponse(Recipe recipe) {
        if (recipe == null) {
            return null;
        }
        RecipeResponse response = new RecipeResponse();
        response.setId(recipe.getId());
        response.setTitle(recipe.getTitle());
        response.setSlug(recipe.getSlug());
        response.setDescription(recipe.getDescription());
        response.setImageUrl(recipe.getImageUrl());
        response.setPrepTime(recipe.getPrepTime());
        response.setCookTime(recipe.getCookTime());
        response.setServings(recipe.getServings());
        response.setCategory(categoryMapper.toCategoryResponse(recipe.getCategory()));
        response.setAuthor(userMapper.toUserResponse(recipe.getAuthor()));
        response.setCreatedAt(recipe.getCreatedAt());
        response.setUpdatedAt(recipe.getUpdatedAt());

        return response;
    }

    public Recipe toRecipe(RecipeRequest request) {
        if (request == null) {
            return null;
        }
        Recipe recipe = new Recipe();
        recipe.setTitle(request.getTitle());
        recipe.setSlug(request.getSlug());
        recipe.setDescription(request.getDescription());
        recipe.setImageUrl(request.getImageUrl());
        recipe.setPrepTime(request.getPrepTime());
        recipe.setCookTime(request.getCookTime());
        recipe.setServings(request.getServings());

        return recipe;
    }

    public void updateRecipeFromRequest(RecipeRequest request, Recipe recipe) {
        if (request == null || recipe == null) {
            return;
        }
        recipe. setTitle(request.getTitle());
        recipe.setSlug(request.getSlug());
        recipe.setDescription(request.getDescription());
        recipe.setImageUrl(request.getImageUrl());
        recipe.setPrepTime(request.getPrepTime());
        recipe.setCookTime(request. getCookTime());
        recipe.setServings(request.getServings());
    }
}